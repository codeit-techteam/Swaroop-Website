import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        // Shared with the Customer / Seller / Admin web apps.
        brand: {
          DEFAULT: "#00338D",
          50: "#E8EEF8",
          100: "#D1DDF1",
          200: "#A3BBE3",
          300: "#7599D5",
          400: "#4777C7",
          500: "#1E55B0",
          600: "#00338D",
          700: "#002A75",
          800: "#00205C",
          900: "#001644",
          950: "#000C2B",
        },
        accent: {
          DEFAULT: "#FFB800",
          50: "#E8F1FF",
          100: "#D1E3FF",
          200: "#A3C7FF",
          300: "#75ABFF",
          400: "#478FFF",
          500: "#1E6FFF",
          600: "#1558CC",
          700: "#104299",
        },
        ink: {
          DEFAULT: "#0E1726",
          muted: "#4A5568",
          subtle: "#6B7688",
        },
        paper: "#F6F7F9",
        mist: "#EEF1F5",
        line: "#E1E5EB",
        signal: "#E8A33D",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.6rem, 6.2vw, 5.4rem)",
          { lineHeight: "1.02", letterSpacing: "-0.035em" },
        ],
        "display-lg": [
          "clamp(2.1rem, 4.4vw, 3.9rem)",
          { lineHeight: "1.06", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "clamp(1.7rem, 3vw, 2.6rem)",
          { lineHeight: "1.12", letterSpacing: "-0.025em" },
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgb(11 46 89 / 0.04), 0 8px 24px -12px rgb(11 46 89 / 0.12)",
        lift: "0 2px 4px rgb(11 46 89 / 0.05), 0 24px 48px -20px rgb(11 46 89 / 0.28)",
        ring: "0 0 0 1px rgb(11 46 89 / 0.08)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
        "3xl": "28px",
      },
      keyframes: {
        "flow-dash": {
          to: { strokeDashoffset: "-24" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "flow-dash": "flow-dash 1.6s linear infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
