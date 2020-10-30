import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation, withTranslation } from 'react-i18next';
import Nav from "./Nav";


function Home() {

  const { t, i18n } = useTranslation();

  const changelanguageToEn = () => i18n.changeLanguage('en')
  const changelanguageToZh = () => i18n.changeLanguage('zh')
  const changelanguageToJa = () => i18n.changeLanguage('ja')

  return(
    <div>
      <a href="/signin">{t('home.signin')}</a>
      <select>
      <option value="" disabled selected>Language</option>
        <option value="English" onClick={changelanguageToEn}>English</option>
        <option value="Chinese" onClick={changelanguageToZh}>Chinese</option>
        <option value="Japanese" onClick={changelanguageToJa}>Japanese</option>
      </select>
      <h1>Travel Help</h1>
    </div>
  )
}

export default withRouter(Home);