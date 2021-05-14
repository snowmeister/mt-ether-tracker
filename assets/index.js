/*
 * File: index.js
 * Project: mt-tracker
 * File Created: Tuesday, 11th May 2021 9:02:00 pm
 * Author: Mark Kennard (mark@snowmeister.co.uk)
 * -----
 * Last Modified: Tuesday, 11th May 2021 9:02:00 pm
 * Modified By: Mark Kennard (mark@snowmeister.co.uk>)
 * -----
 * Copyright 2018 - 2021 Mark Kennard AKA Snowmeister
 */


const CURRENT_GBP_INVESTMENT = 60.00;
const CURRENT_ETH = 0.02095682;

let loading = true;
let init = false;


const buildProfit = (profit) => {
    document.getElementById('profit-content').innerHTML = `<div class="text-base  text-7xl sm:text-4xl md:text-7xl lg:text-9xl bg-gray-700 rounded-lg mt-5 p-8 text-center text-gray-400  m-4 shadow ">${profit}</div>`;
}

const buildListItem = (label, value, opacity, boolHuge) => {
    return `<li class="px-2 py-3 text-gray-200  shadow opacity-${opacity} flex flex-wrap content-center}"><div class="w-3/6 p-4 flex-grow opacity-30">${label}:</div> <div class="rounded-lg shadow  p-4 text-gray-400 text-xxl align-right bg-gray-700 mr-2"> ${value}<div></li>`
}

const setUpUI = (currentUSDPrice, currentUSDtoGBPPrice) => {

    const currentUSDVALUE = (CURRENT_ETH * currentUSDPrice)
    const strDollars = parseFloat(currentUSDPrice).toFixed(2).toString();
    buildProfit('£' + (currentUSDVALUE / currentUSDtoGBPPrice).toFixed(2));

    let HTML = '';
    HTML += buildListItem('CURRENTLY INVESTED', '£' + CURRENT_GBP_INVESTMENT.toFixed(2));
    HTML += buildListItem('PORTFOLIO ETH', CURRENT_ETH);
    HTML += buildListItem('Current 1 ETH PRICE USD', '$' + strDollars, 100);
    HTML += buildListItem('Current 1 ETH PRICE GBP', '£' + parseFloat(currentUSDPrice / currentUSDtoGBPPrice).toFixed(2).toLocaleString('en-GB', {
        style: 'currency',
        currency: 'USD'
    }), 100);
    
    document.getElementById('current-data-list').innerHTML = HTML;

}


const removeLoader = () => {
    const el = document.getElementById("loading");
    el.parentNode.removeChild(el)
    document.body.classList.remove('flex','items-center','justify-center','h-screen');
    document.body.classList.add('mt-4', 'pt-4');
}

const addLoader = () => {
    /**
     * We add the loader in the DOM from kickof, 
     * so its visible BEFORE the js arrives, so it's
     * a good idea to make sure we remove it
     * 
     * Banging the call here seems to make most sense 
     * for the time being...
     */
    removeLoader()

    /**
     * Create our DOM elements, add their classes and IDs
     * then prepend it to the DOM..
     */
    const loader = document.createElement('div');
    loader.setAttribute('id', 'loading');
    loader.classList.add('text-gray-100', 'opacity-5');

    const loaderInner = document.createElement('div');
    loaderInner.classList.add('classic-2', 'self-center');
    document.body.classList.add('flex','items-center','justify-center','h-screen')
    loader.appendChild(loaderInner);
    document.body.prepend(loader);
}

// Handler when the DOM is fully loaded
async function getData() {
    loading = true;
    const response = await fetch('/rate');
    // waits until the request completes...
    return response.json();
}

// Wait until we have the 'document.ready'...
if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {

    loading = false;

    addLoader()
    getData().then(response => {
        removeLoader()
        const currentUSDPrice = response.ether.data.priceUsd;
        const currentUSDtoGBPPrice = response.rate.data.rateUsd
        setUpUI(currentUSDPrice, currentUSDtoGBPPrice)
    }).catch(err => {
        console.error(err)
    });
} else {
    document.addEventListener("DOMContentLoaded", getData);
}