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
          dark: "#0F172A", // 딥블루 (Slate-900)
          primary: "#1E3A8A", // 메인 블루 (Blue-900)
          secondary: "#3B82F6", // 포인트 블루 (Blue-500)
          light: "#EFF6FF", // 라이트 블루 (Blue-50)
          accent: "#2563EB", // 하이라이트
        },
      },
    },
  },
  plugins: [],
};

export default config;
