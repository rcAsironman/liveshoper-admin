import React, { useEffect, useState } from 'react'
import "../css/searchComp.css"
import SearchResult from './SearchResult';

const searchData = [
    { name: 'kartesh', email: 'kar123@gmail.com', mobile: '1234567890', orderId: '#ord00001' },
    { name: 'john', email: 'john@example.com', mobile: '9876543210', orderId: '#ord00002' },
    { name: 'alice', email: 'alice@example.com', mobile: '8765432109', orderId: '#ord00003' },
    { name: 'bob', email: 'bob@example.com', mobile: '7654321098', orderId: '#ord00004' },
    { name: 'emma', email: 'emma@example.com', mobile: '6543210987', orderId: '#ord00005' },
    { name: 'david', email: 'david@example.com', mobile: '5432109876', orderId: '#ord00006' },
    { name: 'sara', email: 'sara@example.com', mobile: '4321098765', orderId: '#ord00007' },
    { name: 'michael', email: 'michael@example.com', mobile: '3210987654', orderId: '#ord00008' },
    { name: 'lisa', email: 'lisa@example.com', mobile: '2109876543', orderId: '#ord00009' },
    { name: 'alex', email: 'alex@example.com', mobile: '1098765432', orderId: '#ord00010' },
    { name: 'olivia', email: 'olivia@example.com', mobile: '0987654321', orderId: '#ord00011' },
    { name: 'james', email: 'james@example.com', mobile: '9876543210', orderId: '#ord00012' },
    { name: 'emily', email: 'emily@example.com', mobile: '8765432109', orderId: '#ord00013' },
    { name: 'william', email: 'william@example.com', mobile: '7654321098', orderId: '#ord00014' },
    { name: 'charlotte', email: 'charlotte@example.com', mobile: '6543210987', orderId: '#ord00015' },
    { name: 'joseph', email: 'joseph@example.com', mobile: '5432109876', orderId: '#ord00016' },
    { name: 'mary', email: 'mary@example.com', mobile: '4321098765', orderId: '#ord00017' },
    { name: 'jacob', email: 'jacob@example.com', mobile: '3210987654', orderId: '#ord00018' },
    { name: 'emma', email: 'emma@example.com', mobile: '2109876543', orderId: '#ord00019' },
    { name: 'ethan', email: 'ethan@example.com', mobile: '1098765432', orderId: '#ord00020' },
];



function SearchBar() {

    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = () => {
        // Filter searchData based on searchInput
        const filteredResult = searchData.filter(item => {
            // Perform case-insensitive search on name, email, username, and order id
            return (
                item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.orderId.toString().includes(searchInput.toLowerCase())
            );
        });

        setSearchResult(filteredResult);
    };
    return (
        <div className='search-bar'>
            <div className='search-box-button'>
                <input className='search-box' type='text' placeholder='search' value={searchInput} onChange={(e) => {

                    
                    // Clear search results when input is cleared
                    if (e.target.value === '') {
                        setSearchInput('')
                        setSearchResult([]);
                    }
                    else{
                        setSearchInput(e.target.value)
                        handleSearch()
                    }
                    

                }}></input>
                <div className='search-btn' onClick={() => {
                    if(searchInput !== '')
                    {
                        handleSearch()
                    }
                }}>Search</div>
            </div>
            {searchResult.length > 0 && <SearchResult searchResult={searchResult} />} {/* Conditionally render SearchResult */}
        </div>
    )
}

export default SearchBar