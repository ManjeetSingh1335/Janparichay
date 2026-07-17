import React, {useState, useEffect, useRef} from 'react'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import { usePageLanguage } from '../hooks/usePageLanguage'
import '../ApplicationPolicies.css'

const TRANSLATIONS = {
  'English': {
    copyrightTitle: "Copyright Policy",
    copyrightDesc: "Material featured on this site may be reproduced free of charge in any format or media without requiring specific permission. However, the material has to be reproduced accurately and not to be used in a derogatory manner or in a misleading context. Wherever the material is being published or issued to others, the source must be prominently acknowledged. However, the permission to reproduce this material does not extend to any other material on this site, which is explicitly identified as being the copyright of a third party. Authorization to reproduce such material must be obtained from the department/ copyright holder concerned. These terms and conditions shall be governed by and construed in accordance with the Indian Laws. Any dispute arising under these terms and conditions shall be subject to the exclusive jurisdiction of the courts of India.",
    
    hyperlinkTitle: "Hyperlink Policy",
    extWebsitesTitle: "Links to external websites/portals",
    extWebsitesDesc: "At many places in this Portal, you shall find links to other websites/portals. These links have been placed for your convenience. NIC is not responsible for the content and reliability of the linked websites and does not necessarily endorse the views expressed in them. The mere presence of the link or its listing on this Portal should not be assumed as endorsement of any kind. We cannot guarantee that these links will work all the time and we have no control over availability of linked pages.",
    intWebsitesTitle: "Links to Jan Parichay by other websites",
    intWebsitesDesc: "We do not object to you linking directly to the information that is hosted on this Portal and no prior permission is required for the same. However, we would like you to inform us about any links provided to this Portal so that you can be informed of any changes therein. Also, we do not permit our pages to be loaded into frames on your site. The pages belonging to this Portal must load into a newly opened browser window of the User.",
    
    socialLoginTitle: "Social Login Policy",
    socialLoginBullets: [
      "This web site may ask for some permissions allowing it to perform actions with the user's socials account and to retrieve information, including personal data, from it. This service allows this web site to connect with the user's account on the social network (Google, LinkedIn, Facebook, Twitter or Github).",
      "JanParichay uses user's personal data only for authentication purposes to facilitate login for users. You are informed of the data that JanParichay shares with the third party. JanParichay does not share user details without your permission."
    ],
    
    passwordTitle: "Password Policy",
    pwOverviewTitle: "Overview",
    pwOverviewDesc: "All users that have access to the Jan Parichay website must adhere to the password policies defined below in order to protect the security of the website, and protect data integrity.",
    pwScopeTitle: "Scope",
    pwScopeDesc: "This policy applies to any and all users who have any form of website account requiring a password.",
    pwRequirementsTitle: "Password Requirements",
    pwRequirementsBullets: [
      "Minimum Length - 8 characters.",
      "Maximum Length - N/A.",
      "Minimum complexity - No dictionary words included.",
      "Must contain both upper (A-Z) and lower case (a-z) character.",
      "Must include minimum of a numeric character (0-9) and special character (~! @#$%^&*_-+=`|\\(){}[]:;\"'< >,?.?/)",
      "System generated password must be changed before accessing the website."
    ],
    pwProtectionTitle: "Password Protection",
    pwProtectionBullets: [
      "Never write passwords down.",
      "Never send a password through email.",
      "Never include a password in a non-encrypted stored document.",
      "Never tell anyone your password.",
      "Never reveal your password over the telephone.",
      "Never hint at the format of your password.",
      "Never reveal or hint at your password on a form on the internet.",
      "Never choose 'Remember Password' feature on public devices.",
      "Don't use common acronyms as part of your password.",
      "Don't use common words or reverse spelling of words in part of your password.",
      "Don't use names of people or places as part of your password.",
      "Don't use part of your login name in your password.",
      "Don't use parts of numbers easily remembered such as phone numbers, social security numbers, or street addresses."
    ],
    
    dataProtectionTitle: "Data Protection Policy (Draft)",
    dataProtectionDesc: "This Privacy Policy shall govern the collection, use, and management of users' personal and usage information by Jan Parichay, in accordance with the applicable laws of India.",
    dataProtectionBullets: [
      "To use the Jan Parichay services, user has to register himself at Jan Parichay with some mandatory fields - Full Name, Mobile Number, Gender and Date of birth. User may also link Aadhaar as a part of E-KYC for authentication purpose.",
      "Jan Parichay does not share/ disclose any information including eKYC details of the user collected from Aadhaar at the time of sign up with any individual unless and until it is authorized by the account holder with his/her consent.",
      "Jan Parichay Portal collects information such as Internet Protocol (IP) Addresses, Browser type, Operating System, location, login Date and Time etc. To add the transparency, these details are available at Jan Parichay dashboard and user can view this login activity in case they feel any suspicious activity related to their account.",
      "The user's consent shall be specific, informed, unconditional, and unambiguously, expressed through a clear affirmative action. It shall indicate agreement for the processing of his/her personal data solely for the specified purpose and shall be limited to only such personal data as is necessary for that purpose.",
      "Jan Parichay uses cookies to record current session information and enhance the overall user experience. Users may manage or block cookies through their browser settings or other available tools; however, blocking cookies may interrupt or discontinue the Jan Parichay session.",
      "Jan Parichay neither shares nor discloses any information—including eKYC details obtained from Aadhaar during account registration (optional)."
    ],
    nestedIntro: "The personal and usage information collected may be shared with other Government organizations if the Ministry of Electronics and Information Technology, in good faith, determines that the access, use, preservation, or disclosure of such information is reasonably necessary to:",
    nestedBullets: [
      "Comply with applicable laws, regulations, legal processes, or enforceable government requests;",
      "Detect, prevent, or address fraud, security or technical issues, and investigate potential violations; or",
      "Protect the rights, property, or safety of the Jan Parichay, its users, or the public, as required or permitted by law."
    ]
  }
}


export default function ApplicationPolicies() {
  const { t, pageLangCode, setPageLangCode } = usePageLanguage()
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const langRef = useRef(null)

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'mr', label: 'मराठी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'or', label: 'ଓଡ଼ିଆ' }
  ]

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangDropdownOpen(false)
      }
    }
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [langDropdownOpen])

  const text = {
    copyrightTitle: t('policies_copyright_title'),
    copyrightDesc: t('policies_copyright_desc'),
    hyperlinkTitle: t('policies_hyperlink_title'),
    extWebsitesTitle: t('policies_ext_websites_title'),
    extWebsitesDesc: t('policies_ext_websites_desc'),
    intWebsitesTitle: t('policies_int_websites_title'),
    intWebsitesDesc: t('policies_int_websites_desc'),
    socialLoginTitle: t('policies_social_login_title'),
    socialLoginBullets: [t('policies_social_login_bullet_1'), t('policies_social_login_bullet_2')],
    passwordTitle: t('policies_password_title'),
    pwOverviewTitle: t('policies_pw_overview_title'),
    pwOverviewDesc: t('policies_pw_overview_desc'),
    pwScopeTitle: t('policies_pw_scope_title'),
    pwScopeDesc: t('policies_pw_scope_desc'),
    pwRequirementsTitle: t('policies_pw_requirements_title'),
    pwRequirementsBullets: Array.from({ length: 6 }, (_, index) => t(`policies_pw_requirement_${index + 1}`)),
    pwProtectionTitle: t('policies_pw_protection_title'),
    pwProtectionBullets: Array.from({ length: 13 }, (_, index) => t(`policies_pw_protection_${index + 1}`)),
    dataProtectionTitle: t('policies_data_protection_title'),
    dataProtectionDesc: t('policies_data_protection_desc'),
    dataProtectionBullets: Array.from({ length: 6 }, (_, index) => t(`policies_data_protection_bullet_${index + 1}`)),
    nestedIntro: t('policies_nested_intro'),
    nestedBullets: Array.from({ length: 3 }, (_, index) => t(`policies_nested_bullet_${index + 1}`))
  }

  return (
    <div className="ap-page">
      {/* Header */}
      <header className="ap-header">
        <div className="ap-header-logo-container">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" className="ap-header-logo" />
        </div>
        <div className="ap-header-lang" ref={langRef}>
          <div 
            className="ap-lang-trigger" 
            onClick={() => setLangDropdownOpen(prev => !prev)}
          >
            <span>{languages.find(lang => lang.code === pageLangCode)?.label || 'English'}</span>
            <i className="bi bi-chevron-down ap-lang-chevron"></i>
          </div>
          {langDropdownOpen && (
            <ul className="ap-lang-menu">
              {languages.map(lang => (
                <li 
                  key={lang.code} 
                  className={`ap-lang-item ${pageLangCode === lang.code ? 'active' : ''}`}
                  onClick={() => {
                    setPageLangCode(lang.code)
                    setLangDropdownOpen(false)
                  }}
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Scrollable Content Wrapper */}
      <div className="ap-content-wrapper">
        <div className="ap-body">
          
          {/* Copyright Policy */}
          <h1 className="ap-heading">{text.copyrightTitle}</h1>
          <p className="ap-para">{text.copyrightDesc}</p>

          {/* Hyperlink Policy */}     
          <div className="ap-card-box">
            <h1 className="ap-heading">{text.hyperlinkTitle}</h1>
            <h2 className="ap-subheading">{text.extWebsitesTitle}</h2>
            <p className="ap-para">{text.extWebsitesDesc}</p>
            
            <h2 className="ap-subheading">{text.intWebsitesTitle}</h2>
            <p className="ap-para">{text.intWebsitesDesc}</p>
          </div>

          {/* Social Login Policy */}
          <h1 className="ap-heading">{text.socialLoginTitle}</h1>
          <ul className="ap-list">
            {text.socialLoginBullets.map((bullet, idx) => (
              <li key={idx} className="ap-list-item">{bullet}</li>
            ))}
          </ul>

          {/* Password Policy */}
          <h1 className="ap-heading">{text.passwordTitle}</h1>
          
          <h2 className="ap-subheading">{text.pwOverviewTitle}</h2>
          <p className="ap-para">{text.pwOverviewDesc}</p>

          <h2 className="ap-subheading">{text.pwScopeTitle}</h2>
          <p className="ap-para">{text.pwScopeDesc}</p>

          <h2 className="ap-subheading">{text.pwRequirementsTitle}</h2>
          <ul className="ap-list">
            {text.pwRequirementsBullets.map((bullet, idx) => (
              <li key={idx} className="ap-list-item">{bullet}</li>
            ))}
          </ul>

          <h2 className="ap-subheading">{text.pwProtectionTitle}</h2>
          <ul className="ap-list">
            {text.pwProtectionBullets.map((bullet, idx) => (
              <li key={idx} className="ap-list-item">{bullet}</li>
            ))}
          </ul>

          {/* Data Protection Policy */}
          <h1 className="ap-heading">{text.dataProtectionTitle}</h1>
          <p className="ap-para">{text.dataProtectionDesc}</p>
          <ul className="ap-list">
            {text.dataProtectionBullets.map((bullet, idx) => (
              <li key={idx} className="ap-list-item">{bullet}</li>
            ))}
            <li className="ap-list-item">
              {text.nestedIntro}
              <ul className="ap-nested-list">
                {text.nestedBullets.map((bullet, idx) => (
                  <li key={idx} className="ap-nested-list-item">{bullet}</li>
                ))}
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </div>
  )
}
