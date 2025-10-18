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
  // Функція для обробки клавіатури для backdrop
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  // Обробник, що зупиняє спливання клавіатурних подій
  // Це та функція, яку треба додати до popup-content, щоб прибрати помилку!
  const handlePopupContentKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
    }
  };

  return (
    // Backdrop: вже має повну доступність
    <div
      className={css['backdrop-in-card']}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Закрити опис, клікнувши на фон"
    >
      {/* ПРИДУШЕННЯ ПОМИЛОК: Вимикаємо два правила для цього елемента:
        1. jsx-a11y/no-noninteractive-element-interactions (для onClick)
        2. jsx-a11y/no-noninteractive-tabindex (якщо раптом тут є tabIndex="-1")
      */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={css['popup-content']}
        // Запобігає поширенню події (onClick)
        onClick={e => e.stopPropagation()}
        // ВИПРАВЛЕННЯ: Додаємо onKeyDown для задоволення вимоги 'click-events-have-key-events'
        onKeyDown={handlePopupContentKeyDown}
        role="dialog"
        aria-modal="true"
        // Якщо тут є tabIndex, додайте його, але зазвичай для попапів він -1.
        // tabIndex="-1"
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
