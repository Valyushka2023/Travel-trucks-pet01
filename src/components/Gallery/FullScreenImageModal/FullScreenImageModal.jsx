// import { useEffect } from 'react';
// import css from './FullScreenImageModal.module.css';
// import PropTypes from 'prop-types';

// function FullScreenImageModal({ imageUrl, onClose }) {
//   useEffect(() => {
//     const modalOverlay = document.getElementById('fullScreenModalOverlay');
//     if (modalOverlay) {
//       modalOverlay.classList.add(css.active);
//     }

//     return () => {
//       if (modalOverlay) {
//         modalOverlay.classList.remove(css.active);
//       }
//     };
//   }, []);

//   const handleOverlayClick = e => {
//     if (e.target.id === 'fullScreenModalOverlay') {
//       onClose();
//     }
//   };

//   return (
//     <div
//       id="fullScreenModalOverlay"
//       className={css['modal-overlay']}
//       onClick={handleOverlayClick}
//     >
//       <div className={css['modal-content']}>
//         <img
//           src={imageUrl}
//           alt="Full size image"
//           className={css['full-screen-image']}
//         />
//         <button className={css['close-button']} onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// FullScreenImageModal.propTypes = {
//   imageUrl: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default FullScreenImageModal;
import { useEffect } from 'react';
import css from './FullScreenImageModal.module.css';
import PropTypes from 'prop-types';

function FullScreenImageModal({ imageUrl, onClose }) {
  useEffect(() => {
    // Встановлення/видалення класу active
    const modalOverlay = document.getElementById('fullScreenModalOverlay');
    if (modalOverlay) {
      modalOverlay.classList.add(css.active);
    }

    // Обробник клавіші Escape для закриття (найкраща практика для модальних вікон)
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
    if (e.target.id === 'fullScreenModalOverlay') {
      onClose();
    }
  };

  // Хелпер для обробки клавіш Enter/Space на оверлеї
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
      // ✅ A11y Fix (Рядок 26): Додаємо підтримку клавіатури
      role="button"
      tabIndex={0}
      onKeyDown={handleOverlayKeyPress}
    >
      <div className={css['modal-content']}>
        <img
          src={imageUrl}
          // ✅ Fix img-redundant-alt (Рядок 32): Видалено "image"
          alt="Full size photo of truck or camper"
          className={css['full-screen-image']}
        />
        <button className={css['close-button']} onClick={onClose}>
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
