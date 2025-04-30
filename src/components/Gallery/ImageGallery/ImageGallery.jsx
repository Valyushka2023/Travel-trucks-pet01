import { useState } from 'react';
import PropTypes from 'prop-types';

import FullScreenImageModal from '../../Gallery/FullScreenImageModal/FullScreenImageModal'; // Імпортуємо модаль
import css from './ImageGallery.module.css';

function ImageGallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!gallery || !Array.isArray(gallery)) {
    return <div>No images available.</div>;
  }

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={css.containerPictures}>
      {/* {gallery.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          className={css.galleryImage}
          onClick={() => handleImageClick(imageUrl)} // Додаємо обробник кліку
          onError={e => {
            e.target.onerror = null;
            e.target.src = '/placeholder.jpg';
          }}
        />
      ))} */}
      {gallery.map((imageUrl, index) => (
        <button
          key={index}
          className={css.galleryImageButton} // Додайте новий клас для стилізації
          onClick={() => handleImageClick(imageUrl)}
        >
          <img
            src={imageUrl}
            // alt={`Image ${index + 1}`}
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
