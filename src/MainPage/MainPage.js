import './mainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header'
import { useEffect } from 'react';
import { usersService } from "../services/users.service";
import { CartService } from '../services/cart.service';

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
      <p>Need to tokenize local storage username</p>
      <p>Need understand how jwt secure routes, and secure routes (add auth middleware)</p>
      <p>Need to return catched errors and send their status messages</p>
      <p>Need to hide the jwtSecret</p>
      <p>Need to add jwt to user edit</p>
      <p>Need to check if redux persist is working</p>
      <p>Need to change storeURL to productionURL later</p>
      <p>Need to add option of adding to cart and purchasing with no registration</p>
      <p>Storing data locally is normal enough, but make sure to consider what happens if you change your cart or product schema and that invalidates the local data.</p>
      <p>i will be annoyed using your service if i start putting together a cart on my laptop, try resume on my cellphone but then find out my cart data is device-specific
        you should store their cart data on the server</p>
      <p>Need to block the copy paste mechanism at verify password</p>
      <p>Check email at register component doesn't work, fix it</p>
      <p>Disable access to Personal area if user did not login, navigate back to main page</p>
      <p>When the user log's in, transfer his cart that he made when he didnt logged in, into the database, and delete it from the local storage</p>
      <p>For some reason either the Header or the MainPage components rerenders for like 3 times for no reason, fix it</p>
      <p>Need to change objectfication at LocalStorageCart to work with arrays from the local storage</p>
      <p>change the key in mapping to _id</p>
      <p>Sometimes when adding items to the cart when the user is logged in, the updates doesn't show at all, only when the page refreshes</p>
      <p>When entering personal area, and reloading the page, the user logs out</p>
      <p>Get redux persist back to work, and change localStorage['userName'] to state.userName</p>
      <p>When search entry is inserted, and the user navigates to store page, the items doesn't reload. only reloading the page fixes the problem, fix this</p>
      <p>unrelated but you might as well just name them setJSON/getJSON tbh as it's not strictly arrays</p>
      {state.items.map((item) => {
        return (<div key={item._id} className="item">
          <img className="image" src={item.Picture} alt="itemPicture" />
          <div className='details'>
            <p> {item.Name}</p>
            <p> {item.Price}</p>
            <button onClick={() => { addToCart(item.Name, item.Price, item.Picture, 1, item._id); }}>Add to cart</button>
          </div></div>)
      })}


    </div>

  );
}

export default MainPage;


