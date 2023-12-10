/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#191919",
        secondary: "#ffffff",
        tertiary: "#0D21A1",
        quaternary: "#FCF7F8",
        error: "#A52422",
        success: "#447604", 
      },
      fontSize: {
        xxl: "90px",
        xl: "60px",
        lg: "36px",
        base: "30px",
        md: "24px",
        sm: "22px",
        xs: "18px",
        xxs: "16px",
        xxxs: "14px",
      },
      lineHeight: {
        "3xl": "100px",
        xxl: "90px",
        xl: "70px",
        lg: "42px",
        base: "38px",
        md: "34px",
        sm: "32px",
        xs: "24px",
        xxs: "22px",
      },
      fontWeight: {
        bold: "700",
        medium: "600",
        regular: "400",
        light: "300",
      },
      fontFamily: {
        primary: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
