import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-eb-garamond)", "EB Garamond Fallback", "serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#4f46e5",
          accent: "#22d3ee",
          dark: "#1e1b4b"
        },
        surface: {
          DEFAULT: "#0f172a",
          soft: "#1e293b",
          lighter: "#f8fafc"
        }
      },
      boxShadow: {
        glow: "0 0 25px rgba(79, 70, 229, 0.35)"
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
