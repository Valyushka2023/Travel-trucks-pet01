import React from 'react';
import PropTypes from 'prop-types';
import css from "./Avatar.module.css";

const Avatar = ({ name }) => {
  // Отримуємо першу літеру імені
  const initial = name?.charAt(0).toUpperCase() || '?';

  return (
    <div
      className={css.avatar} // Застосовуємо клас .avatar через об'єкт css
      title={name} // Підказка при наведенні
    >
      {initial}
    </div>
  );
};

// Додаємо перевірку PropTypes
Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
