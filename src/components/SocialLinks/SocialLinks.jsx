import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import css from './SocialLinks.module.css';

/**
 * Array of social platforms. Can be easily expanded or customized.
 */
const socialLinksData = [
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: FaFacebookF,
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: FaInstagram,
  },
  {
    href: 'https://t.me/yourchannel',
    label: 'Telegram',
    icon: FaTelegramPlane,
  },
  {
    href: 'https://tiktok.com/@youraccount',
    label: 'TikTok',
    icon: FaTiktok,
  },
];

const SocialLinks = ({ iconSize = 20 }) => {
  return (
    <div className={css.socialContainer}>
      {socialLinksData.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={css.socialIcon}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
};

SocialLinks.propTypes = {
  iconSize: PropTypes.number,
};

export default SocialLinks;
