# JanParichay / MeriPehchaan – Vite + React + Bootstrap App

A pixel-matched clone of the MeriPehchaan SSO Login, Others-tab login, and JanParichay
Signup screens, plus a fully responsive Dashboard with a fixed sidebar (20:80 split).

---

## 1. Project Setup (from scratch)

```bash
# 1. Create a Vite + React project
npm create vite@latest janparichay-app -- --template react
cd janparichay-app

# 2. Install dependencies
npm install react-router-dom bootstrap bootstrap-icons

# 3. Replace the generated files with the files below
# 4. Run
npm run dev
```

If you were given this project as a zip/folder already, just run:

```bash
npm install
npm run dev
```

---

## 2. Folder Structure

```
janparichay-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # App entry, mounts BrowserRouter
    ├── App.jsx                   # ROUTES: /login  /signup  /dashboard
    ├── index.css                 # All custom CSS (Bootstrap imported in main.jsx)
    ├── data/
    │   └── countries.js           # Country list: name, native name, dial code, flag emoji
    ├── pages/
    │   ├── LoginPage.jsx          # Single route. Tabs + Forgot Password + Recover User Id all swap CHILD COMPONENTS only.
    │   ├── SignupPage.jsx         # Full signup form using all reusable inputs below
    │   └── DashboardPage.jsx      # Topbar + sidebar shell; swaps section components
    └── components/
        ├── GovLogoHeader.jsx      # Top MeriPehchaan text-logo (auth pages)
        ├── KebabMenu.jsx          # "⋮" dropdown: About Us / User Manual / FAQ etc.
        │
        ├── MpInput.jsx            # ⭐ Reusable notched-border text/email/number input (label sits on border line)
        ├── PasswordInput.jsx      # ⭐ Built on MpInput — adds show/hide eye-icon toggle
        ├── PhoneInput.jsx         # ⭐ Mobile number input with full country-code picker (flag + search + dial code)
        ├── DateInput.jsx          # ⭐ Date input — clicking anywhere in the box opens the native calendar
        ├── TermsModal.jsx         # ⭐ "Terms & Conditions" modal popup (Agree / Deny)
        │
        ├── UsernameTab.jsx        # "Username" tab — password hides when Password Less Auth is checked
        ├── MobileTab.jsx          # "Mobile" tab — uses PhoneInput; password hides when Password Less Auth is checked
        ├── OthersTab.jsx          # "Others" tab — Email/Govt Email/Aadhaar/Service Id/PAN/DL; Aadhaar shows ONLY the identifier field (no password)
        ├── ForgotPassword.jsx     # "Reset your Password" view (replaces tabs, same /login route)
        ├── RecoverUserId.jsx      # "Recover your User Id" view (replaces tabs, same /login route) — Mobile No / Username / Email / Aadhaar / PAN / DL
        ├── SSOSection.jsx         # DigiLocker / ARICHAY / e-Pramaan + social icons
        │
        ├── DashTopbar.jsx         # Dark navy top header: logo, user name/mobile, avatar menu
        ├── DashSidebar.jsx        # Thin left nav: Dashboard / Profile / Consent Dashboard
        ├── DashboardHome.jsx      # Frequently Used Services + Activities (stat cards, login activity, donut, settings)
        ├── DonutChart.jsx         # Reusable SVG donut chart (no external chart lib needed)
        ├── ConsentDashboard.jsx   # DataTable-style consent grid: search, page size, pagination, revoke
        └── Profile.jsx            # Editable profile info
```

⭐ = new shared input components used across **Login**, **Signup**, **Forgot Password**, and
**Recover User Id** so the notched-label style, phone country picker, date picker, and
password show/hide behavior are all consistent and only need to be built once.

---

## 3. How routing works (as per your requirement)

You asked for **only 3 routes** — `/login`, `/signup`, `/dashboard` — and that
**the Login page must NOT change route when switching tabs**.

### `App.jsx`
```jsx
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/dashboard/*" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>
```

### Inside `LoginPage.jsx` — tab switching is **pure React state**, no router involved:
```jsx
const [activeTab, setActiveTab] = useState('Username')

const renderTab = () => {
  switch (activeTab) {
    case 'Username': return <UsernameTab />
    case 'Mobile':   return <MobileTab />
    case 'Others':   return <OthersTab />
  }
}
```
Clicking a tab button just calls `setActiveTab('Mobile')` — the URL stays `/login` the
whole time, and only the inner form component re-renders. This exactly matches your
requirement: **"on login page route doesn't change, only multiple components render."**

### Inside `DashboardPage.jsx` — same pattern for the sidebar:
```jsx
const SECTION_COMPONENTS = {
  'dashboard': DashboardHome,
  'profile': Profile,
  'consent-dashboard': ConsentDashboard,
}
const [activeSection, setActiveSection] = useState('dashboard')
const ActiveComponent = SECTION_COMPONENTS[activeSection]

// ...
<ActiveComponent />
```
Clicking a sidebar item changes `activeSection` state — URL stays `/dashboard`,
only the right-hand content area swaps.

### Forgot Password — also no route change
`LoginPage.jsx` has a `view` state: `'login' | 'forgot'`.
```jsx
{view === 'login' ? (
  <> ...tabs + SSOSection... </>
) : (
  <ForgotPassword onBackToLogin={() => setView('login')} />
)}
```
Clicking **Forgot Password** inside any tab calls `onForgotPassword()`, which sets
`view = 'forgot'`. The whole card content is replaced by the "Reset your Password"
form (method dropdown: Username / Mobile No / Email / Aadhaar / PAN / DL → matching
input → Login / Submit). Clicking **Login** goes back to `view = 'login'`. The URL
is `/login` throughout — exactly matching your "no route change" requirement.

---

## 4. How the responsive Bootstrap layout works

### A. Auth pages (Login / Signup)
- Wrapped in `.auth-page` — full-height flex container, centers the white `.auth-card`.
- `.auth-card` has `max-width: 480px` (520px for signup) and `width: 100%`, so on mobile
  it naturally shrinks to fill the screen with side padding.
- All inputs use Bootstrap's grid-less floating-label pattern (custom CSS `.mp-input` /
  `.mp-label`) so it visually matches the screenshots exactly (label floats up on focus).
- Tabs (`Username | Mobile | Others`) use Bootstrap's `nav` classes with custom active-tab
  underline styling (`.login-tabs`).

### B. Dashboard — Topbar + Sidebar
The dashboard now matches the real MeriPehchaan layout exactly:
- **Dark navy topbar** (`.dash-topbar`) — fixed height ~58px, sticky, gradient navy
  background, purple top border accent, logo on the left, user name/mobile + avatar
  on the right (avatar opens a small dropdown: My Profile / Sign Out).
- **Sidebar** (`.dash-sidebar`) — narrow 220px white panel with 3 items: Dashboard,
  Profile, Consent Dashboard. Active item gets a light-grey pill background with
  rounded right edge, matching the screenshot.

```css
:root { --sidebar-width: 220px; }

.dash-sidebar {
  width: var(--sidebar-width);
  background: #fff;
  border-right: 1px solid #e3e7ea;
}
```

### C. Mobile responsiveness (≤768px)
```css
@media (max-width: 768px) {
  .dash-sidebar {
    position: fixed;
    transform: translateX(-100%);   /* hidden off-canvas */
  }
  .dash-sidebar.open { transform: translateX(0); }  /* slides in */
  .dash-hamburger { display: block; }                /* hamburger appears in topbar */
}
```
A hamburger appears in `DashTopbar.jsx` on mobile, tied to `sidebarOpen` state in
`DashboardPage.jsx`. A dark overlay (`.dash-sidebar-overlay`) closes the sidebar on
outside-tap. User name/mobile text is hidden below 480px to save space (avatar still
shows). Stat cards / panels in `DashboardHome.jsx` use Bootstrap's `row`/`col-lg-*`
grid so they stack to a single column on phones and 3-across on desktop.

### D. Bootstrap grid usage
- Activities row: `col-12 col-lg-3` (stat cards) / `col-12 col-lg-5` (login activity +
  donut) / `col-12 col-lg-4` (settings) → full-width stacked on mobile, 3-column on
  desktop (≥992px).
- Consent table: wrapped in `.dash-table-wrap { overflow-x: auto }` with
  `min-width: 760px` on the table itself, so it scrolls horizontally on narrow
  screens instead of squashing columns unreadably.

---

## 5. Authentication flow (demo / mock)

There's no real backend. `localStorage` is used as a mock session:

- **Sign In** (`UsernameTab` / `MobileTab` / `OthersTab`) → on submit, saves
  `{ username, name }` to `localStorage.mp_user` → `navigate('/dashboard')`.
- **Sign Up** (`SignupPage`) → validates all fields, saves user, redirects to `/dashboard`.
- **PrivateRoute** in `App.jsx` checks `localStorage.mp_user`; if absent, redirects to
  `/login`.
- **Sign Out** (sidebar footer button) clears `localStorage` and redirects to `/login`.

Swap this with real API calls (`fetch`/`axios`) when you wire up a backend — the
component structure won't need to change.

---

## 6. Customization cheatsheet

| Want to...                                   | Change this                                                              |
|-----------------------------------------------|----------------------------------------------------------------------------|
| Make sidebar a literal 20% width              | In `index.css`, change `.sidebar { width: 240px }` → `width: 20vw` and `.main-content { margin-left: 240px }` → `margin-left: 20vw` |
| Add a new sidebar menu item                    | Add to `NAV_ITEMS` array in `Sidebar.jsx` + add matching key to `SECTION_COMPONENTS` in `DashboardPage.jsx` |
| Add a new login tab                            | Add to `TABS` array in `LoginPage.jsx`, create new component, add case in `renderTab()` |
| Change primary color                           | Edit `--mp-blue` CSS variable at top of `index.css`                       |
| Use real images instead of picsum placeholders | Replace `img` URLs in `SERVICES` array inside `DashboardHome.jsx`         |
| Add real OTP/email API                         | Replace `handleGenerateOTP` / `handleSignIn` mock logic with `fetch()` calls |

---

## 7. Run it

```bash
npm install
npm run dev
```

Visit `http://localhost:5173/login` — sign in with **anything** (mock auth, no
validation against a real DB) to land on `/dashboard`, or click **"Sign up for
MeriPehchaan"** to test the full signup form at `/signup`.
