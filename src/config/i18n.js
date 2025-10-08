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
import headerEN from '../locales/en/header.json'; // <--- ДОДАНО
import headerUK from '../locales/uk/header.json'; // <--- ДОДАНО
import footerEN from '../locales/en/footer.json'; // <--- ДОДАНО
import footerUK from '../locales/uk/footer.json'; // <--- ДОДАНО
import aboutModalEN from '../locales/en/about_modal.json'; // <--- ДОДАНО
import aboutModalUK from '../locales/uk/about_modal.json'; // <--- ДОДАНО
import servicesModalEN from '../locales/en/services_modal.json'; // <--- ДОДАНО
import servicesModalUK from '../locales/uk/services_modal.json'; // <--- ДОДАНО
import pricesModalEN from '../locales/en/prices_modal.json'; // <--- ДОДАНО
import pricesModalUK from '../locales/uk/prices_modal.json'; // <--- ДОДАНО
import contactsModalEN from '../locales/en/contacts_modal.json'; // <--- ДОДАНО
import contactsModalUK from '../locales/uk/contacts_modal.json'; // <--- ДОДАНО

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
    header: headerEN,
    footer: footerEN,
    about_modal: aboutModalEN,
    services_modal: servicesModalEN,
    prices_modal: pricesModalEN,
    contacts_modal: contactsModalEN,
  },
  uk: {
    button: buttonUK,
    home: homeUK,
    catalog: catalogUK,
    translation: translationUK,
    form_booking: formBookingUK,
    form_reviews: formReviewsUK,
    content_reviews: contentReviewsUK,
    header: headerUK,
    footer: footerUK,
    about_modal: aboutModalUK,
    services_modal: servicesModalUK,
    prices_modal: pricesModalUK,
    contacts_modal: contactsModalUK,
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
      'header',
      'footer',
      'about_modal',
      'services_modal',
      'prices_modal',
      'contacts_modal',
    ],
    defaultNS: 'home',
  });

export default i18n;
