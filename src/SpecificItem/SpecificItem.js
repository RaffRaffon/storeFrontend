import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../Header/Header"
import { ItemsService } from "../services/items.service"
import { CartService } from '../services/cart.service';
import { useDispatch, useSelector } from 'react-redux';

function SpecificItem() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [item,setItem]=useState({})
    const { id } = useParams()
    useEffect(() => {
        async function getItem() {
            setItem(await ItemsService.getSpecificItem(id));
        }
        getItem()
    }, [])
    async function addToCart(Name, Price, Picture, Amount, id) {
        if (!localStorage['store-user']) {
          console.log("local storage adding to cart working");
    
          let cartArray
          if (localStorage['cart']) cartArray = localStorage.getArray('cart')
          else cartArray = []
          let checkIfExist = cartArray.find(item => { return item.Id === id })
          if (!checkIfExist) {
            cartArray.push({ Name: Name, Price: Price, Picture: Picture, Amount: Amount, TotalPrice: Price * Amount, Id: id })
            dispatch({ type: "CHANGECART" })
            localStorage.setArray('cart', cartArray)
            console.log(state.cartChanged);
          }
        } else {
          let cartFromDB = await CartService.getUserCartData(localStorage['store-user'])
          let cartData = cartFromDB.Items || cartFromDB
          let checkIfExist = cartData.find(item => { return item.Id === id })
          if (!checkIfExist) {
            // Use $set to update only certain fields, instead of overwritting the whole document.
            cartData.push({ Name, Price, Picture, Amount, TotalPrice: Price * Amount, Id: id })
            CartService.updateUserCartData(cartData, localStorage['store-user'])
            dispatch({ type: "CHANGECART" })
          }
        }
      }
    return (
        <div>
            <Header />
            {item.Name}<br/>
            <br/>
            <img src={item.Picture} alt="itemPicture"></img><br/>
            <br/>
            {item.Price}<br/>
            <br/>
            {item.Description}<br/>
            <br/>
            <button onClick={() => { addToCart(item.Name, item.Price, item.Picture, 1, item._id); }}>Add to cart</button>
        </div>
    )
}

export default SpecificItem