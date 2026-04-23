/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sikas: {
          primary: "#0f766e",        // Teal 700
          "primary-light": "#14b8a6", // Teal 500
          secondary: "#1e293b",      // Slate 800
          accent: "#f59e0b",         // Amber 500
          success: "#22c55e",        // Green 500
          danger: "#ef4444",         // Red 500
          surface: "#f8fafc",        // Slate 50
          dark: "#0f172a",           // Slate 900
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        premium: "0 4px 24px rgba(0,0,0,0.06)",
        glow: "0 0 30px rgba(15, 118, 110, 0.3)",
      }
    },
  },
  plugins: [],
}
