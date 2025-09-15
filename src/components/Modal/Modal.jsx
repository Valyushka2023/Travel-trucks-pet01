import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Logo from '../Ui/Logo/Logo.jsx';
import CloseButton from '../Ui/Buttons/CloseButton/CloseButton.jsx';
import css from './Modal.module.css';

function Modal({ title, titleClassName, children, onClose }) {
  useEffect(() => {
    // Блокуємо прокрутку body
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      // Повертаємо прокрутку після закриття
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleModalContentClick = e => {
    e.stopPropagation();
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={handleModalContentClick}>
        <div className={css.modalHeaderContainer}>
          <Logo className={css.logoInModal} />
          <CloseButton
            onClick={onClose}
            className={css.closeBtn}
            ariaLabel="Закрити модальне вікно"
          />
        </div>
        <h2 className={`${css.modalTitle} ${titleClassName || ''}`}>{title}</h2>
        <div className={css.modalBody}>{children}</div>
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
