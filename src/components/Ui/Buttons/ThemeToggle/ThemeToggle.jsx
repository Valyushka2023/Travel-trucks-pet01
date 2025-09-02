import { useState, useEffect } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import css from './ThemeToggle.module.css';

const ThemeToggle = () => {
  // 1. Отримуємо стан з localStorage при ініціалізації
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      // 2. Зберігаємо "dark" у localStorage
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      // 3. Зберігаємо "light" у localStorage
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkTheme]);

  return (
    <button
      className={css.themeToggleBtn}
      onClick={toggleTheme}
      aria-label="Перемкнути тему"
    >
      {isDarkTheme ? (
        <MdLightMode className={css.themeIconMdLight} />
      ) : (
        <MdDarkMode className={css.themeIconMdDark} />
      )}
    </button>
  );
};

export default ThemeToggle;
