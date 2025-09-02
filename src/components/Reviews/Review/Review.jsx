import Avatar from '../../Ui/Avatars/Avatar.jsx';
import PropTypes from 'prop-types';

import css from './Review.module.css';

function Review({ review }) {
  if (!review) {
    return <p className={css.noReview}>Review data is not available.</p>;
  }

  const reviewerName = review.reviewer_name || review['reviewer name'];
  const reviewText = review.review_text || review.comment;
  const reviewerRating = review.reviewer_rating ?? 0;
  const createdAt = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Unknown date';

  const renderStars = rating => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? css.filledStar : css.emptyStar}>
        ★
      </span>
    ));
  };

  return (
    <div className={css.reviewContainer}>
      <div className={css.reviewHeader}>
        <Avatar name={reviewerName} />
        <div className={css.reviewNameRating}>
          <div className={css.reviewerName}>{reviewerName || 'Anonymous'}</div>
          <div className={css.reviewRating}>{renderStars(reviewerRating)}</div>
        </div>
        <div className={css.reviewDate}>{createdAt}</div>
      </div>

      {reviewText?.trim() && (
        <div className={css.reviewComment}>{reviewText}</div>
      )}
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.shape({
    reviewer_name: PropTypes.string,
    'reviewer name': PropTypes.string,
    review_text: PropTypes.string,
    comment: PropTypes.string,
    reviewer_rating: PropTypes.number,
    createdAt: PropTypes.string,
  }),
};

export default Review;
