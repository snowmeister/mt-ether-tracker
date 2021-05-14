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

const CURRENT_GBP_INVESTMENT = 60.0;
const CURRENT_ETH = 0.02095682;

let loading = true;
let init = false;

const calculatePercentageDifference = (currentValue, direction) =>{
    if(direction === 'up'){
       const increase = currentValue - CURRENT_GBP_INVESTMENT;
       return (increase / CURRENT_GBP_INVESTMENT) * 100
    }else{
        const decrease = CURRENT_GBP_INVESTMENT - currentValue;
        return (decrease / CURRENT_GBP_INVESTMENT) * 100
    }

}

const buildProfit = (currentValue) => {
    let status = 1;
    let noStyle = 'color:rgba(255,255,255, 0.6); opacity: 0.1';
    let upStyle = 'color: green; stroke: green;fill: green';
    let downStyle = 'color: red; stroke: red;fill: red';
    let perc = 0;
    const dblDifference = currentValue - CURRENT_GBP_INVESTMENT;

    // We are in the black...
    if(dblDifference > 0) {
        downStyle = noStyle;
        status = 2;
        perc = calculatePercentageDifference(currentValue, 'up')
    }

    // We are in the red...
    if(dblDifference < 0) {
        status = 0;
        upStyle = noStyle;
        perc = calculatePercentageDifference(currentValue, 'down')
    }

    document.getElementById(
        'profit-content'
    ).innerHTML = `<div class="text-base  text-7xl sm:text-4xl md:text-7xl lg:text-9xl bg-gray-700 rounded-lg mt-5 p-8 text-center text-gray-400  m-4 shadow ">£${currentValue}</div>`;

    document.getElementById('chevron-up').setAttribute('style', upStyle)
    document.getElementById('chevron-down').setAttribute('style', downStyle)
    document.getElementById('percentage-region').innerHTML = '<strong>'+perc.toFixed(2)+'%</strong';
}

const buildListItem = (label, value, opacity, boolHuge) => {
    return `<li class="px-2 py-3 text-gray-200  shadow opacity-${opacity} flex flex-wrap content-center}"><div class="w-3/6 p-4 flex-grow opacity-30">${label}:</div> <div class="rounded-lg shadow  p-4 text-gray-400 text-xxl align-right bg-gray-700 mr-2"> ${value}<div></li>`;
};

const setUpUI = (currentUSDPrice, currentUSDtoGBPPrice) => {
    const currentUSDVALUE = CURRENT_ETH * currentUSDPrice;
    const strDollars = parseFloat(currentUSDPrice).toFixed(2).toString();
    buildProfit((currentUSDVALUE / currentUSDtoGBPPrice).toFixed(2));

    /**
     * Build up the UI Elements HTML
     */
    let HTML = '';
    HTML += buildListItem('CURRENTLY INVESTED', '£' + CURRENT_GBP_INVESTMENT.toFixed(2));
    HTML += buildListItem('PORTFOLIO ETH', CURRENT_ETH);
    HTML += buildListItem('Current 1 ETH PRICE USD', '$' + strDollars, 100);
    HTML += buildListItem(
        'Current 1 ETH PRICE GBP',
        '£' +
        parseFloat(currentUSDPrice / currentUSDtoGBPPrice)
            .toFixed(2)
            .toLocaleString('en-GB', {
                style: 'currency',
                currency: 'USD',
            }),
        100
    );

    document.getElementById('current-data-list').innerHTML = HTML;
};

const removeLoader = () => {
    loading = false
    const el = document.getElementById('loading');
    el.parentNode.removeChild(el);
    document.body.classList.remove('flex', 'items-center', 'justify-center', 'h-screen');
    document.body.classList.add('mt-4', 'pt-4');
    document.getElementById('main').classList.remove('hidden');
    document.getElementById('status-indicator').classList.remove('hidden');
};

const addLoader = () => {
    
    /**
     * We add the loader in the DOM from kickof,
     * so its visible BEFORE the js arrives, so it's
     * a good idea to make sure we remove it
     *
     * Banging the call here seems to make most sense
     * for the time being...
     */
    removeLoader();
    /**
     * Create our DOM elements, add their classes and IDs
     * then prepend it to the DOM..
     */
    const loader = document.createElement('div');
    loader.setAttribute('id', 'loading');
    loader.classList.add('text-gray-100', 'opacity-5');

    const loaderInner = document.createElement('div');
    loaderInner.classList.add('classic-2', 'self-center');
    document.body.classList.add('flex', 'items-center', 'justify-center', 'h-screen');
    loader.appendChild(loaderInner);
    document.body.prepend(loader);
    loading = true;
};

/**
 * Called when the when the DOM is fully loaded
 * and then on a set Interval.
 */
async function getData() {
    loading = true;
    // waits until the request completes...
    const response = await fetch('/rate');
    // return the JSON from the response...
    setTimeout(()=>{
        getData()
    },30000);
    return response.json();
}

// Wait until we have the 'document.ready'...
if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    
    addLoader();
    getData()
        .then((response) => {
            removeLoader();
            const currentUSDPrice = response.ether.data.priceUsd;
            const currentUSDtoGBPPrice = response.rate.data.rateUsd;
            setUpUI(currentUSDPrice, currentUSDtoGBPPrice);

            
        })
        .catch((err) => {
            console.error(err);
        });
} else {
    document.addEventListener('DOMContentLoaded', getData);
}
