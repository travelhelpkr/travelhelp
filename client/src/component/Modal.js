import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
// import chicken from '../img/chicken.jpg';
import "../scss/Modal.scss";

function Modal(props) {

  // get from each menu
  const { isOpen, setModal, infoName, infoPrice, infoDescription } = props;

  return(
    <div className={isOpen ? "openModal" : "none"}>
      <div className="modalContent">

        {/* close modal */}
        <button className="modalCloseBtn" onClick={e => {
          e.preventDefault();
          setModal(!isOpen);
        }}><CloseIcon /></button>

        {/* menu information */}
        {/* <img src={chicken} className="modalMenuImage"/> */}
        <div className="modalMenuInfo">
          <div className="modalMenuName">
            {infoName}
          </div>
          <div className="modalMenuDes">
            {infoDescription}
          </div>
          <div className="modalMenuPrice">
            {infoPrice}₩
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal; 