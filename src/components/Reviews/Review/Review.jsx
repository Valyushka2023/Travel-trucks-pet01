import Avatar from '../../Ui/Avatar/Avatar.jsx';
import PropTypes from 'prop-types';

import css from './Review.module.css';

function Review({ review }) {
  if (!review) {
    return <p className={css.noReview}>Review data is not available.</p>;
  }

  const reviewerName = review.reviewer_name || review['reviewer name'];
  const reviewText = review.review_text || review.comment;
  const reviewerRating = review.reviewer_rating;
  const createdAt = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Unknown date';

  const renderStars = rating => {
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
    <div className={css.reviewContainer}>
      <div className={css.reviewHeader}>
        <Avatar name={reviewerName} />
        <div className={css.reviewNameRating}>
          <div className={css.reviewerName}>{reviewerName || 'Anonymous'}</div>
          <div className={css.reviewRating}>
            {renderStars(reviewerRating ?? 0)}
          </div>
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
    _id: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default Review;
