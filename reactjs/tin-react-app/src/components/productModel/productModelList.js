import React from "react"
import {Link} from "react-router-dom"

function productModelList() {
    return (
        <main>
            <h2>All products</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>IDproduct</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Production date</th>
                    <th>Distribution end date</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                    <td data-label="IDproduct">1</td>
                    <td data-label="Name">Axceleron baleron kurde</td>
                    <td data-label="Price">100</td>
                    <td data-label="Production date">16.09.2022</td>
                    <td data-label="Distribution end date">14.12.2021</td>
                    <td>
                    <ul className="list-actions">
                    <li>
                    <Link to="/ProductModel/details/1" className="list-actions-button-details">Details</Link>
                    </li>
                    <li>
                    <Link to="/ProductModel/edit/1" className="list-actions-button-edit">Edit</Link>
                    </li>
                    <li>
                    <Link to="/ProductModel/delete/1" className="list-actions-button-delete" onClick="alert('Deleted successfully')">Delete</Link>
                    </li>
                    </ul>
                    </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <p><Link to="/ProductModel/add" className="button-add">Add new product</Link></p>
                <p className="delete-message"></p>
            </div>

        </main>
    )
}

export default productModelList();