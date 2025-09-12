// 1. Імпорти з зовнішніх бібліотек
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

// 2. Імпорти власних хуків та утиліт
import useForm from '../../../hooks/useForm.js';
import { sendBookingRequest } from '../../../services/api.js';

// 3. Імпорти локальних компонентів
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';

// 4. Імпорти стилів
import css from './FormBooking.module.css';

function FormBooking({ camper }) {
  const navigate = useNavigate();

  const initialState = {
    name: '',
    email: '',
    bookingStartDate: null,
    bookingEndDate: null,
    comment: '',
    phone: '',
  };

  const validationRules = {
    name: value =>
      !value.trim()
        ? 'Please fill in this field.'
        : value.length < 2 || value.length > 20
          ? 'The name must be between 2 and 20 characters.'
          : null,
    email: value =>
      !value.trim()
        ? 'Please fill in this field.'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Incorrect email format.'
          : value.length > 50
            ? 'Email is too long.'
            : null,
    phone: value =>
      !value.trim()
        ? 'Please fill in this field.'
        : !/^\+?\d{10,15}$/.test(value)
          ? 'Incorrect phone number format.'
          : null,
    bookingStartDate: value =>
      !value ? 'Please select a start date and time.' : null,
    bookingEndDate: value => {
      if (!value) {
        return 'Please select an end date and time.';
      }
      if (formData.bookingStartDate && value <= formData.bookingStartDate) {
        return 'End date and time must be after the start date and time.';
      }
      return null;
    },
    comment: value =>
      !value.trim()
        ? 'Please fill in this field.'
        : value.length > 250
          ? 'The comment must be up to 250 characters long.'
          : null,
  };

  const onSubmit = async formData => {
    const formattedStartDate = formData.bookingStartDate
      ? format(formData.bookingStartDate, 'yyyy-MM-dd HH:mm')
      : '';
    const formattedEndDate = formData.bookingEndDate
      ? format(formData.bookingEndDate, 'yyyy-MM-dd HH:mm')
      : '';

    const bookingData = {
      camperId: camper._id,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      comment: formData.comment.trim(),
      bookingStartDate: formattedStartDate,
      bookingEndDate: formattedEndDate,
    };

    const response = await sendBookingRequest(bookingData);
    if (response?.success) {
      navigate('/booking-received', {
        state: {
          camperId: camper._id,
          camper,
        },
      });
    } else {
      throw new Error(response?.message || 'Failed to send booking.');
    }
  };

  const {
    formData,
    errors,
    isSubmitting,
    hasAttemptedSubmit,
    submissionError,
    handleInputChange,
    handleDateChange,
    handleSubmit,
  } = useForm(initialState, validationRules, onSubmit);

  // Додамо логіку, щоби `bookingEndDate` завжди була пізнішою за `bookingStartDate`
  useEffect(() => {
    if (
      formData.bookingStartDate &&
      formData.bookingEndDate &&
      formData.bookingEndDate <= formData.bookingStartDate
    ) {
      handleDateChange(null, 'bookingEndDate');
    }
  }, [formData.bookingStartDate, formData.bookingEndDate, handleDateChange]);
  console.log('Поточні помилки:', errors);
  console.log('Кнопка неактивна через:', {
    isSubmitting,
    hasErrors: Object.keys(errors).length > 0,
  });

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.titleForm}>
        <h3 className={css.textTitleForm}>Book a motorhome now</h3>
        <p className={css.textForm}>
          We are always in touch, ready to help you!
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
              From (date, time)*
            </label>
            <div
              className={clsx(css.inputAndErrorWrapper, css.datepickerWrapper)}
            >
              <DatePicker
                id="booking-start-date"
                name="bookingStartDate"
                selected={formData.bookingStartDate}
                onChange={date => handleDateChange(date, 'bookingStartDate')}
                onSelect={date => handleDateChange(date, 'bookingStartDate')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                className={clsx(css.modalInput, {
                  [css.inputError]:
                    hasAttemptedSubmit && errors.bookingStartDate,
                })}
                placeholderText="Start date, time"
                required
                minDate={new Date()}
              />
              {hasAttemptedSubmit && errors.bookingStartDate && (
                <p className={css.errorPopup}>{errors.bookingStartDate}</p>
              )}
            </div>
          </div>
          <div className={css.fieldForm}>
            <label htmlFor="booking-end-date" className={css.label}>
              To (date, time)*
            </label>
            <div
              className={clsx(css.inputAndErrorWrapper, css.datepickerWrapper)}
            >
              <DatePicker
                id="booking-end-date"
                name="bookingEndDate"
                selected={formData.bookingEndDate}
                onChange={date => handleDateChange(date, 'bookingEndDate')}
                onSelect={date => handleDateChange(date, 'bookingEndDate')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                className={clsx(css.modalInput, {
                  [css.inputError]: hasAttemptedSubmit && errors.bookingEndDate,
                })}
                placeholderText="End date, time"
                required
                minDate={formData.bookingStartDate || new Date()}
              />
              {hasAttemptedSubmit && errors.bookingEndDate && (
                <p className={css.errorPopup}>{errors.bookingEndDate}</p>
              )}
            </div>
          </div>
          <div className={css.fieldArea}>
            <div className={css.commentAndCounterWrapper}>
              <label htmlFor="user-comment" className={css.labelComment}>
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
      <div className={css.elementSend}>
        <Button
          variant="primary"
          size="medium"
          type="submit"
          disabled={
            isSubmitting || Object.values(errors).some(error => error !== null)
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
