import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../Ui/Button/Button.jsx';
import css from './FormReview.module.css';
import clsx from 'clsx';

const FormReview = ({ camperId, onReviewAdded }) => {
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: '',
  });

  const [error, setError] = useState({});
  const [submissionError, setSubmissionError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  // Новий стан для керування помилкою довжини коментаря та спливаючим вікном
  const [commentLengthError, setCommentLengthError] = useState(null);

  const navigate = useNavigate();

  const resetErrorForField = fieldName => {
    setError(prev => {
      const { [fieldName]: _, ...rest } = prev; // eslint-disable-line no-unused-vars
      return rest;
    });
  };

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Функція для валідації конкретного поля
  const validateField = (name, value) => {
    let fieldError = null;

    if (name === 'name') {
      if (!value.trim()) {
        fieldError = 'Please fill in this field.';
      } else if (value.length < 2 || value.length > 20) {
        fieldError = 'The name must be between 2 and 20 characters long.';
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        fieldError = 'Please fill in this field.';
      } else if (!validateEmail(value)) {
        fieldError = 'Invalid email format.';
      } else if (value.length > 20) {
        fieldError = 'Email is too long.';
      }
    } else if (name === 'comment') {
      // Валідація на довжину коментаря перенесена до handleInputChange та validateForm
      if (!value.trim()) {
        fieldError = 'Please fill in this field.';
      }
    } else if (name === 'rating') {
      if (!value) {
        fieldError = 'Please rate.';
      }
    }

    return fieldError;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    let newValue = value; // Змінна для потенційно обрізаного значення

    setSubmissionError(null);

    // Спеціальна логіка для поля коментаря: обрізання та показ спливаючого вікна
    if (name === 'comment') {
      if (value.length > 150) {
        newValue = value.slice(0, 150); // Автоматичне обрізання тексту
        setCommentLengthError('The comment must contain up to 150 characters'); // Встановлюємо помилку для спливаючого вікна
      } else {
        setCommentLengthError(null); // Очищаємо помилку, якщо довжина в межах ліміту
      }
      setNewReview(prev => ({ ...prev, [name]: newValue })); // Встановлюємо (можливо обрізане) значення
    } else {
      setNewReview(prev => ({ ...prev, [name]: value }));
    }

    // Валідація поля під час введення, якщо вже була спроба відправки
    if (hasAttemptedSubmit) {
      // Для коментаря, validateField перевіряє лише на порожнечу.
      // Довжина вже обробляється вище в цій функції.
      const fieldValidationResult = validateField(name, newValue);

      setError(prevErrors => {
        const newErrors = { ...prevErrors };
        if (fieldValidationResult) {
          newErrors[name] = fieldValidationResult; // Якщо є помилка (наприклад, порожнє поле), встановлюємо її
        } else {
          delete newErrors[name]; // Якщо помилки немає, видаляємо ключ з об'єкта
        }
        return newErrors;
      });
    } else {
      resetErrorForField(name);
    }
  };

  const handleRatingChange = newRating => {
    setNewReview(prev => ({ ...prev, rating: newRating }));
    setSubmissionError(null);

    const ratingError = validateField('rating', newRating); // Валідуємо рейтинг

    if (hasAttemptedSubmit) {
      setError(prevErrors => {
        const newErrors = { ...prevErrors };
        if (ratingError) {
          newErrors.rating = ratingError;
        } else {
          delete newErrors.rating; // Якщо помилки немає, видаляємо ключ
        }
        return newErrors;
      });
    } else {
      resetErrorForField('rating');
    }
  };

  const validateForm = () => {
    const errors = {};

    errors.name = validateField('name', newReview.name);
    errors.email = validateField('email', newReview.email);
    errors.rating = validateField('rating', newReview.rating);
    errors.comment = validateField('comment', newReview.comment); // Перевіряємо, чи не порожнє

    // Додаємо помилку довжини коментаря до загальних помилок форми, якщо вона все ще існує (хоча `handleInputChange` обрізає)
    // Це як додатковий рівень захисту або якщо текст було вставлено
    if (newReview.comment.length > 150) {
      errors.comment = 'The comment must contain up to 150 characters';
      setCommentLengthError('The comment must contain up to 150 characters'); // Переконаємось, що спливаюче вікно теж з'явиться
    } else {
      // Якщо коментар валідний по довжині при сабміті, але раніше була помилка довжини, очистимо її
      if (commentLengthError) {
        setCommentLengthError(null);
      }
    }

    // Видаляємо null значення (які означають відсутність помилки)
    Object.keys(errors).forEach(
      key => errors[key] === null && delete errors[key]
    );

    setError(errors);

    // Форма дійсна, якщо немає жодних помилок (включно з потенційною помилкою довжини коментаря)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setHasAttemptedSubmit(true); // Встановлюємо, що спроба відправки була

    const formIsValid = validateForm(); // Виконуємо повну валідацію форми

    if (!formIsValid) {
      // Якщо форма недійсна (є помилки), зупиняємо виконання
      return;
    }

    setIsLoading(true); // Включаємо стан завантаження
    setSubmissionError(null); // Очищаємо попередні помилки відправки

    try {
      const reviewToSend = {
        reviewer_name: newReview.name.trim(),
        reviewer_rating: parseInt(newReview.rating, 10),
        comment: newReview.comment.trim(),
        email: newReview.email.trim(),
        id: uuidv4(),
        camperId,
        createdAt: new Date().toISOString(),
      };

      // Затримка 130мс для симуляції мережевого запиту.
      // Якщо onReviewAdded дійсно асинхронна (наприклад, fetch/axios),
      // то setTimeout не потрібен, і ви будете чекати реального завершення.
      await new Promise(resolve => setTimeout(resolve, 130)); // Симуляція затримки
      await onReviewAdded(reviewToSend); // Викликаємо функцію для додавання відгуку

      // Якщо все успішно, скидаємо форму та перенаправляємо
      setNewReview({ name: '', email: '', rating: 0, comment: '' });
      setIsLoading(false);
      navigate('/thank-you');
    } catch (err) {
      // Обробка помилок, які можуть виникнути під час відправки
      setSubmissionError('Failed to submit review. Please try again.');
      setIsLoading(false);
      console.error('Error submitting review:', err);
    }
  };

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <button
          key={starValue}
          type="button"
          className={clsx(css.star, {
            [css.filled]: starValue <= newReview.rating,
          })}
          onClick={() => handleRatingChange(starValue)}
        >
          &#9733;
        </button>
      );
    });

  // Ефект для очищення загальної помилки відправки, якщо всі поля стали валідними
  useEffect(() => {
    if (
      hasAttemptedSubmit &&
      Object.keys(error).length === 0 && // Немає помилок валідації полів
      !commentLengthError && // Також немає помилки довжини коментаря
      submissionError // Але є загальна помилка відправки
    ) {
      setSubmissionError(null); // Очищаємо її
    }
  }, [
    newReview,
    error,
    hasAttemptedSubmit,
    submissionError,
    commentLengthError,
  ]);

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.titleForm}>
        <h3 className={css.textTitleForm}>Submit your review now</h3>
        <p className={css.textForm}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={css.inputs}>
        <div className={css.inputForm}>
          {/* Name */}
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
                  [css.inputError]: hasAttemptedSubmit && error.name,
                })}
                value={newReview.name}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && error.name && (
                <p className={css.errorPopup}>{error.name}</p>
              )}
            </div>
          </div>

          {/* Email */}
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
                  [css.inputError]: hasAttemptedSubmit && error.email,
                })}
                value={newReview.email}
                onChange={handleInputChange}
                required
              />
              {hasAttemptedSubmit && error.email && (
                <p className={css.errorPopup}>{error.email}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className={css.fieldForm}>
            <label htmlFor="user-rating-input" className={css.label}>
              Rating*
            </label>
            <div className={css.inputAndErrorWrapper}>
              <div
                id="user-rating-input"
                className={clsx(css.modalInput, {
                  [css.inputError]: hasAttemptedSubmit && error.rating,
                })}
              >
                {renderStars()}
              </div>
              {hasAttemptedSubmit && error.rating && (
                <p className={css.errorPopup}>{error.rating}</p>
              )}
            </div>
          </div>

          {/* Comment */}
          <div className={css.fieldArea}>
            <div className={css.commentLabelWrapper}>
              <label htmlFor="user-comment" className={css.label}>
                Comment*
              </label>
              {/* Лічильник символів поруч із лейблом */}
              <p
                className={clsx(css.charCount, {
                  [css.charCountWarning]: newReview.comment.length >= 150, // Червоний, якщо досягнуто ліміту
                })}
              >
                {newReview.comment.length} / 150
              </p>
            </div>
            <div className={css.inputAndErrorWrapper}>
              <textarea
                id="user-comment"
                name="comment"
                placeholder="Text input"
                className={clsx(css.modalTextArea, {
                  [css.inputError]:
                    hasAttemptedSubmit && (error.comment || commentLengthError), // inputError тепер враховує і помилку довжини
                })}
                value={newReview.comment}
                onChange={handleInputChange}
                // !!! ВИДАЛЕНО maxLength={130} ЗВІДСИ, ЩОБ ЛОГІКА В handleInputChange ПРАЦЮВАЛА !!!
                required
              />

              {/* Помилка для коментаря (якщо поле порожнє або інша валідація з validateField) */}
              {hasAttemptedSubmit &&
                error.comment &&
                !commentLengthError && ( // Показуємо, якщо є error.comment і НЕМАЄ commentLengthError
                  <p className={css.errorPopup}>{error.comment}</p>
                )}

              {/* Спливаюче вікно для помилки довжини коментаря */}
              {commentLengthError && (
                <p className={clsx(css.errorPopup, css.commentLengthPopup)}>
                  {commentLengthError}
                </p>
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
          disabled={
            isLoading || Object.keys(error).length > 0 || commentLengthError
          } // Кнопка неактивна, якщо є будь-які помилки валідації або помилка довжини коментаря
        >
          {isLoading ? 'Sending...' : 'Submit'}
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
