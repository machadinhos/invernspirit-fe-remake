import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: "#c36a2d",
        secondary: "#201f1d",
        background: "#4C4B48",
        error: "#B71C1CFF",
      },
    },
  },

  plugins: [],
} as Config;
