import '../Navbar/navbar.css'
import Home from '../../Pages/Home/Home'
import Cart from '../../Pages/Cart/Cart'
import { Link } from 'react-router-dom'

import React,{useState,useContext} from 'react'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/Storecontext'
const Navbar = ({setShowLogin}) => {
  
    const [menu,setMenu]=useState("home");

    const {getTotalCartAmount, isAuthenticated, user, logout}= useContext(Storecontext);

  return (
      <> 

      <div className="navbar">
        <Link to={'/'} >  <img src={assets.logo} alt="" className="logo" /> </Link>
          <ul className="navbar-menu">
            <Link to='/' onClick={()=>{setMenu("home"); window.scrollTo({top:0, behavior:"smooth"})}} className={menu==="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")}  className={ menu==="menu"?"active":""} >menu</a>
          <a  href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
          <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
          </ul>
        <div className="navbar-right">
            {/* <img src={assets.search_icon} alt="" />  */}
            <div className="navbar-search-icon">
           <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            {isAuthenticated ? (
              <div className="navbar-profile">
                <img src={assets.profile_icon} alt="Profile" />
                <span>{user?.name || 'User'}</span>
                <Link to='/my-orders' className='my-orders-link'>My Orders</Link>
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <button onClick={()=>setShowLogin(true)} >Sign in</button>
            )}
        </div>
      </div>    
      </>
  )
}

export default Navbar;