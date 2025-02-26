import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from "../../assets/netflix_spinner.gif"

const Login = () => {

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("firdaussocial94@gmail.com");
  const [password, setPassword] = useState("@123Pidot");
  const [loading, setLoading] = useState(false)

  const user_auth = async (event) => {

    event.preventDefault();
    setLoading(true)
    if(signState === "Sign In"){
      await login(email, password)
    } else {
      await signup(name, email, password)
    }
    setLoading(false)
  }


  return (

    loading ? 
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
    :
    <div className='login'>
      <img src={logo} alt="logo" className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {
            signState === "Sign Up" ?  <input type="text" placeholder='Your name' value={name} onChange={(e) => {setName(e.target.value)}} /> : <></>
          }
         
          <input type="email" placeholder='Email or phone number' value={email} onChange={(e) => {setEmail(e.target.value)}} />
          <input type="password" placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />

          <button onClick={user_auth} type='submit'>{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <p>Need help?</p>
          </div>

          <div className="form-switch">
            {
              signState === "Sign In" ?  <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign up now.</span></p> : <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Sign in.</span></p>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login