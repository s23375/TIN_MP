import React from "react";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";

function LoginFormButtons(props) {
    const { t } = useTranslation();
    const submitButtonLabel = props.submitButtonLabel;

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">{t("form.actions.cancel")}</Link>
        </div>
    )
}

export default LoginFormButtons