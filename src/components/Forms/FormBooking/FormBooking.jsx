import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { useEffect } from 'react'; // Видалено, оскільки minDate у DatePicker достатньо
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
  const { t } = useTranslation('form_booking');
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
        ? t('errors.required')
        : value.length < 2 || value.length > 20
          ? t('errors.name_length')
          : null,

    email: value =>
      !value.trim()
        ? t('errors.required')
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? t('errors.invalid_email')
          : value.length > 50
            ? t('errors.email_too_long')
            : null,

    phone: value =>
      !value.trim()
        ? t('errors.required')
        : !/^\+?\d{10,15}$/.test(value)
          ? t('errors.invalid_phone')
          : null,

    bookingStartDate: value => (!value ? t('errors.required') : null),

    // Приймаємо allFormData для залежної валідації
    bookingEndDate: (value, allFormData) => {
      if (!value) {
        return t('errors.required');
      }
      if (
        allFormData.bookingStartDate &&
        value <= allFormData.bookingStartDate
      ) {
        return t('errors.invalid_end_date');
      }
      return null;
    },

    comment: value =>
      !value.trim()
        ? t('errors.required')
        : value.length > 250
          ? t('errors.comment_too_long')
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
      // Використовуйте `throw` лише якщо ваш useForm ловить помилки
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

  // Створюємо змінну для перевірки наявності помилок
  const hasErrors = Object.values(errors).some(error => error !== null);

  // console.log('Current errors:', errors);
  // console.log('The button is inactive because:', {
  //   isSubmitting,
  //   hasErrors,
  //   hasAttemptedSubmit,
  // });

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css['title-text-form']}>
        <h3 className={css['title-form']}>{t('title')}</h3>
        <p className={css['text-form']}>{t('text')}</p>
      </div>
      <div className={css['inputs-area-form']}>
        <div className={css['label-input-wrapper']}>
          <label htmlFor="user-name-input" className={css.label}>
            {t('name_label')}*
          </label>
          <div className={css['field-input-and-field-error']}>
            <input
              id="user-name-input"
              name="name"
              type="text"
              className={clsx(css['field-input'], {
                [css['field-error']]: hasAttemptedSubmit && errors.name,
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
        <div className={css['label-input-wrapper']}>
          <label htmlFor="user-email-input" className={css.label}>
            {t('email_label')}*
          </label>
          <div className={css['field-input-and-field-error']}>
            <input
              id="user-email-input"
              name="email"
              type="email"
              className={clsx(css['field-input'], {
                [css['field-error']]: hasAttemptedSubmit && errors.email,
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
        <div className={css['label-input-wrapper']}>
          <label htmlFor="user-phone-input" className={css.label}>
            {t('phone_label')}*
          </label>
          <div className={css['field-input-and-field-error']}>
            <input
              id="user-phone-input"
              name="phone"
              type="tel"
              className={clsx(css['field-input'], {
                [css['field-error']]: hasAttemptedSubmit && errors.phone,
              })}
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+380XXXXXXXXX"
            />
            {hasAttemptedSubmit && errors.phone && (
              <p className={css['error-popup']}>{errors.phone}</p>
            )}
          </div>
        </div>
        <div className={css['label-input-wrapper']}>
          <label htmlFor="booking-start-date" className={css.label}>
            {t('from_date-time_label')}*
          </label>
          <div
            className={clsx(
              css['field-input-and-field-error'],
              css['datepicker-wrapper']
            )}
          >
            <DatePicker
              id="booking-start-date"
              name="bookingStartDate"
              selected={formData.bookingStartDate}
              onChange={date => handleDateChange(date, 'bookingStartDate')}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className={clsx(css['field-input'], {
                [css['field-error']]:
                  hasAttemptedSubmit && errors.bookingStartDate,
              })}
              placeholderText={t('booking_start_date_placeholder')}
              required
              minDate={new Date()}
              // Встановлюємо високий z-index
              popperClassName={css['datepicker-popper-high-z']}
            />
            {hasAttemptedSubmit && errors.bookingStartDate && (
              <p className={css['error-popup']}>{errors.bookingStartDate}</p>
            )}
          </div>
        </div>
        <div className={css['label-input-wrapper']}>
          <label htmlFor="booking-end-date" className={css.label}>
            {t('to_date_time_label')}*
          </label>
          <div
            className={clsx(
              css['field-input-and-field-error'],
              css['datepicker-wrapper']
            )}
          >
            <DatePicker
              id="booking-end-date"
              name="bookingEndDate"
              selected={formData.bookingEndDate}
              onChange={date => handleDateChange(date, 'bookingEndDate')}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className={clsx(css['field-input'], {
                [css['field-error']]:
                  hasAttemptedSubmit && errors.bookingEndDate,
              })}
              placeholderText={t('booking_end_date_placeholder')}
              required
              // MinDate гарантує, що кінець не раніше початку
              minDate={formData.bookingStartDate || new Date()}
              // Встановлюємо високий z-index
              popperClassName={css['datepicker-popper-high-z']}
            />
            {hasAttemptedSubmit && errors.bookingEndDate && (
              <p className={css['error-popup']}>{errors.bookingEndDate}</p>
            )}
          </div>
        </div>
        <div className={css['label-area-wrapper']}>
          <div className={css['label-and-counter-wrapper']}>
            <label htmlFor="user-comment" className={css.label}>
              {t('comment_label')}*
            </label>
            <p
              className={clsx(css['char-count'], {
                [css['char-count-warning']]: formData.comment.length >= 250,
              })}
            >
              {formData.comment.length} / 250
            </p>
          </div>
          <div className={clsx(css['field-area-and-field-error'])}>
            <textarea
              id="user-comment"
              name="comment"
              placeholder={t('comment_placeholder')}
              className={clsx(css['field-area'], {
                [css['field-error']]: hasAttemptedSubmit && errors.comment,
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
      <div className={css['element-send']}>
        <Button
          variant="primary"
          size="medium"
          type="submit"
          // Оновлена логіка: неактивна, якщо відправляється АБО
          // якщо була спроба відправити І є помилки
          disabled={isSubmitting || (hasAttemptedSubmit && hasErrors)}
        >
          {isSubmitting
            ? t('sending_button', { ns: 'button' })
            : t('send_button', { ns: 'button' })}
        </Button>
        {submissionError && (
          <p className={clsx(css['error-popup'], css['general-error-popup'])}>
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
