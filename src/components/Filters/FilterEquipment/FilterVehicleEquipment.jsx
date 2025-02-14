import React, { useState } from 'react';
import css from './FilterVehicleEquipment.module.css';

const filterButtons = [
    { icon: 'ac', label: 'AC', ariaLabel: 'Кондиціонер' },
    { icon: 'automatic', label: 'Automatic', ariaLabel: 'Автоматична коробка передач' },
    { icon: 'kitchen', label: 'Kitchen', ariaLabel: 'Кухня' },
    { icon: 'tv', label: 'TV', ariaLabel: 'Телевізор' },
    { icon: 'bathroom', label: 'Bathroom', ariaLabel: 'Ванна кімната' },
    // ... інші фільтри
];

const FilterVehicleEquipment = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        ac: false,
        automatic: false,
        kitchen: false,
        tv: false,
        bathroom: false,
        // ... інші фільтри
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
        <div className={css.vehicleEquipment}>
            <h3 className={css.textEquipment}>Vehicle equipment</h3>
            <hr className={css.divider} />

            <div className={css.equipmentContainer}>
                {filterButtons.map((button) => (
                    <button
                        key={button.icon}
                        className={css.rawIcon}
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

export default FilterVehicleEquipment;