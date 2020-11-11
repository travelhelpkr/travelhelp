import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FoodChicken from './FoodChicken';
import FoodNoodle from './FoodNoodle';
import '../scss/FoodChicken.scss';

function FoodDelivery(props) {

  // change language handler
  const { t, i18n } = useTranslation();

  return(
    <div className='background'>

      {/* choose restaurants btn */}
      {
        props.location.pathname === '/help/foodDelivery/noodle'
        ? <FoodNoodle />
        : <FoodChicken />
      }
    </div>
  )
}

export default withRouter(FoodDelivery);