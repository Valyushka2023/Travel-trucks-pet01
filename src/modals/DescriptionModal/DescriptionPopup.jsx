import React from 'react';
import PropTypes from 'prop-types';
import css from './DescriptionPopup.module.css'; // Створіть окремий CSS для нього

const DescriptionPopup = ({ description, onClose }) => {
  // Функція для зупинки поширення кліку на вмісті модалки
  // Щоб клік на тексті опису не закривав вікно
  const handleContentClick = e => {
    e.stopPropagation();
  };

  return (
    // Backdrop - фон, що перекриває сторінку. Клік на ньому не закриває.

    <div className={css.popupContent} onClick={handleContentClick}>
      <button
        className={css.closeButton}
        onClick={onClose} // onClose викликається лише при кліку на "хрестик"
      >
        &times;
      </button>
      <p className={css.descriptionText}>{description}</p>
    </div>
  );
};

DescriptionPopup.propTypes = {
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DescriptionPopup;
