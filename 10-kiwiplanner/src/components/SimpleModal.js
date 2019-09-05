//Modal.js
import React from "react";
const SimpleModal = props => {
  const divStyle = {
    display: props.displayModal ? "block" : "none"
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }
  return (
    <div className="simple-modal" onClick={closeModal} style={divStyle}>
      <div className="simple-modal-content" onClick={e => e.stopPropagation()}>
        <span className="simple-modal-close" onClick={closeModal}>
          &times;
        </span>
        <div className="simple-modal-text">{props.message}</div>
      </div>
    </div>
  );
};
export default SimpleModal;
