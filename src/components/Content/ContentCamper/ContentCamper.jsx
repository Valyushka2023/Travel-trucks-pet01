// import React from 'react';
// import { useOutletContext } from 'react-router-dom';
// import Header from '../../Header/Header.jsx';
// import HeroSection from '../../HeroSection/HeroSection.jsx';
// import ImageGallery from '../../ImageGallery/ImageGallery.jsx';
// import css from './ContentCamper.module.css';

// function ContentCamper() {
//     const context = useOutletContext();

//     if (!context || !context.camper) {
//         return <div className={css.error}>Camper not found.</div>;
//     }

//     const { camper } = context;

//     return (
//         <div className={css.container}>
//             <div className={css.containerHeader}>
//                 <Header />
//                 <div className={css.containerTitle}>
//                     <HeroSection camper={camper} />
//                     <ImageGallery gallery={camper.gallery} />
//                     <div className={css.containerText}>
//                         <p className={css.text}>{camper.description}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ContentCamper;
