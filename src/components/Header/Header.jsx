import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../../components/Ui/Logo/Logo.jsx';
import css from './Header.module.css';
import MenuToggleButton from '../../components/Ui/Button/MenuToggleButton.jsx';
import CloseButton from '../../components/Ui/Button/CloseButton.jsx';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className={css.headerWrapper}>
      <nav className={css.headerContainer}>
        <div className={css.logoHeader}>
          <Logo />
        </div>
        {/* Кнопка-гамбургер (видима тільки на мобільних) */}
        <MenuToggleButton
          isOpen={isMenuOpen}
          onClick={toggleMenu}
          ariaLabel="Відкрити навігаційне меню"
          // className={css.desktopHidden}
        />

        {/* Меню */}
        <div className={`${css.menu} ${isMenuOpen ? css['is-open'] : ''}`}>
          {/* Кнопка "хрестик" (відображається, коли меню ВІДКРИТЕ) */}
          <CloseButton
            onClick={toggleMenu}
            ariaLabel="Закрити навігаційне меню"
            className={css.closeButtonInsideMenu}
          />
          <Link
            to="/"
            className={location.pathname === '/' ? css.active : css.link}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className={location.pathname === '/catalog' ? css.active : css.link}
            onClick={() => setIsMenuOpen(false)}
          >
            Catalog
          </Link>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`${css.menuBackdrop} ${isMenuOpen ? css['is-visible'] : ''}`}
        onClick={toggleMenu}
      ></div>
    </div>
  );
};

export default Header;
