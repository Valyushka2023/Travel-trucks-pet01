import React from 'react';
import css from './Review.module.css';

function Review({ review }) {
    if (!review) {
        return <p className={css.noReview}>Review data is not available.</p>;
    }

    // Уніфікуємо назви властивостей
    const reviewerName = review.reviewer_name || review['reviewer name'];
    const reviewText = review.review_text || review.comment;
    const reviewerRating = review.reviewer_rating; // Отримуємо рейтинг

    console.log("Review object:", JSON.stringify(review, null, 2));
    console.log("Review object:", review);
    console.log("Review text:", reviewText);
    console.log("Review rating:", reviewerRating); // Додаємо лог рейтингу

    const renderStars = (rating) => {
        console.log("Rating in renderStars:", rating); // Додаємо лог рейтингу в renderStars
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

    const getInitials = (name) => {
        if (!name) return '?';
        const initials = name
            .split(' ')
            .map((word) => word[0])
            .join('');
        return initials.toUpperCase();
    };

    const initials = getInitials(reviewerName);

    return (
        <div className={css.review}>
            <div className={css.reviewIconNameRating}>
                <svg className={css['icon-user']} viewBox="0 0 32 32">
                    <use href="/icons.svg#icon-user"></use>
                    <text x="16" y="19" textAnchor="middle" dominantBaseline="middle" className={css.initials}>
                        {initials}
                    </text>
                </svg>
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
