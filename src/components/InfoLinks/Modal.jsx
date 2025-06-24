// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Logo from '../../components/Ui/Logo/Logo.jsx';
// import css from './Modal.module.css';

// function Modal({ title, titleClassName, children, onClose }) {
//   useEffect(() => {
//     const handleEscape = e => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [onClose]);

//   return (
//     <div
//       className={css.backdrop}
//       onClick={e => {
//         if (e.target === e.currentTarget) {
//           onClose();
//         }
//       }}
//     >
//       <div className={css.modal}>
//         <div className={css.modalHeader}>
//           <Logo />
//           <button className={css.closeBtn} onClick={onClose}>
//             ✖
//           </button>
//         </div>

//         <h2 className={`${css.title} ${titleClassName || ''}`}>{title}</h2>

//         {children}
//       </div>
//     </div>
//   );
// }
// Modal.propTypes = {
//   title: PropTypes.string.isRequired,
//   titleClassName: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;

// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Logo from '../../components/Ui/Logo/Logo.jsx';
// import css from './Modal.module.css';

// function Modal({ title, titleClassName, children, onClose }) {
//   useEffect(() => {
//     const handleEscape = e => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [onClose]);

//   const handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const handleBackdropKeyDown = e => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className={css.backdrop}
//       onClick={handleBackdropClick}
//       onKeyDown={handleBackdropKeyDown}
//       tabIndex="0"
//       role="dialog"
//     >
//       <div className={css.modal}>
//         <div className={css.modalHeader}>
//           <Logo />
//           <button className={css.closeBtn} onClick={onClose}>
//             ✖
//           </button>
//         </div>

//         <h2 className={`${css.title} ${titleClassName || ''}`}>{title}</h2>

//         {children}
//       </div>
//     </div>
//   );
// }

// Modal.propTypes = {
//   title: PropTypes.string.isRequired,
//   titleClassName: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;

// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Logo from '..//..//components/Ui/Logo/Logo.jsx';
// import css from './Modal.module.css';

// function Modal({ title, titleClassName, children, onClose }) {
//   useEffect(() => {
//     const handleEscape = e => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [onClose]);

//   return (
//     <button className={css.backdrop} onClick={onClose}>
//       <div className={css.modal} onClick={e => e.stopPropagation()}>
//         <div className={css.modalHeader}>
//           <Logo />
//           <button className={css.closeBtn} onClick={onClose}>
//             ✖
//           </button>
//         </div>

//         <h2 className={`${css.title} ${titleClassName || ''}`}>{title}</h2>

//         {children}
//       </div>
//     </button>
//   );
// }

// Modal.propTypes = {
//   title: PropTypes.string.isRequired,
//   titleClassName: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Logo from '..//..//components/Ui/Logo/Logo.jsx';
import css from './Modal.module.css';

function Modal({ title, titleClassName, children, onClose }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <button className={css.backdrop} onClick={onClose}>
      <div className={css.modal}>
        <div className={css.modalHeader}>
          <Logo />
          <button className={css.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        <h2 className={`${css.modalTitle} ${titleClassName || ''}`}>{title}</h2>

        {children}
      </div>
    </button>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  titleClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
