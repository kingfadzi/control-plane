/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom utility class: auto-fill-grid
        'auto-fill-grid': 'repeat(auto-fill, minmax(320px, 1fr))',
      },
    },
  },
  plugins: [],
}
