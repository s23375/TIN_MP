const orderedBaseUrl = "http://localhost:3000/api/ordereds"
export function getOrderedsApiCall() {
    const promise = fetch(orderedBaseUrl)
    return promise;
}

export function getOrderedsByIdApiCall(IDordered) {
    const url = `${orderedBaseUrl}/${IDordered}`;
    const promise = fetch(url);
    return promise;
}

export function addOrderedsApiCall(ordered) {
    const orderedString = JSON.stringify(ordered)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: orderedString
    }
    const promise = fetch(orderedBaseUrl, options);
    return promise
}

export function updateOrderedsApiCall(IDordered, ordered) {
    const url = `${orderedBaseUrl}/${IDordered}`;
    const orderedString = JSON.stringify(ordered)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: orderedString
    }
    const promise = fetch(url, options);
    return promise
}

export function deleteOrderedsApiCall(IDordered) {
    const url = `${orderedBaseUrl}/${IDordered}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const promise = fetch(url, options)
    return promise
}