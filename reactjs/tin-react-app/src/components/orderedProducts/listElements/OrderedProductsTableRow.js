import React from "react";
import {Link} from "react-router-dom";
import {deleteOrderedsApiCall} from "../../../apiCalls/orderedProductsApiCalls";


function OrderedProductsTableRow(props) {
    const ordered = props.orderedData;

    return (
        <tr key={ordered.IDorderedProduct}>
            <td data-label="IDordered">{ordered.IDorderedProduct}</td>
            <td data-label="Quantity">{ordered.quantity}</td>
            <td data-label="Product">{ordered.productModel.name}</td>
            <td data-label="Order">ID: {ordered.order.IDorder} - {ordered.order.clientContactInfo}</td>
            <td>
                <ul className="list-actions">
                    <li>
                        <Link to={`/OrderedProducts/details/${ordered.IDorderedProduct}`} className="list-actions-button-details">Details</Link>
                    </li>
                    <li>
                        <Link to={`/OrderedProducts/edit/${ordered.IDorderedProduct}`} className="list-actions-button-edit">Edit</Link>
                    </li>
                    <li>
                        <Link to={`/OrderedProducts`} className="list-actions-button-delete" onClick={ () => (props.deleteOrdereds(ordered.IDorderedProduct)) }>Delete</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}

export default OrderedProductsTableRow