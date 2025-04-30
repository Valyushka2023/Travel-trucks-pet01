import Review from './Review.jsx'; // Створіть окремий компонент для відображення одного відгуку
import PropTypes from 'prop-types';
import css from './ReviewsList.module.css';

const ReviewsList = ({ reviews }) => {
  return (
    <div className={css.reviewsList}>
      <h2>Відгуки</h2>
      <ul>
        {reviews.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </div>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      // Додайте сюди валідацію для інших властивостей об'єкта review, якщо вони використовуються
    })
  ).isRequired,
};

export default ReviewsList;
