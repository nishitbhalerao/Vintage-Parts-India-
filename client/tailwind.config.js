/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1A56DB',
          light: '#EFF6FF',
          sky: '#38BDF8'
        },
        background: {
          white: '#FFFFFF',
          offWhite: '#F8FAFC'
        },
        text: {
          navy: '#0F172A',
          muted: '#64748B'
        },
        border: {
          light: '#E2E8F0'
        },
        success: '#16A34A',
        warning: '#EA580C'
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
        'mono': ['Space Mono', 'monospace']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}