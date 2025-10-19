// import 'overlayscrollbars/overlayscrollbars.css';
// import './styles/global.css';
// import './styles/variables.css';
// import React, { Suspense } from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import store from './redux/store.js';
// import App from './components/App/App.jsx';
// import './config/i18n.js';

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Suspense fallback={<div>Loading...</div>}>
//         <App />
//       </Suspense>
//     </Provider>
//   </React.StrictMode>
// );
import 'overlayscrollbars/overlayscrollbars.css';
import './styles/global.css';
import './styles/variables.css';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// ✅ ДОДАЄМО: Імпорт I18nextProvider
import { I18nextProvider } from 'react-i18next';

import store from './redux/store.js';
import App from './components/App/App.jsx';
// ✅ ДОДАЄМО: Імпорт екземпляра i18n
import i18n from './config/i18n.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* ✅ КРИТИЧНЕ ВИПРАВЛЕННЯ: Обгортаємо додаток в I18nextProvider */}
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);

// Примітка: оригінальний імпорт './config/i18n.js' був викликом,
// щоб ініціалізувати i18n глобально. Тепер ми імпортуємо екземпляр
// i18n та передаємо його явно, що є кращою практикою.
// Я замінив старий імпорт на: import i18n from './config/i18n.js';
