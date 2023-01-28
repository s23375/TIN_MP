import React from "react"
import {Link, useLocation} from "react-router-dom"
import {deleteProductApiCall, getProductModelApiCall} from "../../apiCalls/productModelApiCalls";
import ProductListTable from "./listElements/ProductListTable";
import { withTranslation } from "react-i18next";

export function withRouter(Children){
    return(props)=>{

        const location  = {params: useLocation()};
        return <Children {...props}  location = {location}/> //TIP: change property name to access props.whateverYouWant
    }
}

class ProductModelList extends React.Component {
    constructor(props) {
        super(props);
        let notice = props.location.params.state && props.location.params.state ? props.location.params.state : ""

        this.state = {
            error: null,
            isLoaded: false,
            products: [],
            notice: notice
        }
    }

    fetchProductModelList = () => {
        getProductModelApiCall()
            .then(res => res.json())
            .then( data => {
                this.setState({
                    isLoaded: true,
                    products: data
                });
            },
                (error) => {
                this.setState({
                    isLoaded: true,
                    error
                    });
                }
            )
    }

    deleteProductModel = (IDproduct) => {
        deleteProductApiCall(IDproduct)
            .then(res => {
                if(res.ok) {
                    this.fetchProductModelList()
                }
            },
                (error) => {
                console.log(error)
                    this.fetchProductModelList()
                });
    }

    componentDidMount() {
        this.fetchProductModelList()
    }

    render() {
        const { error, isLoaded, products } = this.state
        let content;

        if(error) {
            content = <p>Error: Please log in before proceeding</p>
        } else if(!isLoaded) {
            content = <p>Loading data...</p>
        } else {
            content = <ProductListTable productModelList={products} deleteProduct={this.deleteProductModel} />
        }

        const { t } = this.props;
        return (
            <main>
                <h2>{t("product.list.title")}</h2>
                { content }
                <p className="success">{this.state.notice}</p>
                <div>
                    <p><Link to="/ProductModel/add" className="button-add">{t("product.list.addNew")}</Link></p>
                    <p className="delete-message"></p>
                </div>
            </main>
        );
    }
}


export default withTranslation()(withRouter(ProductModelList));