import React from 'react';
import { Link, useParams } from "react-router-dom";
import{ getProductModelByIdApiCall} from "../../apiCalls/productModelApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";

function ProductModelDetails() {
    let { IDproduct } = <useParams />; //changed () to < /> and it stopped throwing the error??????????????????????????????????????
    IDproduct = 1
    //IDproduct = parseInt(IDproduct);
    const product = getProductModelByIdApiCall(IDproduct);

    return (
        <main>
            <h2>Details for this product</h2>
            <p>IDproduct: {product.IDproduct}</p>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Production date: {product.productionDate ? getFormattedDate(product.productionDate) : ""}</p>
            <p>Distribution end date: {product.endDistributionDate ? getFormattedDate(product.endDistributionDate) : ""}</p>

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
                {product.ordered.map( ordereds =>
                    <tr key={ordereds.IDorderedProduct}>
                        <td data-label="IDorderedProduct">{ordereds.IDorderedProduct}</td>
                        <td data-label="Quantity">{ordereds.quantity}</td>
                        <td data-label="IDproduct">{ordereds.IDproduct}</td>
                        <td data-label="IDorder">{ordereds.IDorder}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="section-buttons">
                <Link to="/ProductModel/" className="form-button-back">Back</Link>
            </div>

        </main>
    )
}

export default ProductModelDetails();