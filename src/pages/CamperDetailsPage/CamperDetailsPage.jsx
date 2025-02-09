import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectCampers, selectIsLoading, selectError } from "../../redux/campers/selectors.js";
import { getCampers } from "../../redux/campers/operations.js";
import Header from '../../components/Header/Header.jsx';
import BookingForm from '../../components/BookingForm/BookingForm.jsx';
import ImageGallery from '../../components/ImageGallery/ImageGallery.jsx';
import VehicleDetails from '../../components/VehicleDetails/VehicleDetails.jsx';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import css from './CamperDetailsPage.module.css';

function CamperDetailsPage() {
    const dispatch = useDispatch();
    const { id } = useParams(); // Отримуємо id з URL
    const campers = useSelector(selectCampers);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const [camper, setCamper] = useState(null);

    useEffect(() => {
        if (!campers || campers.length === 0) {
            dispatch(getCampers());
        }
    }, [dispatch, campers]);

    useEffect(() => {
        if (campers && campers.length > 0 && id) {
            const foundCamper = campers.find(c => c.id === id);
            setCamper(foundCamper || null);
        }
    }, [campers, id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!camper) {
        return <div>Camper not found.</div>;
    }

    return (
        <div className={css.container}>
            <Header />
            <div className={css.containerTitle}>
                <HeroSection camper={camper} /> {/* Передаємо camper в HeroSection */}
                <ImageGallery gallery={camper.gallery} /> {/* Передаємо gallery в ImageGallery */}
                <div className={css.containerText}>
                    <p className={css.text}>
                        {camper.description} {/* Використовуємо опис з camper */}
                    </p>
                </div>
                <div className={css.tabc}>
                    <div className={css.titlesTabs}>
                        <h3 className={css.textTitlesTabsFeatures}>Features</h3>
                        <h3 className={css.textTitlesTabsReviews}>Reviews</h3>
                    </div>
                </div>
                <div className={css.dividerWrapper}>
                    <hr className={css.divider1} />
                    <hr className={css.divider2} />
                </div>
                <div className={css.detailsForm}>
                    <div className={css.details}>
                        <div className={css.badgesContainer}>
                           <div className={css.buttonAutomatic}>
               <svg
                  className={css.iconButtonAutomatic}
                  width="143"
                  height="48"
                  viewBox="0 0 104 32"
                >
                  <use href="/icons.svg#icon-icon-button-automatic"></use>
                </svg>
              </div>
              <div className={css.buttonAC}>
                <svg
                  className={css.iconButtonAC}
                  width="87"
                  height="48"
                  viewBox="0 0 63 32"
                >
                  <use href="/icons.svg#icon-icon-button-ac"></use>
                </svg>
              </div>
              <div className={css.buttonPetrol}>
                <svg
                  className={css.iconButtonPetrol}
                  width="109"
                  height="48"
                  viewBox="0 0 79 32"
                >
                  <use href="/icons.svg#icon-icon-button-petrol"></use>
                </svg>
              </div>
              <div className={css.buttonKitchen}>
                <svg
                  className={css.iconButtonKitchen}
                  width="123"
                  height="48"
                  viewBox="0 0 89 32"
                >
                  <use href="/icons.svg#icon-icon-button-kitchen"></use>
                </svg>
              </div>
              <div className={css.buttonRadio}>
                <svg
                  className={css.iconButtonRadio}
                  width="123"
                  height="48"
                  viewBox="0 0 79 32"
                >
                  <use href="/icons.svg#icon-icon-button-radio"></use>
                </svg>
              </div>
                        </div>
                        <div className={css.vehicleContainerForm}>
                            <VehicleDetails camper={camper} /> {/* Передаємо camper в VehicleDetails */}
                        </div>
                    </div>
                    <BookingForm camper={camper} /> {/* Передаємо camper в BookingForm */}
                </div>
            </div>
        </div>
    );
}

export default CamperDetailsPage;
