/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "point-green-light": "#89BA16",
        "point-green-dark": "#008374",
      },
      textColor: {
        "point-green-light": "#89BA16",
        "point-green-dark": "#008374",
      },
      borderColor: {
        "point-green-light": "#89BA16",
        "point-green-dark": "#008374",
      },
      fontFamily: {
        serif: ["serif"],
      },
      width: {
        150: "150px",
      },
      borderColor: {
        "border-t": "1px solid #9E9E9E",
      },
    },
  },
  plugins: [],
};
