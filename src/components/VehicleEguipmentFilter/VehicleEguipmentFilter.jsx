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