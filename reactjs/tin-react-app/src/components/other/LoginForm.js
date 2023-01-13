import React from "react"
import formMode, {formValidationKeys} from "../../helpers/formHelper";
import {addProductApiCall, updateProductApiCall} from "../../apiCalls/productModelApiCalls";
import {loginApiCall} from "../../apiCalls/authApiCalls";
import {checkDate, checkPriceRange, checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {withRouter} from "../order/OrderForm";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                password: ""
            },
            errors: {
                email: "",
                password: ""
            },
            error: "",
            message: "",
            prevPath: ""
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const user = { ...this.state.user }
        user[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            user: user,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if(isValid) {
            const user = this.state.user
            let response;
            loginApiCall(user)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then( data => {
                    if(response.status === 200) {
                        if(data.token) {
                            const userString = JSON.stringify(data)
                            this.props.handleLogin(userString)
                            //this.props.history.goBack()
                        }
                    } else if (response.status === 401) {
                        console.log(401)
                        this.setState({ message: data.message })
                    }
                },
                    (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                    })
        }
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = "";
        if (fieldName === "email") {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if(fieldName === "password") {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        return errorMessage;
    }

    validateForm = () => {
        const user = this.state.user;
        const errors = this.state.errors;
        for (const fieldName in user) {
            const fieldValue = user[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
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

    render() {
        const { t } = this.props
        const errorsSummary = this.hasErrors() ? "The form contains errors" : ""
        const fetchError = this.state.error ? `Error: ${this.state.error.message}` : ""
        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <div id="login">
                    <h2>ILL CHANGE THIS LATER</h2>
                    <form className="form" method="post" onSubmit={this.handleSubmit}>
                        <FormInput
                            type="text"
                            label="Email" required
                            error={this.state.errors.email}
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.user.email}
                        />
                        <FormInput
                            type="text"
                            label="Password" required
                            error={this.state.errors.password}
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.user.password}
                        />
                        <FormButtons
                            error={globalErrorMessage}
                            cancelPath="/"
                            submitButtonLabel="Log in"
                        />
                    </form>
                </div>
            </main>
        )
    }

}

export default withRouter(LoginForm)