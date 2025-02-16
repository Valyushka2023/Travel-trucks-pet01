// import React, { useState } from 'react';
// import css from './VehicleEguipmentFilter.module.css';

// const VehicleEquipmentFilter = () => {
//   // Стан для збереження активних фільтрів
//   const [activeFilters, setActiveFilters] = useState([]);

//   // Мапа для зв'язку фільтрів із CSS класами іконок
//   const equipment = [
//     { name: 'AC', className: css.iconAc },
//     { name: 'Automatic', className: css.iconAutomatic },
//     { name: 'Kitchen', className: css.iconKitchen },
//     // { name: 'TV', className: css.iconTv },
//     // { name: 'Bathroom', className: css.iconBathroom },
//   ];

//   // Обробник натискання на фільтр
//   const toggleFilter = (filterName) => {
//     setActiveFilters((prevFilters) =>
//       prevFilters.includes(filterName)
//         ? prevFilters.filter((filter) => filter !== filterName)
//         : [...prevFilters, filterName]
//     );
//   };

//   return (
//     <div className={css.filterButtons}>
//       {equipment.map((item) => (
//         <button
//           key={item.name}
//           onClick={() => toggleFilter(item.name)}
//           className={
//             activeFilters.includes(item.name) ? css.activeButton : css.button
//           }
//         >
//           {item.name}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default VehicleEquipmentFilter;


// import React, { useState } from 'react';
// import css from './FilterVehicleEquipment.module.css';

// const filterButtons = [
//     { icon: 'AC', label: 'AC', ariaLabel: 'Кондиціонер' },
//     { icon: 'transmission', label: 'Automatic', ariaLabel: 'Автоматична коробка передач' },
//     { icon: 'kitchen', label: 'Kitchen', ariaLabel: 'Кухня' },
//     { icon: 'TV', label: 'TV', ariaLabel: 'Телевізор' },
//     { icon: 'bathroom', label: 'Bathroom', ariaLabel: 'Ванна кімната' },
// ];


// const FilterVehicleEquipment = ({ onFilter }) => {
//     const [filters, setFilters] = useState({});

//     const handleFilterChange = (filterName) => {
//         const updatedFilters = { ...filters };
//         updatedFilters[filterName] = !updatedFilters[filterName];

//         setFilters(updatedFilters);
//         onFilter(updatedFilters);
//     };

//     return (
//         <div className={css.vehicleEquipment}>
//             <h3 className={css.textEquipment}>Vehicle equipment</h3>
//             <hr className={css.divider} />

//             <div className={css.equipmentContainer}>
//                 {filterButtons.map((button) => (
//                     <button
//                         key={button.icon}
//                         className={css.rawIcon}
//                         aria-label={button.ariaLabel}
//                         onClick={() => handleFilterChange(button.icon)}
//                     >
//                         <svg className={css.icon}>
//                             <use href={`/icons.svg#icon-icon-button-${button.icon}`}></use>
//                         </svg>
//                         <span className={css.iconText}>{button.label}</span>
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default FilterVehicleEquipment;