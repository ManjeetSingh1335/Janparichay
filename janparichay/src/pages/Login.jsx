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

const TABS = ['Username', 'Mobile', 'Others']

export default function Login() {
  const [activeTab, setActiveTab] = useState('Username')
  const [view, setView] = useState('login')
  const [kebabOpen, setKebabOpen] = useState(false)

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
            Sign In to your account via <span className="jp-link">JanParichay</span>
          </h2>
          <button
            type="button"
            className="kebab-btn"
            onClick={() => setKebabOpen(v => !v)}
            aria-label="More options"
          >
            ⋮
          </button>
          <ThreeDot open={kebabOpen} onClose={() => setKebabOpen(false)} />
        </div>

        {view === 'login' && (
          <>
            {/* Tab navigation — pure state, NO route change */}
            <div className="login-tabs-row">
              {TABS.map(tab => (
                <button
                  type="button"
                  key={tab}
                  className={`login-tab-btn${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Active tab content swaps here */}
            {renderTab()}

            {/* SSO + Social */}
            <SSOSection />

            {/* Sign up link */}
            <p className="text-center mt-3 mb-0" style={{ fontSize: '0.86rem' }}>
              New user?{' '}
              <Link to="/signup" className="link-blue" style={{ fontWeight: 600 }}>
                Sign up for MeriPehchaan
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
