import PropTypes from 'prop-types';
import CloseButton from '../../components/Ui/Button/CloseButton.jsx';
import css from './DescriptionPopup.module.css';

const DescriptionPopup = ({ description, onClose }) => {
  const handleContentClick = e => {
    e.stopPropagation();
  };

  return (
    <div className={css.backdropInCard} onClick={onClose}>
      <div className={css.popupContent} onClick={handleContentClick}>
        <CloseButton
          onClick={onClose}
          className={css.popupCloseButton}
          ariaLabel="Закрити опис"
        />
        <p className={css.descriptionText}>{description}</p>
      </div>
    </div>
  );
};

DescriptionPopup.propTypes = {
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DescriptionPopup;
