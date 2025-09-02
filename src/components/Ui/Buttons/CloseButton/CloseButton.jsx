import PropTypes from 'prop-types';
import css from './CloseButton.module.css';

const CloseButton = ({ onClick, ariaLabel = 'Закрити', className }) => {
  return (
    <button
      type="button"
      className={`${css.baseCloseButton} ${className || ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      ✕ {/* Always display the cross symbol */}
    </button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};

export default CloseButton;
