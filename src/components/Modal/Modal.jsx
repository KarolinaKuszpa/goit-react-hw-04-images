import React from 'react';

import 'basiclightbox/dist/basicLightbox.min.css';
import styles from './Modal.module.css';

const Modal = ({ imageUrl, alt, onClose }) => {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <img src={imageUrl} alt={alt} className={styles.modal__image} />
      </div>
    </div>
  );
};

export default Modal;
