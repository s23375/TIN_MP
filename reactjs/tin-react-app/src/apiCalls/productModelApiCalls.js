import { productModelDetailsList} from "./productModelApiMockData";

const productModelBaseUrl = "http://localhost:3000/api/products"
export function getProductModelApiCall() {
    const promise = fetch(productModelBaseUrl)
    return promise;
}

export function getProductModelByIdApiCall(IDproduct) {
    const product = productModelDetailsList.find(product => product.IDproduct === IDproduct);
    return product
}