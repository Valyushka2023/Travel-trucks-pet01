import { Link, useLocation } from 'react-router-dom';
import Logo from '../../components/Ui/Logo/Logo.jsx';
import css from './Header.module.css';

const Header = () => {
  const location = useLocation();

  return (
    <nav className={css.headerContainer}>
      {/* Логотип ліворуч */}
      <div className={css.logoHeader}>
        <Logo />
      </div>

      {/* Меню по центру */}
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
