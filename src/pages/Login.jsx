import React, {useState} from 'react'
import "../css/login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const onChnageUsername = (e) => { 
    setUsername(e.target.value)
  }

  const onChnagePassword = (e) => { 
    setPassword(e.target.value)
  }


  const formSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login?user=${username}&password=${password}`)

      if (response.data.statusCode === 200) {
        navigate("/home");
      }
      else{
        setErrorMessage("User Credentials Not found");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Username or password is incorrect. Please try again.');
      } else {
        console.error('Error:', error);
        setErrorMessage('User Credentials Not found!');
      }
  }
}
  return (
    <div className='login-page'>

      <div className='login-box'>
           <div className='elements'>
           <h2 className='logo'>liveshoper</h2>
            <form className="form" onSubmit={formSubmit}>
                <h4>Username</h4>
                <input id="username" onChange={onChnageUsername} type='text' placeholder='username'></input>
                <h4>Password</h4>

                <input id="password" onChange={onChnagePassword} type='password' placeholder='password'></input>
                {errorMessage && <p className="error-message" style={{color:'white',fontSize:'0.8rem',textAlign:'center'}}>{errorMessage}</p>}
                <button type='submit'><h3>login</h3></button>
            </form>
           </div>
      </div>
    </div>
  )
}

export default Login