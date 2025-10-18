import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Modal from '../../Modal/Modal.jsx';
import css from './ContactsModal.module.css';

// --- Визначення констант для демонстрації перекладу параграфів (залишаємо) ---
const DEFAULT_PARAGRAPH_KEYS = ['info.address', 'info.working_hours'];

const FALLBACK_PARAGRAPHS = [
  'Please find our addresses and contact details below.',
  'Our customer support operates 24/7.',
];
// -------------------------------------------------------------------------

// --- ВИДАЛЕНО: Статичний масив contacts, оскільки дані будуть завантажуватися з i18n ---
// const contacts = [...]

const ContactsModal = ({ onClose }) => {
  // Встановлюємо простір імен 'contacts_modal'
  const { t } = useTranslation('contacts_modal');

  // Отримуємо перекладений заголовок (ключ: 'title')
  const title = t('title', { defaultValue: 'Contacts' });

  // Отримуємо масив перекладених параграфів
  const _translatedParagraphs = DEFAULT_PARAGRAPH_KEYS.map((key, index) =>
    t(key, {
      defaultValue: FALLBACK_PARAGRAPHS[index],
    })
  );

  // --- ОТРИМУЄМО АДРЕСУ ЕЛЕКТРОННОЇ ПОШТИ З I18N ---
  const emailAddress = t('main_email', {
    defaultValue: 'infotraveltrucks@gmail.com',
  });

  // --- ДОДАНО: Динамічне завантаження контактів (міст і вулиць) з файлу перекладу ---
  // returnObjects: true дозволяє отримати масив об'єктів
  const localizedContacts = t('addresses', { returnObjects: true });
  // ----------------------------------------------------------------------------------

  return (
    <Modal title={title} onClose={onClose}>
      <div className={css['container-contacts']}>
        <ul className={css['contact-list']}>
          {localizedContacts.map(({ city, street, phone }, index) => (
            <li className={css['contact-item']} key={index}>
              <p className={css['address-info']}>
                <strong>{t('city_label', { defaultValue: 'City' })}:</strong>{' '}
                {city}
                <br />
                {street}
              </p>
              <p className={css['contact-info-phone']}>
                <FaPhoneAlt className={css['contact-phone-icon']} />
                &nbsp;
                <a href={`tel:${phone}`} className={css['phone-link']}>
                  {phone}
                </a>
              </p>
              <p className={css['contact-info-email']}>
                <FaEnvelope className={css['contact-email-icon']} />
                &nbsp;
                <a
                  href={`mailto:${emailAddress}`}
                  className={css['email-link']}
                >
                  {emailAddress}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

ContactsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ContactsModal;
