import React from "react";
import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../../helpers/authHelper";

function ProductListTableRow(props) {
    const product = props.productData;


    const { t } = useTranslation();
    return (
        <tr key={product.IDproduct}>
            <td data-label={t("product.fields.IDproduct")}>{product.IDproduct}</td>
            <td data-label={t("product.fields.name")}>{product.name}</td>
            <td data-label={t("product.fields.price")}>{product.price}</td>
            <td data-label={t("product.fields.productionDate")}>{product.productionDate ? getFormattedDate(product.productionDate) : ""}</td>
            <td data-label={t("product.fields.endDistributionDate")}>{product.endDistributionDate ? getFormattedDate(product.endDistributionDate) : ""}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li>
                        <Link to={`/ProductModel/details/${product.IDproduct}`} className="list-actions-button-details">{t("list.actions.details")}</Link>
                    </li>
                    <li>
                        <Link to={`/ProductModel/edit/${product.IDproduct}`} className="list-actions-button-edit">{t("list.actions.edit")}</Link>
                    </li>
                    <li>
                        <Link to={`/ProductModel`} className="list-actions-button-delete" onClick={ () => (props.deleteProduct(product.IDproduct)) }>{t("list.actions.delete")}</Link>
                    </li>
                </ul>
            </td>
            }
        </tr>
    )
}

export default ProductListTableRow