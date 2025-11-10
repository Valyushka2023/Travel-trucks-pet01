import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // <--- ДОДАНО
import AboutModal from '../../components/Modals/AboutModal/AboutModal.jsx';
import ServicesModal from '../../components/Modals/ServicesModal/ServicesModal.jsx';
import PricingModal from '../../components/Modals/PricesModal/PricesModal.jsx';
import ContactsModal from '../../components/Modals/ContactsModal/ContactsModal.jsx';
import css from './InfoLinks.module.css';

function InfoLinks() {
  // Встановлюємо простір імен 'footer' для всього компонента
  const { t } = useTranslation('footer');
  const [active, setActive] = useState(null);

  return (
    <div>
      <ul className={css['info-list']}>
        <li className={css['info-item']}>
          {/* Використовуємо ключ 'about' */}
          <button onClick={() => setActive('about')}>{t('about')}</button>
        </li>
        <li className={css['info-item']}>
          {/* Використовуємо ключ 'services' */}
          <button onClick={() => setActive('services')}>{t('services')}</button>
        </li>
        <li className={css['info-item']}>
          {/* Використовуємо ключ 'prices' */}
          <button onClick={() => setActive('prices')}>{t('prices')}</button>
        </li>
        <li className={css['info-item']}>
          {/* Використовуємо ключ 'contacts' */}
          <button onClick={() => setActive('contacts')}>{t('contacts')}</button>
        </li>
      </ul>

      {active === 'about' && <AboutModal onClose={() => setActive(null)} />}
      {active === 'services' && (
        <ServicesModal onClose={() => setActive(null)} />
      )}
      {active === 'prices' && <PricingModal onClose={() => setActive(null)} />}
      {active === 'contacts' && (
        <ContactsModal onClose={() => setActive(null)} />
      )}
    </div>
  );
}

export default InfoLinks;
