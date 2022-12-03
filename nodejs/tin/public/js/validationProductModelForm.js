function validateForm() {
    const productNameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    const productionDateInput = document.getElementById('productionDate');
    const endDistributionDateInput = document.getElementById('endDistributionDate');

    const errorProductName = document.getElementById("errorProductName");
    const errorProductPrice = document.getElementById("errorProductPrice");
    const errorProductionDate = document.getElementById("errorProductionDate");
    const errorEndDistributionDate = document.getElementById("errorEndDistributionDate");

    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([productNameInput, priceInput, productionDateInput, endDistributionDateInput], [errorProductName, errorProductionDate, errorProductPrice, errorEndDistributionDate], errorsSummary);

    let valid = true;

    if(!checkRequired(productNameInput.value)) {
        valid = false;
        productNameInput.classList.add("error-input");
        errorProductName.innerText = "This field is required.";
    } else if(!checkTextLengthRange(productNameInput.value, 2, 60)) {
        valid = false;
        productNameInput.classList.add("error-input");
        errorProductName.innerText = "This field must contain 2 to 60 characters.";
    }

    if(!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorProductPrice.innerText = "This field is required.";
    } else if(!checkPriceRange(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorProductPrice.innerText = "This field cannot be negative";
    }

    if(!checkRequired(productionDateInput.value)) {
        valid = false;
        productionDateInput.classList.add("error-input");
        errorProductionDate.innerText = "This field is required.";
    } else if(!checkDate(productionDateInput.value)) {
        valid = false;
        productionDateInput.classList.add("error-input");
        errorProductionDate.innerText = "This field must be in date format.";
    }

    if(!checkEndDate(endDistributionDateInput.value)) {
        valid = false;
        endDistributionDateInput.classList.add("error-input");
        errorEndDistributionDate.innerText = "This field must be in date format.";
    } else if(!checkCompareDate(endDistributionDateInput.value, productionDateInput.value)) {
        valid = false;
        endDistributionDateInput.classList.add("error-input");
        errorEndDistributionDate.innerText = "This field cannot contain a date before production date."
    }

    return valid;
}