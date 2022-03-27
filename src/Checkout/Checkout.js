import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { usersService } from '../services/users.service';
import { checkoutSchema } from './checkout.schema';
import { CartService } from "../services/cart.service";
import { OrdersService } from "../services/orders.service";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Checkout() {
    const navigate = useNavigate();
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [initialPersonalData, setInitialPersonalData] = useState()
    const [isDataReady, setIsDataReady] = useState(false)
    const months = [ 'Pick month','01', '02', '03','04', '05', '06','07', '08', '09','10', '11', '12']
    useEffect(() => {
        async function getPersonalData() {
            setInitialPersonalData(await usersService.getPersonalData())
            setIsDataReady(true)
        }
        if (localStorage['store-user']) getPersonalData()
        else setIsDataReady(true)
    }, [])
    function expirationDateYears(){
        const dateObj = new Date();
        const initialYear = dateObj.getUTCFullYear();
        const yearsArray=['Pick year']
        for (let i=0;i<=5;i++){
            const year=String(initialYear+i).substr(-2)
            yearsArray.push(year)
        }
        return yearsArray
    }
    // useEffect(() => {
    //     async function getCartData() {
    //         const cartDetails = await CartService.getUserCartData(localStorage['store-user'])
    //         setCart(cartDetails.Items)
    //     }
    //     if (localStorage['cart']) {
    //         setCart(JSON.parse(localStorage['cart']))
    //     }
    //     if (localStorage['store-user']) getCartData()
    // }, [])

    function getOrderDateDetails() {
        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        return day + "/" + month + "/" + year;
    }

    async function sendOrder() {
        const flname = document.getElementById("flname").value
        const email = document.getElementById("email").value
        const streetName = document.getElementById("streetname").value
        const hnumber = document.getElementById("hnumber").value
        const anumber = document.getElementById("anumber").value
        const city = document.getElementById("city").value
        const zipcode = document.getElementById("zipcode").value
        const pnumber = document.getElementById("pnumber").value
        const notes = document.getElementById("notes").value
        const cnumber = document.getElementById("cnumber").value.substr(-4)
        const totalProducts = state.totalProducts
        const totalPrice = state.totalPrice
        const orderDate = getOrderDateDetails()
        let cartDetails
        if (localStorage['cart']) cartDetails = JSON.parse(localStorage['cart'])
        else cartDetails = await CartService.getUserCartData(localStorage['store-user'])
        const orderData = {
            flname, email, streetName, hnumber, anumber, city, zipcode, pnumber, notes,
            cnumber,
            totalProducts, totalPrice, cartDetails, orderDate
        }
        OrdersService.sendOrder(orderData)
        dispatch({ type: "ORDERCOMPLETED" })
        alert("Order sent")
        navigate('/myorders');
    }


    return (
        <div>
            <Header />
            <h1>Welcome to checkout</h1>
            {!localStorage['store-user'] &&
                <div><p>Registered users can easily reuse their saved billing details, so you don't need to refill them in the form!</p>
                    <p>Already registered?</p>
                    <button onClick={() => { console.log(isDataReady) }}>show if data is ready </button>
                    <Link to="/login">Click here to login</Link></div>}

            {isDataReady && <Formik
                initialValues={{
                    flname: initialPersonalData?.FLname, password: initialPersonalData?.Password, email: initialPersonalData?.Email, vpassword: '',
                    streetname: initialPersonalData?.StreetName, hnumber: initialPersonalData?.Hnumber, anumber: initialPersonalData?.Anumber, city: initialPersonalData?.City, zipcode: initialPersonalData?.Zipcode,
                    pnumber: initialPersonalData?.Pnumber
                }}
                validationSchema={checkoutSchema}
                validateOnChange={true}
            >
                <Form >
                    <div >
                        <label>Full name</label>
                        <Field type="text" id="flname" name="flname" placeholder="2-30 characters" maxLength="30" />
                        <ErrorMessage component="small" name="flname" className="flname-error" />
                    </div>
                    <div >
                        <label>Email</label>
                        <Field type="email" id="email" name="email" placeholder="Email address..." />
                        <ErrorMessage component="small" name="email" />
                    </div>
                    <div >
                        <label>Street name</label>
                        <Field type="text" name="streetname" id="streetname" placeholder="Enter your street name" maxLength="40" />
                        <ErrorMessage component="small" name="streetname" />
                    </div>
                    <div >
                        <label>House number (the number of your house in the street)</label>
                        <Field type="number" name="hnumber" id="hnumber" />
                        <ErrorMessage component="small" name="hnumber" />
                    </div>
                    <div >
                        <label>Apartment number</label>
                        <Field type="number" name="anumber" id="anumber" />
                        <ErrorMessage component="small" name="anumber" />
                    </div>
                    <div >
                        <label>City</label>
                        <Field type="text" name="city" id="city" />
                        <ErrorMessage component="small" name="city" />
                    </div>
                    <div >
                        <label>Zip code</label>
                        <Field type="text" name="zipcode" id="zipcode" placeholder="7 digits" maxLength="7" />
                        <ErrorMessage component="small" name="zipcode" />
                    </div>
                    <div >
                        <label>Phone number</label>
                        <Field type="text" name="pnumber" id="pnumber" maxLength="10" />
                        <ErrorMessage component="small" name="pnumber" />
                    </div>
                    <div ><p>Write notes for the order</p>
                        <textarea id="notes"></textarea>
                    </div>
                    <div><label>Credit card details:</label>
                        <Field placeholder="Credit card number" type="text" name="cnumber" id="cnumber" maxLength="16"></Field>
                        <ErrorMessage component="small" name="cnumber" />
                        <label>Expiration date:</label>
                        <Field  as="select" name="edatem" id="edatem" >
                        {months.map((month,index)=>{return <option key={index} value={month}>{month}</option>})}
                        </Field>
                        <ErrorMessage component="small" name="edatem" />
                        <Field  as="select" name="edatey" id="edatey" >
                        {expirationDateYears().map((year,index)=>{return <option key={index} value={year}>{year}</option>})}
                        </Field>
                        <ErrorMessage component="small" name="edatey" />
                        <Field placeholder="CVV" type="text" name="cvv" id="cvv" maxLength="3"></Field>
                        <ErrorMessage component="small" name="cvv" />
                    </div>
                    <div>
                        <p>Order summary:</p>
                        <p>Total products: {state.totalProducts} </p>
                        <p>Total price: {state.totalPrice}</p>
                    </div>
                    <button onClick={sendOrder}>Confirm order</button>
                </Form>
            </Formik>}
        </div>
    )
}

export default Checkout;