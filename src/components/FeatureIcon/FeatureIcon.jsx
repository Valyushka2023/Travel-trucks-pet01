import React from "react";
import PropTypes from "prop-types";
import css from "./FeatureIcon.module.css";

const FeatureIcon = ({ name, icon }) => {
    // Залишаємо ім'я іконки без змін
    const iconType = icon;  

    // Формуємо клас для компонента, динамічно додаючи клас для іконки
    const className = `${css.featureIcon} ${css[`featureIcon--${iconType}`] || ''}`;

    return (
        <div className={className}>
            <svg className={css.icon} viewBox="0 0 24 24">
                {/* Використовуємо iconType без змін */}
               <use href={`/icons.svg#${iconType}`} />
            </svg>
            <span className={css.text}>{name}</span>
        </div>
    );
};

FeatureIcon.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default FeatureIcon;