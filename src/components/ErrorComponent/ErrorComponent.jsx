import PropTypes from 'prop-types';
import css from './ErrorComponent.module.css'; // Імпортимо стилі

function ErrorComponent({ error, onRetry }) {
  return (
    <div className={css.errorContainer}>
      <p className={css.errorMessage}>Виникла помилка: {error}</p>
      <button className={css.retryButton} onClick={onRetry}>
        Повторити завантаження
      </button>
    </div>
  );
}

ErrorComponent.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorComponent;
