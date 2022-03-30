import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import { OrdersService } from '../services/orders.service'
import { usersService } from '../services/users.service'
function OrdersPanel() {
    const [userOrders, setUserOrders] = useState([])
    async function searchByUserEmail() {
        if (document.getElementById("useremail").value !== '') {
            const entry = document.getElementById("useremail").value
            const userId = await usersService.getUserId(entry)
            if (userId === '') {
                setUserOrders([])
                alert("Didn't find such email")
            }
            else {
                const ordersDetails = await OrdersService.getUserOrders(userId)
                if (ordersDetails.length === 0) alert("This user doesn't have orders")
                else setUserOrders(ordersDetails)
            }
        }
    }
    return (
        <div>
            <Header />
            <h1>Orders Panel</h1>
            Search by email:<input id="useremail" placeholder='Enter user email'></input><button onClick={searchByUserEmail}>Search by email</button>
            <button onClick={() => console.log(userOrders)}>show user orders</button>
            {userOrders.length > 0 && <table>
                <tr>
                    <th>Order ID</th>
                    <th>Order date</th>
                    <th>Total order cost</th>
                    <th>Order details</th>
                </tr>
                {userOrders.map((order) => {
                    return (<tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.OrderDate}</td>
                        <td>{order.TotalPrice}</td>
                        <td><Link to={"/order/" + order._id}>Details</Link></td>
                    </tr>)
                })}
            </table>}
        </div>
    )
}

export default OrdersPanel