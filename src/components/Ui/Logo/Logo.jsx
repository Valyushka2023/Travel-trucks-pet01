import PropTypes from 'prop-types';
import css from './Logo.module.css';

function Logo({ className = '' }) {
  return (
    <div className={`${css.logo} ${className}`}>
      Travel
      <span className={css['logo-secondary']}>Trucks</span>
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
