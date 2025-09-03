import Modal from '../../components/Modal/Modal.jsx';
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
    {/* <div className={css.contactContainer}> */}
    <ul className={css.contactList}>
      {contacts.map(({ city, street, phone }, index) => (
        // Кожен елемент списку тепер є окремим блоком-карткою
        <li className={css.contactItem} key={index}>
          <p className={css.addressInfo}>
            <strong>{city}:</strong> {street}
          </p>
          {/* <div className={css.contactDetails}> */}
          <p className={css.contactInfoPhone}>
            Tel:&nbsp;
            <a href={`tel:${phone}`} className={css.contactLink}>
              {phone}
            </a>
          </p>
          <p className={css.contactInfoEmail}>
            Email:&nbsp;
            <a href="mailto:info@traveltrucks.com" className={css.contactLink}>
              info@traveltrucks.com
            </a>
          </p>
          {/* </div> */}
        </li>
      ))}
    </ul>
    {/* </div> */}
  </Modal>
);

ContactsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default ContactsModal;
