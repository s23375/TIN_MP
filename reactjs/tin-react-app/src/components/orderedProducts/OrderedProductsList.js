import React from "react"
import {Link, useLocation} from "react-router-dom"
import {deleteOrderedsApiCall, getOrderedsApiCall} from "../../apiCalls/orderedProductsApiCalls";
import OrderedProductsTable from "./listElements/OrderedProductsTable";

export function withRouter(Children){
    return(props)=>{

        const location  = {params: useLocation()};
        return <Children {...props}  location = {location}/> //TIP: change property name to access props.whateverYouWant
    }
}

class OrderedProductsList extends React.Component {
    constructor(props) {
        super(props);
        let notice = props.location.params.state && props.location.params.state ? props.location.params.state : ""

        this.state = {
            error: null,
            isLoaded: false,
            ordereds: [],
            notice: notice
        }
    }

    fetchOrderedsList = () => {
        getOrderedsApiCall()
            .then(res => res.json())
            .then( data => {
                    this.setState({
                        isLoaded: true,
                        ordereds: data
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

    deleteOrdereds = (IDorderd) => {
        deleteOrderedsApiCall(IDorderd)
            .then(res => {
                if(res.ok) {
                    this.fetchOrderedsList()
                }
            },
                (error) => {
                console.log(error)
                    this.fetchOrderedsList()
                })
    }

    componentDidMount() {
        this.fetchOrderedsList()
    }

    render() {
        const { error, isLoaded, ordereds } = this.state
        let content;

        if(error) {
            content = <p>Error: Please log in before proceeding</p>
        } else if(!isLoaded) {
            content = <p>Loading data...</p>
        } else {
            content = <OrderedProductsTable orderededProductsList={ordereds} deleteOrdereds={this.deleteOrdereds} />
        }

        return (
            <main>
                <h2>All ordered products</h2>
                { content }
                <p className="success">{this.state.notice}</p>
                <div>
                    <p><Link to="/OrderedProducts/add" className="button-add">Add new ordered product</Link></p>
                    <p className="delete-message"></p>
                </div>
            </main>
        );
    }
}


export default withRouter(OrderedProductsList);