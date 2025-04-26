



import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCamper, selectCurrentCamper } from '../../redux/campers/slice.js';
import ContentReviews from '../../components/Content/ContentReviews/Content.Reviews.jsx';
import { fetchCampers } from '../../services/api.js';
import css from './PageReviews.module.css';

function PageReviews() {
    const dispatch = useDispatch();
    const { _id } = useParams();
    const location = useLocation();
    const context = useOutletContext();
    const reduxCamper = useSelector(selectCurrentCamper);

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
                localStorage.setItem(`camper_${_id}`, JSON.stringify(location.state.camper));
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
                            localStorage.setItem(`camper_${_id}`, JSON.stringify(response[0]));
                        } else {
                            setError("Camper not found.");
                        }
                    } catch (err) {
                        setError(err.message || "Помилка при завантаженні кемпера.");
                    } finally {
                        setIsLoading(false);
                    }
                } else {
                    setError("Camper ID не вказаний.");
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
        }
    }, [camper]);

    const calculateAverageRating = (reviewsData) => {
        if (!reviewsData || reviewsData.length === 0) {
            setAverageRating(0);
            return;
        }

        const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0); // Використовуйте review.rating
        const average = totalRating / reviewsData.length;
        setAverageRating(average);
    };

    const handleReviewAdded = (newReview) => {
        try {
            const updatedReviews = [...reviews, newReview];
            setReviews(updatedReviews);
            calculateAverageRating(updatedReviews);

            const updatedCamper = { ...camper, reviews: updatedReviews };
            setCamperState(updatedCamper);
            dispatch(setCamper(updatedCamper));
            localStorage.setItem(`camper_${_id}`, JSON.stringify(updatedCamper));
        } catch (err) {
            setError(err.message || "Помилка при додаванні відгуку.");
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