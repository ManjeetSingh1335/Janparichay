import React, { useState } from 'react'
import Input from './Input'
import PhoneInput from './PhoneInput'

const METHODS = ['Username', 'Mobile No', 'Email', 'Aadhaar', 'PAN', 'DL']

const LABEL_MAP = {
  'Username':  'Enter Username',
  'Mobile No': 'Enter Mobile No',
  'Email':     'Enter Email',
  'Aadhaar':   'Enter Aadhaar Number',
  'PAN':       'Enter PAN Number',
  'DL':        'Enter Driving Licence Number',
}

export default function ForgotPassword({ onBackToLogin }) {
  const [method, setMethod] = useState('Username')
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div>
        <div className="recover-title">Reset your Password</div>
        <div
          style={{
            background: '#e6f4ea',
            border: '1px solid #b7dfbe',
            borderRadius: 6,
            padding: '14px 16px',
            fontSize: '0.88rem',
            color: '#1e7e34',
            marginBottom: 16,
          }}
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          A password reset link / OTP has been sent. Please check and follow the
          instructions to reset your password.
        </div>
        <button
          type="button"
          className="link-blue"
          style={{ background: 'none', border: 'none', fontWeight: 600 }}
          onClick={onBackToLogin}
        >
          ← Back to Login
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="recover-title">Reset your Password</div>

      <form onSubmit={handleSubmit} noValidate>
         
        <div className="mb-3">
          <select
            className="mp-select-plain"
            value={method}
            onChange={e => { setMethod(e.target.value); setValue('') }}
          >
            {METHODS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

       
        {method === 'Mobile No' ? (
          <PhoneInput
            id="reset-mobile"
            label="Enter Mobile No"
            required
            value={value}
            onChange={e => setValue(e.target.value.replace(/\D/g, ''))}
          />
        ) : (
          <Input
            id="reset-value"
            label={LABEL_MAP[method]}
            required
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={LABEL_MAP[method]}
          />
        )}

        <div className="recover-actions">
          <button
            type="button"
            className="link-blue"
            style={{ background: 'none', border: 'none', fontWeight: 600 }}
            onClick={onBackToLogin}
          >
            Login
          </button>
          <button
            type="submit"
            className="btn-submit-green"
            disabled={!value.trim()}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
