// import PropTypes from 'prop-types';
// import css from './FullScreenImageModal.module.css';

// // function FullScreenImageModal({ imageUrl, onClose }) {
// //   return (
// //     <div className={css.modalOverlay} onClick={onClose}>
// //       <div className={css.modalContent} onClick={e => e.stopPropagation()}>
// //         {' '}
// //         {/* Щоб клік всередині не закривав модаль */}
// //         <img
// //           src={imageUrl}
// //           alt="Full Screen Image"
// //           className={css.fullScreenImage}
// //         />
// //         <button className={css.closeButton} onClick={onClose}>
// //           Close
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default FullScreenImageModal;

// function FullScreenImageModal({ imageUrl, onClose }) {
//   return (
//     <button className={css.modalOverlay} onClick={onClose}>
//       <div className={css.modalContent} onClick={e => e.stopPropagation()}>
//         {' '}
//         {/* Щоб клік всередині не закривав модаль */}
//         <img
//           src={imageUrl}
//           alt="Full Screen Image"
//           className={css.fullScreenImage}
//         />
//         <button className={css.closeButton} onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </button>

//     // <div className={css.modalOverlay} onClick={onClose}>
//     //   <div className={css.modalContent} onClick={e => e.stopPropagation()}>
//     //     {' '}
//     //     {/* Щоб клік всередині не закривав модаль */}
//     //     <img
//     //       src={imageUrl}
//     //       alt="Full Screen Image"
//     //       className={css.fullScreenImage}
//     //     />
//     //     <button className={css.closeButton} onClick={onClose}>
//     //       Close
//     //     </button>
//     //   </div>
//     // </div>
//   );
// }

// FullScreenImageModal.propTypes = {
//   imageUrl: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default FullScreenImageModal;

import css from './FullScreenImageModal.module.css';
import PropTypes from 'prop-types';

function FullScreenImageModal({ imageUrl, onClose }) {
  return (
    <button className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent}>
        {' '}
        {/* Щоб клік всередині не закривав модаль */}
        <img
          src={imageUrl}
          alt="Повнорозмірне зображення" // Оновлений alt
          className={css.fullScreenImage}
        />
        <button className={css.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </button>
  );
}

FullScreenImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FullScreenImageModal;
