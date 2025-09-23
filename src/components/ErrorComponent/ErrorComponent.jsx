import PropTypes from 'prop-types';
import css from './ErrorComponent.module.css';

function ErrorComponent({ error, onRetry }) {
  return (
    <div className={css['error-container']}>
      <p className={css['error-message']}>An error occurred: {error}</p>
      <button className={css['retry-button']} onClick={onRetry}>
        Retry download
      </button>
    </div>
  );
}

ErrorComponent.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorComponent;
