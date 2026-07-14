import React, {useState, useEffect, useRef} from 'react'
import {useDashboard} from '../context/DashboardContext.jsx'
import '../Profile.css'

const INDIAN_STATES=[
  'ANDAMAN AND NICOBAR ISLANDS',
  'ANDHRA PRADESH',
  'ARUNACHAL PRADESH',
  'ASSAM',
  'BIHAR',
  'CHANDIGARH',
  'CHHATTISGARH',
  'DELHI',
  'GOA',
  'GUJARAT',
  'HARYANA',
  'HIMACHAL PRADESH',
  'JAMMU AND KASHMIR',
  'JHARKHAND',
  'KARNATAKA',
  'KERALA',
  'LADAKH',
  'LAKSHADWEEP',
  'MADHYA PRADESH',
  'MAHARASHTRA',
  'MANIPUR',
  'MEGHALAYA',
  'MIZORAM',
  'NAGALAND',
  'ODISHA',
  'PUDUCHERRY',
  'PUNJAB',
  'RAJASTHAN',
  'SIKKIM',
  'TAMIL NADU',
  'TELANGANA',
  'TRIPURA',
  'UTTAR PRADESH',
  'UTTARAKHAND',
  'WEST BENGAL'
]

const COUNTRIES=[
  { name: 'Afghanistan', code: '+93', iso: 'af' },
  { name: 'Albania (Shqipëri)', code: '+355', iso: 'al' },
  { name: 'Algeria (الجزائر)', code: '+213', iso: 'dz' },
  { name: 'American Samoa', code: '+1684', iso: 'as' },
  { name: 'Andorra', code: '+376', iso: 'ad' },
  { name: 'Angola', code: '+244', iso: 'ao' },
  { name: 'Anguilla', code: '+1264', iso: 'ai' },
  { name: 'Antigua and Barbuda', code: '+1268', iso: 'ag' },
  { name: 'Argentina', code: '+54', iso: 'ar' },
  { name: 'Armenia (Հայաստան)', code: '+374', iso: 'am' },
  { name: 'Aruba', code: '+297', iso: 'aw' },
  { name: 'Ascension Island', code: '+247', iso: 'ac' },
  { name: 'Australia', code: '+61', iso: 'au' },
  { name: 'Austria (Österreich)', code: '+43', iso: 'at' },
  { name: 'Azerbaijan (Azərbaycan)', code: '+994', iso: 'az' },
  { name: 'Bahamas', code: '+1242', iso: 'bs' },
  { name: 'Bahrain (البحرين)', code: '+973', iso: 'bh' },
  { name: 'Bangladesh', code: '+880', iso: 'bd' },
  { name: 'Barbados', code: '+1246', iso: 'bb' },
  { name: 'Belarus (Беларусь)', code: '+375', iso: 'by' },
  { name: 'Belgium (België)', code: '+32', iso: 'be' },
  { name: 'Belize', code: '+501', iso: 'bz' },
  { name: 'Benin (Bénin)', code: '+229', iso: 'bj' },
  { name: 'Bermuda', code: '+1441', iso: 'bm' },
  { name: 'Bhutan (འབྲུག)', code: '+975', iso: 'bt' },
  { name: 'Bolivia', code: '+591', iso: 'bo' },
  { name: 'Bosnia and Herzegovina', code: '+387', iso: 'ba' },
  { name: 'Botswana', code: '+267', iso: 'bw' },
  { name: 'Brazil (Brasil)', code: '+55', iso: 'br' },
  { name: 'British Indian Ocean Territory', code: '+246', iso: 'io' },
  { name: 'British Virgin Islands', code: '+1284', iso: 'vg' },
  { name: 'Brunei', code: '+673', iso: 'bn' },
  { name: 'Bulgaria (България)', code: '+359', iso: 'bg' },
  { name: 'Burkina Faso', code: '+226', iso: 'bf' },
  { name: 'Burundi (Uburundi)', code: '+257', iso: 'bi' },
  { name: 'Cambodia (កម្ពុជា)', code: '+855', iso: 'kh' },
  { name: 'Cameroon (Cameroun)', code: '+237', iso: 'cm' },
  { name: 'Canada', code: '+1', iso: 'ca' },
  { name: 'Cape Verde (Kabu Verdi)', code: '+238', iso: 'cv' },
  { name: 'Caribbean Netherlands', code: '+599', iso: 'bq' },
  { name: 'Cayman Islands', code: '+1345', iso: 'ky' },
  { name: 'Central African Republic', code: '+236', iso: 'cf' },
  { name: 'Chad (Tchad)', code: '+235', iso: 'td' },
  { name: 'Chile', code: '+56', iso: 'cl' },
  { name: 'China (中国)', code: '+86', iso: 'cn' },
  { name: 'Christmas Island', code: '+61', iso: 'cx' },
  { name: 'Cocos (Keeling) Islands', code: '+61', iso: 'cc' },
  { name: 'Colombia', code: '+57', iso: 'co' },
  { name: 'Comoros (Komori)', code: '+269', iso: 'km' },
  { name: 'Congo (Brazzaville)', code: '+242', iso: 'cg' },
  { name: 'Congo (DRC)', code: '+243', iso: 'cd' },
  { name: 'Cook Islands', code: '+682', iso: 'ck' },
  { name: 'Costa Rica', code: '+506', iso: 'cr' },
  { name: "Côte d'Ivoire", code: '+225', iso: 'ci' },
  { name: 'Croatia (Hrvatska)', code: '+385', iso: 'hr' },
  { name: 'Cuba', code: '+53', iso: 'cu' },
  { name: 'Curaçao', code: '+599', iso: 'cw' },
  { name: 'Cyprus (Κύπρος)', code: '+357', iso: 'cy' },
  { name: 'Czech Republic (Česko)', code: '+420', iso: 'cz' },
  { name: 'Denmark (Danmark)', code: '+45', iso: 'dk' },
  { name: 'Djibouti', code: '+253', iso: 'dj' },
  { name: 'Dominica', code: '+1767', iso: 'dm' },
  { name: 'Dominican Republic', code: '+1', iso: 'do' },
  { name: 'Ecuador', code: '+593', iso: 'ec' },
  { name: 'Egypt (مصر)', code: '+20', iso: 'eg' },
  { name: 'El Salvador', code: '+503', iso: 'sv' },
  { name: 'Equatorial Guinea', code: '+240', iso: 'gq' },
  { name: 'Eritrea', code: '+291', iso: 'er' },
  { name: 'Estonia (Eesti)', code: '+372', iso: 'ee' },
  { name: 'Eswatini', code: '+268', iso: 'sz' },
  { name: 'Ethiopia', code: '+251', iso: 'et' },
  { name: 'Falkland Islands', code: '+500', iso: 'fk' },
  { name: 'Faroe Islands (Føroyar)', code: '+298', iso: 'fo' },
  { name: 'Fiji', code: '+679', iso: 'fj' },
  { name: 'Finland (Suomi)', code: '+358', iso: 'fi' },
  { name: 'France', code: '+33', iso: 'fr' },
  { name: 'French Guiana', code: '+594', iso: 'gf' },
  { name: 'French Polynesia', code: '+689', iso: 'pf' },
  { name: 'Gabon', code: '+241', iso: 'ga' },
  { name: 'Gambia', code: '+220', iso: 'gm' },
  { name: 'Georgia (საქართველო)', code: '+995', iso: 'ge' },
  { name: 'Germany (Deutschland)', code: '+49', iso: 'de' },
  { name: 'Ghana', code: '+233', iso: 'gh' },
  { name: 'Gibraltar', code: '+350', iso: 'gi' },
  { name: 'Greece (Ελλάδα)', code: '+30', iso: 'gr' },
  { name: 'Greenland (Kalaallit Nunaat)', code: '+299', iso: 'gl' },
  { name: 'Grenada', code: '+1473', iso: 'gd' },
  { name: 'Guadeloupe', code: '+590', iso: 'gp' },
  { name: 'Guam', code: '+1671', iso: 'gu' },
  { name: 'Guatemala', code: '+502', iso: 'gt' },
  { name: 'Guernsey', code: '+44', iso: 'gg' },
  { name: 'Guinea (Guinée)', code: '+224', iso: 'gn' },
  { name: 'Guinea-Bissau', code: '+245', iso: 'gw' },
  { name: 'Guyana', code: '+592', iso: 'gy' },
  { name: 'Haiti', code: '+509', iso: 'ht' },
  { name: 'Honduras', code: '+504', iso: 'hn' },
  { name: 'Hong Kong (香港)', code: '+852', iso: 'hk' },
  { name: 'Hungary (Magyarország)', code: '+36', iso: 'hu' },
  { name: 'Iceland (Ísland)', code: '+354', iso: 'is' },
  { name: 'India', code: '+91', iso: 'in' },
  { name: 'Indonesia', code: '+62', iso: 'id' },
  { name: 'Iran (ایران)', code: '+98', iso: 'ir' },
  { name: 'Iraq (العراق)', code: '+964', iso: 'iq' },
  { name: 'Ireland', code: '+353', iso: 'ie' },
  { name: 'Isle of Man', code: '+44', iso: 'im' },
  { name: 'Israel (ישראל)', code: '+972', iso: 'il' },
  { name: 'Italy (Italia)', code: '+39', iso: 'it' },
  { name: 'Jamaica', code: '+1876', iso: 'jm' },
  { name: 'Japan (日本)', code: '+81', iso: 'jp' },
  { name: 'Jersey', code: '+44', iso: 'je' },
  { name: 'Jordan (الأردن)', code: '+962', iso: 'jo' },
  { name: 'Kazakhstan (Қазақستان)', code: '+7', iso: 'kz' },
  { name: 'Kenya', code: '+254', iso: 'ke' },
  { name: 'Kiribati', code: '+686', iso: 'ki' },
  { name: 'Kosovo', code: '+383', iso: 'xk' },
  { name: 'Kuwait (الكويت)', code: '+965', iso: 'kw' },
  { name: 'Kyrgyzstan (Кыргызстан)', code: '+996', iso: 'kg' },
  { name: 'Laos (ລາວ)', code: '+856', iso: 'la' },
  { name: 'Latvia (Latvija)', code: '+371', iso: 'lv' },
  { name: 'Lebanon (لبنان)', code: '+961', iso: 'lb' },
  { name: 'Lesotho', code: '+266', iso: 'ls' },
  { name: 'Liberia', code: '+231', iso: 'lr' },
  { name: 'Libya (ليبيا)', code: '+218', iso: 'ly' },
  { name: 'Liechtenstein', code: '+423', iso: 'li' },
  { name: 'Lithuania (Lietuva)', code: '+370', iso: 'lt' },
  { name: 'Luxembourg', code: '+352', iso: 'lu' },
  { name: 'Macau (澳門)', code: '+853', iso: 'mo' },
  { name: 'Madagascar', code: '+261', iso: 'mg' },
  { name: 'Malawi', code: '+265', iso: 'mw' },
  { name: 'Malaysia', code: '+60', iso: 'my' },
  { name: 'Maldives', code: '+960', iso: 'mv' },
  { name: 'Mali', code: '+223', iso: 'ml' },
  { name: 'Malta', code: '+356', iso: 'mt' },
  { name: 'Marshall Islands', code: '+692', iso: 'mh' },
  { name: 'Martinique', code: '+596', iso: 'mq' },
  { name: 'Mauritania (موريتانيا)', code: '+222', iso: 'mr' },
  { name: 'Mauritius', code: '+230', iso: 'mu' },
  { name: 'Mayotte', code: '+262', iso: 'yt' },
  { name: 'Mexico (México)', code: '+52', iso: 'mx' },
  { name: 'Micronesia', code: '+691', iso: 'fm' },
  { name: 'Moldova', code: '+373', iso: 'md' },
  { name: 'Monaco', code: '+377', iso: 'mc' },
  { name: 'Mongolia (Монгол)', code: '+976', iso: 'mn' },
  { name: 'Montenegro (Crna Gora)', code: '+382', iso: 'me' },
  { name: 'Montserrat', code: '+1664', iso: 'ms' },
  { name: 'Morocco (المغرب)', code: '+212', iso: 'ma' },
  { name: 'Mozambique (Moçambique)', code: '+258', iso: 'mz' },
  { name: 'Myanmar (Burma)', code: '+95', iso: 'mm' },
  { name: 'Namibia', code: '+264', iso: 'na' },
  { name: 'Nauru', code: '+674', iso: 'nr' },
  { name: 'Nepal (नेपाल)', code: '+977', iso: 'np' },
  { name: 'Netherlands (Nederland)', code: '+31', iso: 'nl' },
  { name: 'New Caledonia', code: '+687', iso: 'nc' },
  { name: 'New Zealand', code: '+64', iso: 'nz' },
  { name: 'Nicaragua', code: '+505', iso: 'ni' },
  { name: 'Niger (Nijar)', code: '+227', iso: 'ne' },
  { name: 'Nigeria', code: '+234', iso: 'ng' },
  { name: 'Niue', code: '+683', iso: 'nu' },
  { name: 'Norfolk Island', code: '+672', iso: 'nf' },
  { name: 'North Korea (조선)', code: '+850', iso: 'kp' },
  { name: 'North Macedonia', code: '+389', iso: 'mk' },
  { name: 'Northern Mariana Islands', code: '+1670', iso: 'mp' },
  { name: 'Norway (Norge)', code: '+47', iso: 'no' },
  { name: 'Oman (عُمان)', code: '+968', iso: 'om' },
  { name: 'Pakistan (پاکستان)', code: '+92', iso: 'pk' },
  { name: 'Palau', code: '+680', iso: 'pw' },
  { name: 'Palestine (فلسطين)', code: '+970', iso: 'ps' },
  { name: 'Panama (Panamá)', code: '+507', iso: 'pa' },
  { name: 'Papua New Guinea', code: '+675', iso: 'pg' },
  { name: 'Paraguay', code: '+595', iso: 'py' },
  { name: 'Peru (Perú)', code: '+51', iso: 'pe' },
  { name: 'Philippines', code: '+63', iso: 'ph' },
  { name: 'Poland (Polska)', code: '+48', iso: 'pl' },
  { name: 'Portugal', code: '+351', iso: 'pt' },
  { name: 'Puerto Rico', code: '+1', iso: 'pr' },
  { name: 'Qatar (قطر)', code: '+974', iso: 'qa' },
  { name: 'Réunion', code: '+262', iso: 're' },
  { name: 'Romania (România)', code: '+40', iso: 'ro' },
  { name: 'Russia (Россия)', code: '+7', iso: 'ru' },
  { name: 'Rwanda', code: '+250', iso: 'rw' },
  { name: 'Saint Kitts and Nevis', code: '+1869', iso: 'kn' },
  { name: 'Saint Lucia', code: '+1758', iso: 'lc' },
  { name: 'Saint Vincent and the Grenadines', code: '+1784', iso: 'vc' },
  { name: 'Samoa', code: '+685', iso: 'ws' },
  { name: 'San Marino', code: '+378', iso: 'sm' },
  { name: 'São Tomé and Príncipe', code: '+239', iso: 'st' },
  { name: 'Saudi Arabia (السعودية)', code: '+966', iso: 'sa' },
  { name: 'Senegal (Sénégal)', code: '+221', iso: 'sn' },
  { name: 'Serbia (Србија)', code: '+381', iso: 'rs' },
  { name: 'Seychelles', code: '+248', iso: 'sc' },
  { name: 'Sierra Leone', code: '+232', iso: 'sl' },
  { name: 'Singapore', code: '+65', iso: 'sg' },
  { name: 'Sint Maarten', code: '+1721', iso: 'sx' },
  { name: 'Slovakia (Slovensko)', code: '+421', iso: 'sk' },
  { name: 'Slovenia (Slovenija)', code: '+386', iso: 'si' },
  { name: 'Solomon Islands', code: '+677', iso: 'sb' },
  { name: 'Somalia', code: '+252', iso: 'so' },
  { name: 'South Africa', code: '+27', iso: 'za' },
  { name: 'South Korea (대한민국)', code: '+82', iso: 'kr' },
  { name: 'South Sudan', code: '+211', iso: 'ss' },
  { name: 'Spain (España)', code: '+34', iso: 'es' },
  { name: 'Sri Lanka (ශ්රී ලංකා)', code: '+94', iso: 'lk' },
  { name: 'Sudan (السودان)', code: '+249', iso: 'sd' },
  { name: 'Suriname', code: '+597', iso: 'sr' },
  { name: 'Sweden (Sverige)', code: '+46', iso: 'se' },
  { name: 'Switzerland (Schweiz)', code: '+41', iso: 'ch' },
  { name: 'Syria (سوريا)', code: '+963', iso: 'sy' },
  { name: 'Taiwan (台灣)', code: '+886', iso: 'tw' },
  { name: 'Tajikistan (Тоҷикистон)', code: '+992', iso: 'tj' },
  { name: 'Tanzania', code: '+255', iso: 'tz' },
  { name: 'Thailand (ไทย)', code: '+66', iso: 'th' },
  { name: 'Timor-Leste', code: '+670', iso: 'tl' },
  { name: 'Togo', code: '+228', iso: 'tg' },
  { name: 'Tokelau', code: '+690', iso: 'tk' },
  { name: 'Tonga', code: '+676', iso: 'to' },
  { name: 'Trinidad and Tobago', code: '+1868', iso: 'tt' },
  { name: 'Tunisia (تونس)', code: '+216', iso: 'tn' },
  { name: 'Turkey (Türkiye)', code: '+90', iso: 'tr' },
  { name: 'Turkmenistan', code: '+993', iso: 'tm' },
  { name: 'Turks and Caicos Islands', code: '+1649', iso: 'tc' },
  { name: 'Tuvalu', code: '+688', iso: 'tv' },
  { name: 'Uganda', code: '+256', iso: 'ug' },
  { name: 'Ukraine (Україна)', code: '+380', iso: 'ua' },
  { name: 'United Arab Emirates', code: '+971', iso: 'ae' },
  { name: 'United Kingdom', code: '+44', iso: 'gb' },
  { name: 'United States', code: '+1', iso: 'us' },
  { name: 'Uruguay', code: '+598', iso: 'uy' },
  { name: 'Uzbekistan (Oʻzbekiston)', code: '+998', iso: 'uz' },
  { name: 'Vanuatu', code: '+678', iso: 'vu' },
  { name: 'Vatican City', code: '+39', iso: 'va' },
  { name: 'Venezuela', code: '+58', iso: 've' },
  { name: 'Vietnam (Việt Nam)', code: '+84', iso: 'vn' },
  { name: 'Wallis and Futuna', code: '+681', iso: 'wf' },
  { name: 'Western Sahara', code: '+212', iso: 'eh' },
  { name: 'Yemen (اليمن)', code: '+967', iso: 'ye' },
  { name: 'Zambia', code: '+260', iso: 'zm' },
  { name: 'Zimbabwe', code: '+263', iso: 'zw' }
]

const convertDDMMYYYYToYYYYMMDD=(dateStr)=>{
  if(!dateStr){
    return '';
  }
  const parts=dateStr.split('-');
  if(parts.length===3){
    if(parts[0].length===4){
      return dateStr;
    }
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
}

const convertYYYYMMDDToDDMMYYYY=(dateStr)=>{
  if(!dateStr){
    return '';
  }
  const parts=dateStr.split('-');
  if(parts.length===3){
    if(parts[0].length===2){
      return dateStr ;
    }
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
}


function Profile() {

  const {profile, updateProfile}=useDashboard();
  const getNameParts=(fullNameStr)=>{
    const trimmed=(fullNameStr || '').trim()
    if(!trimmed){
      return {first:'', last:''}
    }
    const parts=trimmed.split(/\s+/)
    if(parts.length>1){
      const last=parts.pop()
      const first=parts.join(' ')
      return {first, last}
    }
    return {first:trimmed, last:''}
  }

  const [firstName, setFirstName]=useState('')
  const [lastName, setLastName]=useState('')
  const [gender, setGender]=useState('')
  const [dob, setDob]=useState('')
  const [fatherName, setFatherName]=useState('')
  const [address, setAddress]=useState('')
  const [stateName, setStateName]=useState('')

  const [mobileNum, setMobileNum]=useState('')
  const [isEditingMobile, setIsEditingMobile]=useState(false)
  const [mobileDraft, setMobileDraft]=useState('')
  const [showPasswordModal, setShowPasswordModal]=useState(false)
  const [passwordInput, setPasswordInput]=useState('')
  const [showPassword, setShowPassword]=useState(false)

  const [verificationParam, setVerificationParam]=useState('')
  const [showVerifyModal, setShowVerifyModal]=useState(null) 
  const [verifyInputVal, setVerifyInputVal]=useState('')
  const [selectedCountry, setSelectedCountry]=useState(COUNTRIES.find(c=> c.iso==='in') || COUNTRIES[0])
  const [showCountryDropdown, setShowCountryDropdown]=useState(false)
  const [showLicenseText, setShowLicenseText]=useState(false)
  const [showPanText, setShowPanText]=useState(false)
  const [dropdownOpen, setDropdownOpen]=useState(false)
  const countryMenuRef=useRef(null)
  const dropdownRef=useRef(null)

  const [editingFields,setEditingFields]=useState({
    name: false,
    gender: false,
    dob: false,
    fatherName: false,
    address: false,
    state: false
  })

  const isEditing=(fieldName)=>{
    return editingFields[fieldName];
  }

  const maskedMobile=mobileNum? `+91-XXXXXX${mobileNum.slice(-4)}` : `+91-XXXXXXX001`

  useEffect(()=>{
    const nameObj=getNameParts(profile.fullName || profile.name)
    setFirstName(nameObj.first || '')
    setLastName(nameObj.last || '')
    setGender(profile.gender || '')
    setDob(convertDDMMYYYYToYYYYMMDD(profile.dob || ''))
    setFatherName(profile.fatherName || '')
    setAddress(profile.address || 'India')
    setStateName(profile.state || '')
    setMobileNum(profile.mobile || 'XXXXXXXXXX')
  },[profile]);
 
  useEffect(()=>{
    function handleClickOutside(e){
      if(countryMenuRef.current && !countryMenuRef.current.contains(e.target)){
        setShowCountryDropdown(false);
      }
    }
     if(showCountryDropdown){
      document.addEventListener('mousedown',handleClickOutside)
    }
    return()=>{
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[showCountryDropdown]);

  useEffect(()=>{
    function handleClickOutside(e){
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setDropdownOpen(false);
      }
    }
     if(dropdownOpen){
      document.addEventListener('mousedown',handleClickOutside)
    }
    return()=>{
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[dropdownOpen]);

  const startEditField=(fieldName)=>{
    setEditingFields(prev=>({...prev, [fieldName]: true}));
  }
  
  const cancelEditField=(fieldName)=>{
    //reset
    if(fieldName==='name'){
      const nameObj=getNameParts(profile.fullName || profile.name)
      setFirstName(nameObj.first || 'MANJEET SINGH')
      setLastName(nameObj.last || 'TAWATIYA')
    }else if(fieldName==='gender'){
      setGender(profile.gender || 'MALE')
    }else if(fieldName==='dob'){
      setDob(convertDDMMYYYYToYYYYMMDD(profile.dob || ''))
    }else if(fieldName==='fatherName'){
      setFatherName(profile.fatherName || '')
    }else if(fieldName==='address'){
      setAddress(profile.address || 'India')
    }else if(fieldName==='state'){
      setStateName(profile.state || '')
    }
    setEditingFields(prev=>({...prev, [fieldName]: false}))
  }

  const handleSaveChanges=()=>{
    const combined=lastName.trim()? `${firstName.trim()} ${lastName.trim()}` : firstName.trim()
    const updates={
      fullName: combined,
      name: combined,
      gender,
      dob: convertYYYYMMDDToDDMMYYYY(dob),
      fatherName,
      address,
      state: stateName
    }
    updateProfile(updates);
    
    setEditingFields({
      name: false,
      gender: false,
      dob: false,
      fatherName: false,
      address: false,
      state: false
    })
  }

  const handleCancelAllChanges = () => {
    const nameObj = getNameParts(profile.fullName || profile.name)
    setFirstName(nameObj.first || '')
    setLastName(nameObj.last || '')
    setGender(profile.gender || '')
    setDob(convertDDMMYYYYToYYYYMMDD(profile.dob || ''))
    setFatherName(profile.fatherName || '')
    setAddress(profile.address || 'India')
    setStateName(profile.state || '')

    setEditingFields({
      name: false,
      gender: false,
      dob: false,
      fatherName: false,
      address: false,
      state: false
    })
  }

  const startEditMobile=()=>{
    setPasswordInput('')
    setShowPassword(false)
    setShowPasswordModal(true)
  }

  const cancelEditMobile=()=>{
    setIsEditingMobile(false)
  }

  const handlePasswordSubmit=(e)=>{
    if(e){
      e.preventDefault();
    }
    if(!passwordInput){
      return
    }
    setShowPasswordModal(false)
    setMobileDraft(mobileNum)
    setIsEditingMobile(true)
  }
  
  const saveMobile=()=>{
    updateProfile({mobile: mobileDraft})
    setMobileNum(mobileDraft)
    setIsEditingMobile(false)
  }

  const handleVerifyParamSelectChange=(e)=>{
    const val=e.target.value
    setVerificationParam(val)
    if(val){
      setVerifyInputVal('')
      setShowCountryDropdown(false)
      setShowLicenseText(false)
      setShowPanText(false)
      setSelectedCountry(COUNTRIES.find(c=>c.iso==='in') || COUNTRIES[0])
      setShowVerifyModal(val)
    }
  }

  const closeVerifyModal = () => {
    setShowVerifyModal(null)
    setVerificationParam('')
  }

  const handleVerifySubmit=(e)=>{
    if(e){
      e.preventDefault();
    } 
    if(!verifyInputVal && showVerifyModal!=='secondary_mobile'){
      return
    }
    alert(`Verified details submitted successfully.`);
    setShowVerifyModal(null)
  }

  const getVerifyModalDetails=()=>{
    switch(showVerifyModal){
      case 'secondary_email':
        return {title:'Add Secondary Email Id', placeholder:'Enter Secondary Email Id*'}
      case 'primary_email':
        return {title:'Add Primary Email Id', placeholder:'Enter Primary Email Id*'}
      case 'aadhaar':
        return {title:'Add Aadhaar', placeholder:'Enter Aadhaar*'}
      case 'secondary_mobile':
        return {title:'Add Secondary Mobile No', placeholder:'Enter Secondary Mobile No*'}
      case 'driving_license':
        return {title:'Add Driving Licence', placeholder:'Enter Driving Licence*' }
      case 'pan':
        return {title:'Add PAN', placeholder:'Enter PAN*' }
      default:
        return {title:'', placeholder:''}
    }
  }

  const modalInfo=getVerifyModalDetails()
  
  const isAnyFieldEditing=Object.values(editingFields).some(Boolean);

  return (
    <div className="profile-component-container">
      <div className="profile-component-header">
        <h2>EDIT PROFILE</h2>
      </div>
      <div className="profile-component-grid">
        
        {/*USER DETAILS*/}
        <div className="profile-details-panel user-details-box">
          <h3 className="panel-box-title">USER DETAILS</h3>
          {/*BASIC SECTION*/}
          <div className="profile-details-section">
            <h4 className="section-subtitle">BASIC</h4>
            
            <div className="profile-fields-card-box">
              
              {/*NAME*/}
              <div className="profile-field-item-row">
                <div className="profile-field-item-header">
                  <span className="profile-field-item-label">NAME</span>
                  {isEditing('name')? (
                    <button
                      type="button"
                      className="profile-cancel-x-btn"
                      onClick={()=>cancelEditField('name')}
                      aria-label="Cancel editing name"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="profile-edit-pencil-btn"
                      onClick={()=>startEditField('name')}
                      title="Click to Edit Name"
                      aria-label="Edit name"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                </div>
                {isEditing('name')? (
                  <div className="profile-input-group-row">
                    <input
                      type="text"
                      className="profile-field-text-input"
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}
                      placeholder="FIRST NAME / FULL NAME"
                      autoFocus
                    />
                    <input
                      type="text"
                      className="profile-field-text-input"
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
                      placeholder="LAST NAME"
                    />
                  </div>
                ) : (
                  <p className="profile-field-text-value">
                    {lastName ? `${firstName} ${lastName}` : firstName}
                  </p>
                )}
              </div>

              {/*GENDER*/}
              <div className="profile-field-item-row">
                <div className="profile-field-item-header">
                  <span className="profile-field-item-label">GENDER</span>
                  {isEditing('gender')? (
                    <button
                      type="button"
                      className="profile-cancel-x-btn"
                      onClick={() => cancelEditField('gender')}
                      aria-label="Cancel editing gender"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="profile-edit-pencil-btn"
                      onClick={() => startEditField('gender')}
                      title="Click to Edit Gender"
                      aria-label="Edit gender"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                </div>

                {isEditing('gender')? (
                  <div className="profile-input-group-row">
                    <select
                      className="profile-field-select-dropdown"
                      value={gender}
                      onChange={(e)=>setGender(e.target.value)}
                      autoFocus
                    >
                      <option value="">SELECT</option>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                ) : (
                  <p className="profile-field-text-value">{gender}</p>
                )}
              </div>

              {/*D.O.B*/}
              <div className="profile-field-item-row">
                <div className="profile-field-item-header">
                  <span className="profile-field-item-label">D.O.B</span>
                  {isEditing('dob') ? (
                    <button
                      type="button"
                      className="profile-cancel-x-btn"
                      onClick={()=>cancelEditField('dob')}
                      aria-label="Cancel editing date of birth"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="profile-edit-pencil-btn"
                      onClick={()=>startEditField('dob')}
                      title="Click to Edit DOB"
                      aria-label="Edit date of birth"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                </div>
                {isEditing('dob')? (
                  <div className="profile-input-group-row">
                    <input
                      type="date"
                      className="profile-field-text-input"
                      value={dob}
                      onChange={(e)=>setDob(e.target.value)}
                      placeholder="DD-MM-YYYY"
                    />
                  </div>
                ) : (
                  <p className="profile-field-text-value">
                    {dob? convertYYYYMMDDToDDMMYYYY(dob) : ''}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/*OTHER*/}
          <div className="profile-details-section">
            <h4 className="section-subtitle">OTHER</h4>
            <div className="profile-fields-card-box">
              
              {/*FATHER'S NAME*/}
              <div className="profile-field-item-row">
                <div className="profile-field-item-header">
                  <span className="profile-field-item-label">FATHER'S NAME</span>
                  {isEditing('fatherName')? (
                    <button
                      type="button"
                      className="profile-cancel-x-btn"
                      onClick={()=>cancelEditField('fatherName')}
                      aria-label="Cancel editing father's name"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="profile-edit-pencil-btn"
                      onClick={()=>startEditField('fatherName')}
                      title="Click to Edit Father's Name"
                      aria-label="Edit father's name"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                </div>
                {isEditing('fatherName')? (
                  <div className="profile-input-group-row">
                    <input
                      type="text"
                      className="profile-field-text-input"
                      value={fatherName}
                      onChange={(e)=>setFatherName(e.target.value)}
                      placeholder="Father's Name"
                      autoFocus
                    />
                  </div>
                ) : (
                  <p className="profile-field-text-value">
                    {fatherName || ''}
                  </p>
                )}
              </div>

              {/*ADDRESS*/}
              <div className="profile-field-item-row">
                <div className="profile-field-item-header">
                  <span className="profile-field-item-label">ADDRESS</span>
                  {isEditing('address') ? (
                    <button
                      type="button"
                      className="profile-cancel-x-btn"
                      onClick={()=>cancelEditField('address')}
                      aria-label="Cancel editing address"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="profile-edit-pencil-btn"
                      onClick={()=>startEditField('address')}
                      title="Click to Edit Address"
                      aria-label="Edit address"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                </div>
                {isEditing('address')? (
                  <div className="profile-input-group-row">
                    <input
                      type="text"
                      className="profile-field-text-input"
                      value={address}
                      onChange={(e)=>setAddress(e.target.value)}
                      placeholder="Address"
                      autoFocus
                    />
                  </div>
                ) : (
                  <p className="profile-field-text-value">{address}</p>
                )}
              </div>

              {/*STATE*/}
              <div className="profile-field-item-row">
                <div className="profile-field-item-header">
                  <span className="profile-field-item-label">STATE</span>
                  {isEditing('state')? (
                    <button
                      type="button"
                      className="profile-cancel-x-btn"
                      onClick={()=>cancelEditField('state')}
                      aria-label="Cancel editing state"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="profile-edit-pencil-btn"
                      onClick={()=>startEditField('state')}
                      title="Click to Edit State"
                      aria-label="Edit state"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                </div>
                {isEditing('state')? (
                  <div className="profile-input-group-row">
                    <select
                      className="profile-field-select-dropdown"
                      value={stateName}
                      onChange={(e)=>setStateName(e.target.value)}
                      autoFocus
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((st)=>(
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="profile-field-text-value">
                    {stateName || ''}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/*User Details (EDIT BUTTON)*/}
          <div className="profile-action-btn-row">
            <button
              type="button"
              className={`btn-profile-edit-toggle ${isAnyFieldEditing ? 'active' : ''}`}
              onClick={isAnyFieldEditing ? handleSaveChanges : undefined}
            >
              Edit
            </button>
          </div>
        </div>


        {/*VERIFICATION DETAILS*/}
        <div className="profile-details-panel verification-details-box">
          <h3 className="panel-box-title underline">VERIFICATION DETAILS</h3>
          <div className="verification-details-content">
            
            {/*PRIMARY MOBILE NO*/}
            <div className="verification-field-row">
              <span className="verification-field-label">PRIMARY MOBILE NO</span>
              {!isEditingMobile ? (
                <div className="verification-value-display-row">
                  <span className="verification-field-value">{maskedMobile}</span>
                  <button
                    type="button"
                    className="profile-edit-pencil-btn"
                    onClick={startEditMobile}
                    aria-label="Edit mobile number"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </div>
              ) : (
                <div className="verification-inline-edit-group">
                  <input
                    type="text"
                    className="profile-field-text-input mobile-edit-input"
                    value={mobileDraft}
                    onChange={(e)=>setMobileDraft(e.target.value)}
                    placeholder="Enter mobile number"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="profile-inline-save-btn"
                    onClick={saveMobile}
                    title="Save mobile number"
                  >
                    <i className="bi bi-check2"></i>
                  </button>
                  <button
                    type="button"
                    className="profile-inline-cancel-btn"
                    onClick={cancelEditMobile}
                    title="Cancel editing"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              )}
            </div>

            {/*SELECT VERIFICATION PARAMETERS*/}
            <div className="verification-param-select-row">
              <label className="verification-param-label">
                Select Verification Parameters
              </label>
              <div 
                className="verification-param-select-container" 
                ref={dropdownRef} 
                style={{ position: 'relative', flex: 1, width: '100%', minWidth: '200px' }}
              >
                <div 
                  className="verification-param-select-dropdown" 
                  onClick={() => setDropdownOpen(prev => !prev)}
                  style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    userSelect: 'none'
                  }}
                >
                  <span>
                    {verificationParam === 'secondary_email' ? 'Secondary Email Id' :
                     verificationParam === 'primary_email' ? 'Primary Email Id' :
                     verificationParam === 'aadhaar' ? 'Aadhaar' :
                     verificationParam === 'secondary_mobile' ? 'Secondary Mobile No' :
                     verificationParam === 'driving_license' ? 'Driving Licence' :
                     verificationParam === 'pan' ? 'PAN' : 'Select'}
                  </span>
                  <i className={`bi ${dropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} style={{ fontSize: '12px', color: '#64748b' }}></i>
                </div>

                {dropdownOpen && (
                  <ul 
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: 0,
                      width: '100%',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '4px 0',
                      margin: '0 0 4px 0',
                      listStyle: 'none',
                      zIndex: 1000,
                      maxHeight: '220px',
                      overflowY: 'auto'
                    }}
                  >
                    {[
                      { value: '', label: 'Select' },
                      { value: 'secondary_email', label: 'Secondary Email Id' },
                      { value: 'primary_email', label: 'Primary Email Id' },
                      { value: 'aadhaar', label: 'Aadhaar' },
                      { value: 'secondary_mobile', label: 'Secondary Mobile No' },
                      { value: 'driving_license', label: 'Driving Licence' },
                      { value: 'pan', label: 'PAN' }
                    ].map((opt) => (
                      <li
                        key={opt.value}
                        onClick={() => {
                          handleVerifyParamSelectChange({ target: { value: opt.value } });
                          setDropdownOpen(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          fontSize: '14px',
                          color: opt.value === verificationParam ? '#2563eb' : '#334155',
                          backgroundColor: opt.value === verificationParam ? '#f0f7ff' : 'transparent',
                          cursor: 'pointer',
                          fontWeight: opt.value === verificationParam ? '600' : 'normal',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (opt.value !== verificationParam) {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (opt.value !== verificationParam) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Password verification modal*/}
      {showPasswordModal && (
        <div className="profile-modal-backdrop" onClick={() => setShowPasswordModal(false)}>
          <div className="profile-password-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="profile-modal-close-btn"
              onClick={()=>setShowPasswordModal(false)}
              aria-label="Close modal"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            
            <h4 className="profile-modal-title">Verify your password</h4>
            
            <form onSubmit={handlePasswordSubmit} className="profile-modal-body-row">
              <div className="profile-password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="profile-password-input-field"
                  value={passwordInput}
                  onChange={(e)=>setPasswordInput(e.target.value)}
                  placeholder="Enter Current Password"
                  autoFocus
                />
                <button
                  type="button"
                  className="profile-password-eye-icon-btn"
                  onClick={() => setShowPassword(prev=>!prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                </button>
              </div>
              <button type="submit" className="btn-profile-modal-submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}


      {/* Verification Parameter Popup Modal */}
      {showVerifyModal && (
        <div className="profile-verify-modal-backdrop" onClick={closeVerifyModal}>
          <div className="profile-verify-modal" onClick={(e)=>e.stopPropagation()}>
            <button
              type="button"
              className="profile-verify-modal-close"
              onClick={closeVerifyModal}
              aria-label="Close modal"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            
            <h4 className="profile-verify-modal-title">{modalInfo.title}</h4>
            
            <form onSubmit={handleVerifySubmit} className="profile-verify-form-row">
              <div className="profile-verify-input-wrapper">
                {showVerifyModal === 'secondary_mobile' ? (
                  <div className="profile-flag-picker-container" ref={countryMenuRef}>
                    <button
                      type="button"
                      className="profile-flag-button"
                      onClick={()=>setShowCountryDropdown(prev=>!prev)}
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${selectedCountry.iso}.png`}
                        srcSet={`https://flagcdn.com/48x36/${selectedCountry.iso}.png 2x`}
                        width="24"
                        height="18"
                        alt={selectedCountry.name}
                        className="country-flag-img"
                      />
                      <span className="profile-flag-indicator">▼</span>
                      <span>*</span>
                    </button>
                    
                    <input
                      type="text"
                      className="profile-mobile-text-input"
                      value={verifyInputVal}
                      onChange={(e)=>setVerifyInputVal(e.target.value)}
                      placeholder={modalInfo.placeholder}
                      autoFocus
                    />
                    {showCountryDropdown && (
                      <ul className="profile-country-dropdown-list">
                        {COUNTRIES.map((c)=>(
                          <li
                            key={c.iso}
                            className="profile-country-option-item"
                            onClick={()=>{
                              setSelectedCountry(c)
                              setShowCountryDropdown(false)
                            }}
                          >
                            <div className="country-option">
                              <img
                                src={`https://flagcdn.com/24x18/${c.iso}.png`}
                                srcSet={`https://flagcdn.com/48x36/${c.iso}.png 2x`}
                                width="24"
                                height="18"
                                alt={c.name}
                                className="country-flag-img"
                              />
                              <span className="country-name">{c.name}</span>
                              <span className="country-code">{c.code}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : showVerifyModal==='driving_license' ? (
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showLicenseText ? 'text' : 'password'}
                      className="profile-verify-input-field"
                      value={verifyInputVal}
                      onChange={(e)=>setVerifyInputVal(e.target.value)}
                      placeholder={modalInfo.placeholder}
                      autoFocus
                    />
                    <div className="profile-input-icons-wrapper">
                      <i className="bi bi-info-circle profile-input-icon-action" title="Licence Format: e.g. DL-1420110012345"></i>
                      <i
                        className={`bi ${showLicenseText ? 'bi-eye' : 'bi-eye-slash'} profile-input-icon-action`}
                        onClick={()=>setShowLicenseText(prev=>!prev)}
                      ></i>
                    </div>
                  </div>
                ) : showVerifyModal==='pan' ? (
                  <div style={{position: 'relative'}}>
                    <input
                      type={showPanText ? 'text' : 'password'}
                      className="profile-verify-input-field"
                      value={verifyInputVal}
                      onChange={(e)=>setVerifyInputVal(e.target.value)}
                      placeholder={modalInfo.placeholder}
                      autoFocus
                    />
                    <div className="profile-input-icons-wrapper">
                      <i className="bi bi-info-circle profile-input-icon-action" title="PAN Format: e.g. ABCDE1234F"></i>
                      <i
                        className={`bi ${showPanText ? 'bi-eye' : 'bi-eye-slash'} profile-input-icon-action`}
                        onClick={()=>setShowPanText(prev=>!prev)}
                      ></i>
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="profile-verify-input-field"
                    value={verifyInputVal}
                    onChange={(e)=>setVerifyInputVal(e.target.value)}
                    placeholder={modalInfo.placeholder}
                    autoFocus
                  />
                )}
              </div>
              <button type="submit" className="btn-profile-verify-submit">
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )

}

export default Profile