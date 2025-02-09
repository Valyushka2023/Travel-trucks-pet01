import React from 'react';
import css from './FilterVehicleType.module.css';

const FilterVehicleType = () => {
  return (
    <div className={css.vehicleType}>
      <h3 className={css.textType}>Vehicle type</h3>
      <hr className={css.divider} />
      <div className={css.typeRaw}>
        <div className={css.rawIcon}>
          <svg className={css.iconVan} width="32" height="64" viewBox="0 0 16 32">
            <use href="/icons.svg#icon-icon-van"></use>
          </svg>
        </div>
        <div className={css.rawIcon}>
          <svg className={css.iconFully} width="80" height="88" viewBox="0 0 29 32">
            <use href="/icons.svg#icon-icon-fully"></use>
          </svg>
        </div>
        <div className={css.rawIcon}>
          <svg className={css.iconAlcove} width="52" height="64" viewBox="0 0 26 32">
            <use href="/icons.svg#icon-icon-alcove"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterVehicleType;