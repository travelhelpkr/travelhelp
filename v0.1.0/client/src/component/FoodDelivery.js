import React from 'react';
import { withRouter } from 'react-router-dom';
import FoodChicken from './FoodChicken';
import FoodNoodle from './FoodNoodle';
import '../scss/FoodChicken.scss';

function FoodDelivery(props) {

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