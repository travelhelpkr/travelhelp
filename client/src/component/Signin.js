import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ModalResetPassword from './ModalResetPassword';
import '../scss/Form.scss';

function Signin(props) {

  // login state props
  const { setIsLogin, setEmail, setName, setUserId } = props;
  
  // input state of user information for signin
  const [email, inputEmail] = useState('');
  const [password, inputPassword] = useState('');
  
  // failure of signin
  const [failAlert, setFailAlert] = useState(false);
  const [noUserAlert, setNoUserAlert] = useState(false);

  // open modal
  const [isOpen, setModal] = useState(false);
  
  // change language handler
  const { t } = useTranslation();

  // signin handler
  const handleLoginBtn = (e) => {
    e.preventDefault();
    axios.post('/api/users/signin', {
      email: email,
      password: password
    }, {
      withCredentials: true,
    }, {
      headers: { 
        'Access-Control-Allow-Origin': 'https://travelhelp.kr',
       }
    })
    .then(res => {
      if(res.data.status === 403) {
        window.sessionStorage.setItem('email', email);
        window.location = '/user/emailVerified';
      } else if(res.data.status === 404) {
        setNoUserAlert(true);
      } else {
        window.localStorage.setItem('i18nextLng', res.data.language);
        window.sessionStorage.setItem('id', res.data.id);
        window.sessionStorage.setItem('email', res.data.email);
        window.sessionStorage.setItem('name', res.data.name);
        setIsLogin(true);
        setUserId(res.data.id);
        setEmail(res.data.email);
        setName(res.data.name);
        inputEmail('');
        inputPassword('');
      }
    })
    .catch((err) => setFailAlert(true));
  }

  return(
    <div className='background'>

      <h1 className='h1'>{t('signin.signin')}</h1>

      <div className='content'>
        {/* social signin */}
        <div className='signupBtn'>
          <a href='/api/auth/google' className='btn googleBtn'>{t('signin.google')}</a>
        </div>
        {/* <div className='signupBtn'>
          <a href='/user/signupwithemail' className='btn wechatBtn'>{t('signin.wechat')}</a>
        </div> */}
        <div className='signupBtn'>
          <a href='/api/auth/line' className='btn lineBtn'>{t('signin.line')}</a>
        </div>

        {/* or */}
        <div className='signupOR'>
          <span>{t('signin.or')}</span>
        </div>

        {/* email signin */}
        <form className='signupForm'>
          <input className='signupInput' type='text' name='email' onChange={(e) => inputEmail(e.target.value)} placeholder={t('signin.email')} label='Email Address' />
          <input className='signupInput' type='password' name='password' onChange={(e) => inputPassword(e.target.value)} placeholder={t('signin.password')} label='Password' />
          <div className={failAlert ? 'alert' : 'none'}>{t('signin.wrongInfo')}</div>
        </form>

        {/* signin btn */}
        <button className='signupSubmitBtn' onClick={handleLoginBtn}>{t('signin.signin')}</button>
        
        {/* find password */}
        <div className='gotoSignIn forgotPassword' onClick={e => {
          e.preventDefault();
          setModal(!isOpen);
        }}>
          <p>{t('signin.forgotPassword')}</p>
        </div>

        {/* go to signup */}
        <div className='gotoSignIn'>
          <a href='/user/signup'>{t('signin.gotoSignUp')}</a>
        </div>
        {/* 404 alert */}
        <div className={noUserAlert ? 'signupAlert' : 'none'}>
          <span>{t('signin.signup')}</span>
          <span className='goToSignUp'><a href='/user/signup'>{t('signin.gotoSignUp2')}</a></span>
        </div>

        {/* forgot password modal */}
        <ModalResetPassword isOpen={isOpen} setModal={setModal} />

      </div>
    </div>
  )
}

export default withRouter(Signin);