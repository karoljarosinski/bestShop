const dropdownSelect = document.querySelector('#package');
const dropdownOptions = dropdownSelect.querySelector('.select__dropdown');
const options = dropdownOptions.querySelectorAll('li');
const selectedOption = dropdownSelect.querySelector('.select__input');
const calcSummary = document.querySelector('.calc__summary');
const productsCalc = calcSummary.querySelector('[data-id="products"]');
const ordersCalc = calcSummary.querySelector('[data-id="orders"]');
const packageCalc = calcSummary.querySelector('[data-id="package"]');
const packagesPriceInfo = document.querySelectorAll('.type_price')
const calcCheckboxes = document.querySelectorAll('.calc input[type="checkbox"]');
const accountingCalc = calcSummary.querySelector('[data-id="accounting"]');
const rentalCalc = calcSummary.querySelector('[data-id="terminal"]');
const inputsNumber = document.querySelectorAll('.form__input');

inputsNumber.forEach(input => input.addEventListener('input', handleTyping));

dropdownSelect.addEventListener('click', showDropdownOptions);

options.forEach(el => el.addEventListener('click', handleSelection));

calcCheckboxes.forEach(el => el.addEventListener('click', handleCheckboxClick));

function handleTyping(event) {
    if (event.target.id === 'products') {
        productsCalc.style.display = 'flex';
    } else {
        ordersCalc.style.display = 'flex';
    }
}

function handleCheckboxClick(event) {
    if (event.target.id === 'accounting') {
        event.target.checked ? accountingCalc.style.display = 'flex' : accountingCalc.style.display = 'none';
        accountingCalc.querySelector('.item__price').innerText = '$35';
    }
    if (event.target.id === 'rental') {
        event.target.checked ? rentalCalc.style.display = 'flex' : rentalCalc.style.display = 'none';
        rentalCalc.querySelector('.item__price').innerText = '$5';
    }
}

function showDropdownOptions() {
    if (dropdownOptions.style.display === 'none' || dropdownOptions.getAttribute('style') === null) {
        dropdownOptions.style.display = 'block';
    } else {
        dropdownOptions.style.display = 'none';
    }
}

function handleSelection(event) {
    event.stopPropagation();
    const selection = event.currentTarget.innerHTML;
    selectedOption.innerText = selection;
    const selectedPrice = getPackagePrice(packagesPriceInfo, selection);
    packageCalc.querySelector('.item__calc').innerText = event.currentTarget.innerHTML;
    packageCalc.querySelector('.item__price').innerText = selectedPrice;
    packageCalc.style.display = 'flex';
    dropdownOptions.style.display = 'none';
}

function getPackagePrice(packages, packageName) {
    return Array.from(packages).find(el => el.textContent.includes(packageName)).querySelector('p').innerHTML;
}
