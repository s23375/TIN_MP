import React from "react";
import {getFormattedDate} from "../../../helpers/dateHelper";


function OrderedProductsDetailsData(props) {
    const ordered = props.orderedData
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <React.Fragment>
            <p>IDordered: {ordered.IDorderedProduct}</p>
            <p>Quantity: {ordered.quantity}</p>
            <p>Product: {ordered.productModel.name}</p>
            <p>Product price: {ordered.productModel.price}</p>
            <p>Total price: {formatter.format(ordered.productModel.price * ordered.quantity)}</p>
            <p>Order ID: {ordered.order.IDorder} - {ordered.order.clientContactInfo}</p>

            <h2>Details for this ordered product</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date of placing order</th>
                    <th>Contact info</th>
                    <th>Shipping company</th>
                    <th>Premium delivery</th>
                </tr>
                </thead>
                <tbody>
                    <tr key={ordered.order.IDorder}>
                        <td data-label="IDorder">{ordered.order.IDorder}</td>
                        <td data-label="Date of placing order">{ordered.order.datePlaced ? getFormattedDate(ordered.order.datePlaced) : ""}</td>
                        <td data-label="Contact info">{ordered.order.clientContactInfo}</td>
                        <td data-label="Shipping company">{ordered.order.shippingCompany}</td>
                        <td data-label="Premium delivery">{ordered.order.premiumDelivery ? "Yes" : "No"}</td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default OrderedProductsDetailsData