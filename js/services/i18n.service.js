'use strict'

// instructions:
// <h1 data-trans="title">Book-Shop</h1>
// setLang()
// doTrans()

// function setLangByParam() {
//     let lang = getValueFromParam('lang')
//     setLang(lang)
//     // DONE: if lang is hebrew add RTL class to document.body
//     if (lang === 'he') document.body.classList.add('rtl')
//     else document.body.classList.remove('rtl')
// }


var gCurrLang = 'en'

var gTrans = {
    title: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    'filter-search':{
        en: 'Search Book:',
        he: 'חפש ספר'
    },
    'filter-max-price':{
        en: 'Max Price:',
        he: 'מחיר מקסימלי'
    },
    'filter-min-rate':{
        en: 'Min Rate:',
        he: 'דירוג מינימלי'
    },
    'table-title':{
        en: 'TITLE',
        he: 'כותרת'
    },
    'table-price':{
        en: 'PRICE',
        he: 'מחיר'
    },
    'table-rate':{
        en: 'RATE',
        he: 'דירוג'
    },
    'table-actions':{
        en: 'ACTIONS',
        he: 'פעולות'
    },
    'btn-read':{
        en: 'Read',
        he: 'עיין'
    },
    'btn-update':{
        en: 'Update',
        he: 'עדכן'
    },
    'btn-remove':{
        en: 'Remove',
        he: 'הסר'
    },
    'btn-next':{
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'btn-create':{
        en: 'Create New Book',
        he: 'הוסף ספר'
    },
    'btn-prev':{
        en: 'Prev Page',
        he: 'עמוד קודם'
    },
}


function getTrans(transKey) {
    // DONE: if key is unknown return 'UNKNOWN'
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    // DONE: get from gTrans
    let translation = transMap[gCurrLang]
    // DONE: If translation not found - use english
    if (!translation) translation = transMap.en
    return translation
}

function doTrans() {
    // DONE: 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)
        if (el.placeholder) el.placeholder = translation
        else el.innerText = translation

        // const prop = el.placeholder ? 'placeholder': 'innerText'
        // el[prop] = translation


        // for each el:
        // get the data-trans and use getTrans to replace the innerText 
        // ITP: support placeholder    
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function formatNumSimple(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {

    const options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
    return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
    return kg * 2.20462262185
}


function getPastRelativeFrom(ts) {
    const diff = Date.now() - new Date(ts)
    const seconds = diff / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    const formatter = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'auto'
    })
    if (seconds <= 60) return formatter.format(-seconds, 'seconds')
    if (minutes <= 60) return formatter.format(-minutes, 'minutes')
    if (hours <= 24) return formatter.format(-hours, 'hours')
    return formatter.format(-days, 'days')
}
