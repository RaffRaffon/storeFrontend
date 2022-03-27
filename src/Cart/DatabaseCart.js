import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartService } from '../services/cart.service';
import { useDispatch, useSelector } from 'react-redux';
import './cart.css';
function DatabaseCart(props) {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const [cart, setCart] = useState([])
    const [totalCartPrice, setTotalCartPrice] = useState()
    const [totalProducts, setTotalProducts] = useState()


    useEffect(() => {
        setTheTotalOfTheCart()
        getTotalProductsInCart()
    }, [cart])

    useEffect(() => {
        getCart(localStorage['store-user'])
    }, [state.cartChanged])

    useEffect(() => {
        if (state.checkoutCompleted) removeAllProducts()
    }, [state.checkoutCompleted])

    async function getCart(token) {
       const cartData = await CartService.getUserCartData(token)
            setCart(cartData.Items || cartData)
            console.log("get cart by token is working");
    }
    function addItemAmount(index) {
        let userCart = [...cart]
        userCart[index].Amount += 1
        userCart[index].TotalPrice = userCart[index].Price * userCart[index].Amount
        CartService.updateUserCartData(userCart, localStorage['store-user'])
        setCart(userCart)
    }

    function reduceItemAmount(index) {
        let userCart = [...cart]
        if (userCart[index].Amount !== 1) {
            userCart[index].Amount -= 1
            userCart[index].TotalPrice = userCart[index].Price * userCart[index].Amount
            CartService.updateUserCartData(userCart, localStorage['store-user'])
            setCart(userCart)
        }
    }

    function removeAProductFromCart(index) {
        let userCart = [...cart]
        userCart.splice(index, 1);
        CartService.updateUserCartData(userCart, localStorage['store-user'])
        setCart(userCart)
    }
    function setTheTotalOfTheCart() {
        let userCart = [...cart]
        let totalPrice = 0
        userCart.forEach(item => { totalPrice += item.TotalPrice })
        dispatch({ type: "SETCARTTOTALS", payload: { totalPrice } })
        setTotalCartPrice(totalPrice)
    }
    function getTotalProductsInCart() {
        let userCart = [...cart]
        let totalProducts = 0
        userCart.forEach(item => { totalProducts += item.Amount })
        dispatch({ type: "SETCARTTOTALS", payload: { totalProducts } })
        setTotalProducts(totalProducts)
        props.setTotalAmount(totalProducts)
    }

    function removeAllProducts() {
        CartService.updateUserCartData([], localStorage['store-user'])
        setCart([])
    }
    function reduxCart(){
        console.log(state.totalProducts, state.totalPrice,cart);
    }
    return (
        <div>
            {state.displayCart && <div className='side-cart'>
                {cart.map((item, index) => {
                    return (
                        <div className='item-in-cart' key={item.Id}>
                            <div>{item.Name}</div>
                            <div> {item.Price}</div>
                            <div>Amount: {item.Amount}</div>
                            <button onClick={() => { addItemAmount(index) }}>Add</button>
                            <button onClick={() => { reduceItemAmount(index) }}>Subtract</button>
                            <Link to={"/item/"+item.Id}>Item details</Link>
                            <div>Total price of the same product: {item.TotalPrice}</div>
                            <button onClick={() => { removeAProductFromCart(index) }}>Remove Product</button>
                        </div>)
                })}
                <div className='cart-footer'>
                <button onClick={reduxCart}>show redux cart info</button>

                    <div>Total price for all products:{totalCartPrice}</div>
                    <div>Total products in cart: {totalProducts}</div>
                    <button onClick={removeAllProducts}>Remove all products</button>
                    <Link to="/checkout">Checkout</Link>
                </div>
                
            </div>}
            
        </div>
    )
}
export default DatabaseCart;


