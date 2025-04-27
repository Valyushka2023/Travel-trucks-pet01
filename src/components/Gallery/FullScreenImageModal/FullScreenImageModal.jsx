import React from 'react';
import css from './FullScreenImageModal.module.css';

function FullScreenImageModal({ imageUrl, onClose }) {
    return (
        <div className={css.modalOverlay} onClick={onClose}>
            <div className={css.modalContent} onClick={(e) => e.stopPropagation()}> {/* Щоб клік всередині не закривав модаль */}
                <img src={imageUrl} alt="Full Screen Image" className={css.fullScreenImage} />
                <button className={css.closeButton} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default FullScreenImageModal;