import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3A",
        gold: "#C6A15B"
      }
    }
  },
  plugins: []
} satisfies Config;

