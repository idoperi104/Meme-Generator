'use strict'

function onInit(){
    // renderGallery()
}

function onRenderGallery(elBtn){
    hideAllSections()
    elBtn.classList.add('btn-nav-hover')
    renderGallery()
}

function onRenderEditor(elBtn){
    hideAllSections()
    elBtn.classList.add('btn-nav-hover')
    renderEditor()
    
}

function removeAllBtnHover(){
    var elBtns = document.querySelectorAll('.main-menu .btn-nav')
    elBtns.forEach(el => {
        el.classList.remove('btn-nav-hover')
    })
}

function hideAllSections(){
    removeAllBtnHover()
    var elSections = document.querySelectorAll('.main-content > *')
    elSections.forEach(el => el.classList.add('hidden'))
}

