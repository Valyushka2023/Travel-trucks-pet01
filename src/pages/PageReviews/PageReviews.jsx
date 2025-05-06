import { useEffect, useState } from 'react';
import {
  useParams,
  useOutletContext,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCamper } from '../../redux/campers/slice.js';
import ContentReviews from '../../components/Content/ContentReviews/ContentReviews.jsx';
import { fetchCampers, sendReview } from '../../services/api.js'; // Переконайтеся, що sendReview експортовано
import css from './PageReviews.module.css';

function PageReviews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const location = useLocation();
  const context = useOutletContext();
  // const reduxCamper = useSelector(selectCurrentCamper);

  const [camper, setCamperState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadCamper = async () => {
      if (context?.camper) {
        setCamperState(context.camper);
        localStorage.setItem(`camper_${_id}`, JSON.stringify(context.camper));
      } else if (location?.state?.camper) {
        setCamperState(location.state.camper);
        localStorage.setItem(
          `camper_${_id}`,
          JSON.stringify(location.state.camper)
        );
      } else {
        const storedCamper = localStorage.getItem(`camper_${_id}`);
        if (storedCamper) {
          setCamperState(JSON.parse(storedCamper));
        } else if (_id) {
          try {
            setIsLoading(true);
            const response = await fetchCampers({ id: _id });
            if (response?.length > 0) {
              setCamperState(response[0]);
              localStorage.setItem(
                `camper_${_id}`,
                JSON.stringify(response[0])
              );
            } else {
              setError('Camper not found.');
            }
          } catch (err) {
            setError(err.message || 'Помилка при завантаженні кемпера.');
          } finally {
            setIsLoading(false);
          }
        } else {
          setError('Camper ID не вказаний.');
        }
      }
    };

    loadCamper();
  }, [_id, context, location]);

  useEffect(() => {
    if (camper) {
      const camperReviews = camper.reviews || [];
      setReviews(camperReviews);
      calculateAverageRating(camperReviews);
      dispatch(setCamper(camper)); // Оновлюємо Redux store при завантаженні кемпера
    }
  }, [camper, dispatch]);

  const calculateAverageRating = reviewsData => {
    if (!reviewsData || reviewsData.length === 0) {
      setAverageRating(0);
      return;
    }

    const totalRating = reviewsData.reduce(
      (sum, review) => sum + review.reviewer_rating,
      0
    );
    const average = totalRating / reviewsData.length;
    setAverageRating(average);
  };

  const handleReviewAdded = async newReviewData => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await sendReview({ camperId: _id, ...newReviewData });

      if (response?.camper) {
        setReviews(response.camper.reviews); // Оновлюємо всі відгуки з відповіді
        setAverageRating(response.camper.rating);
        setCamperState(response.camper);
        dispatch(setCamper(response.camper));
        localStorage.setItem(`camper_${_id}`, JSON.stringify(response.camper));
        navigate('/thank-you');
      } else {
        setError('Помилка при додаванні відгука та оновленні даних.');
      }
    } catch (err) {
      setError(err.message || 'Помилка при відправці відгука.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={css.loaderContainer}>
        <ClipLoader color="#36D7B7" size={50} />
      </div>
    );
  }

  if (error) {
    return <div className={css.error}>Помилка: {error}</div>;
  }

  if (!camper) {
    return <div className={css.error}>Camper не знайдено</div>;
  }

  return (
    <ContentReviews
      camper={camper}
      activeTab="reviews"
      averageRating={averageRating}
      reviews={reviews}
      onReviewAdded={handleReviewAdded}
    />
  );
}

export default PageReviews;
