/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 3D Site Colors
        "3d-primary": "#6366f1",
        "3d-secondary": "#8b5cf6",
        "3d-accent": "#ec4899",
        "3d-dark": "#0f172a",
        "3d-light": "#f8fafc",
        "3d-neon": "#00ff9d",
        "3d-cyber": "#ff00ff",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        "slide-in-3d": {
          "0%": { transform: "translateZ(-100px) rotateX(20deg)", opacity: 0 },
          "100%": { transform: "translateZ(0) rotateX(0)", opacity: 1 },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            opacity: 1,
            filter: "drop-shadow(0 0 10px currentColor)",
          },
          "20%, 24%, 55%": {
            opacity: 0.8,
            filter: "drop-shadow(0 0 5px currentColor)",
          },
        },
        "hologram": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "matrix-rain": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-in-3d": "slide-in-3d 0.8s ease-out",
        "neon-flicker": "neon-flicker 1.5s infinite",
        "hologram": "hologram 3s ease infinite",
        "matrix-rain": "matrix-rain 20s linear infinite",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        "cyber": ["Orbitron", "monospace"],
        "futuristic": ["Rajdhani", "sans-serif"],
      },
      backgroundImage: {
        "gradient-3d": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
        "gradient-neon": "linear-gradient(90deg, #00ff9d 0%, #00ccff 50%, #ff00ff 100%)",
        "gradient-cyber": "linear-gradient(45deg, #ff00ff 0%, #00ffff 100%)",
        "grid-pattern": "linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
        "noise-texture": "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"0.1\"/%3E%3C/svg%3E')",
      },
      boxShadow: {
        "3d": "0 20px 60px -15px rgba(99, 102, 241, 0.4)",
        "3d-lg": "0 30px 90px -20px rgba(99, 102, 241, 0.5)",
        "neon": "0 0 20px rgba(0, 255, 157, 0.5), 0 0 40px rgba(0, 255, 157, 0.3)",
        "cyber": "0 0 30px rgba(255, 0, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.3)",
        "hologram": "0 0 50px rgba(139, 92, 246, 0.3), 0 0 100px rgba(236, 72, 153, 0.2)",
      },
      backdropBlur: {
        "3d": "20px",
      },
      perspective: {
        "1000": "1000px",
        "2000": "2000px",
      },
      transformStyle: {
        "3d": "preserve-3d",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}