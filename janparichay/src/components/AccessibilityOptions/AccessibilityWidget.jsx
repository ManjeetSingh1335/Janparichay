import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { accessibilityOptions } from './AccessibilityOptions';
import './AccessibilityWidget.css';
import { useLanguage } from '../../context/LanguageContext';

const SETTINGS_KEY = 'jp_accessibility_settings';

const STEP_MAX = {
  biggerText: 4,
  textSpacing: 3,
  lineHeight: 4,
};

function AccessibilityWidget() {
  const { t } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [activeSettings, setActiveSettings] = useState(() => {
    try {
      // Use sessionStorage so closing portal/tab resets settings automatically
      const saved = sessionStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist settings to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(SETTINGS_KEY, JSON.stringify(activeSettings));
    } catch (e) {
      console.error('Failed to save accessibility settings:', e);
    }
  }, [activeSettings]);

  // Apply DOM side-effects based on activeSettings
  useEffect(() => {
    // Bigger Text (font size across all pages)
    const fontLevel = activeSettings.biggerText || 0;
    if (fontLevel > 0) {
      document.body.dataset.biggerText = String(fontLevel);
    } else {
      delete document.body.dataset.biggerText;
    }

    // Text Spacing
    const spacingLevel = activeSettings.textSpacing || 0;
    if (spacingLevel > 0) {
      document.body.dataset.textSpacing = String(spacingLevel);
    } else {
      delete document.body.dataset.textSpacing;
    }

    // Line Height
    const lineHeightLevel = activeSettings.lineHeight || 0;
    if (lineHeightLevel > 0) {
      document.body.dataset.lineHeight = String(lineHeightLevel);
    } else {
      delete document.body.dataset.lineHeight;
    }

    // Toggle classes on body
    document.body.classList.toggle('acc-highlight-links', !!activeSettings.highlightLinks);
    document.body.classList.toggle('acc-dyslexia-mode', !!activeSettings.dyslexiaFriendly);
    document.body.classList.toggle('acc-hide-images', !!activeSettings.hideImages);
    document.body.classList.toggle('acc-custom-cursor', !!activeSettings.cursor);
    document.body.classList.toggle('acc-dark-mode', !!activeSettings.lightDark);

    // Invert colors on html
    document.documentElement.classList.toggle('acc-invert-colors', !!activeSettings.invertColors);
  }, [activeSettings]);

  // Text to Speech effect
  useEffect(() => {
    if (!activeSettings.textToSpeech) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      return;
    }

    const speakText = (text) => {
      if (!text || !text.trim() || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    };

    const handleMouseOver = (e) => {
      const el = e.target;
      if (el.closest('.acc-panel') || el.closest('.acc-fab')) return;
      const text = el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || el.value || el.title;
      if (text && text.trim()) speakText(text);
    };

    const handleClick = (e) => {
      const el = e.target;
      if (el.closest('.acc-panel') || el.closest('.acc-fab')) return;
      const text = el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || el.value;
      if (text && text.trim()) speakText(text);
    };

    const handleSelection = () => {
      const sel = window.getSelection().toString();
      if (sel && sel.trim()) speakText(sel);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseup', handleSelection);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseup', handleSelection);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [activeSettings.textToSpeech]);

  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const optionKey = (id) => ({
    textToSpeech: 'accessibility_option_text_to_speech',
    biggerText: 'accessibility_option_bigger_text',
    textSpacing: 'accessibility_option_text_spacing',
    lineHeight: 'accessibility_option_line_height',
    highlightLinks: 'accessibility_option_highlight_links',
    dyslexiaFriendly: 'accessibility_option_dyslexia_friendly',
    hideImages: 'accessibility_option_hide_images',
    cursor: 'accessibility_option_cursor',
    lightDark: 'accessibility_option_light_dark',
    invertColors: 'accessibility_option_invert_colors',
  }[id]);

  const handleOptionClick = (id) => {
    setActiveSettings((prev) => {
      const maxSteps = STEP_MAX[id];
      if (maxSteps) {
        const currentLevel = prev[id] || 0;
        const nextLevel = (currentLevel + 1) % (maxSteps + 1);
        return { ...prev, [id]: nextLevel };
      } else {
        return { ...prev, [id]: !prev[id] };
      }
    });
  };

  const resetAll = () => {
    setActiveSettings({});
    try {
      sessionStorage.removeItem(SETTINGS_KEY);
      localStorage.removeItem(SETTINGS_KEY);
    } catch {}
    document.documentElement.style.fontSize = '';
    delete document.body.dataset.biggerText;
    delete document.body.dataset.textSpacing;
    delete document.body.dataset.lineHeight;
    document.body.classList.remove(
      'acc-highlight-links',
      'acc-dyslexia-mode',
      'acc-hide-images',
      'acc-custom-cursor',
      'acc-dark-mode'
    );
    document.documentElement.classList.remove('acc-invert-colors');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const hiddenPaths = ['/about', '/terms-conditions'];
  const normalizedPath = location.pathname.replace(/\/$/, '') || '/';
  if (hiddenPaths.includes(normalizedPath)) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="acc-fab"
        onClick={() => setIsOpen(true)}
        aria-label={t('accessibility_fab_aria_label')}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <i className="bi bi-universal-access acc-fab-icon"></i>
        <span className="acc-fab-text">{t('accessibility_fab_text')}</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="acc-overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Panel */}
      <div
        className={`acc-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="acc-panel-title"
      >
        {/* Header */}
        <div className="acc-header">
          <h5 id="acc-panel-title" className="acc-header-title">
            {t('accessibility_panel_title')}
          </h5>
          <button
            className="acc-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label={t('accessibility_close_aria_label')}
          >
            ✕
          </button>
        </div>

        {/* Options Grid */}
        <div className="acc-grid">
          {accessibilityOptions.map(({ id, label, icon }) => {
            const isStepOption = !!STEP_MAX[id];
            const currentLevel = activeSettings[id] || 0;
            const isActive = isStepOption ? currentLevel > 0 : !!activeSettings[id];

            return (
              <button
                key={id}
                type="button"
                className={`acc-card ${isActive ? 'active' : ''}`}
                onClick={() => handleOptionClick(id)}
                aria-pressed={isActive}
              >
                <div className="acc-card-header">
                  <span
                    className={`acc-card-icon acc-icon-${id}`}
                    role="img"
                    aria-label={t(optionKey(id))}
                    style={{ maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` }}
                  />
                  {isActive && (
                    <span className="acc-badge-tick" aria-hidden="true">✓</span>
                  )}
                </div>

                <span className="acc-card-label">{t(optionKey(id))}</span>

                {/* Step indicator dots — only shown when at least one level is active */}
                {isStepOption && currentLevel > 0 && (
                  <div className="acc-step-dots" aria-label={`Level ${currentLevel} of ${STEP_MAX[id]}`}>
                    {Array.from({ length: STEP_MAX[id] }).map((_, index) => (
                      <span
                        key={index}
                        className={`acc-dot ${index < currentLevel ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Reset Button */}
        <div className="acc-footer">
          <button type="button" className="acc-reset-btn" onClick={resetAll}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            {t('accessibility_reset_all_settings')}
          </button>
        </div>
      </div>
    </>
  );
}

export default AccessibilityWidget;

