import React, {useState, useRef, useEffect} from 'react'
import {useLanguage} from '../context/LanguageContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {

  const {langCode, changeLanguage, languages}=useLanguage();
  const [open, setOpen]=useState(false);
  const ref=useRef(null);

  const current = languages.find(l => l.code === langCode) || languages[0]

  useEffect(()=>{
    function handleClickOutside(e){
      if(ref.current && !ref.current.contains(e.target)){
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return()=>document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect=(code)=>{
    changeLanguage(code);
    setOpen(false);
  }

  return (
    <div className="lang-switcher" ref={ref}>
  
      <button
        className={`lang-trigger ${open? 'open' : ''}`}
        onClick={()=>setOpen(prev=>!prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >

        <svg className="lang-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>

        <span className="lang-current-name">{current.nativeName}</span>

        
        <svg
          className={`lang-chevron ${open ? 'rotated' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      
      
      {open && (
        <ul className="lang-dropdown" role="listbox" aria-label="Language options">
          {languages.map(lang=>(
            <li
              key={lang.code}
              role="option"
              aria-selected={lang.code===langCode}
              className={`lang-option ${lang.code===langCode ? 'selected' : ''}`}
              onClick={()=>handleSelect(lang.code)}
            >
              {lang.nativeName}
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}
