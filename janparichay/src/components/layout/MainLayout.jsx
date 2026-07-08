import React from 'react'
import {Outlet} from "react-router-dom";   
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import Footer from './Footer.jsx'
import './Layout.css'

function MainLayout() {
  return (
    <div className="layout-container">
        <Navbar/>
        <div className="layout-body">
            <Sidebar/>
            <main className="layout-content">
                <Outlet/>
            </main>
        </div>
        <Footer/>
    </div>
  )
}

export default MainLayout