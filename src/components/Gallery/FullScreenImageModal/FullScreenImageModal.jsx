// import { useEffect } from 'react';
// import css from './FullScreenImageModal.module.css';
// import PropTypes from 'prop-types';

// function FullScreenImageModal({ imageUrl, onClose }) {
//   useEffect(() => {
//     const modalOverlay = document.getElementById('fullScreenModalOverlay');
//     if (modalOverlay) {
//       modalOverlay.classList.add(css.active);
//     }
//     const handleEscape = e => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     window.addEventListener('keydown', handleEscape);

//     return () => {
//       if (modalOverlay) {
//         modalOverlay.classList.remove(css.active);
//       }
//       window.removeEventListener('keydown', handleEscape);
//     };
//   }, [onClose]);

//   const handleOverlayClick = e => {
//     if (e.target.id === 'fullScreenModalOverlay') {
//       onClose();
//     }
//   };

//   const handleOverlayKeyPress = e => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       onClose();
//     }
//   };

//   return (
//     <div
//       id="fullScreenModalOverlay"
//       className={css['modal-overlay']}
//       onClick={handleOverlayClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={handleOverlayKeyPress}
//     >
//       <div className={css['modal-content']}>
//         <img
//           src={imageUrl}
//           alt="Truck or camper"
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

// import { useEffect } from 'react';
// import css from './FullScreenImageModal.module.css';
// import PropTypes from 'prop-types';

// function FullScreenImageModal({ imageUrl, onClose }) {
//   useEffect(() => {
//     const modalOverlay = document.getElementById('fullScreenModalOverlay');
//     if (modalOverlay) {
//       modalOverlay.classList.add(css.active);
//     }
//     const handleEscape = e => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     window.addEventListener('keydown', handleEscape);

//     return () => {
//       if (modalOverlay) {
//         modalOverlay.classList.remove(css.active);
//       }
//       window.removeEventListener('keydown', handleEscape);
//     };
//   }, [onClose]);

//   const handleOverlayClick = e => {
//     // Додаємо перевірку, щоб не закривати модальне вікно при кліку на кнопку "Close"
//     if (
//       e.target.id === 'fullScreenModalOverlay' ||
//       e.target.classList.contains(css['modal-content'])
//     ) {
//       onClose();
//     }
//   };

//   const handleOverlayKeyPress = e => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       onClose();
//     }
//   };

//   return (
//     <div
//       id="fullScreenModalOverlay"
//       className={css['modal-overlay']}
//       onClick={handleOverlayClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={handleOverlayKeyPress}
//     >
//       <div className={css['modal-content']}>
//         {/* Зображення тепер у окремому контейнері для прокрутки */}
//         <div className={css['image-scroll-wrapper']}>
//           <img
//             src={imageUrl}
//             alt="Truck or camper"
//             className={css['full-screen-image']}
//           />
//         </div>

//         {/* Кнопка Close залишається всередині modal-content,
//             але позиціонується абсолютно відносно modal-content.
//             Оскільки modal-content тепер не прокручується (а прокручується image-scroll-wrapper),
//             кнопка буде зафіксована у рамці. */}
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
    // Закриваємо модальне вікно при кліку на оверлей, але не при кліку на вміст або кнопку.
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
        {/* Обгортка для прокручування зображення */}
        <div className={css['image-scroll-wrapper']}>
          <img
            src={imageUrl}
            alt="Truck or camper"
            className={css['full-screen-image']}
          />
        </div>

        {/* Кнопка Close позиціонується абсолютно відносно .modal-content */}
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
