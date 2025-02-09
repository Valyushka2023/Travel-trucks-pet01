
import React from 'react';
import css from './FilterVehicleEquipment.module.css';

const FilterVehicleEquipment = () => {
  const handleAcClick = () => { /* ...  */ }; // Приклад обробника кліку
  const handleAutomaticClick = () => { /* ...  */ }; // Приклад обробника кліку
  const handleKitchenClick = () => { /* ...  */ }; // І т.д.
  const handleTvClick = () => { /* ...  */ };
  const handleBathroomClick = () => { /* ...  */ };

  return (
    <div className={css.vehicleEquipment}>
      <h3 className={css.textEquipment}>Vehicle equipment</h3>
      <hr className={css.divider} />

      <div className={css.equipmentContainer}>
        <button className={css.rawIcon} aria-label="Кондиціонер" onClick={handleAcClick}>
          <svg className={css.iconAc} width="32" height="64" viewBox="0 0 16 32">
            <use href="/icons.svg#icon-icon-ac"></use> 
          </svg>
        </button>

        <button className={css.rawIcon} aria-label="Автоматична коробка передач" onClick={handleAutomaticClick}>
          <svg className={css.iconAutomatic} width="78" height="64" viewBox="0 0 39 32">
            <use href="/icons.svg#icon-icon-automatic"></use> 
          </svg>
        </button>

        <button className={css.rawIcon} aria-label="Кухня" onClick={handleKitchenClick}>
          <svg className={css.iconKitchen} width="59" height="64" viewBox="0 0 30 32">
            <use href="/icons.svg#icon-icon-kitchen"></use> 
          </svg>
        </button>

        <button className={css.rawIcon} aria-label="Телевізор" onClick={handleTvClick}>
          <svg className={css.iconTv} width="32" height="64" viewBox="0 0 16 32">
            <use href="/icons.svg#icon-icon-tv"></use> 
          </svg>
        </button>

        <button className={css.rawIcon} aria-label="Ванна кімната" onClick={handleBathroomClick}>
          <svg className={css.iconBathroom} width="75" height="64" viewBox="0 0 38 32">
            <use href="/icons.svg#icon-icon-bathroom"></use> 
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FilterVehicleEquipment;