/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Electric Indigo — confident, modern, tech-forward
        primary: {
          50:  '#eef0ff',
          100: '#dde2ff',
          200: '#c2c9ff',
          300: '#9ca5ff',
          400: '#7577ff',
          500: '#6366f1',  // Main indigo
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Secondary: Rose-Pink — adds energy & premium feel
        secondary: {
          50:  '#fff1f3',
          100: '#ffe4e8',
          200: '#ffccd5',
          300: '#ffa3b5',
          400: '#ff708d',
          500: '#f43f5e',  // Rose
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // Accent: Amber Gold — CTAs, highlights, premium touch
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Surface: Deep dark charcoal — the backbone
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#080e1a',
        },
      },
      backgroundImage: {
        'gradient-primary':   'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
        'gradient-accent':    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-vibrant':   'linear-gradient(135deg, #6366f1 0%, #f43f5e 50%, #f59e0b 100%)',
        'gradient-hero':      'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        'glass-gradient':     'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-indigo': '0 0 40px rgba(99, 102, 241, 0.3)',
        'glow-rose':   '0 0 40px rgba(244, 63, 94, 0.3)',
        'glow-amber':  '0 0 40px rgba(245, 158, 11, 0.25)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 8px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
