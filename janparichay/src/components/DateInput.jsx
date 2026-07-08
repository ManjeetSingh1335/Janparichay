import React, { useRef } from 'react'

export default function DateInput({
  id,
  label = 'Date of Birth',
  required = false,
  value,
  onChange,
  className = '',
}) {
  const ref = useRef(null)

  const openPicker = () => {
    if (!ref.current) return
    
    if (typeof ref.current.showPicker === 'function') {
      try {
        ref.current.showPicker()
      } catch {
        ref.current.focus()
      }
    } else {
      ref.current.focus()
    }
  }

  return (
    <div className={`mp-notched-field ${className}`}>
      <span className="mp-notched-label">
        {label} {required && <span className="required-star">*</span>}
      </span>
      <div className="mp-notched-box" onClick={openPicker} style={{ cursor: 'pointer' }}>
        <input
          ref={ref}
          id={id}
          type="date"
          value={value}
          onChange={onChange}
          className="mp-notched-input mp-date-input"
          style={{ paddingLeft: 14, paddingRight: 14, cursor: 'pointer' }}
          max={new Date().toISOString().split('T')[0]}
        />
        <span className="mp-notched-right" style={{ pointerEvents: 'none' }}>
          <i className="bi bi-calendar3"></i>
        </span>
      </div>
    </div>
  )
}
