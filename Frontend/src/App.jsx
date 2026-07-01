import React,{useState} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Component/Navbar/Navbar'
import Home from '../src/Pages/Home/Home'
import Cart from '../src/Pages/Cart/Cart'
import Orderitem from '../src/Pages/Orderitem/Orderitem'
import Exploremenus from './Component/Exploremenus/Exploremenus'
import Footer from './Component/footer/Footer'
import About from './Pages/About/About'
import Delivery from './Pages/Delivery/Delivery'
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy'
import MyOrders from './Pages/MyOrders/MyOrders'
import Loginpop from './Component/loginpop/Loginpop'

const App = () => {

const [showLogin,setShowLogin] = useState(false)

  return (
      <>
{showLogin?<Loginpop setShowLogin={setShowLogin}/>:<></>}

    <div className='app'> 
    {/* <BrowserRouter> */}
    <Navbar  setShowLogin={setShowLogin} />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/cart'element={<Cart/>} />
    <Route path='/order' element={<Orderitem/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/delivery' element={<Delivery/>} />
    <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
    <Route path='/my-orders' element={<MyOrders/>} />
    </Routes>
    {/* </BrowserRouter> */}
    {/* <Exploremenus/> */}
  </div>
  <Footer/>
    </>
  )
}

export default App