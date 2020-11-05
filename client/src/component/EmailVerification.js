import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../scss/EmailVerification.scss';

function EmailVerification(props) {

  const { t } = useTranslation();

  return(
    <div className="background">
      <h1 className="h1">{t('email.title')}</h1>

      <div className="contentUserInfo"></div>
    </div>
  )
}

export default withRouter(EmailVerification); 