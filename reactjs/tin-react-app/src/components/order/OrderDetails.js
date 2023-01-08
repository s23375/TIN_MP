import React from 'react';
import {Link, useParams} from "react-router-dom";
import {getOrderByIdApiCall} from "../../apiCalls/orderApiCalls";
import OrderDetailsData from "./detailsElements/OrderDetailsData";

export function withRouter(Children){ // thanks(answer with 17 upvotes, wish I understood it) https://stackoverflow.com/questions/64782949/how-to-pass-params-into-link-using-react-router-v6
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/> //TIP: change property name to access props.whateverYouWant
    }
}

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        let {IDorder} = this.props.match.params
        this.state = {
            IDorder: IDorder,
            order: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchOrderDetails = () => {
        getOrderByIdApiCall(this.state.IDorder)
            .then(res => res.json())
            .then(data => {
                    if (data.message) {
                        this.setState({
                            order: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            order: data,
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
        this.fetchOrderDetails()
    }


    render() {
        const { order, error, isLoaded, message } = this.state
        let content;

        if(error) {
            content = <p>Error: {error.message}</p>
        } else if(!isLoaded) {
            content = <p>Loading data...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <OrderDetailsData orderData={order} />
        }

        return (
            <main>
                <h2>Details for this order</h2>
                { content }
                <div className="section-buttons">
                    <Link to="/Order/" className="form-button-back">Back</Link>
                </div>

            </main>
        )
    }
}

export default withRouter(OrderDetails);