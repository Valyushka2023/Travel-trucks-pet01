import { useOutletContext } from 'react-router-dom';
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
      </div>
      <div className={css.containerTabs}>
        <Tabs camper={camper} activeTab={activeTab} />
      </div>

      <div className={css.detailsForm}>
        <div className={css.details}>
          <FeatureIcon camper={camper} />
          <VehicleDetails camper={camper} />
        </div>
        <div className={css.containerFormBooking}>
          <FormBooking camper={camper} />
        </div>
      </div>
    </div>
  );
}

export default ContentDetails;
