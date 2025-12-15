// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path"; // <-- 1. Importar el módulo path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    // <-- 2. Agregar la configuración de 'resolve'
    alias: {
      // Define el alias @/ para que apunte a la carpeta src
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
