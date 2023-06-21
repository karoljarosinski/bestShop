const dropdownSelect = document.querySelector('#package');
const dropdownOptions = dropdownSelect.querySelector('.select__dropdown');
const options = dropdownOptions.querySelectorAll('li');
const selectedOption = dropdownSelect.querySelector('.select__input');
const calcSummary = document.querySelector('.calc__summary');
const calcPackage = calcSummary.querySelector('[data-id="package"]');
const itemPrice = calcPackage.querySelector('.item__price');
const packagePrices = document.querySelectorAll('.type_price')

dropdownSelect.addEventListener('click', showDropdownOptions);
options.forEach((el) => {
    el.addEventListener('click', handleSelection);
})

function showDropdownOptions(event) {
    if (dropdownOptions.style.display === 'none' || dropdownOptions.getAttribute('style') === null) {
        dropdownOptions.style.display = 'block';
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
            itemPrice.innerText = packagePrice;
            break;
        case 'Professional':
            itemPrice.innerText = packagePrice;
            break;
        case 'Premium':
            itemPrice.innerText = packagePrice;
    }
    calcPackage.style.display = 'block';
    dropdownOptions.style.display = 'none';
}
function getPackagePrice(packages, packageName) {
    return Array.from(packages).find(el => el.textContent.includes(packageName)).querySelector('p').innerHTML;
}
