import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import '../scss/Modal.scss';

function ResestPassword(props) {

  // get from each menu
  const { isOpen, setModal } = props;

  // input state of user information for signin
  const [email, inputEmail] = useState('');

  // failure of signin
  const [oauthUser, setOauthUser] = useState(false);
  const [failAlertSignUp, setFailAlertSignUp] = useState(false);
  const [failAlertVerification, setFailAlertVerification] = useState(false);

  // success of send email
  const [alert, setAlert] = useState(false);

  // change language handler
  const { t } = useTranslation();

  // reset password handler
  const handleResetPasswordBtn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3355/auth/resetPassword', {
      email: email
    },{
      withCredentials: true,
    }, {
      headers: { 
        'Access-Control-Allow-Origin': 'http://localhost:3355',
       }
    })
    .then(res => {
      console.log('res:', res);
      if(res.data.status === 409) {
        inputEmail('');
        setOauthUser(true);
        setFailAlertSignUp(false);
        setFailAlertVerification(false);
        setAlert(false);
        console.log('oauthUser:', oauthUser);
      } else if(res.data.status === 404) {
        inputEmail('');
        setFailAlertSignUp(true);
        setFailAlertVerification(false);
        setOauthUser(false);
        setAlert(false);
      } else if(res.data.status === 401) {
        window.sessionStorage.setItem('email', email);
        inputEmail('');
        setFailAlertVerification(true);
        setFailAlertSignUp(false);
        setOauthUser(false);
        setAlert(false);
      } else {
        inputEmail('');
        setAlert(true);
        setFailAlertVerification(false);
        setFailAlertSignUp(false);
        setOauthUser(false);
      }
    })
  }

  return(
    <div className={isOpen ? 'openModal' : 'none'}>
      <div className='modalContentPassword'>

        {/* close modal */}
        <button className='modalCloseBtn' onClick={e => {
          e.preventDefault();
          setModal(!isOpen);
        }}><CloseIcon /></button>
        
        {/* modal */}
        <div className='modalTitle'>{t('signin.forgotPassword')}</div>
        <div className='emailInputBox'>
          <div className='step1'>{t('resetPassword.step1')}</div>
          <div className='emailAddress'>{t('resetPassword.email')}</div>
          <form>
            <input className='emailInput' type='text' name='email' onChange={(e) => inputEmail(e.target.value)} placeholder={t('signin.email')} label='Email Address' />
          </form>
          <button className='resetPasswordBtn' onClick={handleResetPasswordBtn}>{t('resetPassword.btn')}</button>
          
          {/* modal alert */}
          <div className={oauthUser ? 'signUpAlert' : 'none'}>
            <span>{t('resetPassword.oauthUser')}</span>
          </div>
          <div className={failAlertSignUp ? 'signUpAlert' : 'none'}>
            <span>{t('resetPassword.signup')}</span>
            <span className='signupLink'><a href='/user/signup'>{t('signup.signup')}</a></span>
          </div>
          <div className={failAlertVerification ? 'signUpAlert' : 'none'}>
            <span>{t('resetPassword.emailVerification')}</span>
            <span className='signupLink'><a href='/user/emailVerified'>{t('email.title')}</a></span>
          </div>
          <div className={alert? 'emailAlert' : 'none'}>
            <div className='checkIcon'><CheckCircleRoundedIcon /></div>
            <div className='checkText'>{t('modalPassword.alert')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResestPassword; 