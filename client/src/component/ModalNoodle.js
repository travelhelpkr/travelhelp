import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import '../scss/Modal.scss';

function ModalNoodle(props) {

  // get from each menu
  const { isOpen, setModal, infoImage, infoName, infoPrice, infoDescription } = props;

  // change language handler
  const { t } = useTranslation();

  // choose size of menu
  const [type, setType] = useState('');

  return(
    <div className={isOpen ? 'openModal' : 'none'}>
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
        <div className='selectTitle'>{t('modalNoodle.size')} *</div>
        <select className='selectBox' onChange={e => setType(e.target.value)}>
          <option value='' disabled selected>{t('modalNoodle.sml')} ({t('modalChicken.required')})</option>
          <option value='bone'>{t('modalNoodle.small')}</option>
          <option value='boneless'>{t('modalNoodle.medium')} (+5,000₩)</option>
          <option value='boneless'>{t('modalNoodle.large')} (+10,000₩)</option>
        </select>

        {/* add to cart btn */}
        <button className='addCartBtn'>{t('modalChicken.addToCart')}</button>
      </div>
    </div>
  )
}

export default ModalNoodle; 