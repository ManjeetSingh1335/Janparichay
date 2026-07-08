import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UAParser } from 'ua-parser-js'
import Input from './Input'
import PasswordInput from './PasswordInput'

export default function UsernameTab({ onForgotPassword, onForgetUserId }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passlessAuth, setPasslessAuth] = useState(false)
  const [consent, setConsent] = useState(false)
  const navigate = useNavigate()
  
  const [ipData, setIpData] = useState({ ip: 'XXX.XXX.XX.XX', city: '', country: 'India' });

  useEffect(() => {
    fetch('/api/ip-info')
      .then(res => res.json())
      .then(data => {
        if (data.ip) {
          setIpData({
            ip: data.ip,
            city: data.city || 'Delhi',
            country: data.country_name || 'India'
          });
        }
      })
      .catch(() => {});
  }, []);

  const canSubmit = username && consent && (passlessAuth || password)

  const handleSignIn = (e) => {
    e.preventDefault()
    if (!canSubmit) return

    //record login session
    const now = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    const timeStr = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const existing = localStorage.getItem('user_devices');
    let devices = [];
    if (existing) {
      try {
        devices = JSON.parse(existing);
      } catch (err) {
        devices = [];
      }
    }
    const parser = new UAParser();
    const result = parser.getResult();
    let os = result.os.name || 'Windows';
    if (os === 'Mac OS') os = 'macOS';

    const browser = result.browser.name || 'Chrome';

    const existingDeviceIndex = devices.findIndex(d => d.os === os && d.browser === browser);
    if (existingDeviceIndex !== -1) {
      devices[existingDeviceIndex].time = timeStr;
    } else {
      devices.push({
        id: Date.now(),
        os,
        browser,
        time: timeStr
      });
    }
    devices.sort((a, b) => b.time.localeCompare(a.time));
    localStorage.setItem('user_devices', JSON.stringify(devices));

    //record recent activity
    const validTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
    const validStr = `${pad(validTime.getDate())}-${pad(validTime.getMonth() + 1)}-${validTime.getFullYear()} ${pad(validTime.getHours())}:${pad(validTime.getMinutes())}:${pad(validTime.getSeconds())}`;
    
    let city = ipData.city;
    if (city === 'Bengaluru') {
      city = 'Delhi';
    }
    const locationStr = `${city},${ipData.country}`;

    const existingAct = localStorage.getItem('recent_activities');
    let activities = [];
    if (existingAct) {
      try {
        activities = JSON.parse(existingAct);
      } catch (e) {
        activities = [];
      }
    }
    activities = activities.map(act => ({ ...act, isCurrent: false }));

    const existingActIndex = activities.findIndex(act => act.os === os && act.browser === browser);
    if (existingActIndex !== -1) {
      activities[existingActIndex].loginTime = timeStr;
      activities[existingActIndex].validUpto = validStr;
      activities[existingActIndex].location = locationStr;
      activities[existingActIndex].ip = ipData.ip;
      activities[existingActIndex].isCurrent = true;
      const [updatedAct] = activities.splice(existingActIndex, 1);
      activities.unshift(updatedAct);
    } else {
      const newActivity = {
        id: Date.now(),
        os,
        ip: ipData.ip,
        browser,
        location: locationStr,
        loginTime: timeStr,
        validUpto: validStr,
        loginWith: 'UserId',
        loginService: 'JanParichay',
        isCurrent: true
      };
      activities.unshift(newActivity);
    }
    localStorage.setItem('recent_activities', JSON.stringify(activities));

    localStorage.setItem('mp_user', JSON.stringify({
      username,
      name: username.split('@')[0].split('.').join(' ').toUpperCase(),
      mobile: '9955634664',
    }))
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSignIn} noValidate>
      <Input
        id="un-username"
        label="Enter Username"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />

      {!passlessAuth && (
        <PasswordInput
          id="un-password"
          label="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      )}

      <div className="d-flex justify-content-between mb-3" style={{ marginTop: -6 }}>
        <a
          href="#"
          className="link-blue"
          onClick={e => { e.preventDefault(); onForgetUserId() }}
        >
          Forget User Id
        </a>
        <a
          href="#"
          className="link-blue"
          onClick={e => { e.preventDefault(); onForgotPassword() }}
        >
          Forgot Password
        </a>
      </div>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="passless"
          checked={passlessAuth}
          onChange={e => {
            setPasslessAuth(e.target.checked)
            if (e.target.checked) setPassword('')
          }}
        />
        <label className="form-check-label" htmlFor="passless" style={{ fontSize: '0.85rem' }}>
          Password Less Authentication
        </label>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="consent-username"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="consent-username" style={{ fontSize: '0.85rem' }}>
          I consent to MeriPehchaan{' '}
          <a href="#" className="link-blue" style={{ fontSize: 'inherit' }}>terms of use.</a>
        </label>
      </div>

      <button
        type="submit"
        className={`btn-mp-primary${canSubmit ? ' is-active' : ''}`}
      >
        Sign In
      </button>
    </form>
  )
}
