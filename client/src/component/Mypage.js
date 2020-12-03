import React, { useEffect, useState } from 'react';
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

  // user order history state
  const [orderHistory, setOrderHistory] = useState('');

  // get order history
  useEffect(() => {
    axios.get(`/api/users/mypage/${window.sessionStorage.getItem('id')}`)
    .then(res => {
      console.log('res:', res.data.order_history);
      setOrderHistory(res.data.order_history);
    })
  },[])

  // handle sign out
  const signoutHandler = () => {
    axios.post('/api/users/signout', {
      language: window.localStorage.getItem('i18nextLng')
    },{
      withCredentials: true,
    }, {
      headers: { 
        'Access-Control-Allow-Origin': 'https://travelhelp.kr',
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
            {
              orderHistory && orderHistory.map(order => {
                console.log("order:", order);
                const menuPrice = order.Menus.map(menu => (menu.quantity * (menu.Menu.price + menu.Option.price)) + menu.Restaurant.delivery_fee);
                const menuPriceSum = menuPrice.reduce((acc, cur) => acc + cur);
                console.log("menuPriceSum:", menuPriceSum)
                return(
                  <li key={order.id} className='orderlist'>
                    <div className='restaurantName'>{order.Menus[0].Restaurant.name_en}</div>
                    <div className='purchasedAt'>{order.purchased_at.substring(0,10)}</div>
                    {/* menu lists */}
                    <ul className='menuLists'>
                      {
                        order.Menus && order.Menus.map((menu,index) => {
                          console.log("menu:", menu.Menu.price);
                          return(
                            <li key={index} className='menuList'>
                              <div className='menuName'>
                                {
                                  window.localStorage.getItem('i18nextLng') === 'en'
                                  ? menu.Menu.name_en
                                  : window.localStorage.getItem('i18nextLng') === 'zh'
                                  ? menu.Menu.name_zh
                                  : menu.Menu.name_ja
                                }
                              </div>
                              <div className='menuOption'>
                              { 
                                window.localStorage.getItem('i18nextLng') === 'en'
                                ? menu.Option.name_en ? '- ' + menu.Option.name_en : ''
                                : window.localStorage.getItem('i18nextLng') === 'zh'
                                ? '- ' + menu.Option.name_zh
                                : '- ' + menu.Option.name_ja
                              }, 
                              {' ' + menu.quantity}(ea)
                              </div>
                            </li>
                          )
                        })
                      }
                    </ul>

                    <div className='deliveryInfomation'>
                      <div className='title address'>{t('mypage.address')}</div>
                      <div className='text address'>{order.Address_book.postal_code}) {order.Address_book.address}</div>
                    </div>
                    <div className='deliveryInfomation'>
                      <div className='title'>{t('mypage.contact')}</div>
                      <div className='text'>{order.Address_book.contact}</div>
                    </div>
                    <div className='deliveryInfomation'>
                      <div className='title'>{t('mypage.totalPrice')}</div>
                      <div className='text'>{new Intl.NumberFormat().format(Number(menuPriceSum))}₩</div>
                    </div>
                  </li>

                )
              })
            }
          </ul>
        </div>

      </div>
    </div>
  )
}

export default withRouter(Mypage);