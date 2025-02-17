import React from 'react'
import "../css/orders.css"
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductOrder() {

  const img = 'https://media.istockphoto.com/id/1485546774/photo/bald-man-smiling-at-camera-standing-with-arms-crossed.webp?b=1&s=170667a&w=0&k=20&c=c2rsC66nJQAjkN6vCkhyB0vLHUiZhJSACMCBVF9HJJs='

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

  const notify = () => toast.success("Order Accepted");
  const notifyWhenReject = () => {
    toast.error("Order Rejected")
  }
  return (
    <div className='products-orders'>
      <pre className='orders-count'>Orders Count : {data.length}</pre>
      <div className='scrollable-div'>
        {
          data.map((item, index) => (
            <div className='shopper-order-box'>

              <Link className="view-link-shopper" to="/viewShopperOrders">

                <div className='product-order-data' style={{display: "flex", color: "black",}}>
                  <div className='left'>
                    <img className='user-image' src={img} alt='image' />
                    <div className='user-details'>
                      <pre>name                 :  {item.user.name}</pre>
                      <pre>purpose            :  {item.user.purpose}</pre>
                      <pre>order count      :  {item.user.orderCount}{" (items)"}</pre>
                      <pre>Booking hours :  {item.user.bookingHours}</pre>

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


export default ProductOrder