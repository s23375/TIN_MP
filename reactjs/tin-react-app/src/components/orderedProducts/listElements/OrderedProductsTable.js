import React from "react";
import OrderedProductsTableRow from "./OrderedProductsTableRow";


function OrderedProductsTable(props) {
    const ordereds = props.orderededProductsList
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>IDordered</th>
                <th>Quantity</th>
                <th>Product</th>
                <th>Order</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {ordereds.map(ordered =>
                <OrderedProductsTableRow orderedData={ordered} key={ordered.IDorderedProduct} />
            )}
            </tbody>
        </table>
    )
}

export default OrderedProductsTable