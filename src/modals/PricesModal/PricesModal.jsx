import Modal from '../../components/Modal/Modal.jsx';
import PropTypes from 'prop-types';
import css from './PricesModal.module.css';

const PricesModal = ({
  onClose,
  title = 'Prices',
  paragraphs = defaultParagraphs,
}) => (
  // <Modal title={title} titleClassName={css.titlePricesModal} onClose={onClose}>
  //   <div className={css.textPricesModal}>
  //     {paragraphs.map((text, idx) => (
  //       <p key={idx}>{text}</p>
  //     ))}
  //   </div>
  // </Modal>
  <Modal title={title} onClose={onClose}>
    <div className={css.textPricesModal}>
      {paragraphs.map((text, idx) => (
        <p key={idx}>{text}</p>
      ))}
    </div>
  </Modal>
);
const defaultParagraphs = [
  'Prices depend on the model and length of rental.',
  'Discounts for rentals of a week or more.',
  'Payments in national currency.',
  'Advance payment. The deposit is paid separately from the payment, before the start of the rental.',
  'In case of early return, a payment of 30% for the remaining days will be withheld, the difference will be refunded.',
];

PricesModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
};
export default PricesModal;
