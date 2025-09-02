import useWindowWidth from '../../../../hooks/useWindowWiidth.js'; // ✅ Імпортуємо хук
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './MenuToggleButton.module.css';

const MenuToggleButton = ({
  isOpen,
  onClick,
  ariaLabel = 'Перемкнути навігаційне меню',
  className,
}) => {
  const windowWidth = useWindowWidth(); // ✅ Отримуємо поточну ширину вікна
  const mobileBreakpoint = 767; // ✅ Ваш мобільний брейкпоінт

  // ✅ Умовний рендеринг: кнопка гамбургера рендериться лише тоді, коли ширина вікна
  // менша або дорівнює мобільному брейкпоінту.
  if (windowWidth > mobileBreakpoint) {
    return null; // Не рендеримо нічого на десктопних розмірах
  }

  return (
    <button
      type="button"
      className={clsx(css.burgerButton, className)}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={ariaLabel}
    >
      ☰
    </button>
  );
};

MenuToggleButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};

export default MenuToggleButton;
