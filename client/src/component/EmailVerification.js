import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../scss/EmailVerification.scss';

function EmailVerification(props) {

  // get user email address
  const { email } = props;
  console.log("email:", email);

  // change language handler
  const { t } = useTranslation();

  return(
    <div className="background">
      <h1 className="h1">{t('email.title')}</h1>
      
      <div className="contentUserInfo">
        <div className="verificationTitle">Please verify your email</div>
        <div className="verificationContent verificationContent1">You're almost there!<br />We sent to an email to <span>{window.sessionStorage.getItem('email')}</span></div>
        <div className="verificationContent verificationContent2">Just click on the link in that email to complete.</div>
        <div className="verificationContent verificationContent3">If you don't see it, you may need to <span>check your spam folder.</span></div>
      </div>
    </div>
  )
}

export default withRouter(EmailVerification); 