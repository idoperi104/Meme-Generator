'use strict'

let gElCanvas
let gCtx


function RenderEditor(imgId) {
    createMeme(imgId)
    var elEditor = document.querySelector('.editor')
    elEditor.style.display = 'grid'
    renderCanvas()
    renderMeme()
}

// MEME
function renderMeme() {
    var meme = getMeme()

    var imgUrl = getImgById(meme.selectedImgId).url
    const img = new Image()
    // when img loads:
    img.addEventListener('load', () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
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
    const { txt, size, font, x, y, align } = line
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px ${font}`
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

// INIT CANVAS
function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

// CONTROL BOX
function onSetLineTxt(txt) {
    console.log(txt);
    setLineTxt(txt)
    renderMeme()
}


