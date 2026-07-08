import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const MENU_ITEMS = [
  { label: 'About Us',              icon: 'bi-card-text',           path: null },
  { label: 'User Manual',           icon: 'bi-box-arrow-in-right',  path: null },
  { label: 'JanParichay Offerings', icon: 'bi-box-arrow-in-right',  path: null },
  { label: 'Password Policy',       icon: 'bi-box-arrow-in-right',  path: null },
  { label: 'Application Policies',  icon: 'bi-link-45deg',          path: null },
  { label: 'Terms & Conditions',    icon: 'bi-file-text',           path: '/terms-conditions' },
  { label: 'FAQ',                   icon: 'bi-question-circle',     path: null },
]

export default function ThreeDot({ open, onClose }) {
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="kebab-menu" ref={ref}>
      {MENU_ITEMS.map(item => (
        <div
          className="kebab-menu-item"
          key={item.label}
          onClick={() => {
            onClose()
            if (item.path) navigate(item.path)
          }}
        >
          <i className={`bi ${item.icon}`}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
