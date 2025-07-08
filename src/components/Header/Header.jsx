import { Link, useLocation } from 'react-router-dom';
import Logo from '../../components/Ui/Logo/Logo.jsx';
import css from './Header.module.css';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Стан для керування видимістю меню
  // Функція для перемикання стану меню

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Закриття меню при зміні маршруту (переході на іншу сторінку)

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={css.headerWrapper}>
      <nav className={css.headerContainer}>
        {/* Логотип ліворуч */}
        <div className={css.logoHeader}>
          <Logo />
        </div>
        {/* Кнопка-гамбургер (відображається лише на мобільних) */}
        {/* Додаємо саму кнопку і обробник кліку */}
        <button
          type="button"
          className={css.burgerButton}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen} // Для доступності: вказує стан меню
          aria-label="Toggle navigation menu" // Для доступності
        >
          {/* Можна використовувати іконку з бібліотеки або простий символ */}
          {isMenuOpen ? '✕' : '☰'} {/* Змінюємо іконку залежно від стану */}
        </button>

        {/* Меню по центру (на десктопі) або випадаюче (на мобільних) */}
        {/* Додаємо клас is-open, якщо меню відкрите */}
        {/* Меню по центру */}
        <div className={`${css.menu} ${isMenuOpen ? css['is-open'] : ''}`}>
          <Link
            to="/"
            className={location.pathname === '/' ? css.active : css.link}
            onClick={() => setIsMenuOpen(false)} // Закриваємо меню при кліку на посилання
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className={location.pathname === '/catalog' ? css.active : css.link}
            onClick={() => setIsMenuOpen(false)} // Закриваємо меню при кліку на посилання
          >
            Catalog
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
