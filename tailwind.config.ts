import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./public/**/*.html"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
      colors: {
        black: {
          DEFAULT: "#000000",
          50: '#1918251A',
          100: '#222222'
        },
        white: {
          DEFAULT: "#ffffff",
          50: "#EEEEEE",
          100: '#F8F8F8'
        },
        blue: {
          DEFAULT: "#3374EB",
        },
        gray: {
          DEFAULT: "#B1A9A9",
          50: '#717171',
          100: '#B1A9A9'
        },
        orange: {
          DEFAULT: "#FB8A05",
        },
        red: {
          DEFAULT: "#C43232",
        },
        green: {
          DEFAULT: "#11401C",
          50: '#9DC03E',
          100: '#B1D452',
          150: '#35583D',
          200: '#207C35',
          250: '#F2FFF6',
          300: '#92E3A9'
        },
      },
      fontFamily: {
        poppins: ["Poppins", ...fontFamily.sans], 
        circular: ["Circular Std", ...fontFamily.sans],
      },
      backgroundImage: {
        'text-gradient-green': 'linear-gradient(to right, #11401C, #1F7332, #859B5B)',
        'text-gradient-green-one': 'linear-gradient( #11401C, #1F7332, #9DC03E)',
      },
    },
  },
  plugins: [],
} satisfies Config;
