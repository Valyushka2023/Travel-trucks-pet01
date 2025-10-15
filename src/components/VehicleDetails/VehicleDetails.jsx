import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './VehicleDetails.module.css';

function VehicleDetails({ camper }) {
  const { t, i18n } = useTranslation('vechicle_details');
  if (!camper) {
    return (
      <div className={css['vehicleContainer']}>Loading vehicle details...</div>
    );
  }

  return (
    <div className={css['vehicle-container']}>
      <h3>{t('vechicle_details')}</h3>

      <div className={css.divider}></div>
      <div className={css['vehicle-info']}>
        <div className={css.texts}>
          <p>{t('form')}</p>
          <p>{camper.form || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>{t('length')}</p>
          <p>{camper.length || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>{t('width')}</p>
          <p>{camper.width || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>{t('height')}</p>
          <p>{camper.height || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>{t('tank')}</p>
          <p>{camper.tank || 'N/A'}</p>
        </div>
        <div className={css.texts}>
          <p>{t('consumption')}</p>
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
