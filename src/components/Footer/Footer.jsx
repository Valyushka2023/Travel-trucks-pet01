import PhoneNumber from '../../components/Contacts/PhoneNumber/PhoneNumber.jsx';
import SocialLinks from '../../components/Contacts/SocialNetworks/SocialLinks.jsx';

import InfoLinks from '../InfoLinks/InfoLinks.jsx';
import css from './Footer.module.css';

function Footer() {
  return (
    <div className={css.footerWrapper}>
      <footer className={css.footerContainer}>
        {/* Контейнер для телефону та соцмереж */}
        <div className={css.contactGroup}>
          <PhoneNumber /> {/* Тепер використовуємо окремий компонент */}
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
