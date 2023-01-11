import React from 'react';
import { Navigate, useParams} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {addOrderApiCall, getOrderByIdApiCall, updateOrderApiCall} from "../../apiCalls/orderApiCalls";
import {checkEmail, checkRequired} from "../../helpers/validationCommon";
import {menuOrderItems} from "./dropdownMenu/menuOrderItems";
import FormDropdown from "../form/FormDropdown";

export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/> //TIP: change property name to access props.whateverYouWant
    }
}

// noinspection DuplicatedCode
class OrderForm extends React.Component {
    constructor(props) {
        super(props);

        const IDorderParams = props.match.params.IDorder
        const currentFormMode = IDorderParams ? formMode.EDIT: formMode.NEW

        this.state = {
            IDorder: IDorderParams,
            order: {
                datePlaced: new Date(),
                clientContactInfo: "",
                shippingCompany: "",
                premiumDelivery: ""
            },
            errors: {
                datePlaced: "",
                clientContactInfo: "",
                shippingCompany: "",
                premiumDelivery: ""
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
            isListOpen: false,
            shippingList: [
                {
                    id: 0,
                    companyName: "DHL"
                },
                {
                    id: 1,
                    companyName: "Inpost"
                },
                {
                    id: 2,
                    companyName: "Poczta Polska"
                }
            ]
        }
    }

    fetchOrderDetails = () => {
        getOrderByIdApiCall(this.state.IDorder)
            .then(res => res.json())
            .then(data => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            order: data,
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
            if (errors[errorField].length > 0) {
                return true;
            }
        }
        return false;
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = "";
        if (fieldName === "datePlaced") {
            if(!checkRequired(fieldValue)) {
                errorMessage = "This field is required"
            }
        }
        if(fieldName === "clientContactInfo") {
            if(!checkRequired(fieldValue)) {
                errorMessage = "This field is required"
            } else if(!checkEmail(fieldValue)) {
                errorMessage = "This field has to be a valid email address"
            }
        }
        if(fieldName === "shippingCompany") {
            if(!checkRequired(fieldValue)) {
                errorMessage = "This field is required"
            }
        }
        // if(fieldName === "premiumDelivery") {
        //
        // }

        return errorMessage;
    }

    validateForm = () => {
        const order = this.state.order;
        const errors = this.state.errors;
        for (const fieldName in order) {
            const fieldValue = order[fieldName]
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
        const order = { ...this.state.order };
        order[name] = value

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            order: order,
            errors: errors
        })
    }

    dropdownHandleChange = (event) => {
        const { name , value } = event.target.value;
        const order = { ...this.state.order };
        order.shippingCompany = event.target.value


        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            order: order,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if(isValid) {
            const order = this.state.order,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addOrderApiCall(order)
            } else if(currentFormMode === formMode.EDIT) {
                console.log(order);
                const IDorder = this.state.IDorder
                promise = updateOrderApiCall(IDorder, order)
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
                                console.log(data)
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
            this.fetchOrderDetails()
        }
    }

    render() {
        const { redirect: redirectTest } = this.state
        if (redirectTest) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? "Successfully added an order" : "Successfully updated an order"

            return (
                <Navigate to="/Order/" state = { notice } />
            )
        }

        const errorsSummary = this.hasErrors() ? "The form contains errors" : ""
        const fetchError = this.state.error ? `Error: ${this.state.error.message}` : ""
        const pageTitle = this.state.formMode === formMode.NEW ? "New order" : "Edit order"

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Client contact info" required
                        error={this.state.errors.clientContactInfo}
                        name="clientContactInfo"
                        placeholder="e-mail address"
                        onChange={this.handleChange}
                        value={this.state.order.clientContactInfo}
                    />
                    <FormDropdown
                        label="Shipping company" required
                        error={this.state.errors.shippingCompany}
                        name="shippingCompany"
                        value={this.state.order.shippingCompany}
                        onChange={this.dropdownHandleChange}
                        menuItems={menuOrderItems}
                    />
                    <FormInput
                        type="checkbox"
                        label="Premium delivery"
                        error={this.state.errors.premiumDelivery}
                        name="premiumDelivery"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.order.premiumDelivery}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/Order"
                    />
                </form>
            </main>
        )
    }
}

export default withRouter(OrderForm)