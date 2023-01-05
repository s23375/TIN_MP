import React from "react"
import {Link} from "react-router-dom"

import { getProductModelApiCall } from "../../apiCalls/productModelApiCalls";
import ProductModelList from "./ProductModelList";

class productModelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: []
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
            content = <ProductModelList productModelList={products} />
        }

        return (
            <main>
                <h2>All products</h2>
                { content }
                <div>
                    <p><Link to="/ProductModel/add" className="button-add">Add new product</Link></p>
                    <p className="delete-message"></p>
                </div>
            </main>
        )
    }
}


export default productModelList;