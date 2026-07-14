import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import '../AboutUs.css'
import banner1 from '../images/Banner-1.png'
import banner2 from '../images/Banner-2.png'
import banner3 from '../images/Banner-3.png'
import banner4 from '../images/Banner-4.png'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import digitalIndia from '../images/Digital-India.png'
import NIC_logo from '../images/NIC.png'
import partner1 from '../images/1.png'
import partner2 from '../images/2.png'
import partner3 from '../images/3.png'
import partner4 from '../images/4.png'
import partner5 from '../images/5.png'
import partner6 from '../images/6.png'
import partner7 from '../images/7.png'
import partner8 from '../images/8.png'
import partner9 from '../images/9.png'
import partner10 from '../images/10.png'
import partner11 from '../images/11.png'
import partner12 from '../images/12.png'


export default function AboutUs() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('about')
  const [openFaq, setOpenFaq] = useState(null)
  const [currentPack, setCurrentPack] = useState(0)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  useEffect(() => {
    const pageEl = document.querySelector('.about-page')
    if (!pageEl) return

    const handleScroll = () => {
      setShowBackToTop(pageEl.scrollTop > 300)
    }

    pageEl.addEventListener('scroll', handleScroll)
    return () => pageEl.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  const scrollToTop = () => {
    const pageEl = document.querySelector('.about-page')
    if (pageEl) {
      pageEl.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const heroSlides = [
    { img: banner1, link: 'https://www.digitalindia.gov.in/' },
    { img: banner2, link: 'https://www.digitalindia.gov.in/' },
    { img: banner3, link: 'https://analytics.gov.in/' },
    { img: banner4, link: 'https://analytics.gov.in/' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const hash = location.hash || '#about'
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          const pageEl = document.querySelector('.about-page')
          if (pageEl) {
            const navbarHeight = 64 
            const padding = 16     
            const offsetTop = element.getBoundingClientRect().top
              + pageEl.scrollTop
              - pageEl.getBoundingClientRect().top
              - navbarHeight
              - padding
            pageEl.scrollTo({ top: offsetTop, behavior: 'smooth' })
          } else {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 150)
      }
    }
  }, [isLoading, location.hash])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPack(prev => (prev === 0 ? 1 : 0))
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const sectionIds = ['home', 'about', 'services', 'faq', 'contact']

   
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) navObserver.observe(el)
    })


    const aboutEl = document.getElementById('about')
    const servicesEl = document.getElementById('services')
    const faqEl = document.getElementById('faq')
    const contactEl = document.getElementById('contact')
    if (aboutEl) animObserver.observe(aboutEl)
    if (servicesEl) animObserver.observe(servicesEl)
    if (faqEl) animObserver.observe(faqEl)
    if (contactEl) animObserver.observe(contactEl)

    return () => {
      navObserver.disconnect()
      animObserver.disconnect()
    }
  }, [isLoading])

  const handleNavClick = (sectionId) => {
    setActiveTab(sectionId)
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      if (['about', 'services', 'faq', 'contact'].includes(sectionId)) {
        element.classList.remove('in-view')
        void element.offsetWidth; // Force reflow
        element.classList.add('in-view')
      }
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact' }
  ]

  if (isLoading) {
    return (
      <div className="about-loading-container">
        <div className="about-pure-spinner">
          <div className="about-spinner-circle outer"></div>
          <div className="about-spinner-circle inner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="about-page">
      {/* Navigation bar */}
      <nav className="about-nav">
        <Link to="/login">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" className="about-nav-logo" style={{ cursor: 'pointer' }} />
        </Link>
        <ul className="about-nav-links">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                className={`about-nav-link ${activeTab === id ? 'active' : ''}`}
                onClick={() => handleNavClick(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="about-mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="about-mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <button
            type="button"
            className="about-mobile-menu-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            ×
          </button>
          <nav className="about-mobile-menu" aria-label="Mobile navigation" onClick={(event) => event.stopPropagation()}>
            {navItems.map(({ id, label }) => (
              <button
                type="button"
                key={id}
                className={`about-mobile-menu-link ${activeTab === id ? 'active' : ''}`}
                onClick={() => handleNavClick(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/*Home Section*/}
      <header className="about-hero-slider-viewport" id="home">
        <div
          className="about-hero-slider-track"
          style={{
            transform: `translateX(-${currentHeroSlide * 25}%)`,
            width: `${heroSlides.length * 100}%`
          }}
        >
          {heroSlides.map((slide, index) => (
            <div
              className="about-hero-slide"
              key={index}
              style={{ width: `${100 / heroSlides.length}%` }}
            >
              <a href={slide.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={slide.img}
                  alt={`Banner ${index + 1}`}
                  className="about-hero-banner-img"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="about-hero-dots">
          {heroSlides.map((_, index) => (
            <span
              key={index}
              className={`about-hero-dot ${currentHeroSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentHeroSlide(index)}
            ></span>
          ))}
        </div>
      </header>

      {/*About Section*/}
      <section className="about-section" id="about">
        <div className="about-section-tag">About</div>
        <h2 className="about-section-title">WHO WE ARE</h2>
        
        <div className="about-intro-grid">
          <div className="about-intro-left">
            <p className="about-intro-desc">
              JanParichay is a single sign-on application designed to integrate services under a single authentication domain. It is a centralized session and user authentication service in which one set of login credentials can be used to access multiple applications. The service authenticates user one on one designated platform, enabling the user to use a plethora of services without having to log in and logout each time.
            </p>
            <p className="about-intro-desc">
              The sole purpose of the application is to provide SSO framework for the various Government services along with an added layer of security by providing a strong authentication mechanism.
            </p>
            <p className="about-intro-desc">
              MeriPehchaan merges diverse authentication frameworks under a single umbrella, enhancing usability and security while establishing a trust-based ecosystem for seamless digital service delivery.
            </p>
            <button 
              className="about-readmore-btn" 
              onClick={() => window.open('https://meripehchaan.gov.in/', '_blank', 'noopener,noreferrer')}
            >
              Read More
            </button>
          </div>
          
          <div className="about-intro-right">
            <h3 className="salient-title">Salient features</h3>
            <ul className="salient-list">
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>Provides e-Authentication as a service to government departments for providing a secure and convenient way for users to access government services.</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>Designed to formulate authentication standards and develop pluggable authentication components for seamless user onboarding and authentication.</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>Authenticates the user for all the services and does authorization based on the service enforced verification parameters.</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>Integrated with multiple backend verification parameters including Aadhaar Card, Pan Card, Driving License, Application dependent Id and others.</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>Allows user as well as integrated service to enforce multi-factor authentication including OTP, Backup Codes, Tap and Token.</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>Offers Real-time analytics capabilities via JanParichay Analytics application, which help to identify a user session activity thus reducing potential profile hacks.</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>Extended to any number of user bases but restricted to the size of the backend infrastructure cluster.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/*Service Partners*/}
      <section className="about-partners">
        <h3 className="about-partners-title">Service Partners</h3>
        <div className="about-partners-slider-viewport">
          <div 
            className="about-partners-slider-track" 
            style={{ transform: `translateX(-${currentPack * 50}%)` }}
          >
            <div className="about-partners-pack">
              <div className="about-partner-logo-box">
                <img src={partner1} alt="Odisha One" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner2} alt="ServicePlus" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner3} alt="eOffice" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner4} alt="@gov.in" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner5} alt="Karmayogi Bharat" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner6} alt="CSC" />
              </div>
            </div>
            <div className="about-partners-pack">
              <div className="about-partner-logo-box">
                <img src={partner7} alt="myGov" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner8} alt="SWAAS" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner9} alt="Digital Gujarat" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner10} alt="National Literacy Mission" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner11} alt="DRDO" />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner12} alt="AAI" />
              </div>
            </div>
          </div>
        </div>
        <div className="about-partners-indicators">
          <span 
            className={`about-partners-indicator ${currentPack === 0 ? 'active' : ''}`}
            onClick={() => setCurrentPack(0)}
          ></span>
          <span 
            className={`about-partners-indicator ${currentPack === 1 ? 'active' : ''}`}
            onClick={() => setCurrentPack(1)}
          ></span>
        </div>
      </section>

      {/* Key Features */}
      <section className="about-section" id="services">
        <div className="about-section-tag">Features</div>
        <h2 className="about-section-title">KEY FEATURES</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#0ea5e9' }}>
              <i className="bi bi-qr-code"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">Multifactor Authentication</h4>
              <p className="feature-card-desc">
                By using Parichay Authenticator, users can enable multiple-factor authentication to login Parichay via Tap, and Token Authentication.
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#f97316' }}>
              <i className="bi bi-sliders"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">Standard Integration Methods</h4>
              <p className="feature-card-desc">
                Application owners can opt for various integration methods to integrate their application with Parichay i.e. Rest APIs, SAML 2.0, and OAuth 2.0.
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#10b981' }}>
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">Real-time analytics</h4>
              <p className="feature-card-desc">
                An analytical dashboard to track user activities and reduce suspicious actions.
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#ef4444' }}>
              <i className="bi bi-geo-alt"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">Geofencing</h4>
              <p className="feature-card-desc">
                Users can restrict their individual access for specific locations by enabling the virtual boundaries.
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#8b5cf6' }}>
              <i className="bi bi-translate"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">Multilingual Support</h4>
              <p className="feature-card-desc">
                The platform offers multiple language support to meet the diverse understanding of the users PAN India.
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#ec4899' }}>
              <i className="bi bi-fingerprint"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">Aadhaar eKYC</h4>
              <p className="feature-card-desc">
                Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure. Corrupti recusandae ducimus enim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="about-section about-faq" id="faq">
        <div className="about-section-tag">Frequently Asked Questions</div>
        <h2 className="about-section-title">FREQUENTLY ASKED QUESTIONS</h2>
        
        <div className="about-faq-list">
          <div className={`about-faq-item ${openFaq === 0 ? 'active' : ''}`}>
            <button className="about-faq-question" onClick={() => toggleFaq(0)}>
              <span>1. What is Jan Parichay?</span>
              <i className={`bi bi-chevron-${openFaq === 0 ? 'up' : 'down'}`}></i>
            </button>
            {openFaq === 0 && (
              <div className="about-faq-answer">
                Jan Parichay is a Single Sign On Platform for Government to Citizen (G2C) services like transport applications, MyGov and others. Jan Parichay authenticates the user for all the services and does authorization based on the rights given to the user.
              </div>
            )}
          </div>
          <div className={`about-faq-item ${openFaq === 1 ? 'active' : ''}`}>
            <button className="about-faq-question" onClick={() => toggleFaq(1)}>
              <span>2. What is a Single Sign On Platform?</span>
              <i className={`bi bi-chevron-${openFaq === 1 ? 'up' : 'down'}`}></i>
            </button>
            {openFaq === 1 && (
              <div className="about-faq-answer">
                Single sign-on (SSO) is a centralized session and user authentication service in which a set of login credentials can be used to access multiple applications. This offers major benefits for the users as it eliminates the need to repeatedly prove their identities.
              </div>
            )}
          </div>
          <div className={`about-faq-item ${openFaq === 2 ? 'active' : ''}`}>
            <button className="about-faq-question" onClick={() => toggleFaq(2)}>
              <span>3. What are the benefits of using Jan Parichay?</span>
              <i className={`bi bi-chevron-${openFaq === 2 ? 'up' : 'down'}`}></i>
            </button>
            {openFaq === 2 && (
              <div className="about-faq-answer">
                The basic objective of Jan Parichay is to eliminate individual sign-on procedures by centralizing user authentication and identity management at a central identity provider. It enhances security of user credentials.
              </div>
            )}
          </div>
        </div>
        
        <Link to="/faq" className="about-readmore-btn">
          Read All FAQs
        </Link>
      </section>

      {/* Contact Us */}
      <section className="about-section" id="contact">
        <div className="about-section-tag">Contact</div>
        <h2 className="about-section-title">CONTACT US</h2>
        
        <div className="about-contact-grid">
          <div className="contact-card">
            <div className="contact-icon-box">
              <i className="bi bi-telephone"></i>
            </div>
            <div>
              <h4 className="contact-card-title">Call Us</h4>
              <p className="contact-card-value">1800 111 555</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon-box">
              <i className="bi bi-envelope"></i>
            </div>
            <div>
              <h4 className="contact-card-title">Mail Us</h4>
              <p className="contact-card-value">support-parichay[at]nic[dot]in</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon-box">
              <i className="bi bi-globe"></i>
            </div>
            <div>
              <h4 className="contact-card-title">Reach Us</h4>
              <p className="contact-card-value">https://servicedesk.nic.in/</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon-box">
              <i className="bi bi-geo-alt"></i>
            </div>
            <div>
              <h4 className="contact-card-title">Address</h4>
              <p className="contact-card-value">
                National Informatics Centre, Block III, Delhi IT Park, Shastri Park, New Delhi - 110053
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Footer */}
      <div className="about-footer-partners">
        <div className="about-footer-partner-card">
          <img src={NIC_logo} alt="NIC" className="about-footer-partner-img" />
          <div className="about-footer-partner-info">
            <span className="about-footer-partner-name">National Informatics Centre</span>
            <span className="about-footer-partner-dept">Ministry of Electronics & Information Technology (MeitY) Government of India</span>
          </div>
        </div>
        <div className="about-footer-partner-card">
          <img src={digitalIndia} alt="Digital India" className="about-footer-partner-img" />
          <div className="about-footer-partner-info">
            <span className="about-footer-partner-name">Digital India Corporation</span>
            <span className="about-footer-partner-dept">Ministry of Electronics & Information Technology (MeitY) Government of India</span>
          </div>
        </div>
      </div>
      
      {/* Footer copyright */}
      <footer className="about-footer-copyright">
        Copyright © 2026 JanParichay Meripehchaan All Rights Reserved
      </footer>

      {/* Floating Back to Top Button */}
      <button 
        className={`about-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  )
}
