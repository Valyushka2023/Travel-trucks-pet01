import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './Tabs.module.css'; // Створіть окремий файл стилів для Tabs

function Tabs({ camper, activeTab }) {
    const location = useLocation();
    const isFeaturesPage = location.pathname.includes('/features');
    const isReviewsPage = location.pathname.includes('/reviews');

    return (
        <div className={css.tabc}>
            <div className={css.titlesTabs}>
                {!isFeaturesPage && (
                    <Link to={`/catalog/${camper.id}?tab=features`} className={`${css.textTitlesTabsFeatures} ${activeTab === 'features' ? css.active : ''}`}>
                        Features
                    </Link>
                )}

                {!isReviewsPage && (
                    <Link to={`/catalog/${camper.id}/reviews`} className={`${css.textTitlesTabsReviews} ${activeTab === 'reviews' ? css.active : ''}`}>
                        Reviews
                    </Link>
                )}
            </div>
            <div className={css.dividerWrapper}>
                <div className={css.divider1}></div> {/* Або divider2, залежно від дизайну */}
            </div>
        </div>
    );
}

export default Tabs;