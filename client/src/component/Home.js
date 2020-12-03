import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../scss/Home.scss';

function Home() {

  // change language handler
  const { t, i18n } = useTranslation();

  return(
    <div className='background'>
      
      {/* nav-select language btn */}
      <select className='languageBtn' onChange={(e) => i18n.changeLanguage(e.target.value)} >
        <option value=''>Language</option>
        <option value='en'>English</option>
        <option value='zh'>中文</option>
        <option value='ja'>日本語</option>
      </select>

      {/* Body - travel help menu */}
      <div className='helpMenu'>
        <a href='/help/foodDelivery' className='foodDelivery'>
          <div className='overlay'>
            <span>{t('home.foodDelivery')}</span>
          </div>
        </a>
        <a href='/help/luggage' className='luggage'>
          <div className='overlay'>
            <span>{t('home.luggage')}</span>
          </div>
        </a>
        <a href='/help/taxi' className='taxi'>
          <div className='overlay'>
            <span>{t('home.taxi')}</span>
          </div>
        </a>
        <a href='/help/rental' className='rental'>
          <div className='overlay'>
            <span>{t('home.rental')}</span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default withRouter(Home);