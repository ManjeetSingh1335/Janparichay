import React from 'react'

export default function SSOSection() {
  return (
    <>
      <div className="or-divider">OR</div>
    <div className="sso-logos-row">
        <span className="sso-logo-chip" style={{ color: '#7b4fbf' }}>
          📁 DigiLocker
        </span>
        <span className="sso-logo-chip" style={{ color: '#333' }}>
          🔑 PARICHAY
        </span>
        <span className="sso-logo-chip" style={{ color: '#c0392b' }}>
          ई-प्रमाण e-Pramaan
        </span>
      </div>

      <div className="social-btns-row">
        <button type="button" className="social-btn google" title="Sign in with Google">
          <i className="bi bi-google"></i>
        </button>
        <button type="button" className="social-btn github" title="Sign in with GitHub">
          <i className="bi bi-github"></i>
        </button>
        <button type="button" className="social-btn csc" title="Sign in with CSC">
          CSC
        </button>
        <button type="button" className="social-btn twitter" title="Sign in with X">
          <i className="bi bi-twitter-x"></i>
        </button>
        <button type="button" className="social-btn linkedin" title="Sign in with LinkedIn">
          <i className="bi bi-linkedin"></i>
        </button>
      </div>
    </>
  )
}
