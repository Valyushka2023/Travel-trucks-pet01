// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { fetchCamperById } from '../../services/api';
// import { ClipLoader } from 'react-spinners';
// import css from './ThankYouReviewPage.module.css';

// const ThankYouReviewPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { camperId } = location.state || {};

//   const [loading, setLoading] = useState(false);

//   const handleGoBack = () => {
//     navigate('/catalog');
//   };

//   const handleClose = async () => {
//     setLoading(true);

//     if (camperId) {
//       try {
//         const freshCamper = await fetchCamperById(camperId);
//         if (freshCamper) {
//           navigate(`/catalog/${camperId}/reviews`, {
//             state: { camper: freshCamper },
//           });
//         } else {
//           navigate('/catalog');
//         }
//       } catch (error) {
//         console.error('Failed to fetch camper:', error);
//         navigate('/catalog');
//       }
//     } else {
//       navigate('/catalog');
//     }

//     setLoading(false);
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
//         <h1>Thank you for your feedback!</h1>
//         <p className={css.text}>Your opinion is very important to us!</p>
//         {loading && <ClipLoader color="#187ff2" size={40} />}
//       </div>
//     </div>
//   );
// };

// export default ThankYouReviewPage;
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCamperById } from '../../services/api';
import { ClipLoader } from 'react-spinners';

// Імпортуємо новий компонент CloseButton
import CloseButton from '../../components/Ui/Button/CloseButton.jsx';

import css from './ThankYouReviewPage.module.css';

const ThankYouReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { camperId } = location.state || {};

  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigate('/catalog');
  };

  const handleClose = async () => {
    setLoading(true);

    if (camperId) {
      try {
        const freshCamper = await fetchCamperById(camperId);
        if (freshCamper) {
          navigate(`/catalog/${camperId}/reviews`, {
            state: { camper: freshCamper },
          });
        } else {
          navigate('/catalog');
        }
      } catch (error) {
        console.error('Failed to fetch camper:', error);
        navigate('/catalog');
      }
    } else {
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
          &lt; Go back to catalog
        </button>
        {/* Використовуємо компонент CloseButton */}
        <CloseButton
          onClick={handleClose}
          className={css.pageCloseButton}
          ariaLabel="Close page"
        />
        {loading && (
          <div className={css.loaderOverlay}>
            <ClipLoader color="#187ff2" size={40} />
          </div>
        )}
      </div>

      <div className={css.feedback}>
        <h1>Thank you for your feedback!</h1>
        <p className={css.text}>Your opinion is very important to us!</p>
      </div>
    </div>
  );
};

export default ThankYouReviewPage;
