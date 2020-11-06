import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import noodleImg from '../img/new_banner_bn.png';
import blacknoodle from '../img/blacknoodle.png';
import cartWhite from '../img/cart_white.png';
import cartNavy from '../img/cart_navy.png';
import '../scss/FoodNoodle.scss';

function FoodNoodle(props) {

  const [data, setData] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    axios.get('http://localhost:3355/foods/menu', {
      params: {
        restaurant_id : 2
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
    <div className="cartIconNoodle">
      <img src={cartWhite}/>
    </div>
    <div className="restaurantNoodle">
      {/* choose restaurants btn */}
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

      <ul>
        {
          data && data.map(data => {
            return(
              <div className="menuLi">
                <li key={data.id}>
                  <img src={blacknoodle}/>
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

export default withRouter(FoodNoodle); 