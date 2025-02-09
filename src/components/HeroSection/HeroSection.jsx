import React from 'react';
import css from './HeroSection.module.css';

function HeroSection() {
  return (
    <div>
      <h2 className={css.Title}>Mavericks</h2>

      <div className={css.containerDetail}>
        <div className={css.reviewsLocation}>
          <div className={css.titleReviews}>
            <svg
              className={css.iconStar}
              width="16"
              height="16"
              viewBox="0 0 32 32"
            >
              <use href="/icons.svg#icon-star"></use>
            </svg>
            <p className={css.textReviewsTitle}>4.4 (2 Reviews)</p>
          </div>
          <div className={css.locationTitle}>
            <svg
              className={css.iconMap}
              width="16"
              height="16"
              viewBox="0 0 32 32"
            >
              <use href="/icons.svg#icon-map"></use>
            </svg>
            <p className={css.textLocationTitle}>Kyiv, Ukraine</p>
          </div>
        </div>
        <div className={css.containerPrice}>
          <h2 className={css.Price}>€8000.00</h2>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
