import React, {useEffect} from 'react'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {LanguageProvider} from './context/LanguageContext.jsx'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/layout/MainLayout'
import Profile from './pages/Profile'
import AccountActivity from './pages/AccountActivity'
import ConsentDashboard from './pages/ConsentDashboard'
import TermsConditions from './pages/TermsConditions'
import ApplicationPolicies from './pages/ApplicationPolicies'
import FAQ from './pages/FAQ'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import Authentication from './pages/Authentication'
import {DashboardProvider} from './context/DashboardContext.jsx'
import AccessibilityWidget from './components/AccessibilityOptions/AccessibilityWidget.jsx'


function PrivateRoute({ children }) {
  const user = localStorage.getItem('mp_user')
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {

  const location = useLocation();

  useEffect(()=>{
    if(location.hash){
      const timeoutId=setTimeout(()=>{
        const id=location.hash.replace('#', '')
        const el=document.getElementById(id)
        if(el){
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return()=>clearTimeout(timeoutId);
    }
  }, [location]);

  return (
    <LanguageProvider>

      <>

        <DashboardProvider>

          <Routes>

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/application-policies" element={<ApplicationPolicies />} />
            <Route path="/faq" element={<FAQ />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="activity" element={<AccountActivity />} />
              <Route path="consent" element={<ConsentDashboard />} />
            </Route>

            <Route
              path="/dashboard/services"
              element={
                <PrivateRoute>
                  <Services />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>

          <AccessibilityWidget/>
          
        </DashboardProvider>

      </>

    </LanguageProvider>
  )
}