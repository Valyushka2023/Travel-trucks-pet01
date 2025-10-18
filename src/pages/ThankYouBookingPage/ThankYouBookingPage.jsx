import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import CloseButton from '../../components/Ui/Buttons/CloseButton/CloseButton.jsx';
import Loader from '../../components/Ui/Loader/Loader.jsx';
import css from './ThankYouBookingPage.module.css';

const ThankYouBookingPage = () => {
  const { t } = useTranslation('thank_you_booking_page');
  const navigate = useNavigate();
  const location = useLocation();

  const { camperId, camper } = location.state || {};
  const [loading] = useState(false);
  const handleClose = () => {
    if (camperId && camper) {
      navigate(`/catalog/${camperId}`, { state: { camper } });
    } else {
      navigate('/catalog');
    }
  };

  return (
    <div className={css['container-page']}>
      <div className={css['buttons-container']}>
        <Link to="/catalog" className={css['go-back-link']}>
          &lt; &nbsp; {t('go_back_link')}
        </Link>

        <CloseButton
          onClick={handleClose}
          className={css['page-close-button']}
          ariaLabel="Close page"
        />
      </div>

      <div className={css.feedback}>
        <h1 className={css['title-feedback']}>{t('title_feedback')}</h1>
        <p className={css['text-feedback']}>{t('text_feedback')}</p>
      </div>

      {loading && <Loader type="overlay" />}
    </div>
  );
};

export default ThankYouBookingPage;
