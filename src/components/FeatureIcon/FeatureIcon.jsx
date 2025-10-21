// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import css from './FeatureIcon.module.css';

// const FeatureIcon = ({ camper }) => {
//   const { t } = useTranslation('feature_icon');
//   if (!camper) {
//     return null;
//   }

//   const featureIcons = [
//     { name: 'AC', key: 'AC', svgId: 'icon-icon-button-AC' },
//     { name: 'Bathroom', key: 'bathroom', svgId: 'icon-icon-button-bathroom' },
//     { name: 'Kitchen', key: 'kitchen', svgId: 'icon-icon-button-kitchen' },
//     { name: 'TV', key: 'TV', svgId: 'icon-icon-button-TV' },
//     { name: 'Radio', key: 'radio', svgId: 'icon-icon-button-radio' },
//     {
//       name: 'Refrigerator',
//       key: 'refrigerator',
//       svgId: 'icon-icon-button-refrigerator',
//     },
//     {
//       name: 'Microwave',
//       key: 'microwave',
//       svgId: 'icon-icon-button-microwave',
//     },
//     { name: 'Gas', key: 'gas', svgId: 'icon-icon-button-gas' },
//     { name: 'Water', key: 'water', svgId: 'icon-icon-button-water' },
//   ];

//   return (
//     <>
//       <div className={css['badges-container']}>
//         {featureIcons.map((feature, index) => {
//           const hasFeature = camper[feature.key];
//           return hasFeature ? (
//             <div className={css['feature-icon']} key={index}>
//               <svg className={css.icon} viewBox="0 0 24 24">
//                 <use href={`/icons.svg#${feature.svgId}`} />
//               </svg>
//               <span className={css.text}>{feature.name}</span>
//             </div>
//           ) : null;
//         })}
//       </div>
//     </>
//   );
// };

// FeatureIcon.propTypes = {
//   camper: PropTypes.shape({
//     features: PropTypes.objectOf(PropTypes.bool),
//   }).isRequired,
// };

// export default FeatureIcon;
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './FeatureIcon.module.css';

// ✅ Оновлено: Використовуємо labelKey для перекладу та збережено оригінальний key для доступу до даних.
const featureIcons = [
  // {
  //   key: 'adults',
  //   labelKey: 'label_adults',
  //   svgId: 'icon-users',
  //   type: 'count',
  // }, // Приклад для лічильника
  // {
  //   key: 'transmission',
  //   labelKey: 'label_transmission',
  //   svgId: 'icon-automatic',
  //   type: 'string',
  // }, // Приклад для рядка
  // {
  //   key: 'engine',
  //   labelKey: 'label_engine',
  //   svgId: 'icon-engine',
  //   type: 'string',
  // }, // Приклад для рядка
  // {
  //   key: 'beds',
  //   labelKey: 'label_beds',
  //   svgId: 'icon-beds',
  //   type: 'count',
  // },
  {
    key: 'AC',
    labelKey: 'label_ac',
    svgId: 'icon-icon-button-AC',
    type: 'boolean',
  },
  {
    key: 'bathroom',
    labelKey: 'label_bathroom',
    svgId: 'icon-icon-button-bathroom',
    type: 'boolean',
  },
  {
    key: 'kitchen',
    labelKey: 'label_kitchen',
    svgId: 'icon-icon-button-kitchen',
    type: 'boolean',
  },
  {
    key: 'TV',
    labelKey: 'label_tv',
    svgId: 'icon-icon-button-TV',
    type: 'boolean',
  },
  {
    key: 'radio',
    labelKey: 'label_radio',
    svgId: 'icon-icon-button-radio',
    type: 'boolean',
  },
  {
    key: 'refrigerator',
    labelKey: 'label_refrigerator',
    svgId: 'icon-icon-button-refrigerator',
    type: 'boolean',
  },
  {
    key: 'microwave',
    labelKey: 'label_microwave',
    svgId: 'icon-icon-button-microwave',
    type: 'boolean',
  },
  {
    key: 'gas',
    labelKey: 'label_gas',
    svgId: 'icon-icon-button-gas',
    type: 'boolean',
  },
  {
    key: 'water',
    labelKey: 'label_water',
    svgId: 'icon-icon-button-water',
    type: 'boolean',
  },
];

const FeatureIcon = ({ camper }) => {
  // Перевірка camper тут не потрібна, якщо вона є у PropType та подальшій логіці
  const { t } = useTranslation('feature_icon');

  if (!camper) {
    return null;
  }

  // Функція для отримання значення для відображення
  const getFeatureValue = (feature, value) => {
    if (feature.type === 'count' && typeof value === 'number') {
      // Для лічильників відображаємо кількість + перекладену назву
      return `${value} ${t(feature.labelKey)}`;
    }
    if (feature.type === 'boolean' && value) {
      // Для булевих значень відображаємо лише перекладену назву
      return t(feature.labelKey);
    }
    if (feature.type === 'string' && value) {
      // Для рядків (transmission, engine) відображаємо перекладену назву.
      // Можна додати більш складну логіку перекладу для 'Automatic'/'Manual' та 'gas'/'diesel',
      // але тут використовуємо загальний ключ для заголовка.
      return t(feature.labelKey);
    }
    return null; // Не відображати, якщо значення не відповідає типу/відсутнє
  };

  return (
    <>
      <div className={css['badges-container']}>
        {featureIcons.map(feature => {
          // Припускаємо, що проп camper містить всі необхідні поля (наприклад, camper.AC, camper.beds, camper.transmission)
          const featureValue = camper[feature.key];
          const displayText = getFeatureValue(feature, featureValue);

          // Відображаємо, лише якщо є значення для відображення
          return displayText ? (
            <div className={css['feature-icon']} key={feature.key}>
              <svg className={css.icon} viewBox="0 0 24 24">
                {/* Використовуємо feature.svgId для шляху до іконки */}
                <use href={`/icons.svg#${feature.svgId}`} />
              </svg>
              {/* ✅ ВИКОРИСТАННЯ ПЕРЕКЛАДЕНОГО ТЕКСТУ */}
              <span className={css.text}>{displayText}</span>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
};

FeatureIcon.propTypes = {
  // Припускаємо, що camper містить всі ключі в featureIcons на верхньому рівні
  camper: PropTypes.shape({
    adults: PropTypes.number,
    transmission: PropTypes.string,
    engine: PropTypes.string,
    beds: PropTypes.number,
    AC: PropTypes.bool,
    bathroom: PropTypes.bool,
    kitchen: PropTypes.bool,
    TV: PropTypes.bool,
    radio: PropTypes.bool,
    refrigerator: PropTypes.bool,
    microwave: PropTypes.bool,
    gas: PropTypes.bool,
    water: PropTypes.bool,
    // Додайте інші очікувані властивості тут
  }).isRequired,
};

export default FeatureIcon;
