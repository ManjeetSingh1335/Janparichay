import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import { useLoginSession } from '../hooks/useLoginSession'
import {
  clearPendingUser,
  getPendingUser,
  isBackupAuthenticationRequired,
  trustCurrentDevice,
} from '../utils/backupAuthentication'
import '../Authentication.css'

export default function Authentication() {
  const navigate = useNavigate()
  const { recordSession } = useLoginSession()
  const [pendingUser] = useState(getPendingUser)
  const [selected, setSelected] = useState(false)
  const [step, setStep] = useState('choose')
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [trustDevice, setTrustDevice] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
      setError('Enter an unused backup code from your backup-code list.')
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
      <div className="authentication-language"><LanguageSwitcher /></div>
      <img className="authentication-logo" src={meriPehchaanLogo} alt="Meri Pehchaan Single Sign-On Service" />

      <section className="authentication-card" aria-labelledby="authentication-title">
        {step === 'choose' ? (
          <>
            <h1 id="authentication-title">Sign In to your account via</h1>
            <p className="authentication-service">JanParichay<br />Two Step Authentication</p>
            <div className="authentication-divider" />
            <p className="authentication-instruction">Select one of the options and Click 'Next'</p>
            <button
              type="button"
              className={`authentication-option${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => setSelected(true)}
            >
              <span className="authentication-option-icon" aria-hidden="true">&#128274;</span>
              Backup Code Authentication
            </button>
            <button type="button" className="authentication-next" disabled={!selected} onClick={() => setStep('code')}>
              Next
            </button>
            <button type="button" className="authentication-link" onClick={loginAsDifferentUser}>Login as Different User</button>
          </>
        ) : (
          <>
            <div className="authentication-code-title">
              <button type="button" className="authentication-back" onClick={() => setStep('choose')} aria-label="Back to authentication options">&#171;</button>
              <h1 id="authentication-title">Sign In to your account via <span>JanParichay</span><br /><strong>Backup Code Authentication</strong></h1>
              <span className="authentication-menu" aria-hidden="true">&#8942;</span>
            </div>
            <form onSubmit={handleSignIn} noValidate>
              <label className="sr-only" htmlFor="backup-code">Enter Backup code</label>
              <div className="authentication-code-input-wrap">
                <input
                  id="backup-code"
                  value={code}
                  onChange={event => { setCode(event.target.value.replace(/\s/g, '')); setError('') }}
                  type={showCode ? 'text' : 'password'}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="Enter Backup code"
                  autoFocus
                />
                <button type="button" onClick={() => setShowCode(value => !value)} aria-label={showCode ? 'Hide backup code' : 'Show backup code'}>
                  {showCode ? '◉' : '◈'}
                </button>
              </div>
              {error && <p className="authentication-error" role="alert">{error}</p>}
              <label className="authentication-checkbox">
                <input type="checkbox" checked={trustDevice} onChange={event => setTrustDevice(event.target.checked)} />
                <span>Don't ask me again on this<br />Device</span>
              </label>
              <button type="submit" className="authentication-sign-in" disabled={!code || submitting}>
                {submitting ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <button type="button" className="authentication-link" onClick={loginAsDifferentUser}>Login as Different User</button>
          </>
        )}
      </section>
      <p className="authentication-help" aria-hidden="true">&#9855;</p>
    </main>
  )
}
