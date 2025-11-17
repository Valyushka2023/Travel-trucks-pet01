import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../Header/Header.jsx';
import HeroSection from '../../HeroSection/HeroSection.jsx';
import ImageGallery from '../../Gallery/ImageGallery/ImageGallery.jsx';
import Tabs from '../../Tabs/Tabs.jsx';
import FeatureIcon from '../../FeatureIcon/FeatureIcon.jsx';
import VehicleDetails from '../../VehicleDetails/VehicleDetails.jsx';
import FormBooking from '../../Forms/FormBooking/FormBooking.jsx';
import css from './ContentDetails.module.css';

function ContentDetails() {
  const { camper, activeTab } = useOutletContext();
  const { t } = useTranslation();

  if (!camper) {
    return (
      <div className={css.error}>
        {t('errors.camperNotFound', { ns: 'content_details' })}{' '}
      </div>
    );
  }

  return (
    <div className={css.container}>
      <Header />
      <div className={css['container-content-details']}>
        <HeroSection camper={camper} />
        <ImageGallery gallery={camper.gallery} />

        <div className={css['container-text']}>
          <p className={css.text}>{camper.description}</p>
        </div>

        <Tabs camper={camper} activeTab={activeTab} />

        <div className={css['container-form-details']}>
          <div className={css.details}>
            <FeatureIcon camper={camper} />
            <VehicleDetails camper={camper} />
          </div>
          <div className={css['container-form-booking']}>
            <FormBooking camper={camper} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDetails;
