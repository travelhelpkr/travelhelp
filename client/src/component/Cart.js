import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../scss/Cart.scss'; 

function Cart(props) {

  const { history } = props;

  // change language handler
  const { t } = useTranslation();

  // choose the quantity of menu
  const [type, setType] = useState('');

  console.log('type:', type);
  
  // cart information
  const [cart, setCart] = useState('');
  const [orderId, setOrderId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [sum, setSum] = useState('');

  // get cart information
  useEffect(() => {
    axios.get(`http://localhost:3355/foods/cart/${window.sessionStorage.getItem('id')}`)
    .then(res => {
      setCart(res.data.cart);
      setOrderId(res.data.order_id);
      setRestaurant(res.data.restaurant);
      console.log('restaurant:', res.data.restaurant);
      const menuPrice = res.data.cart.map(menu => menu.quantity * (menu.Menu.price + menu.Option.price));
      const menuPriceSum = menuPrice.reduce((acc, cur) => acc + cur);
      setSum(menuPriceSum);
    })
  },[])

  const goBackHandler = () => {
    history.goBack();
  }

  return(
    <div className='background'>

      <div className='header'>
        <button className='backBtn' onClick={goBackHandler}><ArrowBackIcon /></button>
        <h1 className='h1'>{t('cart.myCart')}</h1>
      </div>

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
          <div className='minPrice'>{t('cart.minimum')}<span>{new Intl.NumberFormat().format(Number(restaurant.minimum_price))}₩</span></div>
        </div>

        {/* chicken menu delivery info */}
        <ul className='eachMenuInfo'>
          { cart && cart.map((menu, index) => {
              console.log('menu:', menu.Option.id);
              return(
                <li key={index}>
                  <div className='menuImage'><img src={menu.Menu.image} alt='menuImage'/></div>
                  <div className='menuInfo'>
                    <div className='menuName'>
                      {
                        window.localStorage.getItem('i18nextLng') === 'en'
                        ? menu.Menu.name_en
                        :
                        window.localStorage.getItem('i18nextLng') === 'zh'
                        ? menu.Menu.name_zh
                        : menu.Menu.name_ja
                      }
                    </div>
                    <div className={menu.Option.id !== null ? 'menuType' : 'none'}>- 
                      {
                        window.localStorage.getItem('i18nextLng') === 'en'
                        ? menu.Option.name_en
                        :
                        window.localStorage.getItem('i18nextLng') === 'zh'
                        ? menu.Option.name_zh
                        : menu.Option.name_ja
                      } (+{menu.Option.price}₩)
                    </div>
                  </div>
                  <div className='menuPrice'>{new Intl.NumberFormat().format(Number((menu.Menu.price + menu.Option.price)))}</div>
                  <select className='menuQuantity' value={menu.quantity} onChange={e => setType(e.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <div className='menuTotalPrice'>{new Intl.NumberFormat().format(Number(((menu.Menu.price + menu.Option.price) * menu.quantity)))}₩</div>
                  <div className='deleteMenu'><DeleteForeverIcon /></div>
                </li>
              )
            })
          }
        </ul>

        {/* chicken menu total info */}
        <div className='summaryInfo'>
          <div className='menuTotalPriceSum'>
            <span className='priceSum1'>{t('cart.menuPrice')}</span>
            <span className='priceSum2'>{new Intl.NumberFormat().format(Number(sum))}</span>
          </div>
          <div className='plus'>+</div>
          <div className='deliveryFee'>
            <span className='delivery1'>{t('cart.delivery')}</span>
            <span className='delivery2'>{new Intl.NumberFormat().format(Number(restaurant.delivery_fee))}</span>
          </div>
          <div className='equal'>=</div>
          <div className='totalPrice'>
            <span className='total1'>{t('cart.total')}</span>
            <span className='total2'>{new Intl.NumberFormat().format(Number((sum + restaurant.delivery_fee)))}₩</span>
          </div>
          <div className={sum < restaurant.minimum_price ? 'minimumAlert' : 'none'}>
            <span>↳ {t('cart.minimumAlert')} <strong>{new Intl.NumberFormat().format(Number(restaurant.minimum_price))}₩</strong></span>
          </div>
        </div>

      </div>

    </div>
  )

}

export default withRouter(Cart); 