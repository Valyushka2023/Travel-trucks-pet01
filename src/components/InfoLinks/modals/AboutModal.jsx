import Modal from '../Modal';
import PropTypes from 'prop-types';
import css from './AboutModal.module.css';

const AboutModal = ({
  onClose,
  title = 'About us',
  paragraphs = defaultParagraphs,
}) => (
  <Modal title={title} titleClassName={css.titleAboutModal} onClose={onClose}>
    <div className={css.textAboutModal}>
      {paragraphs.map((text, idx) => (
        <p key={idx}>{text}</p>
      ))}
    </div>
  </Modal>
);

const defaultParagraphs = [
  'We are TravelTrucks, a company specializing in renting modern campers for comfortable travel around Ukraine.',
  'The company was founded in 2024.',
  'The company’s fleet includes 24 cars from Economy to Premium class...',
  'Our locations: Kyiv, Odesa, Kharkiv, Sumy, Poltava, Dnipro, Lviv.',
  'The TravelTrucks team is made up of young, active people...',
  'Renting the car you want is easy! Call us or leave a request...',
];

AboutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
};

export default AboutModal;
