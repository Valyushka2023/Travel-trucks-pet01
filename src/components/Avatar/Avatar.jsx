import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ name }) => {
  // Отримуємо першу літеру імені
  const initial = name?.charAt(0).toUpperCase() || '?';

  return (
    <div
      className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold"
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
