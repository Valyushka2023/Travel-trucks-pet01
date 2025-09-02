// // src/hooks/useReviewsScroll.js

// import { useRef, useEffect } from 'react';

// export const useReviewsScroll = () => {
//   const reviewsContainerRef = useRef(null);
//   const lastReviewRef = useRef(null);

//   // Перевірка, чи елемент повністю видимий у контейнері
//   const isElementFullyVisible = (container, element) => {
//     if (!container || !element) return true;
//     const containerRect = container.getBoundingClientRect();
//     const elementRect = element.getBoundingClientRect();
//     return (
//       elementRect.top >= containerRect.top &&
//       elementRect.bottom <= containerRect.bottom
//     );
//   };

//   // Прокрутка до останнього відгуку, якщо він не видимий
//   const scrollToLastReview = () => {
//     setTimeout(() => {
//       if (
//         reviewsContainerRef.current &&
//         lastReviewRef.current &&
//         !isElementFullyVisible(
//           reviewsContainerRef.current,
//           lastReviewRef.current
//         )
//       ) {
//         lastReviewRef.current.scrollIntoView({
//           behavior: 'smooth',
//           block: 'end',
//         });
//       }
//     }, 100);
//   };

//   // Прокрутка до верху контейнера
//   const scrollToTop = () => {
//     if (reviewsContainerRef.current) {
//       reviewsContainerRef.current.scrollTop = 0;
//     }
//   };

//   return {
//     reviewsContainerRef,
//     lastReviewRef,
//     scrollToLastReview,
//     scrollToTop,
//   };
// };
