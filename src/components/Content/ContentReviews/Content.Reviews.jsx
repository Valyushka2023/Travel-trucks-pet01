
// import React, { useEffect } from 'react';

// import Header from '../../Header/Header.jsx'; // Import Header
// import HeroSection from '../../HeroSection/HeroSection.jsx'; // Import HeroSection
// import ImageGallery from '../../ImageGallery/ImageGallery.jsx'; // Import ImageGallery
// import Tabs from '../../Tabs/Tabs.jsx'; // Переконайтеся, що шлях до Tabs.jsx правильний
// import Review from '../../Reviews/Review/Review.jsx';
// import FormReview from '../../Forms/FormReview/FormReview.jsx';
// import css from './ContentReviews.module.css';


// function ContentReviews({ camper, activeTab, averageRating, reviews, onReviewAdded }) {
//   // Залишаємо useEffect для налагодження, якщо він вам потрібен
//   useEffect(() => {
//     console.log("Camper data in CamperReviewsContent:", camper);
//   }, [camper]);

//   if (!camper) {
//     return <div className={css.error}>Camper data is not available.</div>;
//   }

//   return (
//     <div className={css.container}>
//       <div className={css.containerHeader}>
//         <Header />
//         <div className={css.containerTitle}>
//           <HeroSection camper={camper} />
//           <ImageGallery gallery={camper.gallery} />
//           <div className={css.containerText}>
//             <p className={css.text}>{camper.description}</p>
//           </div>
//         </div>
//       </div>
//       <Tabs camper={camper} activeTab={activeTab} />
//       <div className={css.reviewsForm}>
//         <div className={css.blokReviewsForm}>
//           {reviews && reviews.map((review, index) => (
//             <Review key={review.id || index} review={review} />
//           ))}
//         </div>
//         <FormReview camper={camper} onReviewAdded={onReviewAdded} />
//       </div>
//       <div className={css.averageRating}>
//         Average Rating: {averageRating.toFixed(2)}
//       </div>
//     </div>
//   );
// }

// export default ContentReviews;




import React, { useEffect } from 'react';

import Header from '../../Header/Header.jsx';
import HeroSection from '../../HeroSection/HeroSection.jsx';
import ImageGallery from '../../ImageGallery/ImageGallery.jsx';
import Tabs from '../../Tabs/Tabs.jsx';
import Review from '../../Reviews/Review/Review.jsx';
import FormReview from '../../Forms/FormReview/FormReview.jsx';
import css from './ContentReviews.module.css';

function ContentReviews({ camper, activeTab, averageRating, reviews, onReviewAdded }) {
  useEffect(() => {
    console.log("Camper data in CamperReviewsContent:", camper);
  }, [camper]);

  if (!camper) {
    return <div className={css.error}>Camper data is not available.</div>;
  }
    console.log("Full camper object:", camper);
  return (
    <div className={css.container}>
      <div className={css.containerHeader}>
        <Header />
        <div className={css.containerTitle}>
          <HeroSection camper={camper} />
          <ImageGallery gallery={camper.gallery} />
          <div className={css.containerText}>
            <p className={css.text}>{camper.description}</p>
          </div>
        </div>
      </div>
      <Tabs camper={camper} activeTab={activeTab} />
      <div className={css.reviewsForm}>
        <div className={css.blokReviewsForm}>
          {reviews && reviews.map((review, index) => (
            <Review key={review.id || index} review={review} />
          ))}
         </div>
        {console.log("Camper ID being passed:", camper._id)} {/* Переміщено сюди */}
        <FormReview camperId={camper._id} onReviewAdded={onReviewAdded} />
      </div>
      <div className={css.averageRating}>
        Average Rating: {averageRating.toFixed(2)}
      </div>
    </div>
  );
}

export default ContentReviews;