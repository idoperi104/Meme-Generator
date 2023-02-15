'use strict'

function onInit() {
    renderGallery()
}

function renderGallery(){
    const elGallery = document.querySelector('.gallery')
    var imgs = getImgs()
    var strHtmls = imgs.map(img => {
        return `<img 
        onclick="onImgClicked(${img.id})"
        class="img-gallery" 
        src="${img.url}" alt="">`
    })
    elGallery.innerHTML = strHtmls.join('')
}

function onImgClicked(imgId){
    console.log(imgId);
    hideGallery()
    RenderEditor(imgId)
}

function hideGallery(){
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
}