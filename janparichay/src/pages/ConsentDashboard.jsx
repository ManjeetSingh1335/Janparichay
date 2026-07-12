import React, { useState, useEffect } from 'react'
import '../ConsentDashboard.css'

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

export default function ConsentDashboard() {
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getInitialConsents = () => {
  
    if (!localStorage.getItem('consent_data_cleared')) {
      localStorage.removeItem('consent_data');
      localStorage.setItem('consent_data_cleared', 'true');
    }

    const existing = localStorage.getItem('consent_data');
    if (existing) {
      try {
        return JSON.parse(existing);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  };

  const [consents, setConsents] = useState(getInitialConsents);

  const handleRevokeAll = () => {
    if (consents.length === 0) return;
    if (confirm('Are you sure you want to revoke consent for all services?')) {
      setConsents([]);
      localStorage.setItem('consent_data', JSON.stringify([]));
      alert('All consents revoked successfully.');
    }
  };

  const handleRevokeIndividual = (id) => {
    if (confirm('Are you sure you want to revoke consent for this service?')) {
      const updated = consents.filter(item => item.id !== id)
        .map((item, index) => ({ ...item, sno: index + 1 })); 
      setConsents(updated);
      localStorage.setItem('consent_data', JSON.stringify(updated));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const parseDate = (str) => {
    if (!str) return 0;
    const [datePart, timePart] = str.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');
    return new Date(year, month - 1, day, hours, minutes, seconds).getTime();
  };


  const filteredConsents = React.useMemo(() => {
    return consents.filter(item => 
      item.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ip.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [consents, searchQuery]);

  
  const sortedConsents = React.useMemo(() => {
    let sortableItems = [...filteredConsents];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'createdOn' || sortConfig.key === 'updatedOn' || sortConfig.key === 'validUpto') {
          return sortConfig.direction === 'asc' 
            ? parseDate(a[sortConfig.key]) - parseDate(b[sortConfig.key])
            : parseDate(b[sortConfig.key]) - parseDate(a[sortConfig.key]);
        }
        if (sortConfig.key === 'sno') {
          return sortConfig.direction === 'asc' ? a.sno - b.sno : b.sno - a.sno;
        }
        const valA = String(a[sortConfig.key] || '').toLowerCase();
        const valB = String(b[sortConfig.key] || '').toLowerCase();
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredConsents, sortConfig]);


  const totalEntries = sortedConsents.length;
  const totalPages = Math.ceil(totalEntries / limit) || 1;
  const startIndex = totalEntries === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, totalEntries);

  const paginatedConsents = React.useMemo(() => {
    return sortedConsents.slice((currentPage - 1) * limit, currentPage * limit);
  }, [sortedConsents, currentPage, limit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [limit, searchQuery]);

  return (
    <div className="consent-dashboard-container">
      <div className="consent-section-header">
        <h3 className="consent-section-title">CONSENT DASHBOARD</h3>
      </div>
      
      <div className="consent-toolbar-row">
        <button 
          type="button" 
          className={`btn-revoke-all ${consents.length === 0 ? 'disabled' : ''}`} 
          onClick={handleRevokeAll}
          disabled={consents.length === 0}
        >
          REVOKE ALL
        </button>
      </div>

      <div className="consent-table-controls">
        <div className="limit-selector-group">
          <select 
            value={limit} 
            onChange={(e) => setLimit(Number(e.target.value))}
            className="consent-limit-select"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="search-box-group">
          <label>Search: </label>
          <input 
            type="search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="consent-search-input"
          />
        </div>
      </div>

      <div className="consent-table-wrapper">
        <table className="consent-data-table">
          <thead>
            <tr>
              <th className={sortConfig.key === 'sno' ? 'active-header' : ''} onClick={() => handleSort('sno')}>
                SNo <SortDiamond active={sortConfig.key === 'sno'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'serviceName' ? 'active-header' : ''} onClick={() => handleSort('serviceName')}>
                Service Name <SortDiamond active={sortConfig.key === 'serviceName'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'createdOn' ? 'active-header' : ''} onClick={() => handleSort('createdOn')}>
                Created On <SortDiamond active={sortConfig.key === 'createdOn'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'updatedOn' ? 'active-header' : ''} onClick={() => handleSort('updatedOn')}>
                Updated On <SortDiamond active={sortConfig.key === 'updatedOn'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'consentProvided' ? 'active-header' : ''} onClick={() => handleSort('consentProvided')}>
                Consent Provided <SortDiamond active={sortConfig.key === 'consentProvided'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'validUpto' ? 'active-header' : ''} onClick={() => handleSort('validUpto')}>
                Valid Upto <SortDiamond active={sortConfig.key === 'validUpto'} direction={sortConfig.direction} />
              </th>
              <th className={sortConfig.key === 'ip' ? 'active-header' : ''} onClick={() => handleSort('ip')}>
                IP <SortDiamond active={sortConfig.key === 'ip'} direction={sortConfig.direction} />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedConsents.length === 0 ? (
              <tr>
                <td colSpan={8} className="consent-table-no-data">
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedConsents.map((item) => (
                <tr key={item.id}>
                  <td>{item.sno}</td>
                  <td className="consent-service-name-cell">{item.serviceName}</td>
                  <td>{item.createdOn}</td>
                  <td>{item.updatedOn}</td>
                  <td>
                    <span className="consent-provided-badge">{item.consentProvided}</span>
                  </td>
                  <td>{item.validUpto}</td>
                  <td>{item.ip}</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn-revoke-action" 
                      onClick={() => handleRevokeIndividual(item.id)}
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="consent-table-footer">
        <span className="consent-entries-info">
          Showing {startIndex} to {endIndex} of {totalEntries} entries
        </span>
        <div className="consent-pagination-group">
          <button 
            type="button" 
            className="btn-consent-pagination" 
            onClick={() => setCurrentPage(1)} 
            disabled={currentPage === 1}
          >
            «
          </button>
          <button 
            type="button" 
            className="btn-consent-pagination" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {totalEntries > 0 && (
            <button type="button" className="btn-consent-pagination active-page">
              {currentPage}
            </button>
          )}
          <button 
            type="button" 
            className="btn-consent-pagination" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
          >
            ›
          </button>
          <button 
            type="button" 
            className="btn-consent-pagination" 
            onClick={() => setCurrentPage(totalPages)} 
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
