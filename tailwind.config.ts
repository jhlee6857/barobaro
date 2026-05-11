import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          dark: "#0a0f1c", // 아주 깊은 네이비 (프리미엄 느낌)
          primary: "#1e3a8a", // 묵직한 메인 블루 (Blue 900)
          secondary: "#2563eb", // 포인트 블루 (Blue 600)
          accent: "#fcd34d", // 강조용 옐로우 (Yellow 300)
          light: "#f8fafc", // 깨끗한 배경 (Slate 50)
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
