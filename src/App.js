import React from 'react'
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Orders from "./pages/Orders.jsx"
import Profile from "./pages/Profile.jsx"
import "./css/body.css"
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import ViewShopperOrder from './pages/ViewShopperOrder.jsx'
import RejectedOrders from './pages/RejectedOrders.jsx'
import EarningsPage from './pages/EarningsPage.jsx'
import TimeComp from './components/TimeComp.jsx'
import AddProduct from './pages/AddProduct.jsx'
import Products from './pages/Products.jsx'

function App() {
  return (
    <div>
      {/* <div className='user-welcome' >
        <h3 style={{ marginLeft: "20px", fontWeight: "500", marginTop: "20px" }}>Hello, karthik </h3>
        <div style={{ marginLeft: "20px" }}><TimeComp /> </div>
      </div> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rejectedOrders" element={<RejectedOrders />} />
        <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="/earnings" element={<EarningsPage />} />
        <Route path="/viewShopperOrders" element={<ViewShopperOrder />} />
        <Route path="/Products" element={<Products />} />
      </Routes>
    </div>
  )
}

export default App