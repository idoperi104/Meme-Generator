'use strict'

function onInit() {
    onRenderGallery()
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
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

