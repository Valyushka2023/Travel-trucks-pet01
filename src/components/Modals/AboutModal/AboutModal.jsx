import PropTypes from 'prop-types';

import Modal from '../../Modal/Modal.jsx';
import css from './AboutModal.module.css';

// Ключі без префіксу, оскільки простір імен 'about_modal' буде встановлено
const DEFAULT_PARAGRAPH_KEYS = [
  'paragraph_1',
  'paragraph_2',
  'paragraph_3',
  'paragraph_4',
  'paragraph_5',
  'paragraph_6',
];

// Англійський резервний текст для defaultValue
const FALLBACK_PARAGRAPHS = [
  'We are TravelTrucks — a company specializing in modern camper rentals for comfortable travel across Ukraine.',
  'TravelTrucks was founded in 2024.',
  'Our fleet includes 24 campers ranging from Economy to Premium class.',
  'We operate in Kyiv, Odesa, Kharkiv, Sumy, Poltava, Dnipro, and Lviv.',
  'The TravelTrucks team consists of young, energetic individuals.',
  'Booking the camper you want is easy — just give us a call or leave a request on our website!',
];

const AboutModal = ({ onClose }) => {
  // Встановлюємо простір імен 'about_modal'
  const { t } = useTranslation('about_modal');

  // Отримуємо перекладений заголовок (ключ: 'title')
  const title = t('title', { defaultValue: 'About us' });

  // Створюємо масив, де кожен елемент – це перекладений абзац
  const translatedParagraphs = DEFAULT_PARAGRAPH_KEYS.map((key, index) =>
    t(key, {
      defaultValue: FALLBACK_PARAGRAPHS[index],
    })
  );

  return (
    <Modal title={title} onClose={onClose}>
      <div className={css['text-about-modal']}>
        {/* Рендеримо перекладені абзаци */}
        {translatedParagraphs.map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </div>
    </Modal>
  );
};

AboutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AboutModal;
