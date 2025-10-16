// import { useEffect } from 'react';
// import PropTypes from 'prop-types';

// import Logo from '../Ui/Logo/Logo.jsx';
// import CloseButton from '../Ui/Buttons/CloseButton/CloseButton.jsx';
// import css from './Modal.module.css';

// function Modal({ title, titleClassName, children, onClose }) {
//   useEffect(() => {
//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';

//     const handleEscape = e => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleEscape);

//     return () => {
//       document.body.style.overflow = originalOverflow;
//       window.removeEventListener('keydown', handleEscape);
//     };
//   }, [onClose]);

//   const handleModalContentClick = e => {
//     e.stopPropagation();
//   };

//   return (
//     <div className={css.backdrop} onClick={onClose}>
//       <div className={css.modal} onClick={handleModalContentClick}>
//         <div className={css['modal-header-container']}>
//           <Logo className={css['logo-in-modal']} />
//           <CloseButton
//             onClick={onClose}
//             className={css['close-btn']}
//             ariaLabel="Close modal window"
//           />
//         </div>
//         <h2 className={`${css['modal-title']} ${titleClassName || ''}`}>
//           {title}
//         </h2>
//         <div className={css['modal-body']}>{children}</div>
//       </div>
//     </div>
//   );
// }

// Modal.propTypes = {
//   title: PropTypes.string.isRequired,
//   titleClassName: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Logo from '../Ui/Logo/Logo.jsx';
import CloseButton from '../Ui/Buttons/CloseButton/CloseButton.jsx';
import css from './Modal.module.css';

function Modal({ title, titleClassName, children, onClose }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleModalContentClick = e => {
    e.stopPropagation();
  };

  // Функція для обробки клавіш Enter/Space на оверлеї
  const handleBackdropKeyPress = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className={css.backdrop}
      onClick={onClose}
      // ✅ A11y fix: Робимо оверлей інтерактивним
      role="button"
      tabIndex={0}
      onKeyDown={handleBackdropKeyPress}
    >
      <div
        className={css.modal}
        onClick={handleModalContentClick}
        // ✅ A11y fix: Зупиняємо клавіатурні події всередині модалки
        onKeyDown={handleModalContentClick}
        // ✅ A11y fix: Вказуємо семантичну роль
        role="dialog"
        aria-modal="true"
      >
        <div className={css['modal-header-container']}>
          <Logo className={css['logo-in-modal']} />
          <CloseButton
            onClick={onClose}
            className={css['close-btn']}
            ariaLabel="Close modal window"
          />
        </div>
        <h2 className={`${css['modal-title']} ${titleClassName || ''}`}>
          {title}
        </h2>
        <div className={css['modal-body']}>{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  titleClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
