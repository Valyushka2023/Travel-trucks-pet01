// import React from 'react';
// import { Link, useOutletContext } from 'react-router-dom';
// import Header from '../../components/Header/Header.jsx';
// import ImageGallery from '../../components/ImageGallery/ImageGallery.jsx';
// import HeroSection from '../../components/HeroSection/HeroSection.jsx';
// import Review from '../../components/Review/Review.jsx';
// import BookingForm from '../../components/BookingForm/BookingForm.jsx';
// import css from './CamperReviewsContent.module.css';

// function CamperReviewsContent() {
//     const { camper, activeTab } = useOutletContext();

//     if (!camper || !camper.reviews) {
//         return <div className={css.error}>No reviews found.</div>;
//     }

//     return (
//         <div className={css.container}>
//             <Header />
//             <div className={css.containerTitle}>
//                 <HeroSection camper={camper} />
//                 <ImageGallery gallery={camper.gallery} />
//                 <div className={css.containerText}>
//                     <p className={css.text}>{camper.description}</p>
//                 </div>
//                 <div className={css.tabc}>
//                     <div className={css.titlesTabs}>
//                         <Link
//                             to={`/catalog/${camper.id}?tab=features`}
//                             className={`${css.textTitlesTabsFeatures} ${activeTab === 'features' ? css.active : ''}`}
//                         >
//                             Features
//                         </Link>
//                         <Link
//                             to={`/catalog/${camper.id}/reviews`}
//                             className={`${css.textTitlesTabsReviews} ${activeTab === 'reviews' ? css.active : ''}`}
//                         >
//                             Reviews
//                         </Link>
//                     </div>
                
//                     <div className={css.dividerWrapper}>
//                         <div className={css.divider2}></div>
//                     </div>    
//                     </div>
//                 <div className={css.reviewsForm}>
//               <div className={css.blokReviewsForm}>
//                 {camper.reviews.map(review => (
//                     <Review key={review.id} review={review} />
//                 ))}
//                     </div>
//                         <BookingForm camper={camper} />
                        
//                 </div>

                

//             </div>
//         </div>
//     );
// }

// export default CamperReviewsContent;

import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import ImageGallery from '../../components/ImageGallery/ImageGallery.jsx';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import Review from '../../components/Review/Review.jsx';
import FormReview from '../../components/FormReview/FormReview.jsx';
import css from './CamperReviewsContent.module.css';

function CamperReviewsContent() {
    const { camper, activeTab } = useOutletContext();

    if (!camper || !camper.reviews) {
        return <div className={css.error}>No reviews found.</div>;
    }

    return (
        <div className={css.container}>
            <Header />
            <div className={css.containerTitle}>
                <HeroSection camper={camper} />
                <ImageGallery gallery={camper.gallery} />
                <div className={css.containerText}>
                    <p className={css.text}>{camper.description}</p>
                </div>
                <div className={css.tabc}>
                    <div className={css.titlesTabs}>
                        <Link
                            to={`/catalog/${camper.id}?tab=features`}
                            className={`${css.textTitlesTabsFeatures} ${activeTab === 'features' ? css.active : ''}`}
                        >
                            Features
                        </Link>
                        <Link
                            to={`/catalog/${camper.id}/reviews`}
                            className={`${css.textTitlesTabsReviews} ${activeTab === 'reviews' ? css.active : ''}`}
                        >
                            Reviews
                        </Link>
                    </div>
                    <div className={css.dividerWrapper}>
                        <div className={css.divider2}></div>
                    </div>
                </div>
                <div className={css.reviewsForm}>
                    <div className={css.blokReviewsForm}>
                          {console.log(camper.reviews)}
                        {/* {camper.reviews.map((review, index) => (
            <Review key={review.id || index} review={review} />
        ))} */}
                       {/* {camper.reviews.map(review => (
    <Review key={review.id} review={review} />
                       ))}  */}
                     {camper.reviews.map((review, index) => (
            <Review key={review.id || index} review={review} />
        ))}
  
                        
                    </div>
                    <FormReview camper={camper} />
                </div>
            </div>
        </div>
    );
}

export default CamperReviewsContent;

