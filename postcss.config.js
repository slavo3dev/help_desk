/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable indent */
/* eslint-disable no-undef */
// postcss.config.js
const { join } = require("path");

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, "tailwind.config.js"),
    },
    autoprefixer: {},
  },
};
