function validateForm() {
    const clientContactInfoInput = document.getElementById('clientContactInfo');
    const shippingCompanyInput = document.getElementById('shippingCompany');
    const premiumDeliveryInput = document.getElementById('premiumDelivery');

    const errorClientContactInfo = document.getElementById("errorClientContactInfo");
    const errorShippingCompany = document.getElementById("errorShippingCompany");
    const errorPremiumDelivery = document.getElementById("errorPremiumDelivery");

    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([clientContactInfoInput, shippingCompanyInput, premiumDeliveryInput], [errorClientContactInfo, errorShippingCompany, errorPremiumDelivery], errorsSummary);

    let valid = true;

    if(!checkRequired(clientContactInfoInput.value)) {
        valid = false;
        clientContactInfoInput.classList.add("error-input");
        errorClientContactInfo.innerText = "This field is required.";
    } else if(!checkEmail(clientContactInfoInput.value)) {
        valid = false;
        clientContactInfoInput.classList.add("error-input");
        errorClientContactInfo.innerText = "This field must be a valid e-mail address.";
    }

    if(!checkOrderDropdownList(shippingCompanyInput.value)) {
        valid = false;
        shippingCompanyInput.classList.add("error-input");
        errorShippingCompany.innerText = "Choose shipping method."
    }
    
    return valid;
}