import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';
import PropTypes from 'prop-types';

const Loader = ({ type, color, size }) => {
  const loaderClass =
    type === 'overlay' ? css.loaderOverlay : css.loaderContainer;

  return (
    <div className={loaderClass}>
      <ClipLoader color={color} size={size} />
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(['container', 'overlay']).isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

Loader.defaultProps = {
  color: ' #66ff00',
  size: 50,
};

export default Loader;
