import React from 'react';
import css from './ImageGallery.module.css';

function ImageGallery() {
  return (
    <div className={css.containerPictures}>
      <img
        src="/images/Pic1Mavericks@1x.jpg"
        srcSet="/images/Pic1Mavericks@1x.jpg 1x, /images/Pic1Mavericks@2x.jpg 2x"
        alt="Mavericks panel truck"
      />
      <img
        src="/images/Pic2Mavericks@1x.jpg"
        srcSet="/images/Pic2Mavericks@1x.jpg 1x, /images/Pic2Mavericks@2x.jpg 2x"
        alt="Mavericks panel truck"
      />
      <img
        src="/images/Pic3Mavericks@1x.jpg"
        srcSet="/images/Pic3Mavericks@1x.jpg 1x, /images/Pic3Mavericks@2x.jpg 2x"
        alt="Mavericks panel truck"
      />
      <img
        src="/images/Pic4Mavericks@1x.jpg"
        srcSet="/images/Pic4Mavericks@1x.jpg 1x, /images/Pic4Mavericks@2x.jpg 2x"
        alt="Mavericks panel truck"
      />
    </div>
  );
}

export default ImageGallery;
