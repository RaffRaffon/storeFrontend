import { useEffect, useState } from "react";
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

    useEffect(() => {
        console.log(orders);
    }, [orders])
    return (
        <div>
            <Header />
            <h1>My Orders</h1>
            <table>
                <tr>
                    <th>Order ID</th>
                    <th>Order date</th>
                    <th>Total order cost</th>
                    <th>Pay status</th>
                    <th>Pay date</th>
                    <th>Order details</th>
                    <th>Cancel order</th>
                </tr>
                {orders.map((order, index) => {
                    return (<tr>
                        <td>{order._id}</td>
                        <td>{}</td>
                        <td>{order.TotalPrice}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td><button>Details</button></td>
                        <td><button>Cancel</button></td>
                    </tr>)
                })}
            </table>
        </div>
    )
}

export default MyOrders