// import { useState, useEffect, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import css from './FilterVehicleEquipment.module.css';

// const filterButtons = [
//   { icon: 'AC', label: 'AC', ariaLabel: 'Кондиціонер', type: 'boolean' },
//   {
//     icon: 'transmission',
//     label: 'Automatic',
//     ariaLabel: 'Автоматична коробка передач',
//     type: 'string',
//   },
//   { icon: 'kitchen', label: 'Kitchen', ariaLabel: 'Кухня', type: 'boolean' },
//   { icon: 'TV', label: 'TV', ariaLabel: 'Телевізор', type: 'boolean' },
//   {
//     icon: 'bathroom',
//     label: 'Bathroom',
//     ariaLabel: 'Ванна кімната',
//     type: 'boolean',
//   },
// ];

// const FilterVehicleEquipment = ({ onFilter, currentFilters }) => {
//   const { t } = useTranslation('filter_vehicle_equipment');
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

//   const handleFilterChange = (filterName, type) => {
//     const updatedFilters = { ...filters };

//     const button = filterButtons.find(button => button.icon === filterName);

//     if (type === 'string') {
//       const newValue =
//         updatedFilters[filterName] === button.label ? null : button.label;
//       updatedFilters[filterName] = newValue;
//     } else if (type === 'boolean') {
//       updatedFilters[filterName] = !updatedFilters[filterName];
//     }

//     setFilters(updatedFilters);
//     onFilter(updatedFilters);
//   };

//   return (
//     <div className={css['vehicle-equipment']}>
//       <h3 className={css['text-equipment']}>{t('vehicle_equipment')}</h3>
//       <hr className={css.divider} />

//       <div className={css['equipment-container']}>
//         {filterButtons.map(button => (
//           <button
//             key={button.icon}
//             className={`${css['raw-icon']} ${button.label.includes(' ') ? css.multiLine : ''} ${
//               (button.type === 'boolean' && currentFilters[button.icon]) ||
//               (button.type === 'string' &&
//                 currentFilters[button.icon] === button.label)
//                 ? css.active
//                 : ''
//             }`}
//             aria-label={button.ariaLabel}
//             onClick={() => handleFilterChange(button.icon, button.type)}
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

// FilterVehicleEquipment.propTypes = {
//   onFilter: PropTypes.func.isRequired,
//   currentFilters: PropTypes.object.isRequired, // Додаємо propType для currentFilters
// };

// export default FilterVehicleEquipment;
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './FilterVehicleEquipment.module.css';

const filterButtons = [
  // ✅ Додано ariaLabelKey замість жорстко закодованого ariaLabel
  {
    icon: 'AC',
    labelKey: 'label_ac',
    label: 'AC',
    ariaLabelKey: 'aria_ac', // 👈 Використовуємо ключ
    type: 'boolean',
  },
  {
    icon: 'transmission',
    labelKey: 'label_transmission',
    label: 'Automatic',
    ariaLabelKey: 'aria_transmission', // 👈 Використовуємо ключ
    type: 'string',
  },
  {
    icon: 'kitchen',
    labelKey: 'label_kitchen',
    label: 'Kitchen',
    ariaLabelKey: 'aria_kitchen', // 👈 Використовуємо ключ
    type: 'boolean',
  },
  {
    icon: 'TV',
    labelKey: 'label_tv',
    label: 'TV',
    ariaLabelKey: 'aria_tv', // 👈 Використовуємо ключ
    type: 'boolean',
  },
  {
    icon: 'bathroom',
    labelKey: 'label_bathroom',
    label: 'Bathroom',
    ariaLabelKey: 'aria_bathroom', // 👈 Використовуємо ключ
    type: 'boolean',
  },
];

const FilterVehicleEquipment = ({ onFilter, currentFilters }) => {
  const { t } = useTranslation('filter_vehicle_equipment');
  // currentFilters передається як проп
  // Використовуємо useEffect для оновлення внутрішнього стану при зміні пропу currentFilters
  const prevFiltersRef = useRef(); // Використовуємо реф для зберігання попередніх currentFilters, щоб уникнути нескінченних циклів

  useEffect(() => {
    // Це гарантує, що внутрішній стан `filters` відображає `currentFilters` від батьківського компонента
    // при зміні локації або дії очищення фільтрів.
    if (
      JSON.stringify(currentFilters) !== JSON.stringify(prevFiltersRef.current)
    ) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  useEffect(() => {
    prevFiltersRef.current = currentFilters;
  });

  const [filters, setFilters] = useState(currentFilters); // Ініціалізуємо з currentFilters

  const handleFilterChange = (filterName, type) => {
    const updatedFilters = { ...filters };

    const button = filterButtons.find(button => button.icon === filterName);

    if (type === 'string') {
      // Для string (transmission) ми зберігаємо в фільтрах оригінальне англійське значення
      // (наприклад, 'Automatic'), а не його переклад.
      const originalLabel = button.label;
      const newValue =
        updatedFilters[filterName] === originalLabel ? null : originalLabel;
      updatedFilters[filterName] = newValue;
    } else if (type === 'boolean') {
      updatedFilters[filterName] = !updatedFilters[filterName];
    }

    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className={css['vehicle-equipment']}>
      <h3 className={css['text-equipment']}>{t('vehicle_equipment')}</h3>
      <hr className={css.divider} />

      <div className={css['equipment-container']}>
        {filterButtons.map(button => (
          <button
            key={button.icon}
            className={`${css['raw-icon']} ${
              // Умовний клас для багаторядкового тексту тепер повинен використовувати переклад
              t(button.labelKey).includes(' ') ? css.multiLine : ''
            } ${
              (button.type === 'boolean' && currentFilters[button.icon]) ||
              (button.type === 'string' &&
                // Порівняння з оригінальним label для коректної логіки фільтрації
                currentFilters[button.icon] === button.label)
                ? css.active
                : ''
            }`}
            // ✅ ВИПРАВЛЕНО A11y: Використовуємо ключ для aria-label, щоб забезпечити переклад
            aria-label={t(button.ariaLabelKey)}
            onClick={() => handleFilterChange(button.icon, button.type)}
          >
            <svg className={css.icon}>
              <use href={`/icons.svg#icon-icon-button-${button.icon}`}></use>
            </svg>
            {/* ✅ ОСНОВНИЙ ПЕРЕКЛАД */}
            <span className={css['icon-text']}>{t(button.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

FilterVehicleEquipment.propTypes = {
  onFilter: PropTypes.func.isRequired,
  currentFilters: PropTypes.object.isRequired, // Додаємо propType для currentFilters
};

export default FilterVehicleEquipment;
