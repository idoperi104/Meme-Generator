'use strict'

let gElCanvas
let gCtx


function RenderEditor(imgId) {
    createMeme(imgId)
    createLine()
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
    const { txt, size, font, x, y, align, fillColor, strokeColor } = line
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px ${font}`
    gCtx.textBaseline = 'top'

    gCtx.fillText(txt, (x + 20), y + 20 * (idx + 1)) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, (x + 20), y + 20 * (idx + 1)) // Draws (strokes) a given text at the given (x, y) position.
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
    setLineTxt(txt)
    renderMeme()
}

// FUNCTIONALITY

function onAddLine() {
    createLine()
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

function onMove(coords){
    setLineCoord(coords)
    renderMeme()
}

function onSwitchLine(){
    setSelectedLineIdx(1)
    setElInput()
}

function onSetLineColors(){
    var strokeColor = document.querySelector('.stroke-color-input').value
    var fillColor = document.querySelector('.fill-color-input').value
    setLinesColors({fillColor, strokeColor})
    renderMeme()
}

function onChangeFontSize(num){
    changeFontSize(num)
    renderMeme()
}

// HELPERS
function clearElInput() {
    var elInput = document.querySelector('.txt-input')
    elInput.value = ''
}

function setElInput(){
    var elInput = document.querySelector('.txt-input')
    elInput.value = getCurrLineTxt()
}
