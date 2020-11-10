import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import "../scss/Modal.scss";
import { useTranslation } from 'react-i18next';

function ModalChicken(props) {

  // get from each menu
  const { isOpen, setModal, infoImage, infoName, infoPrice, infoDescription } = props;

  // choose bone or boneless state
  const [type, setType] = useState("");

  return(
    <div className={isOpen ? "openModal" : "none"}>
      <div className="modalContent">

        {/* close modal */}
        <button className="modalCloseBtn" onClick={e => {
          e.preventDefault();
          setModal(!isOpen);
        }}><CloseIcon /></button>

        {/* menu information */}
        <img src={infoImage} className="modalMenuImage"/>
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

        {/* choose bone or boneless */}
        <div className="selectTitle">Bone/Boneless *</div>
        <select className="selectBox" onChange={e => setType(e.target.value)}>
          <option value="" disabled selected>Bone/Boneless (Required)</option>
          <option value="bone">Bone</option>
          <option value="boneless">Boneless (+2,000₩)</option>
        </select>

        {/* add to cart btn */}
        <button className="addCartBtn">Add to Cart</button>
      </div>
    </div>
  )
}

export default ModalChicken; 