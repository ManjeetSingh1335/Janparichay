import React from 'react'
import './Layout.css'
import {NavLink} from 'react-router-dom'
import {useLanguage} from '../../context/LanguageContext'

function Sidebar() {
  const {t}=useLanguage()

  const links=[
    {
      to: "/dashboard",
      label: t('sidebar_nav_link_dashboard')
    },
    {
      to: "/dashboard/profile",
      label: t('sidebar_nav_link_profile')
    },
    {
      to: "/dashboard/activity",
      label: t('sidebar_nav_link_account_activity')
    },
    {
      to: "/dashboard/consent",
      label: t('sidebar_nav_link_consent_dashboard')
    },
  ]
    
  return (
    <aside className="sidebar-container">
      <nav className="sidebar-nav">
        {links.map((link)=>(
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to==="/dashboard"}
            className={({isActive}) => (isActive? "active-link" : "non-active-link")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
