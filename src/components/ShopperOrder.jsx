import React,{useEffect} from 'react'
import "../css/shopperOrder.css"
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos'
import "aos/dist/aos.css"

function ShopperOrder() {

  const img = 'data:image/jpeg;base64,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'
  useEffect(()=>{
    Aos.init({duration: 2000});
  },[])
  const data = [];

  // Loop 20 times to generate data
  for (let i = 0; i < 200; i++) {
    data.push({
      user: {
        name: "vinay",
        purpose: "House Ceremony",
        orderCount: 10,
        bookingHours: "1hr",
        img: img // Assuming image URLs follow this pattern, replace with actual URL
      },
      shoper: {
        name: "prabhu",
        mobile: "9347606437",
        rating: 4,
        noOfOrders: 1001,
        img: img // Assuming image URLs follow this pattern, replace with actual URL
      }
    });
  }

    const notify = () => toast.success("Shopper Order Successful");
    const notifyWhenReject = () => {
      toast.error("Shopper Order Rejected")
    }
  return (
    <div className='shopper-orders-content'>
      <div className='shoppers-labels'>
        <pre className='user-label'>user</pre>
        <pre className='shopper-label'>shopper</pre>
      <pre className='orders-count'>Shoppers Orders Count : {data.length}</pre>

      </div>
     

      <div className='scrollable-div'>
        {
          data.map((item, index) => (
            <div className='shopper-order-box' >

              <Link className="view-link-shopper" to="/viewShopperOrders">

                <div className='order-data' style={{display: "flex", color: "black",}}>
                  <div className='left'>
                    <img className='user-image' src={img} alt='image' />
                    <div className='user-details'>
                      
                      <pre>name                 :  {item.user.name}</pre>
                      <pre>purpose            :  {item.user.purpose}</pre>
                      <pre>order count      :  {item.user.orderCount}{" (items)"}</pre>
                      <pre>Booking hours :  {item.user.bookingHours}</pre>

                    </div>
                  </div>

                  <div className='right'>
                    <img className='user-image' src={img} alt='image' />
                    <div className='shopper-details'>
                      <pre>name             :  {item.shoper.name}</pre>
                      <pre>mobile           :  {item.shoper.mobile}</pre>
                      <pre>rating             :  {item.shoper.rating}</pre>
                      <pre>no.of orders  :  {item.shoper.noOfOrders}</pre>

                    </div>
                  </div>

                </div>
              </Link>
              <div className='action-area' >
                <div className='action-btn-accept action-btn' onClick={notify}>Accept</div>
                <div className='action-btn-reject action-btn' onClick={notifyWhenReject}>Reject</div>
              </div>
            </div>


          ))
        }

      </div>
      <div>
        <ToastContainer newestOnTop={true} autoClose={1000} />

      </div>
    </div>
  )
}

export default ShopperOrder