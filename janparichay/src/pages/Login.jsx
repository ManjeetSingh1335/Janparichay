import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderLogo from '../components/HeaderLogo'
import ThreeDot from '../components/ThreeDot'
import UsernameTab from '../components/UsernameTab'
import MobileTab from '../components/MobileTab'
import OthersTab from '../components/OthersTab'
import SSOSection from '../components/SSOSection'
import ForgotPassword from '../components/ForgotPassword'
import RecoverUserId from '../components/RecoverUserId'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'

export default function Login() {
  const [activeTab, setActiveTab] = useState('Username')
  const [view, setView] = useState('login')
  const [kebabOpen, setKebabOpen] = useState(false)
  const { t } = useLanguage()

  const tabs = [
    { id: 'Username', label: t('login_tab_username') },
    { id: 'Mobile', label: t('login_tab_mobile') },
    { id: 'Others', label: t('login_tab_others') }
  ]

  const renderTab = () => {
    const props = {
      onForgotPassword: () => setView('forgot-password'),
      onForgetUserId: () => setView('recover-userid'),
    }
    switch (activeTab) {
      case 'Username': return <UsernameTab {...props} />
      case 'Mobile':   return <MobileTab {...props} />
      case 'Others':   return <OthersTab {...props} />
      default:         return <UsernameTab {...props} />
    }
  }

  return (
    <div className="auth-page" style={{ position: 'relative' }}>
      {/* Language Switcher — top-right */}
      <div style={{ position: 'absolute', top: '14px', right: '18px', zIndex: 100 }}>
        <LanguageSwitcher />
      </div>

      <HeaderLogo />

      <div className="auth-card">
        {/* Header row: title + kebab menu */}
        <div className="auth-card-header">
          <h2>
            {t('login_sign_in_via')} <span className="jp-link">{t('login_janparichay')}</span>
          </h2>
          <button
            type="button"
            className="kebab-btn"
            onClick={() => setKebabOpen(v => !v)}
            aria-label={t('login_kebab_aria_label')}
          >
            ⋮
          </button>
          <ThreeDot open={kebabOpen} onClose={() => setKebabOpen(false)} />
        </div>

        {view === 'login' && (
          <>
            {/* Tab navigation — pure state, NO route change */}
            <div className="login-tabs-row">
              {tabs.map(tab => (
                <button
                  type="button"
                  key={tab.id}
                  className={`login-tab-btn${activeTab === tab.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active tab content swaps here */}
            {renderTab()}

            {/* SSO + Social */}
            <SSOSection />

            {/* Sign up link */}
            <p className="text-center mt-3 mb-0" style={{ fontSize: '0.86rem' }}>
              {t('login_new_user')}{' '}
              <Link to="/signup" className="link-blue" style={{ fontWeight: 600 }}>
                {t('login_signup_link')}
              </Link>
            </p>
          </>
        )}

        {/* Reset Password view replaces card content — still same /login route */}
        {view === 'forgot-password' && (
          <ForgotPassword onBackToLogin={() => setView('login')} />
        )}

        {/* Recover User Id view — still same /login route */}
        {view === 'recover-userid' && (
          <RecoverUserId onBackToLogin={() => setView('login')} />
        )}
      </div>
    </div>
  )
}
