import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import '../scss/Modal.scss';

function ModalChicken(props) {

  // get from each menu
  const { isOpen, setModal, infoMenuId, infoImage, infoName, infoPrice, infoDescription, infoOptionName1, infoOptionName2, infoOptionPrice2 } = props;

  // change language handler
  const { t } = useTranslation();

  // choose bone or boneless state
  const [type, setType] = useState('');

  console.log('type:', type);

  // alert after add to cart btn
  const [isSignin, setIsSignin] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [optionError, setOptionError] = useState(false);
  const [otherRestaurant, setOtherRestaurant] = useState(false);

  // add to cart btn handler
  const addToCartHandler = (e) => {
    e.preventDefault();
    if(window.sessionStorage.getItem('id')) {
      if(type) {
        axios.post('http://localhost:3355/foods/cart', {
          user_id: window.sessionStorage.getItem('id'),
          menu_id: infoMenuId,
          option_id: type
        }, {
          withCredentials: true,
        }, {
          headers: { 
            'Access-Control-Allow-Origin': 'http://localhost:3355',
            }
        })
        .then(res => {
          console.log('conflict:', res.data);
          if(res.data.status === 409 && res.data.conflict === true) {
            setOtherRestaurant(true);
            setType('');
          } else if(res.data.status === 200){
            setSuccess(true);
            setFailure(false);
            setOptionError(false);
            setType('');
          } else if(res.data.status === 409) {
            setFailure(true);
            setSuccess(false);
            setOptionError(false);
            setType('');
          }
        })
      } else {
        setOptionError(true);
        setSuccess(false);
        setFailure(false);
        setType('');
      }
    } else {
      e.preventDefault();
      setIsSignin(true);
    }
  }

  return(
    <div className={isOpen ? 'openModalChicken' : 'none'}>
      <div className='modalContent'>

        {/* close modal */}
        <button className='modalCloseBtn' onClick={e => {
          e.preventDefault();
          setModal(!isOpen);
          setSuccess(false);
          setFailure(false);
          setOptionError(false);
          setType('');
        }}><CloseIcon /></button>

        {/* menu information */}
        <img src={infoImage} className='modalMenuImage' alt='modalMenuImage'/>
        <div className='modalMenuInfo'>
          <div className='modalMenuName'>
            {infoName}
          </div>
          <div className='modalMenuDes'>
            {infoDescription}
          </div>
          <div className='modalMenuPrice'>
            {infoPrice}₩
          </div>
        </div>

        {/* choose bone or boneless */}
        <div className={infoMenuId < 12 ? 'option1': 'none'}>
          <div className='selectTitle'>{infoOptionName1}/{infoOptionName2} *</div>
          <select className='selectBox' onChange={e => setType(e.target.value)}>
            <option value=''>{infoOptionName1}/{infoOptionName2} ({t('modalChicken.required')})</option>
            <option value='2'>{infoOptionName1}</option>
            <option value='3'>{infoOptionName2} (+{infoOptionPrice2}₩)</option>
          </select>
        </div>

        <div className={infoMenuId >= 12 ? 'option2': 'none'}>
          <div className='selectTitle'>{infoOptionName1}/{infoOptionName2} *</div>
          <select className='selectBox' onChange={e => setType(e.target.value)}>
            <option value=''>{infoOptionName1}/{infoOptionName2} ({t('modalChicken.required')})</option>
            <option value='2'>{infoOptionName1}</option>
            <option value='6'>{infoOptionName2} (+{infoOptionPrice2}₩)</option>
          </select>
        </div>

        {/* alert after clicking btn */}
        <div className={optionError ? 'optionErrorAlert' : 'none'}>
          <span>{t('modalCart.option')}</span>
        </div>

        {/* add to cart btn */}
        <button className='addCartBtn' onClick={addToCartHandler}>{t('modalChicken.addToCart')}</button>

        {/* alert after clicking btn */}
        <div className={success ? 'successAlert' : 'none'}>
          <span><CheckCircleRoundedIcon />{t('modalCart.addToCart')}</span>
          <span className='goToCart'><a href='/user/cart'>{t('modalCart.goToCart')}</a></span>
        </div>
        <div className={failure ? 'failureAlert' : 'none'}>
          <span>{t('modalCart.already')}</span>
          <span className='goToCart'><a href='/user/cart'>{t('modalCart.goToCart')}</a></span>
        </div>
        <div className={isSignin ? 'signinAlert' : 'none'}>
          <span>Please Sign In first!</span>
          <span className='goToSignIn'><a href='/user/signin'>Go To Sign In</a></span>
        </div>
        <div className={otherRestaurant ? 'otherRestaurantAlert' : 'none'}>
          <span>Only menus from the same restaurant can be added.</span>
        </div>

      </div>
    </div>
  )
}

export default ModalChicken; 