import PropTypes from 'prop-types';
import css from './VehicleDetails.module.css';

function VehicleDetails({ camper }) {
  if (!camper) {
    return (
      <div className={css['vehicleContainer']}>Loading vehicle details...</div>
    );
  }

  return (
    <div className={css['vehicle-container']}>
      <h3>Vehicle details</h3>

      <div className={css.divider}></div>
      <div className={css['vehicle-info']}>
        <div className={css.texts}>
          <p>Form</p>
          <p>{camper.form || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>Length</p>
          <p>{camper.length || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>Width</p>
          <p>{camper.width || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>Height</p>
          <p>{camper.height || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>Tank</p>
          <p>{camper.tank || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>Consumption</p>
          <p>{camper.consumption || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

VehicleDetails.propTypes = {
  camper: PropTypes.shape({
    form: PropTypes.string,
    length: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    tank: PropTypes.string,
    consumption: PropTypes.string,
  }),
};

export default VehicleDetails;
