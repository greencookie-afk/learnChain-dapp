import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
      babel: {
        plugins: [],
        presets: [],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
});
