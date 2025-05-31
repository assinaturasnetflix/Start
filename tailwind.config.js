// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./main.js",
  ],
  theme: {
    extend: {
      colors: {
        'eden-green': {
          lightest: '#E6FFFA', // Muito claro para fundos sutis
          extralight: '#D1FAE5',
          light: '#6EE7B7',
          DEFAULT: '#10B981',   // Verde principal
          medium: '#059669',   // Um tom entre DEFAULT e dark
          dark: '#047857',
          darker: '#065F46',  // Mais escuro para textos principais
          darkest: '#064E3B', // Quase preto-verde
          semitransparent: 'rgba(16, 185, 129, 0.1)',
          transparentdark: 'rgba(4, 120, 87, 0.1)',
        },
        'eden-white': '#FFFFFF',
        'eden-off-white': '#F9FAFB', // Um branco levemente acinzentado
        'eden-gray': {
          lightest: '#F9FAFB',
          extralight: '#F3F4F6',
          light: '#E5E7EB',
          DEFAULT: '#D1D5DB',
          medium: '#9CA3AF',
          dark: '#6B7280',
          darker: '#4B5563',
          darkest: '#374151',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif'],
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
      },
      backgroundImage: {
        'hero-subtle-dots': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236EE7B7' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
        'section-fade-white': 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        'section-fade-green': 'linear-gradient(to bottom, rgba(209,250,229,1) 0%, rgba(209,250,229,0) 100%)', // eden-green-extralight
        'card-hover-glow': 'radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, transparent 70%)'
      },
      boxShadow: {
        'eden-xs': '0 2px 4px 0 rgba(16, 185, 129, 0.05)',
        'eden-sm': '0 4px 8px 0 rgba(16, 185, 129, 0.07)',
        'eden-md': '0 6px 12px 0 rgba(16, 185, 129, 0.1)',
        'eden-lg': '0 10px 20px 0 rgba(16, 185, 129, 0.12)',
        'eden-xl': '0 20px 30px -10px rgba(16, 185, 129, 0.15)',
        'eden-2xl': '0 25px 50px -12px rgba(16, 185, 129, 0.25)',
        'eden-inner-sm': 'inset 0 1px 2px 0 rgba(0,0,0,0.04)',
        'eden-inner-md': 'inset 0 2px 4px 0 rgba(0,0,0,0.05)',
        'eden-outline-green': '0 0 0 3px rgba(16, 185, 129, 0.5)',
      },
      ringWidth: {
        '3': '3px',
      },
      ringColor: theme => ({
        ...theme('colors'),
        'eden-green-focus': theme('colors.eden-green.light'),
      }),
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'subtle-bob': 'subtleBob 3.5s ease-in-out infinite',
        'pulse-light': 'pulseLight 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 15s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        fadeInUp: { '0%': { opacity: 0, transform: 'translateY(25px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeInDown: { '0%': { opacity: 0, transform: 'translateY(-25px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        slideInLeft: { '0%': { transform: 'translateX(-50px)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } },
        slideInRight: { '0%': { transform: 'translateX(50px)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } },
        subtleBob: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseLight: { '0%, 100%': { opacity: 0.7 }, '50%': { opacity: 1 } },
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } }, // Para texto em marquee
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // Descomente se precisar de estilos de formulário aprimorados
    // require('@tailwindcss/typography'), // Descomente se precisar de estilos de tipografia para conteúdo de blog/markdown
  ],
}