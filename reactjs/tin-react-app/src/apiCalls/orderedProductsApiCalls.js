import {getCurrentUser} from "../helpers/authHelper";

const orderedBaseUrl = "http://localhost:3000/api/ordereds"
export function getOrderedsApiCall() {
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
    const promise = fetch(orderedBaseUrl, options)
    return promise;
}

export function getOrderedsByIdApiCall(IDordered) {
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

    const url = `${orderedBaseUrl}/${IDordered}`;
    const promise = fetch(url, options);
    return promise;
}

export function addOrderedsApiCall(ordered) {
    const orderedString = JSON.stringify(ordered)
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
        body: orderedString
    }
    const promise = fetch(orderedBaseUrl, options);
    return promise
}

export function updateOrderedsApiCall(IDordered, ordered) {
    const url = `${orderedBaseUrl}/${IDordered}`;
    const orderedString = JSON.stringify(ordered)
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: orderedString
    }
    const promise = fetch(url, options);
    return promise
}

export function deleteOrderedsApiCall(IDordered) {
    const url = `${orderedBaseUrl}/${IDordered}`;
    const user = getCurrentUser()
    let token
    if(user && user.token) {
        token = user.token
    }


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