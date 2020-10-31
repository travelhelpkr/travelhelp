import React from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../scss/Mypage.scss';

function Mypage(props) {

  const { setIsLogin, history } = props;
  // change language handler
  const { t } = useTranslation();

  const signoutHandler = () => {
    axios.post('http://localhost:3355/users/signout', {
      language: window.localStorage.getItem('i18nextLng')
    })
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