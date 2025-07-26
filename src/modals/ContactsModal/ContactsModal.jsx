// import Modal from '../../components/Modal/Modal.jsx';
// import PropTypes from 'prop-types';
// import css from './ContactsModal.module.css';

// const contacts = [
//   { city: 'Kyiv', street: 'Kyivska St., 1', phone: '067-123-45-67' },
//   { city: 'Odesa', street: 'Odeska St., 2', phone: '067-123-45-68' },
//   { city: 'Poltava', street: 'Poltavska St., 3', phone: '067-123-45-69' },
//   { city: 'Kharkiv', street: 'Kharkivska St., 4', phone: '067-123-45-70' },
//   { city: 'Dnipro', street: 'Dniprovska St., 5', phone: '067-123-45-71' },
//   { city: 'Sumy', street: 'Sumska St., 6', phone: '067-123-45-72' },
//   { city: 'Lviv', street: 'Lvivska St., 7', phone: '067-123-45-73' },
// ];

// const ContactsModal = ({ onClose, title = 'Contacts' }) => (
//   <Modal title={title} onClose={onClose}>
//     <div className={css.contactContainer}>
//       {contacts.map(({ city, street, phone }, index) => (
//         <div className={css.contactBlok} key={index}>
//           <h3 className={css.city}>{city}</h3>
//           <p className={css.street}>{street}</p>
//           <p className={css.phone}>Tel: {phone}</p>
//           <p className={css.email}>Email: info@traveltrucks.com</p>
//         </div>
//       ))}
//     </div>
//   </Modal>
// );

// ContactsModal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   title: PropTypes.string,
// };

// export default ContactsModal;
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
    <div className={css.contactContainer}>
      <ul className={css.contactList}>
        {contacts.map(({ city, street, phone }, index) => (
          <li className={css.contactItem} key={index}>
            {/* Групуємо адресу для легкого контролю на всіх брейкпоінтах */}
            <span className={css.addressInfo}>
              <strong>{city}:</strong> {street},&nbsp;
            </span>

            {/* Групуємо телефон та email для їх розташування на різних брейкпоінтах */}
            <span className={css.contactInfo}>
              Tel:&nbsp;
              <a href={`tel:${phone}`} className={css.contactLink}>
                {phone}
              </a>
              ,&nbsp; Email:&nbsp;
              <a
                href="mailto:info@traveltrucks.com"
                className={css.contactLink}
              >
                info@traveltrucks.com
              </a>
            </span>
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
