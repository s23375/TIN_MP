import React from 'react';
import { Navigate, useParams} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {
    checkRequired,
    checkQuantityRange
} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {
    addOrderedsApiCall,
    getOrderedsByIdApiCall,
    updateOrderedsApiCall
} from "../../apiCalls/orderedProductsApiCalls";
import {menuProductsItems} from "./dropdownMenu/menuProductsItems";
import {getProductModelApiCall} from "../../apiCalls/productModelApiCalls";
import FormDropdownOrdered from "./dropdownMenu/FormDropdownOrdered";
import {getOrderApiCall} from "../../apiCalls/orderApiCalls";
import {menuOrdersItems} from "./dropdownMenu/menuOrdersItems";


export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/> //TIP: change property name to access props.whateverYouWant
    }
}

class OrderedProductsForm extends React.Component {
    constructor(props) {
        super(props);

        const IDorderedParams = props.match.params.IDordered
        const currentFormMode = IDorderedParams ? formMode.EDIT: formMode.NEW

        this.state = {
            IDordered: IDorderedParams,
            ordered: {
                quantity: "",
                ProductModel_IDproduct: "",
                Order_IDorder: "",
            },
            errors: {
                quantity: "",
                ProductModel_IDproduct: "",
                Order_IDorder: "",
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,

            products: [],
            orders: []
        }
    }

    fetchOrderedDetails = () => {
        getOrderedsByIdApiCall(this.state.IDordered)
            .then(res => res.json())
            .then(data => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            ordered: data,
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

    fetchProductModelList = () => {
        getProductModelApiCall()
            .then(res => res.json())
            .then( data => {
                    this.setState({
                        isLoaded: true,
                        products: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    fetchOrderList = () => {
        getOrderApiCall()
            .then(res => res.json())
            .then( data => {
                    this.setState({
                        isLoaded: true,
                        orders: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
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
        if (fieldName === "quantity") {
            if(!checkRequired(fieldValue)) {
                errorMessage = "This field is required"
            } else if(!checkQuantityRange(fieldValue)) {
                errorMessage = "This field has to contain a number bigger than 0"
            }
        }
        if(fieldName === "ProductModel_IDproduct") {
            if(!checkRequired(fieldValue)) {
                errorMessage = "This field is required"
            }
        }
        if(fieldName === "Order_IDorder") {
            if(!checkRequired(fieldValue)) {
                errorMessage = "This field is required"
            }
        }

        return errorMessage;
    }

    validateForm = () => {
        const ordered = this.state.ordered;
        const errors = this.state.errors;
        for (const fieldName in ordered) {
            const fieldValue = ordered[fieldName]
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
        const ordered = { ...this.state.ordered };
        ordered[name] = value

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            ordered: ordered,
            errors: errors
        })
    }

    dropdownHandleProductChange = (event) => {
        const { name , value } = event.target.value;
        const ordered = { ...this.state.ordered };
        ordered.ProductModel_IDproduct = event.target.value


        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            ordered: ordered,
            errors: errors
        })
    }

    dropdownHandleOrderChange = (event) => {
        const { name , value } = event.target.value;
        const ordered = { ...this.state.ordered };
        ordered.Order_IDorder = event.target.value


        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            ordered: ordered,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if(isValid) {
            const ordered = this.state.ordered,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addOrderedsApiCall(ordered)
            } else if(currentFormMode === formMode.EDIT) {
                console.log(ordered);
                const IDordered = this.state.IDordered
                promise = updateOrderedsApiCall(IDordered, ordered)
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
        this.fetchProductModelList()
        this.fetchOrderList()
        if (currentFormMode === formMode.EDIT) {
            this.fetchOrderedDetails()
        }
    }

    render() {
        const { redirect: redirectTest } = this.state
        if (redirectTest) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? "Successfully added an ordered product" : "Successfully updated an ordered product"

            return (
                <Navigate to="/OrderedProducts/" state = { notice } />
            )
        }

        const errorsSummary = this.hasErrors() ? "The form contains errors" : ""
        const fetchError = this.state.error ? `Error: ${this.state.error.message}` : ""
        const pageTitle = this.state.formMode === formMode.NEW ? "New ordered" : "Edit ordered"

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="number"
                        label="Quantity" required
                        error={this.state.errors.quantity}
                        name="quantity"
                        onChange={this.handleChange}
                        value={this.state.ordered.quantity}
                    />
                    <FormDropdownOrdered
                        label="Product" required
                        error={this.state.errors.ProductModel_IDproduct}
                        name="ProductModel_IDproduct"
                        value={this.state.ordered.ProductModel_IDproduct}
                        empty="-- Choose product --"
                        onChange={this.dropdownHandleProductChange}
                        menuItems={menuProductsItems(this.state.products)}
                    />
                    <FormDropdownOrdered
                        label="Order" required
                        error={this.state.errors.Order_IDorder}
                        name="Order_IDorder"
                        value={this.state.ordered.Order_IDorder}
                        empty="-- Choose order --"
                        onChange={this.dropdownHandleOrderChange}
                        menuItems={menuOrdersItems(this.state.orders)}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/OrderedProducts"
                    />
                </form>
            </main>
        )
    }
}

export default withRouter(OrderedProductsForm)