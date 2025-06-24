import css from './Logo.module.css';

function Logo() {
  return (
    <div className={css.logo}>
      Travel<span className={css.logoSecondary}>Trucks</span>
    </div>
  );
}

export default Logo;
