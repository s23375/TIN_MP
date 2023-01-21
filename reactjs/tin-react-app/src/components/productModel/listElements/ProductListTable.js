import React from "react";
import ProductListTableRow from "./ProductListTableRow";
import {useTranslation} from "react-i18next";

function ProductListTable(props) {
    const products = props.productModelList

    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t("product.fields.IDproduct")}</th>
                <th>{t("product.fields.name")}</th>
                <th>{t("product.fields.price")}</th>
                <th>{t("product.fields.productionDate")}</th>
                <th>{t("product.fields.endDistributionDate")}</th>
                <th>{t("list.actions.title")}</th>
            </tr>
            </thead>
            <tbody>
            {products.map(product =>
                <ProductListTableRow productData={product} deleteProduct={props.deleteProduct} key={product.IDproduct} />
            )}
            </tbody>
        </table>
    )
}

export default ProductListTable