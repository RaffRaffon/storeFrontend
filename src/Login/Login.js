import { Link } from "react-router-dom";
import { usersService } from "../services/users.service";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header'

function Login() {
  const navigate = useNavigate()
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  async function checkCreds() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const userData = { email, password }
    const result = await (usersService.checkCreds(userData))
    if (!result.checkCredsResult) {
      alert("Either the email or the password are wrong.")
    } else {
      localStorage['store-user'] = result.token
      const userName = await usersService.checkTokenForLogin(localStorage['store-user'])
      dispatch({ type: "LOGIN", payload: { userName } })
      moveLocalCartToDB(email)
      navigate('/')
    }
  }

  function moveLocalCartToDB(email) {
    if (localStorage['cart']) {
      usersService.moveCartToDB(localStorage['cart'], email)
      localStorage.removeItem("cart");
    }

  }
  return (
    <div>
      <Header />
      <h1>Login</h1>
      <input id="email" placeholder="Email"></input>
      <input id="password" type="password" placeholder="Password"></input>
      <button onClick={checkCreds}>Login</button>
      <p>New here?</p>
      <Link to="/register">Register</Link>

    </div>
  )
}

export default Login;


