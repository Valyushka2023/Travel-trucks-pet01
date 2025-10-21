// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // Імпортуйте ваші файли перекладів
// import buttonEN from '../locales/en/button.json';
// import homeEN from '../locales/en/home.json';
// import catalogEN from '../locales/en/catalog.json';
// import translationEN from '../locales/en/translation.json';
// import formBookingEN from '../locales/en/form_booking.json';
// import formReviewsEN from '../locales/en/form_reviews.json';
// import contentReviewsEN from '../locales/en/content_reviews.json';

// import buttonUK from '../locales/uk/button.json';
// import homeUK from '../locales/uk/home.json';
// import catalogUK from '../locales/uk/catalog.json';
// import translationUK from '../locales/uk/translation.json';
// import formBookingUK from '../locales/uk/form_booking.json';
// import formReviewsUK from '../locales/uk/form_reviews.json';
// import contentReviewsUK from '../locales/uk/content_reviews.json';
// import headerEN from '../locales/en/header.json'; // <--- ДОДАНО
// import headerUK from '../locales/uk/header.json'; // <--- ДОДАНО
// import footerEN from '../locales/en/footer.json'; // <--- ДОДАНО
// import footerUK from '../locales/uk/footer.json'; // <--- ДОДАНО
// import aboutModalEN from '../locales/en/about_modal.json'; // <--- ДОДАНО
// import aboutModalUK from '../locales/uk/about_modal.json'; // <--- ДОДАНО
// import servicesModalEN from '../locales/en/services_modal.json'; // <--- ДОДАНО
// import servicesModalUK from '../locales/uk/services_modal.json'; // <--- ДОДАНО
// import pricesModalEN from '../locales/en/prices_modal.json'; // <--- ДОДАНО
// import pricesModalUK from '../locales/uk/prices_modal.json'; // <--- ДОДАНО
// import contactsModalEN from '../locales/en/contacts_modal.json'; // <--- ДОДАНО
// import contactsModalUK from '../locales/uk/contacts_modal.json'; // <--- ДОДАНО
// import tabsEN from '../locales/en/tabs.json'; // <--- ДОДАНО
// import tabsUK from '../locales/uk/tabs.json'; // <--- ДОДАНО
// import vechicleDetailsEN from '../locales/en/vechicle_details.json'; // <--- ДОДАНО
// import vechicleDetailsUK from '../locales/uk/vechicle_details.json'; // <--- ДОДАНО
// import filterLocationEN from '../locales/en/filter_location.json'; // <--- ДОДАНО
// import filterLocationUK from '../locales/uk/filter_location.json'; // <--- ДОДАНО
// import filterVehicleTypeEN from '../locales/en/filter_vehicle_type.json'; // <--- ДОДАНО
// import filterVehicleTypeUK from '../locales/uk/filter_vehicle_type.json'; // <--- ДОДАНО
// import filterVehicleEquipmentEN from '../locales/en/filter_vehicle_equipment.json'; // <--- ДОДАНО
// import filterVehicleEquipmentUK from '../locales/uk/filter_vehicle_equipment.json'; // <--- ДОДАНО
// import thankYouBookingPageEN from '../locales/en/thank_you_booking_page.json'; // <--- ДОДАНО
// import thankYouBookingPageUK from '../locales/uk/thank_you_booking_page.json'; // <--- ДОДАНО
// import thankYouReviewsPageEN from '../locales/en/thank_you_reviews.page.json'; // <--- ДОДАНО
// import thankYouReviewsPageUK from '../locales/uk/thank_you_reviews_page.json'; // <--- ДОДАНО
// import starRatingEN from '../locales/en/star_rating.json'; // <--- ДОДАНО
// import starRatingUK from '../locales/uk/star_rating.json'; // <--- ДОДАНО
// import cardEN from '../locales/en/card.json'; // <--- ДОДАНО
// import cardUK from '../locales/uk/card.json'; // <--- ДОДАНО

// // Ресурси перекладів
// const resources = {
//   en: {
//     button: buttonEN,
//     home: homeEN,
//     catalog: catalogEN,
//     translation: translationEN,
//     form_booking: formBookingEN,
//     form_reviews: formReviewsEN,
//     content_reviews: contentReviewsEN,
//     header: headerEN,
//     footer: footerEN,
//     about_modal: aboutModalEN,
//     services_modal: servicesModalEN,
//     prices_modal: pricesModalEN,
//     contacts_modal: contactsModalEN,
//     tabs: tabsEN,
//     vechicle_details: vechicleDetailsEN,
//     filter_location: filterLocationEN,
//     filter_vehicle_type: filterVehicleTypeEN,
//     filter_vehicle_equipment: filterVehicleEquipmentEN,
//     thank_you_booking_page: thankYouBookingPageEN,
//     thank_you_reviews_page: thankYouReviewsPageEN,
//     star_rating: starRatingEN,
//     card: cardEN,
//   },
//   uk: {
//     button: buttonUK,
//     home: homeUK,
//     catalog: catalogUK,
//     translation: translationUK,
//     form_booking: formBookingUK,
//     form_reviews: formReviewsUK,
//     content_reviews: contentReviewsUK,
//     header: headerUK,
//     footer: footerUK,
//     about_modal: aboutModalUK,
//     services_modal: servicesModalUK,
//     prices_modal: pricesModalUK,
//     contacts_modal: contactsModalUK,
//     tabs: tabsUK,
//     vechicle_details: vechicleDetailsUK,
//     filter_location: filterLocationUK,
//     filter_vehicle_type: filterVehicleTypeUK,
//     filter_vehicle_equipment: filterVehicleEquipmentUK,
//     thank_you_booking_page: thankYouBookingPageUK,
//     thank_you_reviews_page: thankYouReviewsPageUK,
//     star_rating: starRatingUK,
//     card: cardUK,
//   },
// };

// i18n
//   .use(initReactI18next) // Передає i18n у react-i18next
//   .init({
//     resources,
//     lng: 'en', // Мова за замовчуванням
//     fallbackLng: 'en', // Мова, яка буде використана, якщо перекладу немає
//     interpolation: {
//       escapeValue: false, // Не екранувати HTML-символи
//     },
//     ns: [
//       'button',
//       'home',
//       'catalog',
//       'translation',
//       'form_booking',
//       'form_reviews',
//       'content_reviews',
//       'header',
//       'footer',
//       'about_modal',
//       'services_modal',
//       'prices_modal',
//       'contacts_modal',
//       'form_booking',
//       'tabs',
//       'vechicle_details',
//       'filter_location',
//       'filter_vehicle_type',
//       'filter_vehicle_equipment',
//       'thank_you_booking_page',
//       'thank_you_reviews_page',
//       'star_rating',
//       'card',
//     ],
//     defaultNS: 'home',
//   });
// // 🟢 ДОДАНО: синхронізація мови HTML для системних повідомлень
// document.documentElement.lang = i18n.language;
// i18n.on('languageChanged', lng => {
//   document.documentElement.lang = lng;
// });

// export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// --- Імпорт файлів перекладу --- //
import buttonEN from '../locales/en/button.json';
import homeEN from '../locales/en/home.json';
import catalogEN from '../locales/en/catalog.json';
import translationEN from '../locales/en/translation.json';
import formBookingEN from '../locales/en/form_booking.json';
import formReviewsEN from '../locales/en/form_reviews.json';
import contentReviewsEN from '../locales/en/content_reviews.json';
import headerEN from '../locales/en/header.json';
import footerEN from '../locales/en/footer.json';
import aboutModalEN from '../locales/en/about_modal.json';
import servicesModalEN from '../locales/en/services_modal.json';
import pricesModalEN from '../locales/en/prices_modal.json';
import contactsModalEN from '../locales/en/contacts_modal.json';
import tabsEN from '../locales/en/tabs.json';
import vechicleDetailsEN from '../locales/en/vechicle_details.json';
import filterLocationEN from '../locales/en/filter_location.json';
import filterVehicleTypeEN from '../locales/en/filter_vehicle_type.json';
import filterVehicleEquipmentEN from '../locales/en/filter_vehicle_equipment.json';
import thankYouBookingPageEN from '../locales/en/thank_you_booking_page.json';
import thankYouReviewsPageEN from '../locales/en/thank_you_reviews.page.json';
import starRatingEN from '../locales/en/star_rating.json';
import cardEN from '../locales/en/card.json';

import buttonUK from '../locales/uk/button.json';
import homeUK from '../locales/uk/home.json';
import catalogUK from '../locales/uk/catalog.json';
import translationUK from '../locales/uk/translation.json';
import formBookingUK from '../locales/uk/form_booking.json';
import formReviewsUK from '../locales/uk/form_reviews.json';
import contentReviewsUK from '../locales/uk/content_reviews.json';
import headerUK from '../locales/uk/header.json';
import footerUK from '../locales/uk/footer.json';
import aboutModalUK from '../locales/uk/about_modal.json';
import servicesModalUK from '../locales/uk/services_modal.json';
import pricesModalUK from '../locales/uk/prices_modal.json';
import contactsModalUK from '../locales/uk/contacts_modal.json';
import tabsUK from '../locales/uk/tabs.json';
import vechicleDetailsUK from '../locales/uk/vechicle_details.json';
import filterLocationUK from '../locales/uk/filter_location.json';
import filterVehicleTypeUK from '../locales/uk/filter_vehicle_type.json';
import filterVehicleEquipmentUK from '../locales/uk/filter_vehicle_equipment.json';
import thankYouBookingPageUK from '../locales/uk/thank_you_booking_page.json';
import thankYouReviewsPageUK from '../locales/uk/thank_you_reviews_page.json';
import starRatingUK from '../locales/uk/star_rating.json';
import cardUK from '../locales/uk/card.json';

// --- Ресурси перекладів --- //
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
    tabs: tabsEN,
    vechicle_details: vechicleDetailsEN,
    filter_location: filterLocationEN,
    filter_vehicle_type: filterVehicleTypeEN,
    filter_vehicle_equipment: filterVehicleEquipmentEN,
    thank_you_booking_page: thankYouBookingPageEN,
    thank_you_reviews_page: thankYouReviewsPageEN,
    star_rating: starRatingEN,
    card: cardEN,
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
    tabs: tabsUK,
    vechicle_details: vechicleDetailsUK,
    filter_location: filterLocationUK,
    filter_vehicle_type: filterVehicleTypeUK,
    filter_vehicle_equipment: filterVehicleEquipmentUK,
    thank_you_booking_page: thankYouBookingPageUK,
    thank_you_reviews_page: thankYouReviewsPageUK,
    star_rating: starRatingUK,
    card: cardUK,
  },
};

// --- Ініціалізація i18next --- //
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Поточна мова за замовчуванням
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false, // React вже екранує HTML
  },

  // 🟢 Додаємо всі namespace
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
    'tabs',
    'vechicle_details',
    'filter_location',
    'filter_vehicle_type',
    'filter_vehicle_equipment',
    'thank_you_booking_page',
    'thank_you_reviews_page',
    'star_rating',
    'card',
  ],

  // 🟡 Головний namespace, який буде fallback-ом
  defaultNS: 'home',
});

// 🟢 Автоматичне оновлення атрибуту lang у <html>
document.documentElement.lang = i18n.language;
i18n.on('languageChanged', lng => {
  document.documentElement.lang = lng;
});

export default i18n;
