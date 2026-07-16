import React, { useState, useEffect } from 'react';
import { accessibilityOptions } from './AccessibilityOptions';
import './AccessibilityWidget.css';

function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSettings, setActiveSettings] = useState(() => {
    const saved = localStorage.getItem('user_settings');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('user_settings', JSON.stringify(activeSettings));
  }, [activeSettings]);

  const toggleOption = (id) => {
    setActiveSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => setActiveSettings({});

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="acc-fab"
        onClick={() => setIsOpen(true)}
        aria-label="Open accessibility options"
      >
        <i className="bi bi-universal-access acc-fab-icon"></i>
        <span className="acc-fab-text">Accessibility Options</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="acc-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div className={`acc-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="acc-header">
          <h5 className="acc-header-title">Accessibility options</h5>
          <button
            className="acc-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Options Grid */}
        <div className="acc-grid">
          {accessibilityOptions.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`acc-card ${activeSettings[id] ? 'active' : ''}`}
              onClick={() => toggleOption(id)}
            >
              <img src={icon} alt={label} className={`acc-card-icon acc-icon-${id}`} />
              <span className="acc-card-label">{label}</span>
            </button>
          ))}
        </div>

        {/* Reset Button */}
        
        <div className="acc-footer">
          <button className="acc-reset-btn" onClick={resetAll}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            Reset All Settings
          </button>
        </div>
      </div>
    </>
  );
}

export default AccessibilityWidget;
