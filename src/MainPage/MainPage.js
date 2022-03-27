import './mainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header'
import { useEffect } from 'react';
import { usersService } from "../services/users.service";
import { CartService } from '../services/cart.service';
import { Link } from 'react-router-dom';
function MainPage() {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  Storage.prototype.setArray = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
  }
  Storage.prototype.getArray = function (key) {
    return JSON.parse(this.getItem(key))
  }
  async function loginWithToken() {
    // Need to happen only once, once the user logging in to any of the web pages
    if (localStorage['store-user']) {
      const userName = await usersService.checkTokenForLogin(localStorage['store-user'])
      localStorage['userName'] = userName
      dispatch({ type: "LOGIN", payload: { userName } })
    }
  }
  useEffect(() => {
    console.log("loginWithToken use effect is working");
    loginWithToken()
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
  // let checkIfExist = false
  // let cartObj = localStorage.getObj('cart')
  // for (let index in localStorage.getObj('cart')) {
  //   if (cartObj[index].Id === id) {
  //     checkIfExist = true
  //     break
  //   }
  // }
  // if (!checkIfExist) {
  //   let indexCounter = 0
  //   let itemObject = {}
  //   if (cartObj) {
  //     itemObject = localStorage.getObj('cart')
  //     for (let index in cartObj) {
  //       indexCounter++
  //     }
  //   }
  //   itemObject[indexCounter] = { Name: Name, Price: Price, Picture: Picture, Amount: Amount, TotalPrice: Price * Amount, Id: id }
  //   dispatch({ type: "ADDTOCART" })
  //   localStorage.setObj('cart', itemObject)
  // }

  return (
    <div>
      <Header />
      {state.items.map((item) => {
        return (<div key={item._id} className="item">
          <img className="image" src={item.Picture} alt="itemPicture" />
          <div className='details'>
            <p> {item.Name}</p>
            <p> {item.Price}</p>
            <button onClick={() => { addToCart(item.Name, item.Price, item.Picture, 1, item._id); }}>Add to cart</button>
            <Link to={"/item/"+item._id}>Item details</Link>
          </div></div>)
      })}


    </div>

  );
}

export default MainPage;


