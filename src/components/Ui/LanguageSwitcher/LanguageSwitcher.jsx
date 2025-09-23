import { useTranslation } from 'react-i18next';
import css from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={css['lang-switcher']}>
      <button
        onClick={() => handleLanguageChange('en')}
        className={i18n.language === 'en' ? css.active : ''}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('uk')}
        className={i18n.language === 'uk' ? css.active : ''}
      >
        UA
      </button>
    </div>
  );
};

export default LanguageSwitcher;
