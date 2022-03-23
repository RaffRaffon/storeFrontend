import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './cart.css';
function LocalStorageCart(props) {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [totalCartPrice, setTotalCartPrice] = useState()
    const [totalProducts, setTotalProducts] = useState()
    Storage.prototype.setArr = function (key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getArr = function (key) {
        return JSON.parse(this.getItem(key))
    }
    const [cart, setCart] = useState([])

    useEffect(() => {
        setTheTotalOfTheCart()
        getTotalProductsInCart()
    }, [cart])

    useEffect(() => {
        console.log("setting the cart is working");
        setCart(localStorage.getArr('cart') || [])
    }, [state.cartChanged])
    function addItemAmount(index) {
        const items = localStorage.getArr('cart')
        items[index].Amount += 1
        items[index].TotalPrice = items[index].Price * items[index].Amount
        localStorage.setArr('cart', items)
        dispatch({ type: "CHANGECART" })
    }

    function reduceItemAmount(index) {
        const items = localStorage.getArr('cart')
        if (items[index].Amount !== 1) {
            items[index].Amount -= 1
            items[index].TotalPrice = items[index].Price * items[index].Amount
            localStorage.setArr('cart', items)
            dispatch({ type: "CHANGECART" })
        }
    }

    function removeAProductFromCart(index) {
        const items = localStorage.getArr('cart')
        items.splice(index, 1)
        localStorage.setArr('cart', items)
        dispatch({ type: "CHANGECART" })
    }
    function setTheTotalOfTheCart() {
        let totalPrice = 0
        const items = localStorage.getArr('cart') || []
        items.forEach(item => { totalPrice += item.TotalPrice });
        dispatch({ type: "SETCARTTOTALS", payload: { totalPrice } })
        setTotalCartPrice(totalPrice)
    }
    function getTotalProductsInCart() {
        let totalProducts = 0
        const items = localStorage.getArr('cart') || []
        items.forEach(item => { totalProducts += item.Amount });
        dispatch({ type: "SETCARTTOTALS", payload: { totalProducts } })
        setTotalProducts(totalProducts)
        props.setTotalAmount(totalProducts)
    }
    function reduxCart(){
        console.log(state.totalProducts, state.totalPrice);
    }
    return (
        <div>
            {state.displayCart && <div className='side-cart'>
                {cart.map((item, index) => {
                    return (
                        <div className='item-in-cart' key={item._id}>
                            <div>{item.Name}</div>
                            <div> {item.Price}</div>
                            <div>Amount: {item.Amount}</div>
                            <button onClick={() => { addItemAmount(index) }}>Add</button>
                            <button onClick={() => { reduceItemAmount(index) }}>Subtract</button>
                            <div>Total price of the same product: {item.TotalPrice}</div>
                            <button onClick={() => { removeAProductFromCart(index) }}>Remove Product</button>
                        </div>)
                })}
                <div className='cart-footer'>
                <button onClick={reduxCart}>show redux cart info</button>
                    <div>Total price for all products:{totalCartPrice}</div>
                    <div>Total products in cart: {totalProducts}</div>
                    <button onClick={() => { localStorage.removeItem('cart'); dispatch({ type: "CHANGECART" }); setCart([]) }}>Remove all products</button>
                    <Link to="/checkout">Checkout</Link>
                </div>
            </div>}
        </div>
    )
}
export default LocalStorageCart;


