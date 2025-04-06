
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCamper, selectCurrentCamper } from '../../redux/campers/slice.js';
import ContentReviews from '../../components/Content/ContentReviews/Content.Reviews.jsx';
import { fetchCampers, sendReview } from '../../services/api.js';
import css from './PageReviews.module.css';

function PageReviews() {
    const dispatch = useDispatch();
    const { _id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [camper, setCamperState] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const reduxCamper = useSelector(selectCurrentCamper);
    const context = useOutletContext();

    useEffect(() => {
        if (context && context.camper) {
            setCamperState(context.camper);
            localStorage.setItem(`camper_${_id}`, JSON.stringify(context.camper)); // Зберігаємо в localStorage
        } else if (location.state && location.state.camper) {
            setCamperState(location.state.camper);
            localStorage.setItem(`camper_${_id}`, JSON.stringify(location.state.camper)); // Зберігаємо в localStorage
        } else {
            const storedCamper = localStorage.getItem(`camper_${_id}`);
            if (storedCamper) {
                setCamperState(JSON.parse(storedCamper)); // Отримуємо з localStorage
            } else {
                if (!_id) {
                    setError("ID кемпера не заданий.");
                    setIsLoading(false);
                    return;
                }

                const loadCamperData = async () => {
                    // ... (логіка завантаження даних)
                };

                loadCamperData();
            }
        }
    }, [_id, dispatch, reduxCamper, context, location.state]);

    useEffect(() => {
        if (camper) {
            setReviews(camper.reviews || []);
            calculateAverageRating(camper.reviews || []);
        }
    }, [camper]);

    const calculateAverageRating = (reviewsData) => {
        if (!reviewsData || reviewsData.length === 0) {
            setAverageRating(0);
            return;
        }
        const totalRating = reviewsData.reduce((sum, review) => sum + review.reviewer_rating, 0);
        const average = totalRating / reviewsData.length;
        setAverageRating(average);
    };



    const handleReviewAdded = async (newReview) => {
        setIsLoading(true);
        try {
            const response = await sendReview(newReview);
            if (response) {
                const updatedReviews = [...reviews, response];
                setReviews(updatedReviews);
                calculateAverageRating(updatedReviews);

                const updatedCamper = { ...camper, reviews: updatedReviews };
                setCamperState(updatedCamper);
                dispatch(setCamper(updatedCamper));
                localStorage.setItem(`camper_${_id}`, JSON.stringify(updatedCamper));
            } else {
                setError("Не вдалося додати відгук. Спробуйте ще раз.");
            }
        } catch (error) {
            setError(error.message);
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
        return <div>Camper not found</div>;
    }

    return (
        <div>
            {camper && (
                <>
                    {console.log("Camper data in PageReviews:", camper)}
                    <ContentReviews
                        camper={camper}
                        activeTab="reviews"
                        averageRating={averageRating}
                        reviews={reviews}
                        onReviewAdded={handleReviewAdded}
                       
                    />
                </>
            )}
           
        </div>
    );
}

export default PageReviews;




