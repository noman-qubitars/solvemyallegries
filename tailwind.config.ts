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
          50: '#1918251A'
        },
        white: {
          DEFAULT: "#ffffff",
          50: "#EEEEEE",
          100: ''
        },
        blue: {
          DEFAULT: "#3374EB",
        },
        gray: {
          DEFAULT: "#B1A9A9",
          50: '#717171'
        },
        orange: {
          DEFAULT: "#FB8A05",
        },
        red: {
          DEFAULT: "#C43232",
        },
        green: {
          DEFAULT: "#11401C",
          50: ''
        },
      },
      fontFamily: {
        poppins: ["Poppins", ...fontFamily.sans], 
        circular: ["Circular Std", ...fontFamily.sans],
      },
      backgroundImage: {
        'three-color-gradient': 'linear-gradient(to right, #11401C, #1F7332, #859B5B)',
      },
    },
  },
  plugins: [],
} satisfies Config;
