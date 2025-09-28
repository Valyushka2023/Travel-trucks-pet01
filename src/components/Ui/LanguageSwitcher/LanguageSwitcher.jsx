import { useTranslation } from 'react-i18next';
import css from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={css['lang-switcher']}>
      <span
        onClick={() => handleLanguageChange('en')}
        className={`${i18n.language === 'en' ? css.active : ''} ${css['language-En']}`}
      >
        EN
      </span>
      <span className={css.separator}>/</span>
      <span
        onClick={() => handleLanguageChange('uk')}
        className={`${i18n.language === 'uk' ? css.active : ''} ${css['language-Uk']}`}
      >
        UA
      </span>
    </div>
  );
};

export default LanguageSwitcher;
