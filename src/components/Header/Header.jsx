import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '../../components/Ui/Logo/Logo.jsx';
import ThemeToggle from '../../components/Ui/Buttons/ThemeToggle/ThemeToggle.jsx';
import MenuToggleButton from '../../components/Ui/Buttons/MenuToggleButton/MenuToggleButton.jsx';
import CloseButton from '../../components/Ui/Buttons/CloseButton/CloseButton.jsx';
import LanguageSwitcher from '../../components/Ui/LanguageSwitcher/LanguageSwitcher.jsx';

import css from './Header.module.css';

const Header = () => {
  const location = useLocation();

  const { t, i18n: _i18n } = useTranslation('header');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const onClose = () => {
    setIsMenuOpen(false);
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

  const handleBackdropKeyPress = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  return (
    <div className={css['header-wrapper']}>
      <nav className={css['header-container']}>
        <div className={css['logo-header']}>
          <Logo />
        </div>
        <div className={css['toggle-icons']}>
          <ThemeToggle />
          <LanguageSwitcher />
          <MenuToggleButton
            isOpen={isMenuOpen}
            onClick={toggleMenu}
            ariaLabel={t('menu_open_label', {
              defaultValue: 'Open navigation menu',
            })}
          />
        </div>

        <div className={`${css.menu} ${isMenuOpen ? css['is-open'] : ''}`}>
          <CloseButton
            onClick={onClose}
            className={css['close-button-inside-menu']}
            ariaLabel={t('menu_close_label', {
              defaultValue: 'Close navigation menu',
            })}
          />
          <Link
            to="/"
            className={location.pathname === '/' ? css.active : css.link}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav_home', { defaultValue: 'Home' })}{' '}
          </Link>
          <Link
            to="/catalog"
            className={location.pathname === '/catalog' ? css.active : css.link}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav_catalog', { defaultValue: 'Catalog' })}{' '}
          </Link>
        </div>
        <div
          className={`${css['menu-backdrop']} ${isMenuOpen ? css['is-visible'] : ''}`}
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={handleBackdropKeyPress}
        ></div>
      </nav>
    </div>
  );
};

export default Header;
