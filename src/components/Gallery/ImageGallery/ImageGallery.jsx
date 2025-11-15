import { useState } from 'react';
import PropTypes from 'prop-types';

import FullScreenImageModal from '../../Gallery/FullScreenImageModal/FullScreenImageModal';
import css from './ImageGallery.module.css';

function ImageGallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);
  // Стан isMobile та useEffect ВИДАЛЕНО, оскільки вони не використовуються

  if (!Array.isArray(gallery) || gallery.length === 0) {
    return <div className={css.noImages}>No images available.</div>;
  }

  const handleImageClick = imageUrl => {
    // Логіка isMobile, що спричиняла помилку ESLint, видалена.
    setSelectedImage(imageUrl);

    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);

    document.body.style.overflow = '';
  };

  return (
    <div
      className={css['container-pictures']}
      role="list"
      aria-label="Image Gallery"
    >
      {gallery.map((imageUrl, index) => (
        <button
          key={index}
          className={css['gallery-image-button']}
          onClick={() => handleImageClick(imageUrl)}
          aria-label={`Open image ${index + 1}`}
        >
          <img
            src={imageUrl}
            alt={`Gallery item ${index + 1}`}
            className={css['gallery-item']}
            loading="lazy"
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
