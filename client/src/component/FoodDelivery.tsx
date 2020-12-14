import * as React from 'react';
import FoodChicken from './FoodChicken';
import FoodNoodle from './FoodNoodle';
import '../scss/FoodChicken.scss';

function FoodDelivery() {

  return(
    <div className='background'>

      {/* choose restaurants btn */}
      {
        window.location.pathname === '/help/foodDelivery/noodle'
        ? <FoodNoodle />
        : <FoodChicken />
      }
    </div>
  )
}

export default FoodDelivery;