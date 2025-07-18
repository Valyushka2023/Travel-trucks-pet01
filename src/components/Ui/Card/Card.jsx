import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import css from './Card.module.css';
import Button from '../../Ui/Button/Button.jsx';
import FeatureIcon from '../../FeatureIcon/FeatureIcon.jsx';
import { v4 as uuidv4 } from 'uuid';
// ✅ Імпортуємо новий компонент DescriptionPopup
import DescriptionPopup from '../../../modals/DescriptionModal/DescriptionPopup.jsx';

const Card = ({ _id, name, gallery, price, description, location, camper }) => {
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
    // Прибираємо event, бо він не потрібен тут
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
    navigate(`/catalog/${_id}`);
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

  return (
    <div className={css.card} data-id={_id}>
      <div className={css.contentCard}>
        <div className={css.containerPic}>
          <img src={imageUrl} alt={name} />
        </div>
        <div className={css.containerInfo}>
          <div className={css.textContainerInfo}>
            <div className={css.titleInfo}>
              <h2 className={css.textTitleInfo}>{name}</h2>
              <div className={css.priceInfo}>
                <h2 className={css.textPriceInfo}>
                  ${price}
                  <svg
                    className={css.iconHeart}
                    width="26"
                    height="24"
                    viewBox="0 0 32 32"
                  >
                    <use
                      href={`${import.meta.env.BASE_URL}icons.svg#icon-heart`}
                    ></use>
                  </svg>
                </h2>
              </div>
            </div>
            <div className={css.detailsInfo}>
              <div className={css.reviewsInfo}>
                <svg
                  className={css.iconStar}
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}icons.svg#icon-star`}
                  ></use>
                </svg>
                <p className={css.textReviewsInfo}>
                  {reviewsWithUniqueIds.length > 0 ? (
                    <span>
                      {averageRating.toFixed(1)} ({reviewsWithUniqueIds.length}{' '}
                      Reviews)
                    </span>
                  ) : (
                    '0 (0 відгуків)'
                  )}
                </p>
              </div>
              <div className={css.locationInfo}>
                <svg
                  className={css.iconMap}
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}icons.svg#icon-map`}
                  ></use>
                </svg>
                <p className={css.textLocation}>{location}</p>
              </div>
            </div>
          </div>
          <div className={css.supportingTextInfo}>
            <button
              className={css.descriptionButton}
              onClick={handleTextInfoClick}
            >
              <div className={css.textInfoContainer}>
                <p className={css.textInfo}>{shortDescription}</p>
              </div>
            </button>

            {isPopupOpen && (
              <DescriptionPopup
                description={description}
                onClose={handleClosePopup}
              />
            )}
          </div>

          <div className={css.badgesContainer}>
            {camper && <FeatureIcon camper={camper} />}
          </div>
          <div className={css.containerShowMore}>
            <Button
              onClick={handleShowMoreClick}
              variant="primary"
              size="medium"
            >
              Show More
            </Button>
          </div>
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
