// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from 'react-router-dom';
// import css from "./Card.module.css";
// import Button from "../../components/Button/Button";
// import FeatureIcon from "../../components/FeatureIcon/FeatureIcon.jsx";

// const Card = ({ id, name, gallery, price, description, location, onShowMore, camper }) => {
//     // Стан для визначення, чи відкритий попап з описом
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     // Хук для навігації між сторінками
//     const navigate = useNavigate();

//     // Визначаємо URL зображення кемпера
//     let imageUrl = `${import.meta.env.BASE_URL}default_camper.jpg`;
//     if (gallery && Array.isArray(gallery) && gallery.length > 0) {
//         imageUrl = gallery[0].thumb || gallery[0].original || `${import.meta.env.BASE_URL}default_camper.jpg`;
//     }

//     // Функція для відкриття попапу з описом
//     const handleTextInfoClick = () => {
//         setIsPopupOpen(true);
//     };

//     // Функція для закриття попапу з описом
//     const handleClosePopup = (event) => {
//         event.stopPropagation();
//         setIsPopupOpen(false);
//     };

//     // Логуємо відгуки з кемпера
//     console.log("Відгуки кемпера:", camper?.reviews);

//     // Обчислюємо середній рейтинг
//     let averageRating = 0;
//     if (camper?.reviews && camper.reviews.length > 0) {
//         averageRating = camper.reviews.reduce((sum, review) => sum + (review.reviewer_rating || 0), 0) / camper.reviews.length;
//     }

//     // Логуємо обчислений середній рейтинг
//     console.log("Обчислений середній рейтинг:", averageRating);

//     // Функція для переходу на сторінку з детальною інформацією
//     const handleShowMoreClick = () => {
//         onShowMore(id);
//     };

//     // Логуємо інформацію про кемпер
//     console.log("Інформація про кемпер:", camper);

//     // Рендеримо картку кемпера
//     return (
//         <div className={css.card} data-id={id}>
//             <div className={css.contentCard}>
//                 <div className={css.containerPic}>
//                     <img src={imageUrl} alt={name} />
//                 </div>
//                 <div className={css.containerInfo}>
//                     <div className={css.textContainerInfo}>
//                         <div className={css.titleInfo}>
//                             <h2 className={css.textTitleInfo}>{name}</h2>
//                             <div className={css.priceInfo}>
//                                 <h2 className={css.textPriceInfo}>
//                                     ${price}
//                                     <svg className={css.iconHeart} width="26" height="24" viewBox="0 0 32 32">
//                                         <use href={`${import.meta.env.BASE_URL}icons.svg#icon-heart`}></use>
//                                     </svg>
//                                 </h2>
//                             </div>
//                         </div>
//                         <div className={css.detailsInfo}>
//                             <div className={css.reviewsInfo}>
//                                 <svg className={css.iconStar} width="16" height="16" viewBox="0 0 32 32">
//                                     <use href={`${import.meta.env.BASE_URL}icons.svg#icon-star`}></use>
//                                 </svg>
//                                 <p className={css.textReviewsInfo}>
//                                     {camper?.reviews && camper.reviews.length > 0 ? (
//                                         `${averageRating.toFixed(1)} (${camper.reviews.length} відгуків)`
//                                     ) : (
//                                         "0 (0 відгуків)"
//                                     )}
//                                 </p>
//                             </div>
//                             <div className={css.locationInfo}>
//                                 <svg className={css.iconMap} width="16" height="16" viewBox="0 0 32 32">
//                                     <use href={`${import.meta.env.BASE_URL}icons.svg#icon-map`}></use>
//                                 </svg>
//                                 <p className={css.textLocation}>{location}</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={css.supportingTextInfo} onClick={handleTextInfoClick}>
//                         <p className={css.textInfo}>{description}</p>
//                         {isPopupOpen && (
//                             <div className={css.popup}>
//                                 <div className={css.popupContent}>
//                                     <span className={css.closeButton} onClick={handleClosePopup}>&times;</span>
//                                     <p>{description}</p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <div className={css.badgesContainerInfo}>
//                         <div className={css.row}>
//                             <div className={css.badgesContainer}>
//                                 <FeatureIcon camper={camper} />
//                             </div>
//                         </div>
//                     </div>
//                     <div className={css.showMore}>
//                         <Button onClick={handleShowMoreClick} variant="primary" size="medium">
//                             Показати більше
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Визначаємо типи пропсів
// Card.propTypes = {
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     gallery: PropTypes.arrayOf(
//         PropTypes.shape({
//             thumb: PropTypes.string,
//             original: PropTypes.string,
//         })
//     ),
//     price: PropTypes.number.isRequired,
//     description: PropTypes.string,
//     location: PropTypes.string.isRequired,
//     reviews: PropTypes.arrayOf(
//         PropTypes.shape({
//             reviewer_rating: PropTypes.number,
//         })
//     ),
//     features: PropTypes.objectOf(PropTypes.bool),
//     onShowMore: PropTypes.func.isRequired,
//     camper: PropTypes.shape({
//         features: PropTypes.objectOf(PropTypes.bool),
//     }),
// };

// export default Card;

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from 'react-router-dom';
// import css from "./Card.module.css";
// import Button from "../../components/Button/Button";
// import FeatureIcon from "../../components/FeatureIcon/FeatureIcon.jsx";

// const Card = ({ id, name, gallery, price, description, location, onShowMore, camper }) => {
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const navigate = useNavigate();

//     let imageUrl = `${import.meta.env.BASE_URL}default_camper.jpg`;
//     if (gallery && Array.isArray(gallery) && gallery.length > 0) {
//         imageUrl = gallery[0].thumb || gallery[0].original || `${import.meta.env.BASE_URL}default_camper.jpg`;
//     }

//     const handleTextInfoClick = () => {
//         setIsPopupOpen(true);
//     };

//     const handleClosePopup = (event) => {
//         event.stopPropagation();
//         setIsPopupOpen(false);
//     };

//     console.log("Відгуки кемпера:", camper?.reviews);

//     let averageRating = 0;
//     if (camper?.reviews && camper.reviews.length > 0) {
//         averageRating = camper.reviews.reduce((sum, review) => sum + (review.reviewer_rating || 0), 0) / camper.reviews.length;
//     }

//     console.log("Обчислений середній рейтинг:", averageRating);

//     const handleShowMoreClick = () => {
//         onShowMore(id);
//     };

//     console.log("Інформація про кемпер:", camper);

//     return (
//         <div className={css.card} data-id={id}>
//             <div className={css.contentCard}>
//                 <div className={css.containerPic}>
//                     <img src={imageUrl} alt={name} />
//                 </div>
//                 <div className={css.containerInfo}>
//                     <div className={css.textContainerInfo}>
//                         <div className={css.titleInfo}>
//                             <h2 className={css.textTitleInfo}>{name}</h2>
//                             <div className={css.priceInfo}>
//                                 <h2 className={css.textPriceInfo}>
//                                     ${price}
//                                     <svg className={css.iconHeart} width="26" height="24" viewBox="0 0 32 32">
//                                         <use href={`${import.meta.env.BASE_URL}icons.svg#icon-heart`}></use>
//                                     </svg>
//                                 </h2>
//                             </div>
//                         </div>
//                         <div className={css.detailsInfo}>
//                             <div className={css.reviewsInfo}>
//                                 <svg className={css.iconStar} width="16" height="16" viewBox="0 0 32 32">
//                                     <use href={`${import.meta.env.BASE_URL}icons.svg#icon-star`}></use>
//                                 </svg>
//                                 <p className={css.textReviewsInfo}>
//                                     {camper?.reviews && camper.reviews.length > 0 ? (
//                                         `${averageRating.toFixed(1)} (${camper.reviews.length} відгуків)`
//                                     ) : (
//                                         "0 (0 відгуків)"
//                                     )}
//                                 </p>
//                             </div>
//                             <div className={css.locationInfo}>
//                                 <svg className={css.iconMap} width="16" height="16" viewBox="0 0 32 32">
//                                     <use href={`${import.meta.env.BASE_URL}icons.svg#icon-map`}></use>
//                                 </svg>
//                                 <p className={css.textLocation}>{location}</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={css.supportingTextInfo} onClick={handleTextInfoClick}>
//                         <p className={css.textInfo}>{description}</p>
//                         {isPopupOpen && (
//                             <div className={css.popup}>
//                                 <div className={css.popupContent}>
//                                     <span className={css.closeButton} onClick={handleClosePopup}>&times;</span>
//                                     <p>{description}</p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <div className={css.badgesContainerInfo}>
//                         <div className={css.row}>
//                             <div className={css.badgesContainer}>
//                                 <FeatureIcon camper={camper} />
//                             </div>
//                         </div>
//                     </div>
//                     <div className={css.showMore}>
//                         <Button onClick={handleShowMoreClick} variant="primary" size="medium">
//                             Показати більше
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// Card.propTypes = {
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     gallery: PropTypes.arrayOf(
//         PropTypes.shape({
//             thumb: PropTypes.string,
//             original: PropTypes.string,
//         })
//     ),
//     price: PropTypes.number.isRequired,
//     description: PropTypes.string,
//     location: PropTypes.string.isRequired,
//     reviews: PropTypes.arrayOf(
//         PropTypes.shape({
//             reviewer_rating: PropTypes.number,
//         })
//     ),
//     features: PropTypes.objectOf(PropTypes.bool),
//     onShowMore: PropTypes.func.isRequired,
//     camper: PropTypes.shape({
//         features: PropTypes.objectOf(PropTypes.bool),
//     }),
// };

// export default Card;

/*оновлений код компонента Card без скорочень, з доданими логами для перевірки унікальності id відгуків:*/


import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import css from "./Card.module.css";
import Button from "../../components/Button/Button";
import FeatureIcon from "../../components/FeatureIcon/FeatureIcon.jsx";

const Card = ({ id, name, gallery, price, description, location, onShowMore, camper }) => {
    // Стан для визначення, чи відкритий попап з описом
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // Хук для навігації між сторінками
    const navigate = useNavigate();

    // Визначаємо URL зображення кемпера
    let imageUrl = `${import.meta.env.BASE_URL}default_camper.jpg`;
    if (gallery && Array.isArray(gallery) && gallery.length > 0) {
        imageUrl = gallery[0].thumb || gallery[0].original || `${import.meta.env.BASE_URL}default_camper.jpg`;
    }

    // Функція для відкриття попапу з описом
    const handleTextInfoClick = () => {
        setIsPopupOpen(true);
    };

    // Функція для закриття попапу з описом
    const handleClosePopup = (event) => {
        event.stopPropagation();
        setIsPopupOpen(false);
    };

    // Логуємо відгуки з кемпера
    console.log("Відгуки кемпера (Card):", camper?.reviews);

    // Перевірка унікальності id відгуків
    if (camper?.reviews && camper.reviews.length > 0) {
        const ids = camper.reviews.map(review => review.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
            console.error("Помилка (Card): не унікальні id у відгуках!", camper.reviews);
        } else {
            console.log("Усі id відгуків унікальні (Card).");
        }
    }

    // Обчислюємо середній рейтинг
    let averageRating = 0;
    if (camper?.reviews && camper.reviews.length > 0) {
        averageRating = camper.reviews.reduce((sum, review) => sum + (review.reviewer_rating || 0), 0) / camper.reviews.length;
    }

    // Логуємо обчислений середній рейтинг
    console.log("Обчислений середній рейтинг (Card):", averageRating);

    // Функція для переходу на сторінку з детальною інформацією
    const handleShowMoreClick = () => {
        onShowMore(id);
    };

    // Логуємо інформацію про кемпер
    console.log("Інформація про кемпер (Card):", camper);

    // Рендеримо картку кемпера
    return (
        <div className={css.card} data-id={id}>
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
                                    <svg className={css.iconHeart} width="26" height="24" viewBox="0 0 32 32">
                                        <use href={`${import.meta.env.BASE_URL}icons.svg#icon-heart`}></use>
                                    </svg>
                                </h2>
                            </div>
                        </div>
                        <div className={css.detailsInfo}>
                            <div className={css.reviewsInfo}>
                                <svg className={css.iconStar} width="16" height="16" viewBox="0 0 32 32">
                                    <use href={`${import.meta.env.BASE_URL}icons.svg#icon-star`}></use>
                                </svg>
                                <p className={css.textReviewsInfo}>
                                    {camper?.reviews && camper.reviews.length > 0 ? (
                                        `${averageRating.toFixed(1)} (${camper.reviews.length} відгуків)`
                                    ) : (
                                        "0 (0 відгуків)"
                                    )}
                                </p>
                            </div>
                            <div className={css.locationInfo}>
                                <svg className={css.iconMap} width="16" height="16" viewBox="0 0 32 32">
                                    <use href={`${import.meta.env.BASE_URL}icons.svg#icon-map`}></use>
                                </svg>
                                <p className={css.textLocation}>{location}</p>
                            </div>
                        </div>
                    </div>
                    <div className={css.supportingTextInfo} onClick={handleTextInfoClick}>
                        <p className={css.textInfo}>{description}</p>
                        {isPopupOpen && (
                            <div className={css.popup}>
                                <div className={css.popupContent}>
                                    <span className={css.closeButton} onClick={handleClosePopup}>&times;</span>
                                    <p>{description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={css.badgesContainerInfo}>
                        <div className={css.row}>
                            <div className={css.badgesContainer}>
                                <FeatureIcon camper={camper} />
                            </div>
                        </div>
                    </div>
                    <div className={css.showMore}>
                        <Button onClick={handleShowMoreClick} variant="primary" size="medium">
                            Показати більше
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Визначаємо типи пропсів
Card.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(
        PropTypes.shape({
            thumb: PropTypes.string,
            original: PropTypes.string,
        })
    ),
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    location: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            reviewer_rating: PropTypes.number,
        })
    ),
    features: PropTypes.objectOf(PropTypes.bool),
    onShowMore: PropTypes.func.isRequired,
    camper: PropTypes.shape({
        features: PropTypes.objectOf(PropTypes.bool),
    }),
};

export default Card;