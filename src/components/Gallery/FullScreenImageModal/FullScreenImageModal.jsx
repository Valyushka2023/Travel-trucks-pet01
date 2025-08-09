import { useEffect } from 'react';
import css from './FullScreenImageModal.module.css';
import PropTypes from 'prop-types';

function FullScreenImageModal({ imageUrl, onClose }) {
  useEffect(() => {
    const modalOverlay = document.getElementById('fullScreenModalOverlay');
    if (modalOverlay) {
      modalOverlay.classList.add(css.active);
    }

    return () => {
      if (modalOverlay) {
        modalOverlay.classList.remove(css.active);
      }
    };
  }, []);

  const handleOverlayClick = e => {
    if (e.target.id === 'fullScreenModalOverlay') {
      onClose();
    }
  };

  return (
    <div
      id="fullScreenModalOverlay"
      className={css.modalOverlay}
      onClick={handleOverlayClick}
    >
      <div className={css.modalContent}>
        <img
          src={imageUrl}
          alt="Повнорозмірне зображення"
          className={css.fullScreenImage}
        />
        <button className={css.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

FullScreenImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FullScreenImageModal;
