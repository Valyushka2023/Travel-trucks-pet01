// import { useTranslation } from 'react-i18next';
// import { useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import css from './Card.module.css';
// import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
// import FeatureIcon from '../../FeatureIcon/FeatureIcon.jsx';
// import { v4 as uuidv4 } from 'uuid';
// import DescriptionPopup from '../../../components/Modals/DescriptionModal/DescriptionPopup.jsx';

// const Card = ({ _id, name, gallery, price, description, location, camper }) => {
//   const { t } = useTranslation('card');
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const navigate = useNavigate();

//   let imageUrl = `${import.meta.env.BASE_URL}default_camper.jpg`;

//   if (gallery && Array.isArray(gallery) && gallery.length > 0) {
//     imageUrl = gallery[0] || `${import.meta.env.BASE_URL}default_camper.jpg`;
//   } else {
//     // Ігноруємо помилку, бо вона не критична
//   }

//   const handleTextInfoClick = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const reviewsWithUniqueIds = useMemo(() => {
//     if (camper?.reviews && Array.isArray(camper.reviews)) {
//       return camper.reviews.map(review => {
//         if (
//           !review._id ||
//           camper.reviews.filter(r => r._id === review._id).length > 1
//         ) {
//           return {
//             ...review,
//             _id: uuidv4(),
//           };
//         }
//         return { ...review };
//       });
//     }
//     return [];
//   }, [camper?.reviews]);

//   let averageRating = 0;
//   if (reviewsWithUniqueIds.length > 0) {
//     averageRating =
//       reviewsWithUniqueIds.reduce((sum, review) => {
//         return sum + (review.reviewer_rating || 0);
//       }, 0) / reviewsWithUniqueIds.length;
//   }

//   const handleShowMoreClick = () => {
//     navigate(`/catalog/${_id}`);
//   };

//   const MAX_WORDS = 20;
//   const shortDescription = useMemo(() => {
//     if (!description) return '';
//     const words = description.split(' ');
//     if (words.length <= MAX_WORDS) {
//       return description;
//     }
//     return words.slice(0, MAX_WORDS).join(' ') + '...';
//   }, [description]);

//   return (
//     <div className={css.card} data-id={_id}>
//       <div className={css['content-card']}>
//         <img className={css.image} src={imageUrl} alt={name} />

//         <div className={css['container-info']}>
//           {/* Весь існуючий вміст containerInfo */}
//           <div className={css['title-info']}>
//             <h2>{name}</h2>
//             <div className={css['price-info']}>
//               <h2 className={css['text-price-info']}>${price}</h2>
//               <svg
//                 className={css['icon-heart']}
//                 width="26"
//                 height="24"
//                 viewBox="0 0 32 32"
//               >
//                 <use
//                   href={`${import.meta.env.BASE_URL}icons.svg#icon-heart`}
//                 ></use>
//               </svg>
//             </div>
//           </div>

//           <div className={css['details-info']}>
//             <div className={css['reviews-info']}>
//               <svg
//                 className={css['icon-star']}
//                 width="16"
//                 height="16"
//                 viewBox="0 0 32 32"
//               >
//                 <use
//                   href={`${import.meta.env.BASE_URL}icons.svg#icon-star`}
//                 ></use>
//               </svg>
//               <p>
//                 {reviewsWithUniqueIds.length > 0 ? (
//                   <span>
//                     {averageRating.toFixed(1)} ({reviewsWithUniqueIds.length}{' '}
//                     Reviews)
//                   </span>
//                 ) : (
//                   '0 (0 відгуків)'
//                 )}
//               </p>
//             </div>
//             <div className={css['location-info']}>
//               <svg
//                 className={css['icon-map']}
//                 width="16"
//                 height="16"
//                 viewBox="0 0 32 32"
//               >
//                 <use
//                   href={`${import.meta.env.BASE_URL}icons.svg#icon-map`}
//                 ></use>
//               </svg>
//               <p>{location}</p>
//             </div>
//           </div>

//           <div className={css['supporting-text-info']}>
//             <button
//               className={css['text-button']}
//               onClick={handleTextInfoClick}
//             >
//               <p className={css['text-info']}>{shortDescription}</p>
//             </button>
//           </div>
//           <div className={css['badges-container']}>
//             {camper && <FeatureIcon camper={camper} />}
//           </div>
//           <div className={css['container-show-more']}>
//             <Button
//               onClick={handleShowMoreClick}
//               variant="primary"
//               size="medium"
//             >
//               {t('show_button', { ns: 'button' })}
//             </Button>
//           </div>

//           {/* ✅ ПЕРЕМІЩЕНО: DescriptionPopup тепер рендериться безпосередньо всередині containerInfo */}
//           {isPopupOpen && (
//             <DescriptionPopup
//               description={description}
//               onClose={handleClosePopup}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// Card.propTypes = {
//   _id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   gallery: PropTypes.arrayOf(PropTypes.string),
//   price: PropTypes.number.isRequired,
//   description: PropTypes.string,
//   location: PropTypes.string.isRequired,
//   reviews: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string,
//       reviewer_rating: PropTypes.number,
//     })
//   ),
//   features: PropTypes.objectOf(PropTypes.bool),
//   camper: PropTypes.shape({
//     features: PropTypes.objectOf(PropTypes.bool),
//     reviews: PropTypes.arrayOf(
//       PropTypes.shape({
//         _id: PropTypes.string,
//         reviewer_rating: PropTypes.number,
//       })
//     ),
//   }),
// };

// export default Card;
/*----------*/
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import css from './Card.module.css';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import FeatureIcon from '../../FeatureIcon/FeatureIcon.jsx';
import { v4 as uuidv4 } from 'uuid';
import DescriptionPopup from '../../../components/Modals/DescriptionModal/DescriptionPopup.jsx';

const Card = ({ _id, name, gallery, price, description, location, camper }) => {
  // Отримуємо функцію t для неймспейсу 'card'
  const { t } = useTranslation('card');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  let imageUrl = `${import.meta.env.BASE_URL}default_camper.jpg`;

  if (gallery && Array.isArray(gallery) && gallery.length > 0) {
    imageUrl = gallery[0] || `${import.meta.env.BASE_URL}default_camper.jpg`;
  } else {
    // Ігноруємо помилку, бо вона не критична
  }

  const handleTextInfoClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const reviewsWithUniqueIds = useMemo(() => {
    if (camper?.reviews && Array.isArray(camper.reviews)) {
      return camper.reviews.map(review => {
        if (
          !review._id ||
          camper.reviews.filter(r => r._id === review._id).length > 1
        ) {
          return {
            ...review,
            _id: uuidv4(),
          };
        }
        return { ...review };
      });
    }
    return [];
  }, [camper?.reviews]);

  let averageRating = 0;
  if (reviewsWithUniqueIds.length > 0) {
    averageRating =
      reviewsWithUniqueIds.reduce((sum, review) => {
        return sum + (review.reviewer_rating || 0);
      }, 0) / reviewsWithUniqueIds.length;
  }

  const handleShowMoreClick = () => {
    navigate(`/catalog/${_id}`, { state: { camper } }); // Передаємо camper для кешування
  };

  const MAX_WORDS = 20;
  const shortDescription = useMemo(() => {
    if (!description) return '';
    const words = description.split(' ');
    if (words.length <= MAX_WORDS) {
      return description;
    }
    return words.slice(0, MAX_WORDS).join(' ') + '...';
  }, [description]);

  // 🚀 ЛОКАЛІЗАЦІЯ ЛОКАЦІЇ: Використовуємо неймспейс 'filter_location' для перекладу міст
  const translatedLocation = t(`locations.${location}`, {
    defaultValue: location,
    ns: 'filter_location',
  });

  return (
    <div className={css.card} data-id={_id}>
      <div className={css['content-card']}>
        <img className={css.image} src={imageUrl} alt={name} />

        <div className={css['container-info']}>
          <div className={css['title-info']}>
            <h2>{name}</h2>
            <div className={css['price-info']}>
              <h2 className={css['text-price-info']}>
                {t('currency_symbol')}
                {price} {/* 👈 ВИКОРИСТАННЯ ПЕРЕКЛАДУ */}
              </h2>
              <svg
                className={css['icon-heart']}
                width="26"
                height="24"
                viewBox="0 0 32 32"
              >
                <use
                  href={`${import.meta.env.BASE_URL}icons.svg#icon-heart`}
                ></use>
              </svg>
            </div>
          </div>

          <div className={css['details-info']}>
            <div className={css['reviews-info']}>
              <svg
                className={css['icon-star']}
                width="16"
                height="16"
                viewBox="0 0 32 32"
              >
                <use
                  href={`${import.meta.env.BASE_URL}icons.svg#icon-star`}
                ></use>
              </svg>
              <p>
                {reviewsWithUniqueIds.length > 0 ? (
                  <span>
                    {averageRating.toFixed(1)}{' '}
                    {/* 🚀 ЛОКАЛІЗАЦІЯ КІЛЬКОСТІ ВІДГУКІВ (з обробкою множини) */}
                    {t('reviews_count', { count: reviewsWithUniqueIds.length })}
                  </span>
                ) : (
                  // 🚀 ЛОКАЛІЗАЦІЯ '0 (0 відгуків)'
                  t('no_reviews')
                )}
              </p>
            </div>
            <div className={css['location-info']}>
              <svg
                className={css['icon-map']}
                width="16"
                height="16"
                viewBox="0 0 32 32"
              >
                <use
                  href={`${import.meta.env.BASE_URL}icons.svg#icon-map`}
                ></use>
              </svg>
              {/* 🚀 ВИКОРИСТАННЯ ПЕРЕКЛАДЕНОЇ ЛОКАЦІЇ */}
              <p>{translatedLocation}</p>
            </div>
          </div>

          <div className={css['supporting-text-info']}>
            <button
              className={css['text-button']}
              onClick={handleTextInfoClick}
            >
              <p className={css['text-info']}>{shortDescription}</p>
            </button>
          </div>
          <div className={css['badges-container']}>
            {camper && <FeatureIcon camper={camper} />}
          </div>
          <div className={css['container-show-more']}>
            <Button
              onClick={handleShowMoreClick}
              variant="primary"
              size="medium"
            >
              {t('show_button', { ns: 'button' })}
            </Button>
          </div>

          {isPopupOpen && (
            <DescriptionPopup
              description={description}
              onClose={handleClosePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.number.isRequired,
  description: PropTypes.string,
  location: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      reviewer_rating: PropTypes.number,
    })
  ),
  features: PropTypes.objectOf(PropTypes.bool),
  camper: PropTypes.shape({
    features: PropTypes.objectOf(PropTypes.bool),
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        reviewer_rating: PropTypes.number,
      })
    ),
  }),
};

export default Card;
