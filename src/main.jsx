import '././styles/global.css';
import './styles/variables.css';
import './styles/global.css';

import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
   
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
      
  </React.StrictMode>
);
