import PropTypes from 'prop-types';
import CloseButton from '../../Ui/Buttons/CloseButton/CloseButton.jsx';
import css from './DescriptionPopup.module.css';

const DescriptionPopup = ({ description, onClose }) => {
  const handleContentClick = e => {
    e.stopPropagation();
  };

  return (
    <div className={css['backdrop-in-card']} onClick={onClose}>
      <div className={css['popup-content']} onClick={handleContentClick}>
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
