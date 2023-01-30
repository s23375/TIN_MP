import React, {createRef, useRef, useState, useTransition} from "react"
import {loginApiCall} from "../../apiCalls/authApiCalls";
import {checkRequired} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import LoginFormButtons from "./LoginFormButtons";
import {formValidationKeys} from "../../helpers/formHelper";
import {useNavigate} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"


function LoginForm(props) {
    const recaptchaRef = createRef();

    const [err, setErr] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);

    const [isCaptchaValid, setCaptcha] = useState(true);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)

        setFormErrors({
            ...formErrors,
            [name]: errorMessage
        })
        setUser({
            ...user,
            [name]: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const isValid = validateForm()
        if(isValid && validateCaptcha()) {
            const u = user
            let response;

            loginApiCall(u)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then( data => {
                    if(response.status === 200) {
                        if(data.token) {
                            const userString = JSON.stringify(data)
                            props.handleLogin(userString)
                            navigate(-1);
                        }
                    } else if (response.status === 401) {
                        console.log(401)
                        setMessage(data.message);
                    }
                },
                    (error) => {
                        setIsLoaded(true);
                        setErr(error)
                    })
        }
    }

    function validateField(fieldName, fieldValue) {
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

    function validateForm() {
        const u = user;
        let serverFieldsErrors = { ...formErrors };

        for(const fieldName in u) {
            const fieldValue = user[fieldName];
            const errorMessage = validateField(fieldName, fieldValue)
            serverFieldsErrors[fieldName] = errorMessage;
        }

        setFormErrors(serverFieldsErrors)
        return !hasErrors();
    }

    function hasErrors() {
        let serverFieldsErrors = { ...formErrors };
        for(const errorField in serverFieldsErrors) {
            if(serverFieldsErrors[errorField].length > 0) {
                return true;
            }
        }
        return false;
    }

    //captcha stuff
    const REACT_APP_SITE_KEY = "6LdagDMkAAAAAP1-Giax-n2XwfAUhEs8VPXIHMNv"

    function validateCaptcha() {
        if (recaptchaRef.current == null) {
            setCaptcha(true);
            return true;
        }
        const res = recaptchaRef.current.getValue();
        if (res != null && res !== '') {
            setCaptcha(true);
            return true;
        } else {
            setCaptcha(false);
            return false;
        }

    }

    const { t } = useTransition();
    const errorsSummary = hasErrors() ? "The form contains errors" : (isCaptchaValid ? "" : "Please use reCaptcha to prove your humanity")
    const fetchError = err ? `Error: ${err.message}` : ""
    const globalErrorMessage = errorsSummary || fetchError || message
    return (
        <main>
            <div id="login">
                <h2>Log in</h2>
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        label="Email" required
                        error={formErrors["email"]}
                        name="email"
                        onChange={handleChange}
                        value={user["email"]}
                    />
                    <FormInput
                        type="text"
                        label="Password" required
                        error={formErrors["password"]}
                        name="password"
                        onChange={handleChange}
                        value={user["password"]}
                    />
                    <ReCAPTCHA
                        sitekey={REACT_APP_SITE_KEY}
                        ref={recaptchaRef}
                    />
                    <LoginFormButtons
                        error={globalErrorMessage}
                        cancelPath="/"
                        submitButtonLabel="Log in"
                    />
                </form>
            </div>
        </main>
    )
}

export default LoginForm