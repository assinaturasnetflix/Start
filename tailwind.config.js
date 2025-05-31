module.exports = {
  content: [
    "./index.html",
    "./app.js", // Importante para Tailwind escanear as classes no seu JS
  ],
  theme: {
    extend: {
      colors: {
        'eden-green': {
          light: '#A7D7C5',     // Verde claro pastel
          DEFAULT: '#5C946E',   // Verde principal equilibrado
          dark: '#3A5A40',      // Verde escuro para texto/contraste
          extralight: '#E0F2E9' // Um verde ainda mais claro para fundos sutis
        },
        'eden-white': '#FFFFFF',        // Branco puro
        'eden-off-white': '#F4F4F4',    // Um branco levemente acinzentado
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'], // Para títulos, se desejado
      },
      spacing: { // Adicionando alguns espaçamentos comuns para consistência
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'subtle-pulse': 'subtlePulse 2s infinite ease-in-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}