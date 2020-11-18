import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import '../scss/Mypage.scss';

function Mypage(props) {

  // props
  const { email, name, setIsLogin, setEmail, setName } = props;

  // change language handler
  const { t } = useTranslation();

  // handle sign out
  const signoutHandler = () => {
    axios.post('http://localhost:3355/users/signout', {
      language: window.localStorage.getItem('i18nextLng')
    },{
      withCredentials: true,
    }, {
      headers: { 
        'Access-Control-Allow-Origin': 'http://localhost:3355',
       }
    })
      .then(res => {
        console.log('res:', res);
        setIsLogin(false);
        setEmail('');
        setName('');
        window.sessionStorage.clear();
      })
      .then(() => window.location = '/')
  }

  return(
    <div className='background'>

      <h1 className='h1'>{t('mypage.title')}</h1>

      <div className='contentMyInfo'>
        <div className='userInfoTitle'>{t('mypage.userInfoTitle')}</div>

        {/* user infomation */}
        <div className='userInfoBox'>
          <div className='userInfo userInfoName'>
            <div className='userInfoIcon'><AccountCircleOutlinedIcon /></div>
            <div className='userInfoText'><span>{t('mypage.userName')}</span>{name}</div>
          </div>
          <div className='userInfo userInfoEmail'>
            <div className='userInfoIcon'><AlternateEmailOutlinedIcon /></div>
            <div className='userInfoText'><span>{t('mypage.userEmail')}</span>{email}</div>
          </div>
        </div>
        <div className='userInfoBtn'>
          <button className='mypageBtn signOutBtn' onClick={signoutHandler}>{t('mypage.signout')}</button>
        </div>
      </div>

      {/* order info */}
      <div className='contentOrderInfo'>
        <div className='orderHistoryTitle'>{t('mypage.orderHistoryTitle')}</div>

        {/* order history */}
        <div className='orderHistoryBox'>
          {/* order lists */}
          <ul className='orderLists'>
            <li className='orderlist'>
              <div className='restaurantName'>NeNe Chicken</div>
              <div className='purchasedAt'>2020-11-17 13:45</div>
              {/* menu lists */}
              <ul className='menuLists'>
                <li className='menuList'>
                  <div className='menuName'>후라이드치킨</div>
                  <div className='menuOption'>- 순살, 1ea</div>
                </li>
                <li className='menuList'>
                  <div className='menuName'>후라이드반 양념반</div>
                  <div className='menuOption'>- 뼈, 2ea</div>
                </li>
              </ul>
              <div className='deliveryInfomation'>
                <span className='title'>{t('mypage.address')}</span>
                <span className='text'>03995) 서울시 마포구 양화로 175, 마젤란 309호</span>
              </div>
              <div className='deliveryInfomation'>
                <span className='title'>{t('mypage.contact')}</span>
                <span className='text'>01012345678</span>
              </div>
              <div className='deliveryInfomation'>
                <span className='title'>{t('mypage.totalPrice')}</span>
                <span className='text'>65,000₩</span>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default withRouter(Mypage);