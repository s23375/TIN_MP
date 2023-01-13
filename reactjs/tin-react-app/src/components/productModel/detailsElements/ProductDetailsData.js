import React from "react";
import {getFormattedDate} from "../../../helpers/dateHelper";
import { useTranslation } from "react-i18next";

function ProductDetailsData(props) {
    const product = props.productData

    const { t } = useTranslation()
    return (
        <React.Fragment>
            <p>{t("product.fields.IDproduct")}: {product.IDproduct}</p>
            <p>{t("product.fields.name")}: {product.name}</p>
            <p>{t("product.fields.price")}: {product.price}</p>
            <p>{t("product.fields.productionDate")}: {product.productionDate ? getFormattedDate(product.productionDate) : ""}</p>
            <p>{t("product.fields.endDistributionDate")}: {product.endDistributionDate ? getFormattedDate(product.endDistributionDate) : ""}</p>

            <h2>{t("product.form.detailsForm.secondTitle")}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t("orderedProducts.fields.IDorderedProduct")}</th>
                    <th>{t("orderedProducts.fields.quantity")}</th>
                    <th>{t("orderedProducts.fields.IDproductModel")}</th>
                    <th>{t("orderedProducts.fields.IDorder")}</th>
                </tr>
                </thead>
                <tbody>
                {product.orderedProducts.map(ordereds =>
                    <tr key={ordereds.IDorderedProduct}>
                        <td data-label={t("orderedProducts.fields.IDorderedProduct")}>{ordereds.IDorderedProduct}</td>
                        <td data-label={t("orderedProducts.fields.quantity")}>{ordereds.quantity}</td>
                        <td data-label={t("orderedProducts.fields.IDproductModel")}>{ordereds.ProductModel_IDproduct}</td>
                        <td data-label={t("orderedProducts.fields.IDorder")}>{ordereds.Order_IDorder}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ProductDetailsData