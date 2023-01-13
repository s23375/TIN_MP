import React from "react";
import {getValidationErrorKey} from "../../helpers/formHelper";
import {useTranslation} from "react-i18next";

function FormInput(props) {
    const className = props.error === "" ? "" : "error-input"
    const name = props.name
    const errorSpanID = "error" + name[0].toUpperCase() + name.slice(1)

    const error = props.error
    const errorKey = getValidationErrorKey(error)
    const { t } = useTranslation();
    const translatedErrorMessage = t(errorKey)
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}: {props.required && <abbr title="required" aria-label="required">*</abbr> }
            </label>
            <input
                type={props.type}
                className={className}
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                />
            <span id={errorSpanID} className="errors-text">{translatedErrorMessage}</span>
        </>
    )
}

export default FormInput