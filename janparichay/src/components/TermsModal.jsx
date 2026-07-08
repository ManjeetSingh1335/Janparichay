import React, { useEffect } from 'react'

export default function TermsModal({ open, onAgree, onDeny, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="terms-modal-overlay" onMouseDown={onClose}>
      <div className="terms-modal-box" onMouseDown={e => e.stopPropagation()}>
        <div className="terms-modal-header">
          <h5>Terms &amp; Conditions</h5>
          <button type="button" className="terms-modal-close" onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="terms-modal-body">
          <p>
            Thanks for using our Product &amp; Services. The service is provided by
            National Informatics Centre (NIC), located at Block-A, CGO Complex,
            Lodhi Road, New Delhi, India.
          </p>
          <p>
            By using this service, you are agreeing to the terms and conditions
            mentioned below. Please read them carefully.
          </p>
          <p style={{ fontWeight: 700 }}>TERMS OF SERVICE</p>
          <p>
            This legal agreement between you and National Informatics Centre (NIC)
            governs your use of the Jan Parichay service.
          </p>
          <p>
            National Informatics Centre is the provider of Jan Parichay service,
            which provides e-Authentication as a service to government departments.
            This offers a secure and convenient way for users to access government
            services and for departments to assess user authenticity. The Jan
            Parichay service is available to you only in India and its territories.
          </p>
          <p>
            You agree to provide accurate, current, and complete information during
            the registration process and to update such information to keep it
            accurate, current, and complete. You are responsible for safeguarding
            your password and for all activities that occur under your account.
          </p>
          <p>
            NIC reserves the right to modify or discontinue, temporarily or
            permanently, the service (or any part thereof) with or without notice
            at any time. You agree that NIC shall not be liable to you or to any
            third party for any modification, suspension, or discontinuance of the
            service.
          </p>
        </div>

        <div className="terms-modal-footer">
          <button type="button" className="btn-terms-agree" onClick={onAgree}>
            Agree
          </button>
          <button type="button" className="btn-terms-deny" onClick={onDeny}>
            Deny
          </button>
        </div>
      </div>
    </div>
  )
}
