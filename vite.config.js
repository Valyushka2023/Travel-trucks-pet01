// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/campers': {
//         target: 'http://localhost:5001',
//         changeOrigin: true
//       }
//     }
//   }
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/bookings': {
        // Проксуємо шлях для бронювань
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/campers': {
        // Проксуємо шлях для кемперів (якщо він використовується для інших запитів)
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      // Можливо, інші проксі
    },
  },
});
