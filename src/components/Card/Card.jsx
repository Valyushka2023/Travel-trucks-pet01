import React, { useState, Suspense } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import css from "./Card.module.css";
import Button from "../../components/Button/Button";

const FeatureIcon = React.lazy(() => import("../../components/FeatureIcon/FeatureIcon.jsx"));

const Card = ({ id, name, gallery, price, description, reviews, location, features }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    let imageUrl = `${import.meta.env.BASE_URL}default_camper.jpg`;
    if (gallery && Array.isArray(gallery) && gallery.length > 0) {
        imageUrl = gallery[0].thumb || gallery[0].original || `${import.meta.env.BASE_URL}default_camper.jpg`;
    }

    const handleTextInfoClick = () => setIsPopupOpen(true);
    const handleClosePopup = (event) => {
        event.stopPropagation();
        setIsPopupOpen(false);
    };

    const featureIcons = [
        { name: "AC", icon: "ac", svgId: "icon-icon-button-AC" },
        { name: "Bathroom", icon: "bathroom", svgId: "icon-icon-button-bathroom" },
        { name: "Kitchen", icon: "kitchen", svgId: "icon-icon-button-kitchen" },
        { name: "TV", icon: "tv", svgId: "icon-icon-button-TV" },
        { name: "Radio", icon: "radio", svgId: "icon-icon-button-radio" },
        { name: "Refrigerator", icon: "refrigerator", svgId: "icon-icon-button-refrigerator" },
        { name: "Microwave", icon: "microwave", svgId: "icon-icon-button-microwave" },
        { name: "Gas", icon: "gas", svgId: "icon-icon-button-gas" },
        { name: "Water", icon: "water", svgId: "icon-icon-button-water" },
        // { name: "Automatic", icon: "ransmission", svgId: "icon-icon-button-transmission" },
    ];

    const handleShowMoreClick = () => {
        navigate(`/catalog/${id}`);
    };

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
                                            <FeatureIcon key={index} name={feature.name} icon={feature.svgId} />
                                        ) : null
                                    )}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                    <div className={css.showMore}>
                        <Button onClick={handleShowMoreClick} variant="primary" size="medium">
                            Show more
                        </Button>
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