import { useState, useEffect, useRef } from 'react';
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

const FilterVehicleType = ({ onFilter, currentFilters }) => {
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
            className={`${css.rawIcon} ${button.label.includes(' ') ? css.multiLine : ''} ${
              currentFilters[button.icon] ? css.active : ''
            }`}
            /* Використовуємо currentFilters для активного стану */
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
  currentFilters: PropTypes.object.isRequired, // Додаємо propType для currentFilters
};

export default FilterVehicleType;
