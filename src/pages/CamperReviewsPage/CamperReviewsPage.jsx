import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import BookingForm from "../../components/BookingForm/BookingForm.jsx";
import css from './CamperReviewsPage.module.css';


function CamperReviewsPage() {
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