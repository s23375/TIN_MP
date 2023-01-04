import React from 'react';
import { Link } from "react-router-dom";

class ProductModelForm extends React.Component {
    render() {
        return (
            <main>
                <h2>New product</h2>
                <form className="form">
                    <label htmlFor="name">Name: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="name" id="name" placeholder="2-60 characters" defaultValue="" />
                    <span id="errorProductName" className="errors-text"></span>

                    <label htmlFor="price">Price: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="number" name="price" id="price" defaultValue="" />
                    <span id="errorProductPrice" className="errors-text"></span>

                    <label htmlFor="productionDate">Production date: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="date" name="productionDate" id="productionDate" defaultValue="" />
                    <span id="errorProductionDate" className="errors-text"></span>

                    <label htmlFor="endDistributionDate">Distribution end date: </label>
                    <input type="date" name="endDistributionDate" id="endDistributionDate" defaultValue="" />
                    <span id="errorEndDistributionDate" className="errors-text"></span>
                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" defaultValue="Add" />
                        <Link to="/ProductModel" className="form-button-cancel">Cancel</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default ProductModelForm