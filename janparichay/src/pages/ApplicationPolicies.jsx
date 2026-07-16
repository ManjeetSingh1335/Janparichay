import React from 'react'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import '../ApplicationPolicies.css'
import { useLanguage } from '../context/LanguageContext'

export default function ApplicationPolicies() {
  const { t } = useLanguage()

  const socialLoginBullets = [
    t('policies_social_login_bullet_1'),
    t('policies_social_login_bullet_2')
  ]

  const pwRequirementsBullets = [
    t('policies_pw_requirement_1'),
    t('policies_pw_requirement_2'),
    t('policies_pw_requirement_3'),
    t('policies_pw_requirement_4'),
    t('policies_pw_requirement_5'),
    t('policies_pw_requirement_6')
  ]

  const pwProtectionBullets = [
    t('policies_pw_protection_1'),
    t('policies_pw_protection_2'),
    t('policies_pw_protection_3'),
    t('policies_pw_protection_4'),
    t('policies_pw_protection_5'),
    t('policies_pw_protection_6'),
    t('policies_pw_protection_7'),
    t('policies_pw_protection_8'),
    t('policies_pw_protection_9'),
    t('policies_pw_protection_10'),
    t('policies_pw_protection_11'),
    t('policies_pw_protection_12'),
    t('policies_pw_protection_13')
  ]

  const dataProtectionBullets = [
    t('policies_data_protection_bullet_1'),
    t('policies_data_protection_bullet_2'),
    t('policies_data_protection_bullet_3'),
    t('policies_data_protection_bullet_4'),
    t('policies_data_protection_bullet_5'),
    t('policies_data_protection_bullet_6')
  ]

  const nestedBullets = [
    t('policies_nested_bullet_1'),
    t('policies_nested_bullet_2'),
    t('policies_nested_bullet_3')
  ]

  return (
    <div className="ap-page">
      {/* AP Header */}
      <header className="ap-header">
        <div className="ap-header-logo-container">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" className="ap-header-logo" />
        </div>
      </header>

      {/* Content Wrapper */}
      <div className="ap-content-wrapper">
        <div className="ap-body">

          {/* Copyright Policy */}
          <section className="ap-section">
            <h1 className="ap-heading">{t('policies_copyright_title')}</h1>
            <p className="ap-para">{t('policies_copyright_desc')}</p>
          </section>

          {/* Hyperlink Policy */}
          <section className="ap-section">
            <h1 className="ap-heading">{t('policies_hyperlink_title')}</h1>
            <h2 className="ap-subheading">{t('policies_ext_websites_title')}</h2>
            <p className="ap-para">{t('policies_ext_websites_desc')}</p>
            <h2 className="ap-subheading">{t('policies_int_websites_title')}</h2>
            <p className="ap-para">{t('policies_int_websites_desc')}</p>
          </section>

          {/* Social Login Policy */}
          <section className="ap-section">
            <h1 className="ap-heading">{t('policies_social_login_title')}</h1>
            <div className="ap-bullet-box">
              {socialLoginBullets.map((bullet, idx) => (
                <p key={idx}>
                  <span className="ap-bullet-star">✶</span> 
                  <span>{bullet}</span>
                </p>
              ))}
            </div>
          </section>

          {/* Password Policy */}
          <section className="ap-section">
            <h1 className="ap-heading">{t('policies_password_title')}</h1>

            <h2 className="ap-subheading">{t('policies_pw_overview_title')}</h2>
            <p className="ap-para">{t('policies_pw_overview_desc')}</p>

            <h2 className="ap-subheading">{t('policies_pw_scope_title')}</h2>
            <p className="ap-para">{t('policies_pw_scope_desc')}</p>

            <h2 className="ap-subheading">{t('policies_pw_requirements_title')}</h2>
            <div className="ap-bullet-box ap-small-bullets">
              {pwRequirementsBullets.map((bullet, idx) => (
                <p key={idx}>
                  <span className="ap-bullet-star">✶</span> 
                  <span>{bullet}</span>
                </p>
              ))}
            </div>

            <h2 className="ap-subheading">{t('policies_pw_protection_title')}</h2>
            <div className="ap-bullet-box ap-small-bullets">
              {pwProtectionBullets.map((bullet, idx) => (
                <p key={idx}>
                  <span className="ap-bullet-star">✶</span> 
                  <span>{bullet}</span>
                </p>
              ))}
            </div>
          </section>

          {/* Data Protection Policy (Draft) */}
          <section className="ap-section">
            <h1 className="ap-heading">{t('policies_data_protection_title')}</h1>
            <p className="ap-para">{t('policies_data_protection_desc')}</p>

            <div className="ap-bullet-box">
              {dataProtectionBullets.map((bullet, idx) => (
                <p key={idx}>
                  <span className="ap-bullet-star">✶</span> 
                  <span>{bullet}</span>
                </p>
              ))}
            </div>

            <p className="ap-para ap-nested-intro">{t('policies_nested_intro')}</p>
            <div className="ap-bullet-box ap-nested-bullets">
              {nestedBullets.map((bullet, idx) => (
                <p key={idx}>
                  <span className="ap-bullet-star">✓</span> 
                  <span>{bullet}</span>
                </p>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
