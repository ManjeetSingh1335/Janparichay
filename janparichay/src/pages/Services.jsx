import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDashboard } from '../context/DashboardContext.jsx'

import meriPehchaanLogo from '../images/meri-pehchaan.png'
import digitalIndiaLogo from '../images/Digital-India.png'

import arunachalLandInfoLogo from '../images/arunachal1.png'
import arunachalMyGovLogo from '../images/arunachal2.png'
import assamMyGov from '../images/assam1.png'

import biharSamadhan from '../images/bihar1.png'
import biharLawDept from '../images/bihar2.png'
import biharXLN from '../images/bihar3.png'
import biharMutationLPC from '../images/bihar4.png'
import biharRationCard from '../images/bihar5.png'
import biharServicePlus from '../images/bihar6.png'
import biharSwcs from '../images/bihar7.png'

import CentralJP from '../images/Central1.png'
import CentralAcademics from '../images/Central2.png'
import CentralBlog from '../images/Central3.png'
import CentralInnovative from '../images/Central4.png'
import CentralPledge from '../images/Central5.png'
import CentralQuiz from '../images/Central6.png'
import CentralSelf4society from '../images/Central7.png'
import CentralAuth from '../images/Central8.png'
import CentralProhibition from '../images/Central9.png'
import CentralUmang from '../images/Central10.png'

import ChhattisgarhMyGov from '../images/Chhattisgarh.png'
import DDDMyGov from '../images/mygovdddi.png'
import UKJanparichay from '../images/Uk1.png'
import UKMyGov from '../images/UK2.png'

import '../Services.css'


const groups = [
  'All Services',
  'Service Groups',
  'Arunachal Pradesh State Services',
  'Assam State Services',
  'Bihar State Services',
  'Central Services',
  'Chhattisgarh State Services',
  'Dadra and Nagar Haveli State Services',
  'Delhi State Services',
  'Goa State Services',
  'Gujarat State Services',
  'Haryana State Services',
  'Jammu and Kashmir State Services',
  'Jharkhand State Services',
  'Karnataka State Services',
  'Kerala State Services',
  'Madhya Pradesh State Services',
  'Maharashtra State Services',
  'Punjab State Services',
  'Tamil Nadu State Services',
  'Uttar Pradesh State Services',
  'Uttarakhand State Services',
]

const myGovDescription =
  'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const item = (name, image, url, description = name) => ({
  name,
  image,
  url,
  description,
})

const shortName = (name) => (name.length > 23 ? `${name.slice(0, 22)}...` : name)

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const servicesByGroup = {
  'Arunachal Pradesh State Services': [
    item(
      'Land Information Service',
      arunachalLandInfoLogo,
      'https://lisa.arunachal.gov.in/',
      'Land Information System of Arunachal Pradesh'
    ),
    item('Mygov - Arunachal Pradesh', arunachalMyGovLogo, 'https://arunachal.mygov.in/', myGovDescription),
  ],

  'Assam State Services': [
    item('Mygov - Assam', assamMyGov, 'https://assam.mygov.in/', myGovDescription),
  ],

  'Bihar State Services': [
    item(
      'Bhu Samadhan Production',
      biharSamadhan,
      'https://homeonline.bihar.gov.in/landdispute/Login_Default_new.aspx'
    ),
    item('Bihar Serviceplus Production For Law Dept. Production', biharLawDept, 'https://serviceonline.bihar.gov.in/law/'),
    item('XLN Bihar Production', biharXLN, 'https://xln.bihar.gov.in/ST_Login.aspx'),
    item('Apply For Mutation & LPC Production', biharMutationLPC, 'https://biharbhumi.bihar.gov.in/Biharbhumi/UserLogin'),
    item('Bihar Ration Card Online Production', biharRationCard, 'https://rconline.bihar.gov.in/RCMSLanding.aspx'),
    item('Bihar Serviceplus Production', biharServicePlus, 'https://serviceonline.bihar.gov.in/'),
    item('SWCs Bihar SSO Production', biharSwcs, 'https://swc2.bihar.gov.in/investor/homepage'),
  ],

  'Central Services': [
    item('JPPartners Pehchaan', CentralJP, 'https://jppartners.meripehchaan.gov.in/signup/'),
    item('Academic Bank Of Credits', CentralAcademics, 'https://www.abc.gov.in/sso_login.'),
    item('Mygov - Blog', CentralBlog, 'https://blog.mygov.in/', myGovDescription),
    item('Mygov - Innovate India', CentralInnovative, 'https://innovateindia.mygov.in/', myGovDescription),
    item('Mygov - Pledge', CentralPledge, 'https://pledge.mygov.in/', myGovDescription),
    item('Mygov - Quiz', CentralQuiz, 'https://quiz.mygov.in/', myGovDescription),
    item('Mygov - Self4society', CentralSelf4society, 'https://self4society.mygov.in/', myGovDescription),
    item('Mygovauth', CentralAuth, 'https://auth.mygov.in/user', myGovDescription),
    item(
      'Prohibition Excise & Registration Department',
      CentralProhibition,
      'https://www.india.gov.in/government-order-home-prohibition-and-excise-department'
    ),
    item('Umang', CentralUmang, 'https://web.umang.gov.in/', 'One App, Many Government Services'),
  ],

  'Chhattisgarh State Services': [
    item('Mygov - Chhattisgarh', ChhattisgarhMyGov, 'https://chhattisgarh.mygov.in/', myGovDescription),
  ],

  'Dadra and Nagar Haveli State Services': [
    item('Mygov - Ddd', DDDMyGov, 'https://ddd.mygov.in/', myGovDescription),
  ],

  'Uttarakhand State Services': [
    item('Apuni Sarkar Production', UKJanparichay, 'https://eservices.uk.gov.in/login/', 'CitizenCentricService Portal'),
    item('CM Helpline 1905', UKJanparichay, 'https://cmhelpline.uk.gov.in/', 'Unified Grievance Portal'),
    item('PM Gati Shakti Production', UKJanparichay, 'https://unnati.uk.gov.in/login'),
    item('REF CM HELPLINE Production', UKJanparichay, 'https://cmhelpline.uk.gov.in/'),
    item('mygov - Uttarakhand', UKMyGov, 'https://uttarakhand.mygov.in/', myGovDescription),
  ],
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function ServiceModal({ service, onClose }) {
  if (!service) return null

  return (
    <div className="service-modal-backdrop" onMouseDown={onClose}>
      <section className="service-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="service-modal-card">
          <button className="service-modal-close" onClick={onClose}>
            &times;
          </button>
          <div className="service-modal-body">
            <div className="service-modal-logo">
              <img src={service.image} alt={service.name} />
            </div>
            <div className="service-modal-details">
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <a className="service-access-button" href={service.url} target="_blank" rel="noreferrer">
                Access Now <i className="bi bi-box-arrow-up-right" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Services() {
  const { profile, logout } = useDashboard()

  const [query, setQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState('All Services')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const services = useMemo(() => {
    const list =
      activeGroup === 'All Services' ? Object.values(servicesByGroup).flat() : servicesByGroup[activeGroup] || []

    return list.filter((service) => service.name.toLowerCase().includes(query.trim().toLowerCase()))
  }, [activeGroup, query])

  return (
    <div className="services-page">
      <aside className="services-sidebar">
        <div className="services-brand">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" />
        </div>

        <nav>
          {groups.map((group, index) =>
            group === 'Service Groups' ? (
              <div key={group} className="services-group services-group-label">
                {group}
              </div>
            ) : (
              <button
                key={group}
                className={`services-group ${
                  activeGroup === group && group.endsWith('State Services') ? 'selected' : ''
                } ${index > 1 ? 'has-chevron' : ''}`}
                onClick={() => setActiveGroup(group)}
              >
                {group}
              </button>
            )
          )}
        </nav>
      </aside>

      <section className="services-main">
        <header className="services-topbar">
          <label className="service-search">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Service" />
            <i className="bi bi-search" />
          </label>

          <div className="services-user-area">
            <img src={digitalIndiaLogo} className="digital-india-mark" alt="Digital India" />

            <div className="services-user-menu">
              <button className="services-user-trigger" onClick={() => setMenuOpen((value) => !value)}>
                {(profile.fullName || profile.name || 'Manjeet Teotia').toUpperCase()} <i className="bi bi-person-fill" />
              </button>

              {menuOpen && (
                <div className="services-dropdown">
                  <Link to="/dashboard">Dashboard</Link>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="services-content">
          <h1>
            Applications currently onboarded with <span>MeriPehchaan</span>
          </h1>

          <div className="services-grid">
            {services.map((service) => (
              <button className="service-card" key={service.name} onClick={() => setSelectedService(service)}>
                <div className="service-logo-wrap">
                  <img src={service.image} alt="" />
                </div>
                <span>{shortName(service.name)}</span>
              </button>
            ))}
          </div>

          {services.length === 0 && <p className="services-no-results">No services found.</p>}
        </main>
      </section>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  )
}
