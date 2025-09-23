import Modal from '../../Modal/Modal.jsx';
import PropTypes from 'prop-types';
import css from './ContactsModal.module.css';

const contacts = [
  { city: 'Kyiv', street: 'Kyivska St., 1', phone: '067-123-45-67' },
  { city: 'Odesa', street: 'Odeska St., 2', phone: '067-123-45-68' },
  { city: 'Poltava', street: 'Poltavska St., 3', phone: '067-123-45-69' },
  { city: 'Kharkiv', street: 'Kharkivska St., 4', phone: '067-123-45-70' },
  { city: 'Dnipro', street: 'Dniprovska St., 5', phone: '067-123-45-71' },
  { city: 'Sumy', street: 'Sumska St., 6', phone: '067-123-45-72' },
  { city: 'Lviv', street: 'Lvivska St., 7', phone: '067-123-45-73' },
];

const ContactsModal = ({ onClose, title = 'Contacts' }) => (
  <Modal title={title} onClose={onClose}>
    <div className={css['container-contacts']}>
      <ul className={css['contact-list']}>
        {contacts.map(({ city, street, phone }, index) => (
          <li className={css['contact-item']} key={index}>
            <p className={css['address-info']}>
              <strong>{city}:</strong> {street}
            </p>
            <p className={css['contact-info-phone']}>
              Tel:&nbsp;
              <a href={`tel:${phone}`} className={css['contact-link']}>
                {phone}
              </a>
            </p>
            <p className={css['contact-info-email']}>
              Email:&nbsp;
              <a
                href="mailto:infotraveltrucks@gmail.com"
                className={css['contact-link']}
              >
                infotraveltrucks@gmail.com
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  </Modal>
);

ContactsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default ContactsModal;
