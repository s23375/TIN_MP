import React from 'react';
import { Navigate, useParams} from "react-router-dom";
import formMode, {formValidationKeys} from "../../helpers/formHelper";
import {addProductApiCall, getProductModelByIdApiCall, updateProductApiCall} from "../../apiCalls/productModelApiCalls";
import {
    checkRequired,
    checkTextLengthRange,
    checkPriceRange,
    checkDate
} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import { withTranslation } from "react-i18next";

export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/> //TIP: change property name to access props.whateverYouWant
    }
}

class ProductModelForm extends React.Component {
    constructor(props) {
        super(props);

        const IDproductParams = props.match.params.IDproduct
        const currentFormMode = IDproductParams ? formMode.EDIT: formMode.NEW

        this.state = {
            IDproduct: IDproductParams,
            product: {
                name: "",
                price: "",
                productionDate: "",
                endDistributionDate: ""
            },
            errors: {
                name: "",
                price: "",
                productionDate: "",
                endDistributionDate: ""
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchProductDetails = () => {
        getProductModelByIdApiCall(this.state.IDproduct)
            .then(res => res.json())
            .then(data => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            product: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for (const errorField in this.state.errors) {
            if (errors[errorField] && errors[errorField].length > 0) {
                return true;
            }
        }
        return false;
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = "";
        if (fieldName === "name") {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if(fieldName === "price") {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkPriceRange(fieldValue)) {
                errorMessage = formValidationKeys.isPositive
            }
        }
        if(fieldName === "productionDate") {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.isDate
            }
        }
        if(fieldName === "endDistributionDate") {
            if(fieldValue && fieldValue < this.state.product.productionDate) {
                errorMessage = formValidationKeys.endDistributionDate
            }
        }

        return errorMessage;
    }

    validateForm = () => {
        const product = this.state.product;
        const errors = this.state.errors;
        for (const fieldName in product) {
            const fieldValue = product[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    handleChange = (event) => {
        const { name , value } = event.target;
        const product = { ...this.state.product };
        product[name] = value

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            product: product,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if(isValid) {
            const product = this.state.product,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addProductApiCall(product)
            } else if(currentFormMode === formMode.EDIT) {
                const IDproduct = this.state.IDproduct
                promise = updateProductApiCall(IDproduct, product)
            }
            if(promise) {
                promise
                    .then( data => {
                        response = data
                        if (response.status === 201 || response.status === 500) { //TODO MAKE SURE MY CODE RESPONSES EVEN WORK WITH THIS
                            return data.json()
                        }
                    })
                    .then( data => {
                        if(!response.ok && response.status === 500) {
                            for (const i in data) {
                                const errorItem = data[i]
                                const errorMessage = errorItem.message
                                const fieldName = errorItem.path
                                const errors = {...this.state.errors }
                                errors[fieldName] = errorMessage
                                this.setState({
                                    errors: errors,
                                    error: null
                                })
                            }
                        } else {
                            this.setState({ redirect: true })
                        }
                    },
                        (error) => {
                        this.setState({ error })
                            console.log(error)
                        }
                        )
            }
        }
    }

    componentDidMount() {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchProductDetails()
        }
    }

    render() {
        const { redirect: redirectTest } = this.state
        if (redirectTest) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? "Successfully added a product" : "Successfully updated a product"

            return (
                <Navigate to="/ProductModel/" state = { notice } />
            )
        }

        const errorsSummary = this.hasErrors() ? "The form contains errors" : ""
        const fetchError = this.state.error ? `Error: ${this.state.error.message}` : ""

        const { t } = this.props
        const pageTitle = this.state.formMode === formMode.NEW ? t("product.form.add.pageTitle") : t("product.form.edit.pageTitle")

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t("product.fields.name")} required
                        error={this.state.errors.name}
                        name="name"
                        placeholder={t("product.placeholder.name")}
                        onChange={this.handleChange}
                        value={this.state.product.name}
                    />
                    <FormInput
                        type="number"
                        label={t("product.fields.price")} required
                        error={this.state.errors.price}
                        name="price"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.product.price}
                    />
                    <FormInput
                        type="date"
                        label={t("product.fields.productionDate")} required
                        error={this.state.errors.productionDate}
                        name="productionDate"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.product.productionDate ? this.state.product.productionDate.slice(0, 10) : ""}
                    />
                    <FormInput
                        type="date"
                        label={t("product.fields.endDistributionDate")} required
                        error={this.state.errors.endDistributionDate}
                        name="endDistributionDate"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.product.endDistributionDate ? this.state.product.endDistributionDate.slice(0, 10) : ""}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/ProductModel"
                    />
                </form>
            </main>
        )
    }
}

export default withTranslation()(withRouter(ProductModelForm))