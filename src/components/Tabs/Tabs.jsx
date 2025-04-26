
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import css from './Tabs.module.css';

function Tabs({ camper, activeTab }) {
    const navigate = useNavigate();
    const location = useLocation();

   const camperId = camper?._id || camper?.id;

  const handleBackToDetails = () => {
        if (camperId) {
            navigate(`/catalog/${camperId}`, { state: { camper } });
        }
    };

    const handleBackToReviews = () => {
        if (camperId) {
            navigate(`/catalog/${camperId}/reviews`, { state: { camper } });
        }
    };
     if (!camperId) {
        return null;
    }

    return (
        <div className={css.tabc}>
            <div className={css.titlesTabs}>
                 <button
                    onClick={handleBackToDetails}
                    className={`${css.textTitlesTabsFeatures} ${activeTab !== 'reviews' ? css.active : ''}`}
                >
                    Features
                </button>
                <button
                    onClick={handleBackToReviews}
                    className={`${css.textTitlesTabsReviews} ${activeTab === 'reviews' ? css.active : ''}`}
                >
                    Reviews
                </button>
               
            </div>
        </div>
    );
}

export default Tabs;

