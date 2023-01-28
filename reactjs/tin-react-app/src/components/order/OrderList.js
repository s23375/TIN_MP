import React from "react"
import {Link, useLocation} from "react-router-dom"
import {deleteOrderApiCall, getOrderApiCall} from "../../apiCalls/orderApiCalls";
import OrderListTable from "./listElement/OrderListTable";

export function withRouter(Children){
    return(props)=>{

        const location  = {params: useLocation()};
        return <Children {...props}  location = {location}/> //TIP: change property name to access props.whateverYouWant
    }
}

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        let notice = props.location.params.state && props.location.params.state ? props.location.params.state : ""
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            notice: notice
        }
    }

    fetchOrderList = () => {
        getOrderApiCall()
            .then(res => res.json())
            .then( data => {
                    this.setState({
                        isLoaded: true,
                        orders: data
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

    deleteOrder = (IDorder) => {
        deleteOrderApiCall(IDorder)
            .then(res => {
                if(res.ok) {
                    this.fetchOrderList()
                }
            },
                (error) => {
                console.log(error)
                    this.fetchOrderList()
                });
    }

    componentDidMount() {
        this.fetchOrderList()
    }

    render() {
        const { error, isLoaded, orders } = this.state
        let content;

        if(error) {
            content = <p>Error: {error.message}</p>
        } else if(!isLoaded) {
            content = <p>Loading data...</p>
        } else {
            content = <OrderListTable orderList={orders} deleteOrder={this.deleteOrder} />
        }

        return (
            <main>
                <h2>All orders</h2>
                { content }
                <p className="success">{this.state.notice}</p>
                <div>
                    <p><Link to="/Order/add" className="button-add">Add new order</Link></p>
                    <p className="delete-message"></p>
                </div>
            </main>
        );
    }
}


export default withRouter(OrderList);