import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../scss/ResetPassword.scss';

function ResetPassword(props) {

  // change language handler
  const { t } = useTranslation();

  // get url
  const url = new URL(window.location.href);

  // input state of user password for reset password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // check password and confirm password
  const [wrongPassword, setWrongPassword] = useState(false);

  // send token value with uri to the server
  useEffect(() => {
    axios.get('/api/auth/password', {
      params: {
        token: url.searchParams.get('token') 
      }
    })
    .then(res => {
      console.log('res:', res.data.email);
      setEmail(res.data.email);
    })
  })

  // form input change handler
  const onChangeHandler = (e) => {
    if(e.target.name === 'password') {
      setPassword(e.target.value);
    } else if(e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  }

  // reset password handler
  const resetPasswordHandler = (e) => {
    e.preventDefault();
    if(password === confirmPassword) {
      axios.post('/api/auth/password', {
        email: email,
        password: password
      })
      .then(() => window.location = '/user/signin')
    }
    else {
      ((password === confirmPassword) && password !== '') ? setWrongPassword(false) : setWrongPassword(true);
    }
  }

  return(
    <div className='background'>
      <h1 className='h1'>{t('resetPassword.btn')}</h1>

      <div className='contentUserInfo'>
        <div className='form'>
          <div className='emailAddressTitle'>
            <span>{t('resetPassword.email')}</span>
            <span className='userEmailAddress'>{email}</span>
          </div>
          <form>
            <div className='inputTitle'>{t('resetPassword.newPassword')}</div>
            <input className='signupInput' type='password' name='password' onChange={onChangeHandler} placeholder={t('signup.password')} label='Password' />
            <div className='inputTitle'>{t('resetPassword.confirmPassword')}</div>
            <input className='signupInput' type='password' name='confirmPassword' onChange={onChangeHandler} placeholder={t('signup.confirmPassword')} label='Confirm Password' />
          </form>
          <div className={wrongPassword ? 'passwordAlert' : 'none'}>{t('signup.wrongPassword')}</div>
          
          <button className='resetPasswordBtn' onClick={resetPasswordHandler}>{t('resetPassword.btn')}</button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ResetPassword); 