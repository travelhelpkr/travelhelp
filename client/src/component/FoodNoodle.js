import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../scss/FoodNoodle.scss';
import noodleImg from '../img/new_banner_bn.png';

function FoodNoodle(props) {

  const { t } = useTranslation();

  return(
  <div>
    <div className="restaurantNoodle">
      {/* choose restaurants btn */}
      <div className="chicken">
        <a href="/help/foodDelivery/chicken">Chicken</a>
      </div>
      <div className="noodleSelected">
        <a href="/help/foodDelivery/noodle">Noodle</a>
      </div>
    </div>
    <div className="menu">
      <div className="banner">
        <img src={noodleImg}/>
      </div>
    </div>
  </div>
  )
}

export default withRouter(FoodNoodle); 