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
const allPrices = calcSummary.querySelectorAll('.item__price');
const productsInput = document.querySelector('#products');
const ordersInput = document.querySelector('#orders');

inputsNumber.forEach(input => input.addEventListener('input', handleTyping));

dropdownSelect.addEventListener('click', showDropdownOptions);

options.forEach(el => el.addEventListener('click', handleSelection));

calcCheckboxes.forEach(el => el.addEventListener('click', handleCheckboxClick));

function handleTyping(event) {
    if (event.target.id === 'products') {
        inputValidation(event, productsInput, productsCalc)
        if (event.target.value === '') {
            showElement(productsCalc, false);
        }
    } else {
        inputValidation(event, ordersInput, ordersCalc);
        if (event.target.value === '') {
            showElement(ordersCalc, false);
        }
    }
    totalPrice.innerText = '$' + getTotalPrice();
}

function handleCheckboxClick(event) {
    if (event.target.id === 'accounting') {
        if (event.target.checked) {
            showElement(accountingCalc, true);
            setPriceForElement(accountingCalc, '$35');
            totalPrice.innerText = '$' + getTotalPrice();
        } else {
            showElement(accountingCalc, false);
            setPriceForElement(accountingCalc, '$0');
        }
    }
    if (event.target.id === 'rental') {
        if (event.target.checked) {
            showElement(rentalCalc, true);
            setPriceForElement(rentalCalc, '$5');
        } else {
            showElement(rentalCalc, false);
            setPriceForElement(rentalCalc, '$0');
        }
    }
    totalPrice.innerText = '$' + getTotalPrice();
}

function showDropdownOptions() {
    if (dropdownOptions.style.display === 'none' || dropdownOptions.getAttribute('style') === null) {
        dropdownOptions.style.display = 'block';
    } else {
        showElement(dropdownOptions, false);
    }
}

function handleSelection(event) {
    event.stopPropagation();
    const selection = event.currentTarget.innerHTML;
    selectedOption.innerText = selection;
    const selectedPrice = getPackagePrice(packagesPriceInfo, selection);
    setItemCalcForElement(packageCalc, event.currentTarget.innerHTML);
    setPriceForElement(packageCalc, selectedPrice);
    packageCalc.style.display = 'flex';
    dropdownOptions.style.display = 'none';
    totalPrice.innerText = '$' + getTotalPrice();
}

function getPackagePrice(packages, packageName) {
    return Array.from(packages).find(el => el.textContent.includes(packageName)).querySelector('p').innerHTML;
}

function getTotalPrice() {
    let sum = 0;
    Array.from(allPrices).forEach(el => sum += +el.innerHTML.replace('$', ''));
    return sum;
}

function setPriceForElement(element, text) {
    element.querySelector('.item__price').innerText = text;
}

function setItemCalcForElement(element, text) {
    element.querySelector('.item__calc').innerText = text;
}

function showElement(element, isVisible) {
    isVisible ? element.style.display = 'flex' : element.style.display = 'none';
}

function inputValidation(event, inputElement, element) {
    if (event.target.value >= 0) {
        inputElement.style.color = 'grey';
        inputElement.style.borderColor = '#08a6e4';
        element.style.background = '#55dfb4';
        showElement(element, true);
        setItemCalcForElement(element, `${event.target.value} * $0.5`);
        setPriceForElement(element, `$ ${event.target.value * 0.5}`)
    } else {
        inputElement.style.color = 'red';
        inputElement.style.borderColor = 'red';
        element.style.background = 'red';
        showElement(element, true);
        setItemCalcForElement(element, `Value has to be greater than 0`);
        setPriceForElement(element, ``)
    }
}