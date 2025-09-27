import Modal from '../../Modal/Modal.jsx';
import PropTypes from 'prop-types';
import css from './ServicesModal.module.css';

const ServicesModal = ({
  onClose,
  title = 'Our services',
  paragraphs = defaultParagraphs,
}) => (
  <Modal title={title} onClose={onClose}>
    <div className={css['text-services-modal']}>
      {paragraphs.map((text, idx) => (
        <p key={idx}>{text}</p>
      ))}
    </div>
  </Modal>
);
const defaultParagraphs = [
  'Our services include camper rental, technical support on the road, route advice, and additional equipment.',
  'You can rent a car with or without a driver.',
  'A car delivery service to a specified location is possible.',
  'The entire fleet is insured with CASCO and OSAGO.',
  'Technical support is available 24/7. You can always call if you have any problems with your car or service.',
  'If the car breaks down, we will replace it instantly.',
];

ServicesModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
};

export default ServicesModal;
