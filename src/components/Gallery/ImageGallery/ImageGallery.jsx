import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FullScreenImageModal from '../../Gallery/FullScreenImageModal/FullScreenImageModal';
import css from './ImageGallery.module.css';

function ImageGallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!Array.isArray(gallery) || gallery.length === 0) {
    return <div className={css.noImages}>No images available.</div>;
  }

  const handleImageClick = imageUrl => {
    if (isMobile) {
      console.log('Modal window is blocked on mobile devices');
      return;
    }
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
