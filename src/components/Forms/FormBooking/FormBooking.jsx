import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../Ui/Button/Button.jsx';
import { sendBookingRequest } from '../../../services/api.js';
import css from './FormBooking.module.css';
import clsx from 'clsx';

function FormBooking({ camper }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingStartDate: '',
    bookingEndDate: '',
    comment: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [commentLengthError, setCommentLengthError] = useState(null);

  const navigate = useNavigate();

  const validateField = useCallback((name, value) => {
    let error = null;
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Please fill in this field.';
        else if (value.length < 2 || value.length > 20)
          error = 'The name must be between 2 and 20 characters.';
        break;
      case 'email':
        if (!value.trim()) error = 'Please fill in this field.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = 'Incorrect email format.';
        else if (value.length > 50) error = 'Email is too long.';
        break;
      case 'phone':
        if (!value.trim()) error = 'Please fill in this field.';
        else if (!/^\+?\d{10,15}$/.test(value))
          error = 'Incorrect phone number format.';
        break;
      case 'bookingStartDate':
        if (!value.trim()) error = 'Please select a start date and time.';
        break;
      case 'bookingEndDate':
        if (!value.trim()) error = 'Please select an end date and time.';
        break;
      case 'comment':
        if (!value.trim()) error = 'Please fill in this field.';
        break;
      default:
        break;
    }
    return error;
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isFormValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isFormValid = false;
      }
    });

    if (formData.bookingStartDate && formData.bookingEndDate) {
      const startDate = new Date(formData.bookingStartDate);
      const endDate = new Date(formData.bookingEndDate);
      if (endDate <= startDate) {
        newErrors.bookingEndDate =
          'The end date must be later than the start date.';
        isFormValid = false;
      }
    }

    if (formData.comment.length > 250) {
      newErrors.comment = 'The comment must be up to 250 characters long.';
      setCommentLengthError(newErrors.comment);
      isFormValid = false;
    } else {
      setCommentLengthError(null);
    }

    setErrors(newErrors);
    return isFormValid;
  }, [formData, validateField]);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      bookingStartDate: '',
      bookingEndDate: '',
      comment: '',
      phone: '',
    });
    setErrors({});
    setCommentLengthError(null);
    setHasAttemptedSubmit(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'comment' && value.length > 250) {
      newValue = value.slice(0, 250);
      setCommentLengthError('The comment must be up to 250 characters long.');
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));

    if (hasAttemptedSubmit) {
      const fieldError = validateField(name, newValue);
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        if (fieldError) {
          newErrors[name] = fieldError;
        } else {
          delete newErrors[name];
        }
        return newErrors;
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const bookingData = {
      camperId: camper._id,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      comment: formData.comment.trim(),
      bookingStartDate: formData.bookingStartDate.replace('T', ' '),
      bookingEndDate: formData.bookingEndDate.replace('T', ' '),
    };

    try {
      const response = await sendBookingRequest(bookingData);
      if (response?.success) {
        resetForm();
        navigate('/booking-received', {
          state: {
            camperId: camper._id,
            camper,
          },
        });
      } else {
        setSubmissionError(response?.message || 'Failed to send booking.');
      }
    } catch (err) {
      setSubmissionError(err.message || 'Unexpected error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.titleForm}>
        <h3 className={css.textTitleForm}>Book a motorhome now</h3>
        <p className={css.textForm}>
          We are always in touch, ready to help you!
        </p>
      </div>

      <div className={css.inputs}>
        <div className={css.inputForm}>
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

          <div className={css.fieldForm}>
            <label htmlFor="user-phone-input" className={css.label}>
              Phone*
            </label>
            <div className={css.inputAndErrorWrapper}>
              <input
                id="user-phone-input"
                name="phone"
                type="tel"
                className={clsx(css.modalInput, {
                  [css.inputError]: hasAttemptedSubmit && errors.phone,
                })}
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+380XXXXXXXXX"
              />
              {hasAttemptedSubmit && errors.phone && (
                <p className={css.errorPopup}>{errors.phone}</p>
              )}
            </div>
          </div>

          <div className={css.fieldForm}>
            <label htmlFor="booking-start-date" className={css.label}>
              From (start date, start time)*
            </label>
            <div className={css.inputAndErrorWrapper}>
              <input
                id="booking-start-date"
                name="bookingStartDate"
                type="datetime-local"
                className={clsx(css.modalInput, {
                  [css.inputError]:
                    hasAttemptedSubmit && errors.bookingStartDate,
                })}
                value={formData.bookingStartDate}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && errors.bookingStartDate && (
                <p className={css.errorPopup}>{errors.bookingStartDate}</p>
              )}
            </div>
          </div>

          <div className={css.fieldForm}>
            <label htmlFor="booking-end-date" className={css.label}>
              To (end date, end time)*
            </label>
            <div className={css.inputAndErrorWrapper}>
              <input
                id="booking-end-date"
                name="bookingEndDate"
                type="datetime-local"
                className={clsx(css.modalInput, {
                  [css.inputError]: hasAttemptedSubmit && errors.bookingEndDate,
                })}
                value={formData.bookingEndDate}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && errors.bookingEndDate && (
                <p className={css.errorPopup}>{errors.bookingEndDate}</p>
              )}
            </div>
          </div>

          <div className={css.fieldArea}>
            <div className={css.commentLabelWrapper}>
              <label htmlFor="user-comment" className={css.label}>
                Comment*
              </label>
              <p
                className={clsx(css.charCount, {
                  [css.charCountWarning]: formData.comment.length >= 250,
                })}
              >
                {formData.comment.length} / 250
              </p>
            </div>
            <div className={css.inputAndErrorWrapper}>
              <textarea
                id="user-comment"
                name="comment"
                placeholder="Your message"
                className={clsx(css.modalTextArea, {
                  [css.inputError]:
                    hasAttemptedSubmit &&
                    (errors.comment || commentLengthError),
                })}
                value={formData.comment}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && errors.comment && !commentLengthError && (
                <p className={css.errorPopup}>{errors.comment}</p>
              )}
              {commentLengthError && (
                <p className={clsx(css.errorPopup, css.commentLengthPopup)}>
                  {commentLengthError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={css.elementSend}>
        <Button
          variant="primary"
          size="medium"
          type="submit"
          disabled={
            isSubmitting || Object.keys(errors).length > 0 || commentLengthError
          }
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
        {submissionError && (
          <p className={clsx(css.errorPopup, css.generalErrorPopup)}>
            {submissionError}
          </p>
        )}
      </div>
    </form>
  );
}

FormBooking.propTypes = {
  camper: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default FormBooking;
