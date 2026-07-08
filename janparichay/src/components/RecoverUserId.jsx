import React, { useState } from 'react'
import Input from './Input'
import PhoneInput from './PhoneInput'

const METHODS = ['Mobile No', 'Username', 'Email', 'Aadhaar', 'PAN', 'DL']

const LABEL_MAP = {
  'Username':  'Enter Username',
  'Mobile No': 'Enter Mobile No',
  'Email':     'Enter Email',
  'Aadhaar':   'Enter Aadhaar Number',
  'PAN':       'Enter PAN Number',
  'DL':        'Enter Driving Licence Number',
}

export default function RecoverUserId({ onBackToLogin }) {
  const [method, setMethod] = useState('Mobile No')
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNext = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div>
        <div className="recover-title">Recover your User Id</div>
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
          Your User Id has been sent via OTP / email. Please check and use it to sign in.
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
      <div className="recover-title">Recover your User Id</div>

      <form onSubmit={handleNext} noValidate>
        {/* Method selector */}
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

        {/* Dynamic input — Mobile No gets the full country-code picker */}
        {method === 'Mobile No' ? (
          <PhoneInput
            id="recover-mobile"
            label="Enter Mobile No"
            required
            value={value}
            onChange={e => setValue(e.target.value.replace(/\D/g, ''))}
          />
        ) : (
          <Input
            id="recover-value"
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
            className="btn-next-blue"
            disabled={!value.trim()}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}
