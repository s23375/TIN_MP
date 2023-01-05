import React from "react";
import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";

function ProductListTableRow(props) {
    const product = props.productModelList;
    return (
        <tr>
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
    )
}

export default ProductListTableRow