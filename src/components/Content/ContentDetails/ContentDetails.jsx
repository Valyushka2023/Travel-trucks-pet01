

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../../Header/Header.jsx';
import HeroSection from '../../HeroSection/HeroSection.jsx';
import ImageGallery from '../../Gallery/ImageGallery/ImageGallery.jsx';
import Tabs from '../../Tabs/Tabs.jsx';
import FeatureIcon from "../../FeatureIcon/FeatureIcon.jsx";
import VehicleDetails from '../../VehicleDetails/VehicleDetails.jsx';
import FormBooking from '../../Forms/FormBooking/FormBooking.jsx';
import css from './ContentDetails.module.css';
// import ReviewsList from "../../Reviews/ReviewsList/ReviewsList.jsx";

function ContentDetails() {
    const { camper, activeTab, onReviewAdded } = useOutletContext();

    if (!camper) {
        return <div className={css.error}>Camper not found.</div>;
    }

    return (
        <div className={css.container}>
            <div className={css.containerHeader}>
                <Header />
                <div className={css.containerTitle}>
                    <HeroSection camper={camper} />
                    <ImageGallery gallery={camper.gallery} />
                    <div className={css.containerText}>
                        <p className={css.text}>{camper.description}</p>
                    </div>
                </div>
            </div>
            <Tabs camper={camper} activeTab={activeTab} />
            <div className={css.detailsForm}>
                <div className={css.details}>
                    <FeatureIcon camper={camper} />
                    <VehicleDetails camper={camper} />
                </div>
                <FormBooking camper={camper} />
            </div>
        </div>
    );
}

export default ContentDetails;