/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Chemin des fichiers où tu utilises Tailwind
    "./dist/**/*.html", // Inclure les fichiers HTML générés
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
