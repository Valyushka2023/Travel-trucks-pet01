import { useState } from 'react';
import Button from '../../Ui/Button/Button.jsx';
import PropTypes from 'prop-types';
import { sendBookingRequest } from '../../../services/api.js'; // Імпортуємо функцію для відправки запиту на бронювання
import { useNavigate } from 'react-router-dom'; // Імпортуємо хук для навігації
import css from './FormBooking.module.css'; // Імпортуємо стилі компонента

function FormBooking({ camper }) {
  // Стан для імені користувача
  const [name, setName] = useState('');
  // Стан для електронної пошти користувача
  const [email, setEmail] = useState('');
  // Стан для дати бронювання
  const [bookingDate, setBookingDate] = useState('');
  // Стан для коментаря користувача
  const [comment, setComment] = useState('');
  // Стан, що вказує на процес відправки форми
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Стан для зберігання повідомлення про помилку при відправці
  const [submissionError, setSubmissionError] = useState(null);
  // Стан, що вказує на успішну відправку форми
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  // Хук для програмної навігації
  const navigate = useNavigate();

  // Функція обробки події відправки форми
  const handleSubmit = async event => {
    // Запобігаємо стандартній поведінці браузера при відправці форми
    event.preventDefault();
    // Встановлюємо стан відправки в "true"
    setIsSubmitting(true);
    // Скидаємо повідомлення про помилку
    setSubmissionError(null);
    // Скидаємо стан успішної відправки
    setSubmissionSuccess(false);

    // Об'єкт з даними бронювання
    const bookingData = {
      camperId: camper._id,
      name: name,
      email: email,
      bookingDate: bookingDate,
      comment: comment,
    };

    try {
      // Відправляємо запит на бронювання на сервер
      const response = await sendBookingRequest(bookingData);
      // Перевіряємо, чи запит був успішним
      if (response && response.success) {
        // Встановлюємо стан успішної відправки в "true"
        setSubmissionSuccess(true);
        // Очищаємо поля форми
        setName('');
        setEmail('');
        setBookingDate('');
        setComment('');
        // Перенаправляємо користувача на сторінку подяки за бронювання
        navigate('/booking-received');
      } else {
        // Якщо сталася помилка, встановлюємо повідомлення про помилку
        setSubmissionError(
          response?.message || 'Не вдалося відправити запит на бронювання.'
        );
      }
    } catch (error) {
      // Обробляємо помилки, що виникли під час відправки запиту
      setSubmissionError(error.message || 'Виникла неочікувана помилка.');
    } finally {
      // Встановлюємо стан відправки в "false" незалежно від результату
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.form}>
      <div className={css.titleForm}>
        <h3 className={css.textTitleForm}>
          Забронюйте свій будинок на колесах зараз
        </h3>
        <p className={css.textForm}>
          Залишайтеся на зв'язку! Ми завжди готові вам допомогти.
        </p>
      </div>
      <form className={css.inputs} onSubmit={handleSubmit}>
        <div className={css.inputForm}>
          <div className={css.fieldForm}>
            <label htmlFor="user-name-input" className={css.label}>
              Ім'я*
            </label>
            <input
              id="user-name-input"
              name="user-name"
              type="text"
              className={css.modalInput}
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className={css.fieldForm}>
            <label htmlFor="user-email-input" className={css.label}>
              Електронна пошта*
            </label>
            <input
              id="user-email-input"
              name="user-email"
              type="email"
              className={css.modalInput}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={css.fieldForm}>
            <label htmlFor="user-date-input" className={css.label}>
              Дата бронювання*
            </label>
            <input
              id="user-date-input"
              name="user-date"
              type="date"
              className={css.modalInput}
              value={bookingDate}
              onChange={e => setBookingDate(e.target.value)}
              required
            />
          </div>
          <div className={css.fieldArea}>
            <label htmlFor="user-comment" className={css.label}>
              Коментар
            </label>
            <textarea
              id="user-comment"
              name="user-comment"
              placeholder="Ваше повідомлення"
              className={css.modalTextArea}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>
        </div>
        <div className={css.elementSend}>
          <Button
            variant="primary"
            size="medium"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Відправка...' : 'Відправити'}
          </Button>
        </div>
        {submissionError && (
          <div className={css.errorMessage}>Помилка: {submissionError}</div>
        )}
      </form>
    </div>
  );
}

FormBooking.propTypes = {
  camper: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default FormBooking;
