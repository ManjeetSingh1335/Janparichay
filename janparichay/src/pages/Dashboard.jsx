import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../Dashboard.css'
import {useDashboard} from '../context/DashboardContext.jsx'
import chromeLogo from '../images/chrome.png'
import edgeLogo from '../images/edge.png'
import firefoxLogo from '../images/firefox.png'
import androidLogo from '../images/android.png'
import macosLogo from '../images/macOS.png'
import iosLogo from '../images/ios.png'
import windowsLogo from '../images/windows.jpg'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function Dashboard() {
  const navigate = useNavigate();
  const { settings, updateSetting, logoutAll } = useDashboard();
  const [showUpdatePassword, setShowUpdatePassword] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [hoveredDataset, setHoveredDataset] = React.useState(null);

  const getLoggedDevicesCount = () => {
    const existing = localStorage.getItem('user_devices');
    if (existing) {
      try {
        const devices = JSON.parse(existing);
        const unique = [];
        devices.forEach(d => {
          if (!unique.some(u => u.os === d.os)) {
            unique.push(d);
          }
        });
        return unique.length || 1;
      } catch (e) {
        return 1;
      }
    }
    return 1;
  };

  const activityCards = [
    { key: 'logged', label: 'Logged In Devices', value: getLoggedDevicesCount(), className: 'card-indigo' },
    { key: 'remember', label: 'Remember Devices', value: 0, className: 'card-teal' },
    { key: 'consent', label: 'Consent to Service', value: 0, className: 'card-red' },
    { key: 'mfa', label: 'Multi-factor Device Configured', value: 0, className: 'card-orange' },
  ];

  const getLatestActivity = () => {
    const existing = localStorage.getItem('recent_activities');
    if (existing) {
      try {
        const activities = JSON.parse(existing);
        const current = activities.find(a => a.isCurrent) || activities[0];
        if (current) {
          return {
            os: current.os || 'Windows',
            browser: current.browser || 'Chrome',
            time: current.loginTime || '06-07-2026 06:16:19'
          };
        }
      } catch (e) {
        console.error(e);
      }
    }
    return { os: 'Windows', browser: 'Chrome', time: '06-07-2026 06:16:19' };
  };

  const latestActivity = getLatestActivity();

  const handleCardClick=(key)=>{
    if(key==='logged'){
      navigate('/dashboard/activity');
    } else if(key==='remember'){
      navigate('/dashboard/activity', {state:{openRemembered:true}});
    } else if(key==='consent'){
      navigate('/dashboard/consent');
    }
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-section-header">
        <h2>Frequently Used Services</h2>
      </div>
      <div className="services-panel">
        <p className="services-empty-text">No Recent Services Found !</p>
        <a href="#services" className="view-all-link">View all Services...</a>
      </div>

      <div className="dashboard-section-header">
        <h2>Activities</h2>
      </div>

      <div className="dashboard-grid">

        <div className="activity-cards-column">
          {activityCards.map((card)=>(
            <div 
              key={card.key} 
              className={`activity-card ${card.className} ${card.key === 'mfa' ? 'non-clickable' : ''}`}
              onClick={() => card.key !== 'mfa' && handleCardClick(card.key)}
            >
              <p className="activity-card-label">{card.label}</p>
              <p className="activity-card-value">{card.value}</p>
              {card.key !== 'mfa' && (
                <span className="activity-card-arrow">
                  <i className="bi bi-arrow-right"></i>
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="dashboard-middle-column">

          <div className="dashboard-panel-1">
            <h3 className="panel-title-1">Current Login Activity</h3>
            <div className="login-activity-row">
              <div className="login-activity-item">
                {latestActivity.os === 'Windows' ? (
                  <img src={windowsLogo} alt="Windows" className="login-activity-icon-img" />
                ) : latestActivity.os === 'Android' ? (
                  <img src={androidLogo} alt="Android" className="login-activity-icon-img" />
                ) : latestActivity.os === 'macOS' ? (
                  <img src={macosLogo} alt="macOS" className="login-activity-icon-img" />
                ) : latestActivity.os === 'iOS' ? (
                  <img src={iosLogo} alt="iOS" className="login-activity-icon-img" />
                ) : latestActivity.os === 'Linux' ? (
                  <i className="bi bi-ubuntu login-activity-icon-fallback"></i>
                ) : (
                  <i className="bi bi-laptop login-activity-icon-fallback"></i>
                )}
                <p className="login-activity-label">{latestActivity.os}</p>
              </div>

              <div className="login-activity-divider"></div>

              <div className="login-activity-item">
                {latestActivity.browser === 'Chrome' ? (
                  <img src={chromeLogo} alt="Chrome" className="login-activity-icon-img" />
                ) : latestActivity.browser === 'Edge' ? (
                  <img src={edgeLogo} alt="Edge" className="login-activity-icon-img" />
                ) : latestActivity.browser === 'Firefox' ? (
                  <img src={firefoxLogo} alt="Firefox" className="login-activity-icon-img" />
                ) : latestActivity.browser === 'Safari' ? (
                  <i className="bi bi-compass login-activity-icon-fallback"></i>
                ) : (
                  <i className="bi bi-globe login-activity-icon-fallback"></i>
                )}
                <p className="login-activity-label">{latestActivity.browser}</p>
                <p className="login-activity-time">{latestActivity.time}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-panel-2">
            <h3 className="panel-title-2">User Devices — Operating Systems &amp; Browsers</h3>
            <div className="donut-chart-wrapper">
              <div className="chartjs-donut-container">
                <Doughnut
                  data={{
                    labels: [latestActivity.os, latestActivity.browser],
                    datasets: [
                      {
                        label: 'Operating System',
                        data: [100],
                        backgroundColor: ['#4a7fb5'],
                        hoverBackgroundColor: ['#3a6a9f'],
                        borderWidth: 0,
                        weight: 8,
                        hoverOffset: 0,
                      },
                      {
                        label: 'Spacer',
                        data: [100],
                        backgroundColor: ['transparent'],
                        hoverBackgroundColor: ['transparent'],
                        borderWidth: 0,
                        weight: 2,
                        hoverOffset: 0,
                      },
                      {
                        label: 'Browser',
                        data: [100],
                        backgroundColor: ['#6b9fd4'],
                        hoverBackgroundColor: ['#5a8ec0'],
                        borderWidth: 0,
                        weight: 8,
                        hoverOffset: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: '45%',
                    onHover: (event, elements) => {
                      if (elements && elements.length > 0) {
                        setHoveredDataset(elements[0].datasetIndex);
                      } else {
                        setHoveredDataset(null);
                      }
                    },
                    interaction: {
                      mode: 'point',
                      intersect: true,
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: false,
                      },
                    },
                    hover: {
                      mode: 'point',
                      intersect: true
                    },
                    animation: {
                      animateRotate: true,
                      duration: 800,
                    },
                  }}
                />
                <div className={`chartjs-ring-label inner-ring-label ${hoveredDataset === 2 ? 'active' : ''}`}>
                  └───────{latestActivity.browser}
                </div>
                <div className={`chartjs-ring-label outer-ring-label ${hoveredDataset === 0 ? 'active' : ''}`}>
                  └───────{latestActivity.os}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="settings-column">
          <h3 className="panel-title">Settings</h3>

          <div className="settings-panel">

            <div className="settings-row">
              <span className="settings-label">
                <i className="bi bi-bell settings-icon"></i>
                New Login Device Alert
                <i className="bi bi-info-circle settings-info"></i>
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.newDeviceAlert}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      logoutAll();
                    } else {
                      updateSetting('newDeviceAlert', true);
                    }
                  }}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-row-wrapper" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div className="settings-row">
                <span className="settings-label">
                  <i className="bi bi-lock settings-icon"></i>
                  Update Password
                  <i className="bi bi-info-circle settings-info"></i>
                </span>
                <button
                  type="button"
                  className="settings-gear-btn"
                  onClick={() => setShowUpdatePassword(!showUpdatePassword)}
                  style={{ transform: showUpdatePassword ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease' }}
                >
                  <i className="bi bi-gear"></i>
                </button>
              </div>

              {showUpdatePassword && (
                <div className="update-password-card" style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '8px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {/* Current Password */}
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      className="form-control update-password-input"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      style={{
                        paddingRight: '40px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        height: '42px',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    />
                    <span
                      onClick={() => setShowCurrent(!showCurrent)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#64748b'
                      }}
                    >
                      <i className={`bi ${showCurrent ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                    </span>
                  </div>

                  {/* New Password */}
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      type={showNew ? 'text' : 'password'}
                      className="form-control update-password-input"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{
                        paddingRight: '40px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        height: '42px',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    />
                    <span
                      onClick={() => setShowNew(!showNew)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#64748b'
                      }}
                    >
                      <i className={`bi ${showNew ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                    </span>
                  </div>

                  {/* Confirm Password */}
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      type="password"
                      className="form-control update-password-input"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        height: '42px',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (!currentPassword || !newPassword || !confirmPassword) {
                          alert('Please fill in all password fields.');
                          return;
                        }
                        if (newPassword !== confirmPassword) {
                          alert('New passwords do not match.');
                          return;
                        }
                        alert('Password updated successfully (mock)!');
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                        setShowUpdatePassword(false);
                      }}
                      style={{
                        backgroundColor: '#2563eb',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 24px',
                        fontSize: '14.5px',
                        fontWeight: '600',
                        color: '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="settings-row">
              <span className="settings-label">
                <i className="bi bi-person settings-icon"></i>
                Account Deactivation
                <i className="bi bi-info-circle settings-info"></i>
              </span>
              <button type="button" className="btn-deactivate">Deactivate</button>
            </div>

            <div className="settings-row">
              <span className="settings-label">
                <i className="bi bi-lock settings-icon"></i>
                Passwordless Authentication
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.passwordlessAuth}
                  onChange={(e) => updateSetting('passwordlessAuth', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-row">
              <span className="settings-label">
                <i className="bi bi-geo-alt settings-icon"></i>
                Manage GeoFencing
                <i className="bi bi-info-circle settings-info"></i>
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.geoFencing}
                  onChange={(e) => updateSetting('geoFencing', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-row">
              <span className="settings-label">
                <i className="bi bi-shield settings-icon"></i>
                Backup Code
                <i className="bi bi-info-circle settings-info"></i>
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.backupCode}
                  onChange={(e) => updateSetting('backupCode', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-row">
              <span className="settings-label">
                <i className="bi bi-key settings-icon"></i>
                Multi-Factor
                <i className="bi bi-info-circle settings-info"></i>
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.multiFactor}
                  onChange={(e) => updateSetting('multiFactor', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
