import React from 'react';
import css from './ErrorComponent.module.css'; // Імпортимо стилі

function ErrorComponent({ error, onRetry }) {
    return (
        <div className={css.errorContainer}>
            <p className={css.errorMessage}>
                Виникла помилка: {error}
            </p>
            <button className={css.retryButton} onClick={onRetry}>
                Повторити завантаження
            </button>
        </div>
    );
}

export default ErrorComponent;