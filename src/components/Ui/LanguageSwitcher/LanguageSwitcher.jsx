// import { useTranslation } from 'react-i18next';
// import css from './LanguageSwitcher.module.css';

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const handleLanguageChange = lng => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <div className={css['lang-switcher']}>
//       <span
//         onClick={() => handleLanguageChange('en')}
//         className={`${i18n.language === 'en' ? css.active : ''} ${css['language-En']}`}
//       >
//         EN
//       </span>
//       <span className={css.separator}>/</span>
//       <span
//         onClick={() => handleLanguageChange('uk')}
//         className={`${i18n.language === 'uk' ? css.active : ''} ${css['language-Uk']}`}
//       >
//         UK
//       </span>
//     </div>
//   );
// };

// export default LanguageSwitcher;
import { useTranslation } from 'react-i18next';
import css from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  // Використовуємо об'єкт i18n для зміни мови та перевірки поточної мови
  const { i18n } = useTranslation();

  const handleLanguageChange = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={css['lang-switcher']}>
      <button
        type="button" // ✅ Використовуємо нативний інтерактивний елемент
        onClick={() => handleLanguageChange('en')}
        className={`${i18n.language === 'en' ? css.active : ''} ${css['language-En']}`}
      >
        EN
      </button>
      <span className={css.separator}>/</span>
      <button
        type="button" // ✅ Використовуємо нативний інтерактивний елемент
        onClick={() => handleLanguageChange('uk')}
        className={`${i18n.language === 'uk' ? css.active : ''} ${css['language-Uk']}`}
      >
        UK
      </button>
    </div>
  );
};

export default LanguageSwitcher;
