import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  const location = useLocation();

  return (
    <nav className={css.headerContainer}>
      <div className={css.logo}>
        Travel<span className={css.logoSecondary}>Trucks</span>
      </div>
      <div className={css.menu}>
        <Link
          to="/"
          className={location.pathname === '/' ? css.active : css.link}
        >
          Home
        </Link>
        <Link
          to="/catalog"
          className={location.pathname === '/catalog' ? css.active : css.link}
        >
          Catalog
        </Link>
      </div>
    </nav>
  );
};

export default Header;
