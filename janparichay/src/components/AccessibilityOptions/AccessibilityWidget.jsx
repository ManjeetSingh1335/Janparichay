import React, {useState, useEffect, useRef} from 'react'
import { accessibilityOptions } from './AccessibilityOptions'
import './AccessibilityWidget.css'

function AccessibilityWidget() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeSettings, setActiveSettings] = useState(() => {
        const saved = localStorage.getItem('usersettings');
        return saved? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('user_settings', JSON.stringify(activeSettings));
    }, [activeSettings]);

    const toogleOptions = (id) => {
        setActiveSettings((prev) => ({...prev, id: !prev[id]}))
    }
    const resetAll = () => setActiveSettings({});

  return (
    <>

        <button
            className="user-fab d-flex align-items-center"
            onClick={() => setIsOpen(true)}
            aria-label="Open accessibility options"
        >
            <i className="bi bi-universal-access user-fab-icon"></i>
            <span className="user-fab-text">Accessibility Options</span>
      </button>

       {isOpen && (
            <div className="user-fab:hover user-fab-text " onClick={() => setIsOpen(false)}>
            </div>
        )}

        <div className={`user-panel d-flex flex-column ${isOpen? 'open' : ''}`}>

        <div className="user-header d-flex justify-content-between align-items-center px-4 py-3">
          <h5 className="mb-0 text-white">Accessibility Options</h5>
          <button
            className="btn-close btn-close-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          ></button>
        </div>

        <div className="user-grid row g-3 p-3 m-0 flex-grow-1">
            {accessibilityOptions.map(({id, label, icon}) => (
                <div className="col-4" key={id}>
                    <button
                    className={`user-card btn w-100 h-100 d-flex flex-column align-items-center justify-content-center 
                    ${activeSettings[id] ? 'active' : ''}`}
                    onClick={() => toggleOption(id)}
                    >
                <i className={`bi ${icon} user-card-icon`}></i>
                <span className="user-card-label mt-2">{label}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="p-3">
            <button className="btn user-reset-btn w-100 d-flex align-items-center justify-content-center gap-2" onClick={resetAll}>
            <i className="bi bi-arrow-counterclockwise"></i>
            Reset All Settings
          </button>
        </div>

      </div>

    </>
  )
}

export default AccessibilityWidget
