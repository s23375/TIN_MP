import React from "react"
import {loginApiCall} from "../../apiCalls/authApiCalls";
import {checkRequired} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import LoginFormButtons from "./LoginFormButtons";
import formMode, {formValidationKeys} from "../../helpers/formHelper";
import {Navigate, useLocation} from "react-router-dom";


export function withRouter(Children){
    return(props)=>{

        const location  = {params: useLocation()};
        return <Children {...props}  location = {location}/> //TIP: change property name to access props.whateverYouWant
    }
}
class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        console.log(props)
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
            prevPath: "",
            redirect: false
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
                            this.setState({
                                redirect: true
                            })
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

        const { redirect: redirectTest } = this.state
        if (redirectTest) {
            return (
                <Navigate to="/"  />
            )
        }

        return (
            <main>
                <div id="login">
                    <h2>Log in</h2>
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
                        <LoginFormButtons
                            error={globalErrorMessage}
                            cancelPath="/"
                            submitButtonLabel="Log in"
                            onClickSubmit={this.state.onClickSubmit}
                        />
                    </form>
                </div>
            </main>
        )
    }

}

export default withRouter(LoginForm)