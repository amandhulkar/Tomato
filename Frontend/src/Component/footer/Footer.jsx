import React from 'react'
import { Link } from 'react-router-dom'
import '../footer/footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Tomato logo" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste esse asperiores commodi amet officiis illum iure omnis atque voluptatum qui voluptate nobis sint quaerat, repellendus in distinctio nam. Libero, accusantium.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>
              <Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                About Us
              </Link>
            </li>
            <li>
              <Link to='/delivery' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Delivery
              </Link>
            </li>
            <li>
              <Link to='/privacy-policy' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 8952004922</li>
            <li>
              <a href="mailto:amandhulkar0079@gmail.com">
                amandhulkar0079@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026© Tomato.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer