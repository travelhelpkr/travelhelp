import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import noodleImg from '../img/new_banner_bn.png';
import cartWhite from '../img/cart_white.png';
import cartNavy from '../img/cart_navy.png';
import Modal from './Modal';
import '../scss/FoodNoodle.scss';

function FoodNoodle(props) {

  // menu of restaurant
  const [menu, setMenu] = useState(null);

  // information of restaurant
  const [information, setInformation] = useState(null);

  // open modal
  const [isOpen, setModal] = useState(false);

  // modal information
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // change language
  const { t } = useTranslation();

  // get restaurant menus
  useEffect(() => {
    axios.get('http://localhost:3355/foods/menu', {
      params: {
        restaurant_id : 2
      }
    })
    .then(res => {
      let result = res.data;
      setMenu(result)
    })
  },[])

  // get restaurant information
  useEffect(() => {
    axios.get('http://localhost:3355/foods/restaurant', {
      params: {
        id : 2
      }
    })
    .then(res => {
      let informtaion = res.data;
      setInformation(informtaion);
      console.log(information);
    })
  },[])

  return(
  <div>
    {/* cart icon */}
    <div className="cartIconNoodle">
      <img src={cartWhite}/>
    </div>

    {/* choose restaurants btn */}
    <div className="restaurantNoodle">
      <div className="chicken">
        <a href="/help/foodDelivery/chicken">{t('food.chicken')}</a>
      </div>
      <div className="noodleSelected">
        <a href="/help/foodDelivery/noodle">{t('food.noodle')}</a>
      </div>
    </div>
    <div className="menu">

      {/* banner img */}
      <div className="banner">
        <img src={noodleImg}/>
      </div>

      {/* restaurant information */}
      <div className="restaurantInfo">
        {
          information && information.map(information => {
            return(
              <div>
                <div className="Info restaurantDes">
                  {
                    window.localStorage.getItem('i18nextLng') === 'en'
                    ? information.description_en
                    : window.localStorage.getItem('i18nextLng') === 'zh'
                    ? information.description_zh
                    : information.description_ja
                  }
                </div>
                <div className="Info restaurantName">
                  <span className="InfoDetailTitle">{t('food.restaurant')}</span>
                  {
                    window.localStorage.getItem('i18nextLng') === 'en'
                    ? information.name_en
                    : window.localStorage.getItem('i18nextLng') === 'zh'
                    ? information.name_zh
                    : information.name_ja
                  }
                </div>
                <div className="Info restaurantHour">
                  <span className="InfoDetailTitle">{t('food.hour')}</span>
                  {information.operation_hour}
                </div>
                <div className="Info restaurantMin">
                  <span className="InfoDetailTitle">{t('food.minimum')}</span>
                  {information.minimum_price}
                </div>
                <div className="Info restaurantDel">
                  <span className="InfoDetailTitle">{t('food.delivery')}</span>
                  {information.delivery_fee}
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
                )
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
                  <button className="addCartBtn"><img src={cartNavy} /></button>
                </li>
              </div>
            )
          })
        }
      </ul>
      <Modal isOpen={isOpen} setModal={setModal} infoImage={image} infoName={name} infoPrice={price} infoDescription={description} />
    </div>
  </div>
  )
}

export default withRouter(FoodNoodle); 