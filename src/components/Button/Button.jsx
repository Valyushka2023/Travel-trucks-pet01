import React from 'react';
import PropTypes from 'prop-types'; // Імпортуємо PropTypes
import { useNavigate } from 'react-router-dom';
import css from './Button.module.css';

const Button = ({
  variant = 'default', // Тип кнопки: default, primary, secondary
  onClick, // Обробник кліку
  size = 'medium', // Розмір: small, medium, large
  disabled = false, // Заблокований стан
  children, // Вміст кнопки
  to, // Шлях для навігації
}) => {
  const navigate = useNavigate();

  const handleClick = e => {
    if (onClick) {
      onClick(e); // Виконати переданий onClick
    }
    if (to) {
      navigate(to); // Виконати навігацію, якщо вказано шлях
    }
  };

  return (
    <button
      className={`${css.button} ${css[variant]} ${css[size]}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Додаємо PropTypes для валідації пропсів
Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired, // children обов'язковий
  to: PropTypes.string,
};

export default Button;
