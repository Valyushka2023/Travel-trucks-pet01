import Header from '../../Header/Header.jsx';
import HeroSection from '../../HeroSection/HeroSection.jsx';
import ImageGallery from '../../Gallery/ImageGallery/ImageGallery.jsx';
import Tabs from '../../Tabs/Tabs.jsx';
import Review from '../../Reviews/Review/Review.jsx';
import FormReview from '../../Forms/FormReview/FormReview.jsx';
import PropTypes from 'prop-types';
import css from './ContentReviews.module.css';

function ContentReviews({ camper, activeTab, reviews, onReviewAdded }) {
  if (!camper) {
    return <div className={css.loader}>Завантаження кемпера...</div>;
  }

  const camperId = camper._id || camper.id;

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
        <div className={css.blokReviewsForm}>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Review key={review._id || index} review={review} />
            ))
          ) : (
            <p className={css.noReviews}>Ще немає відгуків.</p>
          )}
        </div>

        <FormReview camperId={camperId} onReviewAdded={onReviewAdded} />
      </div>

      {/* <div className={css.averageRating}>
                Average Rating: {averageRating.toFixed(2)}
            </div> */}
    </div>
  );
}

ContentReviews.propTypes = {
  camper: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    gallery: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    // Додайте інші властивості об'єкта camper, якщо вони використовуються
  }),
  activeTab: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      // Додайте інші властивості об'єкта review, якщо вони використовуються
    })
  ),
  onReviewAdded: PropTypes.func.isRequired,
};

export default ContentReviews;
