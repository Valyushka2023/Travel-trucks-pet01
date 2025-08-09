import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './Tabs.module.css';

function Tabs({ camper, activeTab }) {
  const navigate = useNavigate();

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
    <div className={css.tabs}>
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

Tabs.propTypes = {
  camper: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
  }),
  activeTab: PropTypes.string.isRequired,
};
export default Tabs;
