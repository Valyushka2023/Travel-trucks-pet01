

// import React from 'react';
// import css from './ImageGallery.module.css';

// function ImageGallery({ gallery }) {
//     if (!gallery || !Array.isArray(gallery)) {
//         return <div>No images available.</div>;
//     }

//     return (
//         <div className={css.containerPictures}>
//             {gallery.map((imageUrl, index) => (
//                 <img
//                     key={index}
//                     src={imageUrl}
//                     alt={`Image ${index + 1}`}
//                     className={css.galleryImage}
//                     onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = '/placeholder.jpg';
//                     }}
//                 />
//             ))}
//         </div>
//     );
// }

// export default ImageGallery;

import React, { useState } from 'react';
import css from './ImageGallery.module.css';
import FullScreenImageModal from '../../Gallery/FullScreenImageModal/FullScreenImageModal'; // Імпортуємо модаль

function ImageGallery({ gallery }) {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!gallery || !Array.isArray(gallery)) {
        return <div>No images available.</div>;
    }

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className={css.containerPictures}>
            {gallery.map((imageUrl, index) => (
                <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className={css.galleryImage}
                    onClick={() => handleImageClick(imageUrl)} // Додаємо обробник кліку
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.jpg';
                    }}
                />
            ))}
            {selectedImage && (
                <FullScreenImageModal imageUrl={selectedImage} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default ImageGallery;