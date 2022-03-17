import { usersService } from "../services/users.service"
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from './register.schema';
import './register.css';
import Header from "../Header/Header";
function Register() {

    function sendRegistrationData() {
        const flname = document.getElementById("flname").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const userData = { flname, email, password }
        usersService.registerUser(userData)
        alert("You're in!")
    }
    
    return (
        <div>
            <Header />
            <Formik initialValues={{ flname: '', password: '', email: '', vpassword: '' }}
                validationSchema={registerSchema}
                validateOnChange={true}
                onSubmit={sendRegistrationData}>
                <Form >
                    <div >
                        <label htmlFor="flname">Full name</label>
                        <Field type="text" id="flname" name="flname" placeholder="2-16 characters" />
                        <ErrorMessage component="small" name="flname" className="flname-error" />
                    </div>
                    <div >
                        <label>Email</label>
                        <Field type="email" id="email" name="email" placeholder="Email address..." />
                        <ErrorMessage component="small" name="email" />
                    </div>
                    <div >
                        <label>Password</label>
                        <Field type="password" name="password" id="password" placeholder="6-16 characters" />
                        <ErrorMessage component="small" name="password" />
                    </div>
                    <div >
                    <button  onClick={console.log}>Log Click Event</button>
                        <label>Verify password</label>
                        <Field type="password" name="vpassword" id="vpassword" placeholder="6-16 characters" onPaste={(e) => e.preventDefault() } />
                        <ErrorMessage component="small" name="vpassword" />
                    </div>
                    <button type="submit" >Register</button>
                    <p>Already registered?</p>
                    <Link to="/login">Login</Link>
                </Form>
            </Formik>
        </div>
    )
}

export default Register;


