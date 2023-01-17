import React from "react"
import {Link, Navigate} from "react-router-dom"
import { withTranslation } from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";



class Navigation extends React.Component{
    constructor(props) {
        super(props);

    }

    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if(err) return console.log("Something went wrong when loading", err)
        });
    }

    onClickLogout = () => {
        this.props.handleLogout()
        this.forceUpdate()
    }


    render() {
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.onClickLogout}>Logout</button> :
            <Link to="/Login" >Log in</Link>
        const { t } = this.props;

        return (
            <nav>
                <ul>
                    <li><Link to="/">{t("nav.main-page")}</Link></li>
                    <li><Link to="/ProductModel">{t("nav.productModel")}</Link></li>
                    <li><Link to="/Order">{t("nav.order")}</Link></li>
                    <li><Link to="/OrderedProducts">{t("nav.orderedProducts")}</Link></li>
                    <li className="lang">{loginLogoutLink}</li>
                </ul>
                <ul>
                    <li className="lang"><button onClick={() => {this.handleLanguageChange("en") }}>EN</button></li>
                    <li className="lang"><button onClick={() => {this.handleLanguageChange("pl") }}>PL</button></li>
                </ul>
            </nav>
        )
    }

}

export default withTranslation()(Navigation);