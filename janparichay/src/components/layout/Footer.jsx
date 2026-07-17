import React from 'react'
import { Link } from 'react-router-dom'
import './Layout.css'
import englishTranslations from '../../locales/en.json'

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
                  {englishTranslations.footer_copyright}
              </p>
              <div className="footer-links">
                  <Link to="/about#about">{englishTranslations.footer_link_about_us}</Link>
                  <span className="footer-separator">|</span>
                  <Link to="/application-policies">{englishTranslations.footer_link_application_policies}</Link>
                  <span className="footer-separator">|</span>
                  <Link to="/terms-conditions">{englishTranslations.footer_link_terms_conditions}</Link>
                  <span className="footer-separator">|</span>
                  <Link to="/faq">{englishTranslations.footer_link_faq}</Link>
              </div>
          </div>
      </footer>
    </div>
  )
}
export default Footer
