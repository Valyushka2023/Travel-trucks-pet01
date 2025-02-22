import React from 'react';
import css from './ImageGallery.module.css';


function ImageGallery({ gallery }) {
  if (!gallery || !Array.isArray(gallery)) {
    return <div>No images available.</div>;
  }

  return (
    <div className={css.containerPictures}>
      {gallery.map((image, index) => {
        const imageUrl = image.original.replace('compers-test-tos', 'compers-test-tas'); // Виправляємо помилку в URL
        return (
<img
  key={index}
  src={imageUrl}
  alt={`Image ${index + 1}`}
  className={css.galleryImage} // Використовуємо стиль з CSS Modules
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/placeholder.jpg';
  }}
/>
        );
      })}
    </div>
  );
}

export default ImageGallery;