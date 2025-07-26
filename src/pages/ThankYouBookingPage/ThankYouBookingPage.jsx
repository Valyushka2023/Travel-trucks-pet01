// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { fetchCamperById } from '../../services/api';
// import { ClipLoader } from 'react-spinners';
// import css from './ThankYouBookingPage.module.css';

// const ThankYouBookingPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { camperId } = location.state || {};

//   const [loading, setLoading] = useState(false);

//   const handleGoBack = () => {
//     navigate('/catalog');
//   };
//   const handleClose = () => {
//     navigate(`/catalog/${camperId}`);
//   };

//   return (
//     <div className={css.container}>
//       <div className={css.buttons}>
//         <button onClick={handleGoBack} className={css.goBackLink}>
//           &lt; Go back to catalog
//         </button>
//         <button
//           onClick={handleClose}
//           className={css.closeButton}
//           disabled={loading}
//         >
//           &times;
//         </button>
//       </div>

//       <div className={css.feedback}>
//         <h1>Your booking request has been received!</h1>

//         <p className={css.text}>
//           Our team will contact you shortly to confirm your booking details.
//         </p>
//         {loading && <ClipLoader color="#187ff2" size={40} />}
//       </div>
//     </div>
//   );
// };

// export default ThankYouBookingPage;

// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { fetchCamperById } from '../../services/api';
// import { ClipLoader } from 'react-spinners';
// import css from './ThankYouBookingPage.module.css';

// const ThankYouBookingPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   // Отримуємо camperId зі стану location.state, який має бути переданий з FormBooking
//   const { camperId } = location.state || {};

//   const [loading, setLoading] = useState(false);

//   // Функція для повернення на загальний каталог
//   const handleGoBack = () => {
//     navigate('/catalog');
//   };

//   // Функція для закриття та повернення на сторінку деталей конкретного кемпера
//   const handleClose = async () => {
//     setLoading(true); // Встановлюємо стан завантаження, поки чекаємо дані

//     if (camperId) {
//       try {
//         // Отримуємо свіжі дані кемпера за його ID з API
//         const freshCamper = await fetchCamperById(camperId);
//         if (freshCamper) {
//           // Якщо дані успішно отримані, виконуємо навігацію:
//           // 1. Використовуємо шаблонний рядок (` `) для коректного вбудовування camperId в URL.
//           // 2. Передаємо отриманий об'єкт 'freshCamper' через location.state,
//           //    щоб сторінка деталей могла використовувати ці дані без додаткових запитів.
//           navigate(`/catalog/${camperId}`, {
//             state: { camper: freshCamper },
//           });
//         } else {
//           // Якщо camperId був, але API не повернуло дані (наприклад, кемпер не знайдено),
//           // повертаємо на загальний каталог як запасний варіант.
//           console.warn(
//             `Camper with ID ${camperId} not found. Navigating to catalog.`
//           );
//           navigate('/catalog');
//         }
//       } catch (error) {
//         // Обробка будь-яких помилок під час виконання API-запиту
//         console.error('Failed to fetch camper data:', error);
//         navigate('/catalog'); // У випадку помилки теж на загальний каталог
//       }
//     } else {
//       // Якщо camperId взагалі не був переданий до сторінки подяки (чого не повинно бути),
//       // повертаємо на загальний каталог.
//       console.warn(
//         'Camper ID not found in location state. Navigating to catalog.'
//       );
//       navigate('/catalog');
//     }

//     setLoading(false); // Знімаємо стан завантаження
//   };

//   return (
//     <div className={css.container}>
//       <div className={css.buttons}>
//         <button onClick={handleGoBack} className={css.goBackLink}>
//           &lt; Повернутись до каталогу
//         </button>
//         <button
//           onClick={handleClose}
//           className={css.closeButton}
//           disabled={loading}
//         >
//           {loading ? <ClipLoader color="#ffffff" size={15} /> : <> &times; </>}
//         </button>
//       </div>

//       <div className={css.feedback}>
//         <h1>Ваш запит на бронювання отримано!</h1>

//         <p className={css.text}>
//           Наша команда зв'яжеться з вами найближчим часом, щоб підтвердити
//           деталі бронювання.
//         </p>
//         {/* Якщо ви хочете додатковий спінер, окрім того, що в кнопці, можете залишити цей рядок */}
//         {loading && <ClipLoader color="#187ff2" size={40} />}
//       </div>
//     </div>
//   );
// };

// export default ThankYouBookingPage;
// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ClipLoader } from 'react-spinners';
// import css from './ThankYouBookingPage.module.css';

// const ThankYouBookingPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { camperId, camper } = location.state || {};
//   const [loading, setLoading] = useState(false);

//   const handleGoBack = () => {
//     navigate('/catalog');
//   };

//   const handleClose = () => {
//     setLoading(true);

//     if (camperId && camper) {
//       navigate(`/catalog/${camperId}`, {
//         state: { camper },
//       });
//     } else {
//       // Якщо camper не передано, повертаємось на каталог
//       navigate('/catalog');
//     }

//     setLoading(false);
//   };

//   return (
//     <div className={css.container}>
//       <div className={css.buttons}>
//         <button onClick={handleGoBack} className={css.goBackLink}>
//           &lt; Повернутись до каталогу
//         </button>
//         <button
//           onClick={handleClose}
//           className={css.closeButton}
//           disabled={loading}
//         >
//           {loading ? <ClipLoader color="#ffffff" size={15} /> : <> &times; </>}
//         </button>
//       </div>

//       <div className={css.feedback}>
//         <h1>Ваш запит на бронювання отримано!</h1>
//         <p className={css.text}>
//           Наша команда зв'яжеться з вами найближчим часом, щоб підтвердити
//           деталі бронювання.
//         </p>
//         {loading && <ClipLoader color="#187ff2" size={40} />}
//       </div>
//     </div>
//   );
// };

// export default ThankYouBookingPage;
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

// Імпортуємо новий компонент CloseButton
import CloseButton from '../../components/Ui/Button/CloseButton.jsx';

import css from './ThankYouBookingPage.module.css';

const ThankYouBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { camperId, camper } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigate('/catalog');
  };

  const handleClose = async () => {
    // Зробимо асинхронною, якщо потрібно для loading
    setLoading(true);

    if (camperId && camper) {
      navigate(`/catalog/${camperId}`, {
        state: { camper },
      });
    } else {
      // Якщо camper не передано, повертаємось на каталог
      navigate('/catalog');
    }

    setLoading(false);
  };

  return (
    <div className={css.container}>
      <div className={css.buttonsContainer}>
        {' '}
        {/* Перейменував клас для ясності */}
        <button onClick={handleGoBack} className={css.goBackLink}>
          &lt; Повернутись до каталогу
        </button>
        {/* Використовуємо компонент CloseButton */}
        <CloseButton
          onClick={handleClose}
          className={css.pageCloseButton}
          ariaLabel="Закрити сторінку"
          // Якщо потрібен індикатор завантаження всередині кнопки,
          // доведеться додати пропс для рендерингу ClipLoader
          // або стилізувати ClipLoader окремо. Для простоти, залишимо його зовні.
        >
          {/* ClipLoader буде відображатися всередині CloseButton,
              якщо ви модифікуєте CloseButton для прийому children.
              Якщо ні, то логіку з loading потрібно буде обробляти окремо,
              або просто приховувати кнопку під час завантаження.
              Для даного варіанту я залишу ClipLoader за межами CloseButton, 
              якщо кнопка не модифікована для відображення children.
              Ваша поточна CloseButton не приймає children, тому так. */}
        </CloseButton>
        {loading && (
          <div className={css.loaderOverlay}>
            {' '}
            {/* Додамо оверлей для спіннера */}
            <ClipLoader color="#187ff2" size={40} />
          </div>
        )}
      </div>

      <div className={css.feedback}>
        <h1>Ваш запит на бронювання отримано!</h1>
        <p className={css.text}>
          Наша команда зв'яжеться з вами найближчим часом, щоб підтвердити
          деталі бронювання.
        </p>
      </div>
    </div>
  );
};

export default ThankYouBookingPage;
