import React, { useState, Suspense } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import css from "./Card.module.css";

const FeatureIcon = React.lazy(() => import("../../components/FeatureIcon/FeatureIcon.jsx"));

const Card = ({ id, name, gallery, price, description, reviews, location, features }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Визначаємо шлях до зображення
    let imageUrl = `${import.meta.env.BASE_URL}default_camper.jpg`;
    if (gallery && Array.isArray(gallery) && gallery.length > 0) {
        imageUrl = gallery[0].thumb || gallery[0].original || `${import.meta.env.BASE_URL}default_camper.jpg`;
    }

    // Функція для відкриття попапу
    const handleTextInfoClick = () => setIsPopupOpen(true);
    const handleClosePopup = (event) => {
        event.stopPropagation();
        setIsPopupOpen(false);
    };

    // Масив іконок
    const featureIcons = [
        { name: "AC", icon: "ac" },
        { name: "Bathroom", icon: "bathroom" },
        { name: "Kitchen", icon: "kitchen" },
        { name: "TV", icon: "tv" },
        { name: "Radio", icon: "radio" },
        { name: "Refrigerator", icon: "refrigerator" },
        { name: "Microwave", icon: "microwave" },
        { name: "Gas", icon: "gas" },
        { name: "Water", icon: "water" },
    ];

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
                                    {reviews && reviews.length > 0 ? (
                                        `${(
                                            reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length
                                        ).toFixed(1)} (${reviews.length} Reviews)`
                                    ) : (
                                        "0 (0 Reviews)"
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
                                <Suspense fallback={<div>Loading...</div>}>
                                    {featureIcons.map((feature, index) =>
                                        features && features[feature.icon] ? (
                                            <FeatureIcon key={index} name={feature.name} icon={`icon-icon-button-${feature.icon}`} />
                                        ) : null
                                    )}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                    <div className={css.showMore}>
                        <Link to={`/catalog/${id}`}>Show more</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
            rating: PropTypes.number,
        })
    ),
    features: PropTypes.objectOf(PropTypes.bool),
};

export default Card;


