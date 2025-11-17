import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './FilterVehicleEquipment.module.css';

const filterButtons = [
  {
    icon: 'AC',
    labelKey: 'label_ac',
    label: 'AC',
    ariaLabelKey: 'aria_ac',
    type: 'boolean',
  },
  {
    icon: 'transmission',
    labelKey: 'label_transmission',
    label: 'Automatic',
    ariaLabelKey: 'aria_transmission',
    type: 'string',
  },
  {
    icon: 'kitchen',
    labelKey: 'label_kitchen',
    label: 'Kitchen',
    ariaLabelKey: 'aria_kitchen',
    type: 'boolean',
  },
  {
    icon: 'TV',
    labelKey: 'label_tv',
    label: 'TV',
    ariaLabelKey: 'aria_tv',
    type: 'boolean',
  },
  {
    icon: 'bathroom',
    labelKey: 'label_bathroom',
    label: 'Bathroom',
    ariaLabelKey: 'aria_bathroom',
    type: 'boolean',
  },
];

const FilterVehicleEquipment = ({ onFilter, currentFilters }) => {
  const { t } = useTranslation('filter_vehicle_equipment');
  const prevFiltersRef = useRef();

  useEffect(() => {
    if (
      JSON.stringify(currentFilters) !== JSON.stringify(prevFiltersRef.current)
    ) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  useEffect(() => {
    prevFiltersRef.current = currentFilters;
  });

  const [filters, setFilters] = useState(currentFilters);
  const handleFilterChange = (filterName, type) => {
    const updatedFilters = { ...filters };

    const button = filterButtons.find(button => button.icon === filterName);

    if (type === 'string') {
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
              t(button.labelKey).includes(' ') ? css.multiLine : ''
            } ${
              (button.type === 'boolean' && currentFilters[button.icon]) ||
              (button.type === 'string' &&
                currentFilters[button.icon] === button.label)
                ? css.active
                : ''
            }`}
            aria-label={t(button.ariaLabelKey)}
            onClick={() => handleFilterChange(button.icon, button.type)}
          >
            <svg className={css.icon}>
              <use href={`/icons.svg#icon-icon-button-${button.icon}`}></use>
            </svg>
            <span className={css['icon-text']}>{t(button.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

FilterVehicleEquipment.propTypes = {
  onFilter: PropTypes.func.isRequired,
  currentFilters: PropTypes.object.isRequired,
};

export default FilterVehicleEquipment;
