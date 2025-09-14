import { useState } from 'react';

import AboutModal from '../../components/Modals/AboutModal/AboutModal.jsx';
import ServicesModal from '../../components/Modals/ServicesModal/ServicesModal.jsx';
import PricingModal from '../../components/Modals/PricesModal/PricesModal.jsx';
import ContactsModal from '../../components/Modals/ContactsModal/ContactsModal.jsx';

import css from './InfoLinks.module.css';

function InfoLinks() {
  const [active, setActive] = useState(null);

  return (
    <div className={css.infoLinks}>
      <ul className={css.links}>
        <li>
          <button onClick={() => setActive('about')}>About us</button>
        </li>
        <li>
          <button onClick={() => setActive('services')}>Our services</button>
        </li>
        <li>
          <button onClick={() => setActive('prices')}>Prices</button>
        </li>
        <li>
          <button onClick={() => setActive('contacts')}>Contacts</button>
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
