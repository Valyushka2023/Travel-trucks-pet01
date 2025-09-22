import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Імпортуйте ваші файли перекладів
import buttonEN from '../locales/en/button.json';
import homeEN from '../locales/en/home.json';
import catalogEN from '../locales/en/catalog.json';
import translationEN from '../locales/en/translation.json';
import formBookingEN from '../locales/en/form_booking.json';
import formReviewsEN from '../locales/en/form_reviews.json';
import contentReviewsEN from '../locales/en/content_reviews.json';

import buttonUK from '../locales/uk/button.json';
import homeUK from '../locales/uk/home.json';
import catalogUK from '../locales/uk/catalog.json';
import translationUK from '../locales/uk/translation.json';
import formBookingUK from '../locales/uk/form_booking.json';
import formReviewsUK from '../locales/uk/form_reviews.json';
import contentReviewsUK from '../locales/uk/content_reviews.json';

// Ресурси перекладів
const resources = {
  en: {
    button: buttonEN,
    home: homeEN,
    catalog: catalogEN,
    translation: translationEN,
    form_booking: formBookingEN,
    form_reviews: formReviewsEN,
    content_reviews: contentReviewsEN,
  },
  uk: {
    button: buttonUK,
    home: homeUK,
    catalog: catalogUK,
    translation: translationUK,
    form_booking: formBookingUK,
    form_reviews: formReviewsUK,
    content_reviews: contentReviewsUK,
  },
};

i18n
  .use(initReactI18next) // Передає i18n у react-i18next
  .init({
    resources,
    lng: 'en', // Мова за замовчуванням
    fallbackLng: 'en', // Мова, яка буде використана, якщо перекладу немає
    interpolation: {
      escapeValue: false, // Не екранувати HTML-символи
    },
    ns: [
      'button',
      'home',
      'catalog',
      'translation',
      'form_booking',
      'form_reviews',
      'content_reviews',
    ],
    defaultNS: 'home',
  });

export default i18n;
