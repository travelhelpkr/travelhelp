import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import delivery from '../img/delivery.png';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import '../scss/Cart.scss'; 

function Cart(props) {

  // change language handler
  const { t } = useTranslation();

  // choose the quantity of menu
  const [type, setType] = useState('');
  
  // cart information
  const [cart, setCart] = useState('');
  const [orderId, setOrderId] = useState('');
  const [restaurant, setRestaurant] = useState('');

  // get cart information
  useEffect(() => {
    axios.get(`http://localhost:3355/foods/cart/${window.sessionStorage.getItem('id')}`)
    .then(res => {
      console.log('res.cart ', res.data.cart);
      console.log('res.order_id ', res.data.order_id);
      console.log('res.restaurant ', res.data.restaurant);
      setCart(res.data.cart);
      setOrderId(res.data.order_id);
      setRestaurant(res.data.restaurant);
    })
  },[])

  return(
    <div className='background'>

      <h1 className='h1'>{t('cart.myCart')}</h1>

      {/* cart table */}
      <div className='cartTable'>

        {/* table head */}
        <div className='tableHead'>
          <div className='menuInfo'>{t('cart.menu')}</div>
          <div className='totalPrice'>{t('cart.price')}</div>
        </div>
        
        {/* chicken cart */}
        <div className='chickenCart'>
          <div className='neneChicken'>{restaurant.name_en} {restaurant.category_en}</div>
          <div className='minPrice'>{t('cart.minimum')}<span>{restaurant.minimum_price}₩</span></div>
        </div>

        {/* chicken menu delivery info */}
        <ul className='eachMenuInfo'>
          { cart && cart.map(menu => {
              console.log('menu:', menu);
              <li key={menu.menu_id}>
                <div className='menuImage'><img src={menu.Menu.image} alt='menuImage'/></div>
                <div className='menuInfo'>
                  <div className='menuName'>Half snowing cheese + Half super hot + Half fried</div>
                  <div className='menuType'>- Boneless (+2,000)</div>
                </div>
                <div className='menuPrice'>26,000₩</div>
                <select className='menuQuantity'>
                  <option value='1' defaultValue onChange={e => setType(e.target.value)}>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <div className='menuTotalPrice'>26,000₩</div>
                <div className='deleteMenu'><DeleteForeverIcon /></div>
              </li>
            })
          }
        </ul>

        {/* chicken menu total info */}
        <div className='summaryInfo'>
          <div className='menuTotalPriceSum'>
            <span className='priceSum1'>{t('cart.menuPrice')}</span>
            <span className='priceSum2'>26,000</span>
          </div>
          <div className='plus'>+</div>
          <div className='deliveryFee'>
            <span className='delivery1'>{t('cart.delivery')}</span>
            <span className='delivery2'>2,000</span>
          </div>
          <div className='equal'>=</div>
          <div className='totalPrice'>
            <span className='total1'>{t('cart.total')}</span>
            <span className='total2'>28,000 ₩</span>
          </div>
        </div>

      </div>

    </div>
  )

}

export default withRouter(Cart); 