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
import { useLanguage } from '../context/LanguageContext'


export default function AboutUs() {
  const {t} = useLanguage()
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
        void element.offsetWidth; 
        element.classList.add('in-view')
      }
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  const navItems = [
    { id: 'home', label: t('about_nav_item_home') },
    { id: 'about', label: t('about_nav_item_about') },
    { id: 'services', label: t('about_nav_item_services') },
    { id: 'faq', label: t('about_nav_item_faqs') },
    { id: 'contact', label: t('about_nav_item_contact') }
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
          <img src={meriPehchaanLogo} alt={t('about_logo_alt')} className="about-nav-logo" style={{ cursor: 'pointer' }} />
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
          aria-label={t('about_mobile_menu_open_aria')}
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
            aria-label={t('about_mobile_menu_close_aria')}
          >
            ×
          </button>
          <nav className="about-mobile-menu" aria-label={t('about_mobile_navigation_aria')} onClick={(event) => event.stopPropagation()}>
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

      {/*Home section*/}
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
                  alt={t('about_banner_alt').replace('{{number}}', index + 1)}
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

      {/*About section*/}
      <section className="about-section" id="about">
        <div className="about-section-tag">{t('about_section_tag_about')}</div>
        <h2 className="about-section-title">{t('about_section_title_who_we_are')}</h2>
        
        <div className="about-intro-grid">
          <div className="about-intro-left">
            <p className="about-intro-desc">
              {t('about_intro_paragraph_1')}
            </p>
            <p className="about-intro-desc">
              {t('about_intro_paragraph_2')}
            </p>
            <button 
              className="about-readmore-btn" 
              onClick={() => window.open('https://meripehchaan.gov.in/', '_blank', 'noopener,noreferrer')}
            >
              {t('about_read_more_button')}
            </button>
          </div>
          
          <div className="about-intro-right">
            <h3 className="salient-title">{t('about_salient_features_title')}</h3>
            <ul className="salient-list">
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>{t('about_salient_feature_1')}</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>{t('about_salient_feature_2')}</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>{t('about_salient_feature_3')}</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>{t('about_salient_feature_4')}</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>{t('about_salient_feature_5')}</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>{t('about_salient_feature_6')}</span>
              </li>
              <li className="salient-item">
                <i className="bi bi-check-circle"></i>
                <span>{t('about_salient_feature_7')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Service partners  */}
      <section className="about-partners">
        <h3 className="about-partners-title">{t('about_partners_title')}</h3>
        <div className="about-partners-slider-viewport">
          <div 
            className="about-partners-slider-track" 
            style={{ transform: `translateX(-${currentPack * 50}%)` }}
          >
            <div className="about-partners-pack">
              <div className="about-partner-logo-box">
                <img src={partner1} alt={t('about_partner_odisha_one_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner2} alt={t('about_partner_serviceplus_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner3} alt={t('about_partner_eoffice_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner4} alt={t('about_partner_gov_in_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner5} alt={t('about_partner_karmayogi_bharat_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner6} alt={t('about_partner_csc_alt')} />
              </div>
            </div>
            <div className="about-partners-pack">
              <div className="about-partner-logo-box">
                <img src={partner7} alt={t('about_partner_mygov_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner8} alt={t('about_partner_swaas_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner9} alt={t('about_partner_digital_gujarat_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner10} alt={t('about_partner_national_literacy_mission_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner11} alt={t('about_partner_drdo_alt')} />
              </div>
              <div className="about-partner-logo-box">
                <img src={partner12} alt={t('about_partner_aai_alt')} />
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

      {/* Key features */}
      <section className="about-section" id="services">
        <div className="about-section-tag">{t('about_section_tag_features')}</div>
        <h2 className="about-section-title">{t('about_section_title_key_features')}</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#0ea5e9' }}>
              <i className="bi bi-qr-code"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">{t('about_feature_title_multifactor_auth')}</h4>
              <p className="feature-card-desc">
                {t('about_feature_desc_multifactor_auth')}
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#f97316' }}>
              <i className="bi bi-sliders"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">{t('about_feature_title_standard_integration')}</h4>
              <p className="feature-card-desc">
                {t('about_feature_desc_standard_integration')}
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#10b981' }}>
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">{t('about_feature_title_realtime_analytics')}</h4>
              <p className="feature-card-desc">
                {t('about_feature_desc_realtime_analytics')}
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#ef4444' }}>
              <i className="bi bi-geo-alt"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">{t('about_feature_title_geofencing')}</h4>
              <p className="feature-card-desc">
                {t('about_feature_desc_geofencing')}
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#8b5cf6' }}>
              <i className="bi bi-translate"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">{t('about_feature_title_multilingual')}</h4>
              <p className="feature-card-desc">
                {t('about_feature_desc_multilingual')}
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-container" style={{ color: '#ec4899' }}>
              <i className="bi bi-fingerprint"></i>
            </div>
            <div className="feature-card-content">
              <h4 className="feature-card-title">{t('about_feature_title_aadhaar_ekyc')}</h4>
              <p className="feature-card-desc">
                {t('about_feature_desc_aadhaar_ekyc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="about-section about-faq" id="faq">
        <div className="about-section-tag">{t('about_section_tag_faq')}</div>
        <h2 className="about-section-title">{t('about_section_title_faq')}</h2>
        
        <div className="about-faq-list">
          <div className={`about-faq-item ${openFaq === 0 ? 'active' : ''}`}>
            <button className="about-faq-question" onClick={() => toggleFaq(0)}>
              <span>{t('about_faq_q1')}</span>
              <i className={`bi bi-chevron-${openFaq === 0 ? 'up' : 'down'}`}></i>
            </button>
            {openFaq === 0 && (
              <div className="about-faq-answer">
                {t('about_faq_a1')}
              </div>
            )}
          </div>
          <div className={`about-faq-item ${openFaq === 1 ? 'active' : ''}`}>
            <button className="about-faq-question" onClick={() => toggleFaq(1)}>
              <span>{t('about_faq_q2')}</span>
              <i className={`bi bi-chevron-${openFaq === 1 ? 'up' : 'down'}`}></i>
            </button>
            {openFaq === 1 && (
              <div className="about-faq-answer">
                {t('about_faq_a2')}
              </div>
            )}
          </div>
          <div className={`about-faq-item ${openFaq === 2 ? 'active' : ''}`}>
            <button className="about-faq-question" onClick={() => toggleFaq(2)}>
              <span>{t('about_faq_q3')}</span>
              <i className={`bi bi-chevron-${openFaq === 2 ? 'up' : 'down'}`}></i>
            </button>
            {openFaq === 2 && (
              <div className="about-faq-answer">
                {t('about_faq_a3')}
              </div>
            )}
          </div>
        </div>
        
        <Link to="/faq" className="about-readmore-btn">
          {t('about_read_all_faqs_link')}
        </Link>
      </section>

      {/* Contact us */}
      <section className="about-section" id="contact">
        <div className="about-section-tag">{t('about_section_tag_contact')}</div>
        <h2 className="about-section-title">{t('about_section_title_contact_us')}</h2>
        
        <div className="about-contact-grid">
          <div className="contact-card">
            <div className="contact-icon-box">
              <i className="bi bi-telephone"></i>
            </div>
            <div>
              <h4 className="contact-card-title">{t('about_contact_call_title')}</h4>
              <p className="contact-card-value">{t('about_contact_call_value')}</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon-box">
              <i className="bi bi-envelope"></i>
            </div>
            <div>
              <h4 className="contact-card-title">{t('about_contact_mail_title')}</h4>
              <p className="contact-card-value">{t('about_contact_mail_value')}</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon-box">
              <i className="bi bi-globe"></i>
            </div>
            <div>
              <h4 className="contact-card-title">{t('about_contact_reach_title')}</h4>
              <p className="contact-card-value">{t('about_contact_reach_value')}</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon-box">
              <i className="bi bi-geo-alt"></i>
            </div>
            <div>
              <h4 className="contact-card-title">{t('about_contact_address_title')}</h4>
              <p className="contact-card-value">
                {t('about_contact_address_value')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners footer */}
      <div className="about-footer-partners">
        <div className="about-footer-partner-card">
          <img src={NIC_logo} alt={t('about_footer_nic_alt')} className="about-footer-partner-img" />
          <div className="about-footer-partner-info">
            <span className="about-footer-partner-name">National Informatics Centre</span>
            <span className="about-footer-partner-dept">Ministry of Electronics & Information Technology (MeitY) Government of India</span>
          </div>
        </div>
        <div className="about-footer-partner-card">
          <img src={digitalIndia} alt={t('about_footer_digital_india_alt')} className="about-footer-partner-img" />
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

      {/* Floating back to top button */}
      <button 
        className={`about-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label={t('about_back_to_top_aria')}
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  )
}