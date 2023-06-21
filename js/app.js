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
const totalPrice = calcSummary.querySelector('.total__price');

inputsNumber.forEach(input => input.addEventListener('input', handleTyping));

dropdownSelect.addEventListener('click', showDropdownOptions);

options.forEach(el => el.addEventListener('click', handleSelection));

calcCheckboxes.forEach(el => el.addEventListener('click', handleCheckboxClick));

function handleTyping(event) {
    if (event.target.id === 'products') {
        productsCalc.style.display = 'flex';
        productsCalc.querySelector('.item__calc').innerText = `${event.target.value} * $0.5`;
        productsCalc.querySelector('.item__price').innerText = '$' + event.target.value * 0.5;
        if (event.target.value === '') {
            productsCalc.style.display = 'none';
        }
    } else {
        ordersCalc.style.display = 'flex';
        ordersCalc.querySelector('.item__calc').innerText = `${event.target.value} * $0.5`;
        ordersCalc.querySelector('.item__price').innerText = '$' + event.target.value * 0.5;
        if (event.target.value === '') {
            ordersCalc.style.display = 'none';
        }
    }
    totalPrice.innerText = '$' + getTotalPrice();
}

function handleCheckboxClick(event) {
    if (event.target.id === 'accounting') {
        if (event.target.checked) {
            accountingCalc.style.display = 'flex';
            accountingCalc.querySelector('.item__price').innerText = '$35';
            totalPrice.innerText = '$' + getTotalPrice();
        } else {
            accountingCalc.style.display = 'none';
            accountingCalc.querySelector('.item__price').innerText = '$0';
        }
    }
    if (event.target.id === 'rental') {
        if (event.target.checked) {
            rentalCalc.style.display = 'flex';
            rentalCalc.querySelector('.item__price').innerText = '$5';
        } else {
            rentalCalc.style.display = 'none';
            rentalCalc.querySelector('.item__price').innerText = '$0';
        }
    }
    totalPrice.innerText = '$' + getTotalPrice();
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
    totalPrice.innerText = '$' + getTotalPrice();
}

function getPackagePrice(packages, packageName) {
    return Array.from(packages).find(el => el.textContent.includes(packageName)).querySelector('p').innerHTML;
}

function getTotalPrice() {
    let sum = 0;
    const allPrices = calcSummary.querySelectorAll('.item__price');
    Array.from(allPrices).forEach(el => sum += +el.innerHTML.replace('$', ''));
    return sum;
}