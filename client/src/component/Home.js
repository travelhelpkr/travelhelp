import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation, withTranslation } from 'react-i18next';
import './Home.scss';

function Home() {

  // change language handler
  const { t, i18n } = useTranslation();

  return(
    <div className="background">
      <div className="nav">
        {/* title */}
        <a href="/" className="homeTitle">Travel Help</a>

        {/* nav-sign in btn */}
        <a href="/user/signin" className="signInBtn">{t('home.signin')}</a>

        {/* nav-select language btn */}
        <select className="languageBtn" onChange={(e) => i18n.changeLanguage(e.target.value)} >
          <option value="" disabled>Language</option>
          <option value="en">English</option>
          <option value="zh">Chinese</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      {/* Body - travel help menu */}
      <div className="helpMenu">
        <div className="foodDelivery">
          <div className="overlay">
            <a href="/help/fooddelivery">{t('home.foodDelivery')}</a>
          </div>
        </div>
        <div className="luggage">
          <div className="overlay">
            <a href="/help/luggage">{t('home.luggage')}</a>
          </div>
        </div>
        <div className="taxi">
          <div className="overlay">
            <a href="/help/taxi">{t('home.taxi')}</a>
          </div>
        </div>
        <div className="rental">
          <div className="overlay">
            <a href="/help/rental">{t('home.rental')}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home);