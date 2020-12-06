import * as React from 'react';
import { useTranslation } from 'react-i18next';
import '../scss/Nav.scss';

function NavSignin() {

  // change language handler
  const { t } = useTranslation();

  return(
    <div className='background'>
      <div className='nav'>
        
        {/* title */}
        <a href='/' className='homeTitle'>Travel Help</a>

        {/* nav-sign in btn */}
        <a href='/user/signin' className='signInBtn'>{t('home.signin')}</a>
      </div>

    </div>
  )
}

export default NavSignin; 