import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './VehicleDetails.module.css';

function VehicleDetails({ camper }) {
  const { t } = useTranslation('vechicle_details');
  const { t: t_units } = useTranslation('units');

  if (!camper) {
    return (
      <div className={css['vehicle-container']}>Loading vehicle details...</div>
    );
  }

  const getNumericValue = value => {
    if (typeof value !== 'string') return value;
    const match = value.match(/^-?\d+([.,]\d+)?/);
    return match ? match[0] : value;
  };

  const formatValue = (key, value) => {
    if (!value) return 'N/A';

    const numericValue = getNumericValue(value);

    switch (key) {
      case 'length':
      case 'width':
      case 'height':
        return `${numericValue} ${t_units('m')}`;
      case 'tank':
        return `${numericValue} ${t_units('l')}`;
      case 'consumption':
        return `${numericValue}${t_units('l_per_100km')}`;
      default:
        return value;
    }
  };

  const translateForm = formValue => {
    if (!formValue) return 'N/A';

    const translationKey = `form_${formValue.toLowerCase().replace(/ /g, '_')}`;

    const translated = t(translationKey);
    return translated === translationKey ? formValue : translated;
  };

  return (
    <div className={css['vehicle-container']}>
      <h3>{t('vechicle_details')}</h3>

      <div className={css.divider}></div>

      <div className={css['vehicle-info']}>
        <div className={css.texts}>
          <p>{t('form')}</p>
          <p>{translateForm(camper.form)}</p>
        </div>
        <div className={css.texts}>
          <p>{t('length')}</p>
          <p>{formatValue('length', camper.length)}</p>
        </div>
        <div className={css.texts}>
          <p>{t('width')}</p>
          <p>{formatValue('width', camper.width)}</p>
        </div>
        <div className={css.texts}>
          <p>{t('height')}</p>
          <p>{formatValue('height', camper.height)}</p>
        </div>
        <div className={css.texts}>
          <p>{t('tank')}</p>
          <p>{formatValue('tank', camper.tank)}</p>
        </div>
        <div className={css.texts}>
          <p>{t('consumption')}</p>
          <p>{formatValue('consumption', camper.consumption)}</p>
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
