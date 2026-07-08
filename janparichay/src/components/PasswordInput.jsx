import React, { useState } from 'react'
import Input from './Input'

export default function PasswordInput({
  id,
  label = 'Password',
  required = true,
  value,
  onChange,
  placeholder = '',
  className = '',
}) {
  const [show, setShow] = useState(false)

  return (
    <Input
      id={id}
      label={label}
      required={required}
      value={value}
      onChange={onChange}
      type={show ? 'text' : 'password'}
      placeholder={placeholder}
      className={className}
      rightAddon={
        <i
          className={`bi ${show ? 'bi-eye-slash' : 'bi-eye'}`}
          onClick={() => setShow(v => !v)}
          role="button"
          aria-label={show ? 'Hide password' : 'Show password'}
        />
      }
    />
  )
}
