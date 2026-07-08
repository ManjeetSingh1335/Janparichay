 import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderLogo from '../components/HeaderLogo'
import Input from '../components/Input'
import PasswordInput from '../components/PasswordInput'
import PhoneInput from '../components/PhoneInput'
import DateInput from '../components/DateInput'
import TermsModal from '../components/TermsModal'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    mobile: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    suggestedId: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState({})
  const [termsModalOpen, setTermsModalOpen] = useState(false)

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.mobile || form.mobile.length < 7) e.mobile = 'Enter a valid mobile number'
    if (!otpSent) e.otp = 'Please generate and verify OTP first'
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.dob) e.dob = 'Date of birth is required'
    if (!form.gender) e.gender = 'Please select gender'
    if (!form.suggestedId.trim()) e.suggestedId = 'User ID is required'
    if (!form.password || form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.terms) e.terms = 'You must accept Terms and Conditions'
    return e
  }

  const handleOTP = () => {
    if (form.mobile.length >= 7) {
      setOtpSent(true)
      alert('OTP sent to ' + form.mobile + '\n(Demo: use 123456)')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    localStorage.setItem('mp_user', JSON.stringify({
      username: form.suggestedId + '@janparichay.gov.in',
      name: form.firstName + ' ' + form.lastName,
    }))
    alert('Account created successfully! Redirecting to dashboard...')
    navigate('/dashboard')
  }

  // Clicking the (unchecked) terms checkbox/label opens the modal instead of
  // immediately toggling — user must explicitly Agree inside the modal.
  const handleTermsCheckboxClick = (e) => {
    e.preventDefault()
    if (!form.terms) {
      setTermsModalOpen(true)
    } else {
      // allow unchecking directly
      update('terms', false)
    }
  }

  const handleAgree = () => {
    update('terms', true)
    setTermsModalOpen(false)
  }

  const handleDeny = () => {
    update('terms', false)
    setTermsModalOpen(false)
  }

  return (
    <div className="auth-page">
      <HeaderLogo />

      <div className="auth-card" style={{ maxWidth: 520}}>
        <h2 style={{marginBottom:'20px' }}>
          Sign up for <span className="jp-link">JanParichay</span>
        </h2>

        <form onSubmit={handleSubmit} noValidate>

          {/* ── Mobile No with country picker + Generate OTP ── */}
          <PhoneInput
            id="signup-mobile"
            label="Mobile No"
            required
            value={form.mobile}
            onChange={e => update('mobile', e.target.value.replace(/\D/g, ''))}
            infoTooltip="We'll send a verification code to this number"
            rightAddon={
              <button
                type="button"
                className="btn-otp"
                onClick={handleOTP}
                disabled={form.mobile.length < 7}
              >
                Generate OTP
              </button>
            }
          />
          {errors.mobile && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.mobile}</div>}

          {/* OTP field shown after Generate OTP */}
          {otpSent && (
            <div style={{ marginBottom: 4 }}>
              <Input
                id="signup-otp"
                label="Enter OTP"
                required
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="6-digit OTP"
                maxLength={6}
              />
              <div style={{ fontSize: '0.78rem', color: '#1a73e8', marginTop: -12, marginBottom: 16 }}>
                Didn&apos;t receive? <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleOTP}>Resend OTP</span>
              </div>
            </div>
          )}

          {/* ── First Name ── */}
          <Input
            id="firstName"
            label="First Name"
            required
            value={form.firstName}
            onChange={e => update('firstName', e.target.value)}
            placeholder="First Name"
            rightAddon={<i className="bi bi-info-circle" title="As per official ID proof" style={{ fontSize: '0.9rem', cursor: 'help' }}></i>}
          />
          {errors.firstName && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.firstName}</div>}

          {/* ── Last Name (optional) ── */}
          <Input
            id="lastName"
            label="Last Name (optional)"
            value={form.lastName}
            onChange={e => update('lastName', e.target.value)}
            placeholder="Last Name"
          />

          {/* ── Date of Birth — click anywhere opens calendar ── */}
          <DateInput
            id="dob"
            label="Date of Birth"
            required
            value={form.dob}
            onChange={e => update('dob', e.target.value)}
          />
          {errors.dob && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.dob}</div>}

          {/* ── Select Gender ── */}
          <div className="mp-notched-field">
            <span className="mp-notched-label">
              Select Gender <span className="required-star">*</span>
            </span>
            <div className="mp-notched-box">
              <select
                className="mp-notched-input"
                value={form.gender}
                onChange={e => update('gender', e.target.value)}
                style={{ paddingLeft: 14, cursor: 'pointer' }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
            </div>
          </div>
          {errors.gender && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.gender}</div>}

          {/* ── Suggested User Id ── */}
          <div className="mb-1">
            <label className="form-label fw-600" style={{ fontSize: '0.9rem', color: '#1a73e8', fontWeight: 600 }}>
              Suggested User Id <span className="required-star">*</span>
            </label>
            <div className="suggested-id-field">
              <input
                type="text"
                className="suggested-id-input"
                placeholder="e.g. abc_123"
                value={form.suggestedId}
                onChange={e => update('suggestedId', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              />
              <div className="suggested-id-suffix">@janparichay.gov.in</div>
            </div>
            {errors.suggestedId && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: 4 }}>{errors.suggestedId}</div>}
          </div>
          <div className="terms-hint mb-3">
            User Id is suffixed with <strong>@janparichay.gov.in</strong>, for ex:{' '}
            <em>abc_123@janparichay.gov.in</em>
          </div>

          {/* ── Password with show/hide ── */}
          <PasswordInput
            id="signup-pass"
            label="Password"
            required
            value={form.password}
            onChange={e => update('password', e.target.value)}
          />
          {errors.password && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.password}</div>}

          {/* ── Confirm Password with show/hide ── */}
          <PasswordInput
            id="confirm-pass"
            label="Confirm Password"
            required
            value={form.confirmPassword}
            onChange={e => update('confirmPassword', e.target.value)}
          />
          {errors.confirmPassword && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.confirmPassword}</div>}

          {/* ── Terms — clicking opens the modal ── */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="terms"
              checked={form.terms}
              onChange={() => {}}
              onClick={handleTermsCheckboxClick}
              style={{ cursor: 'pointer' }}
            />
            <label
              className="form-check-label"
              htmlFor="terms"
              style={{ fontSize: '0.875rem', cursor: 'pointer' }}
              onClick={handleTermsCheckboxClick}
            >
              I accept Terms and Conditions
            </label>
            {errors.terms && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: 2 }}>{errors.terms}</div>}
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            className={`btn-mp-primary${form.terms ? ' is-active' : ''}`}
            disabled={!form.terms}
          >
            Submit
          </button>
        </form>

        {/* Sign in link */}
        <p className="text-center mt-3 mb-0" style={{ fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <Link to="/login" className="link-blue" style={{ fontWeight: 600 }}>
            Sign in to an existing MeriPehchaan account
          </Link>
        </p>
      </div>

      {/* Terms & Conditions modal */}
      <TermsModal
        open={termsModalOpen}
        onAgree={handleAgree}
        onDeny={handleDeny}
        onClose={() => setTermsModalOpen(false)}
      />
    </div>
  )
}
