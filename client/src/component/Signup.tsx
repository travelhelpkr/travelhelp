import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Policy from './Policy';
import '../scss/Form.scss';

function Signup() {

  // change language handler
  const { t } = useTranslation();

  // state of user information for signup
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [policy, setPolicy] = useState<string>('');

  // failure of signup
  const [wrongEmail, setWrongEmail] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [wrongName, setWrongName] = useState<boolean>(false);
  const [wrongPolicy, setWrongPolicy] = useState<boolean>(false);
  const [existEmail, setExistEmail] = useState<boolean>(false);

  // open modal
  const [isOpen, setModal] = useState<boolean>(false);

  // form input change handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const validateEmail = (text: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  // signup btn handler
  const signUpBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateEmail(email) && (password === confirmPassword) && (name !== '') && (policy !== '')) {
      axios.post('/api/users/signup', {
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
          window.location.href = '/user/emailVerified';
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
          <a href='http://localhost:3355/api/auth/google' className='btn googleBtn'>{t('signup.google')}</a>
        </div>
        {/* <div className='signupBtn'>
          <a href='/user/signupwithemail' className='btn wechatBtn'>{t('signup.wechat')}</a>
        </div> */}
        <div className='signupBtn'>
          <a href='http://localhost:3355/api/auth/line' className='btn lineBtn'>{t('signup.line')}</a>
        </div>

        {/* or */}
        <div className='signupOR'>
          <span>{t('signin.or')}</span>
        </div>

        {/* email signup */}
        <form className='signupForm'>
          <input value={email} className='signupInput' type='text' name='email' onChange={onChangeHandler} placeholder={t('signup.email')} aria-label='emailAddressInput'/>
          <div className={wrongEmail ? 'alert' : 'none'}>{t('signup.wrongEmail')}</div>
          <div className={existEmail ? 'alert' : 'none'}>{t('signup.existEmail')}</div>

          <input value={password} className='signupInput' type='password' name='password' onChange={onChangeHandler} placeholder={t('signup.password')} aria-label='passwordInput' />

          <input value={confirmPassword} className='signupInput' type='password' name='confirmPassword' onChange={onChangeHandler} placeholder={t('signup.confirmPassword')} aria-label='confirmPasswordInput' />
          <div className={wrongPassword ? 'alert' : 'none'}>{t('signup.wrongPassword')}</div>
          
          <input value={name} className='signupInput' type='text' name='name' onChange={onChangeHandler} placeholder={t('signup.name')} aria-label='nameInput'/>
          <div className={wrongName ? 'alert' : 'none'}>{t('signup.wrongName')}</div>
          
          <div className='signupCheckBox'>
            <input value={policy} name='policy' onChange={onChangeHandler} type='checkbox' aria-label='policyInput'></input>
            <label htmlFor='policy' onClick={(e: React.MouseEvent<HTMLLabelElement>) => {
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

export default Signup;