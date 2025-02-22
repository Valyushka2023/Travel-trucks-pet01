/* обчислення рейтингу по відгукам */
import React from 'react';
import css from './HeroSection.module.css';

function HeroSection({ camper }) {
    console.log("HeroSection отримав camper:", camper);

    if (!camper) {
        return <div>Loading...</div>;
    }

    let averageRating = 0;
    let reviewCount = 0;

    if (camper.reviews && camper.reviews.length > 0) {
        averageRating = camper.reviews.reduce((sum, review) => sum + (review.reviewer_rating || 0), 0) / camper.reviews.length;
        reviewCount = camper.reviews.length;
    }

    return (
        <div>
            <h2>{camper.name}</h2>
            <div className={css.containerDetail}>
                <div className={css.reviewsLocation}>
                    <div className={css.titleReviews}>
                        <svg className={css.iconStar} width="16" height="16" viewBox="0 0 32 32">
                            <use href="/icons.svg#icon-star"></use>
                        </svg>
                        <p className={css.textReviewsTitle}>
                            {averageRating ? `${averageRating.toFixed(1)} (${reviewCount} Reviews)` : 'No reviews yet'}
                        </p>
                    </div>
                    <div className={css.locationTitle}>
                        <svg className={css.iconMap} width="16" height="16" viewBox="0 0 32 32">
                            <use href="/icons.svg#icon-map"></use>
                        </svg>
                        <p className={css.textLocationTitle}>{camper.location || 'Location not available'}</p>
                    </div>
                </div>
                <div className={css.containerPrice}>
                    <h2 className={css.Price}>€{camper.price ? camper.price.toFixed(2) : 'Price not available'}</h2>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;