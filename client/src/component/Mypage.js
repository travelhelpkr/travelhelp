import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation, withTranslation } from 'react-i18next';
import './Mypage.scss';
import axios from 'axios';

function Mypage(props) {

  const { setIsLogin, history } = props;
  // change language handler
  const { t, i18n } = useTranslation();

  const signoutHandler = () => {
    axios.post('http://localhost:3355/users/signout', {})
      .then(res => {
        setIsLogin(false);
        window.sessionStorage.clear();
      })
      .then(() => history.push('/'))
  }

  return(
    <div className="background">
      <button onClick={signoutHandler}>로그아웃</button>
    </div>
  )
}

export default withRouter(Mypage);