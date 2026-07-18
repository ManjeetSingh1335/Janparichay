import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginSession } from '../hooks/useLoginSession'
import Input from './Input'
import PasswordInput from './PasswordInput'
import { useLanguage } from '../context/LanguageContext'
import { isBackupAuthenticationRequired, savePendingUser } from '../utils/backupAuthentication'

export default function UsernameTab({ onForgotPassword, onForgetUserId }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passlessAuth, setPasslessAuth] = useState(false)
  const [consent, setConsent] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage()

  const { recordSession } = useLoginSession()

  const canSubmit = username && consent && (passlessAuth || password)

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    const user = {
      username,
      name: username.split('@')[0].split('.').join(' ').toUpperCase(),
      mobile: '9955634664',
    }
    if (isBackupAuthenticationRequired(user.username)) {
      savePendingUser(user)
      navigate('/authentication')
      return
    }
    await recordSession('UserId')
    localStorage.setItem('mp_user', JSON.stringify(user))
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSignIn} noValidate>
      <Input
        id="un-username"
        label={t('username_tab_enter_username_label')}
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder={t('username_tab_username_placeholder')}
      />

      {!passlessAuth && (
        <PasswordInput
          id="un-password"
          label={t('username_tab_password_label')}
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      )}

      <div className="d-flex justify-content-between mb-3" style={{ marginTop: -6 }}>
        <a
          href="#"
          className="link-blue"
          onClick={e => { e.preventDefault(); onForgetUserId() }}
        >
          {t('username_tab_forget_user_id')}
        </a>
        <a
          href="#"
          className="link-blue"
          onClick={e => { e.preventDefault(); onForgotPassword() }}
        >
          {t('username_tab_forgot_password')}
        </a>
      </div>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="passless"
          checked={passlessAuth}
          onChange={e => {
            setPasslessAuth(e.target.checked)
            if (e.target.checked) setPassword('')
          }}
        />
        <label className="form-check-label" htmlFor="passless" style={{ fontSize: '0.85rem' }}>
          {t('username_tab_passless_auth')}
        </label>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="consent-username"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="consent-username" style={{ fontSize: '0.85rem' }}>
          {t('username_tab_consent_text')}{' '}
          <a href="#" className="link-blue" style={{ fontSize: 'inherit' }}>{t('username_tab_terms_of_use_link')}</a>
        </label>
      </div>

      <button
        type="submit"
        className={`btn-mp-primary${canSubmit ? ' is-active' : ''}`}
      >
        {t('username_tab_sign_in_button')}
      </button>
    </form>
  )
}
