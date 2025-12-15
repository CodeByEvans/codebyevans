// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path"; // Módulo path ya importado

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],

  // SOLUCIÓN: CONFIGURACIÓN DEL ALIAS @/
  resolve: {
    alias: {
      // Define que el alias '@' apunta al directorio './src'
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
