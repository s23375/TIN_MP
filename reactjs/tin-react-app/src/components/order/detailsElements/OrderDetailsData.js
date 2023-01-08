import React from "react";

function OrderDetailsData(props) {
    const order = props.orderData
    return (
        <React.Fragment>
            <p>IDorder: {order.IDorder}</p>
            <p>Contact info: {order.clientContactInfo}</p>
            <p>Shipping method: {order.shippingCompany}</p>
            <p>Premium delivery: {order.premiumDelivery ? "Yes" : "No"}</p>

            <h2>Ordered products for the selected order</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>IDorderedProduct</th>
                    <th>Quantity</th>
                    <th>IDproduct</th>
                    <th>IDorder</th>
                </tr>
                </thead>
                <tbody>
                {order.orderedProducts.map(ordereds =>
                    <tr key={ordereds.IDorderedProduct}>
                        <td data-label="IDorderedProduct">{ordereds.IDorderedProduct}</td>
                        <td data-label="Quantity">{ordereds.quantity}</td>
                        <td data-label="IDproduct">{ordereds.productModel.name}</td>
                        <td data-label="IDorder">{ordereds.Order_IDorder}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default OrderDetailsData