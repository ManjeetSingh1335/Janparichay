import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../Dashboard.css'
import {useDashboard} from '../context/DashboardContext.jsx'
import { clearPendingUser } from '../utils/backupAuthentication'
import {useLanguage} from '../context/LanguageContext'
import EyeIcon from '../components/EyeIcon'
import chromeLogo from '../images/chrome.png'
import edgeLogo from '../images/edge.png'
import firefoxLogo from '../images/firefox.png'
import androidLogo from '../images/android.png'
import macosLogo from '../images/macOS.png'
import iosLogo from '../images/ios.png'
import windowsLogo from '../images/windows.jpg'
import qrCodeImg from '../images/qr_code.png'
import {Doughnut} from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend);

const createBackupCodes=()=>{
  const codes=new Set();
  while(codes.size<6){
    const value=new Uint32Array(1);
    crypto.getRandomValues(value);
    codes.add(String(100000+(value[0]%900000)));
  }
  return [...codes].map(code=>({code, used: false}));
};

const loadBackupCodes=()=>{
  try{
    const savedCodes=JSON.parse(localStorage.getItem('mp_backup_codes') || '[]');
    return Array.isArray(savedCodes)? savedCodes : [];
  }catch{
    return [];
  }
};


function Dashboard() {

  const {t}=useLanguage()
  const navigate=useNavigate();
  const {settings, updateSetting, logoutAll}=useDashboard();

  const [showUpdatePassword, setShowUpdatePassword]=React.useState(false);
  const [currentPassword, setCurrentPassword]=React.useState('');
  const [newPassword, setNewPassword]=React.useState('');
  const [confirmPassword, setConfirmPassword]=React.useState('');
  const [showCurrent, setShowCurrent]=React.useState(false);
  const [showNew, setShowNew]=React.useState(false);

  const [hoveredDataset, setHoveredDataset]=React.useState(null);
  const [clickedDataset, setClickedDataset]=React.useState(null);

  const [backupCodes, setBackupCodes]=React.useState(loadBackupCodes);
  const [showBackupCodePanel, setShowBackupCodePanel]=React.useState(false);

  const [showMultiFactorPanel, setShowMultiFactorPanel]=React.useState(settings.multiFactor);
  const [showConfirmModal, setShowConfirmModal]=React.useState(false);
  const [mfaDevicesCount, setMfaDevicesCount]=React.useState(()=>{
    if (!settings.multiFactor) return 0;
    const saved=localStorage.getItem('mp_mfa_devices_count');
    return saved!==null? parseInt(saved, 10) : 0;
  });

  const [showMfaSetup, setShowMfaSetup] = React.useState(false);
  const [mfaTimer, setMfaTimer] = React.useState(50);
  const [authKey, setAuthKey] = React.useState('QARIORBG');
  const [mfaToken, setMfaToken] = React.useState('');
  const [showMfaToken, setShowMfaToken] = React.useState(false);

  const generateRandomAuthKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  React.useEffect(() => {
    localStorage.setItem('mp_mfa_devices_count', mfaDevicesCount.toString());
  }, [mfaDevicesCount]);

  React.useEffect(() => {
    let interval;
    if (showMfaSetup && mfaTimer > 0) {
      interval = setInterval(() => {
        setMfaTimer(prev => prev - 1);
      }, 1000);
    } else if (showMfaSetup && mfaTimer === 0) {
      setMfaTimer(59);
      setAuthKey(generateRandomAuthKey());
    }
    return () => clearInterval(interval);
  }, [showMfaSetup, mfaTimer]);

  const handleConfirmYes = () => {
    setShowConfirmModal(false);
    setShowMfaSetup(true);
    setMfaTimer(50);
    setAuthKey(generateRandomAuthKey());
  };

  const handleMfaSubmit = (e) => {
    e.preventDefault();
    if (!mfaToken || mfaToken.length !== 6 || !/^\d+$/.test(mfaToken)) {
      alert('Please enter a valid 6-digit verification code.');
      return;
    }
    setMfaDevicesCount(prev => prev + 1);
    setShowMfaSetup(false);
    setMfaToken('');
    alert('MFA Device added successfully!');
  };

  React.useEffect(()=>{
    localStorage.setItem('mp_backup_codes', JSON.stringify(backupCodes));
  }, [backupCodes]);

  const regenerateBackupCodes=()=>setBackupCodes(createBackupCodes());

  const downloadBackupCodes=async()=>{

    const content=[
      'JanParichay Backup Codes',
      'Keep these codes in a safe place. Each code can be used only once.',
      '',
      ...backupCodes.map(({code, used})=> `${code}${used? ' (already used)' : ''}`),
    ].join('\n');

    const blob=new Blob([content], {type: 'text/plain'});

    if('showSaveFilePicker' in window){
      try{
        const fileHandle=await window.showSaveFilePicker({
          suggestedName: 'BackupCodes.txt',
          types: [{
            description: 'Text file',
            accept: { 'text/plain': ['.txt'] },
          }],
        });

        const writable=await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        return;
      }catch(error){
        if(error.name==='AbortError') return;
      }
    }

    const link=document.createElement('a');
    link.href=URL.createObjectURL(blob);
    link.download='BackupCodes.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  const handleBackupCodeToggle=(enabled)=>{
    updateSetting('backupCode', enabled);
    updateSetting('backupCodeEnabled', enabled);
    if(enabled && backupCodes.length===0) regenerateBackupCodes();
    if(!enabled) clearPendingUser();
    setShowBackupCodePanel(enabled);
  };

  const getLoggedDevicesCount=()=>{
    const existing=localStorage.getItem('user_devices');
    if(existing){
      try{
        const devices=JSON.parse(existing);
        const unique=[];
        devices.forEach(d=>{
          if(!unique.some(u=> u.os===d.os)){
            unique.push(d);
          }
        });
        return unique.length || 1;
      }catch(e){
        return "error";
      }
    }
    return 1;
  };

  const getRememberedDevicesCount=()=>{
    const existing=localStorage.getItem('remembered_devices');
    if(existing){
      try{
        const devices=JSON.parse(existing);
        return Array.isArray(devices) ? devices.length : 0;
      }catch(e){
        return 0;
      }
    }
    return 0;
  };

  const activityCards=[
    {key: 'logged', label: t('dashboard_card_logged_in_devices'), value: getLoggedDevicesCount(), className: 'card-indigo'},
    {key: 'remember', label: t('dashboard_card_remember_devices'), value: getRememberedDevicesCount(), className: 'card-teal'},
    {key: 'consent', label: t('dashboard_card_consent_to_service'), value: 0, className: 'card-red'},
    {key: 'mfa', label: t('dashboard_card_mfa_configured'), value: settings.multiFactor ? mfaDevicesCount : 0, className: 'card-orange'},
  ];

  const getLatestActivity=()=>{
    const existing=localStorage.getItem('recent_activities');
    if(existing){
      try{
        const activities=JSON.parse(existing);
        const current=activities.find(a=> a.isCurrent) || activities[0];
        if(current){
          return{
            os: current.os || '',
            browser: current.browser || '',
            time: current.loginTime || ''
          };
        }
      }catch(e){
        console.error(e);
      }
    }
    return {os: 'Windows', browser: 'Chrome', time: '06-07-2026 06:16:19'};
  };

  const latestActivity=getLatestActivity();

  const handleCardClick=(key)=>{
    if(key==='logged'){
      navigate('/dashboard/activity');
    }else if(key==='remember'){
      navigate('/dashboard/activity', {state:{openRemembered:true}});
    }else if(key==='consent'){
      navigate('/dashboard/consent');
    }
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-section-header">
        <h2>{t('dashboard_section_heading_frequently_used_services')}</h2>
      </div>

      <div className="services-panel">
        <p className="services-empty-text">{t('dashboard_no_recent_services')}</p>
        <button type="button" className="view-all-link" onClick={() => navigate('/dashboard/services')}>
          {t('dashboard_view_all_services_link')}
        </button>
      </div>

      <div className="dashboard-section-header">
        <h2>{t('dashboard_section_heading_activities')}</h2>
      </div>

      <div className="dashboard-grid">

        <div className="activity-cards-column">
          {activityCards.map((card)=>(
            <div 
              key={card.key} 
              className={`activity-card ${card.className} ${card.key==='mfa'? 'non-clickable' : ''}`}
              onClick={()=>card.key!=='mfa' && handleCardClick(card.key)}
            >
              <p className="activity-card-label">{card.label}</p>
              <p className="activity-card-value">{card.value}</p>
              {card.key!=='mfa' && (
                <span className="activity-card-arrow">
                  <i className="bi bi-arrow-right"></i>
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="dashboard-middle-column">

          <div className="dashboard-panel-1">
            <h3 className="panel-title-1">{t('dashboard_panel_current_login_activity')}</h3>
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
            <h3 className="panel-title-2">{t('dashboard_panel_user_devices_os_browsers')}</h3>
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
                        hoverBackgroundColor: ['#4a7fb5'],
                        borderWidth: 0,
                        weight: hoveredDataset === 0 ? 13 : 8,
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
                        hoverBackgroundColor: ['#6b9fd4'],
                        borderWidth: 0,
                        weight: hoveredDataset === 2 ? 13 : 8,
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
                        event.native.target.style.cursor = 'pointer';
                      } else {
                        setHoveredDataset(null);
                        event.native.target.style.cursor = 'default';
                      }
                    },
                    onClick: (event, elements) => {
                      if (elements && elements.length > 0) {
                        const idx = elements[0].datasetIndex;
                        if (idx === 1) return;
                        setClickedDataset(prev => prev === idx ? null : idx);
                      } else {
                        setClickedDataset(null);
                      }
                    },
                    interaction: {
                      mode: 'point',
                      intersect: true,
                    },
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false },
                    },
                    hover: {
                      mode: 'point',
                      intersect: true
                    },
                    animation: {
                      animateRotate: true,
                      duration: 300,
                    },
                  }}
                />
                <div className={`chartjs-ring-label inner-ring-label ${hoveredDataset === 2 || clickedDataset === 2 ? 'active' : ''} ${clickedDataset === 2 ? 'clicked' : ''}`}>
                  └───────{latestActivity.browser}
                </div>
                <div className={`chartjs-ring-label outer-ring-label ${hoveredDataset === 0 || clickedDataset === 0 ? 'active' : ''} ${clickedDataset === 0 ? 'clicked' : ''}`}>
                  └───────{latestActivity.os}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="settings-column">

          <h3 className="panel-title">{t('dashboard_settings_heading')}</h3>

          <div className="settings-panel">

            <div className="settings-row">
              <span className="settings-label">
                <i className="bi bi-bell-fill settings-icon"></i>
                {t('dashboard_settings_new_login_device_alert')}
                <i className="bi bi-info-circle-fill settings-info"></i>
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
                  <i className="bi bi-lock-fill settings-icon"></i>
                  {t('dashboard_settings_update_password')}
                  <i className="bi bi-info-circle-fill settings-info"></i>
                </span>
                <button
                  type="button"
                  className="settings-gear-btn"
                  onClick={() => setShowUpdatePassword(!showUpdatePassword)}
                  style={{ transform: showUpdatePassword ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease' }}
                >
                  <i className="bi bi-gear-fill"></i>
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
                      <EyeIcon show={showCurrent} />
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
                      <EyeIcon show={showNew} />
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
                <i className="bi bi-person-fill settings-icon"></i>
                {t('dashboard_settings_account_deactivation')}
                <i className="bi bi-info-circle-fill settings-info"></i>
              </span>
              <button type="button" className="btn-deactivate">{t('dashboard_button_deactivate')}</button>
            </div>

            <div className="settings-row">
              <span className="settings-label">
                <i className="bi bi-lock-fill settings-icon"></i>
                {t('dashboard_settings_passwordless_authentication')}
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
                <i className="bi bi-geo-alt-fill settings-icon"></i>
                {t('dashboard_settings_manage_geofencing')}
                <i className="bi bi-info-circle-fill settings-info"></i>
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={false}
                  disabled
                  aria-label={t('dashboard_settings_manage_geofencing')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-row-wrapper backup-code-wrapper">
              <div className="settings-row">
                <span className="settings-label">
                  <i className="bi bi-shield-shaded settings-icon"></i>
                  {t('dashboard_settings_backup_code')}
                  <i className="bi bi-info-circle-fill settings-info"></i>
                </span>
                {settings.backupCode && (
                  <button
                    type="button"
                    className={`backup-code-panel-toggle${showBackupCodePanel ? ' is-open' : ''}`}
                    onClick={() => setShowBackupCodePanel(open => !open)}
                    aria-label={showBackupCodePanel ? 'Hide backup code details' : 'Show backup code details'}
                    aria-expanded={showBackupCodePanel}
                    title={showBackupCodePanel ? 'Hide backup codes' : 'Show backup codes'}
                  >
                    <i className="bi bi-gear-fill" aria-hidden="true"></i>
                  </button>
                )}
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.backupCode}
                    onChange={(e) => handleBackupCodeToggle(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {settings.backupCode && showBackupCodePanel && (
                <div className="backup-code-panel">
                  <div className="backup-code-legend">
                    <span><i className="backup-code-swatch unused"></i>Unused</span>
                    <span><i className="backup-code-swatch used"></i>Already Used</span>
                  </div>
                  <div className="backup-code-grid">
                    {backupCodes.map(backupCode => (
                      <span
                        key={backupCode.code}
                        className={`backup-code ${backupCode.used ? 'is-used' : ''}`}
                        title={backupCode.used ? 'This backup code has already been used.' : 'Unused backup code'}
                      >
                        {backupCode.code}
                      </span>
                    ))}
                  </div>
                  <div className="backup-code-actions">
                    <button type="button" onClick={regenerateBackupCodes}>Re-Generate Backup Codes</button>
                    <button type="button" onClick={downloadBackupCodes}>Download Backup Codes</button>
                  </div>
                </div>
              )}
            </div>

            <div className="settings-row-wrapper mfa-wrapper">
              <div className="settings-row">
                <span className="settings-label">
                  <i className="bi bi-key-fill settings-icon"></i>
                  {t('dashboard_settings_multi_factor')}
                  <i className="bi bi-info-circle-fill settings-info"></i>
                </span>
                
                {settings.multiFactor && (
                  <button
                    type="button"
                    className={`backup-code-panel-toggle${showMultiFactorPanel? ' is-open' : ''}`}
                    onClick={()=>setShowMultiFactorPanel(open=>!open)}
                    aria-label={showMultiFactorPanel? 'Hide MFA details' : 'Show MFA details'}
                    aria-expanded={showMultiFactorPanel}
                    title={showMultiFactorPanel? 'Hide MFA devices' : 'Configure MFA devices'}
                  >
                    <i className="bi bi-gear-fill" aria-hidden="true"></i>
                  </button>
                )}

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.multiFactor}
                    onChange={(e)=>{
                      const checked = e.target.checked;
                      updateSetting('multiFactor', checked);
                      if(checked){
                        setShowMultiFactorPanel(true);
                      }else{
                        setShowMultiFactorPanel(false);
                        setShowMfaSetup(false);
                        setMfaDevicesCount(0);
                        localStorage.setItem('mp_mfa_devices_count', '0');
                      }
                    }}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {settings.multiFactor && showMultiFactorPanel && (
                <div className="mfa-panel">
                  {!showMfaSetup ? (
                    <div className="mfa-add-row" onClick={() => setShowConfirmModal(true)}>
                      <span className="mfa-add-label">Add More Devices</span>
                      <span className="mfa-plus-box">+</span>
                    </div>
                  ) : (
                    <div className="mfa-setup-container">
                      <h4 className="mfa-setup-title">Add More Devices</h4>
                      <p className="mfa-setup-desc">
                        Please set up an account in Parichay Authenticator app on your device. The account can be set up either by scanning the below QR Code or manually with the two-factor secret key.
                      </p>
                      
                       <div className="mfa-qr-wrapper">
                         <div className="mfa-qr-box empty-qr-space">
                           <span>QR Code Space</span>
                         </div>
                        
                       </div>
 
                       <div className="mfa-auth-key-box empty-key-space">
                         <span>Auth Key Space</span>
                       </div>
                      
                      <p className="mfa-note-text">
                        Note: Kindly check your Parichay Authenticator App to insert Authkey to configure your Account.
                      </p>
                      
                      <p className="mfa-setup-instruction">
                        Once you set up the account, enter the six digit verification code generated by the Parichay Authenticator app
                      </p>
                      
                      <form className="mfa-submit-form" onSubmit={handleMfaSubmit}>
                        <div className="mfa-input-wrapper">
                          <input
                            type={showMfaToken ? "text" : "password"}
                            placeholder="Enter Token"
                            maxLength={6}
                            value={mfaToken}
                            onChange={(e) => setMfaToken(e.target.value.replace(/\D/g, ''))}
                            className="mfa-token-input"
                          />
                          <button
                            type="button"
                            className="mfa-toggle-visibility"
                            onClick={() => setShowMfaToken(!showMfaToken)}
                            aria-label={showMfaToken ? "Hide token" : "Show token"}
                          >
                            <EyeIcon show={showMfaToken} />
                          </button>
                        </div>
                        <button type="submit" className="mfa-submit-btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {showConfirmModal && (
                <div className="mfa-modal-overlay">
                  <div className="mfa-modal-container">
                    <p className="mfa-modal-text">Do you really want to configure New Device?</p>
                      <div className="mfa-modal-buttons">
                        <button className="mfa-btn-yes" onClick={handleConfirmYes}>YES</button>
                        <button className="mfa-btn-no" onClick={()=>setShowConfirmModal(false)}>NO</button>
                      </div>
                  </div>
                </div>
              )}
              
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard