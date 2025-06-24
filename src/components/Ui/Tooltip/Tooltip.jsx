// components/Ui/Tooltip/Tooltip.jsx
import PropTypes from 'prop-types';
import css from './Tooltip.module.css';

const Tooltip = ({ message, children }) => {
  return (
    <div className={css.tooltipWrapper}>
      {children}
      <div className={css.tooltip}>{message}</div>
    </div>
  );
};

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
