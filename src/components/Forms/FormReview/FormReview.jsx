import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import useForm from '../../../hooks/useForm.js';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import StarRating from '../../StarRating/StarRating.jsx';
import css from './FormReview.module.css';

const FormReview = ({ camperId, onReviewAdded }) => {
  const navigate = useNavigate();

  const initialState = {
    name: '',
    email: '',
    rating: 0,
    comment: '',
  };

  const validationRules = {
    name: value =>
      !value.trim()
        ? 'Please fill in this field.'
        : value.length < 2 || value.length > 20
          ? 'The name must be between 2 and 20 characters long.'
          : null,
    email: value =>
      !value.trim()
        ? 'Please fill in this field.'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Invalid email format.'
          : value.length > 40
            ? 'Email is too long.'
            : null,
    rating: value => (!value ? 'Please rate.' : null),
    comment: value =>
      !value.trim()
        ? 'Please fill in this field.'
        : value.length > 150
          ? 'The comment must contain up to 150 characters.'
          : null,
  };

  const onSubmit = async formData => {
    console.log('1. onSubmit - Запущено функцію відправки.');

    const reviewToSend = {
      reviewer_name: formData.name.trim(),
      reviewer_rating: parseInt(formData.rating, 10),
      comment: formData.comment.trim(),
      email: formData.email.trim(),
      id: uuidv4(),
      camperId,
      createdAt: new Date().toISOString(),
    };

    try {
      console.log('2. onSubmit - Імітуємо затримку API-запиту...');
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log('3. onSubmit - Імітація запиту завершена.');

      console.log('4. onSubmit - Викликаємо onReviewAdded...');
      await onReviewAdded(reviewToSend);
      console.log(
        '5. onSubmit - onReviewAdded завершено. Дані відправлені:',
        reviewToSend
      );

      console.log('6. onSubmit - Навігація до сторінки подяки...');
      navigate('/thank-you');
    } catch (err) {
      console.error('Помилка при відправці форми:', err);
      // Можна обробити помилку тут, наприклад, показати сповіщення
    }
  };

  const {
    formData,
    errors,
    isSubmitting,
    hasAttemptedSubmit,
    submissionError,
    handleInputChange,
    handleSubmit,
  } = useForm(initialState, validationRules, onSubmit);

  console.log(
    'Рендер FormReview - isSubmitting:',
    isSubmitting,
    'hasAttemptedSubmit:',
    hasAttemptedSubmit
  );

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.titleForm}>
        <h3 className={css.textTitleForm}>Submit your review now</h3>
        <p className={css.textForm}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <div className={css.inputsArea}>
        <div className={css.inputs}>
          <div className={css.fieldForm}>
            <label htmlFor="user-name-input" className={css.label}>
              Name*
            </label>
            <div className={css.inputAndErrorWrapper}>
              <input
                id="user-name-input"
                name="name"
                type="text"
                className={clsx(css.modalInput, {
                  [css.inputError]: hasAttemptedSubmit && errors.name,
                })}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && errors.name && (
                <p className={css.errorPopup}>{errors.name}</p>
              )}
            </div>
          </div>

          <div className={css.fieldForm}>
            <label htmlFor="user-email-input" className={css.label}>
              Email*
            </label>
            <div className={css.inputAndErrorWrapper}>
              <input
                id="user-email-input"
                name="email"
                type="email"
                className={clsx(css.modalInput, {
                  [css.inputError]: hasAttemptedSubmit && errors.email,
                })}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && errors.email && (
                <p className={css.errorPopup}>{errors.email}</p>
              )}
            </div>
          </div>

          <StarRating
            value={formData.rating}
            onChange={rating =>
              handleInputChange({ target: { name: 'rating', value: rating } })
            }
            name="rating"
            error={hasAttemptedSubmit ? errors.rating : null}
            accessible={true}
            className={css.ratingField}
          />

          <div className={css.fieldArea}>
            <div className={css.commentAndCounterWrapper}>
              <label htmlFor="user-comment" className={css.labelComment}>
                Comment*
              </label>
              <p
                className={clsx(css.charCount, {
                  [css.charCountWarning]: formData.comment.length >= 150,
                })}
              >
                {formData.comment.length} / 150
              </p>
            </div>
            <div
              className={clsx(
                css.inputAndErrorWrapper,
                css.commentInputWrapper
              )}
            >
              <textarea
                id="user-comment"
                name="comment"
                placeholder="Your message"
                className={clsx(css.modalTextArea, {
                  [css.inputError]: hasAttemptedSubmit && errors.comment,
                })}
                value={formData.comment}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && errors.comment && (
                <p className={css.errorPopup}>{errors.comment}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={css.elementSubmit}>
        <Button
          variant="primary"
          size="medium"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </Button>
        {submissionError && (
          <p className={clsx(css.errorPopup, css.generalErrorPopup)}>
            {submissionError}
          </p>
        )}
      </div>
    </form>
  );
};

FormReview.propTypes = {
  camperId: PropTypes.string.isRequired,
  onReviewAdded: PropTypes.func.isRequired,
};

export default FormReview;
