// SearchResult.js

import React from 'react';
import "../css/searchResult.css"
const SearchResult = ({ searchResult }) => {
    return (
        <div className='search-result'>
            <div className="scrollable-search-result-div" >
                {searchResult.map((result, index) => (

                    <div className='search-result-item'>
                        <div>Name: {result.name}</div>
                        <div>Email: {result.email}</div>
                        <div>Mobile: {result.mobile}</div>
                        <div>Order ID: {result.orderId}</div>
                    </div>

                ))}
        </div>
        </div>
    );
};

export default SearchResult;
