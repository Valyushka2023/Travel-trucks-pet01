import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Review from '../Review/Review.jsx';
import css from './ReviewsList.module.css';

const ReviewsList = forwardRef(({ reviews }, ref) => {
  return (
    <div className={css.listContainer}>
      <ul className={css.reviewsList}>
        {reviews.map((review, index) => (
          <li
            key={review.id || review._id}
            className={css.reviewItem}
            ref={index === reviews.length - 1 ? ref : null}
          >
            <Review review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
});

ReviewsList.displayName = 'ReviewsList';

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _id: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      reviewer_name: PropTypes.string,
      comment: PropTypes.string,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default ReviewsList;
