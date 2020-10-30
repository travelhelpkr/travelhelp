import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation, withTranslation } from 'react-i18next';
import axios from 'axios';

function Signin(props) {

  const { setIsLogin } = props;
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginBtn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3355/users/signin', {
      email: email,
      password: password
    }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    })
    .then(res => {
      window.sessionStorage.setItem('id', "id");
      setIsLogin(true);
    })
  }

  return(
    <div>
      <h1>{t('signin.signin')}</h1>
      <div>
        <a href="/user/signupwithemail">{t('signin.google')}</a>
      </div>
      <div>
        <a href="/user/signupwithemail">{t('signin.wechat')}</a>
      </div>
      <div>
        <a href="/user/signupwithemail">{t('signin.line')}</a>
      </div>
      <div>
        <span>{t('signin.or')}</span>
      </div>
      <div>
        <a href="/user/signup">{t('signin.forgotPassword')}</a>
      </div>
      <div>
        <a href="/user/signup">{t('signin.gotoSignUp')}</a>
      </div>
      <form>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder={t("signin.email")} label="Email Address" />
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder={t("signin.password")} label="Password" />
      </form>
      <button onClick={handleLoginBtn}>{t('signin.signin')}</button>
    </div>
  )
}

export default withRouter(Signin);