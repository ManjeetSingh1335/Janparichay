import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import meriPehchaanLogo from '../images/pehchaan_logo.webp'
import { useLoginSession } from '../hooks/useLoginSession'
import {
  clearPendingUser,
  getPendingUser,
  isBackupAuthenticationRequired,
  trustCurrentDevice,
} from '../utils/backupAuthentication'
import { useLanguage } from '../context/LanguageContext'
import logo11Years from '../images/11 Year Logo.png'
import backupAuthIcon from '../images/Backup-Auth.png'
import ThreeDot from '../components/ThreeDot'
import AccessibilityWidget from '../components/AccessibilityOptions/AccessibilityWidget'
import '../Authentication.css'

export default function Authentication() {
  const navigate = useNavigate()
  const {t} = useLanguage()
  const { recordSession } = useLoginSession()
  const [pendingUser] = useState(getPendingUser)
  const [selected, setSelected] = useState(false)
  const [step, setStep] = useState('choose')
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [trustDevice, setTrustDevice] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [kebabOpen, setKebabOpen] = useState(false)
  const kebabBtnRef = useRef(null)

  useEffect(() => {
    if (!pendingUser || !isBackupAuthenticationRequired(pendingUser.username)) {
      navigate('/login', { replace: true })
    }
  }, [navigate, pendingUser])

  const loginAsDifferentUser = () => {
    clearPendingUser()
    navigate('/login')
  }

  const handleSignIn = async event => {
    event.preventDefault()
    const enteredCode = code.trim()
    let backupCodes

    try {
      backupCodes = JSON.parse(localStorage.getItem('mp_backup_codes') || '[]')
    } catch {
      backupCodes = []
    }

    const codeIndex = backupCodes.findIndex(item => item.code === enteredCode && !item.used)
    if (codeIndex === -1) {
      setError(t('error_invalid_backup_code', 'Enter an unused backup code from your backup-code list.'))
      return
    }

    setSubmitting(true)
    backupCodes[codeIndex] = { ...backupCodes[codeIndex], used: true }
    localStorage.setItem('mp_backup_codes', JSON.stringify(backupCodes))
    if (trustDevice) trustCurrentDevice(pendingUser.username)
    await recordSession('Backup Code')
    localStorage.setItem('mp_user', JSON.stringify(pendingUser))
    clearPendingUser()
    navigate('/dashboard', { replace: true })
  }

  if (!pendingUser) return null

  return (
    <main className="authentication-page">

      <img src={logo11Years} alt="Digital India 11 Year Logo" className="top-left-logo" />

      <div className="authentication-language"><LanguageSwitcher /></div>
      <img className="authentication-logo" src={meriPehchaanLogo} alt="Meri Pehchaan Single Sign-On Service" />

      <section className="authentication-card" aria-labelledby="authentication-title">
        {step === 'choose' ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '2px' }}>
              <h1 id="authentication-title" style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#111', lineHeight: 1.4, textAlign: 'center', flex: 1 }}>
                {t('sign_in_via_text', 'Sign In to your account via')}{' '}
                <span style={{ color: '#1264ed' }}>{t('login_janparichay', 'JanParichay')}</span>
              </h1>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <button
                  ref={kebabBtnRef}
                  type="button"
                  className="kebab-btn"
                  onClick={() => setKebabOpen(v => !v)}
                  aria-label={t('login_kebab_aria_label', 'More options')}
                >
                  ⋮
                </button>
                <ThreeDot
                  open={kebabOpen}
                  onClose={() => setKebabOpen(false)}
                  triggerRef={kebabBtnRef}
                  menuStyle={{ right: 'auto', left: '100%', marginLeft: '6px', top: 0 }}
                />
              </div>
            </div>

            {/* Sub-title */}
            <p className="authentication-service">{t('twostep', 'Two Step Authentication')}</p>
            <div className="authentication-divider" />
            <p className="authentication-instruction">{t('select_one', 'Select the option and Click \'Next\'')}</p>

            {/* Option */}
            <button
              type="button"
              className={`authentication-option${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => setSelected(true)}
            >
              <img src={backupAuthIcon} alt="" className="authentication-option-icon" style={{ width: '16px', height: 'auto', objectFit: 'contain' }} />
              {t('backup_authentication', 'Backup Code Authentication')}
            </button>

            <button type="button" className="authentication-next" disabled={!selected} onClick={() => setStep('code')}>
              {t('next', 'Next')}
            </button>
            <button type="button" className="authentication-link" onClick={loginAsDifferentUser}>{t('login_as_different_user', 'Login as Different User')}</button>
          </>
        ) : (
          <>
            <div className="authentication-code-title">
              <button type="button" className="authentication-back" onClick={() => setStep('choose')} aria-label={t('back_to_auth_options_aria', 'Back to authentication options')}>&#171;</button>
              <h1 id="authentication-title">{t('sign_in_via_text', 'Sign In to your account via')} <span>{t('login_janparichay', 'JanParichay')}</span><br /><strong>{t('backup_authentication', 'Backup Code Authentication')}</strong></h1>
              <span className="authentication-menu" aria-hidden="true">&#8942;</span>
            </div>
            <form onSubmit={handleSignIn} noValidate>
              <label className="sr-only" htmlFor="backup-code">{t('placeholder_backup', 'Enter Backup code')}</label>
              <div className="authentication-code-input-wrap">
                <input
                  id="backup-code"
                  value={code}
                  onChange={event => { setCode(event.target.value.replace(/\s/g, '')); setError('') }}
                  type={showCode ? 'text' : 'password'}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder={t('placeholder_backup', 'Enter Backup code')}
                  autoFocus
                />
    
              </div>
              {error && <p className="authentication-error" role="alert">{error}</p>}
              <label className="authentication-checkbox">
                <input type="checkbox" checked={trustDevice} onChange={event => setTrustDevice(event.target.checked)} />
                <span>{t('dont_ask', "Don't ask me again on this Device")}</span>
              </label>
              <button type="submit" className="authentication-sign-in" disabled={!code || submitting}>
                {submitting ? t('signing_in', 'Signing In...') : t('signin', 'Sign In')}
              </button>
            </form>
            <button type="button" className="authentication-link" onClick={loginAsDifferentUser}>{t('login_as_different_user', 'Login as Different User')}</button>
          </>
        )}
      </section>
      <AccessibilityWidget />
    </main>
  )
}
