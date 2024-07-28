/** @type {import('tailwindcss').Config} */
import {
  default as flattenColorPalette
} from "tailwindcss/lib/util/flattenColorPalette"; /** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust according to your project structure
    './public/index.html',
  ],
  darkMode:'class',
  theme: {
    extend: {
      screens:{
        'xs':"350px"
      },
      boxShadow:{
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      colors:{
        primary:"#105f42",
        secondary:"#48bb78"
      }
    },
  },
  variants: {
    extend: {
      transform: ['hover', 'focus'],
      scale: ['hover', 'focus'],
    },
  },
  plugins: [addVariablesForColors],
}

function addVariablesForColors({
  addBase,
  theme
}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}