import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './FilterLocation.module.css';

const FilterLocation = ({ campers, location, setLocation }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (campers && campers.length > 0) {
      const uniqueLocations = Array.from(
        new Set(campers.map(camper => camper.location))
      );
      setLocations(uniqueLocations);
    }
  }, [campers]);

  const handleLocationChange = event => {
    setLocation(event.target.value);
  };

  const isLocationSelected = location !== 'all';

  return (
    <div className={css.filterContainer}>
      <h5 className={css.filterTitle}>Location</h5>
      <div className={css.inputWrapper}>
        <div
          className={`${css.scaleWrapper} ${isLocationSelected ? css.selected : ''}`}
        >
          {' '}
          {/* Додаємо клас selected сюди */}
          <svg
            className={css.iconMap}
            width="20"
            height="20"
            viewBox="0 0 32 32"
          >
            <use href="/icons.svg#icon-map"></use>
          </svg>
          <select
            value={location}
            onChange={handleLocationChange}
            className={css.locationInput} // Клас 'selected' тепер не потрібен тут
          >
            <option value="all">All locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
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
