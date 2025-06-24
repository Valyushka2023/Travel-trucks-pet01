// import { useState } from 'react';
// import PropTypes from 'prop-types';

// import FullScreenImageModal from '../../Gallery/FullScreenImageModal/FullScreenImageModal';
// import css from './ImageGallery.module.css';

// function ImageGallery({ gallery }) {
//   const [selectedImage, setSelectedImage] = useState(null);

//   if (!gallery || !Array.isArray(gallery)) {
//     return <div>No images available.</div>;
//   }

//   const handleImageClick = imageUrl => {
//     setSelectedImage(imageUrl);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className={css.containerPictures}>
//       {gallery.map((imageUrl, index) => (
//         <button
//           key={index}
//           className={css.galleryImageButton}
//           onClick={() => handleImageClick(imageUrl)}
//         >
//           <img
//             src={imageUrl}
//             // alt={`Image ${index + 1}`}
//             alt={`Gallery item ${index + 1}`}
//             className={css.galleryItem}
//             onError={e => {
//               e.target.onerror = null;
//               e.target.src = '/placeholder.jpg';
//             }}
//           />
//         </button>
//       ))}
//       {selectedImage && (
//         <FullScreenImageModal
//           imageUrl={selectedImage}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// }

// ImageGallery.propTypes = {
//   gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// export default ImageGallery;

import { useState } from 'react';
import PropTypes from 'prop-types';

import FullScreenImageModal from '../../Gallery/FullScreenImageModal/FullScreenImageModal';
import css from './ImageGallery.module.css';

function ImageGallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!Array.isArray(gallery) || gallery.length === 0) {
    return <div className={css.noImages}>No images available.</div>;
  }

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div
      className={css.containerPictures}
      role="list"
      aria-label="Image Gallery"
    >
      {gallery.map((imageUrl, index) => (
        <button
          key={index}
          className={css.galleryImageButton}
          onClick={() => handleImageClick(imageUrl)}
          aria-label={`Open image ${index + 1}`}
        >
          <img
            src={imageUrl}
            alt={`Gallery item ${index + 1}`}
            className={css.galleryItem}
            onError={e => {
              e.target.onerror = null;
              e.target.src = '/placeholder.jpg';
            }}
          />
        </button>
      ))}

      {selectedImage && (
        <FullScreenImageModal
          imageUrl={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageGallery;
