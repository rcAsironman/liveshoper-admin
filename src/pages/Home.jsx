import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import TimeComp from '../components/TimeComp';
import "../css/home.css"
import SearchBar from '../components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownUpAcrossLine, faArrowsAlt, faArrowsAltV, faBars, faClipboard, faExpandAlt, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import SearchBarToAddPersons from '../components/SearchBarToAddPersons';
import {  useDispatch, useSelector } from 'react-redux';
import { removeAllUsers } from '../redux/push-notification/selectedUserNotificationSlice';
import Products from './Products';



function Home() {

    const [text, setText] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [allSelectedFiles, setAllSelectedFiles] = useState([]);
    const [showAllFiles, setShowAllFiles] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [usdCurrencyData, setUsdCurrencyData] = useState(0)
    const [inRCurrencyData, setInrCurrencyData] = useState(0)
    const [textNullWarning, setTextNullWarning] = useState(false)
    const [sendTo, setSendTo] = useState('all');
    const [closeAddPerson , setCloseAddPerson] = useState(true);

    const handleSendToChange = (event) => {
        if(event.target.value !== 'all')
        {
            setCloseAddPerson(false);
            setSendTo('particular');

        }
        else
        {
        
        setAllSelectedFiles([]);
        setSelectedFiles([]);
        dispatch(removeAllUsers());
        setSendTo(event.target.value);
        }
    };
    useEffect(() => {
        axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_zPKIUYB9ZPMEAdchEy5rxT3KzGPMuvXmAJIYsC63`)
            .then((response) => {
                console.log("Hello world")
                setUsdCurrencyData(response.data.data.USD);
                setInrCurrencyData(response.data.data.INR);
            })
            .catch((error) => {
                console.log(error.data)
            })
    }, [])

    const enlargeImage = (img) => {
        // Implement functionality to enlarge image
        console.log(`Enlarging image: ${img}`);
        setClicked(true);
        setImageUrl(img)
    };
    const handleCloseImage = () => {
        setClicked(false);
    }
    const handleMessage = (e) => {
        setText(e.target.value);
    }

    const handleFile = (event) => {
        const files = Array.from(event.target.files);
        const slicedFiles = files.slice(0, 3); // Limit to first 3 files
        setSelectedFiles(slicedFiles);
        setAllSelectedFiles(files)
    };


    const handleSubmit = () => {

        if (text.length === 0) {
            handleTextError()
            console.log("Please enter text here.....")
            setTextNullWarning(true);
        }
        else {

            handleTextSuccess();
            setAllSelectedFiles([]);
            setSelectedFiles([]);
            setText('');
            setTextNullWarning(false)
        }
        console.log(text);
        console.log(allSelectedFiles);

    };

    const handleRemove = (index) => {
        const updatedData = allSelectedFiles.filter((file, i) => i !== index);
        setAllSelectedFiles(updatedData);
        setSelectedFiles(updatedData.slice(0, 3));
    }



    useEffect(() => {

    }, [allSelectedFiles, selectedFiles])


    const handleTextError = () => {
        toast.error("Please enter the message")
    }

    const handleTextSuccess = () => {
        toast.success("Notification published")
        dispatch(removeAllUsers());
        setSendTo('all')
    }

    const userAddedListForNotification = useSelector((state) => state.userNotification.users)
    const dispatch = useDispatch();

    const handleClearUserStore = () => {
        dispatch(removeAllUsers());

    }

    const handleProceedUserList = () => {
        setCloseAddPerson(true);
    }

    const handleExit = () => {
        setCloseAddPerson(true);
        dispatch(removeAllUsers());
        setSendTo('all');
    }

    return (
        <>
            {
                showAllFiles !== true ? (
                <div className="home">
                    
                    <div className="nav-bar">
                    <NavBar/>
                    </div>
                    <div className='nav-bar-mobile'>
                        <div className='logo-mobile'>LiveShoper</div>
                        <div className='menu-mobile'><FontAwesomeIcon icon={faBars}/></div>
                    </div>
                            {/* Additional form fields or submit button can be added here */}
                           
                    {
                        showAllFiles === true && (
                            <div className='showAllImages-box'>
                                <div className='grid-container'>
                                    {
                                        allSelectedFiles.map((file, index) => (

                                            <div className='grid-img-data'>
                                                {file.type.startsWith('image/') ? (
                                                    <img className='img-data' src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                                                ) : (
                                                    <div className="file-icon">File</div>
                                                )}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    <div className='home-right-content'>
                    {
                            userAddedListForNotification.length > 0 &&(
                            <div className='selectedPersons'>
                               {
                                // console.log(userAddedListForNotification)
                                userAddedListForNotification.map((data, index) => (
                                    <div className='dataInAdded'>{data['email']}</div>
                                    
                                ))
                               }
                            </div>)
                        }
                        <div className='home-nav'>

                            <SearchBar />
                        </div>
                        <div className='message-field-promotions'>
                            <h2 className='push-txt'>Push notifications to users</h2>

                            <div className='push-message-box'>
                                <textarea className={textNullWarning ? 'message-area-warning' : 'message-area'} value={text} placeholder='type your message here...' onChange={handleMessage} >
                                </textarea>
                            </div>
                        </div>
                        <div className='submit-upload'>
                            {/* // Inside your component */}

                            <div className='push-selection-option'>
                                <label className='pin'>
                                    <FontAwesomeIcon icon={faPaperclip} />
                                    <input className='upload' placeholder='Type message here' type='file' multiple onChange={handleFile} />
                                </label>

                                <div className='send-option'>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                value="all"
                                                checked={sendTo === 'all'}
                                                onChange={handleSendToChange}
                                            />
                                            Send to All
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                value="particular"
                                                checked={sendTo === 'particular'}
                                                onChange={handleSendToChange}
                                            />
                                            Send to Particular Person(s)
                                        </label>
                                    </div>
                             
                                </div>

                                {sendTo === 'particular' && (
                                    <div>
                                        {/* Add input fields for selecting a particular person */}
                                        {/* For example, you can use a dropdown, input field, or any other UI */}
                                    </div>
                                )}

                               
                            </div>
                            <div className="send-btn" onClick={handleSubmit}>Send</div>
                        </div>
                        <div className='preview-box'>
                            {selectedFiles.map((file, index) => (

                                <div key={index} className="file-preview">
                                    <div className='img-controls'>
                                        <div className='remove-img' onClick={() => { handleRemove(index) }}> <FontAwesomeIcon icon={faClose} /></div>
                                        <div className='enlarge-img' onClick={() => { enlargeImage(URL.createObjectURL(file)) }}> <FontAwesomeIcon icon={faExpandAlt} fontSize={12} /></div>
                                    </div>
                                    {file.type.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                                    ) : (
                                        <div className="file-icon">File</div>
                                    )}
    

                                </div>


                            ))}
                            {allSelectedFiles.length > 3 && (
                                <div className="more-link" onClick={() => setShowAllFiles(true)}>
                                    <pre>more...</pre>
                                </div>
                            )}
    

                        </div>

                        <div className='currency-exchange'>
                            <pre>INR   ₹{inRCurrencyData}</pre>
                            <pre>USD  ${usdCurrencyData}</pre>
                        </div>
                        {
                            clicked === true && (
                                <div className='enlarged-img-bg'>
                                    <div className='enlarged-img'>

                                        <div className='close-img' onClick={() => { handleCloseImage() }}> <FontAwesomeIcon icon={faClose} /></div>
                                        <img src={imageUrl}></img>
                                    </div>
                                </div>)
                        }

                       
                        {
                            sendTo !== 'all' && closeAddPerson === false && (
                                <div className='addPersonsToSend'>
                                    
                                    <SearchBarToAddPersons />
                                
       
                                    {
                                        userAddedListForNotification.length > 0 ? (<div className='notification-both-btns'><div className='notification-selected-btn' onClick={() => {handleClearUserStore()}}>Clear All</div>
                                        <div className='notification-selected-btn' onClick={()=>{handleProceedUserList()}}>Proceed</div></div>) : (<div><div className='notification-selected-btn-exit ' onClick={() => {handleExit()}}>Exit</div></div>)
                                    }
                                    
                                    
                                    
                                    
                                </div>
                            )
                        }
                    </div>
                    <ToastContainer newestOnTop={true} autoClose={5000} />
                </div>) : (<>
                    {
                        showAllFiles === true && (
                            <div className='showAllImages-box'>
                                <div className='back-btn-container'>
                                    <div onClick={() => { setShowAllFiles(false) }} className='back-btn'>back</div>
                                </div>
                                <div className='grid-container'>
                                    {
                                        allSelectedFiles.map((file, index) => (

                                            <div className='grid-img-data'>
                                                <div className='remove-img-from-preview' onClick={() => { handleRemove(index) }}> <FontAwesomeIcon icon={faClose} /></div>
                                                {file.type.startsWith('image/') ? (
                                                    <img className='img-data' src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                                                ) : (
                                                    <div className="file-icon">File</div>
                                                )}
                                            </div>
                                        ))
                                    }
                                </div>


                            </div>
                        )
                    }

                </>)
            }
        </>
    );
}

export default Home;
