import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../TermsConditions.css'

export default function TermsConditions() {
  const navigate = useNavigate()

  return (
    <div className="tc-page">
      {/* Info Banner */}
      <div className="tc-banner">
        <p>
          Thanks for using Jan JanParichay. The service is provided by{' '}
          <strong>National Informatics Centre (NIC)</strong>, located at Block- A, CGO Complex,
          Lodhi Road, New Delhi, India.<br />
          By using this service, you are agreeing to the terms and conditions mentioned below.
          Please read them carefully
        </p>
      </div>

      <div className="tc-body">

        {/* TERMS OF SERVICE */}
        <h1 className="tc-heading">TERMS OF SERVICE</h1>

        <p className="tc-para">
          This legal agreement between you and National Informatics Centre (NIC), governs your use
          of the Jan Parichay service.
        </p>
        <p className="tc-para">
          NIC is the provider of Jan Parichay service, which provide e-Authentication as a service
          to government departments for providing a secure and convenient way for users to access
          government services as well as for the government departments to assess the authenticity
          of the users only under the terms and conditions mentioned in this agreement. The Jan
          Parichay service is available to you in India as well as outside India.
        </p>
        <p className="tc-para">
          Use of Jan Parichay service requires compatible devices, internet access, and certain
          software. You agree that it is your responsibility to meet these requirements which may
          change from time to time. The Jan Parichay service is part SSO framework for government
          to citizen(G2C) applications, so any service/product part of such framework are by
          default part of Jan Parichay application. Obtaining any other product/service under NIC
          which are not part of G2C SSO framework shall not guarantee you access to the NIC Jan
          Parichay service.
        </p>

        {/* USER ACCOUNT */}
        <h1 className="tc-heading">USER ACCOUNT</h1>

        <p className="tc-para">
          As a registered user of Jan Parichay service, you may establish an account. Do not
          disclose your account details to anyone. You are solely responsible for maintaining the
          confidentiality and security of your account. All activities that occur on or through
          your account are your responsibility, and you agree to immediately notify NIC of any
          security breach of your account. NIC shall not be responsible for any losses arising out
          of the unauthorized use of your account.
        </p>
        <p className="tc-para">
          In order to use Jan Parichay service, you must register using email Id/ mobile no. and
          verify your identity using any of the verification parameters including Aadhaar Card,
          Pan Card, Driving Licence, Email Id, or Mobile No. The verification parameter are subject
          to change without giving prior notice to user. After registration, enter your login ID
          and password to authenticate your account. The Jan Parichay is a centralized session and
          user authentication service in which one set of login credentials can be used to access
          multiple applications. The service authenticates user one on one designated platform,
          enabling the user to use a plethora of services without having to log in and logout each
          time. The application can be accessed via the web and multi-factor authentication can be
          configured via android auth app. When the user register on janparichay.nic.in, the
          application checks for existence of registration Id and then asked to fill basic details
          and verification parameters to validate his identity for accessing multiple integrated
          services.
        </p>
        <p className="tc-para">
          You agree to provide accurate and complete information when you register and use Jan
          Parichay service. You also agree to update your Jan Parichay registration data from time
          to time for keeping the information accurate and complete. NIC use crucial data such as
          Aadhar card information only to validate user identity and never stores anything in the
          database. However, for other Jan Parichay registration data, you agree that NIC may
          store and use for coordination purpose.
        </p>

        {/* Bullet box */}
        <div className="tc-bullet-box">
          <p>✱ You are authorized to use Jan Parichay service only for personal use.</p>
          <p>✱ Any commercial use of this service is strictly prohibited.</p>
          <p>✱ Only users above the age of 5 years are allowed to register on JanParichay.</p>
          <p>
            ✱ You acknowledge that, if NIC changes or discontinues the Jan Parichay service, which
            NIC may do at its own discretion, you may not be able to use Jan Parichay service in
            the same manner as prior to such change or discontinuation, and that NIC shall have no
            liability to you in such case.
          </p>
          <p>
            ✱ The provision of Jan Parichay service does not provide you any commercial or
            promotional use right for the NIC products and services.
          </p>
          <p>
            ✱ It is your responsibility not to lose, destroy or damage the NIC services or products
            once they are successfully installed.
          </p>
          <p>
            ✱ The NIC products or services may offer service that allows you to submit material on
            various areas related to research. You agree that your usage of such features, including
            any materials submitted by you, shall be your sole responsibility, shall not violate the
            rights of any other party or violate any laws or otherwise be obscene or objectionable.
            You also agree that you have obtained all necessary rights and licenses related to the
            material submitted by you. You agree to provide accurate and complete information in
            connection with your submission of any materials on the NIC Service. You hereby provide
            NIC with a worldwide, royalty-free, non-exclusive license to use such materials as part
            of the NIC Service, and in relation to NIC Products, without any compensation or
            obligation to you.
          </p>
          <p>
            ✱ NIC has the right, but not the responsibility, to monitor any materials submitted by
            you or otherwise available on the NIC Service. NIC will investigate any reported or
            apparent violation of this Agreement and may take any action that NIC in its sole
            discretion feels appropriate, including immediate termination of service to the user.
          </p>
        </div>

        {/* Back button */}
        <div className="tc-back-row">
          <button className="tc-back-btn" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
