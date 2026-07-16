import React from 'react'
import {useNavigate} from 'react-router-dom'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import '../TermsConditions.css'
import { useLanguage } from '../context/LanguageContext'

export default function TermsConditions() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const bullets = [
    t('terms_bullet_1'),
    t('terms_bullet_2'),
    t('terms_bullet_3'),
    t('terms_bullet_4'),
    t('terms_bullet_5'),
    t('terms_bullet_6'),
    t('terms_bullet_7'),
    t('terms_bullet_8')
  ]

  return (
    <div className="tc-page">
      {/* TC Header */}
      <header className="tc-header">
        <div className="tc-header-logo-container">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" className="tc-header-logo" />
        </div>
      </header>

      {/* Scrollable Content Wrapper */}
      <div className="tc-content-wrapper">

        {/* Info Banner */}
        <div className="tc-banner-container">
          <div className="tc-banner">
            {t('terms_banner')}
          </div>
        </div>

        <div className="tc-body">
          {/* TERMS OF SERVICE */}
          <h1 className="tc-heading">{t('terms_title_terms_of_service')}</h1>

          <p className="tc-para">{t('terms_paragraph_1')}</p>
          <p className="tc-para">{t('terms_paragraph_2')}</p>
          <p className="tc-para">{t('terms_paragraph_3')}</p>

          {/* USER ACCOUNT */}
          <h1 className="tc-heading">{t('terms_title_user_account')}</h1>

          <p className="tc-para">{t('terms_paragraph_4')}</p>
          <p className="tc-para">{t('terms_paragraph_5')}</p>
          <p className="tc-para">{t('terms_paragraph_6')}</p>

          {/* Bullet box */}
          <div className="tc-bullet-box">
            {bullets.map((bullet, idx) => (
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
