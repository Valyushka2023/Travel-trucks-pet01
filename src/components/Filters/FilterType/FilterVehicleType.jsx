// import { useState, useEffect, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import css from './FilterVehicleType.module.css';

// const filterButtons = [
//   { icon: 'van', label: 'Van', ariaLabel: 'Фургон', isMultiLine: false },
//   {
//     icon: 'fullyIntegrated',
//     label: (
//       <>
//         Fully
//         <br />
//         Integrated
//       </>
//     ),
//     ariaLabel: 'Повністю інтегрований',
//     isMultiLine: true,
//   },
//   {
//     icon: 'alcove',
//     label: 'Alcove',
//     ariaLabel: 'Альтанка',
//     isMultiLine: false,
//   },
// ];

// const FilterVehicleType = ({ onFilter, currentFilters }) => {
//   const { t } = useTranslation('filter_vehicle_type');
//   // currentFilters передається як проп
//   // Використовуємо useEffect для оновлення внутрішнього стану при зміні пропу currentFilters
//   const prevFiltersRef = useRef(); // Використовуємо реф для зберігання попередніх currentFilters, щоб уникнути нескінченних циклів

//   useEffect(() => {
//     // Це гарантує, що внутрішній стан `filters` відображає `currentFilters` від батьківського компонента
//     // при зміні локації або дії очищення фільтрів.
//     if (
//       JSON.stringify(currentFilters) !== JSON.stringify(prevFiltersRef.current)
//     ) {
//       setFilters(currentFilters);
//     }
//   }, [currentFilters]);

//   useEffect(() => {
//     prevFiltersRef.current = currentFilters;
//   });

//   const [filters, setFilters] = useState(currentFilters); // Ініціалізуємо з currentFilters

//   const handleFilterChange = filterName => {
//     const updatedFilters = { ...filters };
//     updatedFilters[filterName] = !updatedFilters[filterName];

//     setFilters(updatedFilters);
//     onFilter(updatedFilters);
//   };

//   return (
//     <div className={css['vehicle-type']}>
//       <h3 className={css['text-type']}>{t('vehicle_type')}</h3>
//       <hr className={css.divider} />
//       <div className={css['type-container']}>
//         {filterButtons.map(button => (
//           <button
//             key={button.icon}
//             className={`${css['raw-icon']} ${button.isMultiLine ? css.multiLine : ''} ${
//               currentFilters[button.icon] ? css.active : ''
//             }`}
//             /* Використовуємо currentFilters для активного стану */
//             aria-label={button.ariaLabel}
//             onClick={() => handleFilterChange(button.icon)}
//           >
//             <svg className={css.icon}>
//               <use href={`/icons.svg#icon-icon-button-${button.icon}`}></use>
//             </svg>
//             <span className={css['icon-text']}>{button.label}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// FilterVehicleType.propTypes = {
//   onFilter: PropTypes.func.isRequired,
//   currentFilters: PropTypes.object.isRequired, // Додаємо propType для currentFilters
// };

// export default FilterVehicleType;
import { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next'; // <-- ІМПОРТУЄМО Trans
import PropTypes from 'prop-types';
import css from './FilterVehicleType.module.css';

const filterButtons = [
  {
    icon: 'panelTruck',
    labelKey: 'label_panel-truck',
    ariaLabelKey: 'aria_panel-truck',
    isMultiLine: false,
  },

  {
    icon: 'fullyIntegrated',
    labelKey: 'label_fully_integrated',
    ariaLabelKey: 'aria_fully_integrated',
    isMultiLine: false,
  },
  {
    icon: 'alcove',
    labelKey: 'label_alcove',
    ariaLabelKey: 'aria_alcove',
    isMultiLine: false,
  },
];

const FilterVehicleType = ({ onFilter, currentFilters }) => {
  const { t } = useTranslation('filter_vehicle_type');
  const prevFiltersRef = useRef();

  useEffect(() => {
    if (
      JSON.stringify(currentFilters) !== JSON.stringify(prevFiltersRef.current)
    ) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  useEffect(() => {
    prevFiltersRef.current = currentFilters;
  });

  const [filters, setFilters] = useState(currentFilters);

  const handleFilterChange = filterName => {
    const updatedFilters = { ...filters };
    updatedFilters[filterName] = !updatedFilters[filterName];

    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className={css['vehicle-type']}>
      <h3 className={css['text-type']}>{t('vehicle_type')}</h3>
      <hr className={css.divider} />
      <div className={css['type-container']}>
        {filterButtons.map(button => (
          <button
            key={button.icon}
            className={`${css['raw-icon']} ${button.isMultiLine ? css.multiLine : ''} ${
              currentFilters[button.icon] ? css.active : ''
            }`}
            aria-label={t(button.ariaLabelKey)}
            onClick={() => handleFilterChange(button.icon)}
          >
            <svg className={css.icon}>
              <use href={`/icons.svg#icon-icon-button-${button.icon}`}></use>
            </svg>
            <span className={css['icon-text']}>
              {button.isMultiLine ? (
                // 🟢 ВИКОРИСТОВУЄМО Trans ДЛЯ БАГАТОРЯДКОВОГО ТЕКСТУ
                <Trans i18nKey={button.labelKey} components={{ br: <br /> }} />
              ) : (
                // Звичайний переклад
                t(button.labelKey)
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

FilterVehicleType.propTypes = {
  onFilter: PropTypes.func.isRequired,
  currentFilters: PropTypes.object.isRequired,
};

export default FilterVehicleType;
