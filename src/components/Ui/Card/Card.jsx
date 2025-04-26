

import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import css from "./Card.module.css";
import Button from "../../Ui/Button/Button.jsx";
import FeatureIcon from "../../FeatureIcon/FeatureIcon.jsx";
import { v4 as uuidv4 } from 'uuid';

const Card = ({ _id, name, gallery, price, description, location, camper }) => {
    console.log("Властивості, передані в компонент Card:", { _id, name, gallery, price, description, location, camper});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    let imageUrl = `${import.meta.env.BASE_URL}default_camper.jpg`;
    console.log("Початкове значення imageUrl:", imageUrl);

    if (gallery && Array.isArray(gallery) && gallery.length > 0) {
        console.log("Масив gallery (галерея зображень):", gallery);
        // Тепер ми просто беремо перший елемент масиву (URL-адресу)
        imageUrl = gallery[0] || `${import.meta.env.BASE_URL}default_camper.jpg`;
        console.log("Оновлене значення imageUrl:", imageUrl);
    } else {
        console.log("Масив gallery відсутній, не є масивом або є порожнім.");
    }

    const handleTextInfoClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = (event) => {
        event.stopPropagation();
        setIsPopupOpen(false);
    };

    console.log("Відгуки кемпера (Card):", camper?.reviews);

    const reviewsWithUniqueIds = useMemo(() => {
        if (camper?.reviews && Array.isArray(camper.reviews)) {
            return camper.reviews.map(review => {
                if (!review._id || camper.reviews.filter(r => r._id === review._id).length > 1) {
                    return {
                        ...review,
                        _id: uuidv4()
                    };
                }
                return { ...review };
            });
        }
        return [];
    }, [camper?.reviews]);

    console.log("Виправлені дублікати id в відгуках!", reviewsWithUniqueIds);

    let averageRating = 0;
    if (reviewsWithUniqueIds.length > 0) {
        averageRating = reviewsWithUniqueIds.reduce((sum, review) => {
            return sum + (review.reviewer_rating || 0);
        }, 0) / reviewsWithUniqueIds.length;
    }

    console.log("Обчислений середній рейтинг (Card):", averageRating);

    const handleShowMoreClick = () => {
        navigate(`/catalog/${_id}`);
    };

    console.log("Інформація про кемпер (Card):", camper);

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
                                    {reviewsWithUniqueIds.length > 0 ? (
                                        <span>{averageRating.toFixed(1)} ({reviewsWithUniqueIds.length} Reviews)</span>
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
                                {camper && <FeatureIcon camper={camper} />}
                            </div>
                        </div>
                    </div>
                    <div className={css.showMore}>
                        <Button onClick={handleShowMoreClick} variant="primary" size="medium">
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
    gallery: PropTypes.arrayOf(PropTypes.string), // Оновлено propTypes для gallery
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