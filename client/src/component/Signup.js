import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Policy from './Policy';
import '../scss/Form.scss';

function SignupEmail({ history }) {

  // change language handler
  const { t } = useTranslation();

  // state of user information for signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [policy, setPolicy] = useState('');

  // failure of signup
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongName, setWrongName] = useState(false);
  const [wrongPolicy, setWrongPolicy] = useState(false);
  const [existEmail, setExistEmail] = useState(false);

  // open modal
  const [isOpen, setModal] = useState(false);

  // form input change handler
  const onChangeHandler = (e) => {
    if(e.target.name === 'email') {
      setEmail(e.target.value);
    } else if(e.target.name === 'password') {
      setPassword(e.target.value);
    } else if(e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    } else if(e.target.name === 'name') {
      setName(e.target.value);
    } else if(e.target.name === 'policy') {
      setPolicy('true');
    }
  }


  // validateEmail handler
  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  // signup btn handler
  const signUpBtnHandler = (e) => {
    e.preventDefault();
    if (validateEmail(email) && (password === confirmPassword) && (name !== '') && (policy !== '')) {
      axios.post('http://localhost:3355/users/signup', {
        email: email,
        password: password,
        name: name,
        is_policy_agreed: policy,
        language: window.localStorage.getItem('i18nextLng')
      })
      .then((res) => {
        if(res.data.status === 409) {
          setExistEmail(true);
        } else {
          window.sessionStorage.setItem('email', email);
          window.location = '/user/emailVerified';
        }
      });
    }
    else {
      validateEmail(email) ? setWrongEmail(false)  : setWrongEmail(true);
      ((password === confirmPassword) && password !== '') ? setWrongPassword(false) : setWrongPassword(true);
      (name !== '') ? setWrongName(false) : setWrongName(true);
      (policy !== '') ? setWrongPolicy(false) : setWrongPolicy(true);
    }
  }

  return(
    <div className='background'>

      <h1 className='h1'>{t('signup.signup')}</h1>

      <div className='content'>
        {/* social signup */}
        <div className='signupBtn'>
          <a href='http://localhost:3355/auth/google' className='btn googleBtn'>{t('signup.google')}</a>
        </div>
        {/* <div className='signupBtn'>
          <a href='/user/signupwithemail' className='btn wechatBtn'>{t('signup.wechat')}</a>
        </div> */}
        <div className='signupBtn'>
          <a href='http://localhost:3355/auth/line' className='btn lineBtn'>{t('signup.line')}</a>
        </div>

        {/* or */}
        <div className='signupOR'>
          <span>{t('signin.or')}</span>
        </div>

        {/* email signup */}
        <form className='signupForm'>
          <input className='signupInput' type='text' name='email' onChange={onChangeHandler} placeholder={t('signup.email')} label='Email Address' />
          <div className={wrongEmail ? 'alert' : 'none'}>{t('signup.wrongEmail')}</div>
          <div className={existEmail ? 'alert' : 'none'}>{t('signup.existEmail')}</div>

          <input className='signupInput' type='password' name='password' onChange={onChangeHandler} placeholder={t('signup.password')} label='Password' />

          <input className='signupInput' type='password' name='confirmPassword' onChange={onChangeHandler} placeholder={t('signup.confirmPassword')} label='Confirm Password' />
          <div className={wrongPassword ? 'alert' : 'none'}>{t('signup.wrongPassword')}</div>
          
          <input className='signupInput' type='text' name='name' onChange={onChangeHandler} placeholder={t('signup.name')} label='Name' />
          <div className={wrongName ? 'alert' : 'none'}>{t('signup.wrongName')}</div>
          
          <div className='signupCheckBox'>
            <input name='policy' onChange={onChangeHandler} type='checkbox'></input>
            <label htmlFor='policy' onClick={e => {
              e.preventDefault();
              setModal(!isOpen);
            }}>{t('signup.policy')}
            </label>
          </div>
          <div className={wrongPolicy ? 'alert' : 'none'}>{t('signup.wrongPolicy')}</div>
        </form>

        {/* signup btn */}
        <button className='signupSubmitBtn' onClick={signUpBtnHandler}>{t('signup.signup')}</button>
        
        {/* go to signin */}
        <div className='gotoSignIn'>
          <a href='/user/signin'>{t('signup.already')}</a>
        </div>
      </div>
      
      {/* privacy policy modal */}
      <Policy isOpen={isOpen} setModal={setModal}/>
    </div>
  )
}

export default withRouter(SignupEmail);