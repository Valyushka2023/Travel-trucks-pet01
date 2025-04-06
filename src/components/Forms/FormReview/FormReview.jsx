

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Button from '../../Ui/Button/Button.jsx';
import css from './FormReview.module.css';

const FormReview = ({ camperId, onReviewAdded }) => {
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setNewReview({ ...newReview, rating: newRating });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!camperId) {
      setError('Camper ID is missing.');
      setIsLoading(false);
      return;
    }

    console.log("Camper ID in FormReview:", camperId); // Додаємо лог

    try {
      console.log('Sending review data:', { ...newReview, camperId });
      const response = await axios.post('http://localhost:5000/api/reviews', {
        ...newReview,
        id: uuidv4(),
        camperId,
      });

      console.log('Server response:', response);

      if (response.status === 201) {
        console.log('Review submitted successfully!');
        onReviewAdded({ ...newReview, id: uuidv4() });
        setNewReview({ name: '', email: '', rating: 5, comment: '' });
      } else {
        setError(`Error submitting review: ${response.status} - ${response.data.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(`Error submitting review: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${css.star} ${i <= newReview.rating ? css.filled : ''}`}
          onClick={() => handleRatingChange(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

   return (
    <div className={css.form}>
      <div className={css.titleForm}>
        <h3 className={css.textTitleForm}>Submit your review now</h3>
        <p className={css.textForm}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <div className={css.inputs}>
        <div className={css.inputForm}>
          <div className={css.fieldForm}>
            <label htmlFor="user-name-input" className={css.label}>
              Name*
            </label>
            <input
              id="user-name-input"
              name="name"
              type="text"
              className={css.modalInput}
              value={newReview.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={css.fieldForm}>
            <label htmlFor="user-email-input" className={css.label}>
              Email*
            </label>
            <input
              id="user-email-input"
              name="email"
              type="email"
              className={css.modalInput}
              value={newReview.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={css.fieldForm}>
            <label htmlFor="user-rating-input" className={css.label}>
              Rating*
            </label>
             <div className={css.stars}>{renderStars()}</div>
          </div>
          <div className={css.fieldArea}>
            <label htmlFor="user-comment" className={css.label}>
              Comment
            </label>
            <textarea
              id="user-comment"
              name="comment"
              placeholder="Text input"
              className={css.modalTextArea}
              value={newReview.comment}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={css.elementSubmit}>
          <Button
            variant="primary"
            size="medium"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Відправка...' : 'Submit'}
          </Button>
          {error && <p className={css.errorMessage}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FormReview;
