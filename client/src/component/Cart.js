import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../scss/Cart.scss'; 

function Cart(props) {

  return(
    <div className="background">

      <h1 className="h1">My Cart</h1>

      {/* table head */}
      <div>
        
      </div>
      
      {/* chicken cart */}

    </div>
  )

}

export default withRouter(Cart); 