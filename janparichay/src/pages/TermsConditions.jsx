import React, {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import {usePageLanguage} from '../hooks/usePageLanguage'
import '../TermsConditions.css'

export default function TermsConditions() {

  const navigate=useNavigate();
  const {t, pageLangCode, setPageLangCode}=usePageLanguage();
  const [langDropdownOpen, setLangDropdownOpen]=useState(false);
  const langRef=useRef(null);

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

  const text={
    banner: t('terms_banner'),
    title1: t('terms_title_terms_of_service'),
    p1: t('terms_paragraph_1'),
    p2: t('terms_paragraph_2'),
    p3: t('terms_paragraph_3'),
    title2: t('terms_title_user_account'),
    p4: t('terms_paragraph_4'),
    p5: t('terms_paragraph_5'),
    p6: t('terms_paragraph_6'),
    bullets: Array.from({length: 8}, (_, index)=>t(`terms_bullet_${index+1}`))
  }

  return (
    <div className="tc-page">

      <header className="tc-header">
        <div className="tc-header-logo-container">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" className="tc-header-logo" />
        </div>
        <div className="tc-header-lang" ref={langRef}>
          <div 
            className="tc-lang-trigger" 
            onClick={()=>setLangDropdownOpen(prev=>!prev)}
          >
            <span>{languages.find(lang=>lang.code===pageLangCode)?.label || 'English'}</span>
            <i className="bi bi-chevron-down tc-lang-chevron"></i>
          </div>
          {langDropdownOpen && (
            <ul className="tc-lang-menu">
              {languages.map(lang=>(
                <li 
                  key={lang.code} 
                  className={`tc-lang-item ${pageLangCode===lang.code? 'active' : ''}`}
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

      <div className="tc-content-wrapper">

        <div className="tc-banner-container">
          <div className="tc-banner">
            {text.banner}
          </div>
        </div>

        <div className="tc-body">
          <h1 className="tc-heading">{text.title1}</h1>

          <p className="tc-para">{text.p1}</p>
          <p className="tc-para">{text.p2}</p>
          {text.p3 && <p className="tc-para">{text.p3}</p>}

          <h1 className="tc-heading">{text.title2}</h1>

          <p className="tc-para">{text.p4}</p>
          <p className="tc-para">{text.p5}</p>
          {text.p6 && <p className="tc-para">{text.p6}</p>}

          <div className="tc-bullet-box">
            {text.bullets.map((bullet, idx)=>(
              <p key={idx}>
                <span className="tc-bullet-star">✶</span> 
                <span>{bullet}</span>
              </p>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}