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
