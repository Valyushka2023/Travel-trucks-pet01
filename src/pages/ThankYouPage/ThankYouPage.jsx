import { useNavigate } from 'react-router-dom';
import css from './ThankYouPage.module.css';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/catalog'); // Шлях до вашої сторінки каталогу вже визначено у вашому App.js
  };
  const handleClose = () => {
    navigate('/'); // Перехід на домашню сторінку (замініть '/' на фактичний шлях до вашої домашньої сторінки, якщо він інший)
  };
  return (
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
        <h1>Thank you for your feedback!</h1>
        <p className={css.text}>Your opinion is very important to us!</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
