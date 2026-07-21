import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const MENU_ITEMS = [
  { label: 'About Us',              icon: 'bi-card-text',           path: '/about',                url: null },
  { label: 'User Manual',           icon: 'bi-box-arrow-in-right',  path: null,                    url: 'https://janparichay.meripehchaan.gov.in/v1/pehchaan/User%20Manual.pdf' },
  { label: 'JanParichay Offerings', icon: 'bi-box-arrow-in-right',  path: null,                    url: 'https://janparichay.meripehchaan.gov.in/v1/pehchaan/JanParichay%20Offerings.pdf' },
  { label: 'Password Policy',       icon: 'bi-box-arrow-in-right',  path: null,                    url: 'https://janparichay.meripehchaan.gov.in/v1/pehchaan/PasswordPolicy.pdf' },
  { label: 'Application Policies',  icon: 'bi-link-45deg',          path: '/application-policies', url: null },
  { label: 'Terms & Conditions',    icon: 'bi-file-text',           path: '/terms-conditions',     url: null },
  { label: 'FAQ',                   icon: 'bi-question-circle',     path: '/faq',                  url: null },
]

// triggerRef — the ⋮ button ref, excluded from outside-click so toggle works correctly
export default function ThreeDot({ open, onClose, triggerRef, menuStyle = {} }) {
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      // Ignore clicks on the trigger button itself — let its onClick handle toggling
      if (triggerRef?.current && triggerRef.current.contains(e.target)) return
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onClose, triggerRef])

  if (!open) return null

  return (
    <div className="kebab-menu" ref={menuRef} style={menuStyle}>
      {MENU_ITEMS.map(item => (
        <div
          className="kebab-menu-item"
          key={item.label}
          onClick={() => {
            onClose()
            if (item.url) {
              window.open(item.url, '_blank', 'noopener,noreferrer')
            } else if (item.path) {
              navigate(item.path)
            }
          }}
        >
          <i className={`bi ${item.icon}`}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
