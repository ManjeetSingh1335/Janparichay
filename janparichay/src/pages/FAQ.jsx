import React, {useState, useEffect, useRef} from 'react'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import Footer from '../components/layout/Footer'
import { usePageLanguage } from '../hooks/usePageLanguage'
import '../FAQ.css'

const TRANSLATIONS = {
  'English': {
    title: "JAN PARICHAY FAQs",
    faqs: [
      {
        q: "1. What is Jan Parichay?",
        a: "Jan Parichay is a Single Sign On Platform for Government to Citizen (G2C) services like transport applications, MyGov and others. Jan Parichay authenticates the user for all the services and does authorization based on the rights given to the user, so it eliminates further need of authentication/authorization when the user switches services during the same session."
      },
      {
        q: "2. What is a Single Sign On Platform?",
        a: "Single sign-on (SSO) is a centralized session and user authentication service in which a set of login credentials can be used to access multiple applications. This offers major benefits for the users as it eliminates the need to repeatedly prove their identities to different applications and hold different credentials for each application."
      },
      {
        q: "3. What are the benefits of using Jan Parichay?",
        a: "The basic objective of Jan Parichay is to eliminate individual sign-on procedures by centralizing user authentication and identity management at a central identity provider. It enhances security of user credentials, increases user productivity as it allows user mobility and access to multiple services and applications by authenticating just once."
      },
      {
        q: "4. How can I join Jan Parichay?",
        a: "Jan Parichay provides a Registration module for citizens that allows a user to register using any verification parameters that includes their E-mail/Mobile/Government Ids such as PAN, Aadhaar Card, Driving License, Voter ID, etc., hence, the user on-boarding is quick and uniform."
      },
      {
        q: "5. Is it safe to share Aadhar Card details with Jan Parichay?",
        a: "Yes, it is completely safe as Jan Parichay is highly secured with the AES algorithm. Jan Parichay stores all the verification parameter details as an encrypted string."
      },
      {
        q: "6. Can I login with my linked verification Ids?",
        a: "Yes, Jan Parichay provides flexible login. You can login with user ID or any of the linked verification IDs like mobile number, E-mail ID etc."
      },
      {
        q: "7. What is the login process for Jan Parichay?",
        a: "One can login using E-mail ID or mobile number by using the password generated while registration. On successful authentication, 2 step multi factor authentication is performed as well. On successful 2FA, a user is able to login."
      },
      {
        q: "8. What is 2 step authentication?",
        a: "One of the most secure prevention controls for unauthorized access, fraud, and cyber identity thefts is two-step multifactor authentication. This adds an additional layer of security, in which a user authenticates by providing a password, as well as a second factor, that could be an OTP (sent over registered mobile number or E-mail ID), Backup Code, Token or Tap Authentication method."
      },
      {
        q: "9. How can I contact the Jan Parichay team in case of any query/complaint?",
        a: "User can register their complaint via support-parichay[at]nic[dot]in or call on toll free number 1800-111-555."
      },
      {
        q: "10. How can I send my feedbacks to the Jan Parichay team?",
        a: "User Can E-mail on support-parichay[at]nic[dot]in or call on toll free number 1800-111-555."
      },
      {
        q: "11. When does my session expire on Jan Parichay and what will be the impact of session expiry?",
        a: "Each application based on its criticality may have different session idle timeout. Jan Parichay allows the application to manage their session idle timeout as per their application need. User will need to authenticate again to get access to the application that has been timed out, however, continue to access other applications with valid session without further authentication.By default, Jan Parichay session expiry time is of 12 hours and user will be logged out of all the application on its expiry and will be asked to login again."
      },
      {
        q: "12. I am unable to register with my mobile number.",
        a: [
          "If you are not able to get SMS of OTP",
          "If you are getting any error message, please contact Jan Parichay Support."
        ]
      },
      {
        q: "13. I am getting 'Service Not Found' error on the Jan Parichay login page.",
        a: [
          "Contact the service owner and check if the service is registered with Jan Parichay or not.",
          "The service owner list can be found based on service name. For list, contact Jan Parichay Support."
        ]
      },
      {
        q: "14. Even after successful login to the Jan Parichay application, I am getting 'user is not authorized to access the service' while accessing certain services.?",
        a: "You are not allowed to access the respective service. Please contact the service owner."
      },
      {
        q: "15. I am not receiving OTP on my mobile number.",
        a: [
          "Kindly verify your registered mobile number",
          "If mobile number is correct, please check if the OTP is received on registered E-mail or not",
          "If OTP is received on registered E-mail, then there might be some problem with the mobile network",
          "If OTP is not received on registered E-mail, please contact Jan Parichay Support."
        ]
      },
      {
        q: "16. I am being asked to perform 2 step multi factor authenticationon every login.",
        a: [
          "When you login, you may remember the known environment with JanParichay. Click on 'Remember My Device' to remember your device/ environment.",
          "If any of the parameters (IP, Browser ID, or OS) changes, you will get the OTP."
        ]
      },
      {
        q: "17. I am being asked for password frequently on other integrated services.",
        a: [
          "Certain services may maintain their session timeout differently",
          "If session is idle for that time (session timeout), you will be asked to enter password again to login back to the respective service."
        ]
      },
      {
        q: "18. How can I see all the devices logged into my Jan Parichay account?",
        a: [
          "Open janparichay.gov.in",
          "Go to Settings -> Activity -> User Devices",
          "Here the device details can be accessed like Device Name, IP Name, Time of Login and Logout",
          "For more information about device activities, please visit https://analytics.gov.in"
        ]
      },
      {
        q: "19. How can I see all the active sessions logged into my Jan Parichay account?",
        a: [
          "Open janparichay.gov.in",
          "Go to Settings -> AccountActivity -> Recent Activities",
          "For more information about session activities, please visit https://analytics.gov.in"
        ]
      },
      {
        q: "20. While accessing Jan Parichay integrated services, I am getting an error with the message: 'Data Integrity Lost'.",
        intro: "Data Integrity Lost error usually pops up when the Client Application time is not synced with the Standard Time Zone. In that case, kindly follow the solution mentioned below:",
        a: [
          "Report this issue to the Client Application Owner",
          "You may approach the Support team (support-parichay[at]nic[dot]in)"
        ]
      },
      {
        q: "21. While accessing Jan Parichay integrated services, I am getting an error with the message: 'Access Denied'.",
        a: [
          "You are not authorized to access the client application, kindly contact the concerned Service Owner.",
          "However, you can access the Jan Parichay dashboard."
        ]
      },
      {
        q: "22. How can I reactivate my JanParichay-Meri Pehchaan Account?",
        a: "Kindly reach out to JanParichay Support using your registered mobile number : 1800 115 555 or email: support-parichay[at]nic[dot]in"
      },
      {
        q: "23. How can I delete my JanParichay–Meri Pehchaan Account?" ,
        a: "Kindly reach out to JanParichay Support using your registered mobile number at 1800 111 555 or email support-parichay[at]nic[dot]in."
      }
    ]
  }
}

export default function FAQ() {
  const { t, pageLangCode, setPageLangCode } = usePageLanguage()
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null) 
  const langRef = useRef(null)

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'mr', label: 'मराठी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'or', label: 'ଓଡ଼ିଆ' }
  ]

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangDropdownOpen(false)
      }
    }
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [langDropdownOpen])

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const text = {
    title: t('faq_page_title'),
    faqs: [
      { q: t('faq_q1'), a: t('faq_a1') },
      { q: t('faq_q2'), a: t('faq_a2') },
      { q: t('faq_q3'), a: t('faq_a3') },
      { q: t('faq_q4'), a: t('faq_a4') },
      { q: t('faq_q5'), a: t('faq_a5') },
      { q: t('faq_q6'), a: t('faq_a6') },
      { q: t('faq_q7'), a: t('faq_a7') },
      { q: t('faq_q8'), a: t('faq_a8') },
      { q: t('faq_q9'), a: t('faq_a9') },
      { q: t('faq_q10'), a: t('faq_a10') },
      { q: t('faq_q11'), a: t('faq_a11') },
      { q: t('faq_q12'), a: [t('faq_a12_item_1'), t('faq_a12_item_2')] },
      { q: t('faq_q13'), a: [t('faq_a13_item_1'), t('faq_a13_item_2')] },
      { q: t('faq_q14'), a: t('faq_a14') },
      { q: t('faq_q15'), a: [t('faq_a15_item_1'), t('faq_a15_item_2'), t('faq_a15_item_3'), t('faq_a15_item_4')] },
      { q: t('faq_q16'), a: [t('faq_a16_item_1'), t('faq_a16_item_2')] },
      { q: t('faq_q17'), a: [t('faq_a17_item_1'), t('faq_a17_item_2')] },
      { q: t('faq_q18'), a: [t('faq_a18_item_1'), t('faq_a18_item_2'), t('faq_a18_item_3'), t('faq_a18_item_4')] },
      { q: t('faq_q19'), a: [t('faq_a19_item_1'), t('faq_a19_item_2'), t('faq_a19_item_3')] },
      { q: t('faq_q20'), intro: t('faq_a20_intro'), a: [t('faq_a20_item_1'), t('faq_a20_item_2')] },
      { q: t('faq_q21'), a: [t('faq_a21_item_1'), t('faq_a21_item_2')] },
      { q: t('faq_q22'), a: t('faq_a22') },
      { q: t('faq_q23'), a: t('faq_a23') },
    ]
  }

  const renderAnswer = (faq) => {
    if (faq.intro) {
      return (
        <div>
          <p style={{ margin: '0 0 12px 0' }}>{faq.intro}</p>
          <ul style={{ paddingLeft: '20px', margin: 0, listStyleType: 'disc' }}>
            {faq.a.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
            ))}
          </ul>
        </div>
      )
    }
    if (Array.isArray(faq.a)) {
      return (
        <ul style={{ paddingLeft: '20px', margin: 0, listStyleType: 'disc' }}>
          {faq.a.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
          ))}
        </ul>
      )
    }
    return <p style={{ margin: 0 }}>{faq.a}</p>
  }

  return (
    <div className="faq-page">
      {/* Header */}
      <header className="faq-header">
        <div className="faq-header-logo-container">
          <img src={meriPehchaanLogo} alt={t('navbar_logo_alt')} className="faq-header-logo" />
        </div>
        <div className="faq-header-lang" ref={langRef}>
          <div 
            className="faq-lang-trigger" 
            onClick={() => setLangDropdownOpen(prev => !prev)}
          >
            <span>{languages.find(lang => lang.code === pageLangCode)?.label || 'English'}</span>
            <i className="bi bi-chevron-down faq-lang-chevron"></i>
          </div>
          {langDropdownOpen && (
            <ul className="faq-lang-menu">
              {languages.map(lang => (
                <li 
                  key={lang.code} 
                  className={`faq-lang-item ${pageLangCode === lang.code ? 'active' : ''}`}
                  onClick={() => {
                    setPageLangCode(lang.code)
                    setLangDropdownOpen(false)
                  }}
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Scrollable Content Wrapper */}
      <div className="faq-content-wrapper">
        <div className="faq-body">
          <h1 className="faq-title">{text.title}</h1>
          
          <div className="faq-list">
            {text.faqs.map((faq, index) => {
              const isOpen = activeIndex === index
              return (
                <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button 
                    className="faq-question-btn" 
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <i className="bi bi-chevron-down faq-chevron"></i>
                  </button>
                  <div className="faq-answer-container">
                    <div className="faq-answer-content">
                      {renderAnswer(faq)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Footer showSlider={true} />
    </div>
  )
}
