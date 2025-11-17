import PropTypes from 'prop-types';
import css from './Avatar.module.css';

const Avatar = ({ name }) => {
  const initial = name?.charAt(0).toUpperCase() || '?';

  return (
    <div
      className={css.avatar} // Застосовуємо клас .avatar через об'єкт css
      title={name}
    >
      {initial}
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
