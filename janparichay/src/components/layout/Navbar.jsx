import React, { useState, useRef, useEffect } from 'react'
import Webcam from 'react-webcam'
import meriPehchaanLogo from '../../images/meri-pehchaan.png';
import keyIcon from '../../images/key-icon.png';
import './Layout.css'
import { useDashboard } from '../../context/DashboardContext.jsx'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const { profile, avatar, updateAvatar, logout } = useDashboard();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const menuRef = useRef(null);
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [tempFileUrl, setTempFileUrl] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);

  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isCameraHovered, setIsCameraHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const handleAvatarClick = () => {
    setMenuOpen(prev => !prev);
  }
  const handleUploadClickInMenu = () => {
    setMenuOpen(false);
    setSelectedFileName('');
    setTempFileUrl(null);
    setShowWebcam(false);
    setCameraError(false);
    setShowUploadModal(true);
  }
  const triggerFileInput = () => {
    setShowWebcam(false); 
    setCameraError(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setShowWebcam(false); 
      setShowWebcam(false); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempFileUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  const handleCameraToggle = () => {
    setShowWebcam(prev => {
      const next = !prev;
      if (next) {
        setCameraError(false);
        setSelectedFileName('');
        setTempFileUrl(null);
      }
      return next;
    });
  }
  const handleWebcamError = (error) => {
    console.error("Webcam hardware error:", error);
    setCameraError(true);
  }
  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setTempFileUrl(imageSrc);
        setSelectedFileName('CapturedImage.jpg');
        setShowWebcam(false); 
      }
    }
  }
  const handleUploadSubmit = () => {
    if (tempFileUrl) {
      updateAvatar(tempFileUrl);
      setShowUploadModal(false);
    }
  }
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuOpen]);
  
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 2000,
    paddingTop: '35px',
    boxSizing: 'border-box',
    overflowY: 'auto'
  };
  const containerStyle = {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '580px',
    padding: '45px 40px 40px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
    boxSizing: 'border-box',
    marginTop: 0
  };
  const closeBtnStyle = {
    position: 'absolute',
    top: '14px',
    right: '14px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: isCloseHovered ? '#0f172a' : '#475569',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '4px',
    transition: 'color 0.15s ease'
  };
  const selectorBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #cbd5e1',
    borderRadius: '28px',  
    padding: '12px 24px',
    cursor: 'pointer',
    backgroundColor: '#f8fafc',
    height: '56px',
    boxSizing: 'border-box',
    marginTop: '10px'
  };
  const placeholderStyle = {
    color: '#64748b',
    fontSize: '14.5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '550',
    whiteSpace: 'nowrap'
  };
  const iconsContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '20px',
    flexShrink: 0
  };
  const cameraIconStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: showWebcam ? '#007bff' : (isCameraHovered ? '#0f172a' : '#475569'),
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.15s ease',
    transform: isCameraHovered ? 'scale(1.1)' : 'scale(1)'
  };
  const imageIconStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: isImageHovered ? '#0f172a' : '#475569',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.15s ease',
    transform: isImageHovered ? 'scale(1.1)' : 'scale(1)'
  };
  const webcamContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    marginTop: '20px',
    width: '100%'
  };
  const webcamFeedStyle = {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '8px',
    border: '2px solid #cbd5e1',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };
  const cameraErrorBoxStyle = {
    width: '100%',
    maxWidth: '400px',
    height: '240px',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#dc2626',
    fontWeight: '600',
    fontSize: '15px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  };
  const btnCaptureStyle = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.15s ease'
  };
  const previewContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  };
  const previewImgStyle = {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '3px solid #007bff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  };
  const actionRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px'
  };
  const submitButtonStyle = {
    backgroundColor: tempFileUrl ? (isSubmitHovered ? '#0d3252' : '#124369') : '#cbd5e1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 32px',
    fontSize: '14px',
    fontTab: 'Inter',
    fontWeight: '600',
    cursor: tempFileUrl ? 'pointer' : 'not-allowed',
    transition: 'all 0.15s ease-in-out'
  };
  const navLinks = [
    { to: '/dashboard',          label: 'Dashboard',         end: true },
    { to: '/dashboard/profile',  label: 'Profile',           end: false },
    { to: '/dashboard/activity', label: 'Account Activity',  end: false },
    { to: '/dashboard/consent',  label: 'Consent Dashboard', end: false },
  ]

  return (
    <nav className="navbar-container">
      <div className="navbar-logo-container">
        <img
          src={meriPehchaanLogo}
          alt="Meri Pehchaan"
          className="navbar-logo"
        />
      </div>
      <div className="navbar-user-container" ref={menuRef}>
        <div className="navbar-key-container">
          <img
            src={keyIcon}
            alt="User Icon"
            className="navbar-key-icon"
          />
        </div>
       
        <div className="navbar-user-info">
          <p className="navbar-user-name">
            {profile.fullName || profile.name}
          </p>
          {/* <p className="navbar-user-username">
            {profile.username}
          </p> */}
        </div>
        <div className="navbar-avatar-wrapper" style={{ position: 'relative' }}>
          <div className="navbar-avatar-container" onClick={handleAvatarClick} style={{ cursor: 'pointer', overflow: 'hidden' }}>
            {avatar ? (
              <img src={avatar} alt="Profile" className="navbar-avatar-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span className="navbar-avatar-text">
                {(profile.fullName || profile.name || 'M').charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {menuOpen && (
            <div className="profile-dropdown-menu">
              <button type="button" className="dropdown-item" onClick={handleUploadClickInMenu}>
                <i className="bi bi-upload dropdown-icon"></i>
                Upload Profile Pic
              </button>
              <button type="button" className="dropdown-item" onClick={logout}>
                <i className="bi bi-power dropdown-icon"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Hamburger button (visible ≤765px) ── */}
      <button
        className="hamburger-btn"
        onClick={() => setHamburgerOpen(prev => !prev)}
        aria-label="Toggle menu"
      >
        <span className="ham-line"></span>
        <span className="ham-line"></span>
        <span className="ham-line"></span>
      </button>

      {/* ── Mobile drawer ── */}
      {hamburgerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setHamburgerOpen(false)}>
          <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
            {/* User info header */}
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-avatar">
                {avatar ? (
                  <img src={avatar} alt="Profile" className="mobile-drawer-avatar-img" />
                ) : (
                  <span className="mobile-drawer-avatar-text">
                    {(profile.fullName || profile.name || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="mobile-drawer-name">
                  {(profile.fullName || profile.name || '').toUpperCase()}
                </p>
                <p className="mobile-drawer-username">{profile.username}</p>
              </div>
            </div>
            {/* Upload Profile Pic */}
            <div className="mobile-drawer-upload">
              <button className="mobile-drawer-upload-btn" onClick={() => { setHamburgerOpen(false); handleUploadClickInMenu(); }}>
                <i className="bi bi-upload"></i> Upload Profile Pic
              </button>
            </div>
            {/* Nav links */}
            <div className="mobile-drawer-nav">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
                  onClick={() => setHamburgerOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            {/* Logout pinned to bottom */}
            <div className="mobile-drawer-logout">
              <button className="mobile-drawer-logout-btn" onClick={() => { setHamburgerOpen(false); logout(); }}>
                <i className="bi bi-power"></i> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Profile Pic Modal */}
      {showUploadModal && (
        <div 
          style={overlayStyle} 
          onClick={() => setShowUploadModal(false)}
        >
          <div 
            style={containerStyle} 
            onClick={(e) => e.stopPropagation()}
          >
            
            <button 
              type="button" 
              style={closeBtnStyle}
              onClick={() => setShowUploadModal(false)}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
              aria-label="Close modal"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            {/* Pill-shaped selector with icons inside */}
            <div style={selectorBoxStyle}>
              <span style={placeholderStyle} className="text-truncate">
                {selectedFileName || 'Select Profile Picture'}
              </span>
              <div style={iconsContainerStyle}>
                <button 
                  type="button" 
                  style={cameraIconStyle}
                  onClick={handleCameraToggle}
                  onMouseEnter={() => setIsCameraHovered(true)}
                  onMouseLeave={() => setIsCameraHovered(false)}
                  title="Open Camera"
                >
                  <i className="bi bi-camera-fill"></i>
                </button>
                <button 
                  type="button" 
                  style={imageIconStyle}
                  onClick={triggerFileInput}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  title="Select File"
                >
                  <i className="bi bi-image-fill"></i>
                </button>
              </div>
            </div>
            {/* Webcam Live Capture Container */}
            {showWebcam && (
              <div style={webcamContainerStyle}>
               
                {cameraError ? (
                  <div style={cameraErrorBoxStyle}>
                    Camera is not working properly!
                  </div>
                ) : (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                      width: 480,
                      height: 360,
                      facingMode: "user"
                    }}
                    onUserMediaError={handleWebcamError}
                    onUserMedia={() => setCameraError(false)}
                    style={webcamFeedStyle}
                  />
                )}
                {!cameraError && (
                  <button type="button" style={btnCaptureStyle} onClick={capturePhoto}>
                    <i className="bi bi-camera"></i> Capture Photo
                  </button>
                )}
              </div>
            )}
            {/* Captured / Uploaded Image Preview */}
            {tempFileUrl && (
              <div style={previewContainerStyle}>
                <img 
                  src={tempFileUrl} 
                  alt="Preview" 
                  style={previewImgStyle}
                />
              </div>
            )}
            {/* Hidden native file input element */}
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handleFileInput}
            />
            {/* Submit Action Row */}
            <div style={actionRowStyle}>
              <button 
                type="button" 
                style={submitButtonStyle}
                disabled={!tempFileUrl}
                onClick={handleUploadSubmit}
                onMouseEnter={() => setIsSubmitHovered(true)}
                onMouseLeave={() => setIsSubmitHovered(false)}
              >
                Upload Picture
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navbar