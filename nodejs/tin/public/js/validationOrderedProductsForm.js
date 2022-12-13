function validateForm() {
    const quantityInput = document.getElementById('quantity');
    const productInput = document.getElementById('ProductModel_IDproduct');
    const IDorderInput = document.getElementById('Order_IDorder');

    const errorQuantity = document.getElementById('errorQuantity');
    const errorIDproduct = document.getElementById('errorIDproduct');
    const errorIDorder = document.getElementById('errorIDorder');

    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([quantityInput, productInput, IDorderInput], [errorQuantity, errorIDproduct, errorIDorder], errorsSummary);

    let valid = true;

    if(!checkRequired(quantityInput.value)) {
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantity.innerText = "This field is required.";
    } else if(!checkQuantityRange(quantityInput.value)) {
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantity.innerText = "This field has to contain a number bigger than 0";
    }

    if(!checkDropdownList(productInput.value)) {
        valid = false;
        productInput.classList.add("error-input");
        errorIDproduct.innerText = "This field is required."
    }

    if(!checkDropdownList(IDorderInput.value)) {
        valid = false;
        IDorderInput.classList.add("error-input");
        errorIDorder.innerText = "This field is required."
    }

    return valid;
}