import React from "react";
import ProductListTableRow from "./ProductListTableRow";

function ProductListTable(props) {
    const products = props.productModelList
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>IDproduct</th>
                <th>Name</th>
                <th>Price</th>
                <th>Production date</th>
                <th>Distribution end date</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {products.map(product =>
                <ProductListTableRow productData={product} key={product.IDproduct} />
            )}
            </tbody>
        </table>
    )
}

export default ProductListTable