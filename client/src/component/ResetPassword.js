import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import "../scss/Modal.scss";

function ResestPassword(props) {

  // get from each menu
  const { isOpen, setModal } = props;

  // change language handler
  const { t } = useTranslation();

  return(
    <div className={isOpen ? "openModal" : "none"}>
      <div className="modalContentPassword">

        {/* close modal */}
        <button className="modalCloseBtn" onClick={e => {
          e.preventDefault();
          setModal(!isOpen);
        }}><CloseIcon /></button>

        <div className="modalTitle">{t('signin.forgotPassword')}</div>
        <div className="emailInputBox">
          <div className="step1">{t('resetPassword.step1')}</div>
          <div className="emailAddress">{t('resetPassword.email')}</div>
          <form>
            <input className="emailInput" type="text" name="email" placeholder={t("signin.email")} label="Email Address" />
          </form>
          <button className="resetPasswordBtn">{t('resetPassword.btn')}</button>
        </div>
      </div>
    </div>
  )
}

export default ResestPassword; 