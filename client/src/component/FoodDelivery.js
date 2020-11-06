import React from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../scss/FoodChicken.scss';
import FoodChicken from './FoodChicken';
import FoodNoodle from './FoodNoodle';

function FoodDelivery(props) {

  // change language handler
  const { t, i18n } = useTranslation();

  return(
    <div className="background">

      {/* choose restaurants btn */}
      {/* <div className="restaurantChicken"> */}
        {
          props.location.pathname === "/help/foodDelivery/noodle"
          ? <FoodNoodle />
          : <FoodChicken />
        }
      {/* </div> */}
    </div>
  )
}

export default withRouter(FoodDelivery);