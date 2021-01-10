import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ModalResetPassword from './ModalResetPassword';
import '../scss/Form.scss';

function Signin(props: any) {

  // login state props
  const { setIsLogin, setEmail, setName, setUserId } = props;
  
  // input state of user information for signin
  const [email, inputEmail] = useState<string>('');
  const [password, inputPassword] = useState<string>('');
  
  // failure of signin
  const [failAlert, setFailAlert] = useState<boolean>(false);
  const [noUserAlert, setNoUserAlert] = useState<boolean>(false);

  // open modal
  const [isOpen, setModal] = useState<boolean>(false);
  
  // change language handler
  const { t } = useTranslation();

  // signin handler
  const handleLoginBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.post('/api/users/signin', {
      email: email,
      password: password
    }, {
      withCredentials: true,
    }, 
    // {
    //   headers: { 
    //     'Access-Control-Allow-Origin': 'http://localhost:3355',
    //    }
    // }
    )
    .then(res => {
      if(res.data.status === 403) {
        console.log("not invalid");
        window.sessionStorage.setItem('email', email);
        window.location.href = '/user/emailVerified';
      } else if(res.data.status === 404) {
        console.log("not found");
        setNoUserAlert(true);
      } else {
        console.log("successfully signed in");
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
          <a href='http://localhost:3355/api/auth/google' className='btn googleBtn'>{t('signin.google')}</a>
        </div>
        {/* <div className='signupBtn'>
          <a href='/user/signupwithemail' className='btn wechatBtn'>{t('signin.wechat')}</a>
        </div> */}
        <div className='signupBtn'>
          <a href='http://localhost:3355/api/auth/line' className='btn lineBtn'>{t('signin.line')}</a>
        </div>

        {/* or */}
        <div className='signupOR'>
          <span>{t('signin.or')}</span>
        </div>

        {/* email signin */}
        <form className='signupForm'>
          <input value={email} className='signupInput' type='text' name='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputEmail(e.target.value)} placeholder={t('signin.email')} aria-label='emailAddressInput' />
          <input value={password} className='signupInput' type='password' name='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputPassword(e.target.value)} placeholder={t('signin.password')} aria-label='passwordInput' />
          <div className={failAlert ? 'alert' : 'none'}>{t('signin.wrongInfo')}</div>
        </form>

        {/* signin btn */}
        <button className='signupSubmitBtn' onClick={handleLoginBtn}>{t('signin.signin')}</button>
        
        {/* 404 alert */}
        <div className={noUserAlert ? 'signupAlert' : 'none'}>
          <span>{t('signin.signup')}</span>
        </div>
        
        {/* find password */}
        <div className='gotoSignIn forgotPassword' onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          setModal(!isOpen);
        }}>
          <p>{t('signin.forgotPassword')}</p>
        </div>

        {/* go to signup */}
        <div className='gotoSignIn'>
          <a href='/user/signup'>{t('signin.gotoSignUp')}</a>
        </div>

        {/* forgot password modal */}
        <ModalResetPassword isOpen={isOpen} setModal={setModal} />

      </div>
    </div>
  )
}

export default Signin;