'use strict'

const KEY_IMGS = 'imgsDB'
const KEY_MEME = 'memeDB'

function _saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function _loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function saveImgsToStorage(imgs){
    _saveToStorage(KEY_IMGS, imgs)

}
function readImgsFromStorage(){
    return _loadFromStorage(KEY_IMGS)
}

function saveMemeToStorage(meme){
    _saveToStorage(KEY_MEME, meme)

}
function readMemeFromStorage(){
    return _loadFromStorage(KEY_MEME)
}