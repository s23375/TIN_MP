import React from "react";

function FormDropdown(props) {
    const className = props.error === "" ? "" : "error-input"
    const name = props.name
    const errorSpanID = "error" + name[0].toUpperCase() + name.slice(1)


    return (
        <>
            <label htmlFor={props.name}>
                {props.label}: {props.required && <abbr title="required" aria-label="required">*</abbr> }
            </label>
            <select
                className={className}
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.onChange}>
                <option hidden={props.error === ""} >{props.empty}</option>
                {props.menuItems.map( (option) => (
                    <option
                        value={option.value} key={option.value} >{option.label}
                    </option>
                ))}
            </select>
            <span id={errorSpanID} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormDropdown