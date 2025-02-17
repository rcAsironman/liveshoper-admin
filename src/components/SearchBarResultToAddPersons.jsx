import React, { useState, useEffect } from 'react';
import "../css/searchResultToAddPersons.css"
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../redux/push-notification/selectedUserNotificationSlice';

const SearchResultToAddPersons = ({ searchResult }) => {
    const [resultLength, setResultLength] = useState(searchResult.length);
    const dispatch = useDispatch();

    useEffect(() => {
        setResultLength(searchResult.length);
    }, [searchResult]);

    const handleDispatchUser = (user) => {
        const {name, email, mobile} = user;
  
        const userData = {
            name: name,
            email: email,
            mobile: mobile,
            selected: false
        }
        dispatch(addUser(userData));
    }

    const handleDispatchRemoveUser = (result) => {
        dispatch(removeUser(result.email));
    }

    const usersData = useSelector((state) => state.userNotification.users);

    return (
        <div className='search-result-to-add-person'>
            <div className="scrollable-search-result-div">
                {
                    console.log(resultLength)
                }
                {searchResult.length === 0 ? (
                    <div className='no-data-found'>No data found</div>
                ) : (
                    searchResult.map((result, index) => {
                        const user = usersData.find(user => user.email === result.email);
                        const added = user ? user.selected : false;
                        
                        return (
                            <div key={index} className='search-result-item'>
                                <div className='searchData'>
                                    <div>Name: {result.name}</div>
                                    <div>Email: {result.email}</div>
                                    <div>Mobile: {result.mobile}</div>
                                    <div>Order ID: {result.orderId}</div>
                                </div>
                                <div className='action-btn'>
                                    {added ? (
                                        <div className='addPerson' onClick={() => handleDispatchRemoveUser(result)}>-</div>
                                    ) : (
                                        <div className='addPerson' onClick={() => handleDispatchUser(result)}>+</div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default SearchResultToAddPersons;
