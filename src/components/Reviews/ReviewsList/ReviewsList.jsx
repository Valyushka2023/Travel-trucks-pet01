import React from 'react';
import Review from './Review.jsx'; // Створіть окремий компонент для відображення одного відгуку
import css from './ReviewsList.module.css';

const ReviewsList = ({ reviews }) => {
  return (
    <div className={css.reviewsList}>
      <h2>Відгуки</h2>
      <ul>
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;


