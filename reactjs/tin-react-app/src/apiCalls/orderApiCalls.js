const orderBaseURL = "http://localhost:3000/api/orders"
export function getOrderApiCall() {
    const promise = fetch(orderBaseURL)
    return promise;
}

export function getOrderByIdApiCall(IDorder) {
    const url = `${orderBaseURL}/${IDorder}`;
    const promise = fetch(url);
    return promise;
}

export function addOrderApiCall(order) {
    const orderString = JSON.stringify(order)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: orderString
    }
    const promise = fetch(orderBaseURL, options);
    return promise
}

export function updateOrderApiCall(IDorder, order) {
    const url = `${orderBaseURL}/${IDorder}`;
    const orderString = JSON.stringify(order)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: orderString
    }
    const promise = fetch(url, options);
    return promise
}

export function deleteOrderApiCall(IDorder) {
    const url = `${orderBaseURL}/${IDorder}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const promise = fetch(url, options)
    return promise
}