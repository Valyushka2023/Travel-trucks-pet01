//	Сторінка окремого кемпера: сторінка з детальним описом обраного кемпера, галереєю фотографій, відгуками користувачів, формою для бронювання. Для опиcу характеристик використовуй наступні властивості, якщо вони присутні на данному кемпері: transmission, engine, AC, bathroom, kitchen, TV, radio, refrigerator, microwave, gas, water. Для опиcу деталей використовуй наступні властивості: form, length, width, height, tank, consumption.

import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import BookingForm from "../../components/BookingForm/BookingForm.jsx";
import css from './CamperDetailsPage.module.css';



function CamperDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return ( 
    <div className={css.container}> 
      {/* Header */} 
        <Header />   
       {/* Hero Section */}      
        <div className={css.containerTitle}>      
          <div>
          <h2 className={css.Title}>Mavericks</h2>
          </div>         
          <div className={css.containerDetail}>           
            <div className={css.reviewsLocation}>             
              <div className={css.titleReviews}>
              <svg
              className={css.iconStar}
              width="16"
              height="16"
              viewBox="0 0 32 32"
              >
              <use href="/icons.svg#icon-icon-star-icon"></use>
              </svg>
              <p className={css.textReviewsTitle}>4.4 (2 Reviews)</p>
              </div>
              <div className={css.locationTitle}>
              <svg
              className={css.iconMap}
              width="16"
              height="16"
              viewBox="0 0 32 32"
              >
              <use href="/icons.svg#icon-map"></use>
              </svg>
              <p className={css.textLocationTitle}>Kyiv, Ukraine</p>
              </div>
            </div>            
            <div className={css.containerPrice}>
            <h2 className={css.Price}>€8000.00</h2>
            </div>            
        </div>
        <div className={css.containerPictures}>
           <img
              src="/images/Pic1Mavericks@1x.jpg"
              srcSet="/images/Pic1Mavericks@1x.jpg 1x, /images/Pic1Mavericks@2x.jpg 2x"
              alt="Mavericks panel truck"
              />
           <img
              src="/images/Pic2Mavericks@1x.jpg"
              srcSet="/images/Pic2Mavericks@1x.jpg 1x, /images/Pic2Mavericks@2x.jpg 2x"
              alt="Mavericks panel truck"
              />
            <img
              src="/images/Pic3Mavericks@1x.jpg"
              srcSet="/images/Pic3Mavericks@1x.jpg 1x, /images/Pic3Mavericks@2x.jpg 2x"
              alt="Mavericks panel truck"
              />
           <img
              src="/images/Pic4Mavericks@1x.jpg"
              srcSet="/images/Pic4Mavericks@1x.jpg 1x, /images/Pic4Mavericks@2x.jpg 2x"
              alt="Mavericks panel truck"
              />
          </div>
          <div className={css.containerText}>
            <p className={css.text}>Embrace simplicity and freedom with the Mavericks panel truck, an ideal choice for solo travelers or couples seeking a compact and efficient way to explore the open roads. This no-frills yet reliable panel truck offers the essentials for a comfortable journey, making it the perfect companion for those who value simplicity and functionality.</p>
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
              <div className={css.venicleContainerForm}>
                <div className={css.venicleContainer}>
                    <h3 className={css.textDetails}>Vehicle details</h3>               
                  <hr className={css.divider} />
                  <div className={css.venicleInfo}>
                  <div className={css.texts}>
                    <p>Form</p>
                    <p>Panel truck</p>
                  </div>
                  <div className={css.texts}>
                    <p>Length</p>
                    <p>5.4 m</p>
                  </div>
                  <div className={css.texts}>
                    <p>Width</p>
                    <p>2.01 m</p>
                  </div>
                  <div className={css.texts}>
                    <p>Height</p>
                    <p>2.05 m</p>
                  </div>
                  <div className={css.texts}>
                    <p>Tank</p>
                    <p>132 I</p>
                  </div>
                  <div className={css.texts}>
                    <p>Consumption</p>
                    <p>12.4l/100km</p>
                  </div>
                </div>
              </div>
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