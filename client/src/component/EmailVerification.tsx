import * as React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import '../scss/EmailVerification.scss';

function EmailVerification() {

  // change language handler
  const { t } = useTranslation();

  // success of resend email
  const [alert, setAlert] = useState<boolean>(false);

  // resend Email btn handler
  const handleResendBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.post('/api/auth/email', {
      email: window.sessionStorage.getItem('email')
    }, {
      withCredentials: true,
    }, 
    // {
    //   headers: { 
    //     'Access-Control-Allow-Origin': 'https://travelhelp.kr',
    //    }
    // }
    )
    .then(() => setAlert(true));
  }

  return(
    <div className='background'>
      <h1 className='h1'>{t('email.title')}</h1>
      
      <div className='contentUserInfo'>
        <div className='verificationTitle'>{t('email.title2')}</div>
        <div className='verificationContent verificationContent1'>{t('email.des1-1')}<br />{t('email.des1-2')} <span>{window.sessionStorage.getItem('email')}</span></div>
        <div className='verificationContent verificationContent2'>{t('email.des2')}</div>
        <div className='verificationContent verificationContent3'>{t('email.des3-1')}<span>{t('email.des3-2')}</span></div>
        <div className='verificationContent verificationContent4'>{t('email.des4')}</div>
        <button className='resendEmailBtn' onClick={handleResendBtn}>{t('email.resendBtn')}</button>
        <div className={alert? 'resendAlert' : 'none'}>
          <div className='checkIcon'><CheckCircleRoundedIcon /></div>
          <div className='checkText'>{t('email.alert')}</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(EmailVerification); 