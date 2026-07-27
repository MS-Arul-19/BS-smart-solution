/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0D2F63',
          secondary: '#F68B00',
          dark: '#081F44',
          light: '#F7F8FB',
          border: '#E8ECF2',
          text: '#1F2937',
          muted: '#667085',
          hover: '#E07D00',
          darkHover: '#061733',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        'xl': '16px',
        'lg': '12px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(13, 47, 99, 0.05)',
        'glass': '0 8px 32px 0 rgba(13, 47, 99, 0.08)',
        'hover': '0 12px 28px -4px rgba(13, 47, 99, 0.12)',
        'orange-glow': '0 8px 24px -4px rgba(246, 139, 0, 0.3)',
      },
      backdropBlur: {
        'glass': '18px',
      }
    },
  },
  plugins: [],
}
