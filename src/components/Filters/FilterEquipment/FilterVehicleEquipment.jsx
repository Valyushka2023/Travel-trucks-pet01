// * для вар з ітерацією, якщо різні типи даних з API

import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './FilterVehicleEquipment.module.css';

const filterButtons = [
  { icon: 'AC', label: 'AC', ariaLabel: 'Кондиціонер', type: 'boolean' },
  {
    icon: 'transmission',
    label: 'Automatic',
    ariaLabel: 'Автоматична коробка передач',
    type: 'string',
  },
  { icon: 'kitchen', label: 'Kitchen', ariaLabel: 'Кухня', type: 'boolean' },
  { icon: 'TV', label: 'TV', ariaLabel: 'Телевізор', type: 'boolean' },
  {
    icon: 'bathroom',
    label: 'Bathroom',
    ariaLabel: 'Ванна кімната',
    type: 'boolean',
  },
];

const FilterVehicleEquipment = ({ onFilter }) => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (filterName, type) => {
    const updatedFilters = { ...filters };

    const button = filterButtons.find(button => button.icon === filterName);

    if (type === 'string') {
      const newValue =
        updatedFilters[filterName] === button.label ? null : button.label;
      updatedFilters[filterName] = newValue;
    } else if (type === 'boolean') {
      updatedFilters[filterName] = !updatedFilters[filterName];
    }

    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className={css.vehicleEquipment}>
      <h3 className={css.textEquipment}>Vehicle equipment</h3>
      <hr className={css.divider} />

      <div className={css.equipmentContainer}>
        {filterButtons.map(button => (
          <button
            key={button.icon}
            className={`${css.rawIcon} ${button.label.includes(' ') ? css.multiLine : ''} ${filters[button.icon]?.value ? css.active : ''}`}
            aria-label={button.ariaLabel}
            onClick={() => handleFilterChange(button.icon, button.type)}
          >
            <svg className={css.icon}>
              <use href={`/icons.svg#icon-icon-button-${button.icon}`}></use>
            </svg>
            <span className={css.iconText}>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

FilterVehicleEquipment.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterVehicleEquipment;


// import { useState, useEffect } from 'react'; // Додаємо useEffect
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
//   // Приймаємо currentFilters
//   // Використовуємо currentFilters для ініціалізації внутрішнього стану
//   const [filters, setFilters] = useState(currentFilters);

//   // useEffect для синхронізації внутрішнього стану з пропсом currentFilters
//   useEffect(() => {
//     setFilters(currentFilters);
//   }, [currentFilters]); // Залежність від currentFilters

//   const handleFilterChange = (filterName, type) => {
//     const updatedFilters = { ...filters };

//     const button = filterButtons.find(button => button.icon === filterName);

//     if (type === 'string') {
//       // Для строкових типів (наприклад, 'transmission': 'Automatic')
//       // Якщо поточне значення співпадає з label кнопки, скидаємо його на undefined (або null)
//       // Інакше встановлюємо його на label кнопки
//       const newValue =
//         updatedFilters[filterName] === button.label ? undefined : button.label;
//       updatedFilters[filterName] = newValue;
//     } else if (type === 'boolean') {
//       // Для булевих типів (AC, Kitchen, TV, Bathroom)
//       // Просто перемикаємо на протилежне значення
//       updatedFilters[filterName] = !updatedFilters[filterName];
//     }

//     setFilters(updatedFilters); // Оновлюємо внутрішній стан компонента
//     onFilter(updatedFilters); // Передаємо оновлені фільтри батьківському компоненту
//   };

//   return (
//     <div className={css.vehicleEquipment}>
//       <h3 className={css.textEquipment}>Vehicle equipment</h3>
//       <hr className={css.divider} />

//       <div className={css.equipmentContainer}>
//         {filterButtons.map(button => (
//           <button
//             key={button.icon}
//             // Клас .active додається, якщо фільтр активований
//             // Для булевих типів: filters[button.icon] буде true
//             // Для строкових типів: filters[button.icon] буде співпадати з button.label
//             className={`${css.rawIcon} ${button.label.includes(' ') ? css.multiLine : ''} ${
//               (button.type === 'boolean' && filters[button.icon]) || // Якщо boolean і true
//               (button.type === 'string' &&
//                 filters[button.icon] === button.label) // Або string і значення співпадає
//                 ? css.active
//                 : ''
//             }`}
//             aria-label={button.ariaLabel}
//             onClick={() => handleFilterChange(button.icon, button.type)}
//           >
//             <svg className={css.icon}>
//               <use href={`/icons.svg#icon-icon-button-${button.icon}`}></use>
//             </svg>
//             <span className={css.iconText}>{button.label}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// FilterVehicleEquipment.propTypes = {
//   onFilter: PropTypes.func.isRequired,
//   currentFilters: PropTypes.object, // Додаємо PropTypes для currentFilters
// };

// export default FilterVehicleEquipment;
