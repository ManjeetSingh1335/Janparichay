import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDashboard } from '../context/DashboardContext.jsx'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import myGovLogo from '../images/myGov.png'
import digitalIndiaLogo from '../images/Digital-India.png'
import '../Services.css'

const serviceNames = [
  'JPPartners Pehchaan', 'Meghraj JPNGCstg', 'Meghraj NGCstg', 'Revenue eServices',
  'Academic Bank Of Credits', 'eDistrict Kerala Application', 'eDistrict Kerala App',
  'Esevanam', 'iilms (Integrated Learning)', 'Jan Sugam', 'Kerala Excise', 'MyGov - Arunachal Pradesh',
  'MyGov - Assam', 'MyGov - Blog', 'MyGov - Chhattisgarh', 'MyGov - Goa', 'MyGov - Gujarat',
  'MyGov - Haryana', 'MyGov - Himachal Pradesh', 'MyGov - Innovate', 'MyGov - Jammu and Kashmir',
  'MyGov - Jharkhand', 'MyGov - Karnataka', 'MyGov - Madhya Pradesh', 'MyGov - Maharashtra',
  'MyGov - Manipur', 'MyGov - Nagaland', 'MyGov - Pledge', 'MyGov - Quiz', 'MyGov - Self4society',
  'MyGov - Tamil Nadu', 'MyGov - Tripura', 'MyGov - Uttar Pradesh', 'MyGov - Uttarakhand',
  'MyGov Youth', 'Noklak District Website', 'Online Scholarship', 'Prohibition Excise', 'Umang'
]

const groups = [
  'All Services', 'Service Groups', 'Arunachal Pradesh State Services', 'Assam State Services',
  'Bihar State Services', 'Central Services', 'Chhattisgarh State Services',
  'Dadra and Nagar Haveli State Services', 'Delhi State Services', 'District-S3WaaS',
  'Goa State Services', 'Gujarat State Services', 'Haryana State Services',
  'Himachal Pradesh State Services', 'Jammu and Kashmir State Services', 'Jammu Kashmir State Services',
  'Jharkhand State Services', 'Karnataka State Services', 'Kerala State Services', 'Ladakh State Services',
  'Madhya Pradesh State Services', 'Maharashtra State Services', 'Manipur State Services',
  'Mizoram State Services', 'Nagaland State Services', 'OAuth SSO', 'Others State Services',
  'Punjab State Services', 'Rajasthan State Services', 'S3WaaS', 'sarathi', 'Tamil Nadu State Services',
  'Telangana State Services', 'Tripura State Services', 'Uttar Pradesh State Services', 'Uttarakhand State Services'
]

const displayName = name => name.length > 23 ? `${name.slice(0, 22)}...` : name

export default function Services() {
  const navigate = useNavigate()
  const { profile, logout } = useDashboard()
  const [query, setQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState('All Services')
  const [menuOpen, setMenuOpen] = useState(false)

  const services = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return serviceNames
    return serviceNames.filter(name => name.toLowerCase().includes(normalized))
  }, [query])

  return (
    <div className="services-page">
      <aside className="services-sidebar">
        <div className="services-brand"><img src={meriPehchaanLogo} alt="Meri Pehchaan" /></div>
        <nav aria-label="Service groups">
          {groups.map((group, index) => (
            <button
              key={group}
              type="button"
              className={`services-group ${activeGroup === group ? 'selected' : ''} ${index > 1 ? 'has-chevron' : ''}`}
              onClick={() => setActiveGroup(group)}
            >{group}</button>
          ))}
        </nav>
      </aside>

      <section className="services-main">
        <header className="services-topbar">
          <label className="service-search">
            <span className="visually-hidden">Search service</span>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Service" />
            <i className="bi bi-search" aria-hidden="true" />
          </label>
          <div className="services-user-area">
            <img src={digitalIndiaLogo} className="digital-india-mark" alt="Digital India" />
            <div className="services-user-menu">
              <button type="button" className="services-user-trigger" onClick={() => setMenuOpen(open => !open)}>
                {(profile.fullName || profile.name || 'Manjeet Teotia').toUpperCase()} <i className="bi bi-person-fill" />
              </button>
              {menuOpen && <div className="services-dropdown">
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}><i className="bi bi-house-door-fill" /> Dashboard</Link>
                <button type="button" onClick={logout}><i className="bi bi-power" /> Logout</button>
              </div>}
            </div>
          </div>
        </header>

        <main className="services-content">
          <h1>Applications currently onboarded with <span>MeriPehchaan</span></h1>
          <div className="services-grid" aria-live="polite">
            {services.map((name, index) => (
              <button className="service-card" key={name} type="button" title={`Open ${name}`} onClick={() => alert(`${name} is selected.`)}>
                <div className="service-logo-wrap">
                  <img src={index % 6 === 0 ? myGovLogo : meriPehchaanLogo} alt="" />
                </div>
                <span>{displayName(name)}</span>
              </button>
            ))}
          </div>
          {services.length === 0 && <p className="services-no-results">No services found.</p>}
        </main>
      </section>
    </div>
  )
}
