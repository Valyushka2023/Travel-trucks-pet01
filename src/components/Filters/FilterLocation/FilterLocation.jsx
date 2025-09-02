import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import css from './FilterLocation.module.css';

const FilterLocation = ({ campers, location, setLocation }) => {
  const [locations, setLocations] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Стан для керування відкриттям/закриттям дропдауну
  const dropdownRef = useRef(null); // Референс для відстеження кліків поза дропдауном

  useEffect(() => {
    if (campers && campers.length > 0) {
      const uniqueLocations = Array.from(
        new Set(campers.map(camper => camper.location))
      );
      setLocations(uniqueLocations);
    }
  }, [campers]);

  // Закриття дропдауну при кліку поза ним
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = selectedLoc => {
    setLocation(selectedLoc);
    setIsOpen(false); // Закриваємо дропдаун після вибору
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isLocationSelected = location !== 'all';
  const displayLocation = location === 'all' ? 'All locations' : location;

  return (
    <div className={css.inputWrapper} ref={dropdownRef}>
      {' '}
      {/* Додаємо референс сюди */}
      <div
        className={`${css.scaleWrapper} ${isLocationSelected ? css.selected : ''}`}
        onClick={toggleDropdown} // Клік на wrapper відкриває/закриває дропдаун
      >
        <svg className={css.iconMap} width="20" height="20" viewBox="0 0 32 32">
          <use href="/icons.svg#icon-map"></use>
        </svg>
        <div className={css.locationDisplay}>
          {' '}
          {/* Це буде відображати обрану локацію */}
          {displayLocation}
        </div>
      </div>
      {isOpen && ( // Відображаємо список, якщо isOpen = true
        <div className={css.dropdownList}>
          <div
            className={`${css.dropdownItem} ${location === 'all' ? css.selectedItem : ''}`}
            onClick={() => handleLocationSelect('all')}
          >
            All locations
          </div>
          {locations.map(loc => (
            <div
              key={loc}
              className={`${css.dropdownItem} ${location === loc ? css.selectedItem : ''}`}
              onClick={() => handleLocationSelect(loc)}
            >
              {loc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FilterLocation.propTypes = {
  campers: PropTypes.array.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.string,
};

export default FilterLocation;
