import React from "react"
import {Link} from "react-router-dom"

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Main page</Link></li>
                <li><Link to="/ProductModel">Product models</Link></li>
                <li><Link to="/Order">Orders</Link></li>
                <li><Link to="/OrderedProducts">Ordered products</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;