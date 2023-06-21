const dropdownSelect = document.querySelector('#package');
const dropdownOptions = dropdownSelect.querySelector('.select__dropdown');
const options = dropdownOptions.querySelectorAll('li');
const selectedOption = dropdownSelect.querySelector('.select__input');
const calcSummary = document.querySelector('.calc__summary');
const calcPackage = calcSummary.querySelector('[data-id="package"]');
const packagePrice = calcPackage.querySelector('.item__price');
const packagePrices = document.querySelectorAll('.type_price')
const calcCheckboxes = document.querySelectorAll('.calc .checkbox');
// const calcAccounting = calcSummary.querySelector('[data-id="accounting"]');
// const accPrice = calcAccounting.querySelector('.item__price');

dropdownSelect.addEventListener('click', showDropdownOptions);
options.forEach((el) =>
    el.addEventListener('click', handleSelection));
calcCheckboxes.forEach(el => el.addEventListener('click', handleCheckboxClick));

function handleCheckboxClick(event) {
    if (event.target.tagName === 'LABEL' || event.target.tagName === 'SPAN') {
        if (event.currentTarget.textContent.includes('Accounting')) {
            // event.currentTarget.querySelector('input').setAttribute('checked', '');
            console.log(event.currentTarget.querySelector('input').checked)
            // event.currentTarget.querySelector('input').checked? calcAccounting.style.display = 'flex' : calcAccounting.style.display = 'none';
            // accPrice.innerText = '$35'
        }
        if (event.currentTarget.textContent.includes('Rental of a payment terminal')) {
            console.log('dupa2')
        }
    }
}

function showDropdownOptions(event) {
    if (dropdownOptions.style.display === 'none' || dropdownOptions.getAttribute('style') === null) {
        dropdownOptions.style.display = 'flex';
        dropdownOptions.style.flexDirection = 'column'
    } else {
        dropdownOptions.style.display = 'none';
    }
}

function handleSelection(event) {
    event.stopPropagation();
    const selection = selectedOption.innerText = event.currentTarget.innerHTML;
    const packagePrice = getPackagePrice(packagePrices, selection);
    calcPackage.querySelector('.item__calc').innerText = event.currentTarget.innerHTML;
    switch (selection) {
        case 'Basic':
            packagePrice.innerText = packagePrice;
            break;
        case 'Professional':
            packagePrice.innerText = packagePrice;
            break;
        case 'Premium':
            packagePrice.innerText = packagePrice;
    }
    calcPackage.style.display = 'flex';
    dropdownOptions.style.display = 'none';
}
function getPackagePrice(packages, packageName) {
    return Array.from(packages).find(el => el.textContent.includes(packageName)).querySelector('p').innerHTML;
}
