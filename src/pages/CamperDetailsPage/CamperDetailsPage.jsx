//	Сторінка окремого кемпера: сторінка з детальним описом обраного кемпера, галереєю фотографій, відгуками користувачів, формою для бронювання. Для опиcу характеристик використовуй наступні властивості, якщо вони присутні на данному кемпері: transmission, engine, AC, bathroom, kitchen, TV, radio, refrigerator, microwave, gas, water. Для опиcу деталей використовуй наступні властивості: form, length, width, height, tank, consumption.

import React from 'react';
import Header from '../../components/Header/Header.jsx';
import BookingForm from '../../components/BookingForm/BookingForm.jsx';
import ImageGallery from '../../components/ImageGallery/ImageGallery.jsx';
import VehicleDetails from '../../components/VehicleDetails/VehicleDetails.jsx';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import css from './CamperDetailsPage.module.css';

function CamperDetailsPage() {
 
  return (
    <div className={css.container}>
      {/* Header */}
      <Header />
      <div className={css.containerTitle}>
        {/* HeroSection */}
        <HeroSection />
        {/*ImageGallery  */}
        <ImageGallery />
        <div className={css.containerText}>
          <p className={css.text}>
            Embrace simplicity and freedom with the Mavericks panel truck, an
            ideal choice for solo travelers or couples seeking a compact and
            efficient way to explore the open roads. This no-frills yet reliable
            panel truck offers the essentials for a comfortable journey, making
            it the perfect companion for those who value simplicity and
            functionality.
          </p>
        </div>
        <div className={css.tabc}>
          <div className={css.titlesTabs}>
            <h3 className={css.textTitlesTabsFeatures}>Features</h3>
            <h3 className={css.textTitlesTabsReviews}>Reviews</h3>
          </div>
        </div>
        <div className={css.dividerWrapper}>
          <hr className={css.divider1} />
          <hr className={css.divider2} />
        </div>
        <div className={css.detailsForm}>
          <div className={css.details}>
            <div className={css.badgesContainer}>
              <div className={css.buttonAutomatic}>
                <svg
                  className={css.iconButtonAutomatic}
                  width="143"
                  height="48"
                  viewBox="0 0 104 32"
                >
                  <use href="/icons.svg#icon-icon-Button-Automatic"></use>
                </svg>
              </div>
              <div className={css.buttonAC}>
                <svg
                  className={css.iconButtonAC}
                  width="87"
                  height="48"
                  viewBox="0 0 63 32"
                >
                  <use href="/icons.svg#icon-icon-Button-AC"></use>
                </svg>
              </div>
              <div className={css.buttonPetrol}>
                <svg
                  className={css.iconButtonPetrol}
                  width="109"
                  height="48"
                  viewBox="0 0 79 32"
                >
                  <use href="/icons.svg#icon-icon-Button-Petrol"></use>
                </svg>
              </div>
              <div className={css.buttonKitchen}>
                <svg
                  className={css.iconButtonKitchen}
                  width="123"
                  height="48"
                  viewBox="0 0 89 32"
                >
                  <use href="/icons.svg#icon-icon-Button-Kitchen"></use>
                </svg>
              </div>
              <div className={css.buttonRadio}>
                <svg
                  className={css.iconButtonRadio}
                  width="123"
                  height="48"
                  viewBox="0 0 79 32"
                >
                  <use href="/icons.svg#icon-icon-Batton-Radio"></use>
                </svg>
              </div>
            </div>
            <div className={css.vehicleContainerForm}>
              {/*VehicleDetails  */}
              <VehicleDetails />
            </div>
          </div>
          {/* Booking Form */}
          <BookingForm />
        </div>
      </div>
    </div>
  );
}

export default CamperDetailsPage;
