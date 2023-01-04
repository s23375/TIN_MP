import React from "react"
import {Link} from "react-router-dom"

import { getProductModelApiCall } from "../../apiCalls/productModelApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";

function productModelList() {
    const productModelList = getProductModelApiCall();

    return (
        <main>
            <h2>All products</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>IDproduct</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Production date</th>
                    <th>Distribution end date</th>
                </tr>
                </thead>
                <tbody>
                {productModelList.map(product => (
                    <tr key={product.IDproduct}>
                        <td data-label="Name">{product.name}</td>
                        <td data-label="Price">{product.price}</td>
                        <td data-label="Production date">{product.productionDate ? getFormattedDate(product.productionDate) : ""}</td>
                        <td data-label="Distribution end date">{product.endDistributionDate ? getFormattedDate(product.endDistributionDate) : ""}</td>
                        <td>
                            <ul className="list-actions">
                                <li>
                                    <Link to={`/ProductModel/details/${product.IDproduct}`} className="list-actions-button-details">Details</Link>
                                </li>
                                <li>
                                    <Link to={`/ProductModel/edit/${product.IDproduct}`} className="list-actions-button-edit">Edit</Link>
                                </li>
                                <li>
                                    <Link to={`/ProductModel/delete/${product.IDproduct}`} className="list-actions-button-delete" onClick="alert('Deleted successfully')">Delete</Link>
                                </li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <p><Link to="/ProductModel/add" className="button-add">Add new product</Link></p>
                <p className="delete-message"></p>
            </div>

        </main>
    )
}

export default productModelList;