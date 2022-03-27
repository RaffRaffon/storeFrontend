import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Header from "../Header/Header"
import { OrdersService } from "../services/orders.service"
import './orderdetails.css';
function OrderDetails() {
    const [order, setOrder] = useState({})
    const { id } = useParams()
    useEffect(() => {
        async function getOrder() {
            setOrder(await OrdersService.getSpecificOrder(id))
        }
        getOrder()
    }, [])

    return (
        <div >
            <Header />
            <button onClick={() => { console.log("get order is working", order) }}>show order</button>
            <div className="mainDiv">
                <h1>Order id:{order._id}</h1>
                Client details:<br />
                <br />
                Name: {order.FLname}<br />
                <br />
                Email:{order.Email}<br />
                <br />
                Phone Number:{order.Pnumber}<br />
                <br />
                Delivery address: {order.StreetName + "  " + order.Hnumber + "  " + order.Zipcode}<br />
                <br />
                Credit card number: (last 4 digits): {order.Cnumber}<br />
                <br />
                Ordered items: {
                    order.CartDetails?.Items.map(item => {
                        return (<div key={item.Id}>
                            {item.Name}
                            <label>Price: {item.Price} </label>
                            <label>Amount: {item.Amount} </label>
                            <label>Total Price: {item.TotalPrice}</label>
                            <img src={item.Picture} alt="itemPicture" className="itemPicture"></img>
                            <Link to={"/item/"+item.Id}>Item details</Link>
                        </div>)
                    })
                }<br />
                <br />
                Total ordered items amount:{order.TotalProducts}<br />
                <br />
                Total to pay: {order.TotalPrice}</div>


        </div>
    )
}

export default OrderDetails