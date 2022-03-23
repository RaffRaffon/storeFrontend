import { Formik, Form, Field, ErrorMessage } from 'formik';
import { personalinfoSchema } from './personalinfo.schema';
import { usersService } from '../services/users.service';
import { useEffect, useState } from 'react';
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux';
function PersonalInfo() {
    const [initialPersonalData, setInitialPersonalData] = useState()
    const [isDataReady, setIsDataReady] = useState(false)
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        async function getPersonalData() {
            setInitialPersonalData(await usersService.getPersonalData())
            setIsDataReady(true)
        }
        getPersonalData()
    }, [])
    function sendUpdatedData() {
        const flname = document.getElementById("flname").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const streetName = document.getElementById("streetname").value
        const hnumber = document.getElementById("hnumber").value
        const anumber = document.getElementById("anumber").value
        const city = document.getElementById("city").value
        const zipcode = document.getElementById("zipcode").value
        const pnumber = document.getElementById("pnumber").value
        const userData = { flname, email, password, streetName, hnumber, anumber, city, zipcode, pnumber }
        usersService.updatePersonalData(userData)
        alert("Data updated")
    }
    return (
        <div>
            <Header />
            <h1>Personal area</h1>
            <div>Personal information</div>
            {isDataReady && <Formik
                initialValues={{
                    flname: initialPersonalData.FLname, password: initialPersonalData.Password, email: initialPersonalData.Email, vpassword: '',
                    streetname: initialPersonalData.StreetName, hnumber: initialPersonalData.Hnumber, anumber: initialPersonalData.Anumber, city: initialPersonalData.City, zipcode: initialPersonalData.Zipcode,
                    pnumber: initialPersonalData.Pnumber
                }}
                validationSchema={personalinfoSchema}
                validateOnChange={true}
                onSubmit={sendUpdatedData}
            >
                <Form >
                    <div >
                        <label>Full name</label>
                        <Field type="text" id="flname" name="flname" placeholder="2-16 characters" />
                        <ErrorMessage component="small" name="flname" className="flname-error" />
                    </div>
                    <div >
                        <label>Email</label>
                        <Field type="email" id="email" name="email" placeholder="Email address..." />
                        <ErrorMessage component="small" name="email" />
                    </div>
                    <div >
                        <label>New password?</label>
                        <Field type="password" name="password" id="password" placeholder="6-16 characters" />
                        <ErrorMessage component="small" name="password" />
                    </div>
                    <div >
                        <label>Verify password</label>
                        <Field type="password" name="vpassword" id="vpassword" placeholder="6-16 characters" onPaste={(e) => e.preventDefault()} />
                        <ErrorMessage component="small" name="vpassword" />
                    </div>
                    <div >
                        <label>Street name</label>
                        <Field type="text" name="streetname" id="streetname" placeholder="Enter your street name" />
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
                        <Field type="text" name="zipcode" id="zipcode" placeholder="7 digits" />
                        <ErrorMessage component="small" name="zipcode" />
                    </div>
                    <div >
                        <label>Phone number</label>
                        <Field type="text" name="pnumber" id="pnumber" />
                        <ErrorMessage component="small" name="pnumber" />
                    </div>
                    <button type="submit">Update</button>
                </Form>
            </Formik>}
        </div>
    )
}

export default PersonalInfo;


