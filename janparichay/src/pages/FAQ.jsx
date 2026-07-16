import React from 'react'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import Footer from '../components/layout/Footer'
import '../FAQ.css'
import { useLanguage } from '../context/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()

  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') },
    { q: t('faq_q5'), a: t('faq_a5') },
    { q: t('faq_q6'), a: t('faq_a6') },
    { q: t('faq_q7'), a: t('faq_a7') },
    { q: t('faq_q8'), a: t('faq_a8') },
    { q: t('faq_q9'), a: t('faq_a9') },
    { q: t('faq_q10'), a: t('faq_a10') },
    { q: t('faq_q11'), a: t('faq_a11') },
    { 
      q: t('faq_q12'), 
      a: [
        t('faq_a12_item_1'),
        t('faq_a12_item_2')
      ] 
    },
    { 
      q: t('faq_q13'), 
      a: [
        t('faq_a13_item_1'),
        t('faq_a13_item_2')
      ] 
    },
    { q: t('faq_q14'), a: t('faq_a14') },
    { 
      q: t('faq_q15'), 
      a: [
        t('faq_a15_item_1'),
        t('faq_a15_item_2'),
        t('faq_a15_item_3'),
        t('faq_a15_item_4')
      ] 
    },
    { 
      q: t('faq_q16'), 
      a: [
        t('faq_a16_item_1'),
        t('faq_a16_item_2')
      ] 
    },
    { 
      q: t('faq_q17'), 
      a: [
        t('faq_a17_item_1'),
        t('faq_a17_item_2')
      ] 
    },
    { 
      q: t('faq_q18'), 
      a: [
        t('faq_a18_item_1'),
        t('faq_a18_item_2'),
        t('faq_a18_item_3'),
        t('faq_a18_item_4')
      ] 
    },
    { 
      q: t('faq_q19'), 
      a: [
        t('faq_a19_item_1'),
        t('faq_a19_item_2'),
        t('faq_a19_item_3')
      ] 
    },
    { 
      q: t('faq_q20'), 
      intro: t('faq_a20_intro'),
      a: [
        t('faq_a20_item_1'),
        t('faq_a20_item_2')
      ] 
    },
    { 
      q: t('faq_q21'), 
      a: [
        t('faq_a21_item_1'),
        t('faq_a21_item_2')
      ] 
    },
    { q: t('faq_q22'), a: t('faq_a22') },
    { q: t('faq_q23'), a: t('faq_a23') }
  ]

  return (
    <div className="faq-page">
      {/* FAQ Header */}
      <header className="faq-header">
        <div className="faq-header-logo-container">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" className="faq-header-logo" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="faq-main-content">
        <div className="faq-container">
          <h1 className="faq-title">{t('faq_page_title')}</h1>
          
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isArray = Array.isArray(faq.a)
              return (
                <div key={index} className="faq-item">
                  <h2 className="faq-question">{faq.q}</h2>
                  
                  {faq.intro && <p className="faq-answer faq-intro">{faq.intro}</p>}
                  
                  {isArray ? (
                    <ul className="faq-answer-list">
                      {faq.a.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="faq-answer">{faq.a}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
