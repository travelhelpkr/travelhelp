import React from 'react';
import { useTranslation } from 'react-i18next';
import '../scss/Nav.scss';

function NavMypage(props) {

  // change language handler
  const { t } = useTranslation();

  return(
    <div className='background'>
      <div className='nav'>
        
        {/* title */}
        <a href='/' className='homeTitle'>Travel Help</a>

        {/* nav-sign in btn */}
        <a href='/user/mypage' className='signInBtn'>{t('nav.mypage')}</a>
      </div>

    </div>
  )
}

export default NavMypage; 