import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './FilterLocation.module.css';

function FilterLocation({ campers, location, setLocation }) {
  const { t } = useTranslation('filter_location');
  const [locations, setLocations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownReference = useRef(null);

  useEffect(() => {
    if (campers && campers.length > 0) {
      const uniqueLocations = Array.from(
        new Set(campers.map(camper => camper.location))
      );
      setLocations(uniqueLocations);
    }
  }, [campers]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        dropdownReference.current &&
        !dropdownReference.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = useCallback(
    selectedLocation => {
      setLocation(selectedLocation);
      setIsOpen(false);
    },
    [setLocation]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(previousState => !previousState);
  }, []);

  const handleKeyPress = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  };

  const handleScrollPrevent = event => {
    const target = event.currentTarget;
    const isScrollable = target.scrollHeight > target.clientHeight;

    if (!isScrollable) return;

    const isAtTop = event.deltaY < 0 && target.scrollTop === 0;
    const isAtBottom =
      event.deltaY > 0 &&
      target.scrollTop + target.clientHeight >= target.scrollHeight;

    if (isAtTop || isAtBottom) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const isLocationSelected = location !== 'all';

  const displayLocation =
    location === 'all'
      ? t('all_locations')
      : t(`locations.${location}`, location);
  return (
    <div className={css['input-wrapper']} ref={dropdownReference}>
      <div
        className={`${css['scale-wrapper']} ${isLocationSelected ? css.selected : ''}`}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyPress}
        aria-expanded={isOpen}
        aria-controls="location-dropdown-list"
      >
        <svg
          className={css['icon-map']}
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <use href="/icons.svg#icon-map"></use>
        </svg>
        <div className={css['location-display']}>{displayLocation}</div>
      </div>
      {isOpen && (
        <div
          className={css['dropdown-list']}
          id="location-dropdown-list"
          onWheel={handleScrollPrevent}
        >
          <button
            type="button"
            className={`${css['dropdown-item']} ${location === 'all' ? css.selectedItem : ''}`}
            onClick={() => handleLocationSelect('all')}
          >
            {t('all_locations')}
          </button>
          {locations.map(loc => (
            <button
              type="button"
              key={loc}
              className={`${css['dropdown-item']} ${location === loc ? css.selectedItem : ''}`}
              onClick={() => handleLocationSelect(loc)}
            >
              {t(`locations.${loc}`, loc)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

FilterLocation.propTypes = {
  campers: PropTypes.array.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.string,
};

export default FilterLocation;
