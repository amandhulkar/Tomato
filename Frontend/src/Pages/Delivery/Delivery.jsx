import React from 'react'
import './delivery.css'

const Delivery = () => {
  return (
    <div className='info-page'>
      <h1>Delivery Information</h1>
      <p>
        Tomato is designed to provide a smooth and convenient food delivery experience. After selecting your favourite food items, you can review your cart and place your order easily.
      </p>
      <div className='delivery-steps'>
        <div className='delivery-step'>
          <span>1</span>
          <h3>Choose Food</h3>
          <p>Explore the menu and add your favourite dishes to the cart.</p>
        </div>
        <div className='delivery-step'>
          <span>2</span>
          <h3>Place Order</h3>
          <p>Check your cart details and continue to the order page.</p>
        </div>
        <div className='delivery-step'>
          <span>3</span>
          <h3>Fast Delivery</h3>
          <p>Your food will be delivered fresh and as quickly as possible.</p>
        </div>
      </div>
      <p>
        Delivery time may depend on your location, restaurant preparation time, and availability. We always try to make the process simple and reliable for every customer.
      </p>
    </div>
  )
}

export default Delivery
