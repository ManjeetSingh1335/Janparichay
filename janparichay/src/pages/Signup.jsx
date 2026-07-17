 import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderLogo from '../components/HeaderLogo'
import Input from '../components/Input'
import PasswordInput from '../components/PasswordInput'
import PhoneInput from '../components/PhoneInput'
import DateInput from '../components/DateInput'
import TermsModal from '../components/TermsModal'
import { useLanguage } from '../context/LanguageContext'

export default function Signup() {
  const { t } = useLanguage()
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
    if (!form.mobile || form.mobile.length < 7) e.mobile = t('signup_error_mobile')
    if (!otpSent) e.otp = t('signup_error_otp')
    if (!form.firstName.trim()) e.firstName = t('signup_error_first_name')
    if (!form.dob) e.dob = t('signup_error_dob')
    if (!form.gender) e.gender = t('signup_error_gender')
    if (!form.suggestedId.trim()) e.suggestedId = t('signup_error_suggested_id')
    if (!form.password || form.password.length < 8) e.password = t('signup_error_password')
    if (form.password !== form.confirmPassword) e.confirmPassword = t('signup_error_confirm_password')
    if (!form.terms) e.terms = t('signup_error_terms')
    return e
  }

  const handleOTP = () => {
    if (form.mobile.length >= 7) {
      setOtpSent(true)
      alert(`${t('signup_alert_otp_sent')} ${form.mobile}\n${t('signup_alert_otp_demo')}`)
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
    alert(t('signup_alert_account_created'))
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
          {t('signup_heading')} <span className="jp-link">{t('signup_janparichay')}</span>
        </h2>

        <form onSubmit={handleSubmit} noValidate>

          {/* ── Mobile No with country picker + Generate OTP ── */}
          <PhoneInput
            id="signup-mobile"
            label={t('signup_mobile_label')}
            required
            value={form.mobile}
            onChange={e => update('mobile', e.target.value.replace(/\D/g, ''))}
            infoTooltip={t('signup_mobile_tooltip')}
            rightAddon={
              <button
                type="button"
                className="btn-otp"
                onClick={handleOTP}
                disabled={form.mobile.length < 7}
              >
                {t('signup_generate_otp')}
              </button>
            }
          />
          {errors.mobile && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.mobile}</div>}

          {/* OTP field shown after Generate OTP */}
          {otpSent && (
            <div style={{ marginBottom: 4 }}>
              <Input
                id="signup-otp"
                label={t('signup_enter_otp_label')}
                required
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder={t('signup_otp_placeholder')}
                maxLength={6}
              />
              <div style={{ fontSize: '0.78rem', color: '#1a73e8', marginTop: -12, marginBottom: 16 }}>
                {t('signup_otp_didnt_receive')} <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleOTP}>{t('signup_resend_otp')}</span>
              </div>
            </div>
          )}

          {/* ── First Name ── */}
          <Input
            id="firstName"
            label={t('signup_first_name_label')}
            required
            value={form.firstName}
            onChange={e => update('firstName', e.target.value)}
            placeholder={t('signup_first_name_placeholder')}
            rightAddon={<i className="bi bi-info-circle" title="As per official ID proof" style={{ fontSize: '0.9rem', cursor: 'help' }}></i>}
          />
          {errors.firstName && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.firstName}</div>}

          {/* ── Last Name (optional) ── */}
          <Input
            id="lastName"
            label={t('signup_last_name_label')}
            value={form.lastName}
            onChange={e => update('lastName', e.target.value)}
            placeholder={t('signup_last_name_placeholder')}
          />

          {/* ── Date of Birth — click anywhere opens calendar ── */}
          <DateInput
            id="dob"
            label={t('signup_dob_label')}
            required
            value={form.dob}
            onChange={e => update('dob', e.target.value)}
          />
          {errors.dob && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.dob}</div>}

          {/* ── Select Gender ── */}
          <div className="mp-notched-field">
            <span className="mp-notched-label">
              {t('signup_select_gender_label')} <span className="required-star">*</span>
            </span>
            <div className="mp-notched-box">
              <select
                className="mp-notched-input"
                value={form.gender}
                onChange={e => update('gender', e.target.value)}
                style={{ paddingLeft: 14, cursor: 'pointer' }}
              >
                <option value="">{t('signup_gender_default_option')}</option>
                <option value="male">{t('signup_gender_male')}</option>
                <option value="female">{t('signup_gender_female')}</option>
                <option value="other">{t('signup_gender_other')}</option>
                <option value="prefer_not">{t('signup_gender_prefer_not')}</option>
              </select>
            </div>
          </div>
          {errors.gender && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.gender}</div>}

          {/* ── Suggested User Id ── */}
          <div className="mb-1">
            <label className="form-label fw-600" style={{ fontSize: '0.9rem', color: '#1a73e8', fontWeight: 600 }}>
              {t('signup_suggested_user_id_label')} <span className="required-star">*</span>
            </label>
            <div className="suggested-id-field">
              <input
                type="text"
                className="suggested-id-input"
                placeholder={t('signup_suggested_id_placeholder')}
                value={form.suggestedId}
                onChange={e => update('suggestedId', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              />
              <div className="suggested-id-suffix">{t('signup_suggested_id_suffix')}</div>
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
            label={t('signup_password_label')}
            required
            value={form.password}
            onChange={e => update('password', e.target.value)}
          />
          {errors.password && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: -12, marginBottom: 12 }}>{errors.password}</div>}

          {/* ── Confirm Password with show/hide ── */}
          <PasswordInput
            id="confirm-pass"
            label={t('signup_confirm_password_label')}
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
              {t('signup_terms_checkbox')}
            </label>
            {errors.terms && <div className="text-danger" style={{ fontSize: '0.78rem', marginTop: 2 }}>{errors.terms}</div>}
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            className={`btn-mp-primary${form.terms ? ' is-active' : ''}`}
            disabled={!form.terms}
          >
            {t('signup_submit_button')}
          </button>
        </form>

        {/* Sign in link */}
        <p className="text-center mt-3 mb-0" style={{ fontSize: '0.875rem' }}>
          {t('signup_already_have_account')}{' '}
          <Link to="/login" className="link-blue" style={{ fontWeight: 600 }}>
            {t('signup_sign_in_link')}
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
