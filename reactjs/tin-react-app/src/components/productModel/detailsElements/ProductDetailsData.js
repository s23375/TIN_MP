import React from "react";
import {getFormattedDate} from "../../../helpers/dateHelper";

function ProductDetailsData(props) {
    const product = props.productData
    return (
        <React.Fragment>
            <p>IDproduct: {product.IDproduct}</p>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Production date: {product.productionDate ? getFormattedDate(product.productionDate) : ""}</p>
            <p>Distribution end
                date: {product.endDistributionDate ? getFormattedDate(product.endDistributionDate) : ""}</p>

            <h2>Orders for the selected product</h2>
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
                {product.orderedProducts.map(ordereds =>
                    <tr key={ordereds.IDorderedProduct}>
                        <td data-label="IDorderedProduct">{ordereds.IDorderedProduct}</td>
                        <td data-label="Quantity">{ordereds.quantity}</td>
                        <td data-label="IDproduct">{ordereds.ProductModel_IDproduct}</td>
                        <td data-label="IDorder">{ordereds.Order_IDorder}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ProductDetailsData