const dropdownSelect = document.querySelector('#package');
const dropdownOptions = dropdownSelect.querySelector('.select__dropdown');
const options = dropdownOptions.querySelectorAll('li');
const selectedOption = dropdownSelect.querySelector('.select__input');
const calcSummary = document.querySelector('.calc__summary');
const calcPackage = calcSummary.querySelector('[data-id="package"]');


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
    calcPackage.querySelector('.item__calc').innerText = event.currentTarget.innerHTML;
    switch (selection) {
        case 'Basic':
            calcPackage.querySelector('.item__price').innerText = '$0';
            break;
        case 'Professional':
            calcPackage.querySelector('.item__price').innerText = '$25';
            break;
        case 'Premium':
            calcPackage.querySelector('.item__price').innerText = '$60';
    }
    calcPackage.style.display = 'block';
    dropdownOptions.style.display = 'none';
}
