import React from 'react';
import PropTypes from 'prop-types';
import css from './StarRating.module.css';

const StarRating = ({
  value,
  onChange,
  name = 'rating',
  totalStars = 5,
  size = 24,
  colorActive = '#FFC107',
  colorInactive = '#E0E0E0',
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
    <div className={css.fieldForm}>
      <label htmlFor={name} className={css.label}>
        Rating*
      </label>

      <div className={css.inputWrapper}>
        <div
          className={css.stars}
          role={accessible ? 'radiogroup' : undefined}
          aria-label={accessible ? 'Rating' : undefined}
          tabIndex={accessible ? 0 : undefined}
          onKeyDown={accessible ? handleKeyDown : undefined}
        >
          {[...Array(totalStars)].map((_, i) => {
            const starValue = i + 1;
            return (
              <span
                key={starValue}
                className={`${css.star} ${
                  starValue <= value ? css.filled : css.empty
                }`}
                style={{
                  fontSize: `${size}px`,
                  color: starValue <= value ? colorActive : colorInactive,
                  cursor: readOnly ? 'default' : 'pointer',
                }}
                role={accessible ? 'radio' : undefined}
                aria-checked={accessible ? starValue === value : undefined}
                tabIndex={accessible ? 0 : undefined}
                onClick={() => !readOnly && onChange(starValue)}
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

        {/* Hidden input to store value in form */}
        {!readOnly && <input type="hidden" name={name} value={value} />}
      </div>

      {error && <p className={css.errorMessage}>{error}</p>}
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
