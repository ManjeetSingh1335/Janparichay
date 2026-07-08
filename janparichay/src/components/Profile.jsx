import React, { useState } from 'react'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('mp_user') || '{}')
  const initials = (user.name || 'U').charAt(0).toUpperCase()

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user.name || 'NAMAN RAJ',
    email: 'naman.raj@example.com',
    mobile: user.mobile || '9955634664',
    dob: '01-01-1995',
    gender: 'Male',
    address: 'New Delhi, India',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    const updated = { ...JSON.parse(localStorage.getItem('mp_user') || '{}'), name: form.name }
    localStorage.setItem('mp_user', JSON.stringify(updated))
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const fields = [
    { label: 'Full Name',     key: 'name',    editable: true },
    { label: 'Email',         key: 'email',   editable: true },
    { label: 'Mobile',        key: 'mobile',  editable: false },
    { label: 'Date of Birth', key: 'dob',     editable: false },
    { label: 'Gender',        key: 'gender',  editable: false },
    { label: 'Address',       key: 'address', editable: true },
  ]

  return (
    <div>
      <div className="dash-section-title">PROFILE</div>

      {saved && (
        <div
          style={{
            background: '#e6f4ea',
            border: '1px solid #b7dfbe',
            borderRadius: 4,
            padding: '10px 16px',
            marginBottom: 16,
            color: '#1e7e34',
            fontSize: '0.85rem',
          }}
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          Profile updated successfully!
        </div>
      )}

      <div className="dash-panel mb-3">
        <div className="profile-card-header">
          <div className="profile-avatar-xl">{initials}</div>
          <div>
            <h5 style={{ fontWeight: 700, marginBottom: 4 }}>{form.name}</h5>
            <div style={{ fontSize: '0.82rem', color: '#8a93a0' }}>
              {user.username || 'user@janparichay.gov.in'}
            </div>
            <span
              style={{
                display: 'inline-block', marginTop: 6,
                background: '#e6f4ea', color: '#1e7e34',
                borderRadius: 20, padding: '2px 10px',
                fontSize: '0.72rem', fontWeight: 700,
              }}
            >
              <i className="bi bi-patch-check-fill me-1"></i>Verified
            </span>
          </div>
        </div>
      </div>

      <div className="dash-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div className="dash-panel-title" style={{ marginBottom: 0 }}>Personal Information</div>
          {!editing ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setEditing(true)}
              style={{ fontSize: '0.78rem' }}
            >
              <i className="bi bi-pencil me-1"></i>Edit
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setEditing(false)}
                style={{ fontSize: '0.78rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={handleSave}
                style={{ fontSize: '0.78rem' }}
              >
                Save
              </button>
            </div>
          )}
        </div>

        {fields.map(f => (
          <div className="profile-detail-row" key={f.key}>
            <span className="pd-label">{f.label}</span>
            {editing && f.editable ? (
              <input
                type="text"
                value={form[f.key]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                style={{
                  border: '1.5px solid #1a73e8',
                  borderRadius: 4,
                  padding: '3px 8px',
                  fontSize: '0.84rem',
                  outline: 'none',
                  textAlign: 'right',
                  minWidth: 160,
                }}
              />
            ) : (
              <span className="pd-value">
                {f.key === 'mobile' ? '+91 ' + form.mobile : form[f.key]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
