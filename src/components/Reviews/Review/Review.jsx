

import React from 'react';
import Avatar from '../../Ui/Avatar/Avatar.jsx';
import css from './Review.module.css';

function Review({ review }) {
    if (!review) {
        return <p className={css.noReview}>Review data is not available.</p>;
    }

    const reviewerName = review.reviewer_name || review['reviewer name'];
    const reviewText = review.review_text || review.comment;
    const reviewerRating = review.reviewer_rating;

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? css.filledStar : css.emptyStar}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className={css.review}>
            <div className={css.reviewIconNameRating}>
                <Avatar name={reviewerName} />
                <div className={css.reviewNameRating}>
                    <div className={css.reviewerName}>{reviewerName || 'Anonymous'}</div>
                    <div className={css.reviewRating}>
                        {reviewerRating !== undefined ? renderStars(reviewerRating) : renderStars(0)}
                    </div>
                </div>
            </div>
            <div className={css.reviewComment}>{reviewText || 'No comment provided.'}</div>
        </div>
    );
}

export default Review;