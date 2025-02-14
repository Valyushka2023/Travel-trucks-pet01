import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "./FilterLocation.module.css";

const FilterLocation = ({ campers, location, setLocation }) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (campers && campers.length > 0) {
            const uniqueLocations = new Set();
            campers.forEach(camper => {
                const [country, city] = camper.location.split(", ");
                uniqueLocations.add(`${city}, ${country}`);
            });
            setLocations(Array.from(uniqueLocations));
        }
    }, [campers]);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    return (
        <div className={css.filterContainer}> {/* Combined container */}
            <h5 className={css.filterTitle}>Location</h5> {/* Consistent naming */}
            <div className={css.inputWrapper}>
                <svg className={css.iconMap} width="20" height="20" viewBox="0 0 32 32">
                    <use href="/icons.svg#icon-map"></use>
                </svg>
                <select
                    value={location}
                    onChange={handleLocationChange}
                    className={css.locationInput}
                >
                    <option value="all" className={css.option}>
                        All locations
                    </option>
                    {locations.map((location) => (
                        <option key={location} value={location} className={css.option}>
                            {location}
                        </option>
                        
                    ))}
                </select>
            </div>
        </div>
    );
};

FilterLocation.propTypes = {
    campers: PropTypes.array.isRequired,
    setLocation: PropTypes.func.isRequired,
    location: PropTypes.string,
};

export default FilterLocation;