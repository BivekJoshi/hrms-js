import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
<<<<<<< HEAD
export default defineConfig({
  plugins: [react()],
  base: "",
  server: {
    cors: true,
    // port: 8080,
=======

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    cors: true,
>>>>>>> 5b8b93d4b0713a1ba54a953dac502bf078bb5827
  },
});

 
