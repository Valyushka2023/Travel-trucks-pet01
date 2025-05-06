import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ThankYouBookingPage.module.css';

const ThankYouBookingPage = () => {
  const navigate = useNavigate(); // ✅ Правильне використання useNavigate()

  const handleGoBack = () => {
    navigate('/catalog'); // Шлях до вашої сторінки каталогу вже визначено у вашому App.js
  };
  const handleClose = () => {
    navigate('/'); // Перехід на домашню сторінку (замініть '/' на фактичний шлях до вашої домашньої сторінки, якщо він інший)
  };

  return (
    //
    <div className={css.container}>
      <div className={css.buttons}>
        <button onClick={handleGoBack} className={css.goBackLink}>
          &lt; Go back to catalog
        </button>
        <button onClick={handleClose} className={css.closeButton}>
          &times;
        </button>
      </div>

      <div className={css.feedback}>
        <h2>Your booking request has been received!</h2>

        <p>
          Our team will contact you shortly to confirm your booking details and
          availability.
        </p>
        {/* Можна додати посилання на головну сторінку або контактну інформацію */}
      </div>
    </div>
  );
};

export default ThankYouBookingPage;
