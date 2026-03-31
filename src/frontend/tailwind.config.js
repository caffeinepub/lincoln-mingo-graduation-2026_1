/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        gold: {
          DEFAULT: "oklch(68% 0.13 72)",
          light: "oklch(76% 0.12 78)",
          border: "oklch(63% 0.10 72)",
          dim: "oklch(55% 0.09 72)",
        },
        crimson: {
          DEFAULT: "oklch(42% 0.18 22)",
          light: "oklch(52% 0.18 22)",
        },
        navy: {
          DEFAULT: "oklch(18% 0.08 252)",
          50: "oklch(22% 0.08 252)",
          100: "oklch(20% 0.08 252)",
          200: "oklch(16% 0.07 252)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        script: ["Dancing Script", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        gold: "0 0 30px oklch(68% 0.13 72 / 0.08), inset 0 1px 0 oklch(68% 0.13 72 / 0.10)",
        "gold-lg": "0 0 60px oklch(68% 0.13 72 / 0.12), 0 20px 40px oklch(10% 0.01 252 / 0.6)",
      },
      backgroundImage: {
        "radial-vignette":
          "radial-gradient(ellipse at center, transparent 40%, oklch(8% 0.01 252 / 0.8) 100%)",
        "gold-shimmer":
          "linear-gradient(135deg, oklch(68% 0.13 72) 0%, oklch(76% 0.12 78) 50%, oklch(68% 0.13 72) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
