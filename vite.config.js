import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue'; // Import the official Vue plugin
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // Add vue() to the plugins array alongside tailwindcss()
  plugins: [
    tailwindcss(),
    vue()
  ],         
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        // Only add new pages here when you actually decide to create them!
      },
    },
  },
});