/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F9F6F0",
        creamDark: "#EBE6DC",
        paleGreen: "#E3E8E3",
        darkGreen: "#2A3B32",
        dark: "#1A1A1A",
        terracotta: "#C8755D",
        terracottaLight: "#E8A98F",
        amber: "#D4A853",
        amberLight: "#E8C97A",
        warmGray: "#8B7E74",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        ambule: ['"Ambule"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
