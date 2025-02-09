// import React from "react";
// import PropTypes from "prop-types";
// import css from "./FilterLocation.module.css";




// const FilterLocation = ({ location, setLocation }) => {
//   const handleLocationChange = (e) => {
//     setLocation(e.target.value.trim());
//   };

//   return (
//     <div className={css.textInputContainer}>
//       <h5 className={css.supportingText}>Location</h5>
//       <div className={css.inputWrapper}>
//         <svg className={css.iconMap} width="20" height="20" viewBox="0 0 32 32">
//           <use href="/icons.svg#icon-map"></use>
//         </svg>
//         <input
//           type="text"
//           value={location}
//           onChange={handleLocationChange}
//           className={css.locationInput}
//           placeholder="Enter location..."
//         />
//       </div>
//     </div>
//   );
// };

// FilterLocation.propTypes = {
//   setLocation: PropTypes.func.isRequired,
//   location: PropTypes.string.isRequired,
// };
// export default FilterLocation;




/*  інший варіант локації */ 


import React from 'react';
import PropTypes from 'prop-types';
import css from './FilterLocation.module.css';

const FilterLocation = ({ setLocation, location }) => {
    const handleLocationChange = (event) => {
        setLocation(event.target.value); // або інша логіка встановлення location
    };

    return (
        <div className={css.filterLocation}>
            <h4 className={css.filterTitle}>Location</h4>
            <select value={location?.pathname || "/catalog"} onChange={handleLocationChange}> {/* Використовуємо location */}
                <option value="/catalog">All locations</option>
                <option value="/catalog/ukraine">Ukraine</option>
                <option value="/catalog/poland">Poland</option>
                {/* Додайте інші опції */}
            </select>
        </div>
    );
};

FilterLocation.propTypes = {
    setLocation: PropTypes.func.isRequired,
    location: PropTypes.object,
};

export default FilterLocation;