import { useState, useEffect } from 'react';
import { UAParser } from 'ua-parser-js';

export function useLoginSession() {
  const [ipData, setIpData] = useState({
    ip: 'XXX.XXX.XX.XX',
    city: 'Delhi',
    country: 'India',
  });

  useEffect(() => {
    fetch('/api/ip-info')
      .then(res => res.json())
      .then(data => {
        if (data.ip) {
          setIpData({
            ip: data.ip,
            city: data.city || 'Delhi',
            country: data.country_name || 'India',
          });
        }
      })
      .catch(() => {}); 
  }, []);

  function getDeviceInfo() {
    const result = new UAParser().getResult();
    let os = result.os.name || 'Windows';
    if (os === 'Mac OS') os = 'macOS'; 
    const browser = result.browser.name || 'Chrome';
    return { os, browser };
  }

  function recordSession(loginWith) {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timeStr = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ` +
                    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const validTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
    const validStr  = `${pad(validTime.getDate())}-${pad(validTime.getMonth() + 1)}-${validTime.getFullYear()} ` +
                      `${pad(validTime.getHours())}:${pad(validTime.getMinutes())}:${pad(validTime.getSeconds())}`;

    const { os, browser } = getDeviceInfo();

    let city = ipData.city === 'Delhi' ? 'Delhi' : ipData.city;
    const locationStr = `${city},${ipData.country}`;

   
    let devices = [];
    try { devices = JSON.parse(localStorage.getItem('user_devices') || '[]'); }
    catch { devices = []; }

    const devIdx = devices.findIndex(d => d.os === os && d.browser === browser);
    if (devIdx !== -1) {
      devices[devIdx].time = timeStr;
    } else {
      devices.push({ id: Date.now(), os, browser, time: timeStr });
    }
    devices.sort((a, b) => b.time.localeCompare(a.time));
    localStorage.setItem('user_devices', JSON.stringify(devices));

    
    let activities = [];
    try { activities = JSON.parse(localStorage.getItem('recent_activities') || '[]'); }
    catch { activities = []; }

    activities = activities.map(act => ({ ...act, isCurrent: false }));

    const actIdx = activities.findIndex(a => a.os === os && a.browser === browser);
    if (actIdx !== -1) {
      activities[actIdx] = {
        ...activities[actIdx],
        loginTime: timeStr,
        validUpto: validStr,
        location: locationStr,
        ip: ipData.ip,
        isCurrent: true,
      };
      const [updated] = activities.splice(actIdx, 1);
      activities.unshift(updated);
    } else {
      activities.unshift({
        id: Date.now(),
        os,
        browser,
        ip: ipData.ip,
        location: locationStr,
        loginTime: timeStr,
        validUpto: validStr,
        loginWith,
        loginService: 'JanParichay',
        isCurrent: true,
      });
    }
    localStorage.setItem('recent_activities', JSON.stringify(activities));
  }

  return { ipData, recordSession };
}