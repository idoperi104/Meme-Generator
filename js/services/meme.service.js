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
    createLine()
    saveMemeToStorage(gMeme)
    return gMeme
}

// LINE
function createLine(txt = '', size = 40, font = 'arial', align = 'left', x = 20, y = 30) {
    const line = {
        txt,
        size,
        font,
        align,
        x,
        y,
    }
    saveMemeToStorage(gMeme)
    gMeme.lines.push(line)
}

function setLineTxt(txt){
    var {lines, selectedLineIdx} = gMeme
    lines[selectedLineIdx].txt = txt
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