import React, { useState } from 'react'
import Input from './Input'
import { useLanguage } from '../context/LanguageContext'

export default function PasswordInput({
  id,
  label,
  required = true,
  value,
  onChange,
  placeholder = '',
  className = '',
}) {
  const [show, setShow] = useState(false)
  const { t } = useLanguage()

  return (
    <Input
      id={id}
      label={label ?? t('password_input_default_label')}
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
          aria-label={show ? t('password_input_aria_label_hide') : t('password_input_aria_label_show')}
        />
      }
    />
  )
}
