const SETTINGS_KEY = 'mp_settings'
const TRUSTED_DEVICES_KEY = 'mp_backup_code_trusted_devices'
const PENDING_USER_KEY = 'mp_pending_user'

export function isBackupAuthenticationRequired(username) {
  try {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')
    const trustedDevices = JSON.parse(localStorage.getItem(TRUSTED_DEVICES_KEY) || '{}')
    return settings.backupCode === true && settings.backupCodeEnabled === true && !trustedDevices[username]
  } catch {
    return false
  }
}

export function savePendingUser(user) {
  localStorage.setItem(PENDING_USER_KEY, JSON.stringify(user))
}

export function getPendingUser() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_USER_KEY) || 'null')
  } catch {
    return null
  }
}

export function clearPendingUser() {
  localStorage.removeItem(PENDING_USER_KEY)
}

export function trustCurrentDevice(username) {
  try {
    const trustedDevices = JSON.parse(localStorage.getItem(TRUSTED_DEVICES_KEY) || '{}')
    localStorage.setItem(TRUSTED_DEVICES_KEY, JSON.stringify({ ...trustedDevices, [username]: true }))
  } catch {
    localStorage.setItem(TRUSTED_DEVICES_KEY, JSON.stringify({ [username]: true }))
  }
}
