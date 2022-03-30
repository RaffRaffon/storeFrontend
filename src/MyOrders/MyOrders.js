import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header"
import { OrdersService } from "../services/orders.service";
import './myorders.css';
function MyOrders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function getUserOrders() {
            setOrders(await OrdersService.getOrders(localStorage['store-user']))
        }
        getUserOrders()
    }, [])


    return (
        <div>

            <Header />
            <h1>My Orders</h1>
            {orders.length > 0 ? <table>
                <tr>
                    <th>Order ID</th>
                    <th>Order date</th>
                    <th>Total order cost</th>
                    <th>Order details</th>
                </tr>
                {orders.map((order) => {
                    return (<tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.OrderDate}</td>
                        <td>{order.TotalPrice}</td>
                        <td><Link to={"/order/" + order._id}>Details</Link></td>
                    </tr>)
                })}
            </table> : <p>You haven't ordered anything yet!</p>}
        </div>
    )
}

export default MyOrders