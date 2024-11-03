import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: "#c36a2d",
        secondary: "#201f1d",
        background: "#4C4B48",
        "secondary-background": "#7e7e78",
        error: "#FF6F61",
        success: "#00fa3c",
        "text-secondary": "#a6a6a6"
      }
    }
  },

  plugins: []
} as Config;
