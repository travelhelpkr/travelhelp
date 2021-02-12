import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import '../scss/Modal.scss';

interface IPropsModalSignin {
  isSignin: boolean,
  setIsSignin: any
}

const ModalSignin: React.FC<IPropsModalSignin> = (props) => {

  // get signin status
  const { isSignin, setIsSignin } = props;

  // change language handler
  const { t } = useTranslation();

  // go to signin page
  const goToSigninHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = '/user/signin'
  }

  return(
    <div className={isSignin? 'openSigninModal' : 'none'}>
      <div className='signinModalContent'>

        {/* close modal */}
        <button className='closeBtn' onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setIsSignin(!isSignin);
        }}><CloseIcon /></button>

        {/* signin alert content */}
        <div className='signinAlert'>
          <span>{t('modalSignin.signin1')}</span> :) <br/><br/>
          {t('modalSignin.signin2')}
        </div>

        {/* press ok btn */}
        <button className='okayBtn' onClick={goToSigninHandler}>Okay</button>

      </div>

    </div>
  )
}

export default ModalSignin; 