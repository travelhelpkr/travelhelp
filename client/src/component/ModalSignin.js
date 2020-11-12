import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import '../scss/Modal.scss';

function ModalSignin(props) {

  // get signin status
  const { isSignin, setIsSignin } = props;

  // change language handler
  const { t } = useTranslation();

  // go to signin page
  const goToSigninHandler = (e) => {
    e.preventDefault();
    window.location = '/user/signin'
  }

  return(
    <div className={isSignin? 'openSigninModal' : 'none'}>
      <div className="signinModalContent">

        {/* close modal */}
        <button className='closeBtn' onClick={e => {
          e.preventDefault();
          setIsSignin(!isSignin);
        }}><CloseIcon /></button>

        {/* signin alert content */}
        <div className="signinAlert">
          <span>{t('modalSignin.signin1')}</span> :) <br/><br/>
          {t('modalSignin.signin2')}
        </div>

        {/* press ok btn */}
        <button className="okayBtn" onClick={goToSigninHandler}>Okay</button>

      </div>

    </div>
  )
}

export default ModalSignin; 