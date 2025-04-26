

import React from 'react';
import css from './ImageGallery.module.css';

function ImageGallery({ gallery }) {
    if (!gallery || !Array.isArray(gallery)) {
        return <div>No images available.</div>;
    }

    return (
        <div className={css.containerPictures}>
            {gallery.map((imageUrl, index) => (
                <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className={css.galleryImage}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.jpg';
                    }}
                />
            ))}
        </div>
    );
}

export default ImageGallery;