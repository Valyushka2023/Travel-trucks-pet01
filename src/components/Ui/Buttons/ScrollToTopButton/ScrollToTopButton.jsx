import PropTypes from 'prop-types';
import css from './ScrollToTopButton.module.css';

const ScrollToTopButton = ({ visible, onClick, className, label }) => {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${css['base-scroll-to-top-button']} ${className || ''}`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

ScrollToTopButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
};
export default ScrollToTopButton;
