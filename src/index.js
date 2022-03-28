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
import Checkout from './Checkout/Checkout';
import './index.css';
// import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import { Provider } from 'react-redux'
import store from './Redux/store'
import MyOrders from './MyOrders/MyOrders';
import SpecificItem from './SpecificItem/SpecificItem';
import OrderDetails from './OrderDetails/OrderDetails';
import AddItems from './AddItems/AddItems';
import ItemsPanel from './ItemsPanel/ItemsPanel';
import EditItem from './EditItem/EditItem';
import OrdersPanel from './OrdersPanel/OrdersPanel';
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
      <Route path="/checkout" element={<Checkout />}>
      </Route>
      <Route path="/myorders" element={<MyOrders />}>
      </Route>
      <Route path="/item/:id" element={<SpecificItem />}>
      </Route>
      <Route path="/order/:id" element={<OrderDetails />}>
      </Route>
      <Route path="/additems" element={<AddItems />}>
      </Route>
      <Route path="/itemspanel" element={<ItemsPanel />}>
      </Route>
      <Route path="/edititem/:id" element={<EditItem />}>
      </Route>
      <Route path="/orderspanel" element={<OrdersPanel />}>
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
  {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);


