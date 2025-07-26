import Modal from '../../components/Modal/Modal.jsx';
import PropTypes from 'prop-types';
import css from './AboutModal.module.css';

const AboutModal = ({
  onClose,
  title = 'About us',
  paragraphs = defaultParagraphs,
}) => (
  <Modal title={title} onClose={onClose}>
    <div className={css.textAboutModal}>
      {paragraphs.map((text, idx) => (
        <p key={idx}>{text}</p>
      ))}
    </div>
  </Modal>
);

const defaultParagraphs = [
  'We are TravelTrucks — a company specializing in modern camper rentals for comfortable travel across Ukraine.',
  'TravelTrucks was founded in 2024.',
  'Our fleet includes 24 campers ranging from Economy to Premium class.',
  'We operate in Kyiv, Odesa, Kharkiv, Sumy, Poltava, Dnipro, and Lviv.',
  'The TravelTrucks team consists of young, energetic individuals.',
  'Booking the camper you want is easy — just give us a call or leave a request on our website!',
];

AboutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
};

export default AboutModal;
