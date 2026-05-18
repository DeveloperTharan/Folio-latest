/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Instrument Serif", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Settled fintech green — mint/sage, not neon
        moss: {
          50: "#f3f7f4",
          100: "#e3ede5",
          200: "#c7dccd",
          300: "#9bc0a7",
          400: "#6a9f7b",
          500: "#4a8460",
          600: "#386a4b",
          700: "#2e553e",
          800: "#274432",
          900: "#1f3527",
          950: "#0f1d15",
        },
        ink: {
          50: "#f6f7f6",
          100: "#e3e6e3",
          200: "#c7cdc7",
          300: "#9aa39a",
          400: "#6c776c",
          500: "#525d52",
          600: "#404840",
          700: "#343a34",
          800: "#2b302b",
          900: "#1e221e",
          950: "#0f120f",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pulseSoft: { "0%,100%": { opacity: 0.4 }, "50%": { opacity: 0.8 } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
    },
  },
  plugins: [],
};
