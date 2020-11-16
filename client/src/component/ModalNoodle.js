import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import '../scss/Modal.scss';

function ModalNoodle(props) {

  // get from each menu
  const { isOpen, setModal, infoMenuId, infoImage, infoName, infoPrice, infoDescription, infoOptionName1, infoOptionName2, infoOptionPrice2, infoOptionName3, infoOptionPrice3 } = props;

  console.log("infoOptionName1:", infoOptionName1);

  // change language handler
  const { t } = useTranslation();

  // choose size of menu
  const [type, setType] = useState('');

  console.log('type:', type);

  // alert after add to cart btn
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [optionError, setOptionError] = useState(false);

  // add to cart btn handler
  const addToCartHandler = (e) => {
    e.preventDefault();
    if(infoMenuId <= 24) {
      axios.post('http://localhost:3355/foods/cart', {
        user_id: window.sessionStorage.getItem('id'),
        menu_id: infoMenuId,
        option_id: null
      }, {
        withCredentials: true,
      }, {
        headers: { 
          'Access-Control-Allow-Origin': 'http://localhost:3355',
         }
      })
      .then(res => {
        if(res.data.status === 409) {
          setFailure(true);
          setSuccess(false);
          setOptionError(false);
          setType('');
        } else if(res.data.status === 200){
          setSuccess(true);
          setFailure(false);
          setOptionError(false);
          setType('');
        }
      })
    } else if(infoMenuId < 25 || type) {
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
        if(res.data.status === 409) {
          setFailure(true);
          setSuccess(false);
          setOptionError(false);
          setType('');
        } else if(res.data.status === 200){
          setSuccess(true);
          setFailure(false);
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
  }

  return(
    <div className={isOpen ? 'openModalNoodle' : 'none'}>
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

        {/* choose size of menu */}
        <div className={infoMenuId < 25 ? 'option0': 'none'}>
          <div className='selectTitle'>{infoOptionName1}/{infoOptionName2}/{infoOptionName3} *</div>
          <select className='selectBox' onChange={e => setType(e.target.value)}>
            <option value=''>{infoOptionName1}/{infoOptionName2}/{infoOptionName3} ({t('modalChicken.required')})</option>
            <option value='7'>{infoOptionName1}</option>
            <option value='8'>{infoOptionName2} (+{infoOptionPrice2}₩)</option>
            <option value='9'>{infoOptionName3} (+{infoOptionPrice3}₩)</option>
          </select>
        </div>

        <div className={infoMenuId === 25 ? 'option1': 'none'}>
          <div className='selectTitle'>{infoOptionName1}/{infoOptionName2}/{infoOptionName3} *</div>
          <select className='selectBox' onChange={e => setType(e.target.value)}>
            <option value=''>{infoOptionName1}/{infoOptionName2}/{infoOptionName3} ({t('modalChicken.required')})</option>
            <option value='7'>{infoOptionName1}</option>
            <option value='8'>{infoOptionName2} (+{infoOptionPrice2}₩)</option>
            <option value='9'>{infoOptionName3} (+{infoOptionPrice3}₩)</option>
          </select>
        </div>

        <div className={infoMenuId >= 26 ? 'option2': 'none'}>
          <div className='selectTitle'>{infoOptionName1}/{infoOptionName2}/{infoOptionName3} *</div>
          <select className='selectBox' onChange={e => setType(e.target.value)}>
            <option value=''>{infoOptionName1}/{infoOptionName2}/{infoOptionName3} ({t('modalChicken.required')})</option>
            <option value='7'>{infoOptionName1}</option>
            <option value='10'>{infoOptionName2} (+{infoOptionPrice2}₩)</option>
            <option value='11'>{infoOptionName3} (+{infoOptionPrice3}₩)</option>
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
      </div>
    </div>
  )
}

export default ModalNoodle; 