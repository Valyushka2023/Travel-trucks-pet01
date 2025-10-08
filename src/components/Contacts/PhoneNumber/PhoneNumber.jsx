import { FaPhoneAlt } from 'react-icons/fa';
import css from './PhoneNumber.module.css';

function PhoneNumber() {
  return (
    <div className={css.phone}>
      <FaPhoneAlt className={css['home-phone-icon']} />
      <a href="tel:0671234567" className={css['phone-number']}>
        067-123-45-67
      </a>
    </div>
  );
}

export default PhoneNumber;
