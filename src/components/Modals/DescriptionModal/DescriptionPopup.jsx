// import PropTypes from 'prop-types';
// import CloseButton from '../../Ui/Buttons/CloseButton/CloseButton.jsx';
// import css from './DescriptionPopup.module.css';

// const DescriptionPopup = ({ description, onClose }) => {
//   const handleContentClick = e => {
//     e.stopPropagation();
//   };

//   const handleKeyPress = e => {
//     // Обробка клавіатури для закриття оверлея
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       onClose();
//     }
//   };

//   return (
//     <div
//       className={css['backdrop-in-card']}
//       onClick={onClose}
//       onKeyDown={e => {
//         // Закриття на Escape є стандартом
//         if (e.key === 'Escape') onClose();
//         // Закриття на Enter/Space
//         handleKeyPress(e);
//       }}
//       role="button" // Потрібно для інтерактивності
//       tabIndex={0} // Дозволяє фокусуватися
//     >
//       <div
//         className={css['popup-content']}
//         onClick={handleContentClick}
//         // Зупинка поширення події клавіатури, щоб не закрити оверлей
//         onKeyDown={handleContentClick}
//         role="dialog" // Вказує, що це модальне вікно
//         aria-modal="true" // Вказує скрінрідерам, що інший вміст заблоковано
//       >
//         <CloseButton
//           onClick={onClose}
//           className={css['popup-close-button']}
//           ariaLabel="Close description"
//         />
//         <p className={css['description-text']}>{description}</p>
//       </div>
//     </div>
//   );
// };

// DescriptionPopup.propTypes = {
//   description: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default DescriptionPopup;
import PropTypes from 'prop-types';
import CloseButton from '../../Ui/Buttons/CloseButton/CloseButton.jsx';
import css from './DescriptionPopup.module.css';

const DescriptionPopup = ({ description, onClose }) => {
  const handleContentClick = e => {
    e.stopPropagation();
  };

  const handleKeyPress = e => {
    // Обробка клавіатури для закриття оверлея
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className={css['backdrop-in-card']}
      onClick={onClose}
      onKeyDown={e => {
        // Закриття на Escape є стандартом
        if (e.key === 'Escape') onClose();
        // Закриття на Enter/Space
        handleKeyPress(e);
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className={css['popup-content']}
        // 👇 ВИДАЛЕНО: onClick={handleContentClick}
        // 👇 ВИДАЛЕНО: onKeyDown={handleContentClick}
        // *Обробник onClick вже не потрібен, оскільки він лише зупиняв поширення події
        // *на батьківський елемент, що є оверлеєм.
        role="dialog" // Це коректна роль
        aria-modal="true" // Це коректний атрибут
      >
        <CloseButton
          onClick={onClose}
          className={css['popup-close-button']}
          ariaLabel="Close description"
        />
        <p className={css['description-text']}>{description}</p>
      </div>
    </div>
  );
};

DescriptionPopup.propTypes = {
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DescriptionPopup;
