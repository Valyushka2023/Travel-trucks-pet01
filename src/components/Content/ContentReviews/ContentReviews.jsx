import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../Header/Header.jsx';
import HeroSection from '../../HeroSection/HeroSection.jsx';
import ImageGallery from '../../Gallery/ImageGallery/ImageGallery.jsx';
import Tabs from '../../Tabs/Tabs.jsx';
import ReviewsList from '../../Reviews/ReviewsList/ReviewsList.jsx';
import FormReview from '../../Forms/FormReview/FormReview.jsx';
import Button from '../../Ui/Button/Button.jsx';
import ScrollToTopButton from '../../Ui/Button/ScrollToTopButton.jsx';
import { useContainerScrollToTopButton } from '../../../hooks/useContainerScrollToTopButton';

import css from './ContentReviews.module.css';

function ContentReviews({ camper, activeTab, reviews, onReviewAdded }) {
  const reviewsContainerRef = useRef(null);
  const lastReviewRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(3);
  const REVIEWS_STEP = 3;

  const camperId = camper._id || camper.id;

  useEffect(() => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollTop = 0;
    }
    setVisibleCount(3);
  }, [camperId]);

  const reviewsWithGuaranteedIds = (reviews || []).map(review => ({
    ...review,
    id: review.id || review._id || uuidv4(),
    rating: typeof review.rating === 'number' ? review.rating : 0,
  }));

  const sortedReviews = [...reviewsWithGuaranteedIds].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < sortedReviews.length;

  const { visible: showScrollTop, scrollToTop } = useContainerScrollToTopButton(
    reviewsContainerRef,
    100
  );

  const isElementFullyVisible = (container, element) => {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return (
      elementRect.top >= containerRect.top &&
      elementRect.bottom <= containerRect.bottom
    );
  };

  const handleReviewAdded = newReview => {
    onReviewAdded(newReview);

    setTimeout(() => {
      if (
        reviewsContainerRef.current &&
        lastReviewRef.current &&
        !isElementFullyVisible(
          reviewsContainerRef.current,
          lastReviewRef.current
        )
      ) {
        lastReviewRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }, 100);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + REVIEWS_STEP);
  };

  const reviewsContainerClasses = [css.blokReviewsForm];
  if (sortedReviews.length > 3 && visibleCount > 3) {
    reviewsContainerClasses.push(css.blokReviewsFormScrollable);
  }

  return (
    <div className={css.container}>
      <div className={css.containerHeader}>
        <Header />
        <div className={css.containerTitle}>
          <HeroSection camper={camper} />
          <ImageGallery gallery={camper.gallery} />
          <div className={css.containerText}>
            <p className={css.text}>{camper.description}</p>
          </div>
        </div>
      </div>

      <Tabs camper={camper} activeTab={activeTab} />

      <div className={css.reviewsForm}>
        <div
          className={reviewsContainerClasses.join(' ')}
          ref={reviewsContainerRef}
        >
          {reviews && reviews.length > 0 ? (
            <>
              <div className={css.reviewsContentWrapper}>
                <ReviewsList reviews={visibleReviews} ref={lastReviewRef} />
              </div>

              <div className={css.loadMoreWrapper}>
                {hasMore ? (
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={handleLoadMore}
                    className={css.loadMoreBtn}
                  >
                    Load more
                  </Button>
                ) : showScrollTop ? (
                  <ScrollToTopButton
                    visible={showScrollTop}
                    onClick={() => {
                      scrollToTop();
                      setTimeout(() => setVisibleCount(3), 500);
                    }}
                    className={css.scrollTopBtn}
                    label="▲"
                  />
                ) : null}
              </div>
            </>
          ) : (
            <p className={css.noReviews}>No reviews yet.</p>
          )}
        </div>

        <FormReview camperId={camperId} onReviewAdded={handleReviewAdded} />
      </div>
    </div>
  );
}

ContentReviews.propTypes = {
  camper: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    gallery: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
    location: PropTypes.string,
  }).isRequired,
  activeTab: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      reviewer_name: PropTypes.string.isRequired,
      rating: PropTypes.number,
      comment: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
    })
  ),
  onReviewAdded: PropTypes.func.isRequired,
};

export default ContentReviews;
