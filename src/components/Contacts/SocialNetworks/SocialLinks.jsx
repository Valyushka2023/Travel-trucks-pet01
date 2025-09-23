import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
} from 'react-icons/fa';
import css from './SocialLinks.module.css';

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

const SocialLinks = () => {
  return (
    <div className={css['social-container']}>
      {socialLinksData.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={css['socialIcon']}
        >
          <Icon className={css.icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
