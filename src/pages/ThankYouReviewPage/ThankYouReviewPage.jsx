import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCamperById } from '../../services/api';
import CloseButton from '../../components/Ui/Buttons/CloseButton/CloseButton.jsx';

import css from './ThankYouReviewPage.module.css';

const ThankYouReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { camperId } = location.state || {};

  // const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigate('/catalog');
  };

  // const handleClose = async () => {
  //   setLoading(true);

  //   if (camperId) {
  //     try {
  //       const freshCamper = await fetchCamperById(camperId);
  //       if (freshCamper) {
  //         navigate(`/catalog/${camperId}/reviews`, {
  //           state: { camper: freshCamper },
  //         });
  //       } else {
  //         navigate('/catalog');
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch camper:', error);
  //       navigate('/catalog');
  //     }
  //   } else {
  //     navigate('/catalog');
  //   }

  //   setLoading(false);
  // };
  const handleClose = async () => {
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
        {/* {loading && (
          <div className={css.loaderOverlay}>
            <ClipLoader color="#187ff2" size={40} />
          </div>
        )} */}
      </div>

      <div className={css.feedback}>
        <h1>Thank you for your feedback!</h1>
        <p className={css.text}>Your opinion is very important to us!</p>
      </div>
    </div>
  );
};

export default ThankYouReviewPage;
