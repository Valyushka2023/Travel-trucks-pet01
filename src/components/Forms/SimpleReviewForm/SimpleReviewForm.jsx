import React, { useState } from 'react';
import Button from '../../Ui/Button/Button.jsx';

const SimpleReviewForm = ({ camperId, onReviewAdded }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!comment || !camperId) {
      console.error('Коментар та ID кемпера обов\'язкові.');
      return;
    }

 const simpleReview = {
  camperId: camperId,
  comment: comment,
  reviewer_name: "Анонім", // Або якесь фіксоване значення для тесту
  reviewer_rating: 5,     // Фіксована оцінка для тесту
};

    try {
      const response = await fetch(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${camperId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(simpleReview),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Відгук успішно відправлено (простий приклад):', data);
        if (onReviewAdded) {
          onReviewAdded(data);
        }
        setComment('');
      } else {
        const errorData = await response.json();
        console.error('Помилка відправлення відгуку (простий приклад):', response.status, errorData);
      }
    } catch (error) {
      console.error('Сталася помилка при відправці (простий приклад):', error);
    }
  };

  return (
    <div>
      <h3>Проста форма відгука</h3>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Ваш коментар"
      />
      <Button onClick={handleSubmit}>Відправити простий відгук</Button>
    </div>
  );
};

export default SimpleReviewForm;