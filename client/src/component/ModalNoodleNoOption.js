import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import '../scss/Modal.scss';

function ModalNoodleNoOption(props) {

  // get from each menu
  const { isOpenNoOption, setModalNoOption, infoImage, infoName, infoPrice, infoDescription } = props;

  // change language handler
  const { t } = useTranslation();

  // choose size of menu
  const [type, setType] = useState('');

  return(
    <div className={isOpenNoOption ? 'openModalNoOption' : 'none'}>
      <div className='modalContent'>

        {/* close modal */}
        <button className='modalCloseBtn' onClick={e => {
          e.preventDefault();
          setModalNoOption(!isOpenNoOption);
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

        {/* add to cart btn */}
        <button className='addCartBtn'>{t('modalChicken.addToCart')}</button>
      </div>
    </div>
  )
}

export default ModalNoodleNoOption; 