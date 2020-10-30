import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation, withTranslation } from 'react-i18next';
import './Nav.scss';

function Nav_signin(props) {

  const { t, i18n } = useTranslation();

  return(
    <div className="background">
      <div className="nav">
        {/* title */}
        <a href="/" className="homeTitle">Travel Help</a>

        {/* nav-sign in btn */}
        <a href="/user/signin" className="signInBtn">{t('home.signin')}</a>
      </div>

    </div>
  )
}

export default Nav_signin; 