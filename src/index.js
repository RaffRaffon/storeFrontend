import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from './MainPage/MainPage'
import Login from './Login/Login'
import Register from './Register/Register'
import PersonalInfo from './PersonalInfo/PersonalInfo'
import './index.css';
// import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import { Provider } from 'react-redux'
import store from './Redux/store'
// import { store, persistor } from './Redux/persist'

render(
  <Provider store={store}>

{/* <PersistGate loading={null} persistor={persistor}> */}
   <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />}>
      </Route>
      <Route path="/login" element={<Login />}>
      </Route>
      <Route path="/register" element={<Register />}>
      </Route>
      <Route path="/personalInfo" element={<PersonalInfo />}>
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
  {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);


