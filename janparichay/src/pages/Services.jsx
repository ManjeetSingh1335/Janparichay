import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDashboard } from '../context/DashboardContext.jsx'

import meriPehchaanLogo from '../images/meri-pehchaan.png'
import digitalIndiaLogo from '../images/Digital-India.png'

import arunachalLandInfoLogo from '../images/arunachal1.png'
import arunachalMyGovLogo from '../images/arunachal2.png'
import assamMyGov from '../images/assam1.png'

import biharSamadhan from '../images/bihar1.png'
import biharLawDept from '../images/bihar2.png'
import biharXLN from '../images/bihar3.png'
import biharMutationLPC from '../images/bihar4.png'
import biharRationCard from '../images/bihar5.png'
import biharServicePlus from '../images/bihar6.png'
import biharSwcs from '../images/bihar7.png'

import CentralJP from '../images/Central1.png'
import CentralAcademics from '../images/Central2.png'
import CentralBlog from '../images/Central3.png'
import CentralInnovative from '../images/Central4.png'
import CentralPledge from '../images/Central5.png'
import CentralQuiz from '../images/Central6.png'
import CentralSelf4society from '../images/Central7.png'
import CentralAuth from '../images/Central8.png'
import CentralProhibition from '../images/Central9.png'
import CentralUmang from '../images/Central10.png'

import GoaMygov from '../images/goa.mygov.in.png'

import Gujarat_Pro from '../images/Gujarat.png'
import Gujarat_service from '../images/Guj-3.png'
import Gujarat_mygov from '../images/gujarat.mygov.in.png'

import Haryana_Mygov from '../images/haryana.mygov.in.png'

import HP_mygov from '../images/himachal.mygov.in.png'

import JK_01 from '../images/Jk_01.png'
import JK_mygov from '../images/jk.mygov.in.png'
import Jk_Eservices from '../images/eserviceissspensionundjr5nu-prod.png'

import Jharkhand_mygov from '../images/jharkhand.mygov.in.png'

import Karnataka_mygov from '../images/karnataka.mygov.in.png'
import Kerala_mygov from '../images/productiondigitalsurveciz6p-prod.png'
import Kerala_services from '../images/Kerala_janparichay.png'

import Ladakh_mygov from '../images/mygovladakhi4own76ishshxp4t-prod.png'
import MP_prod from '../images/mp-prod.png'
import MP_Mygov from '../images/mp.mygov.in.png'

import Maha_gov from '../images/ecourts-prod.png'
import Maha_Mygov from '../images/maharashtra.mygov.in.png'
import Manipur_mygov from '../images/manipur.mygov.in.png'

import Mizo_gov from '../images/mygovmizoram-prod.png'
import Nagaland_mygov from '../images/nagaland.mygov.in.png'

import Others_State from '../images/mygov22-prod.png'

import Punjab_SSOID from '../images/ssodwrlocal-prod.png'
import Punjab_PWDIMS from '../images/prbd-prod.png'
import Punjab_PCRIS from '../images/pcrisportal-prod.png'
import Punjab_IFMS from '../images/integratedfinancialman6xxlv-prod.png'
import Punjab_EPMS from '../images/epms-prod.png'
import Punjab_IHRMS from '../images/ihrms-prod.png'
import Rajasthan_gov from '../images/mygovrajasthanyogogpn8w968h-prod.png'
 

import S3WaaS_logo from '../images/S3WaaS-Logo.png'
import ChhattisgarhMyGov from '../images/Chhattisgarh.png'

import DDDMyGov from '../images/mygovdddi.png'

import Sarathi from '../images/biodeviceregistrationp4dsxd-prod.png'
import tamil_gov from '../images/tamilnadu.mygov.in.png'
import Telangana_Gov from '../images/janparichay.png'
import Tripura_Mygov from '../images/tripura.mygov.in.png'
import UP_Gov from '../images/up.mygov.in.png'
import UKJanparichay from '../images/Uk1.png'
import UKMyGov from '../images/UK2.png'

import '../Services.css'


const groups = [
  'All Services',
  'Service Groups',
  'Arunachal Pradesh State Services',
  'Assam State Services',
  'Bihar State Services',
  'Central Services',
  'Chhattisgarh State Services',
  'Dadra and Nagar Haveli State Services',
  'Delhi State Services',
  'District-S3WaaS',
  'Goa State Services',
  'Gujarat State Services',
  'Haryana State Services',
  'Himachal Pradesh State Services',
  'Jammu and Kashmir State Services',
  'Jammu Kashmir State Services',
  'Jharkhand State Services',
  'Karnataka State Services',
  'Kerala State Services',
  'Ladakh State Services',
  'Madhya Pradesh State Services',
  'Maharashtra State Services',
  'Manipur State Services',
  'Mizoram State Services',
  'Nagaland State Services',
  'OAuth SSO',
  'Others State Services',
  'Punjab State Services',
  'Rajasthan State Services',
  'S3WaaS',
  'sarathi',
  'Tamil Nadu State Services',
  'Telangana State Services',
  'Tripura State Services',
  'Uttar Pradesh State Services',
  'Uttarakhand State Services',
];

const item=(name, image, title, url, description)=>({
  name,
  image,
  title,
  url,
  description,
})

const shortName=(name)=>(name.length>23? `${name.slice(0, 22)}...` : name)

const servicesByGroup={

  'Arunachal Pradesh State Services': [
    item(
      'Land Information Service',
      arunachalLandInfoLogo,
      'LAND INFORMATION SYSTEM OF ARUNACHAL PRADESH PRODUCTION',
      'https://lisa.arunachal.gov.in/',
      'Land Information System of Arunachal Pradesh'
    ),
    item(
      'Mygov - Arunachal Pradesh',
      arunachalMyGovLogo, 
      'MYGOV - ARUNACHAL PRADESH',
      'https://arunachal.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'),
  ],

  'Assam State Services': [
    item(
      'Mygov - Assam', 
      assamMyGov, 
      'MYGOV - ASSAM',
      'https://assam.mygov.in/', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'),
  ],

  'Bihar State Services': [
    item(
      'Bhu Samadhan Production',
      biharSamadhan,
      'BHU SAMADHAN PRODUCTION',
      'https://homeonline.bihar.gov.in/landdispute/Login_Default_new.aspx',
      'Bhu Samadhan portal for Home Department has been created for entry of land disputes in Bihar. With this, information about police station level entry and its progress can be available online. Monitoring of land dispute will be done at the police station level. For this, the land dispute website will be updated regularly. Arrangements will be made in the portal for land disputes so that information about police station level entries and its progress can be made available online.'
    ),
    item(
      'Bihar Serviceplus Production For Law Dept. Production', 
      biharLawDept, 
      'BIHAR SERVICEPLUS PRODUCATION FOR LAW DEPT. PRODUCTION',
      'https://serviceonline.bihar.gov.in/law/', 
      'This service caters laws department for receiving applications for notary.'
    ),
    item('XLN Bihar Production', biharXLN, 'XLN BIHAR PRODUCTION', 'https://xln.bihar.gov.in/ST_Login.aspx', 'State Drug Controller'),
    item('Apply For Mutation & LPC Production', biharMutationLPC, 'APPLY FOR MUTATION & LPC PRODUCTION', 'https://biharbhumi.bihar.gov.in/Biharbhumi/UserLogin', 'Facility to Apply Online for Mutation or LPC Service'),
    item('Bihar Ration Card Online Production', biharRationCard, 'BIHAR RATION CARD ONLINE PRODUCTION', 'https://rconline.bihar.gov.in/RCMSLanding.aspx', 'Apply Online for Ration Cards'),
    item('Bihar Serviceplus Production', biharServicePlus, 'BIHAR SERVICEPLUS PRODUCTION', 'https://serviceonline.bihar.gov.in/', 'To provide government services seamlessly in a transparent and convenient manner through ServicePlus'),
    item('SWCs Bihar SSO Production', biharSwcs, 'SWCS BIHAR SSO PRODUCTION', 'https://swc2.bihar.gov.in/investor/homepage', 'Single Window Clearance'),
  ],

  'Central Services': [
    item(
      'JPPartners Pehchaan', 
      CentralJP, 
      'JPPARTNERS PEHCHAAN',
      'https://jppartners.meripehchaan.gov.in/signup/', 
      'JPPartners Pehchaan'
    ),
    item(
      'Academic Bank Of Credits', 
      CentralAcademics, 
      'ACADEMIC BANK OF CREDITS',
      'https://www.abc.gov.in/sso_login.', 
      'Enabling students mobility across Higher Education Institutions. Helps in seamless integration of skills and experiences into a Credit Based system.'
    ),
    item(
      'Mygov - Blog', 
      CentralBlog, 
      'MYGOV - BLOG',
      'https://blog.mygov.in/', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    ),
    item(
      'Mygov - Innovate India', 
      CentralInnovative, 
      'MYGOV - INNOVATE INDIA',
      'https://innovateindia.mygov.in/', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    ),
    item(
      'Mygov - Pledge', 
      CentralPledge, 
      'MYGOV - PLEDGE',
      'https://pledge.mygov.in/', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    ),
    item(
      'Mygov - Quiz', 
      CentralQuiz, 
      'MYGOV - QUIZ',
      'https://quiz.mygov.in/', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    ),
    item(
      'Mygov - Self4society', 
      CentralSelf4society, 
      'MYGOV - SELF4SOCIETY',
      'https://self4society.mygov.in/', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    ),
    item(
      'Mygovauth', 
      CentralAuth, 
      'MYGOVAUTH',
      'https://auth.mygov.in/user', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    ),
    item(
      'Prohibition Excise & Registration Department',
      CentralProhibition,
      'PROHIBITION EXCISE & REGISTRATION DEPARTMENT',
      'https://www.india.gov.in/government-order-home-prohibition-and-excise-department',
      'Prohibition Excise & Registration Department'
    ),
    item(
      'Umang', 
      CentralUmang,
      'UMANG', 
      'https://web.umang.gov.in/', 
      'One App, Many Government Services'
    ),
  ],

  'Chhattisgarh State Services': [
    item(
      'Mygov - Chhattisgarh', 
      ChhattisgarhMyGov, 
      'MYGOV - CHHATTISGARH',
      'https://chhattisgarh.mygov.in/', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    ),
  ],

  'Dadra and Nagar Haveli State Services': [
    item(
      'Mygov - Ddd', 
      DDDMyGov, 
      'MYGOV - DDD',
      'https://ddd.mygov.in/', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    ),
  ],

  'Delhi State Services': [

  ],

  'District-S3WaaS': [

  ],

  'Goa State Services': [
    item(
      'Mygov - Goa', 
      GoaMygov, 
      "MYGOV - GOA", 
      'https://goa.mygov.in/', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Gujarat State Services': [
    item(
      'Gatishakti National Master Plan Production', 
      Gujarat_Pro, 
      'GATISHAKTI NATIONAL MASTER PLAN PRODUCTION', 
      'https://pmgatishakti.gov.in/pmgatishakti/login', 
      'The multi-modal connectivity will provide integrated and seamless connectivity for movement.'
    ),
    item(
      'Mobile Application Production',  
      Gujarat_Pro, 
      'MOBILE APPLICATION PRODUCTION', 
      'https://app.ncog.gov.in/MobileSSOAPI/loginsso', 
      'Mobile application'
    ),
    item(
      'lilms', 
      Gujarat_service, 
      'IILMS (INTEGRATED INSTITUTION & LITIGANTS MANAGEMENT SYSTEM)', 
      'https://sso.gujarat.gov.in/SSO.aspx?Rurl=https://iilms.gujarat.gov.in/altregistration', 
      'This is the application to manage the court cases of government matters, starting from the pre litigation stage to post disposal stage. The system involves the government users, private/government advocates etc.,'
    ),
    item(
      'Mygov - Gujarat', 
      Gujarat_mygov, 
      'MYGOV - GUJARAT', 
      'https://auth.mygov.in/user/login?destination=oauth2/authorize', 
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance'
    ),
  ],

  'Haryana State Services': [
    item(
      'Mygov - Haryana',
      Haryana_Mygov,
      'MYGOV - HARYANA',
      'https://haryana.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Himachal Pradesh State Services': [
    item(
      'Mygov - Himachal Pradesh',
      HP_mygov,
      'MYGOV - HIMACHAL PRADESH',
      'https://himachal.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Jammu and Kashmir State Services': [
    item(
      'Jan Sugam',
      JK_01,
      'JAN SUGAM',
      'https://jansugam.jk.gov.in/',
      'G2C Services for Public on a Single Platform'
    ),
    item(
      'Mygov - Jammu And Kashmir',
      JK_mygov,
      'MYGOV - JAMMU AND KASHMIR',
      'https://jk.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Jammu Kashmir State Services': [
    item(
      'EServices of Social Welfare Department Production',
      Jk_Eservices,
      'ESERVICES OF SOCIAL WELFARE DEPARTMENT PRODUCTION',
      'https://swdassistance.jk.gov.in/Home/InitiateSSO',
      'Social Welfare Department Pension under ISSS'
    )
  ],

  'Jharkhand State Services': [
    item(
      'Mygov - Jharkhand',
      Jharkhand_mygov,
      'MYGOV - JHARKHAND',
      'https://jharkhand.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.',
    )
  ],

  'Karnataka State Services': [
    item(
      'Mygov - Karnataka',
      Karnataka_mygov,
      'MYGOV - KARNATAKA',
      'https://karnataka.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Kerala State Services': [
    item(
      'Production Digital Survey Citizen Login Production',
      Kerala_mygov,
      'PRODUCTION DIGITAL SURVEY CITIZEN LOGIN PRODUCTION',
      'https://sso.entebhoomi.kerala.gov.in/sso/web/login',
      'Production Digital Survey Citizen Login'
    ),
    item(
      'Revenue EService(Kerala)',
      Kerala_services,
      'REVENUE ESERVICES(KERALA)',
      'https://janparichay.meripehchaan.gov.in/v1/pehchaan/invalid_encr.html?service=passive&active=true&rm_5=false&continue=http%3A%2F%2Fjan_com%2Fmail%2F&pp=1&scc=1&lmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&sid=eRevJanKerPROD',
      'ReLIS is the complete Land Records Management System implemented in Kerala integrating Applications for Land management, Revenue ePyaments and Resurvey Records management. This project is conceived as per the Digital India Land Records Modernization Programme (DILRMP) and has achieved the DILRMP (Digital India Land Records Modernization Programme)objectives by bringing transparency in the Land Records Management, Online citizen Services and upkeep of Land Records to reflect the current status.'
    ),
    item(
      'EDistrict Kerala Application',
      Kerala_services,
      'EDISTRICT KERALA APPLICATION',
      'https://edistrict.kerala.gov.in/',
      'e-District is a mission mode project under National e-Governance Plan (NeGP) of Government of India. The project is intended to provide Government services to citizens through Common Service Centres (CSC) which are easily accessible or through public portal and respective offices. Services from different departments are brought under one umbrella.'

    ),
    item(
      'ESevanam',
      Kerala_services,
      'ESEVANAM',
      'https://services.kerala.gov.in/',
      'Single window platform for Kerala Government online services.'
    ),
    item(
      'Kerala Excise',
      Kerala_services,
      'KERALA EXCISE',
      'https://services.keralaexcise.gov.in/',
      'Metadata-based integrated eService Delivery Framework'
    ),
    item(
      'Online Scholarship Management System For Department Of Minority Welfare(OSMS - DMW)',
      Kerala_services,
      'ONLINE SCHOLARSHIP MANAGEMENT SYSTEM FOR DEPARTMENT OF MINORITY WELFARE (OSMS-DMW)',
      'https://www.scholarship.minoritywelfare.kerala.gov.in/',
      'This project envisages the development and implementation of a web-enabled scholarship management system to facilitate Department of Minority Welfare for an efficient and foolproof system for online registration, verification approval and selection of the students and also do the disbursements. The System also facilitates the students, various educational institutions and the Department to update and monitor the selection and disbursement process'

    ),
  ],

  'Ladakh State Services': [
    item(
      'Mygov - Ladakh',
      Ladakh_mygov,
      'MYGOV-LADAKH',
      'https://ladakh.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Madhya Pradesh State Services': [
    item(
      'MP Single Sign On',
      MP_prod,
      'MP SINGLE SIGN ON',
      'https://sso.mp.gov.in/',
      'MP Single Sign On'
    ),
    item(
      'Mygov - Madhya Pradesh',
      MP_Mygov,
      'MYGOV - MADHYA PRADESH',
      'https://mp.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Maharashtra State Services': [
    item(
      'Ecourt India Services Production',
      Maha_gov,
      'ECOURT INDIA SERVICES PRODUCTION',
      'https://ecourts.gov.in/ecourts2.0/',
      'eCourt India Services'
    ),
    item(
      'Mygov - Maharashtra',
      Maha_Mygov,
      'MYGOV - MAHARASHTRA',
      'https://maharashtra.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Manipur State Services': [
    item(
      'Mygov - Manipur',
      Manipur_mygov,
      'MYGOV - MANIPUR',
      'https://manipur.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Mizoram State Services': [
    item(
      'MyGov - Mizoram',
      Mizo_gov,
      'MYGOV - MIZORAM',
      'https://mizoram.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Nagaland State Services': [
    item(
      'Mygov - Nagaland',
      Nagaland_mygov,
      'MYGOV - NAGALAND',
      'https://nagaland.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'OAuth SSO': [

  ],

  'Others State Services': [
    item(
      'MyGov Production',
      Others_State,
      'MYGOV PRODUCTION',
      'https://www.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'

    )
  ],

  'Punjab State Services': [
    item(
      'EPMS WRD Production',
      Punjab_EPMS,
      'EPMS WRD PRODUCTION',
      'https://epms.punjab.gov.in/',
      'EPMS'
    ),
    item(
      'IFMS Punjab Production',
      Punjab_IFMS,
      'IFMS PUNJAB PRODUCTION',
      'https://ifms.punjab.gov.in/',
      'IFMS-Punjab'
    ),
    item(
      'PCRIS Production',
      Punjab_PCRIS,
      'PCRIS PRODUCTION',
      'https://pcris.punjab.gov.in/',
      'Punjab Canal Regulation Information System'
    ),
    item(
      'PWDIMS',
      Punjab_PWDIMS,
      'PWDIMS',
      'https://pwdims.punjab.gov.in/',
      'PRBDB JP SSO Integration'
    ),
    item(
      'SSOID Production',
      Punjab_SSOID,
      'SSOID PRODUCTION',
      'https://wrd.punjab.gov.in/',
      'The Punjab Canal Regulation Information System, PCRIS has been developed as a state of the art ICT solution to streamline and enhance the management of Punjab canal water. This platform is designed to optimize the operation and maintenance of the expansive canal network of the state Punjab, ensuring efficient water management throughout the region.'
    ),
    item(
      'IHRMS Punjab Production',
      Punjab_IHRMS,
      'IHRMS PUNJAB PRODUCTION',
      'https://hrms.punjab.gov.in/',
      'INTEGRATED HUMAN RESOURCE MANAGEMENT SYSTEM'
    )
  ],

  'Rajasthan State Services': [
    item(
      'MyGov - Rajasthan',
      Rajasthan_gov,
      'MYGOV RAJASTHAN',
      'https://rajasthan.mygov.in/',
      'MyGov Auth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance'
    )
  ],

  'S3WaaS': [
    item(
       'S3WaaS',
        S3WaaS_logo,
        'S3WAAS',
        'https://s3waas.gov.in/',
        'Secure, Scalable & Sugamya Website as a Service'
    )
  ],

  'sarathi': [
    item(
      'BioDeviceRegistration',
      Sarathi, 
      'BIODEVICEREGISTRATION', 
      'https://sarathi.parivahan.gov.in/cas/login?service=https%3A%2F%2Fsarathi.parivahan.gov.in%2Fbiodeviceregistration%2Fadmin%2Fsarathilogin', 
      'biodeviceregistration sarathi application'
    ),
    item(
      'DSL Activities', 
      Sarathi, 
      'DSL ACTIVITIES', 
      'https://sarathi.parivahan.gov.in/cas/login?service=https%3A%2F%2Fsarathi.parivahan.gov.in%2Fdslactivities%2Fadmin%2Fsarathilogin', 
      'dslactivities sarathi application'
    ),
    item(
      'Payment', 
      Sarathi, 
      'PAYMENT', 
      'https://sarathi.parivahan.gov.in/cas/login?service=https%3A%2F%2Fsarathi.parivahan.gov.in%2Fpaymentscov%2FLoginMenu.jsp', 
      'sarathi payment application'
    ),
    item(
      'Sarathi Common Portal', 
      Sarathi, 
      'SARATHI COMMON PORTAL', 
      'https://sarathi.parivahan.gov.in/cas/login?service=https%3A%2F%2Fsarathi.parivahan.gov.in%2Fsarathi%2Fsarathilogin.do', 
      'Sarathi application production url'
    ),
    item(
      'SarathiReport', 
      Sarathi, 
      'SARATHIREPORT', 
      'https://sarathi.parivahan.gov.in/cas/login?service=https%3A%2F%2Fsarathi.parivahan.gov.in%2FSarathiReport%2Fsarathilogin.do', 
      'sarathi report web applicationc'
    ),
    item(
      'Sarathimed', 
      Sarathi, 
      'SARATHIMED', 
      'https://sarathi.parivahan.gov.in/cas/login?service=https%3A%2F%2Fsarathi.parivahan.gov.in%2Fsarmed%2Fadmin%2Fsarathilogin', 
      'SarMed Sarathi Application'
    ),
    item(
      'Sarathiservice', 
      Sarathi, 
      'SARATHISERVICE', 
      'https://sarathi.parivahan.gov.in/cas/login?service=https%3A%2F%2Fsarathi.parivahan.gov.in%2Fsarathiservice%2Fsarathilogin.do', 
      'sarathiservice webapplication production url'
    ),
    item(
      'Slot', 
      Sarathi, 
      'SLOT', 
      'https://sarathi.parivahan.gov.in/cas/login?service=https%3A%2F%2Fsarathi.parivahan.gov.in%2Fslots%2Fsarathilogin.do', 
      'slot web application urls'
    )
  ],

  'Tamil Nadu State Services': [
    item(
      'Mygov - Tamilnadu',
      tamil_gov,
      'MYGOV - TAMILNADU',
      'https://tamilnadu.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Telangana State Services': [
    item(
      'Collabfiles Production',
      Telangana_Gov,
      'COLLABFILES PRODUCTION',
      'https://collabfiles.gov.in/',
      'OfficeSuite of products'
    )
  ],

  'Tripura State Services': [
    item(
      'Mygov - Tripura',
      Tripura_Mygov,
      'MYGOV - TRIPURA',
      'https://tripura.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
    )
  ],

  'Uttar Pradesh State Services': [
    item(
      'Mygov - Uttar Pradesh',  
      UP_Gov,
      'MYGOV - UTTAR PRADESH',
      'https://up.mygov.in/',
      'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'
       )
  ],

  'Uttarakhand State Services': [
    item('Apuni Sarkar Production', UKJanparichay, 'APUNI SARKAR PRODUCTION', 'https://eservices.uk.gov.in/login/', 'CitizenCentricService Portal'),
    item('CM Helpline 1905', UKJanparichay, 'CM HELPLINE 1905', 'https://cmhelpline.uk.gov.in/', 'Unified Grievance Portal'),
    item('PM Gati Shakti Production', UKJanparichay, 'PM GATI SHAKTI PRODUCTION', 'https://unnati.uk.gov.in/login', 'PM Gati Shakti'),
    item('REF CM HELPLINE Production', UKJanparichay, 'REF CM HELPLINE PRODUCTION', 'https://cmhelpline.uk.gov.in/', 'CM Reference CM HELPLINE 1905 SSO'),
    item('mygov - Uttarakhand', UKMyGov, 'MYGOV - UTTARAKHAND', 'https://uttarakhand.mygov.in/', 'MyGovAuth - The citizen-centric platform empowers people to connect with the Government and contribute towards good governance.'),
  ],
}

function ServiceModal({service, onClose}){
  if(!service){
    return null;
  }

  return(
    <div className="service-modal-backdrop" onMouseDown={onClose}>
      <section className="service-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="service-modal-card">
          <button className="service-modal-close" onClick={onClose}>
            &times;
          </button>
          <div className="service-modal-body">
            <div className="service-modal-logo">
              <img src={service.image} alt={service.name} />
            </div>
            <div className="service-modal-details">
              <h2 className="service-modal-title">{service.title}</h2>
              <p>{service.description}</p>
              <a className="service-access-button" href={service.url} target="_blank" rel="noreferrer">
                Access Now <i className="bi bi-box-arrow-up-right" />
              </a>
            </div>
          </div>
        </div>
        <p className="service-modal-disclaimer">
          <strong>Disclaimer:</strong> By accessing and using this service, you give rights to service for using generic profile details and mandatory verification Id.
        </p>
      </section>
    </div>
  )
}

export default function Services() {
  const {profile, logout}=useDashboard()

  const [query, setQuery]=useState('')
  const [activeGroup,setActiveGroup]=useState('All Services')
  const [menuOpen, setMenuOpen]=useState(false)
  const [selectedService, setSelectedService]=useState(null)
  const [mobileSidebarOpen, setMobileSidebarOpen]=useState(false)

  const services=useMemo(()=>{
    const list = activeGroup==='All Services' ? Object.values(servicesByGroup).flat() : servicesByGroup[activeGroup] || []
    return list.filter((service)=>
      service.name.toLowerCase().includes(query.trim().toLowerCase())
    )
  }, [activeGroup, query])

  return (
    <div className="services-page">
      {mobileSidebarOpen && (
        <div className="services-sidebar-backdrop" onClick={() => setMobileSidebarOpen(false)} />
      )}

      <aside className={`services-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="services-brand">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" />
          <button className="services-sidebar-close" onClick={() => setMobileSidebarOpen(false)} aria-label="Close sidebar">
            &times;
          </button>
        </div>

        <nav>
          {groups.map((group, index) =>
            group === 'Service Groups' ? (
              <div key={group} className="services-group services-group-label">
                {group}
              </div>
            ) : (
              <button
                key={group}
                className={`services-group ${
                  activeGroup === group && group.endsWith('State Services') ? 'selected' : ''
                } ${index > 1 ? 'has-chevron' : ''}`}
                onClick={() => {
                  setActiveGroup(group)
                  setMobileSidebarOpen(false)
                }}
              >
                {group}
              </button>
            )
          )}
        </nav>
      </aside>

      <section className="services-main">
        <header className="services-topbar">
          <div className="services-topbar-left">
            <button
              className="services-sidebar-toggle"
              onClick={() => setMobileSidebarOpen((prev) => !prev)}
              title="Choose State Services"
              aria-label="Choose State Services"
            >
              <i className="bi bi-list" />
            </button>

            <label className="service-search">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Service" />
              <i className="bi bi-search" />
            </label>
          </div>

          <div className="services-user-area">
            <img src={digitalIndiaLogo} className="digital-india-mark" alt="Digital India" />

            <div className="services-user-menu">
              <button className="services-user-trigger" onClick={() => setMenuOpen((value) => !value)}>
                {(profile.fullName || profile.name || 'Manjeet Teotia').toUpperCase()} <i className="bi bi-person-fill" />
              </button>

              {menuOpen && (
                <div className="services-dropdown">
                  <Link to="/dashboard">
                    <i className="bi bi-house-door-fill" /> Dashboard
                  </Link>
                  <button onClick={logout}>
                    <i className="bi bi-power" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="services-content">
          <h1>
            Applications currently onboarded with <span>MeriPehchaan</span>
          </h1>

          <div className="services-grid">
            {services.map((service) => (
              <button className="service-card" key={service.name} onClick={() => setSelectedService(service)}>
                <div className="service-logo-wrap">
                  <img src={service.image} alt="" />
                </div>
                <span>{shortName(service.name)}</span>
              </button>
            ))}
          </div>

          {services.length === 0 && <p className="services-no-results">No services found.</p>}
        </main>
      </section>

      <ServiceModal service={selectedService} 
                    onClose={() => setSelectedService(null)} 
      />
    </div>
  )
}