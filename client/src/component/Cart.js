import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import delivery from '../img/delivery.png';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import '../scss/Cart.scss'; 

function Cart(props) {

  return(
    <div className="background">

      <h1 className="h1">My Cart</h1>

      <div className="cartTable">

        {/* table head */}
        <div className="tableHead">
          <div className="menuInfo">Menu</div>
          <div className="totalPrice">Price</div>
        </div>
        
        {/* chicken cart */}
        <div className="chickenCart">
          <div className="neneChicken">NeNe Chicken</div>
          <div className="minPrice">Minimum Order Price<span>15,000₩</span></div>
        </div>

        {/* chicken menu delivery info */}
        <ul className="eachMenuInfo">
          <li>
            <div className="menuImage"><img src={delivery}/></div>
            <div className="menuInfo">
              <div className="menuName">Half snowing cheese + Half super hot + Half fried</div>
              <div className="menuType">- Boneless (+2,000)</div>
            </div>
            <div className="menuPrice">26,000₩</div>
            <select className="menuQuantity">
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div className="menuTotalPrice">26,000₩</div>
            <div className="deleteMenu"><DeleteForeverIcon /></div>
          </li>
        </ul>

        {/* chicken menu total info */}
        <div className="summaryInfo">
          <div className="menuTotalPriceSum">
            <span className="priceSum1">Menu Price</span>
            <span className="priceSum2">26,000</span>
          </div>
          <div className="plus">+</div>
          <div className="deliveryFee">
            <span className="delivery1">Delivery Fee</span>
            <span className="delivery2">2,000</span>
          </div>
          <div className="equal">=</div>
          <div className="totalPrice">
            <span className="total1">Total Price</span>
            <span className="total2">28,000 ₩</span>
          </div>
        </div>

      </div>

    </div>
  )

}

export default withRouter(Cart); 