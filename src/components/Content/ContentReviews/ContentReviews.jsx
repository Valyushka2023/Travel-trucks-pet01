import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types'; // ✅ ДОДАНО: Імпорт PropTypes
import { useReviewsPagination } from '../../../hooks/useReviewsPagination.js';
import Header from '../../Header/Header.jsx';
import HeroSection from '../../HeroSection/HeroSection.jsx';
import ImageGallery from '../../Gallery/ImageGallery/ImageGallery.jsx';
import Tabs from '../../Tabs/Tabs.jsx';
import ReviewsList from '../../Reviews/ReviewsList/ReviewsList.jsx';
import FormReview from '../../Forms/FormReview/FormReview.jsx';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import css from './ContentReviews.module.css';

function ContentReviews({ camper, activeTab, reviews, onReviewAdded }) {
  const { t } = useTranslation();
  const camperId = camper._id || camper.id;

  const reviewsContainerRef = useRef(null);
  const lastReviewRef = useRef(null);

  const {
    visibleReviews,
    hasMore,
    handleLoadMore,
    sortedReviews,
    resetPagination,
  } = useReviewsPagination(reviews, camperId);

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollToLastReview = () => {
    setTimeout(() => {
      if (
        reviewsContainerRef.current &&
        lastReviewRef.current &&
        lastReviewRef.current.offsetTop >
          reviewsContainerRef.current.offsetHeight
      ) {
        reviewsContainerRef.current.scrollTo({
          top: reviewsContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const reviewsContainerClasses = [css['blok-reviews-form']];
  if (sortedReviews.length > 3) {
    reviewsContainerClasses.push(css['blok-reviews-form-scrollable']);
  }

  const handleReviewAdded = newReview => {
    onReviewAdded(newReview);
    scrollToLastReview();
  };

  const handleLoadMoreClick = () => {
    const container = reviewsContainerRef.current;

    if (container) {
      const prevScrollHeight = container.scrollHeight;

      handleLoadMore();

      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;

        container.scrollTo({
          top: container.scrollTop + (newScrollHeight - prevScrollHeight),
          behavior: 'smooth',
        });

        setShowScrollToTop(true);
      }, 100);
    }
  };

  const handleScrollToTop = () => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setShowScrollToTop(false);
      resetPagination();
    }
  };

  // Хелпер для обробки клавіатури на кнопці "Scroll to Top"
  const handleScrollToTopKeyPress = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleScrollToTop();
    }
  };

  return (
    <div className={css.container}>
      <Header />
      <div className={css['container-content-reviews']}>
        <HeroSection camper={camper} />
        <ImageGallery gallery={camper.gallery} />

        <div className={css['container-text']}>
          <p className={css.text}>{camper.description}</p>
        </div>

        <Tabs camper={camper} activeTab={activeTab} />

        <div className={css['list-reviews-form-review']}>
          <div className={css['list-reviews']}>
            <div className={reviewsContainerClasses.join(' ')}>
              {reviews && reviews.length > 0 ? (
                <div className={css['blokL-list-button']}>
                  <div
                    className={css['reviews-content-wrapper']}
                    ref={reviewsContainerRef}
                  >
                    <ReviewsList reviews={visibleReviews} ref={lastReviewRef} />
                  </div>

                  {hasMore && (
                    <div className={css['buttons-wrapper']}>
                      <Button
                        variant="primary"
                        size="medium"
                        onClick={handleLoadMoreClick}
                        className={css['load-more-btn']}
                      >
                        {t('load_button', { ns: 'button' })}
                      </Button>
                    </div>
                  )}

                  {showScrollToTop && (
                    <div className={css['buttons-wrapper']}>
                      <div
                        onClick={handleScrollToTop}
                        // ✅ A11y Fix: Додаємо role, tabIndex та onKeyDown (Рядок ~149)
                        role="button"
                        tabIndex={0}
                        onKeyDown={handleScrollToTopKeyPress}
                        className={`${css['scroll-to-top-btn']} ${css.visible}`}
                      >
                        <div className={css.triangle}></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className={css['no-reviews']}>No reviews yet</p>
              )}
            </div>
          </div>

          <div className={css['container-form-review']}>
            <FormReview camperId={camperId} onReviewAdded={handleReviewAdded} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ ВИПРАВЛЕННЯ: Додано propTypes для всіх використовуваних пропсів
ContentReviews.propTypes = {
  // Пропс camper та його вкладені поля (_id, id, gallery, description)
  camper: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    gallery: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
      .isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,

  // Пропс reviews (який перевіряється на length)
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,

  // Пропс activeTab
  activeTab: PropTypes.string.isRequired,

  // Пропс onReviewAdded
  onReviewAdded: PropTypes.func.isRequired,
};

export default ContentReviews;
