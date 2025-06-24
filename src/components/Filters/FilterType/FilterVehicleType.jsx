import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './FilterVehicleType.module.css';

const filterButtons = [
  { icon: 'van', label: 'Van', ariaLabel: 'Фургон' },
  {
    icon: 'fullyIntegrated',
    label: 'Fully Integrated',
    ariaLabel: 'Повністю інтегрований',
  },
  { icon: 'alcove', label: 'Alcove', ariaLabel: 'Альтанка' },
];

const FilterVehicleType = ({ onFilter }) => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = filterName => {
    const updatedFilters = { ...filters };
    updatedFilters[filterName] = !updatedFilters[filterName];

    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className={css.vehicleType}>
      <h3 className={css.textType}>Vehicle type</h3>
      <hr className={css.divider} />
      <div className={css.typeContainer}>
        {filterButtons.map(button => (
          <button
            key={button.icon}
            className={`${css.rawIcon} ${button.label.includes(' ') ? css.multiLine : ''}`}
            aria-label={button.ariaLabel}
            onClick={() => handleFilterChange(button.icon)}
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

FilterVehicleType.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterVehicleType;

// import { useState, useEffect } from 'react'; // Додаємо useEffect
// import PropTypes from 'prop-types';
// import css from './FilterVehicleType.module.css';

// const filterButtons = [
//   { icon: 'van', label: 'Van', ariaLabel: 'Фургон' },
//   {
//     icon: 'fullyIntegrated',
//     label: 'Fully Integrated',
//     ariaLabel: 'Повністю інтегрований',
//   },
//   { icon: 'alcove', label: 'Alcove', ariaLabel: 'Альтанка' },
// ];

// const FilterVehicleType = ({ onFilter, currentFilters }) => {
//   // Приймаємо currentFilters
//   // Використовуємо currentFilters для ініціалізації внутрішнього стану
//   // Це дозволяє компоненту бути "керованим" ззовні
//   const [filters, setFilters] = useState(currentFilters);

//   // useEffect для синхронізації внутрішнього стану з пропсом currentFilters
//   // Це спрацює, коли PageCatalog скине currentFilters на {}
//   useEffect(() => {
//     setFilters(currentFilters);
//   }, [currentFilters]); // Залежність від currentFilters

//   const handleFilterChange = filterName => {
//     const updatedFilters = { ...filters };

//     // Перемикаємо стан: якщо було true, стає undefined/false, і навпаки
//     // Це потрібно, щоб коректно позначати активність кнопки
//     updatedFilters[filterName] = !updatedFilters[filterName];

//     setFilters(updatedFilters);
//     onFilter(updatedFilters);
//   };

//   return (
//     <div className={css.vehicleType}>
//       <h3 className={css.textType}>Vehicle type</h3>
//       <hr className={css.divider} />
//       <div className={css.typeContainer}>
//         {filterButtons.map(button => (
//           <button
//             key={button.icon}
//             // Додаємо клас .active, якщо фільтр активований
//             className={`${css.rawIcon} ${button.label.includes(' ') ? css.multiLine : ''} ${filters[button.icon] ? css.active : ''}`}
//             aria-label={button.ariaLabel}
//             onClick={() => handleFilterChange(button.icon)}
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

// FilterVehicleType.propTypes = {
//   onFilter: PropTypes.func.isRequired,
//   currentFilters: PropTypes.object, // Додаємо PropTypes для currentFilters
// };

// export default FilterVehicleType;
