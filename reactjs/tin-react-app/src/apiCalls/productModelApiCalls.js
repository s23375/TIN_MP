const productModelBaseUrl = "http://localhost:3000/api/products"
export function getProductModelApiCall() {
    const promise = fetch(productModelBaseUrl)
    return promise;
}

export function getProductModelByIdApiCall(IDproduct) {
    const url = `${productModelBaseUrl}/${IDproduct}`;
    const promise = fetch(url);
    return promise;
}

export function addProductApiCall(product) {
    const productString = JSON.stringify(product)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: productString
    }
    const promise = fetch(productModelBaseUrl, options);
    return promise
}

export function updateProductApiCall(IDproduct, product) {
    const url = `${productModelBaseUrl}/${IDproduct}`;
    const productString = JSON.stringify(product)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: productString
    }
    const promise = fetch(url, options);
    return promise
}

export function deleteProductApiCall(IDproduct) {
    const url = `${productModelBaseUrl}/${IDproduct}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const promise = fetch(url, options)
    return promise
}