import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/Card/Card.jsx';
import css from './CardList.module.css';

const CardList = ({ campers }) => {
    if (!campers) {
        return <div>Loading...</div>;
    }

    const campersWithFeatures = campers.map(camper => {
        const lowerCaseFeatures = {};
        for (const key in camper) {
            if (Object.prototype.hasOwnProperty.call(camper, key)) {
                const lowerKey = key.toLowerCase();
                if (lowerKey !== 'id' && lowerKey !== 'name') {
                    const value = camper[key];
                    if (typeof value === 'boolean') {
                        lowerCaseFeatures[lowerKey] = value;
                    }
                }
            }
        }
        return {
            ...camper,
            features: lowerCaseFeatures,
        };
    });

    return (
        <div className={css.cardList}>
            {campersWithFeatures.map((camper) => (
                <Card key={camper.id} {...camper} />
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
        features: PropTypes.objectOf(PropTypes.bool),
        reviews: PropTypes.arrayOf(PropTypes.shape({
            rating: PropTypes.number,
        })),
        location: PropTypes.string.isRequired,
    })),
};

export default CardList;

