import { FaPhoneAlt } from 'react-icons/fa';
import SocialLinks from '../SocialLinks/SocialLinks.jsx';
import InfoLinks from '../InfoLinks/InfoLinks.jsx';
import css from './Footer.module.css';

function Footer() {
  return (
    <div className={css.footerWrapper}>
      <footer className={css.footerContainer}>
        {/* Контейнер для телефону та соцмереж */}
        <div className={css.contactGroup}>
          <div className={css.phone}>
            <FaPhoneAlt className={css.phoneIcon} />
            <a href="tel:0671234567" className={css.phoneNumber}>
              067-123-45-67
            </a>
          </div>

          <div className={css.socialNetworks}>
            <SocialLinks />
          </div>
        </div>

        {/* Навігація */}
        <div className={css.info}>
          <InfoLinks />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
