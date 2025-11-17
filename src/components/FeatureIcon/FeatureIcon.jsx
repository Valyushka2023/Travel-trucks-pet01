import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './FeatureIcon.module.css';

const featureIcons = [
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
  const { t } = useTranslation('feature_icon');

  if (!camper) {
    return null;
  }

  const getFeatureValue = (feature, value) => {
    if (feature.type === 'count' && typeof value === 'number') {
      return `${value} ${t(feature.labelKey)}`;
    }
    if (feature.type === 'boolean' && value) {
      return t(feature.labelKey);
    }
    if (feature.type === 'string' && value) {
      return t(feature.labelKey);
    }
    return null;
  };

  return (
    <>
      <div className={css['badges-container']}>
        {featureIcons.map(feature => {
          const featureValue = camper[feature.key];
          const displayText = getFeatureValue(feature, featureValue);

          return displayText ? (
            <div className={css['feature-icon']} key={feature.key}>
              <svg className={css.icon} viewBox="0 0 24 24">
                <use href={`/icons.svg#${feature.svgId}`} />
              </svg>
              <span className={css.text}>{displayText}</span>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
};

FeatureIcon.propTypes = {
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
  }).isRequired,
};

export default FeatureIcon;
