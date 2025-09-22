import { useTranslation } from 'react-i18next';import { useRef, useState } from 'react';
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

  // Функція прокрутки до останнього відгуку після додавання нового
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

  const reviewsContainerClasses = [css.blokReviewsForm];
  if (sortedReviews.length > 3) {
    reviewsContainerClasses.push(css.blokReviewsFormScrollable);
  }

  const handleReviewAdded = newReview => {
    onReviewAdded(newReview);
    scrollToLastReview();
  };

  // Оновлена логіка для кнопки "Load more" з авто-прокруткою
  const handleLoadMoreClick = () => {
    const container = reviewsContainerRef.current;

    if (container) {
      // Запам'ятовуємо поточну висоту контейнера перед додаванням нових відгуків
      const prevScrollHeight = container.scrollHeight;

      // Додаємо наступні 3 відгуки
      handleLoadMore();

      // Чекаємо оновлення DOM і прокручуємо контейнер
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;

        container.scrollTo({
          top: container.scrollTop + (newScrollHeight - prevScrollHeight),
          behavior: 'smooth',
        });

        // Показуємо кнопку "підняти вгору"
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

  return (
    <div className={css.container}>
      <Header />
      <div className={css.containerContentReviews}>
        <HeroSection camper={camper} />
        <ImageGallery gallery={camper.gallery} />

        <div className={css.containerText}>
          <p className={css.text}>{camper.description}</p>
        </div>

        <Tabs camper={camper} activeTab={activeTab} />

        <div className={css.listReviewsFormReview}>
          <div className={css.listReviews}>
            <div className={reviewsContainerClasses.join(' ')}>
              {reviews && reviews.length > 0 ? (
                <div className={css.blokListButton}>
                  <div
                    className={css.reviewsContentWrapper}
                    ref={reviewsContainerRef}
                  >
                    <ReviewsList reviews={visibleReviews} ref={lastReviewRef} />
                  </div>

                  {hasMore && (
                    <div className={css.buttonsWrapper}>
                      <Button
                        variant="primary"
                        size="medium"
                        onClick={handleLoadMoreClick}
                        className={css.loadMoreBtn}
                      >
                        {t('load_button', { ns: 'button' })}
                      </Button>
                    </div>
                  )}

                  {showScrollToTop && (
                    <div className={css.buttonsWrapper}>
                      <div
                        onClick={handleScrollToTop}
                        className={`${css.scrollToTopBtn} ${css.visible}`}
                      >
                        <div className={css.triangle}></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className={css.noReviews}>No reviews yet</p>
              )}
            </div>
          </div>

          <div className={css.containerFormReview}>
            <FormReview camperId={camperId} onReviewAdded={handleReviewAdded} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentReviews;
