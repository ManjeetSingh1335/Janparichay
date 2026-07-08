import React from 'react'
import './Layout.css'
import {NavLink} from 'react-router-dom'

function Sidebar() {
  const links=[
    {
      to: "/dashboard",
      label: "Dashboard"
    },
    {
      to: "/dashboard/profile",
      label: "Profile"
    },
    {
      to: "/dashboard/activity",
      label: "Account Activity"
    },
    {
      to: "/dashboard/consent",
      label: "Consent Dashboard"
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
            className={({ isActive }) => (isActive ? "active-link" : "non-active-link")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar