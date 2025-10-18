import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCamperById } from '../../services/api';
import CloseButton from '../../components/Ui/Buttons/CloseButton/CloseButton.jsx';
import Loader from '../../components/Ui/Loader/Loader.jsx';
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
    if (camperId) {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    } else {
      navigate('/catalog');
    }
  };
  return (
    <div className={css['container-page']}>
      <div className={css['buttons-container']}>
        <button onClick={handleGoBack} className={css['go-back-link']}>
          &lt; &nbsp; Go back to catalog
        </button>
        <CloseButton
          onClick={handleClose}
          className={css['page-close-button']}
          ariaLabel="Close page"
        />
        {loading && <Loader type="overlay" />}
      </div>

      <div className={css.feedback}>
        <h1>Thank you for your feedback!</h1>
        <p className={css.text}>Your opinion is very important to us!</p>
      </div>
    </div>
  );
};

export default ThankYouReviewPage;
