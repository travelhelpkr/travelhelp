import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation, withTranslation } from 'react-i18next';
import './Nav.scss';

function Nav_mypage(props) {

  const { t, i18n } = useTranslation();

  return(
    <div className="background">
      <div className="nav">
        {/* title */}
        <a href="/" className="homeTitle">Travel Help</a>

        {/* nav-sign in btn */}
        <a href="/user/mypage" className="signInBtn">{t('nav.mypage')}</a>
      </div>

    </div>
  )
}

export default Nav_mypage; 