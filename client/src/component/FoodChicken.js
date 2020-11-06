import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import chickenImg from '../img/new_banner_CK.png';
import chicken from '../img/chicken.jpg';
import cartWhite from '../img/cart_white.png';
import cartNavy from '../img/cart_navy.png';
import '../scss/FoodChicken.scss';

function FoodChicken(props) {

  const [data, setData] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    axios.get('http://localhost:3355/foods/menu', {
      params: {
        restaurant_id : 1
      }
    })
    .then(res => {
      let result = res.data;
      setData(result)
      // console.log(data);
    })
  })

  return(
  <div>
    <div className="cartIcon">
      <img src={cartWhite}/>
    </div>
    {/* choose restaurants btn */}
    <div className="restaurantsChicken">
      <div className="chickenSelected">
        <a href="/help/foodDelivery/chicken">{t('food.chicken')}</a>
      </div>
      <div className="noodle">
        <a href="/help/foodDelivery/noodle">{t('food.noodle')}</a>
      </div>
    </div>

    <div className="menu">

      {/* banner img */}
      <div className="banner">
        <img src={chickenImg}/>
      </div>

      <ul>
        {
          data && data.map(data => {
            return(
              <div className="menuLi">
                <li key={data.id}>
                  <img src={chicken}/>
                  <div className="menuName">
                    {
                      window.localStorage.getItem('i18nextLng') === 'en'
                      ? data.name_en
                      :
                      window.localStorage.getItem('i18nextLng') === 'zh'
                      ? data.name_zh
                      : data.name_ja
                    }
                  </div>
                  <div className="menuPrice">{data.price}₩</div>
                  <button className="addCartBtn"><img src={cartNavy}/></button>
                </li>
              </div>
            )
          })
        }
      </ul>
    </div>
  </div>

  )
}

export default withRouter(FoodChicken); 