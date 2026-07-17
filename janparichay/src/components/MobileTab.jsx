import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginSession } from '../hooks/useLoginSession'
import PhoneInput from './PhoneInput'
import PasswordInput from './PasswordInput'
import { useLanguage } from '../context/LanguageContext'

export default function MobileTab({ onForgotPassword, onForgetUserId }) {
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [passlessAuth, setPasslessAuth] = useState(false)
  const [consent, setConsent] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage()

  const { recordSession } = useLoginSession()

  const canSubmit = mobile.length >= 7 && consent && (passlessAuth || password)

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    await recordSession('Mobile')

    localStorage.setItem('mp_user', JSON.stringify({
      username: mobile,
      name: 'NAMAN RAJ',
      mobile,
    }))
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSignIn} noValidate>
      <PhoneInput
        id="mob-number"
        label={t('mobile_tab_enter_mobile_label')}
        required
        value={mobile}
        onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
      />

      {!passlessAuth && (
        <PasswordInput
          id="mob-password"
          label={t('mobile_tab_password_label')}
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
          {t('mobile_tab_forget_user_id')}
        </a>
        <a
          href="#"
          className="link-blue"
          onClick={e => { e.preventDefault(); onForgotPassword() }}
        >
          {t('mobile_tab_forgot_password')}
        </a>
      </div>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="passless-mob"
          checked={passlessAuth}
          onChange={e => {
            setPasslessAuth(e.target.checked)
            if (e.target.checked) setPassword('')
          }}
        />
        <label className="form-check-label" htmlFor="passless-mob" style={{ fontSize: '0.85rem' }}>
          {t('mobile_tab_passless_auth')}
        </label>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="consent-mobile"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="consent-mobile" style={{ fontSize: '0.85rem' }}>
          {t('mobile_tab_consent_text')}{' '}
          <a href="#" className="link-blue" style={{ fontSize: 'inherit' }}>{t('mobile_tab_terms_of_use_link')}</a>
        </label>
      </div>

      <button
        type="submit"
        className={`btn-mp-primary${canSubmit ? ' is-active' : ''}`}
      >
        {t('mobile_tab_sign_in_button')}
      </button>
    </form>
  )
}
