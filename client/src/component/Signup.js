import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useTranslation, withTranslation } from 'react-i18next';
import Nav from "./Nav_signin";

function SignupEmail() {

  const { t, i18n } = useTranslation();

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
      setPolicy("true");
    }
  }

  const signUpBtnHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3355/users/signup', {
      email: email,
      password: password,
      name: name,
      contact: contact,
      is_policy_agreed: policy,
      language: window.localStorage.getItem("i18nextLng")
    })
    .then(res => console.log(res));
  }


  return(
    <div>
      <h1>{t('signup.signup')}</h1>
      <div>
        <a href="/user/signupwithemail">{t('signup.google')}</a>
      </div>
      <div>
        <a href="/user/signupwithemail">{t('signup.wechat')}</a>
      </div>
      <div>
        <a href="/user/signupwithemail">{t('signup.line')}</a>
      </div>
      <div>
        <a href="/user/signin">{t('signup.already')}</a>
      </div>
      <form>
        <input type="text" name="email" onChange={onChangeHandler} placeholder={t("signup.email")} label="Email Address" />
        <input type="password" name="password" onChange={onChangeHandler} placeholder={t("signup.password")} label="Password" />
        <input type="password" name="confirmPassword" onChange={onChangeHandler} placeholder={t("signup.confirmPassword")} label="Confirm Password" />
        <input type="text" name="name" onChange={onChangeHandler} placeholder={t("signup.name")} label="Name" />
        <input type="number" name="contact" onChange={onChangeHandler} placeholder={t("signup.contact")} label="Phone Number" />
        <input name="policy" onChange={onChangeHandler} type="checkbox"></input>
           <label htmlFor="policy">{t("signup.policy")}</label>
      </form>
      <button onClick={signUpBtnHandler}>{t('signup.signup')}</button>
    </div>
  )
}

export default withRouter(SignupEmail);