

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