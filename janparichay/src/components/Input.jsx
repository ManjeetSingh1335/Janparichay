import React from 'react'

 
export default function Input({
  id,
  label,
  required = false,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  disabled = false,
  leftAddon = null,    
  rightAddon = null, 
  inputStyle = {},
  className = '',
  onClick,
  inputRef,
  ...rest
}) {
  return (
    <div className={`mp-notched-field ${className}`}>
      <span className="mp-notched-label">
        {label} {required && <span className="required-star">*</span>}
      </span>
      <div className="mp-notched-box" onClick={onClick}>
        {leftAddon && <span className="mp-notched-left">{leftAddon}</span>}
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="mp-notched-input"
          style={{
            paddingLeft: leftAddon ? 4 : 14,
            paddingRight: rightAddon ? 40 : 14,
            ...inputStyle,
          }}
          {...rest}
        />
        {rightAddon && <span className="mp-notched-right">{rightAddon}</span>}
      </div>
    </div>
  )
}
