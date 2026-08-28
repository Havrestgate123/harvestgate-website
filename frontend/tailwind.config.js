/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Anton', 'Oswald', 'Impact', 'sans-serif'],
        serifed: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        hg: {
          bg: 'rgb(var(--hg-bg) / <alpha-value>)',
          bg2: 'rgb(var(--hg-bg2) / <alpha-value>)',
          card: 'rgb(var(--hg-card) / <alpha-value>)',
          line: 'rgb(var(--hg-line) / <alpha-value>)',
          line2: 'rgb(var(--hg-line2) / <alpha-value>)',
          fg: 'rgb(var(--hg-fg) / <alpha-value>)',
          fg2: 'rgb(var(--hg-fg2) / <alpha-value>)',
          fg3: 'rgb(var(--hg-fg3) / <alpha-value>)',
          gold: 'rgb(var(--hg-gold) / <alpha-value>)',
          gold2: 'rgb(var(--hg-gold2) / <alpha-value>)',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        marqueeRev: { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 48s linear infinite',
        marqueeRev: 'marqueeRev 60s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
