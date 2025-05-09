import './styles/global.css';
import './styles/variables.css';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import App from './components/App/App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
