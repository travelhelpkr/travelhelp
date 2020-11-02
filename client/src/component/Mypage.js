import React from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
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

      <h1 className="h1">{t('mypage.title')}</h1>

      <div className="contentUserInfo">
        <div className="userInfoTitle">{t('mypage.userInfoTitle')}</div>

        {/* user infomation */}
        <div className="userInfoBox">
          <div className="userInfo userInfoName">
            <div className="userInfoIcon"><AccountCircleOutlinedIcon /></div>
            <div className="userInfoText">chae ryn park</div>
          </div>
          <div className="userInfo userInfoEmail">
            <div className="userInfoIcon"><AlternateEmailOutlinedIcon /></div>
            <div className="userInfoText">ryn3777@gmail.com</div>
          </div>
        </div>
        <div className="userInfoBtn">
          <button className="mypageBtn changePasswordBtn" onClick={signoutHandler}>{t('mypage.changePassword')}</button>
          <button className="mypageBtn signOutBtn" onClick={signoutHandler}>{t('mypage.signout')}</button>
        </div>
      </div>

      <div className="contentOrderInfo">
        <div className="orderHistoryTitle">{t('mypage.orderHistoryTitle')}</div>
      </div>
    </div>
  )
}

export default withRouter(Mypage);