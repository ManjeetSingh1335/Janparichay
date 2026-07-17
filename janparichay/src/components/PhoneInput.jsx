import React, { useState, useRef, useEffect } from 'react'
import COUNTRIES from '../data/countries'
import { useLanguage } from '../context/LanguageContext'

export default function PhoneInput({
  id,
  label,
  required = true,
  value,
  onChange,
  placeholder = '',
  infoTooltip = null,
  rightAddon = null, 
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState(COUNTRIES[0])  
  const wrapRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
        setSearch('')
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search) ||
    c.native.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={`mp-notched-field ${className}`}>
      <span className="mp-notched-label">
        {label ?? t('phone_input_default_label')} {required && <span className="required-star">*</span>}
        {infoTooltip && (
          <i className="bi bi-info-circle ms-1" style={{ fontSize: '0.75rem', color: '#6c757d' }} title={infoTooltip}></i>
        )}
      </span>

      <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
        <div className="mp-notched-box" style={{ flex: 1, position: 'relative' }} ref={wrapRef}>
          {/* Country code selector trigger */}
          <button
            type="button"
            className="phone-country-trigger"
            onClick={() => setOpen(v => !v)}
          >
            <span style={{ fontSize: '1.05rem' }}>{country.flag}</span>
            <span style={{ fontSize: '0.85rem', color: '#444' }}>{country.dial}</span>
            <i className="bi bi-caret-down-fill" style={{ fontSize: '0.55rem', color: '#777' }}></i>
          </button>

          <input
            id={id}
            type="tel"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mp-notched-input"
            style={{ paddingLeft: 4, paddingRight: 14 }}
            maxLength={15}
          />

          {/* Dropdown */}
          {open && (
            <div className="phone-country-dropdown">
              <div className="phone-country-search-wrap">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  autoFocus
                  placeholder={t('phone_input_search_placeholder')}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="phone-country-search"
                />
              </div>
              <div className="phone-country-list">
                {filtered.length === 0 && (
                  <div className="phone-country-empty">{t('phone_input_no_matches')}</div>
                )}
                {filtered.map(c => (
                  <div
                    key={c.code}
                    className={`phone-country-item${c.code === country.code ? ' selected' : ''}`}
                    onClick={() => { setCountry(c); setOpen(false); setSearch('') }}
                  >
                    <span className="flag">{c.flag}</span>
                    <span className="cname">{c.name} <span className="native">({c.native})</span></span>
                    <span className="dial">{c.dial}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {rightAddon}
      </div>
    </div>
  )
}
