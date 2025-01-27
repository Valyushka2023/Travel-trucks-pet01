import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import BookingForm from "../../components/BookingForm/BookingForm.jsx";
import ImageGallery from "../../components/ImageGallery/ImageGallery.jsx";
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import css from './CamperReviewsPage.module.css';


function CamperReviewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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
           
          <div className={css.containerReviews}>
           
            <div className={css.blok}> 
              <div className={css.person}>
                 <svg
              className={css.iconUser}
              width="60"
              height="60"
              viewBox="0 0 32 32"
              >
              <use href="/icons.svg#icon-User">T</use>
              </svg>
                <div className={css.personName}>
                  <div className={css.textPersonName}>Alice</div>
                  <div className={css.rate}>
                    {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                    key={index}
                    className={css.iconStar}
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    >
                    <use href="/icons.svg#icon-icon-star-icon"></use>
                    </svg>
                  ))}
                  </div>
                </div>
              </div>
              <p className={css.textPerson}>The Mavericks panel truck was a perfect choice for my solo road trip. Compact, easy to drive, and had all the essentials. The kitchen facilities were sufficient, and the overall experience was fantastic.</p>
            </div>
            
            <div className={css.blok}> 
              <div className={css.person}>
                 <svg
              className={css.iconUser}
              width="60"
              height="60"
              viewBox="0 0 32 32"
              >
              <use href="/icons.svg#icon-User">T</use>
              </svg>
                <div className={css.personName}>
                  <div className={css.textPersonName}>Bob</div>
                  <div className={css.rate}>
                    {Array.from({ length: 3 }).map((_, index) => (
                    <svg
                    key={index}
                    className={css.iconStar}
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    >
                    <use href="/icons.svg#icon-icon-star-icon"></use>
                    </svg>
                   ))}
                  </div>
                </div>
              </div>
              <p className={css.textPerson}>A decent option for solo travel. The Mavericks provided a comfortable stay, but the lack of bathroom facilities was a drawback. Good for short trips where simplicity is preferred.</p>
            </div>
          </div>
            {/* Booking Form */}
               <BookingForm />           
        </div>    
      </div>   
  </div>
  );
}
  
export default CamperReviewsPage;