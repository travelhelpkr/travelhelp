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

      <h1 className="h1">마이페이지</h1>

      <div className="content_userInfo">

        {/* user infomation */}
        <div className="userInfo">
          <span className="userInfoIcon"><AccountCircleOutlinedIcon /></span>
          <span className="userInfoText">chae ryn park</span>
        </div>
        <div className="userInfo">
          <span className="userInfoIcon"><AlternateEmailOutlinedIcon /></span>
          <span className="userInfoText">ryn3777@gmail.com</span>
        </div>
        <button onClick={signoutHandler}>비밀번호 변경</button>
        <button onClick={signoutHandler}>로그아웃</button>
      </div>

      <div className="content_orderInfo">
        <div>주문내역</div>
      </div>
    </div>
  )
}

export default withRouter(Mypage);