import React from 'react';
import {Link, useParams} from "react-router-dom";
import{ getProductModelByIdApiCall} from "../../apiCalls/productModelApiCalls";
import ProductDetailsData from "./detailsElements/ProductDetailsData";
import { withTranslation } from "react-i18next";

export function withRouter(Children){ // thanks(answer with 17 upvotes, wish I understood it) https://stackoverflow.com/questions/64782949/how-to-pass-params-into-link-using-react-router-v6
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/> //TIP: change property name to access props.whateverYouWant
    }
}

class ProductModelDetails extends React.Component {
    constructor(props) {
        super(props);
        let {IDproduct} = this.props.match.params
        this.state = {
            IDproduct: IDproduct,
            product: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchProductModelDetails = () => {
        getProductModelByIdApiCall(this.state.IDproduct)
            .then(res => res.json())
            .then(data => {
                    if (data.message) {
                        this.setState({
                            product: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            product: data,
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

    componentDidMount() {
        this.fetchProductModelDetails()
    }


    render() {
        const { product, error, isLoaded, message } = this.state
        let content;

        if(error) {
            content = <p>Error: {error.message}</p>
        } else if(!isLoaded) {
            content = <p>Loading data...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ProductDetailsData productData={product} />
        }

        const { t } = this.props
        return (
            <main>
                <h2>{t("product.form.details")}</h2>
                { content }
                <div className="section-buttons">
                    <Link to="/ProductModel/" className="form-button-back">{t("form.actions.return")}</Link>
                </div>

            </main>
        )
    }
}

export default withTranslation()(withRouter(ProductModelDetails));