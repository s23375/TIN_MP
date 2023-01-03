import {productModelList, productModelDetailsList} from "./productModelApiMockData";

export function getProductModelApiCall() {
    return productModelList
}

export function getProductModelByIdApiCall(IDproduct) {
    const product = productModelDetailsList.find(product => product.IDproduct === IDproduct);
    return product
}