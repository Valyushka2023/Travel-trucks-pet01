import { FaPhoneAlt } from 'react-icons/fa';
import SocialLinks from '../SocialLinks/SocialLinks.jsx';
import InfoLinks from '../InfoLinks/InfoLinks.jsx';
import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.footerContainer}>
      {/* Телефон */}
      <div className={css.phone}>
        <FaPhoneAlt className={css.phoneIcon} />
        <a href="tel:0671234567" className={css.phoneNumber}>
          067-123-45-67
        </a>
      </div>

      {/* Навігація */}
      <div className={css.info}>
        <InfoLinks />
      </div>

      {/* Соціальні мережі */}
      <div className={css.socialNetworks}>
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
