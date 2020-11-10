import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import "../scss/Modal.scss";

function ModalNoodle(props) {

  // get from each menu
  const { isOpen, setModal, infoImage, infoName, infoPrice, infoDescription } = props;

  // choose size of menu
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

        {/* choose size of menu */}
        <div className="selectTitle">Size of Menu *</div>
        <select className="selectBox" onChange={e => setType(e.target.value)}>
          <option value="" disabled selected>Small/Medium/Large (Required)</option>
          <option value="bone">Small</option>
          <option value="boneless">Medium (+5,000₩)</option>
          <option value="boneless">Large (+10,000₩)</option>
        </select>

        {/* add to cart btn */}
        <button className="addCartBtn">Add to Cart</button>
      </div>
    </div>
  )
}

export default ModalNoodle; 