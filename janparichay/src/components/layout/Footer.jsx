import React from 'react'
import { Link } from 'react-router-dom'
import './Layout.css'

// Import all sliding logos
import digilocker from '../../images/digilocker.png'
import digitalIndia from '../../images/Digital-India.png'
import epramaan from '../../images/epramaan.png'
import govIn from '../../images/gov-in.png'
import indiaGov from '../../images/india-gov.in.png'
import janparichay from '../../images/janparichay.png'
import meity from '../../images/MeitY.png'
import myGov from '../../images/myGov.png'

const LOGOS = [
  { src: myGov, alt: 'myGov' },
  { src: indiaGov, alt: 'indiaGov' },
  { src: meity, alt: 'MeitY' },
  { src: digilocker, alt: 'digilocker' },
  { src: janparichay, alt: 'janparichay' },
  { src: epramaan, alt: 'epramaan' },
  { src: digitalIndia, alt: 'Digital India' },
  { src: govIn, alt: 'govIn' }
]

function Footer({ showSlider = false }) {
  return (
    <div className="footer-wrapper">
      {/* Infinite Logo Slider */}
      {showSlider && (
        <div className="logo-slider-wrapper">
          <div className="logo-slider-track">
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
              <div className="logo-slider-item" key={index}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="footer-container">
          <div className="footer-content">
              <p className="footer-copyright">
                  Copyright @ 2026 Government Of India. Designed and Maintained by National Informatics Centre
              </p>
              <div className="footer-links">
                  <Link to="/about#about">About Us</Link>
                  <span className="footer-separator">|</span>
                  <Link to="/application-policies">Application Policies</Link>
                  <span className="footer-separator">|</span>
                  <Link to="/terms-conditions">Terms &amp; Conditions</Link>
                  <span className="footer-separator">|</span>
                  <Link to="/faq">FAQ</Link>
              </div>
          </div>
      </footer>
    </div>
  )
}
export default Footer