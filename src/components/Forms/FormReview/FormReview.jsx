import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import useForm from '../../../hooks/useForm.js';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import StarRating from '../../StarRating/StarRating.jsx';
import css from './FormReview.module.css';

const FormReview = ({ camperId, onReviewAdded }) => {
  const { t } = useTranslation();
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
    // console.log('1. onSubmit - Sending function launched');

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
      // console.log('2. onSubmit - Simulate API request delay...');
      await new Promise(resolve => setTimeout(resolve, 300));
      // console.log('3. onSubmit - Request simulation complete');

      // console.log('4. onSubmit - Calling onReviewAdded...');
      await onReviewAdded(reviewToSend);
      // console.log(
      //   '5. onSubmit - onReviewAdded completed. Data sent:',
      //   reviewToSend
      // );

      // console.log('6. onSubmit - Navigation to the thank you page...');
      navigate('/thank-you');
    } catch (err) {
      console.error('Error sending form:', err);
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

  // console.log(
  //   'Render FormReview - isSubmitting:',
  //   isSubmitting,
  //   'hasAttemptedSubmit:',
  //   hasAttemptedSubmit
  // );

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css['title-form']}>
        <h3 className={css['text-title-form']}>Submit your review now</h3>
        <p className={css['text-form']}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <div className={css['inputs-area']}>
        <div className={css.inputs}>
          <div className={css['field-form']}>
            <label htmlFor="user-name-input" className={css.label}>
              Name*
            </label>
            <div className={css['input-and-error-wrapper']}>
              <input
                id="user-name-input"
                name="name"
                type="text"
                className={clsx(css['modal-input'], {
                  [css['input-error']]: hasAttemptedSubmit && errors.name,
                })}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && errors.name && (
                <p className={css['error-popup']}>{errors.name}</p>
              )}
            </div>
          </div>

          <div className={css['field-form']}>
            <label htmlFor="user-email-input" className={css.label}>
              Email*
            </label>
            <div className={css['input-and-error-wrapper']}>
              <input
                id="user-email-input"
                name="email"
                type="email"
                className={clsx(css['modal-input'], {
                  [css['input-error']]: hasAttemptedSubmit && errors.email,
                })}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && errors.email && (
                <p className={css['error-popup']}>{errors.email}</p>
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
            className={css['rating-field']}
          />

          <div className={css['field-area']}>
            <div className={css['comment-and-counter-wrapper']}>
              <label htmlFor="user-comment" className={css['label-comment']}>
                Comment*
              </label>
              <p
                className={clsx(css['char-count'], {
                  [css['char-count-warning']]: formData.comment.length >= 150,
                })}
              >
                {formData.comment.length} / 150
              </p>
            </div>
            <div
              className={clsx(
                css['input-and-error-wrapper'],
                css['comment-input-wrapper']
              )}
            >
              <textarea
                id="user-comment"
                name="comment"
                placeholder="Your message"
                className={clsx(css['modal-text-area'], {
                  [css['input-error']]: hasAttemptedSubmit && errors.comment,
                })}
                value={formData.comment}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && errors.comment && (
                <p className={css['error-popup']}>{errors.comment}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={css['element-submit']}>
        <Button
          variant="primary"
          size="medium"
          type="submit"
          disabled={
            isSubmitting || Object.values(errors).some(error => error !== null)
          }
        >
          {isSubmitting
            ? t('submiting_button', { ns: 'button' })
            : t('submit_button', { ns: 'button' })}
        </Button>
        {submissionError && (
          <p className={clsx(css['error-popup'], css['general-error-popup'])}>
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
