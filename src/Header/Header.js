import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './header.css';
import { useNavigate } from 'react-router-dom';
import { ItemsService } from '../services/items.service';
import { useEffect, useState } from 'react';
import LocalStorageCart from '../Cart/LocalStorageCart'
import DatabaseCart from '../Cart/DatabaseCart';
import { usersService } from '../services/users.service';

function Header() {
    const navigate = useNavigate()
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const storeURL = 'http://localhost:3000/'
    const [totalProductsAmount, setTotalProducsAmount] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    Storage.prototype.setObj = function (key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function (key) {
        return JSON.parse(this.getItem(key))
    }

  
    useEffect(() => {
        // Need to make this useEffect to happen one time only and not on every page 
        // Check if you even need the state.isLoggedIn in the dependecy list in Header comp
        if (!state.itemsFirstLoad || state.isItemArrayChanged !== null) setTheItems()
        // Using redux perhaps fixes the problem, but it still runs on every page.

        // if (localStorage.getObj('userDetails') !== null) {
        //     setName(localStorage.getObj('userDetails').userName)
        // }
        async function setTheItems() {
            const items = await ItemsService.getAllItems()
            const originalAllItems = [...items]
            console.log("set the items is working");
            dispatch({ type: "SETITEMS", payload: { items, originalAllItems } })
        }

    }, [state.isLoggedIn, state.isItemArrayChanged])
    useEffect(() => {
        async function getUserData() {
            const personalData = await usersService.getPersonalData()
            if (personalData.isAdmin) setIsAdmin(true)
        }
        if (localStorage['store-user']) getUserData()
    }, [])
    // useEffect(() => {
    //     // Need to make this useEffect to happen one time only and not on every page   
    //     console.log(localStorage.getObj('userDetails') );
    //     if (localStorage.getObj('userDetails') !== null) {
    //         setName(localStorage.getObj('userDetails').userName)
    //     }
    // }, [state.isLoggedIn])
    function logout() {
        localStorage.removeItem('store-user');
        localStorage.removeItem('userName');
        dispatch({ type: "LOGOUT" })
        navigate('/')
    }
    async function handleSearch() {
        const newItems = state.originalAllItems.filter(item => item.Name.includes(document.getElementById("searchInput").value))
        dispatch({ type: "SETNEWITEMS", payload: { newItems } })
        if (storeURL !== window.location.href) {
            // Need to change storeURL to productionURL later
            console.log("changed url location to store url");
            navigate('/')
        }
    }

    function displayCart() {
        dispatch({ type: "DISPLAYCART" })
    }

    function setTotalAmount(amount) {
        setTotalProducsAmount(amount)
    }
    return (<div>
        {localStorage['store-user'] ? <DatabaseCart setTotalAmount={setTotalAmount} /> : <LocalStorageCart setTotalAmount={setTotalAmount} />}
        <header >
            <div className="search-input">
                <input id="searchInput"  ></input>
                <button onClick={handleSearch}>Search</button></div>
            {localStorage['store-user'] ? <div className='welcomeUser'>{"Welcome, " + localStorage['userName']}
                <Link className='header-item' to="/personalInfo">Edit Personal Info</Link>
                <div className='header-item' onClick={logout}>Logout</div>
                <div className='header-item' onClick={displayCart}>Cart({totalProductsAmount})</div>
                <Link className='header-item' to="/" onClick={() => dispatch({ type: "RESETITEMS" })}>Store Page</Link>
                <Link className='header-item' to="/myorders">My Orders</Link>
                {isAdmin && <Link className='header-item' to="/itemspanel">Items Panel</Link>}
                {isAdmin && <Link className='header-item' to="/orderspanel">Orders Panel</Link>}
            </div> : <div className='welcomeUser'><Link className='header-item' to="/login">Login or register</Link>
                <div className='header-item' onClick={displayCart}>Cart({totalProductsAmount})</div>
                <Link className='header-item' to="/" onClick={() => dispatch({ type: "RESETITEMS" })}>Store Page</Link></div>}
        </header>
    </div>)
}
export default Header;


