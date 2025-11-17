import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import css from './FullScreenImageModal.module.css';
import PropTypes from 'prop-types';

function FullScreenImageModal({ imageUrl, onClose }) {
  const { t } = useTranslation();

  useEffect(() => {
    const modalOverlay = document.getElementById('fullScreenModalOverlay');
    if (modalOverlay) {
      modalOverlay.classList.add(css.active);
    }
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      if (modalOverlay) {
        modalOverlay.classList.remove(css.active);
      }
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (
      e.target.id === 'fullScreenModalOverlay' ||
      e.target.classList.contains(css['modal-content'])
    ) {
      onClose();
    }
  };

  const handleOverlayKeyPress = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      id="fullScreenModalOverlay"
      className={css['modal-overlay']}
      onClick={handleOverlayClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleOverlayKeyPress}
    >
      <div className={css['modal-content']}>
        <div className={css['image-scroll-wrapper']}>
          <img
            src={imageUrl}
            alt="Truck or camper"
            className={css['full-screen-image']}
          />
        </div>
        <button className={css['close-button']} onClick={onClose}>
          {t('button_close', { ns: 'full_screen_image_modal' })}
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
