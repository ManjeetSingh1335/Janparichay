import React, {useState, useEffect, useRef} from 'react'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import Footer from '../components/layout/Footer'
import {usePageLanguage} from '../hooks/usePageLanguage'
import '../FAQ.css'

export default function FAQ() {

  const {t, pageLangCode, setPageLangCode}=usePageLanguage()
  const [langDropdownOpen, setLangDropdownOpen]=useState(false)
  const [activeIndex, setActiveIndex]=useState(null) 
  const langRef = useRef(null)

  const languages=[
    {code: 'en', label: 'English'},
    {code: 'ml', label: 'മലയാളം'},
    {code: 'hi', label: 'हिन्दी'},
    {code: 'te', label: 'తెలుగు'},
    {code: 'mr', label: 'मराठी'},
    {code: 'ta', label: 'தமிழ்'},
    {code: 'or', label: 'ଓଡ଼ିଆ'}
  ]

  useEffect(()=>{
    function handleClickOutside(e){
      if(langRef.current && !langRef.current.contains(e.target)){
        setLangDropdownOpen(false);
      }
    }
    if(langDropdownOpen){
      document.addEventListener('mousedown', handleClickOutside);
    }
    return()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [langDropdownOpen])

  const toggleAccordion=(index)=>{
    setActiveIndex(activeIndex===index? null : index)
  }

  const text={
    title: t('faq_page_title'),
    faqs: [
      {q: t('faq_q1'), a: t('faq_a1')},
      {q: t('faq_q2'), a: t('faq_a2')},
      {q: t('faq_q3'), a: t('faq_a3')},
      {q: t('faq_q4'), a: t('faq_a4')},
      {q: t('faq_q5'), a: t('faq_a5')},
      {q: t('faq_q6'), a: t('faq_a6')},
      {q: t('faq_q7'), a: t('faq_a7')},
      {q: t('faq_q8'), a: t('faq_a8')},
      {q: t('faq_q9'), a: t('faq_a9')},
      {q: t('faq_q10'), a: t('faq_a10')},
      {q: t('faq_q11'), a: t('faq_a11')},
      {q: t('faq_q12'), a: [t('faq_a12_item_1'), t('faq_a12_item_2')]},
      {q: t('faq_q13'), a: [t('faq_a13_item_1'), t('faq_a13_item_2')]},
      {q: t('faq_q14'), a: t('faq_a14')},
      {q: t('faq_q15'), a: [t('faq_a15_item_1'), t('faq_a15_item_2'), t('faq_a15_item_3'), t('faq_a15_item_4')]},
      {q: t('faq_q16'), a: [t('faq_a16_item_1'), t('faq_a16_item_2')]},
      {q: t('faq_q17'), a: [t('faq_a17_item_1'), t('faq_a17_item_2')]},
      {q: t('faq_q18'), a: [t('faq_a18_item_1'), t('faq_a18_item_2'), t('faq_a18_item_3'), t('faq_a18_item_4')]},
      {q: t('faq_q19'), a: [t('faq_a19_item_1'), t('faq_a19_item_2'), t('faq_a19_item_3')]},
      {q: t('faq_q20'), intro: t('faq_a20_intro'), a: [t('faq_a20_item_1'), t('faq_a20_item_2')]},
      {q: t('faq_q21'), a: [t('faq_a21_item_1'), t('faq_a21_item_2')]},
      {q: t('faq_q22'), a: t('faq_a22')},
      {q: t('faq_q23'), a: t('faq_a23')},
    ]
  }

  const renderAnswer=(faq)=>{
    if(faq.intro){
      return(
        <div>
          <p style={{margin: '0 0 12px 0'}}>{faq.intro}</p>
          <ul style={{paddingLeft: '20px', margin: 0, listStyleType: 'disc'}}>
            {faq.a.map((item, idx)=>(
              <li key={idx} style={{marginBottom: '8px'}}>{item}</li>
            ))}
          </ul>
        </div>
      )
    }
    if(Array.isArray(faq.a)){
      return(
        <ul style={{paddingLeft: '20px', margin: 0, listStyleType: 'disc'}}>
          {faq.a.map((item, idx)=>(
            <li key={idx} style={{marginBottom: '8px'}}>{item}</li>
          ))}
        </ul>
      )
    }
    return <p style={{margin: 0}}>{faq.a}</p>
  }

  return (
    <div className="faq-page">

      <header className="faq-header">
        <div className="faq-header-logo-container">
          <img src={meriPehchaanLogo} alt={t('navbar_logo_alt')} className="faq-header-logo" />
        </div>
        <div className="faq-header-lang" ref={langRef}>
          <div 
            className="faq-lang-trigger" 
            onClick={()=>setLangDropdownOpen(prev=>!prev)}
          >
            <span>{languages.find(lang=>lang.code===pageLangCode)?.label || 'English'}</span>
            <i className="bi bi-chevron-down faq-lang-chevron"></i>
          </div>
          {langDropdownOpen && (
            <ul className="faq-lang-menu">
              {languages.map(lang=>(
                <li 
                  key={lang.code} 
                  className={`faq-lang-item ${pageLangCode===lang.code? 'active' : ''}`}
                  onClick={()=>{
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

      <div className="faq-content-wrapper">
        <div className="faq-body">
          <h1 className="faq-title">{text.title}</h1>
          
          <div className="faq-list">
            {text.faqs.map((faq, index)=>{
              const isOpen=activeIndex===index
              return (
                <div key={index} className={`faq-item ${isOpen? 'active' : ''}`}>
                  <button 
                    className="faq-question-btn" 
                    onClick={()=>toggleAccordion(index)}
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
