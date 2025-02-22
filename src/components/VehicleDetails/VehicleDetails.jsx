import React from 'react';
import PropTypes from 'prop-types';
import css from './VehicleDetails.module.css';

function VehicleDetails({ camper }) {
    console.log("VehicleDetails отримав camper:", camper);

    if (!camper) {
        return <div className={css.vehicleContainer}>Loading vehicle details...</div>; // Або індикатор завантаження
    }

    return (
        <div className={css.vehicleContainer}>
            <h3 className={css.textDetails}>Vehicle details</h3>
            <hr className={css.divider} />
            <div className={css.vehicleInfo}>
                <div className={css.texts}>
                    <p>Form</p>
                    <p>{camper.form || "N/A"}</p>
                </div>
                <div className={css.texts}>
                    <p>Length</p>
                    <p>{camper.length || "N/A"}</p>
                </div>
                <div className={css.texts}>
                    <p>Width</p>
                    <p>{camper.width || "N/A"}</p>
                </div>
                <div className={css.texts}>
                    <p>Height</p>
                    <p>{camper.height || "N/A"}</p>
                </div>
                <div className={css.texts}>
                    <p>Tank</p>
                    <p>{camper.tank || "N/A"}</p>
                </div>
                <div className={css.texts}>
                    <p>Consumption</p>
                    <p>{camper.consumption || "N/A"}</p>
                </div>
            </div>
        </div>
    );
}

VehicleDetails.propTypes = {
    camper: PropTypes.shape({
        form: PropTypes.string,
        length: PropTypes.string, // Тип даних - string
        width: PropTypes.string, // Тип даних - string
        height: PropTypes.string, // Тип даних - string
        tank: PropTypes.string, // Тип даних - string
        consumption: PropTypes.string,
        // ... інші властивості camper, якщо потрібно
    }),
};

export default VehicleDetails;