import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../scss/FoodChicken.scss';
import chickenImg from '../img/new_banner_CK.png';

function FoodChicken(props) {

  const { t } = useTranslation();

  return(
  <div>
    <div className="restaurantsChicken">
      {/* choose restaurants btn */}
      <div className="chickenSelected">
        <a href="/help/foodDelivery/chicken">Chicken</a>
      </div>
      <div className="noodle">
        <a href="/help/foodDelivery/noodle">Noodle</a>
      </div>
    </div>
    <div className="menu">
      <div className="banner">
        <img src={chickenImg}/>
      </div>
    </div>
  </div>

  )
}

export default withRouter(FoodChicken); 