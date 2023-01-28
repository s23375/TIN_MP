import React from "react";
import OrderListTableRow from "./OrderListTableRow";


function OrderListTable(props) {
    const orders = props.orderList
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>IDorder</th>
                <th>Date of placing order</th>
                <th>Contact info</th>
                <th>Shipping company</th>
                <th>Premium delivery</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(order =>
                <OrderListTableRow orderData={order} deleteOrder={props.deleteOrder} key={order.IDorder} />
            )}
            </tbody>
        </table>
    )
}

export default OrderListTable