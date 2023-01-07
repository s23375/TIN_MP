import React from "react"
import {Link, useParams} from "react-router-dom"
import {getOrderApiCall} from "../../apiCalls/orderApiCalls";
import OrderListTable from "./listElement/OrderListTable";




export function withRouter(Children){
    return(props)=>{

        const location  = {params: useParams()};
        return <Children {...props}  location = {location}/> //TIP: change property name to access props.whateverYouWant
    }
}

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        let notice = props.location.state && props.location.notice ? props.location.state.notice: ""
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
            content = <OrderListTable orderList={orders} />
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