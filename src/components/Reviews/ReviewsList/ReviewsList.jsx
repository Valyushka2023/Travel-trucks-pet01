import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Review from '../Review/Review.jsx';
import css from './ReviewsList.module.css';

const ReviewsList = forwardRef(({ reviews }, ref) => {
  return (
    <ul className={css['reviews-list']}>
      {reviews.map((review, index) => {
        const isLastItem = index === reviews.length - 1;

        return (
          <li
            key={review.id || review._id}
            className={`${css['review-item']} ${!isLastItem ? css['with-border'] : ''}`}
            ref={isLastItem ? ref : null}
          >
            <Review review={review} />
          </li>
        );
      })}
    </ul>
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
