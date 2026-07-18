import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginSession } from '../hooks/useLoginSession'
import Input from './Input'
import PasswordInput from './PasswordInput'
import { useLanguage } from '../context/LanguageContext'
import { isBackupAuthenticationRequired, savePendingUser } from '../utils/backupAuthentication'

const LOGIN_METHODS = ['Email', 'Govt Email Id', 'Aadhaar', 'Service Id', 'PAN', 'DL']

const LABEL_MAP = {
  'Email':         'Enter Email',
  'Govt Email Id': 'Enter Govt Email Id',
  'Aadhaar':       'Enter Aadhaar',
  'Service Id':    'Enter Service Id',
  'PAN':           'Enter PAN Number',
  'DL':            'Enter DL Number',
}

const NO_PASSWORD_METHODS = ['Aadhaar']

export default function OthersTab({ onForgotPassword, onForgetUserId }) {
  const [method, setMethod] = useState('Email')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [passlessAuth, setPasslessAuth] = useState(false)
  const [consent, setConsent] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage()

  const { recordSession } = useLoginSession()

  const needsPassword = !NO_PASSWORD_METHODS.includes(method) && !passlessAuth
  const canSubmit = identifier && consent && (!needsPassword || password)

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    const user = {
      username: identifier,
      name: identifier.split('@')[0].toUpperCase(),
      mobile: '9955634664',
    }
    if (isBackupAuthenticationRequired(user.username)) {
      savePendingUser(user)
      navigate('/authentication')
      return
    }
    await recordSession(method)
    localStorage.setItem('mp_user', JSON.stringify(user))
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSignIn} noValidate>
      <div className="mb-3">
        <select
          className="mp-select-plain"
          value={method}
          onChange={e => { setMethod(e.target.value); setIdentifier(''); setPassword('') }}
        >
          {LOGIN_METHODS.map(m => (
            <option key={m} value={m}>{t(`others_tab_method_${m === 'Govt Email Id' ? 'govt_email' : m === 'Service Id' ? 'service_id' : m.toLowerCase()}`)}</option>
          ))}
        </select>
      </div>

      <Input
        id="others-id"
        label={t(`others_tab_label_${method === 'Govt Email Id' ? 'govt_email' : method === 'Service Id' ? 'service_id' : method.toLowerCase()}`)}
        required
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        type={method === 'Email' || method === 'Govt Email Id' ? 'email' : 'text'}
        placeholder={t(`others_tab_label_${method === 'Govt Email Id' ? 'govt_email' : method === 'Service Id' ? 'service_id' : method.toLowerCase()}`)}
      />

      {needsPassword && (
        <PasswordInput
          id="others-password"
          label={t('others_tab_password_label')}
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      )}

      {!NO_PASSWORD_METHODS.includes(method) && (
        <div className="d-flex justify-content-between mb-3" style={{ marginTop: -6 }}>
          <a
            href="#"
            className="link-blue"
            onClick={e => { e.preventDefault(); onForgetUserId() }}
          >
            {t('others_tab_forget_user_id')}
          </a>
          <a
            href="#"
            className="link-blue"
            onClick={e => { e.preventDefault(); onForgotPassword() }}
          >
            {t('others_tab_forgot_password')}
          </a>
        </div>
      )}

      {!NO_PASSWORD_METHODS.includes(method) && (
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="passless-others"
            checked={passlessAuth}
            onChange={e => {
              setPasslessAuth(e.target.checked)
              if (e.target.checked) setPassword('')
            }}
          />
          <label className="form-check-label" htmlFor="passless-others" style={{ fontSize: '0.85rem' }}>
            {t('others_tab_passless_auth')}
          </label>
        </div>
      )}

      <div className={`form-check ${NO_PASSWORD_METHODS.includes(method) ? 'mt-1' : ''} mb-3`}>
        <input
          className="form-check-input"
          type="checkbox"
          id="consent-others"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="consent-others" style={{ fontSize: '0.85rem' }}>
          {t('others_tab_consent_text')}{' '}
          <a href="#" className="link-blue" style={{ fontSize: 'inherit' }}>{t('others_tab_terms_of_use_link')}</a>
        </label>
      </div>

      <button
        type="submit"
        className={`btn-mp-primary${canSubmit ? ' is-active' : ''}`}
      >
        {t('others_tab_sign_in_button')}
      </button>
    </form>
  )
}
