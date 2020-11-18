import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import '../scss/Cart.scss'; 

function Cart(props) {

  const { history } = props;

  // change language handler
  const { t } = useTranslation();
  
  // cart information
  const [cart, setCart] = useState('');
  const [orderId, setOrderId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [sum, setSum] = useState('');

  // delivery Address information
  const [inputPostalCode, setInputPostalCode] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputContact, setInputContact] = useState('');
  const [confirmPostalCode, setConfirmPostalCode] = useState('');
  const [confirmAddress, setConfirmAddress] = useState('');
  const [confirmContact, setConfirmContact] = useState('');

  // alert delivery information
  const [wrongAddress, setWrongAddress] = useState(false);

  // payment success alert
  const [successAlert, setSuccessAlert] = useState(false);

  // get cart information
  useEffect(() => {
    axios.get(`http://localhost:3355/foods/cart/${window.sessionStorage.getItem('id')}`)
    .then(res => {
      if(res.data.cart) {
        setCart(res.data.cart);
        setOrderId(res.data.cart[0].Order.id);
        setRestaurant(res.data.restaurant);
        const menuPrice = res.data.cart.map(menu => menu.quantity * (menu.Menu.price + menu.Option.price));
        const menuPriceSum = menuPrice.reduce((acc, cur) => acc + cur);
        setSum(menuPriceSum);
      }
    })
  },[])

  // go back btn handler
  const goBackHandler = () => {
    history.goBack();
  }

  // address onChange handler
  const addressOnChangeHandler = (e) => {
    if(e.target.name === 'postalCode') {
      setInputPostalCode(e.target.value);
    } else if(e.target.name === 'address') {
      setInputAddress(e.target.value);
    } else if(e.target.name === 'contact') {
      setInputContact(e.target.value);
    }
  }

  // confirm address btn handler
  const confirmAddressHandler = (e) => {
    e.preventDefault();
    if(inputPostalCode !== '' && inputAddress !== '' && inputContact !== '') {
      setConfirmPostalCode(inputPostalCode);
      setConfirmAddress(inputAddress);
      setConfirmContact(inputContact);
      setWrongAddress(false);
    } else {
      setWrongAddress(true);
    }
  }

  // pay btn handler
  const payBtnHandler = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3355/foods/order/${window.sessionStorage.getItem('id')}`, {
      address: confirmAddress,
      postal_code: confirmPostalCode,
      contact: confirmContact
    })
    .then(() => {
      setSuccessAlert(true);
      // setTimeout(function(){ window.location = '/user/mypage' }, 3000);
    })
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
              console.log('menu:', menu);
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
                  <select className='menuQuantity' defaultValue={menu.quantity} onChange={e => {
                    axios.put('http://localhost:3355/foods/cart', {
                      order_id: orderId,
                      menu_id: menu.Menu.id,
                      option_id: menu.Option.id,
                      quantity: e.target.value
                    })
                    .then(() => {
                      window.location = '/user/cart';
                    })
                  }}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <div className='menuTotalPrice'>{new Intl.NumberFormat().format(Number(((menu.Menu.price + menu.Option.price) * menu.quantity)))}₩</div>
                  <div className='deleteMenu' onClick={() => {
                    axios.delete('http://localhost:3355/foods/cart', {
                      params: {
                        order_id: orderId,
                        menu_id: menu.Menu.id,
                        option_id: menu.Option.id
                      }
                    })
                    .then(() => window.location = '/user/cart')
                  }}><DeleteForeverIcon /></div>
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

      {/* delivery address */}
      <div className='deliveryInfo'>
        <div className='deliveryHeader'>{t('order.deliveryInformation')}</div>
        <div className='addressInput'>
          <div className='address'>{t('order.deliveryInformation')}</div>
          <select className='recentAddress' onChange={e => {
            setConfirmAddress(e.target.value);
          }}>
            <option>{t('order.recentAddress')}</option>
          </select>
          <form>
            <input className='inputaddress postalCode' type='number' name='postalCode' placeholder={t('order.postalCode')} label='Postal Code' onChange={addressOnChangeHandler} />
            <input className='inputaddress deliveryAddress' type='text' name='address' placeholder={t('order.deliveryAddress')} label='Delivery Address' onChange={addressOnChangeHandler} />
            <input className='inputaddress contact' type='number' name='contact' placeholder={t('order.contact')} label='Contact Number' onChange={addressOnChangeHandler} />
          </form>
          <div className={wrongAddress ? 'wrongAddressAlert' : 'none'}>
            <div>{t('order.alert')}</div>
          </div>
          <button className='applyAddress' onClick={confirmAddressHandler} >{t('order.confirmAddress')}</button>
        </div>
        
        <div className='confirmAddress'>
          <div className='confirmTitle'>{t('order.confirmDeliveryAddress')}</div>
          <div className='confirmText postTalText'><div className='arrow'>☞</div><div className='infoText'>{confirmPostalCode}</div></div>
          <div className='confirmText'><div className='arrow'>☞</div><div className='infoText'>{confirmAddress}</div></div>
          <div className='confirmText'><div className='arrow'>☞</div><div className='infoText'>{confirmContact}</div></div>
        </div>

      </div>

      {/* payment */}
      <button className='paymentBtn' onClick={payBtnHandler}>{t('order.pay')}</button>
      <div className={successAlert? 'successPaymentAlert' : 'none'}>
        <div className='checkIcon'><CheckCircleRoundedIcon /></div>
        <div className='checkText'>Payment Completed!</div>
      </div>
    </div>
  )

}

export default withRouter(Cart); 