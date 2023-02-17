'use strict'

let gElCanvas
let gCtx
let gStartPos
let gIsMouseClickDown = false
let gIsSowRect = true

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function renderEditor(imgId = 0) {
    createMeme(imgId)
    createLine()
    var elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hidden')
    renderCanvas()
    addListeners()
    clearElInput()

}

// MEME
function renderMeme() {
    const meme = getMeme()

    const imgUrl = getImgById(meme.selectedImgId).url
    let img = new Image()
    // when img loads:
    img.addEventListener('load', () => {
        let scaleFactor = Math.max(gElCanvas.width / img.width, gElCanvas.height / img.height);
        let newWidth = img.width * scaleFactor;
        let newHeight = img.height * scaleFactor;
        let x = (gElCanvas.width / 2) - (newWidth / 2);
        let y = (gElCanvas.height / 2) - (newHeight / 2);
        gCtx.drawImage(img, x, y, newWidth, newHeight);

        renderLines()
        renderRect()
    },
        false
    )
    img.src = imgUrl;
}

// LINES
function renderLines() {
    var meme = getMeme()
    var lines = meme.lines
    lines.forEach((line, idx) => {
        drawText(idx, line)
    });
}

function drawText(idx, line) {
    var { txt, size, font, x, y, align, fillColor, strokeColor } = line

    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px ${font}`
    gCtx.textBaseline = 'top'

    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.

}

function renderRect() {
    const line = getCurrLine()
    var { txt, size, font, x, y, align, fillColor, strokeColor } = line
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px ${font}`
    gCtx.textBaseline = 'top'

    const textWidth = gCtx.measureText(txt).width
    const textHeight = gCtx.measureText(txt).fontBoundingBoxAscent + gCtx.measureText(txt).fontBoundingBoxDescent

    gCtx.beginPath()
    gCtx.strokeStyle = '#000000'
    if (gIsSowRect) gCtx.strokeRect(x, y, textWidth + 10, textHeight)


    //update rect model
    createRect(x, y, textWidth + 10, textHeight, gIsMouseClickDown)
}

// INIT CANVAS
function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderMeme()
    // addListeners()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    // gElCanvas.width = elContainer.offsetWidth - 3
    // gElCanvas.height = elContainer.offsetHeight - 5
}

// CONTROL BOX
function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
    renderRect()
}

// FUNCTIONALITY

function onAddLine() {
    var numOfLines = getMeme().lines.length
    createLine('', 0, numOfLines * 50)
    setSelectedLineIdx(1)
    onSetLineColors()
    clearElInput()
}

function onRemoveLine() {
    console.log('delete');
    removeLine()
    setSelectedLineIdx(-1)
    renderMeme()
    // clearElInput()
    setElInput()
}

function onMoveLine(coords) {
    setLineCoord(coords)
    renderMeme()
}

function onSwitchLine() {
    setSelectedLineIdx(1)
    setElInput()
    renderMeme()
}

function onSetLineColors() {
    var strokeColor = document.querySelector('.stroke-color-input').value
    var fillColor = document.querySelector('.fill-color-input').value
    setLinesColors({ fillColor, strokeColor })
    renderMeme()
}

function onChangeFontSize(num) {
    changeFontSize(num)
    renderMeme()
}

function onAlingLine(aling) {
    var canvasWidth = gElCanvas.width
    var rectX = getRect().x
    var rectWidth = getRect().width

    console.log(canvasWidth, rectX, rectWidth);
    switch (aling) {
        case 'left':
            onMoveLine({ x: -rectX })
            break
        case 'center':
            var diss = (canvasWidth - rectWidth) / 2 - rectX
            onMoveLine({ x: diss })
            break
        case 'right':
            onMoveLine({ x: canvasWidth - rectX - rectWidth })
            break
    }
    renderMeme()
}

function onSetFont(font) {
    console.log(font);
    setFont(font)
    renderMeme()
}

function onShareImg() {
    gIsSowRect = false
    renderMeme()
    setTimeout(() => {
        onUploadImg()
    }, 1000);
}

function downloadImg(elLink) {
    gIsSowRect = false
    renderMeme()
    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
        elLink.href = imgContent
    }, 1000);

}

// HELPERS
function clearElInput() {
    var elInput = document.querySelector('.txt-input')
    elInput.value = ''
}

function setElInput() {
    var elInput = document.querySelector('.txt-input')
    elInput.value = getCurrLineTxt()
}


// LISTENERS
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        renderCanvas()
        // renderEditor()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onDown(ev) {
    // console.log('Down')
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (!isRectClicked(pos)) return


    setRectDrag(true)
    // //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getRect()
    if (!isDrag) return

    gIsMouseClickDown = true

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    gStartPos = pos

    onMoveLine({ x: dx, y: dy })

    renderMeme()
}

function onUp() {
    // console.log('Up')
    gIsMouseClickDown = false
    setRectDrag(false)
    document.body.style.cursor = 'default'
}

