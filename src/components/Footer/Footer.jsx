import PhoneNumber from '../../components/Contacts/PhoneNumber/PhoneNumber.jsx';
import SocialLinks from '../../components/Contacts/SocialNetworks/SocialLinks.jsx';

import InfoLinks from '../InfoLinks/InfoLinks.jsx';
import css from './Footer.module.css';

function Footer() {
  return (
    <div className={css['footer-wrapper']}>
      <footer className={css['footer-container']}>
        <div className={css['contact-group']}>
          <PhoneNumber />
          <div className={css['social-networks']}>
            <SocialLinks />
          </div>
        </div>

        <div className={css['info-links']}>
          <InfoLinks />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
