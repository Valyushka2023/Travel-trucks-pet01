import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Button from '../../components/Ui/Buttons/BaseButton/Button.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import css from './PageHome.module.css';

const PageHome = () => {
  const { t } = useTranslation();

  return (
    <div className={css['container-page']}>
      <Header />

      <section className={`${css['hero-section']} ${css['main-content']}`}>
        <div className={css['hero-overlay']}>
          <div className={css.title}>
            <div className={css.text}>
              <h1 className={css['hero-title']}>{t('hero_title')}</h1>
              <h2 className={css['hero-content']}>{t('hero_content')}</h2>
            </div>

            <Link to="/catalog" className={css['view-button']}>
              <Button variant="primary" size="large">
                {t('view_button', { ns: 'button' })}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default PageHome;
