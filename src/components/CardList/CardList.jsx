



import React from "react";
import PropTypes from "prop-types";
import Card from "../Ui/Card/Card.jsx"; 
import css from "./CardList.module.css";

const CardList = ({ campers }) => {
    console.log("CardList campers:", campers);
    return (
        <div className={css.cardList}>
            {campers.map((camper) => (
                <Card
                    key={camper.id}
                    _id={camper.id}
                    name={camper.name}
                    gallery={camper.gallery}
                    price={camper.price}
                    description={camper.description}
                    reviews={camper.reviews}
                    location={camper.location}
                    features={camper.features}
                    camper={camper}
                />
            ))}
        </div>
    );
};

CardList.propTypes = {
    campers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        gallery: PropTypes.arrayOf(PropTypes.shape({
            thumb: PropTypes.string,
            original: PropTypes.string,
        })),
        price: PropTypes.number.isRequired,
        description: PropTypes.string,
        location: PropTypes.string.isRequired,
        reviews: PropTypes.arrayOf(PropTypes.shape({
            reviewer_rating: PropTypes.number,
        })),
        features: PropTypes.objectOf(PropTypes.bool),
    })).isRequired,
};

export default CardList;


