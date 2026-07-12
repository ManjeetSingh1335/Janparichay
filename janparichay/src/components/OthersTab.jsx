import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginSession } from '../hooks/useLoginSession'
import Input from './Input'
import PasswordInput from './PasswordInput'

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

  const { recordSession } = useLoginSession()

  const needsPassword = !NO_PASSWORD_METHODS.includes(method) && !passlessAuth
  const canSubmit = identifier && consent && (!needsPassword || password)

  const handleSignIn = (e) => {
    e.preventDefault()
    if (!canSubmit) return

    recordSession(method)

    localStorage.setItem('mp_user', JSON.stringify({
      username: identifier,
      name: identifier.split('@')[0].toUpperCase(),
      mobile: '9955634664',
    }))
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
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <Input
        id="others-id"
        label={LABEL_MAP[method]}
        required
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        type={method === 'Email' || method === 'Govt Email Id' ? 'email' : 'text'}
        placeholder={LABEL_MAP[method]}
      />

      {needsPassword && (
        <PasswordInput
          id="others-password"
          label="Password"
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
            Forget User Id
          </a>
          <a
            href="#"
            className="link-blue"
            onClick={e => { e.preventDefault(); onForgotPassword() }}
          >
            Forgot Password
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
            Password Less Authentication
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
          I consent to MeriPehchaan{' '}
          <a href="#" className="link-blue" style={{ fontSize: 'inherit' }}>terms of use.</a>
        </label>
      </div>

      <button
        type="submit"
        className={`btn-mp-primary${canSubmit ? ' is-active' : ''}`}
      >
        Sign In
      </button>
    </form>
  )
}
