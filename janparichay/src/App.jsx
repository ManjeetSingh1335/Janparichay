import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/layout/MainLayout'
import Profile from './pages/Profile'
import AccountActivity from './pages/AccountActivity'
import ConsentDashboard from './pages/ConsentDashboard'
import TermsConditions from './pages/TermsConditions'
import {DashboardProvider} from './context/DashboardContext.jsx'


function PrivateRoute({ children }) {
  const user = localStorage.getItem('mp_user')
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <DashboardProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

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

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </DashboardProvider>
  )
}

