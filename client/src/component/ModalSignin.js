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
          You should <strong>Sign In first</strong> :) <br/><br/>
          When you press <strong>'Okay'</strong> button,<br/>you can go to <strong>Sign In Page</strong>.
        </div>

        {/* press ok btn */}
        <button className="okayBtn" onClick={goToSigninHandler}>Okay</button>

      </div>

    </div>
  )
}

export default ModalSignin; 