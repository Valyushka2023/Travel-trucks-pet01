
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import css from './Tabs.module.css';

function Tabs({ camper, activeTab }) {
    const navigate = useNavigate();
    const location = useLocation();


    const handleBackToDetails = () => {
        navigate(`/catalog/${camper._id}`, { state: { camper: camper } });
    };
    const handleBackToReviews = () => {
        navigate(`/catalog/${camper._id}/reviews`, { state: { camper: camper } });
    };

  

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