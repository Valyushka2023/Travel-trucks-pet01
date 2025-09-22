// import { Link, useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// import Logo from '../../components/Ui/Logo/Logo.jsx';
// import ThemeToggle from '../../components/Ui/Buttons/ThemeToggle/ThemeToggle.jsx';
// import MenuToggleButton from '../../components/Ui/Buttons/MenuToggleButton/MenuToggleButton.jsx';
// import CloseButton from '../../components/Ui/Buttons/CloseButton/CloseButton.jsx';

// import css from './Header.module.css';

// const Header = () => {
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(prev => !prev);
//   };

//   const onClose = () => {
//     setIsMenuOpen(false);
//   };

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }

//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isMenuOpen]);

//   return (
//     <div className={css.headerWrapper}>
//       <nav className={css.headerContainer}>
//         <div className={css.logoHeader}>
//           <Logo />
//         </div>
//         <div className={css.toggleIcons}>
//           <ThemeToggle />
//           <MenuToggleButton
//             isOpen={isMenuOpen}
//             onClick={toggleMenu}
//             ariaLabel="Відкрити навігаційне меню"
//           />
//         </div>
//         {/* Меню */}
//         <div className={`${css.menu} ${isMenuOpen ? css['is-open'] : ''}`}>
//           {/* Кнопка "хрестик" */}
//           <CloseButton
//             onClick={onClose}
//             className={css.closeButtonInsideMenu}
//             ariaLabel="Закрити навігаційне меню"
//           />
//           <Link
//             to="/"
//             className={location.pathname === '/' ? css.active : css.link}
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             to="/catalog"
//             className={location.pathname === '/catalog' ? css.active : css.link}
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Catalog
//           </Link>
//         </div>
//         {/* Backdrop */}
//         <div
//           className={`${css.menuBackdrop} ${isMenuOpen ? css['is-visible'] : ''}`}
//           onClick={toggleMenu}
//         ></div>
//       </nav>
//     </div>
//   );
// };

// export default Header;
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Logo from '../../components/Ui/Logo/Logo.jsx';
import ThemeToggle from '../../components/Ui/Buttons/ThemeToggle/ThemeToggle.jsx';
import MenuToggleButton from '../../components/Ui/Buttons/MenuToggleButton/MenuToggleButton.jsx';
import CloseButton from '../../components/Ui/Buttons/CloseButton/CloseButton.jsx';
import LanguageSwitcher from '../../components/Ui/LanguageSwitcher/LanguageSwitcher.jsx'; // Імпортуємо новий компонент

import css from './Header.module.css';

const Header = () => {
  const location = useLocation();
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

  return (
    <div className={css.headerWrapper}>
      <nav className={css.headerContainer}>
        <div className={css.logoHeader}>
          <Logo />
        </div>
        <div className={css.toggleIcons}>
          <ThemeToggle />
          <LanguageSwitcher /> {/* Розміщуємо перемикач тут */}
          <MenuToggleButton
            isOpen={isMenuOpen}
            onClick={toggleMenu}
            ariaLabel="Відкрити навігаційне меню"
          />
        </div>
        {/* Меню */}
        <div className={`${css.menu} ${isMenuOpen ? css['is-open'] : ''}`}>
          {/* Кнопка "хрестик" */}
          <CloseButton
            onClick={onClose}
            className={css.closeButtonInsideMenu}
            ariaLabel="Закрити навігаційне меню"
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
        {/* Backdrop */}
        <div
          className={`${css.menuBackdrop} ${isMenuOpen ? css['is-visible'] : ''}`}
          onClick={toggleMenu}
        ></div>
      </nav>
    </div>
  );
};

export default Header;
