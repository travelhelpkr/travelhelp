import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../scss/Modal.scss';

function ModalChicken(props) {

  // get from each menu
  const { isOpen, setModal, infoMenuId, infoImage, infoName, infoPrice, infoDescription, infoOptionName1, infoOptionName2, infoOptionPrice2 } = props;

  // change language handler
  const { t } = useTranslation();

  // choose bone or boneless state
  const [type, setType] = useState('');

  // alert after add to cart btn
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const addToCartHandler = (e) => {
    e.preventDefault();
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
      } else if(res.data.status === 200){
        setSuccess(true);
      }
    })
  }

  return(
    <div className={isOpen ? 'openModalChicken' : 'none'}>
      <div className='modalContent'>

        {/* close modal */}
        <button className='modalCloseBtn' onClick={e => {
          e.preventDefault();
          setModal(!isOpen);
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
        <div className='selectTitle'>{infoOptionName1}/{infoOptionName2} *</div>
        <select className='selectBox' onChange={e => setType(e.target.value)}>
          <option value='' disabled defaultValue>{infoOptionName1}/{infoOptionName2} ({t('modalChicken.required')})</option>
          <option value='2'>{infoOptionName1}</option>
          <option value='3'>{infoOptionName2} (+{infoOptionPrice2}₩)</option>
        </select>

        {/* add to cart btn */}
        <button className='addCartBtn' onClick={addToCartHandler}>{t('modalChicken.addToCart')}</button>

        {/* alert after clicking btn */}
        <div className={success ? 'successAlert' : 'none'}>
          <span>Successfully added to the cart</span>
          {/* <span className='signupLink'><a href='/user/signup'>{t('signup.signup')}</a></span> */}
        </div>
        <div className={failure ? 'failureAlert' : 'none'}>
          <span>The menu you chose are already in the cart.</span>
          {/* <span className='signupLink'><a href='/user/signup'>{t('signup.signup')}</a></span> */}
        </div>
      </div>
    </div>
  )
}

export default ModalChicken; 