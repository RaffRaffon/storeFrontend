import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartService } from '../services/cart.service';
import './cart.css';
function DatabaseCart(props) {
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
    async function getCart(token) {
        if (token) {
            const cartData = await CartService.getUserCartData(token)
            setCart(cartData.Items || cartData)
            console.log("get cart by token is working");
        } else {
            console.log("get cart, the cart is empty");
            setCart([])
        }
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
        console.log(cart);
        let userCart = [...cart]
        let totalPrice = 0
        userCart.forEach(item => { totalPrice += item.TotalPrice })
        setTotalCartPrice(totalPrice)
    }
    function getTotalProductsInCart() {
        let userCart = [...cart]
        let totalProducts = 0
        userCart.forEach(item => { totalProducts += item.Amount })
        setTotalProducts(totalProducts)
        props.setTotalAmount(totalProducts)
    }

    function removeAllProducts() {
        CartService.updateUserCartData([], localStorage['store-user'])
        setCart([])
    }
    
    return (
        <div>
            {state.displayCart && <div className='side-cart'>
                {cart.map((item, index) => {
                    return (
                        <div className='item-in-cart' key={index}>
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
                    <div>Total price for all products:{totalCartPrice}</div>
                    <div>Total products in cart: {totalProducts}</div>
                    <button onClick={removeAllProducts}>Remove all products</button>

                </div>
            </div>}
        </div>
    )
}
export default DatabaseCart;


