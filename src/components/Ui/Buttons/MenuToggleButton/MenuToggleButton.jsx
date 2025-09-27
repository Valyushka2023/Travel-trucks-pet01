import useWindowWidth from '../../../../hooks/useWindowWiidth.js';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './MenuToggleButton.module.css';

const MenuToggleButton = ({
  isOpen,
  onClick,
  ariaLabel = 'Toggle navigation menu',
  className,
}) => {
  const windowWidth = useWindowWidth();
  const mobileBreakpoint = 767;

  if (windowWidth > mobileBreakpoint) {
    return null;
  }

  return (
    <button
      type="button"
      className={clsx(css['burger-button'], className)}
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
