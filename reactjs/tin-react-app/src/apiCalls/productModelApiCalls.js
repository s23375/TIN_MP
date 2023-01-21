import {getCurrentUser} from "../helpers/authHelper";

const productModelBaseUrl = "http://localhost:3000/api/products"
export function getProductModelApiCall() {
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    const promise = fetch(productModelBaseUrl, options)
    return promise;
}

export function getProductModelByIdApiCall(IDproduct) {
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    const url = `${productModelBaseUrl}/${IDproduct}`;
    const promise = fetch(url, options);
    return promise;
}

export function addProductApiCall(product) {
    const user = getCurrentUser()
    const productString = JSON.stringify(product)
    let token
    if(user && user.token) {
        token = user.token
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: productString
    }
    const promise = fetch(productModelBaseUrl, options);
    return promise
}

export function updateProductApiCall(IDproduct, product) {
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }

    const url = `${productModelBaseUrl}/${IDproduct}`;
    const productString = JSON.stringify(product)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: productString
    }
    const promise = fetch(url, options);
    return promise
}

export function deleteProductApiCall(IDproduct) {
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }

    const url = `${productModelBaseUrl}/${IDproduct}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    const promise = fetch(url, options)
    return promise
}