
import React from 'react';
import Header from '../../components/Header/Header.jsx';
import Button from '../../components/Ui/Button/Button.jsx';
import css from './PageHome.module.css';

function PageHome() {
  return (
    <div className={css.container}>
      {/* Header */}
      <Header />
      {/* Section */}
      <div className={css.heroImage}>
        <img
          src="/path-to-your-image.jpg"
          alt="Camper"
          className={css.heroImage}
        />
        <div>
          <div className={css.title}>
            <div className={css.text}>
              <h1 className={css.heroTitle}>Campers of your dreams</h1>
              <h2 className={css.heroContent}>
                You can find everything you want in our catalog
              </h2>
            </div>
            <Button variant="primary" size="large" to="/catalog">
              View Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHome;
