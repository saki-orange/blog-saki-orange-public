/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontWeight: {
      bold: 600,
    },
    screens: {
      sm: "500px",
      md: "768px",
      lg: "1024px",
      // xl: "1024px",
      xl: "1080px",
    },
    extend: {
      // fontFamily: {
      //   sans: ["var(--font-notojp)", "sans-serif"],
      // },
      // fontFamily: {
      //   sans: ["Noto Sans JP", "sans-serif"],
      // },
      colors: {
        cBlack: "#333333",
        cOrange: "orange",
        cGray: "#757575",
        bgGray: "#f4f4f4",
        sGray: "gainsboro",
        // cYellow: "#ffd602",
        bgCodeGray: "#f6f6f6",
      },
      fontSize: {
        base: "15px",
        sm: "12px",
        md: "15px",
        lr: "17px",
        lg: "22px",
        xl: "25px",
      },
      lineHeight: {
        base: "1.2",
        lg: "2",
      },
      typography: {
        DEFAULT: {
          css: {
            table: {
              width: "auto",
            },
            h2: {
              fontWeight: 600,
              borderBottom: "1px solid var(--tw-prose-hr)",
              paddingBottom: "8px",
            },
            // h3: {
            //   fontSize: "17px",
            // },
            pre: null,
            code: null,
            "code::before": null,
            "code::after": null,
            "pre code": null,
            "pre code::before": null,
            "pre code::after": null,
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
