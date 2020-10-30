import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useTranslation, withTranslation } from 'react-i18next';

function SignupEmail() {

  const { t, i18n } = useTranslation();

  const changelanguageToEn = () => i18n.changeLanguage('en')
  const changelanguageToZh = () => i18n.changeLanguage('zh')
  const changelanguageToJa = () => i18n.changeLanguage('ja')

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [policy, setPolicy] = useState('');
  const [language, setLanguage] = useState('');
  const [verification, setVerification] = useState('');
  const [lastVisit, setLastVisit] = useState('');

  const onChangeHandler = (e) => {
    if(e.target.name === "email") {
      setEmail(e.target.value);
    } else if(e.target.name === "password") {
      setPassword(e.target.value);
    } else if(e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else if(e.target.name === "name") {
      setName(e.target.value);
    } else if(e.target.name === "contact") {
      setContact(e.target.value);
    } else if(e.target.name === "policy") {
      setPolicy(e.tarvet.value);
    }
  }

  const signUpBtnHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3355/users/signup', {
      email: email,
      password: password,
      name: name,
      contact: contact
    })
    .then(res => console.log(res));
  }


  return(
    <div>
      <button onClick={changelanguageToEn}>English</button>
      <button onClick={changelanguageToZh}>Chinese</button>
      <button onClick={changelanguageToJa}>Japanese</button>
      <h1>{t('Sign Up')}</h1>
      <form>
        <input name="email" onChange={onChangeHandler} placeholder={t("Email Address")} label="Email Address" />
        <input name="password" onChange={onChangeHandler} placeholder="Password *" label="Password" />
        <input name="confirmPassword" onChange={onChangeHandler} placeholder="Confirm Password *" label="Confirm Password" />
        <input name="name" onChange={onChangeHandler} placeholder="Name *" label="Name" />
        <input name="contact" onChange={onChangeHandler} placeholder="Phone Number *" label="Phone Number" />
        {/* <input name="policy" onChange={onChangeHandler} type="checkbox"></input> */}
          {/* <label htmlFor="policy">개인정보 수집 동의</label> */}
      </form>
      <button onClick={signUpBtnHandler}>Sign Up</button>
    </div>
  )
}

export default withRouter(SignupEmail);