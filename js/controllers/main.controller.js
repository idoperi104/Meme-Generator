'use strict'

function onInit() {
    resizeVh()
    onRenderGallery() 
}

function resizeVh(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

function onRenderGallery(elBtn) {
    hideAllSections()
    elBtn = document.querySelector('.btn-gallery')
    elBtn.classList.add('btn-nav-hover')
    renderGallery()
}

function onRenderEditor(elBtn) {
    hideAllSections()
    elBtn.classList.add('btn-nav-hover')
    renderEditor()
}

function onRenderEditor(elBtn) {
    hideAllSections()
    elBtn.classList.add('btn-nav-hover')
    renderEditor()
}

function removeAllBtnHover() {
    var elBtns = document.querySelectorAll('.main-menu .btn-nav')
    elBtns.forEach(el => {
        el.classList.remove('btn-nav-hover')
    })
}

function hideAllSections() {
    removeAllBtnHover()
    var elSections = document.querySelectorAll('.main-content > *')
    elSections.forEach(el => el.classList.add('hidden'))
}

