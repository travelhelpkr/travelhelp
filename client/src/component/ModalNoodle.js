import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import '../scss/Modal.scss';

function ModalNoodle(props) {

  // get from each menu
  const { isOpen, setModal, infoMenuId, infoImage, infoName, infoPrice, infoDescription, infoOptionName1, infoOptionName2, infoOptionPrice2, infoOptionName3, infoOptionPrice3 } = props;

  console.log("infoOptionName1:", infoOptionName1);

  // change language handler
  const { t } = useTranslation();

  // choose size of menu
  const [type, setType] = useState('');

  return(
    <div className={isOpen ? 'openModalNoodle' : 'none'}>
      <div className='modalContent'>

        {/* close modal */}
        <button className='modalCloseBtn' onClick={e => {
          e.preventDefault();
          setModal(!isOpen);
        }}><CloseIcon /></button>

        {/* menu information */}
        <img src={infoImage} className='modalMenuImage'/>
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
        <div className='selectTitle'>{infoOptionName1}/{infoOptionName2}/{infoOptionName3} *</div>
        <select className='selectBox' onChange={e => setType(e.target.value)}>
          <option value='' disabled defaultValue>{infoOptionName1}/{infoOptionName2}/{infoOptionName3} ({t('modalChicken.required')})</option>
          <option value='bone'>{infoOptionName1}</option>
          <option value='boneless'>{infoOptionName2} (+{infoOptionPrice2}₩)</option>
          <option value='boneless'>{infoOptionName3} (+{infoOptionPrice3}₩)</option>
        </select>

        {/* add to cart btn */}
        <button className='addCartBtn'>{t('modalChicken.addToCart')}</button>
      </div>
    </div>
  )
}

export default ModalNoodle; 