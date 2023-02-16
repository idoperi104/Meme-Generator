'use strict'

var gRect

function createRect(x = 0, y = 0, width = 10, height = 10, isDrag = false) {
    gRect = {
        x,
        y,
        width,
        height,
        isDrag,
    }
    saveRectToStorage(gRect)
    return gRect
}

function getRect() {
    gRect = readRectFromStorage()
    return gRect
}

function isRectClicked(pos) {
    return pos.x > gRect.x && pos.x < gRect.x + gRect.width && pos.y > gRect.y && pos.y < gRect.y + gRect.height
}

function setRectDrag(isDrag) {
    gRect.isDrag = isDrag
    saveRectToStorage(gRect)
}