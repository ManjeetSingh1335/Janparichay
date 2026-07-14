import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginSession } from '../hooks/useLoginSession'
import Input from './Input'
import PasswordInput from './PasswordInput'

export default function UsernameTab({ onForgotPassword, onForgetUserId }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passlessAuth, setPasslessAuth] = useState(false)
  const [consent, setConsent] = useState(false)
  const navigate = useNavigate()

  const { recordSession } = useLoginSession()

  const canSubmit = username && consent && (passlessAuth || password)

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    await recordSession('UserId')

    localStorage.setItem('mp_user', JSON.stringify({
      username,
      name: username.split('@')[0].split('.').join(' ').toUpperCase(),
      mobile: '9955634664',
    }))
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSignIn} noValidate>
      <Input
        id="un-username"
        label="Enter Username"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />

      {!passlessAuth && (
        <PasswordInput
          id="un-password"
          label="Password"
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
          Password Less Authentication
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
