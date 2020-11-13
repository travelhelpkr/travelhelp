import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import chickenImg from '../img/new_banner_CK.png';
import cartWhite from '../img/cart_white.png';
import cartNavy from '../img/cart_navy.png';
import ModalChicken from './ModalChicken';
import ModalSignin from './ModalSignin';
import '../scss/FoodChicken.scss';

function FoodChicken(props) {

  // userId props for modal
  const { userId } = props;

  // menu of restaurant
  const [menu, setMenu] = useState(null);

  // information of restaurant
  const [information, setInformation] = useState(null);

  // open modal
  const [isOpen, setModal] = useState(false);
  const [isSignin, setIsSignin] = useState(false);

  // modal information
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [optionName1, setOptionName1] = useState('');
  const [optionName2, setOptionName2] = useState('');
  const [optionPrice2, setOptionPrice2] = useState('');

  // change language
  const { t } = useTranslation();

  // get restaurant menus
  useEffect(() => {
    axios.get('http://localhost:3355/foods/menu', {
      params: {
        restaurant_id : 1
      }
    })
    .then(res => {
      let result = res.data;
      setMenu(result);
      console.log("menu::::", menu);
    })
  },[])

  // get restaurant information
  useEffect(() => {
    axios.get('http://localhost:3355/foods/restaurant', {
      params: {
        id : 1
      }
    })
    .then(res => {
      let informtaion = res.data;
      setInformation(informtaion);
      console.log('information:', information);
    })
  },[])

  // check signin status when user clicked cart icon on Nav bar
  const checkSigninStatus = (e) => {
    if(window.sessionStorage.getItem('id')) {
      window.location = '/user/cart';
    } else {
      e.preventDefault();
      setIsSignin(!isSignin);
    }
  }

  return(
  <div>
    {/* cart icon */}
    <div className='cartIcon'>
      <button className="cartIconBtn" onClick={checkSigninStatus}><img src={cartWhite}/></button>
    </div>

    {/* choose restaurants btn */}
    <div className='restaurantsChicken'>
      <div className='chickenSelected'>
        <a href='/help/foodDelivery/chicken'>{t('food.chicken')}</a>
      </div>
      <div className='noodle'>
        <a href='/help/foodDelivery/noodle'>{t('food.noodle')}</a>
      </div>
    </div>

    <div className='menuContent'>

      {/* banner img */}
      <div className='banner'>
        <img src={chickenImg}/>
      </div>

      {/* restaurant information */}
      <div className='restaurantInfo'>
        {
          information && information.map(information => {
            return(
              <div>
                <div className='Info restaurantDes'>
                  {
                    window.localStorage.getItem('i18nextLng') === 'en'
                    ? information.description_en
                    : window.localStorage.getItem('i18nextLng') === 'zh'
                    ? information.description_zh
                    : information.description_ja
                  }
                </div>
                <div className='Info restaurantName'>
                  <span className='InfoDetailTitle'>{t('food.restaurant')}</span>
                  {
                    window.localStorage.getItem('i18nextLng') === 'en'
                    ? information.name_en
                    : window.localStorage.getItem('i18nextLng') === 'zh'
                    ? information.name_zh
                    : information.name_ja
                  }
                </div>
                <div className='Info restaurantHour'>
                  <span className='InfoDetailTitle'>{t('food.hour')}</span>
                  {information.operation_hour}
                </div>
                <div className='Info restaurantMin'>
                  <span className='InfoDetailTitle'>{t('food.minimum')}</span>
                  {information.minimum_price.toLocaleString()}
                </div>
                <div className='Info restaurantDel'>
                  <span className='InfoDetailTitle'>{t('food.delivery')}</span>
                  {information.delivery_fee.toLocaleString()}
                </div>
              </div>
            )
          })
        }
      </div>

      {/* menu list */}
      <ul>
        {
          menu && menu.map(menu => {
            console.log("options:", menu.Options[0].name_en);
            return(
              <div className="menuLi" onClick={e => {
                e.preventDefault();
                setModal(!isOpen);
                setImage(menu.image);
                setName(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.name_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.name_zh
                  : menu.name_ja
                );
                setPrice(menu.price);
                setDescription(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.description_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.description_zh
                  : menu.description_ja
                );
                setOptionName1(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.Options[0].name_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.Options[0].name_zh
                  : menu.Options[0].name_ja
                );
                setOptionName2(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.Options[1].name_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.Options[1].name_zh
                  : menu.Options[1].name_ja
                );
                setOptionPrice2(menu.Options[1].price);
              }}>
                <li key={menu.id}>
                  <img src={menu.image}/>
                  <div className="menuName">
                    {
                      window.localStorage.getItem('i18nextLng') === 'en'
                      ? menu.name_en
                      :
                      window.localStorage.getItem('i18nextLng') === 'zh'
                      ? menu.name_zh
                      : menu.name_ja
                    }
                  </div>
                  <div className="menuPrice">{menu.price}₩</div>
                  <button className="addCartBtn"><img src={cartNavy}/></button>
                </li>
              </div>
            )
          })
        }
      </ul>

      {/* chicken modal */}
      <ModalChicken isOpen={isOpen} setModal={setModal} infoImage={image} infoName={name} infoPrice={price} infoDescription={description} infoOptionName1={optionName1} infoOptionName2={optionName2} infoOptionPrice2={optionPrice2} userId={userId} />

      {/* signin modal */}
      <ModalSignin isSignin={isSignin} setIsSignin={setIsSignin} />
    </div>
  </div>

  )
}

export default withRouter(FoodChicken); 