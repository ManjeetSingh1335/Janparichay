import React from 'react'
import { Link } from 'react-router-dom'
import './Layout.css'

function Footer() {
  return (
    <footer className="footer-container">
        <div className="footer-content">
            <p className="footer-copyright">
                Copyright &#64; 2026 Government Of India. Designed and Maintained by National Informatics Centre
            </p>
            <div className="footer-links">
                <a href="#about">About Us</a>
                <span className="footer-separator">|</span>
                <a href="#policies">Application Policies</a>
                <span className="footer-separator">|</span>
                <Link to="/terms-conditions">Terms &amp; Conditions</Link>
                <span className="footer-separator">|</span>
                <a href="#faq">FAQ</a>
            </div>
        </div>
    </footer>
  )
}
export default Footer