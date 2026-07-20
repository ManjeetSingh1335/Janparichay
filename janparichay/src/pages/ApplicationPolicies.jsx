import React, {useState, useEffect, useRef} from 'react'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import {usePageLanguage} from '../hooks/usePageLanguage'
import '../ApplicationPolicies.css'

export default function ApplicationPolicies() {

  const {t, pageLangCode, setPageLangCode}=usePageLanguage()
  const [langDropdownOpen, setLangDropdownOpen]=useState(false)
  const langRef=useRef(null)

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
        setLangDropdownOpen(false)
      }
    }
    if(langDropdownOpen){
      document.addEventListener('mousedown', handleClickOutside)
    }
    return()=>{
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [langDropdownOpen])

  const text={
    copyrightTitle: t('policies_copyright_title'),
    copyrightDesc: t('policies_copyright_desc'),
    hyperlinkTitle: t('policies_hyperlink_title'),
    extWebsitesTitle: t('policies_ext_websites_title'),
    extWebsitesDesc: t('policies_ext_websites_desc'),
    intWebsitesTitle: t('policies_int_websites_title'),
    intWebsitesDesc: t('policies_int_websites_desc'),
    socialLoginTitle: t('policies_social_login_title'),
    socialLoginBullets: [t('policies_social_login_bullet_1'), t('policies_social_login_bullet_2')],
    passwordTitle: t('policies_password_title'),
    pwOverviewTitle: t('policies_pw_overview_title'),
    pwOverviewDesc: t('policies_pw_overview_desc'),
    pwScopeTitle: t('policies_pw_scope_title'),
    pwScopeDesc: t('policies_pw_scope_desc'),
    pwRequirementsTitle: t('policies_pw_requirements_title'),
    pwRequirementsBullets: Array.from({ length: 6 }, (_, index) => t(`policies_pw_requirement_${index + 1}`)),
    pwProtectionTitle: t('policies_pw_protection_title'),
    pwProtectionBullets: Array.from({ length: 13 }, (_, index) => t(`policies_pw_protection_${index + 1}`)),
    dataProtectionTitle: t('policies_data_protection_title'),
    dataProtectionDesc: t('policies_data_protection_desc'),
    dataProtectionBullets: Array.from({ length: 6 }, (_, index) => t(`policies_data_protection_bullet_${index + 1}`)),
    nestedIntro: t('policies_nested_intro'),
    nestedBullets: Array.from({ length: 3 }, (_, index) => t(`policies_nested_bullet_${index + 1}`))
  }

  return (

    <div className="ap-page">

      <header className="ap-header">
        <div className="ap-header-logo-container">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" className="ap-header-logo" />
        </div>
        <div className="ap-header-lang" ref={langRef}>
          <div 
            className="ap-lang-trigger" 
            onClick={()=>setLangDropdownOpen(prev=>!prev)}
          >
            <span>{languages.find(lang=>lang.code===pageLangCode)?.label || 'English'}</span>
            <i className="bi bi-chevron-down ap-lang-chevron"></i>
          </div>
          {langDropdownOpen && (
            <ul className="ap-lang-menu">
              {languages.map(lang=>(
                <li 
                  key={lang.code} 
                  className={`ap-lang-item ${pageLangCode===lang.code? 'active' : ''}`}
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
      
      <div className="ap-content-wrapper">

        <div className="ap-body">
          
          
          <h1 className="ap-heading">{text.copyrightTitle}</h1>
          <p className="ap-para">{text.copyrightDesc}</p>

             
          <div className="ap-card-box">
            <h1 className="ap-heading">{text.hyperlinkTitle}</h1>
            <h2 className="ap-subheading">{text.extWebsitesTitle}</h2>
            <p className="ap-para">{text.extWebsitesDesc}</p>
            
            <h2 className="ap-subheading">{text.intWebsitesTitle}</h2>
            <p className="ap-para">{text.intWebsitesDesc}</p>
          </div>

      
          <h1 className="ap-heading">{text.socialLoginTitle}</h1>
          <ul className="ap-list">
            {text.socialLoginBullets.map((bullet, idx)=>(
              <li key={idx} className="ap-list-item">{bullet}</li>
            ))}
          </ul>

  
          <h1 className="ap-heading">{text.passwordTitle}</h1>
          
          <h2 className="ap-subheading">{text.pwOverviewTitle}</h2>
          <p className="ap-para">{text.pwOverviewDesc}</p>

          <h2 className="ap-subheading">{text.pwScopeTitle}</h2>
          <p className="ap-para">{text.pwScopeDesc}</p>

          <h2 className="ap-subheading">{text.pwRequirementsTitle}</h2>
          <ul className="ap-list">
            {text.pwRequirementsBullets.map((bullet, idx)=>(
              <li key={idx} className="ap-list-item">{bullet}</li>
            ))}
          </ul>

          <h2 className="ap-subheading">{text.pwProtectionTitle}</h2>
          <ul className="ap-list">
            {text.pwProtectionBullets.map((bullet, idx)=>(
              <li key={idx} className="ap-list-item">{bullet}</li>
            ))}
          </ul>

          
          <h1 className="ap-heading">{text.dataProtectionTitle}</h1>
          <p className="ap-para">{text.dataProtectionDesc}</p>
          <ul className="ap-list">
            {text.dataProtectionBullets.map((bullet, idx)=>(
              <li key={idx} className="ap-list-item">{bullet}</li>
            ))}
            <li className="ap-list-item">
              {text.nestedIntro}
              <ul className="ap-nested-list">
                {text.nestedBullets.map((bullet, idx)=>(
                  <li key={idx} className="ap-nested-list-item">{bullet}</li>
                ))}
              </ul>
            </li>
          </ul>

        </div>

      </div>

    </div>

  )
}