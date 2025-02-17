import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation hook
import "../css/home.css";

function NavBar() {
  const location = useLocation(); // Get the current location

  return (
    <div>
      <div className='menu'>
        <h1 className='logo'>liveshoper</h1>
        <ul>
          <Link to="/home" className={`link ${location.pathname === '/home' ? 'selected' : ''}`}><li><pre>Home</pre></li></Link>
          <Link to="/orders" className={`link ${location.pathname === '/orders' ? 'selected' : ''}`}><li><pre>Orders</pre></li></Link>
          <Link to="/rejectedOrders" className={`link ${location.pathname === '/rejectedOrders' ? 'selected' : ''}`}><li><pre>Rejected Orders</pre></li></Link>
          <Link to="/Products" className={`link ${location.pathname === '/Products' ? 'selected' : ''}`}><li><pre>Products</pre></li></Link>
          <Link to="/earnings" className={`link ${location.pathname === '/earnings' ? 'selected' : ''}`}><li><pre>Earnings</pre></li></Link>
          <Link to="/profile" className={`link ${location.pathname === '/profile' ? 'selected' : ''}`}><li><pre>Profile</pre></li></Link>
        </ul>
      </div>
      
    </div>
  );
}

export default NavBar;
