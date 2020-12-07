import * as React from 'react';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import '../scss/Modal.scss';

interface IPropsModalChicken {
  isOpen: boolean,
  setModal: any,
  infoMenuId: number,
  infoImage: string,
  infoName: string,
  infoPrice: number
  infoDescription: string,
  infoOptionName1: string,
  infoOptionName2: string,
  infoOptionPrice2: number,
  setSuccess: any,
  success: boolean,
  setFailure: any,
  failure: boolean,
  setOptionError: any,
  optionError: boolean,
  setOtherRestaurant: any,
  otherRestaurant: boolean
}

const ModalChicken: React.FC<IPropsModalChicken> = (props) => {

  // get from each menu
  const { isOpen, setModal, infoMenuId, infoImage, infoName, infoPrice, infoDescription, infoOptionName1, infoOptionName2, infoOptionPrice2, setSuccess, success, setFailure, failure, setOptionError , optionError, setOtherRestaurant, otherRestaurant  } = props;

  // change language handler
  const { t } = useTranslation();

  // choose bone or boneless state
  const [type, setType] = useState<string>('');

  // alert after add to cart btn
  const [isSignin, setIsSignin] = useState<boolean>(false);

  // add to cart btn handler
  const addToCartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(window.sessionStorage.getItem('id')) {
      if(type) {
        axios.post('/api/foods/cart', {
          user_id: window.sessionStorage.getItem('id'),
          menu_id: infoMenuId,
          option_id: type
        }, {
          withCredentials: true,
        }, 
        // {
        //   headers: { 
        //     'Access-Control-Allow-Origin': 'https://travelhelp.kr',
        //     }
        // }
        )
        .then(res => {
          if(res.data.status === 409 && res.data.conflict === true) {
            setOtherRestaurant(true);
          } else if(res.data.status === 200){
            setSuccess(true);
            setFailure(false);
            setOptionError(false);
          } else if(res.data.status === 409) {
            setFailure(true);
            setSuccess(false);
            setOptionError(false);
          }
        })
      } else {
        setOptionError(true);
        setSuccess(false);
        setFailure(false);
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
        <button className='modalCloseBtn' onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setModal(!isOpen);
          setSuccess(false);
          setFailure(false);
          setOptionError(false);
          setOtherRestaurant(false);
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
          <select className='selectBox' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}>
            <option value='1'>{infoOptionName1}/{infoOptionName2} ({t('modalChicken.required')})</option>
            <option value='2'>{infoOptionName1}</option>
            <option value='3'>{infoOptionName2} (+{infoOptionPrice2}₩)</option>
          </select>
        </div>

        <div className={infoMenuId >= 12 ? 'option2': 'none'}>
          <div className='selectTitle'>{infoOptionName1}/{infoOptionName2} *</div>
          <select className='selectBox' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}>
            <option value='1'>{infoOptionName1}/{infoOptionName2} ({t('modalChicken.required')})</option>
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
          <span>{t('modalCart.signinFirst')}</span>
          <span className='goToSignIn'><a href='/user/signin'>{t('modalCart.signin')}</a></span>
        </div>
        <div className={otherRestaurant ? 'otherRestaurantAlert' : 'none'}>
          <div>{t('modalCart.onlySame')}</div>
          <div className='goToCart'><a href='/user/cart'>{t('modalCart.goToCart')}</a></div>
        </div>

      </div>
    </div>
  )
}

export default ModalChicken; 