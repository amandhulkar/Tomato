import React from 'react'
import './about.css'

const About = () => {
  return (
    <div className='info-page'>
      <h1>About Us</h1>
      <p>
        Tomato is a food delivery website created to make ordering your favourite meals simple, fast, and reliable.
        We bring a wide range of delicious dishes to one place so customers can explore menus, choose food, and enjoy a smooth ordering experience.
      </p>
      <p>
        Our goal is to satisfy every craving with fresh food, easy ordering, and quick delivery. Whether you want snacks, meals, desserts, or refreshing drinks, Tomato helps you find the right choice in just a few clicks.
      </p>
      <div className='info-card-wrapper'>
        <div className='info-card'>
          <h3>Fresh Food</h3>
          <p>We focus on quality food options made with fresh ingredients.</p>
        </div>
        <div className='info-card'>
          <h3>Easy Ordering</h3>
          <p>Choose your food, add it to cart, and place your order easily.</p>
        </div>
        <div className='info-card'>
          <h3>Customer First</h3>
          <p>We aim to give users a simple and satisfying food delivery experience.</p>
        </div>
      </div>
    </div>
  )
}

export default About
