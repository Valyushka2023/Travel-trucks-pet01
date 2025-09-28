import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './StarRating.module.css';

const StarRating = ({
  value,
  onChange,
  name = 'rating',
  totalStars = 5,
  size = 24,
  colorActive = '#ffc107',
  colorInactive = '#948f8fff',
  error,
  accessible = true,
  readOnly = false,
}) => {
  const handleKeyDown = event => {
    if (!onChange || readOnly) return;

    if (event.key === 'ArrowRight' && value < totalStars) {
      onChange(value + 1);
    } else if (event.key === 'ArrowLeft' && value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div className={css['field-form']}>
      <label htmlFor={name} className={css.label}>
        Rating*
      </label>

      <div
        id={name}
        className={clsx(css['input-and-error-wrapper'], {
          [css['input-error']]: error,
        })}
        role={accessible ? 'radiogroup' : undefined}
        aria-label={accessible ? 'Rating' : undefined}
        tabIndex={accessible ? 0 : undefined}
        onKeyDown={accessible ? handleKeyDown : undefined}
        style={{
          '--active-star-color': colorActive,
          '--inactive-star-color': colorInactive,
        }}
      >
        <div className={css.stars}>
          {[...Array(totalStars)].map((_, i) => {
            const starValue = i + 1;
            return (
              <span
                key={starValue}
                className={clsx(css.star, {
                  [css.filled]: starValue <= value,
                  [css.empty]: starValue > value,
                })}
                style={{
                  fontSize: `${size}px`,

                  cursor: readOnly ? 'default' : 'pointer',
                }}
                role={accessible ? 'radio' : undefined}
                aria-checked={accessible ? starValue === value : undefined}
                tabIndex={accessible ? 0 : undefined}
                onClick={() => {
                  if (!readOnly) {
                    onChange(value === starValue ? 0 : starValue);
                  }
                }}
                onKeyDown={e => {
                  if (accessible && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    !readOnly && onChange(starValue);
                  }
                }}
              >
                ★
              </span>
            );
          })}
        </div>

        {!readOnly && <input type="hidden" name={name} value={value} />}

        {error && <p className={css['error-popup']}>{error}</p>}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  totalStars: PropTypes.number,
  size: PropTypes.number,
  colorActive: PropTypes.string,
  colorInactive: PropTypes.string,
  error: PropTypes.string,
  accessible: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default StarRating;
