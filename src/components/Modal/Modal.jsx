import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Logo from '../Ui/Logo/Logo.jsx';
import css from './Modal.module.css';

function Modal({ title, titleClassName, children, onClose }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleModalContentClick = e => {
    e.stopPropagation();
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal} onClick={handleModalContentClick}>
        <div className={css.modalHeader}>
          <Logo />
          <button className={css.closeBtn} onClick={onClose}>
            ✖
          </button>
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
