import React from "react"
import {Link, useLocation} from "react-router-dom"

import { getProductModelApiCall } from "../../apiCalls/productModelApiCalls";
import ProductListTable from "./listElements/ProductListTable";

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

    componentDidMount() {
        this.fetchProductModelList()
    }

    render() {
        const { error, isLoaded, products } = this.state
        let content;

        if(error) {
            content = <p>Error: {error.message}</p>
        } else if(!isLoaded) {
            content = <p>Loading data...</p>
        } else {
            content = <ProductListTable productModelList={products} />
        }

        return (
            <main>
                <h2>All products</h2>
                { content }
                <p className="success">{this.state.notice}</p>
                <div>
                    <p><Link to="/ProductModel/add" className="button-add">Add new product</Link></p>
                    <p className="delete-message"></p>
                </div>
            </main>
        );
    }
}


export default withRouter(ProductModelList);