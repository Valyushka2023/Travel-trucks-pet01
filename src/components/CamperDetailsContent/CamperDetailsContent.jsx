import React from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom'; // Додаємо useOutletContex
import Header from '../../components/Header/Header.jsx';
import FormBooking from '../../components/FormBooking/FormBooking.jsx';
import ImageGallery from '../../components/ImageGallery/ImageGallery.jsx';
import VehicleDetails from '../../components/VehicleDetails/VehicleDetails.jsx';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import FeatureIcon from "../../components/FeatureIcon/FeatureIcon.jsx";
import css from './CamperDetailsContent.module.css';

function CamperDetailsContent() {
    const location = useLocation();
    const { camper, activeTab } = useOutletContext(); // Отримуємо camper з Outlet context
 
    const featureIcons = [
        { name: "AC", icon: "ac", svgId: "icon-icon-button-AC" },
        { name: "Bathroom", icon: "bathroom", svgId: "icon-icon-button-bathroom" },
        { name: "Kitchen", icon: "kitchen", svgId: "icon-icon-button-kitchen" },
        { name: "TV", icon: "tv", svgId: "icon-icon-button-TV" },
        { name: "Radio", icon: "radio", svgId: "icon-icon-button-radio" },
        { name: "Refrigerator", icon: "refrigerator", svgId: "icon-icon-button-refrigerator" },
        { name: "Microwave", icon: "microwave", svgId: "icon-icon-button-microwave" },
        { name: "Gas", icon: "gas", svgId: "icon-icon-button-gas" },
        { name: "Water", icon: "water", svgId: "icon-icon-button-water" },
    ];

    if (!camper) {
        return <div className={css.error}>Camper not found.</div>;
    }

    return (
        <div className={css.container}>
            <Header />
            <div className={css.containerTitle}>
                <HeroSection camper={camper} />
                <ImageGallery gallery={camper.gallery} />
                <div className={css.containerText}>
                    <p className={css.text}>{camper.description}</p>
                </div>
                <div className={css.tabc}>
                    <div className={css.titlesTabs}>
                         <Link to={`/catalog/${camper.id}?tab=features`} className={`${css.textTitlesTabsFeatures} ${activeTab === 'features' ? css.active : ''}`}>
                        Features
                    </Link>
                    <Link to={`/catalog/${camper.id}/reviews`} className={`${css.textTitlesTabsReviews} ${activeTab === 'reviews' ? css.active : ''}`}>
                        Reviews
                    </Link>
                    </div>
                     <div className={css.dividerWrapper}>
                   <div className={css.divider1}></div>
                    </div>
                </div>
            

                <div className={css.detailsForm}>
                    <div className={css.details}>
                        <FeatureIcon camper={camper} />
                        <VehicleDetails camper={camper} />
                    </div>
                    <FormBooking camper={camper} />
                </div>
            </div>
        </div>
    );
}

export default CamperDetailsContent;


