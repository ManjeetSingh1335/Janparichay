import React, {useState, useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import analyticsLogo from '../images/analytics-logo.png'
import chromeLogo from '../images/chrome.png'
import edgeLogo from '../images/edge.png'
import firefoxLogo from '../images/firefox.png'
import windowsLogo from '../images/windows.jpg'
import androidLogo from '../images/android.png'
import macosLogo from '../images/macOS.png'
import iosLogo from '../images/ios.png'
import '../AccountActivity.css'

function DeviceOSIcon({ os }) {
  if (os === 'Windows') return <img src={windowsLogo} alt="Windows" className="device-os-icon" />;
  if (os === 'Android') return <img src={androidLogo} alt="Android" className="device-os-icon" />;
  if (os === 'macOS')   return <img src={macosLogo}   alt="macOS"   className="device-os-icon" />;
  if (os === 'iOS')     return <img src={iosLogo}     alt="iOS"     className="device-os-icon" />;
  let iconClass = 'bi-laptop';
  if (os === 'Linux') iconClass = 'bi-ubuntu';
  return <i className={`bi ${iconClass}`} style={{ fontSize: '18px', color: '#64748b' }}></i>;
}

function DeviceBrowserIcon({ browser }) {
  if (browser === 'Chrome')  return <img src={chromeLogo}  alt="Chrome"  className="device-browser-logo-img" />;
  if (browser === 'Edge')    return <img src={edgeLogo}    alt="Edge"    className="device-browser-logo-img" />;
  if (browser === 'Firefox') return <img src={firefoxLogo} alt="Firefox" className="device-browser-logo-img" />;
  return <i className="bi bi-globe" style={{ fontSize: '28px', color: '#64748b' }}></i>;
}
function AnalyticsLogo() {
  return (
    <div className="analytics-logo-wrapper">
      <img src={analyticsLogo} alt="Analytics Logo" className="analytics-icon-img" />
    </div>
  )
}


function SortDiamond({ active, direction }) {
  const upFill = (active && direction === 'asc') ? '#ffffff' : 'rgba(255,255,255,0.4)';
  const downFill = (active && direction === 'desc') ? '#ffffff' : 'rgba(255,255,255,0.4)';
  return (
    <svg className="sort-diamond-svg" width="10" height="14" viewBox="0 0 10 14" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
      <path d="M5 0 L10 6 L0 6 Z" fill={upFill} />
      <path d="M5 14 L10 8 L0 8 Z" fill={downFill} />
    </svg>
  );
}

function AccountActivity() {
  const location = useLocation()
  const [showRemembered, setShowRemembered] = useState(false)
  const [limitRecent, setLimitRecent] = useState(6)
  const [limitRemembered, setLimitRemembered] = useState(6)
  
  //sort states
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });
  const [sortConfigRemembered, setSortConfigRemembered] = useState({ key: null, direction: 'desc' });

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageRemembered, setCurrentPageRemembered] = useState(1);

  const rememberedSectionRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.openRemembered) {
      setShowRemembered(true)
    }
  }, [location.state])

  useEffect(() => {
    if (showRemembered) {
      setTimeout(() => {
        rememberedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showRemembered])

  const getInitialDevices = () => {
    const existing = localStorage.getItem('user_devices');
    if (existing) {
      try {
        return JSON.parse(existing);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  };

  const getInitialActivities = () => {
    const existing = localStorage.getItem('recent_activities');
    if (existing) {
      try {
        return JSON.parse(existing);
      } catch (e) {
        console.error(e);
      }
    }
    
    //generate default/current active session to ensure real data is shown
    const now = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    const timeStr = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const validTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
    const validStr = `${pad(validTime.getDate())}-${pad(validTime.getMonth() + 1)}-${validTime.getFullYear()} ${pad(validTime.getHours())}:${pad(validTime.getMinutes())}:${pad(validTime.getSeconds())}`;
    
    const defaultAct = [{
      id: Date.now(),
      os: '',
      ip: '',
      browser: '',
      location: '',
      loginTime: '',
      validUpto: '',
      loginWith: '',
      loginService: '',
      isCurrent: false
    }];
    localStorage.setItem('recent_activities', JSON.stringify(defaultAct));
    return defaultAct;
  };

  const getInitialRemembered = () => {
    const existing = localStorage.getItem('remembered_devices');
    if (existing) {
      try {
        return JSON.parse(existing);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  };

  const [devices, setDevices] = useState(getInitialDevices);
  const [activities, setActivities] = useState(getInitialActivities);
  const [remembered, setRemembered] = useState(getInitialRemembered);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDevices = getInitialDevices();
      const currentActivities = getInitialActivities();
      const currentRemembered = getInitialRemembered();
      
      setDevices(currentDevices);
      setActivities(currentActivities);
      setRemembered(currentRemembered);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogoutAll = () => {
    if (confirm('Are you sure you want to logout from all active sessions?')) {
      const updated = activities.filter(act => act.isCurrent);
      setActivities(updated);
      localStorage.setItem('recent_activities', JSON.stringify(updated));
      alert('Successfully logged out from all other sessions.')
    }
  }

  const handleIndividualLogout = (id) => {
    if (confirm('Are you sure you want to logout from this session?')) {
      const updated = activities.filter(act => act.id !== id);
      setActivities(updated);
      localStorage.setItem('recent_activities', JSON.stringify(updated));
    }
  }

  const handleLoadRememberDevices = () => {
    setShowRemembered(true)
  }

  const handleRemoveAllDevices = () => {
    if (confirm('Are you sure you want to remove all remembered devices?')) {
      setRemembered([]);
      localStorage.setItem('remembered_devices', JSON.stringify([]));
      alert('All remembered devices removed.')
    }
  }

  const handleRemoveIndividualRemembered = (id) => {
    if (confirm('Are you sure you want to remove this remembered device?')) {
      const updated = remembered.filter(r => r.id !== id);
      setRemembered(updated);
      localStorage.setItem('remembered_devices', JSON.stringify(updated));
    }
  }

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSortRemembered = (key) => {
    let direction = 'asc';
    if (sortConfigRemembered.key === key && sortConfigRemembered.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfigRemembered({ key, direction });
  };


  const parseDate = (str) => {
    if (!str) return 0;
    const [datePart, timePart] = str.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');
    return new Date(year, month - 1, day, hours, minutes, seconds).getTime();
  };


  const sortedActivities = React.useMemo(() => {
    let sortableItems = [...activities];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'loginTime' || sortConfig.key === 'validUpto') {
          return sortConfig.direction === 'asc' 
            ? parseDate(a[sortConfig.key]) - parseDate(b[sortConfig.key])
            : parseDate(b[sortConfig.key]) - parseDate(a[sortConfig.key]);
        }
        const valA = String(a[sortConfig.key] || '').toLowerCase();
        const valB = String(b[sortConfig.key] || '').toLowerCase();
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [activities, sortConfig]);


  const sortedRemembered = React.useMemo(() => {
    let sortableItems = [...remembered];
    if (sortConfigRemembered.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfigRemembered.key === 'rememberTime') {
          return sortConfigRemembered.direction === 'asc' 
            ? parseDate(a[sortConfigRemembered.key]) - parseDate(b[sortConfigRemembered.key])
            : parseDate(b[sortConfigRemembered.key]) - parseDate(a[sortConfigRemembered.key]);
        }
        const valA = String(a[sortConfigRemembered.key] || '').toLowerCase();
        const valB = String(b[sortConfigRemembered.key] || '').toLowerCase();
        if (valA < valB) return sortConfigRemembered.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfigRemembered.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [remembered, sortConfigRemembered]);

  const totalRecent = sortedActivities.length;
  const totalRecentPages = Math.ceil(totalRecent / limitRecent) || 1;
  const startRecentIndex = totalRecent === 0 ? 0 : (currentPage - 1) * limitRecent + 1;
  const endRecentIndex = Math.min(currentPage * limitRecent, totalRecent);
  
  const paginatedActivities = React.useMemo(() => {
    return sortedActivities.slice((currentPage - 1) * limitRecent, currentPage * limitRecent);
  }, [sortedActivities, currentPage, limitRecent]);


  useEffect(() => {
    setCurrentPage(1);
  }, [limitRecent]);

  const totalRemembered = sortedRemembered.length;
  const totalRememberedPages = Math.ceil(totalRemembered / limitRemembered) || 1;
  const startRememberedIndex = totalRemembered === 0 ? 0 : (currentPageRemembered - 1) * limitRemembered + 1;
  const endRememberedIndex = Math.min(currentPageRemembered * limitRemembered, totalRemembered);

  const paginatedRemembered = React.useMemo(() => {
    return sortedRemembered.slice((currentPageRemembered - 1) * limitRemembered, currentPageRemembered * limitRemembered);
  }, [sortedRemembered, currentPageRemembered, limitRemembered]);

  useEffect(() => {
    setCurrentPageRemembered(1);
  }, [limitRemembered]);

  return (
    <>
      <div className="activity-section-header">
        <h3 className="activity-section-title">RECENT ACTIVITIES</h3>
      </div>
      <div className="activity-analytics-toolbar">
        <AnalyticsLogo />
        <button type="button" className="btn-logout-all" onClick={handleLogoutAll}>
          Logout from all Sessions
        </button>
      </div>
      <div className="table-controls-row">
        <select 
          className="table-limit-select" 
          value={limitRecent} 
          onChange={(e) => setLimitRecent(Number(e.target.value))}
        >
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      
      <div className="activity-table-wrapper">
        <table className="activity-data-table">
          <thead>
            <tr>
              <th className={sortConfig.key === 'os' ? 'active-header' : ''} onClick={() => handleSort('os')}>
                Operating System <SortDiamond active={sortConfig.key === 'os'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'ip' ? 'active-header' : ''} onClick={() => handleSort('ip')}>
                IP <SortDiamond active={sortConfig.key === 'ip'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'browser' ? 'active-header' : ''} onClick={() => handleSort('browser')}>
                Browser <SortDiamond active={sortConfig.key === 'browser'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'location' ? 'active-header' : ''} onClick={() => handleSort('location')}>
                Location <SortDiamond active={sortConfig.key === 'location'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'loginTime' ? 'active-header' : ''} onClick={() => handleSort('loginTime')}>
                Login Time <SortDiamond active={sortConfig.key === 'loginTime'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'validUpto' ? 'active-header' : ''} onClick={() => handleSort('validUpto')}>
                Valid Upto <SortDiamond active={sortConfig.key === 'validUpto'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'loginWith' ? 'active-header' : ''} onClick={() => handleSort('loginWith')}>
                Login With <SortDiamond active={sortConfig.key === 'loginWith'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'loginService' ? 'active-header' : ''} onClick={() => handleSort('loginService')}>
                Login Service <SortDiamond active={sortConfig.key === 'loginService'} direction={sortConfig.direction} />
              </th>
              <th>Logout</th>
            </tr>
          </thead>
          <tbody>
            {paginatedActivities.length === 0 ? (
              <tr>
                <td colSpan={9} className="activity-table-no-data">
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedActivities.map((act) => (
                <tr key={act.id}>
                  <td>{act.os}</td>
                  <td>{act.ip}</td>
                  <td>{act.browser}</td>
                  <td>{act.location}</td>
                  <td>
                    <div className="login-time-cell">
                      {act.loginTime.split(' ')[0]}
                      <br />
                      <span className="login-time-sub">{act.loginTime.split(' ')[1]}</span>
                    </div>
                  </td>
                  <td>
                    <div className="login-time-cell">
                      {act.validUpto.split(' ')[0]}
                      <br />
                      <span className="login-time-sub">{act.validUpto.split(' ')[1]}</span>
                    </div>
                  </td>
                  <td>{act.loginWith}</td>
                  <td>{act.loginService}</td>
                  <td>
                    {act.isCurrent ? (
                      <span className="current-session-label">
                        Current
                        <br />
                        Session
                      </span>
                    ) : (
                      <button type="button" className="btn-table-logout" onClick={() => handleIndividualLogout(act.id)}>
                        Logout
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer-row">
        <span className="table-entries-info">
          Showing {startRecentIndex} to {endRecentIndex} of {totalRecent} entry
        </span>
        <div className="table-pagination-group">
          <button 
            type="button" 
            className="btn-pagination-nav" 
            onClick={() => setCurrentPage(1)} 
            disabled={currentPage === 1}
          >
            «
          </button>
          <button 
            type="button" 
            className="btn-pagination-nav" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {totalRecent > 0 && (
            <button type="button" className="btn-pagination-nav active-page">
              {currentPage}
            </button>
          )}
          <button 
            type="button" 
            className="btn-pagination-nav" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalRecentPages))} 
            disabled={currentPage === totalRecentPages}
          >
            ›
          </button>
          <button 
            type="button" 
            className="btn-pagination-nav" 
            onClick={() => setCurrentPage(totalRecentPages)} 
            disabled={currentPage === totalRecentPages}
          >
            »
          </button>
        </div>
      </div>

      <div className="activity-section-header">
        <h3 className="activity-section-title">USER DEVICES</h3>
      </div>
      <div className="user-devices-grid">
        {devices.map((device) => (
          <div key={device.id} className="device-card-item">
            <div className="device-card-os-row">
              <DeviceOSIcon os={device.os} />
              <span>{device.os}</span>
            </div>
            <div className="device-browser-logo-container">
              <DeviceBrowserIcon browser={device.browser} />
            </div>
            <h4 className="device-card-browser-name">{device.browser}</h4>
            <p className="device-card-login-time">
              {device.time.split(' ')[0]}
              <br />
              {device.time.split(' ')[1]}
            </p>
          </div>
        ))}
      </div>
       <hr/>

      <div className="btn-load-remembered-row">
        <button type="button" className="btn-load-remembered" onClick={handleLoadRememberDevices}>
          Load Remember Devices
        </button>
      </div>
      <br/>
      <br/>
     

      {showRemembered && (
        <div className="activity-section" ref={rememberedSectionRef}>
          <div className="activity-section-header">
            <h3 className="activity-section-title">REMEMBERED DEVICES</h3>
          </div>
          <div className="btn-remove-all-row">
            <button type="button" className="btn-remove-all-devices" onClick={handleRemoveAllDevices}>
              Remove all
            </button>
          </div>
          <div className="table-controls-row">
            <select 
              className="table-limit-select" 
              value={limitRemembered} 
              onChange={(e) => setLimitRemembered(Number(e.target.value))}
            >
              <option value={6}>6</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="activity-table-wrapper">
            <table className="activity-data-table">
              <thead>
                <tr>
                  <th className={sortConfigRemembered.key === 'os' ? 'active-header' : ''} onClick={() => handleSortRemembered('os')}>
                    Operating System <SortDiamond active={sortConfigRemembered.key === 'os'} direction={sortConfigRemembered.direction} />
                  </th>
                  <th className={sortConfigRemembered.key === 'ip' ? 'active-header' : ''} onClick={() => handleSortRemembered('ip')}>
                    IP <SortDiamond active={sortConfigRemembered.key === 'ip'} direction={sortConfigRemembered.direction} />
                  </th>
                  <th className={sortConfigRemembered.key === 'browser' ? 'active-header' : ''} onClick={() => handleSortRemembered('browser')}>
                    Browser <SortDiamond active={sortConfigRemembered.key === 'browser'} direction={sortConfigRemembered.direction} />
                  </th>
                  <th className={sortConfigRemembered.key === 'loginWith' ? 'active-header' : ''} onClick={() => handleSortRemembered('loginWith')}>
                    Login With <SortDiamond active={sortConfigRemembered.key === 'loginWith'} direction={sortConfigRemembered.direction} />
                  </th>
                  <th className={sortConfigRemembered.key === 'rememberTime' ? 'active-header' : ''} onClick={() => handleSortRemembered('rememberTime')}>
                    Remember Time <SortDiamond active={sortConfigRemembered.key === 'rememberTime'} direction={sortConfigRemembered.direction} />
                  </th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRemembered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="activity-table-no-data">
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  paginatedRemembered.map((rem) => (
                    <tr key={rem.id}>
                      <td>{rem.os}</td>
                      <td>{rem.ip}</td>
                      <td>{rem.browser}</td>
                      <td>{rem.loginWith}</td>
                      <td>
                        <div className="login-time-cell">
                          {rem.rememberTime.split(' ')[0]}
                          <br />
                          <span className="login-time-sub">{rem.rememberTime.split(' ')[1]}</span>
                        </div>
                      </td>
                      <td>
                        <button type="button" className="btn-table-logout" onClick={() => handleRemoveIndividualRemembered(rem.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="table-footer-row">
            <span className="table-entries-info">
              Showing {startRememberedIndex} to {endRememberedIndex} of {totalRemembered} entries
            </span>
            <div className="table-pagination-group">
              <button 
                type="button" 
                className="btn-pagination-nav" 
                onClick={() => setCurrentPageRemembered(1)} 
                disabled={currentPageRemembered === 1}
              >
                «
              </button>
              <button 
                type="button" 
                className="btn-pagination-nav" 
                onClick={() => setCurrentPageRemembered(prev => Math.max(prev - 1, 1))} 
                disabled={currentPageRemembered === 1}
              >
                ‹
              </button>
              {totalRemembered > 0 && (
                <button type="button" className="btn-pagination-nav active-page">
                  {currentPageRemembered}
                </button>
              )}
              <button 
                type="button" 
                className="btn-pagination-nav" 
                onClick={() => setCurrentPageRemembered(prev => Math.min(prev + 1, totalRememberedPages))} 
                disabled={currentPageRemembered === totalRememberedPages}
              >
                ›
              </button>
              <button 
                type="button" 
                className="btn-pagination-nav" 
                onClick={() => setCurrentPageRemembered(totalRememberedPages)} 
                disabled={currentPageRemembered === totalRememberedPages}
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default AccountActivity