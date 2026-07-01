import React, { useContext, useState } from 'react'
import '../Orderitem/orderitem.css'
import { Storecontext } from '../../context/Storecontext'
import { placeOrderApi } from '../../api/orderApi'
import { useNavigate } from 'react-router-dom'

const Orderitem = () => {
  const { food_list, cartItems, setCartItems, getTotalCartAmount, isAuthenticated } = useContext(Storecontext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (!isAuthenticated) {
      alert('Please login to place an order')
      return
    }

    const items = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ food: item._id, quantity: cartItems[item._id] }))

    if (items.length === 0) {
      alert('Your cart is empty')
      return
    }

    try {
      setLoading(true)
      await placeOrderApi({ items, deliveryAddress: formData })
      setCartItems({})
      alert('Order placed successfully. Pay cash on delivery.')
      navigate('/')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" value={formData.firstName} onChange={onChangeHandler} type="text" placeholder='First name' required />
          <input name="lastName" value={formData.lastName} onChange={onChangeHandler} type="text" placeholder='Last name' required />
        </div>
        <input name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder='Email address' required />
        <input name="street" value={formData.street} onChange={onChangeHandler} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name="city" value={formData.city} onChange={onChangeHandler} type="text" placeholder='City' required />
          <input name="state" value={formData.state} onChange={onChangeHandler} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name="zipCode" value={formData.zipCode} onChange={onChangeHandler} type="text" placeholder='Zip Code' required />
          <input name="country" value={formData.country} onChange={onChangeHandler} type="text" placeholder='Country' required />
        </div>
        <input name="phone" value={formData.phone} onChange={onChangeHandler} type="text" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b> Total </b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+50}</b>
            </div>
          </div>
          <button disabled={loading} type="submit">{loading ? 'PLACING ORDER...' : 'PLACE ORDER - CASH ON DELIVERY'}</button>
        </div>
      </div>
    </form>
  )
}

export default Orderitem
