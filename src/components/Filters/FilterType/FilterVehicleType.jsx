import React, { useState } from 'react';
import css from './FilterVehicleType.module.css';

const filterButtons = [
    { icon: 'van', label: 'Van', ariaLabel: 'Фургон' },
    { icon: 'fully', label: 'Fully Integrated', ariaLabel: 'Повністю інтегрований' }, 
      { icon: 'alcove', label: 'Alcove', ariaLabel: 'Альтанка' },
];

const FilterVehicleType = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        van: false,
       fully: false,  
        alcove: false,
       
    });

    const handleFilterChange = (filterName) => {
        setFilters({
            ...filters,
            [filterName]: !filters[filterName],
        });
        onFilter({
            ...filters,
            [filterName]: !filters[filterName],
        });
    };

    return (
        <div className={css.vehicleType}>
            <h3 className={css.textType}>Vehicle type</h3>
            <hr className={css.divider} />
            <div className={css.typeContainer}> 
                {filterButtons.map((button) => (
             
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

export default FilterVehicleType;

