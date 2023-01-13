import React from "react"
import {Link} from "react-router-dom"
import { withTranslation } from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";



class Navigation extends React.Component{

    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if(err) return console.log("Something went wrong when loading", err)
        });
    }

    render() {
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>Logout</button> : <Link to="/login">Log in</Link>

        return (
            <nav>
                <ul>
                    <li><Link to="/">Main page</Link></li>
                    <li><Link to="/ProductModel">Product models</Link></li>
                    <li><Link to="/Order">Orders</Link></li>
                    <li><Link to="/OrderedProducts">Ordered products</Link></li>
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