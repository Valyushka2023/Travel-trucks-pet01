// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import css from './VehicleDetails.module.css';

// function VehicleDetails({ camper }) {
//   const { t } = useTranslation('vechicle_details');
//   if (!camper) {
//     return (
//       <div className={css['vehicleContainer']}>Loading vehicle details...</div>
//     );
//   }

//   return (
//     <div className={css['vehicle-container']}>
//       <h3>{t('vechicle_details')}</h3>

//       <div className={css.divider}></div>
//       <div className={css['vehicle-info']}>
//         <div className={css.texts}>
//           <p>{t('form')}</p>
//           <p>{camper.form || 'N/A'}</p>
//         </div>
//         <div className={css.texts}>
//           <p>{t('length')}</p>
//           <p>{camper.length || 'N/A'}</p>
//         </div>
//         <div className={css.texts}>
//           <p>{t('width')}</p>
//           <p>{camper.width || 'N/A'}</p>
//         </div>
//         <div className={css.texts}>
//           <p>{t('height')}</p>
//           <p>{camper.height || 'N/A'}</p>
//         </div>
//         <div className={css.texts}>
//           <p>{t('tank')}</p>
//           <p>{camper.tank || 'N/A'}</p>
//         </div>
//         <div className={css.texts}>
//           <p>{t('consumption')}</p>
//           <p>{camper.consumption || 'N/A'}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// VehicleDetails.propTypes = {
//   camper: PropTypes.shape({
//     form: PropTypes.string,
//     length: PropTypes.string,
//     width: PropTypes.string,
//     height: PropTypes.string,
//     tank: PropTypes.string,
//     consumption: PropTypes.string,
//   }),
// };

// export default VehicleDetails;
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

  // 💡 Допоміжна функція для отримання числової частини (ігноруючи одиниці бекенда)
  const getNumericValue = value => {
    if (typeof value !== 'string') return value;
    // Знайти число, включаючи десяткові роздільники (крапки або коми)
    const match = value.match(/^-?\d+([.,]\d+)?/);
    return match ? match[0] : value;
  };

  // 🔧 Форматування значень для одиниць
  const formatValue = (key, value) => {
    if (!value) return 'N/A';

    // Отримуємо лише числову частину (наприклад, "6.4" замість "6.4m")
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

  // 💡 Функція для перекладу значення форми
  const translateForm = formValue => {
    if (!formValue) return 'N/A';

    // Створюємо ключ перекладу, наприклад: 'alcove' -> 'form_alcove'
    // Це вимагає, щоб ключі у локалях були у форматі `form_` + [значення з бекенда]
    const translationKey = `form_${formValue.toLowerCase().replace(/ /g, '_')}`;

    // Якщо переклад знайдено, повертаємо його, інакше повертаємо оригінальне значення
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
          {/* ✅ ВИПРАВЛЕНО: Використовуємо translateForm для перекладу значення */}
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
