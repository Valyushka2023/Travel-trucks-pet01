import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Button from '../../components/Ui/Buttons/BaseButton/Button.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import css from './PageHome.module.css';

function PageHome() {
  return (
    <div className={css.containerPage}>
      <Header />

      <section className={`${css.heroSection} ${css.mainContent}`}>
        <div className={css.heroOverlay}>
          <div className={css.title}>
            <div className={css.text}>
              <h1 className={css.heroTitle}>Campers of your dreams</h1>
              <h2 className={css.heroContent}>
                You can find everything you want in our catalog
              </h2>
            </div>

            <Link to="/catalog" className={css.viewButton}>
              <Button variant="primary" size="large">
                View Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PageHome;
