'use strict'

function renderGallery(){
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('hidden')
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
    // hideGallery()
    hideAllSections()
    const elBtn = document.querySelector('.btn-editor')
    onRenderEditor(elBtn)

    renderEditor(imgId)
}

function hideGallery(){
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hidden')
}