import React from "react";
import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";

function OrderListTableRow(props) {
    const order = props.orderData;
    return (
        <tr key={order.IDorder}>
            <td data-label="IDorder">{order.IDorder}</td>
            <td data-label="Date of placing order">{order.datePlaced ? getFormattedDate(order.datePlaced) : ""}</td>
            <td data-label="Contact info">{order.clientContactInfo}</td>
            <td data-label="Shipping company">{order.shippingCompany}</td>
            <td data-label="Premium delivery">{order.premiumDelivery ? "Yes" : "No"}</td>
            <td>
                <ul className="list-actions">
                    <li>
                        <Link to={`/Order/details/${order.IDorder}`} className="list-actions-button-details">Details</Link>
                    </li>
                    <li>
                        <Link to={`/Order/edit/${order.IDorder}`} className="list-actions-button-edit">Edit</Link>
                    </li>
                    <li>
                        <Link to={`/Order/delete/${order.IDorder}`} className="list-actions-button-delete" onClick="alert('Deleted successfully')">Delete</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}

export default OrderListTableRow