import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation, withTranslation } from 'react-i18next';


function Home() {

  const { t, i18n } = useTranslation();

  const changelanguageToEn = () => i18n.changeLanguage('en')
  const changelanguageToZh = () => i18n.changeLanguage('zh')
  const changelanguageToJa = () => i18n.changeLanguage('ja')

  return(
    <div>
      <span>language : {i18n.language}</span>
      <div>{t('message.hello')}</div>
      <div>{t('n.selected', {n: 5})}</div>
      <div>
          <button onClick={changelanguageToEn}>English</button>
          <button onClick={changelanguageToZh}>Chinese</button>
          <button onClick={changelanguageToJa}>Japanese</button>
      </div>
    </div>
  )
}

export default withRouter(Home);