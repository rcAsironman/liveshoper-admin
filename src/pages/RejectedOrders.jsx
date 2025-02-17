import React from 'react'
import "../css/rejectedOrders.css"
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/NavBar';

function RejectedOrders() {

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

  const GridItem = ({ item }) => {
    return (
      <Link className="view-link-shopper" to="/viewShopperOrders">
      <div className="grid-item">
          
              <div className='user-image'>
                <img  src={img} alt='user-image'></img>
              </div>
              <div className='rejected-order-text'>
              <pre>name                 :  {item.user.name}</pre>
                      <pre>purpose            :  {item.user.purpose}</pre>
                      <pre>order count      :  {item.user.orderCount}{" (items)"}</pre>
                      <pre>Booking hours :  {item.user.bookingHours}</pre>
              </div>

              
            
         
          {/* <div className='action-area' >
  <div className='action-btn-accept action-btn' onClick={notify}>Accept</div>
  <div className='action-btn-reject action-btn' onClick={notifyWhenReject}>Reject</div>
</div> */}
        </div>
        </Link>
    );
  };



  return (
    <div className='rejected-orders'>
      <NavBar />
      <div className='rejected-data'>
      <div className='profile-heading'><h2>Rejected Orders</h2></div>
        <div className='scrollable-div'>
          <div className="grid-container">
            {data.map((item, index)=> (
              <GridItem key={index} item={item} />
            ))}
          </div>
        </div>
        <div>
          <ToastContainer newestOnTop={true} autoClose={1000} />

        </div>
      </div>
    </div>
  )
}


export default RejectedOrders