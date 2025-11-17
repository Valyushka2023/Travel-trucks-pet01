import PropTypes from 'prop-types';
import Card from '../Ui/Card/Card.jsx';
import css from './CardList.module.css';
import { useTranslation } from 'react-i18next';

const CardList = ({ campers }) => {
  const { t } = useTranslation();

  return (
    <div className={css['card-list']}>
      {campers.length === 0 ? (
        <div>{t('noCamperMessage', { ns: 'card_list' })}</div>
      ) : (
        campers.map(camper => (
          <Card
            key={camper._id}
            _id={camper._id}
            name={camper.name}
            gallery={camper.gallery}
            price={camper.price}
            description={camper.description}
            reviews={camper.reviews}
            location={camper.location}
            features={camper.features}
            camper={camper}
          />
        ))
      )}
    </div>
  );
};

CardList.propTypes = {
  campers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string,
      location: PropTypes.string.isRequired,
      reviews: PropTypes.arrayOf(
        PropTypes.shape({
          reviewer_rating: PropTypes.number,
        })
      ),
      features: PropTypes.objectOf(PropTypes.bool),
    })
  ).isRequired,
};

export default CardList;
