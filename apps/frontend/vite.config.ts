import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./src",
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, "src/login.html"),
        dashboard: resolve(__dirname, "src/dashboard.html"),
      },
    },
  },
});
