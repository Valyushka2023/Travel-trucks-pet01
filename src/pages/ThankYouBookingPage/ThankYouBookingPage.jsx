import { useNavigate, useLocation, Link } from 'react-router-dom';
import CloseButton from '../../components/Ui/Buttons/CloseButton/CloseButton.jsx';
import Loader from '../../components/Ui/Loader/Loader.jsx';
import css from './ThankYouBookingPage.module.css';

const ThankYouBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { camperId, camper } = location.state || {};

  const handleClose = () => {
    if (camperId && camper) {
      navigate(`/catalog/${camperId}`, { state: { camper } });
    } else {
      navigate('/catalog');
    }
  };

  return (
    <div className={css.container}>
      <div className={css.buttonsContainer}>
        <Link to="/catalog" className={css.goBackLink}>
          &lt; Повернутись до каталогу
        </Link>

        <CloseButton
          onClick={handleClose}
          className={css.pageCloseButton}
          ariaLabel="Закрити сторінку"
        />
      </div>

      <div className={css.feedback}>
        <h1>Your booking request has been received!</h1>
        <p className={css.text}>
          Our team will contact you shortly to confirm your booking details.
        </p>
      </div>

      {loading && <Loader type="overlay" />}
    </div>
  );
};

export default ThankYouBookingPage;
