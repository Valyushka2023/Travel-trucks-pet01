import { useState, useEffect } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import css from './ThemeToggle.module.css';

const ThemeToggle = () => {
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

      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');

      localStorage.setItem('theme', 'light');
    }
  }, [isDarkTheme]);

  return (
    <button
      className={css['theme-toggle-btn']}
      onClick={toggleTheme}
      aria-label="Switch topic"
    >
      {isDarkTheme ? (
        <MdLightMode className={css['theme-icon-md-light']} />
      ) : (
        <MdDarkMode className={css['theme-icon-md-dark']} />
      )}
    </button>
  );
};

export default ThemeToggle;
