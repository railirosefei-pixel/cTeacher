import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/cTeacher/",
  plugins: [tailwindcss(), vue()],
  server: {
    host: "127.0.0.1",
    port: 5127,
    strictPort: false,
  },
  preview: {
    host: "127.0.0.1",
    port: 5127,
    strictPort: true,
  },
});
