import * as React from 'react';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { RouterProps } from 'react-router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import '../scss/Cart.scss'; 

interface IPropsCart {
  history: RouterProps['history'];
}

const Cart: React.FC<IPropsCart> = (props) => {

  const { history } = props;

  // change language handler
  const { t } = useTranslation();
  
  // cart information
  const [cart, setCart] = useState<any>('');
  const [orderId, setOrderId] = useState<number>(0);
  const [restaurant, setRestaurant] = useState<any>('');
  const [sum, setSum] = useState<number>(0);

  // delivery Address information
  const [inputPostalCode, setInputPostalCode] = useState<string>('');
  const [inputAddress, setInputAddress] = useState<string>('');
  const [inputContact, setInputContact] = useState<string>('');
  const [addressArray, setAddressArray] = useState<any>('');
  const [addressId, setAddressId] = useState<string>('');

  // alert delivery information
  const [wrongAddress, setWrongAddress] = useState<boolean>(false);

  // alert minimum price
  const [minimumPrice, setMinimumPrice] = useState<boolean>(false);

  // payment success alert
  const [successAlert, setSuccessAlert] = useState<boolean>(false);

  // empty cart alert
  const [emptyCart, setEmptyCart] = useState<boolean>(false);

  // delivery method alert
  const [selectAddress, setSelectAddress] = useState<boolean>(false);

  // get cart information
  useEffect(() => {
    axios.get(`/api/foods/cart/${window.sessionStorage.getItem('id')}`)
    .then(res => {
      if(res.data.cart) {
        setEmptyCart(false);
        setCart(res.data.cart);
        setOrderId(res.data.cart[0].Order.id);
        setRestaurant(res.data.restaurant);
        const menuPrice = res.data.cart.map((menu: any) => menu.quantity * (menu.Menu.price + menu.Option.price));
        const menuPriceSum = menuPrice.reduce((acc: number, cur: number) => acc + cur);
        setSum(menuPriceSum);
      } else {
        setEmptyCart(true);
      }
    })
  },[])

  // get recent address
  useEffect(() => {
    axios.get(`/api/foods/order/${window.sessionStorage.getItem('id')}`)
    .then(res => {
      setAddressArray(res.data.recent_address);
    })
  },[])

  // go back btn handler
  const goBackHandler = () => {
    history.goBack();
  }

  // address onChange handler
  const addressOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'postalCode') {
      setInputPostalCode(e.target.value);
      setSelectAddress(false);
    } else if(e.target.name === 'address') {
      setInputAddress(e.target.value);
      setSelectAddress(false);
    } else if(e.target.name === 'contact') {
      setInputContact(e.target.value);
      setSelectAddress(false);
    }
  }

  // pay btn handler
  const payBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(sum >= restaurant.minimum_price) {
      if(addressId) {
        axios.post(`/api/foods/order/${window.sessionStorage.getItem('id')}`, {
        address_book_id: addressId
        })
        .then(() => {
          setSuccessAlert(true);
          setTimeout(function(){ window.location.href = '/user/mypage' }, 3000);
        })
      } else {
        if(inputPostalCode !== '' && inputAddress !== '' && inputContact !== '') {
          setWrongAddress(false);
          axios.post(`/api/foods/order/${window.sessionStorage.getItem('id')}`, {
            postal_code: inputPostalCode,
            address: inputAddress,
            contact: inputContact
          })
          .then(() => {
            setSuccessAlert(true);
            setTimeout(function(){ window.location.href = '/user/mypage' }, 5000);
          })
        } else {
          setWrongAddress(true);
        }
      }
    } else {
      setMinimumPrice(true);
    }
  }

  return(
    <div className='background'>

      <div className='header'>
        <button className='backBtn' onClick={goBackHandler}><ArrowBackIcon /></button>
        <h1 className='h1'>{t('cart.myCart')}</h1>
      </div>

      {/* cart table */}
      <div className={emptyCart? 'none' : 'cartTable'}>

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
          { cart && cart.map((menu: any, index: number) => {
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
                  <select className='menuQuantity' defaultValue={menu.quantity} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    axios.put('/api/foods/cart', {
                      order_id: orderId,
                      menu_id: menu.Menu.id,
                      option_id: menu.Option.id,
                      quantity: e.target.value
                    })
                    .then(() => {
                      window.location.href = '/user/cart';
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
                    axios.delete('/api/foods/cart', {
                      params: {
                        order_id: orderId,
                        menu_id: menu.Menu.id,
                        option_id: menu.Option.id
                      }
                    })
                    .then(() => window.location.href = '/user/cart')
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
      <div className={emptyCart? 'none' : 'deliveryInfo'}>
        <div className='deliveryHeader'>{t('order.delivery')}</div>
        <div className='addressInput'>
          <div className='address'>{t('order.deliveryInformation')}</div>

          {/* select recent address */}

          <button className={selectAddress? 'none' : 'choose'} onClick={() => setSelectAddress(true)}>{t('order.choose')}</button>
          <select className={selectAddress? 'recentAddress' : 'none' } onChange={(e: React.ChangeEvent<HTMLSelectElement>)=> {
            console.log("e.target.value", e.target.value)
            setAddressId(e.target.value);
            setSelectAddress(true);
          }}>
            { addressArray && addressArray.map((address: any) => {
                return(
                  <option key={address.id} value={address.id}>
                    {address.postal_code + ')'} {address.address} {' / ' + address.contact}
                  </option>
                )
              })
            }
            <option>{t('order.recentAddress')}</option>
          </select>

          <div className='or'>{t('signin.or')}</div>
          
          {/* input address form */}
          <form className={selectAddress? 'none' : 'inputForm'} >
            <input className='inputaddress postalCode' type='number' name='postalCode' placeholder={t('order.postalCode')} onChange={addressOnChangeHandler} />
            <input className='inputaddress deliveryAddress' type='text' name='address' placeholder={t('order.deliveryAddress')} onChange={addressOnChangeHandler} />
            <input className='inputaddress contact' type='number' name='contact' placeholder={t('order.contact')} onChange={addressOnChangeHandler} />
          </form>

          <button className={selectAddress? 'myself' : 'none'} onClick={() => setSelectAddress(false)}>{t('order.myself')}</button>
          
          {/* alert when input is empty */}
          <div className={wrongAddress ? 'wrongAddressAlert' : 'none'}>
            <div>{t('order.alert')}</div>
          </div>

        </div>

        <div className='blank'></div>

        {/* payment */}
        <button className='paymentBtn' onClick={payBtnHandler}>{t('order.pay')}</button>
        <div className={successAlert? 'successPaymentAlert' : 'none'}>
          <div className='iconText'>
            <div className='checkIcon'><CheckCircleRoundedIcon /></div>
            <div className='checkText1'>{t('order.completed')}</div>
          </div>
          <div className='checkText2'>{t('order.redirect')}</div>
        </div>

        <div className={minimumPrice ? 'minimumAlert' : 'none'}>
          <span>{t('cart.minimumAlert')} <strong>{new Intl.NumberFormat().format(Number(restaurant.minimum_price))}₩</strong></span>
        </div>

      </div>
      
      {/* alert when cart is empty */}
      <div className={emptyCart? 'emptyAlert' : 'none'}>
        <span className='noMenu'>{t('cart.empty')}</span>
        <span className='goToCart'><a href='#' onClick={goBackHandler}>{t('modalCart.goToMenu')}</a></span>
      </div>

    </div>
  )

}

export default withRouter(Cart); 