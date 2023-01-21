import {getCurrentUser} from "../helpers/authHelper";

const orderBaseURL = "http://localhost:3000/api/orders"
export function getOrderApiCall() {
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
    const promise = fetch(orderBaseURL, options)
    return promise;
}

export function getOrderByIdApiCall(IDorder) {
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
    const url = `${orderBaseURL}/${IDorder}`;
    const promise = fetch(url, options);
    return promise;
}

export function addOrderApiCall(order) {
    const orderString = JSON.stringify(order)
    const user = getCurrentUser()
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
        body: orderString
    }
    const promise = fetch(orderBaseURL, options);
    return promise
}

export function updateOrderApiCall(IDorder, order) {
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }

    const url = `${orderBaseURL}/${IDorder}`;
    const orderString = JSON.stringify(order)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: orderString
    }
    const promise = fetch(url, options);
    return promise
}

export function deleteOrderApiCall(IDorder) {
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }

    const url = `${orderBaseURL}/${IDorder}`;
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