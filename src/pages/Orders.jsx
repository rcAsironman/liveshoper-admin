import React,{useState} from 'react'
import NavBar from '../components/NavBar'
import "../css/orders.css"
import ProductOrder from '../components/ProductOrder'
import ShopperOrder from '../components/ShopperOrder';
import TimeComp from '../components/TimeComp';
function Orders() {
  const [optionSelected, setOptionSelected] = useState(true);
  
  const shopperfunction = () => {
    setOptionSelected(true);
  }

  const ordersfunction = () => {
    setOptionSelected(false)
  }
  return (
    <div className='orders-page'>
        <NavBar/>
        
        <div className='orders-container'>
        <div className='order-buttons-catg'>
       
          <div className='btn shoppers-btn' onClick={shopperfunction} style={{backgroundColor: optionSelected? "black" : "gray"}}><pre>Shoppers</pre></div>
          <div className='btn products-btn' onClick={ordersfunction} style={{backgroundColor: optionSelected? "gray" : "black"}}><pre>Products</pre></div>


        </div>
        {
            optionSelected? <ShopperOrder/> : <ProductOrder/>
          }
        </div>
    </div>
  )
}

export default Orders