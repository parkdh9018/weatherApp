import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { env } from "process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        return html.replace(
          "%VITE_KAKAO_APP_KEY%",
          env.VITE_KAKAO_APP_KEY || ""
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
