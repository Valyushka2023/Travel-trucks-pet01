import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button.jsx';
import css from './FormReview.module.css';

const FormReview = ({ camper }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

 const newReview = {
            id: uuidv4(), // Генеруємо унікальний ID
            name: name,
            email: email,
            rating: rating,
            comment: comment,
            camperId: camper.id,
        };

    try {
      const response = await fetch('http://localhost:5000/api/reviews', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        console.log('Відгук успішно відправлено!');
        // Очищення полів форми
        setName('');
        setEmail('');
        setRating(5);
        setComment('');
      } else {
        const errorData = await response.json();
        setError(`Помилка відправки відгуку: ${response.status} - ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      setError(`Помилка відправки відгуку: ${error.message}`);
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
          className={`${css.star} ${i <= rating ? css.filled : ''}`}
          onClick={() => setRating(i)}
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
              name="user-name"
              type="text"
              className={css.modalInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={css.fieldForm}>
            <label htmlFor="user-email-input" className={css.label}>
              Email*
            </label>
            <input
              id="user-email-input"
              name="user-email"
              type="email"
              className={css.modalInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              name="user-comment"
              placeholder="Text input"
              className={css.modalTextArea}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
        <div className={css.elementSubmit}>
          <Button variant="primary" size="medium" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Відправка...' : 'Submit'}
          </Button>
          {error && <p className={css.errorMessage}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FormReview;


/*варіант 2*/
// import React, { useState } from 'react';
// import styles from './FormReview.module.css';

// const FormReview = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log({ name, email, rating, comment });
//     setName('');
//     setEmail('');
//     setRating(5);
//     setComment('');
//   };

//   return (
//     <div className={styles.formContainer}>
//       <h2 className={styles.formTitle}>Залиште свій відгук</h2>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor="name" className={styles.formLabel}>Ім'я:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={styles.formInput}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email" className={styles.formLabel}>Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={styles.formInput}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="rating" className={styles.formLabel}>Оцінка:</label>
//           <input
//             type="range"
//             id="rating"
//             min="1"
//             max="5"
//             value={rating}
//             onChange={(e) => setRating(parseInt(e.target.value))}
//             className={styles.ratingInput}
//           />
//           <p className={styles.ratingValue}>Оцінка: {rating}</p>
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="comment" className={styles.formLabel}>Відгук:</label>
//           <textarea
//             id="comment"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className={styles.formTextarea}
//             rows="4"
//             required
//           />
//         </div>
//         <button type="submit" className={styles.submitButton}>
//           Надіслати відгук
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FormReview;