'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = []
createImgs()

var gMeme

// MEME
function getMeme() {
    return gMeme
}

function createMeme(selectedImgId = 6) {
    gMeme = {
        selectedImgId,
        selectedLineIdx: 0,
        lines: []
    }
    saveMemeToStorage(gMeme)
    return gMeme
}

function setSelectedLineIdx(num) {
    if (num < 0 && gMeme.selectedLineIdx === 0) return
    if (num > 0 && gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx += num
    console.log(gMeme);
    saveMemeToStorage(gMeme)
}

function createLine(txt = '', x = 0, y = 0, fillColor = '#FFFFFF', strokeColor = '#000000', size = 40, font = 'arial', align = 'left') {
    const line = {
        txt,
        size,
        font,
        align,
        x,
        y,
        strokeColor,
        fillColor
    }
    gMeme.lines.push(line)
    saveMemeToStorage(gMeme)
}

function setLineCoord(coord) {
    const { x, y } = coord
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.x += x || 0
    currLine.y += y || 0
    saveMemeToStorage(gMeme)
}

function setLineTxt(txt) {
    var { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].txt = txt
    saveMemeToStorage(gMeme)
}

function setLinesColors(colors){
    const {fillColor, strokeColor} = colors
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].fillColor = fillColor
    lines[selectedLineIdx].strokeColor = strokeColor
    saveMemeToStorage(gMeme)
}

function changeFontSize(count){
    var { lines, selectedLineIdx } = gMeme
    if (lines[selectedLineIdx].size < 5) return
    lines[selectedLineIdx].size += count
    saveMemeToStorage(gMeme)
}

function getCurrLineTxt() {
    var { lines, selectedLineIdx } = gMeme
    return lines[selectedLineIdx].txt
}

function getCurrLine(){
    const { lines, selectedLineIdx } = gMeme
    return lines[selectedLineIdx]
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    console.log(gMeme.lines);
    if (gMeme.lines.length === 0) createLine()
    saveMemeToStorage(gMeme)
}

// IMG
function getImgs() {
    return gImgs
}

function getImgById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img
}

function createImgs() {
    for (var i = 1; i <= 18; i++) {
        const img = _createImg(i)
        gImgs.push(img)
    }
    saveImgsToStorage(gImgs)
}

function _createImg(id) {
    return {
        id,
        url: `images/${id}.jpg`,
        keywords: ['funny', 'cat']
    }
}