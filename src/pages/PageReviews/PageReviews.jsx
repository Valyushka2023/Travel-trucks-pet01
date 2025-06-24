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
import { fetchCampers, sendReview } from '../../services/api.js';

import ContentReviews from '../../components/Content/ContentReviews/ContentReviews.jsx';
import ScrollToTopButton from '../../components/Ui/Button/ScrollToTopButton.jsx';
import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton.jsx';

import scrollToTopButtonCss from '../../components/Ui/Button/ScrollToTopButton.module.css';
import css from './PageReviews.module.css';

function PageReviews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const location = useLocation();
  const context = useOutletContext();

  const [camper, setCamperState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const { visible: showScrollButton, scrollToTop } =
    useWindowScrollToTopButton(300);

  useEffect(() => {
    async function loadCamper() {
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
            setError(err.message || 'Error loading camper.');
          } finally {
            setIsLoading(false);
          }
        } else {
          setError('Camper ID не вказаний.');
        }
      }
    }
    loadCamper();
  }, [_id, context, location]);

  useEffect(() => {
    if (camper) {
      const camperReviews = camper.reviews || [];
      setReviews(camperReviews);
      calculateAverageRating(camperReviews);
      dispatch(setCamper(camper));
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
    setAverageRating(totalRating / reviewsData.length);
  };

  const handleReviewAdded = async newReviewData => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await sendReview({ camperId: _id, ...newReviewData });

      if (response?.camper) {
        setCamperState(response.camper);
        setReviews(response.camper.reviews);
        setAverageRating(response.camper.rating);
        dispatch(setCamper(response.camper));
        localStorage.setItem(`camper_${_id}`, JSON.stringify(response.camper));

        navigate('/thank-you', { state: { camperId: _id } });
      } else {
        setError('Error adding review and updating data.');
      }
    } catch (err) {
      setError(err.message || 'Error sending feedback.');
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
    return <div className={css.error}>Error: {error}</div>;
  }

  if (!camper) {
    return <div className={css.error}>Camper not found</div>;
  }

  return (
    <div>
      <ContentReviews
        camper={camper}
        activeTab="reviews"
        averageRating={averageRating}
        reviews={reviews}
        onReviewAdded={handleReviewAdded}
      />

      <ScrollToTopButton
        visible={showScrollButton}
        onClick={scrollToTop}
        className={scrollToTopButtonCss.fixedPosition}
        label="Up"
      />
    </div>
  );
}

export default PageReviews;
