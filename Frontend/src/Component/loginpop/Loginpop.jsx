import React,{useContext, useState} from 'react'
import '../loginpop/loginpop.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/Storecontext'

const Loginpop = ({setShowLogin}) => {
const [currState,setCurrState] = useState("Login")
const [formData,setFormData] = useState({name:'', email:'', password:''})
const [error,setError] = useState('')
const [loading,setLoading] = useState(false)
const {login, signup} = useContext(Storecontext)

const onChangeHandler = (event) => {
  const {name, value} = event.target
  setFormData((prev)=>({...prev, [name]: value}))
}

const onSubmitHandler = async (event) => {
  event.preventDefault()
  setError('')
  setLoading(true)

  try {
    if(currState === "Login"){
      await login({email: formData.email, password: formData.password})
    }
    else{
      await signup(formData)
    }
    setShowLogin(false)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className='login-pop'>
<form onSubmit={onSubmitHandler} className="login-pop-container">
  <div className="login-pop-title">
    <h2>{currState}</h2>
    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
  </div>
  <div className="login-pop-inputs">
    {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={formData.name} type="text" placeholder='Your Name' required /> }

    <input name='email' onChange={onChangeHandler} value={formData.email} type="email" placeholder='Your email' required />
    <input name='password' onChange={onChangeHandler} value={formData.password} type="password" placeholder='Password' required />
  </div>
  {error && <p className='login-error'>{error}</p>}
  <button disabled={loading}>{loading?'Please wait...':currState==="Sign Up"?"Create account":"Login"}</button>
<div className="login-pop-condition">
  <input type="checkbox" required />
  <p>By continuning, i agree to the term of use & privacy policy.</p>
</div>
{currState==="Login"
?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}  >Click here</span></p>
:<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
}



</form>
    </div>
  )
}

export default Loginpop