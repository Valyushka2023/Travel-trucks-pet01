// import css from './Logo.module.css';

// function Logo() {
//   return (
//     <div className={css.logo}>
//       Travel<span className={css.logoSecondary}>Trucks</span>
//     </div>
//   );
// }

// export default Logo;
import css from './Logo.module.css';

// Компонент тепер приймає пропси
function Logo({ className = '' }) {
  return (
    <div className={`${css.logo} ${className}`}>
      Travel<span className={css.logoSecondary}>Trucks</span>
    </div>
  );
}

export default Logo;
