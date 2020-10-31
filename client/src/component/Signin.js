import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../scss/Form.scss';

function Signin(props) {

  // login state props
  const { setIsLogin } = props;

  // change language handler
  const { t } = useTranslation();

  // state of user information for signin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // failure of signin
  const [failAlert, setFailAlert] = useState(false);

  // signin handler
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
    .catch((err) => setFailAlert(true));
  }

  return(
    <div className="background">

      {/* social signin */}
      <h1 className="h1">{t('signin.signin')}</h1>
      <div className="signupBtn">
        <a href="/user/signupwithemail" className="btn googleBtn">{t('signin.google')}</a>
      </div>
      <div className="signupBtn">
        <a href="/user/signupwithemail" className="btn wechatBtn">{t('signin.wechat')}</a>
      </div>
      <div className="signupBtn">
        <a href="/user/signupwithemail" className="btn lineBtn">{t('signin.line')}</a>
      </div>

      {/* or */}
      <div className="signupOR">
        <span>{t('signin.or')}</span>
      </div>

      {/* email signin */}
      <form className="signupForm">
        <input className="signupInput" type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder={t("signin.email")} label="Email Address" />
        <input className="signupInput" type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder={t("signin.password")} label="Password" />
        <div className={failAlert ? "alert" : "none"}>{t('signin.wrongInfo')}</div>
      </form>

      {/* signin btn */}
      <button className="signupSubmitBtn" onClick={handleLoginBtn}>{t('signin.signin')}</button>
      
      {/* find password */}
      <div className="gotoSignIn forgotPassword">
        <a href="/user/signup">{t('signin.forgotPassword')}</a>
      </div>

      {/* go to signup */}
      <div className="gotoSignIn">
        <a href="/user/signup">{t('signin.gotoSignUp')}</a>
      </div>
    </div>
  )
}

export default withRouter(Signin);