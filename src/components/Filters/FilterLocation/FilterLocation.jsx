// import { useEffect, useState, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import css from './FilterLocation.module.css';

// const FilterLocation = ({ campers, location, setLocation }) => {
//   const { t } = useTranslation('filter_location');
//   const [locations, setLocations] = useState([]);
//   const [isOpen, setIsOpen] = useState(false); // Стан для керування відкриттям/закриттям дропдауну
//   const dropdownRef = useRef(null); // Референс для відстеження кліків поза дропдауном

//   useEffect(() => {
//     if (campers && campers.length > 0) {
//       const uniqueLocations = Array.from(
//         new Set(campers.map(camper => camper.location))
//       );
//       setLocations(uniqueLocations);
//     }
//   }, [campers]);

//   // Закриття дропдауну при кліку поза ним
//   useEffect(() => {
//     const handleClickOutside = event => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLocationSelect = selectedLoc => {
//     setLocation(selectedLoc);
//     setIsOpen(false); // Закриваємо дропдаун після вибору
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const isLocationSelected = location !== 'all';
//   const displayLocation = location === 'all' ? 'All locations' : location;

//   return (
//     <div className={css['input-wrapper']} ref={dropdownRef}>
//       {' '}
//       {/* Додаємо референс сюди */}
//       <div
//         className={`${css['scale-wrapper']} ${isLocationSelected ? css.selected : ''}`}
//         onClick={toggleDropdown} // Клік на wrapper відкриває/закриває дропдаун
//       >
//         <svg
//           className={css['icon-map']}
//           width="20"
//           height="20"
//           viewBox="0 0 32 32"
//         >
//           <use href="/icons.svg#icon-map"></use>
//         </svg>
//         <div className={css['location-display']}>
//           {' '}
//           {/* Це буде відображати обрану локацію */}
//           {displayLocation}
//         </div>
//       </div>
//       {isOpen && ( // Відображаємо список, якщо isOpen = true
//         <div className={css['dropdown-list']}>
//           <div
//             className={`${css['dropdown-item']} ${location === 'all' ? css.selectedItem : ''}`}
//             onClick={() => handleLocationSelect('all')}
//           >
//             {t('all_locations')}
//           </div>
//           {locations.map(loc => (
//             <div
//               key={loc}
//               className={`${css['dropdown-item']} ${location === loc ? css.selectedItem : ''}`}
//               onClick={() => handleLocationSelect(loc)}
//             >
//               {loc}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// FilterLocation.propTypes = {
//   campers: PropTypes.array.isRequired,
//   setLocation: PropTypes.func.isRequired,
//   location: PropTypes.string,
// };

// export default FilterLocation;
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './FilterLocation.module.css';

const FilterLocation = ({ campers, location, setLocation }) => {
  const { t } = useTranslation('filter_location');
  const [locations, setLocations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Хелпер для обробки клавіатури на головному перемикачі
  const handleKeyPress = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    }
  };

  const isLocationSelected = location !== 'all';
  const displayLocation = location === 'all' ? 'All locations' : location;

  return (
    <div className={css['input-wrapper']} ref={dropdownRef}>
      {/* Головний перемикач (Рядок 51: Виправлено A11y) */}
      <div
        className={`${css['scale-wrapper']} ${isLocationSelected ? css.selected : ''}`}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyPress}
        // Додаткові A11y атрибути для дропдаунів
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
          id="location-dropdown-list" // Зв'язуємо з aria-controls
        >
          {/* 'All locations' (Рядок 71: Виправлено на <button>) */}
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
              {loc}
            </button>
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
