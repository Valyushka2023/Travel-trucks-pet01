import PropTypes from 'prop-types';
import css from './FeatureIcon.module.css';

const FeatureIcon = ({ camper }) => {
  if (!camper) {
    return null;
  }

  const featureIcons = [
    { name: 'AC', key: 'AC', svgId: 'icon-icon-button-AC' },
    { name: 'Bathroom', key: 'bathroom', svgId: 'icon-icon-button-bathroom' },
    { name: 'Kitchen', key: 'kitchen', svgId: 'icon-icon-button-kitchen' },
    { name: 'TV', key: 'TV', svgId: 'icon-icon-button-TV' },
    { name: 'Radio', key: 'radio', svgId: 'icon-icon-button-radio' },
    {
      name: 'Refrigerator',
      key: 'refrigerator',
      svgId: 'icon-icon-button-refrigerator',
    },
    {
      name: 'Microwave',
      key: 'microwave',
      svgId: 'icon-icon-button-microwave',
    },
    { name: 'Gas', key: 'gas', svgId: 'icon-icon-button-gas' },
    { name: 'Water', key: 'water', svgId: 'icon-icon-button-water' },
  ];

  return (
    <>
      <div className={css['badges-container']}>
        {featureIcons.map((feature, index) => {
          const hasFeature = camper[feature.key];
          return hasFeature ? (
            <div className={css['feature-icon']} key={index}>
              <svg className={css.icon} viewBox="0 0 24 24">
                <use href={`/icons.svg#${feature.svgId}`} />
              </svg>
              <span className={css.text}>{feature.name}</span>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
};

FeatureIcon.propTypes = {
  camper: PropTypes.shape({
    features: PropTypes.objectOf(PropTypes.bool),
  }).isRequired,
};

export default FeatureIcon;
