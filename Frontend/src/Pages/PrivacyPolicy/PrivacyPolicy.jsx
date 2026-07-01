import React from 'react'
import './privacyPolicy.css'

const PrivacyPolicy = () => {
  return (
    <div className='info-page'>
      <h1>Privacy Policy</h1>
      <p>
        At Tomato, we respect your privacy and aim to keep your information safe. This page explains how user information may be used while using this food delivery website.
      </p>
      <div className='policy-section'>
        <h3>Information We Use</h3>
        <p>
          We may use basic details such as your name, contact information, delivery address, and order details to process food orders and improve the website experience.
        </p>
      </div>
      <div className='policy-section'>
        <h3>How We Use Information</h3>
        <p>
          Your information is used for order placement, delivery support, customer communication, and improving our food delivery services.
        </p>
      </div>
      <div className='policy-section'>
        <h3>Data Safety</h3>
        <p>
          We do not sell your personal details. We try to keep customer information secure and use it only for website and delivery-related purposes.
        </p>
      </div>
      <div className='policy-section'>
        <h3>Contact</h3>
        <p>
          For privacy-related questions, contact us at amandhulkar0079@gmail.com.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
