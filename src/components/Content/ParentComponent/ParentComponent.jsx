// import React, { useState, useEffect } from 'react';
// import FormReview from './FormReview';
// import ReviewsList from './ReviewsList';
// import axios from 'axios';

// const ParentComponent = ({ camperId }) => {
//   const [reviews, setReviews] = useState([]);

//     useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/reviews?camperId=${camperId}`);
//         setReviews(response.data);
//       } catch (error) {
//         setError("Failed to fetch reviews.");
//       }
//     };
//     if(camperId) {
//       fetchReviews();
//     }
//   }, [camperId]);

//   const handleReviewAdded = (newReview) => {
//     setReviews(prevReviews => [newReview, ...prevReviews]);
//   };

//   return (
//     <div>
//       <FormReview camperId={camperId} onReviewAdded={handleReviewAdded} />
//       <ReviewsList reviews={reviews} />
//     </div>
//   );
// };

// export default ParentComponent;
