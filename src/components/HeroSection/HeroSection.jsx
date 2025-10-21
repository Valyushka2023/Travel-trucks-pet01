// import PropTypes from 'prop-types';
// import css from './HeroSection.module.css';

// function HeroSection({ camper }) {
//   if (!camper) {
//     return <div>Loading...</div>;
//   }

//   let averageRating = 0;
//   let reviewCount = 0;

//   if (camper.reviews && camper.reviews.length > 0) {
//     averageRating =
//       camper.reviews.reduce(
//         (sum, review) => sum + (review.reviewer_rating || 0),
//         0
//       ) / camper.reviews.length;
//     reviewCount = camper.reviews.length;
//   }

//   return (
//     <div className={css['container-hero-section']}>
//       <h2>{camper.name}</h2>

//       <div className={css['reviews-location']}>
//         <div className={css['title-reviews']}>
//           <svg
//             className={css['icon-star']}
//             width="16"
//             height="16"
//             viewBox="0 0 32 32"
//           >
//             <use href="/icons.svg#icon-star"></use>
//           </svg>
//           <p className={css['text-reviews-title']}>
//             {averageRating
//               ? `${averageRating.toFixed(1)} (${reviewCount} Reviews)`
//               : 'No reviews yet'}
//           </p>
//         </div>
//         <div className={css['location-title']}>
//           <svg
//             className={css['icon-map']}
//             width="16"
//             height="16"
//             viewBox="0 0 32 32"
//           >
//             <use href="/icons.svg#icon-map"></use>
//           </svg>
//           <p className={css['text-location-title']}>
//             {camper.location || 'Location not available'}
//           </p>
//         </div>
//       </div>
//       <div className={css['container-price']}>
//         <h2 className={css.price}>
//           €{camper.price ? camper.price.toFixed(2) : 'Price not available'}
//         </h2>
//       </div>
//     </div>
//   );
// }

// HeroSection.propTypes = {
//   camper: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     location: PropTypes.string,
//     price: PropTypes.number,
//     reviews: PropTypes.arrayOf(
//       PropTypes.shape({
//         reviewer_rating: PropTypes.number,
//       })
//     ),
//   }),
// };
// export default HeroSection;
// import { useTranslation } from 'react-i18next'; // 👈 Додаємо
// import PropTypes from 'prop-types';
// import css from './HeroSection.module.css';

// function HeroSection({ camper }) {
//   // Отримуємо функцію t для неймспейсу 'card' (для відгуків)
//   const { t } = useTranslation('card');

//   if (!camper) {
//     return <div>Loading...</div>;
//   }

//   let averageRating = 0;
//   let reviewCount = 0;

//   if (camper.reviews && camper.reviews.length > 0) {
//     averageRating =
//       camper.reviews.reduce(
//         (sum, review) => sum + (review.reviewer_rating || 0),
//         0
//       ) / camper.reviews.length;
//     reviewCount = camper.reviews.length;
//   }

//   // 🚀 ЛОКАЛІЗАЦІЯ ЛОКАЦІЇ: використовуємо t() з неймспейсом 'filter_location'
//   const translatedLocation = t(`locations.${camper.location}`, {
//     defaultValue: camper.location || 'Location not available',
//     ns: 'filter_location'
//   });

//   return (
//     <div className={css['container-hero-section']}>
//       <h2>{camper.name}</h2>

//       <div className={css['reviews-location']}>
//         <div className={css['title-reviews']}>
//           <svg
//             className={css['icon-star']}
//             width="16"
//             height="16"
//             viewBox="0 0 32 32"
//           >
//             <use href="/icons.svg#icon-star"></use>
//           </svg>
//           <p className={css['text-reviews-title']}>
//             {/* 🚀 ЛОКАЛІЗАЦІЯ ВІДГУКІВ: використовуємо ключі множини */}
//             {averageRating
//               ? `${averageRating.toFixed(1)} ${t('reviews_count', { count: reviewCount })}`
//               : t('no_reviews')}
//           </p>
//         </div>
//         <div className={css['location-title']}>
//           <svg
//             className={css['icon-map']}
//             width="16"
//             height="16"
//             viewBox="0 0 32 32"
//           >
//             <use href="/icons.svg#icon-map"></use>
//           </svg>
//           <p className={css['text-location-title']}>
//             {/* 🚀 ВИКОРИСТАННЯ ПЕРЕКЛАДЕНОЇ ЛОКАЦІЇ */}
//             {translatedLocation}
//           </p>
//         </div>
//       </div>
//       <div className={css['container-price']}>
//         <h2 className={css.price}>
//           €{camper.price ? camper.price.toFixed(2) : 'Price not available'}
//         </h2>
//       </div>
//     </div>
//   );
// }

// HeroSection.propTypes = {
//   camper: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     location: PropTypes.string,
//     price: PropTypes.number,
//     reviews: PropTypes.arrayOf(
//       PropTypes.shape({
//         reviewer_rating: PropTypes.number,
//       })
//     ),
//   }),
// };
// export default HeroSection;
import { useTranslation } from 'react-i18next'; // 👈 Додаємо
import PropTypes from 'prop-types';
import css from './HeroSection.module.css';

function HeroSection({ camper }) {
  // Отримуємо функцію t для неймспейсу 'card' (для відгуків)
  const { t } = useTranslation('card');

  if (!camper) {
    return <div>Loading...</div>;
  }

  let averageRating = 0;
  let reviewCount = 0;

  if (camper.reviews && camper.reviews.length > 0) {
    averageRating =
      camper.reviews.reduce(
        (sum, review) => sum + (review.reviewer_rating || 0),
        0
      ) / camper.reviews.length;
    reviewCount = camper.reviews.length;
  }

  // 🚀 ЛОКАЛІЗАЦІЯ ЛОКАЦІЇ: використовуємо t() з неймспейсом 'filter_location'
  const translatedLocation = t(`locations.${camper.location}`, {
    defaultValue: camper.location || 'Location not available',
    ns: 'filter_location',
  });

  return (
    <div className={css['container-hero-section']}>
      <h2>{camper.name}</h2>

      <div className={css['reviews-location']}>
        <div className={css['title-reviews']}>
          <svg
            className={css['icon-star']}
            width="16"
            height="16"
            viewBox="0 0 32 32"
          >
            <use href="/icons.svg#icon-star"></use>
          </svg>
          <p className={css['text-reviews-title']}>
            {/* 🚀 ЛОКАЛІЗАЦІЯ ВІДГУКІВ: використовуємо ключі множини */}
            {averageRating
              ? `${averageRating.toFixed(1)} ${t('reviews_count', { count: reviewCount })}`
              : t('no_reviews')}
          </p>
        </div>
        <div className={css['location-title']}>
          <svg
            className={css['icon-map']}
            width="16"
            height="16"
            viewBox="0 0 32 32"
          >
            <use href="/icons.svg#icon-map"></use>
          </svg>
          <p className={css['text-location-title']}>
            {/* 🚀 ВИКОРИСТАННЯ ПЕРЕКЛАДЕНОЇ ЛОКАЦІЇ */}
            {translatedLocation}
          </p>
        </div>
      </div>
      <div className={css['container-price']}>
        <h2 className={css.price}>
          {t('currency_symbol')}
          {camper.price ? camper.price.toFixed(2) : 'Price not available'}
        </h2>
      </div>
    </div>
  );
}

HeroSection.propTypes = {
  camper: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    price: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        reviewer_rating: PropTypes.number,
      })
    ),
  }),
};
export default HeroSection;
