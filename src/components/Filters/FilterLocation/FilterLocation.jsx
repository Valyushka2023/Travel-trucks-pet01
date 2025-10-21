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
// import { useEffect, useState, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import css from './FilterLocation.module.css';

// const FilterLocation = ({ campers, location, setLocation }) => {
//   const { t } = useTranslation('filter_location');
//   const [locations, setLocations] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     if (campers && campers.length > 0) {
//       const uniqueLocations = Array.from(
//         new Set(campers.map(camper => camper.location))
//       );
//       setLocations(uniqueLocations);
//     }
//   }, [campers]);

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
//     setIsOpen(false);
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   // Хелпер для обробки клавіатури на головному перемикачі
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       toggleDropdown();
//     }
//   };

//   const isLocationSelected = location !== 'all';
//   const displayLocation = location === 'all' ? 'All locations' : location;

//   return (
//     <div className={css['input-wrapper']} ref={dropdownRef}>
//       {/* Головний перемикач (Рядок 51: Виправлено A11y) */}
//       <div
//         className={`${css['scale-wrapper']} ${isLocationSelected ? css.selected : ''}`}
//         onClick={toggleDropdown}
//         role="button"
//         tabIndex={0}
//         onKeyDown={handleKeyPress}
//         // Додаткові A11y атрибути для дропдаунів
//         aria-expanded={isOpen}
//         aria-controls="location-dropdown-list"
//       >
//         <svg
//           className={css['icon-map']}
//           width="20"
//           height="20"
//           viewBox="0 0 32 32"
//         >
//           <use href="/icons.svg#icon-map"></use>
//         </svg>
//         <div className={css['location-display']}>{displayLocation}</div>
//       </div>
//       {isOpen && (
//         <div
//           className={css['dropdown-list']}
//           id="location-dropdown-list" // Зв'язуємо з aria-controls
//         >
//           {/* 'All locations' (Рядок 71: Виправлено на <button>) */}
//           <button
//             type="button"
//             className={`${css['dropdown-item']} ${location === 'all' ? css.selectedItem : ''}`}
//             onClick={() => handleLocationSelect('all')}
//           >
//             {t('all_locations')}
//           </button>
//           {locations.map(loc => (
//             <button
//               type="button"
//               key={loc}
//               className={`${css['dropdown-item']} ${location === loc ? css.selectedItem : ''}`}
//               onClick={() => handleLocationSelect(loc)}
//             >
//               {loc}
//             </button>
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
import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './FilterLocation.module.css';

/**
 * Компонент FilterLocation надає користувачеві випадаючий список
 * для вибору локації кемпера. Він динамічно генерує унікальні
 * локації з наданого масиву кемперів і підтримує переклад.
 */
function FilterLocation({ campers, location, setLocation }) {
  // Отримання функції перекладу (t) з неймспейсу 'filter_location'
  const { t } = useTranslation('filter_location');

  // Стан для зберігання унікальних локацій, отриманих від кемперів
  const [locations, setLocations] = useState([]);

  // Стан для керування видимістю випадаючого списку
  const [isOpen, setIsOpen] = useState(false);

  // Референс для доступу до DOM-елемента контейнера і визначення кліку поза ним
  const dropdownReference = useRef(null);

  // =========================================================================
  // Ефект для завантаження унікальних локацій
  // =========================================================================
  useEffect(() => {
    if (campers && campers.length > 0) {
      // Створюємо масив унікальних локацій, використовуючи Set
      const uniqueLocations = Array.from(
        new Set(campers.map(camper => camper.location))
      );
      setLocations(uniqueLocations);
    }
  }, [campers]); // Запускається при зміні масиву кемперів

  // =========================================================================
  // Ефект для обробки кліку поза випадаючим списком (закриття)
  // =========================================================================
  useEffect(() => {
    const handleClickOutside = event => {
      // Перевіряємо, чи існує референс і чи клік був поза контейнером
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
  }, []); // Запускається один раз при монтуванні

  // =========================================================================
  // Функції-обробники
  // =========================================================================

  // Обробник вибору локації
  const handleLocationSelect = useCallback(
    selectedLocation => {
      setLocation(selectedLocation);
      setIsOpen(false);
    },
    [setLocation]
  );

  // Обробник перемикання випадаючого списку
  const toggleDropdown = useCallback(() => {
    setIsOpen(previousState => !previousState);
  }, []);

  // Обробник натискання клавіш на головному перемикачі (для доступності)
  const handleKeyPress = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  };

  // Обробник для запобігання прокручуванню сторінки при досягненні кінця списку локацій
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

  // =========================================================================
  // Динамічні дані
  // =========================================================================

  const isLocationSelected = location !== 'all';

  // 💥 ЛОГІКА ПЕРЕКЛАДУ: Визначення, що відображати у головному полі
  const displayLocation =
    location === 'all'
      ? t('all_locations') // Переклад "All locations"
      : t(`locations.${location}`, location); // Переклад конкретної локації

  return (
    <div className={css['input-wrapper']} ref={dropdownReference}>
      {/* Головний перемикач */}
      <div
        className={`${css['scale-wrapper']} ${isLocationSelected ? css.selected : ''}`}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyPress}
        // Атрибути доступності
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
          onWheel={handleScrollPrevent} // Запобігання прокручуванню сторінки
        >
          {/* Кнопка 'Всі локації' */}
          <button
            type="button"
            className={`${css['dropdown-item']} ${location === 'all' ? css.selectedItem : ''}`}
            onClick={() => handleLocationSelect('all')}
          >
            {t('all_locations')}
          </button>

          {/* Список унікальних локацій */}
          {locations.map(loc => (
            <button
              type="button"
              key={loc}
              className={`${css['dropdown-item']} ${location === loc ? css.selectedItem : ''}`}
              onClick={() => handleLocationSelect(loc)}
            >
              {/* 💥 ПЕРЕКЛАД НАЗВИ МІСТА */}
              {t(`locations.${loc}`, loc)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Визначення очікуваних властивостей
FilterLocation.propTypes = {
  campers: PropTypes.array.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.string,
};

export default FilterLocation;
