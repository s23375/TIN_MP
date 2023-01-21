import React from "react"
import {Link, Navigate, useLocation} from "react-router-dom"
import { withTranslation } from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";


export function withRouter(Children){
    return(props)=>{

        const location  = {params: useLocation()};
        return <Children {...props}  location = {location}/> //TIP: change property name to access props.whateverYouWant
    }
}
class Navigation extends React.Component{
    constructor(props) {
        super(props);


        this.state = {
            pathname: props.location.params.pathname,
            redirect: false
        }
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

    customOnSubmit = () => {
        console.log(this.props.location.params.pathname)
        this.setState({
            pathname: this.props.location.params.pathname
        })
    }

    onLogInClick = () => {
        this.setState({
            redirect: true
        })

    }


    render() {
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.onClickLogout}>Logout</button> :
            <button onClick={this.onLogInClick} >Log in</button>
        const { t } = this.props;

        const bracketsDontWorkIdk = this.state.redirect
        if(bracketsDontWorkIdk) {
            let method = this.customOnSubmit;
            this.setState({
                redirect: false
            })
            return (
                <Navigate to="/Login" state = { method } />
            )
        }


        return (
            <nav>
                <ul>
                    <li><Link to="/" >{t("nav.main-page")}</Link></li>
                    <li><Link to="/ProductModel" >{t("nav.productModel")}</Link></li>
                    <li><Link to="/Order" >{t("nav.order")}</Link></li>
                    <li><Link to="/OrderedProducts" >{t("nav.orderedProducts")}</Link></li>
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

export default withTranslation()(withRouter(Navigation));