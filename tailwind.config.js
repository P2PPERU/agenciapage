/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores del tema poker
        'poker-gold': '#FFD700',
        'poker-black': '#0a0a0a',
        'poker-green': '#10B981',
        'poker-red': '#EF4444',
        'poker-blue': '#3B82F6',
        
        // Colores de WhatsApp
        'whatsapp': '#25D366',
        
        // Grises personalizados
        gray: {
          850: '#1f2937',
          950: '#0f172a',
        },
        
        // Colores adicionales para salas
        'x-poker': '#06B6D4',  // Cyan
        'pppoker': '#10B981',  // Emerald
        'suprema': '#F97316',  // Orange
        'wpt': {
          blue: '#1D4ED8',     // Blue
          red: '#DC2626',      // Red
        }
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        poker: ['Oswald', 'Impact', 'sans-serif'],
      },
      
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      backdropBlur: {
        xs: '2px',
      },
      
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-out': 'fadeOut 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700' 
          },
          '100%': { 
            boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700' 
          },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '25%': {
            'background-size': '400% 400%',
            'background-position': 'left top'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right top'
          },
          '75%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          }
        }
      },
      
      boxShadow: {
        'glow': '0 0 20px rgba(255, 215, 0, 0.5)',
        'glow-lg': '0 0 40px rgba(255, 215, 0, 0.5)',
        'whatsapp': '0 0 20px rgba(37, 211, 102, 0.3)',
        'poker': '0 10px 40px rgba(0, 0, 0, 0.8)',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'poker-pattern': "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23FFD700\" fill-opacity=\"0.05\"><text x=\"10\" y=\"30\" font-family=\"serif\" font-size=\"30\">♠</text><text x=\"10\" y=\"60\" font-family=\"serif\" font-size=\"30\">♥</text></g></g></svg>')",
        'cards-pattern': "url('data:image/svg+xml,<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23FFD700\" fill-opacity=\"0.03\"><circle cx=\"20\" cy=\"20\" r=\"3\"/></g></g></svg>')",
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      
      scale: {
        '102': '1.02',
        '103': '1.03',
      }
    },
  },
  plugins: [
    // Plugin personalizado para utilidades adicionales
    function({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        // Utilidades de text stroke
        '.text-stroke': {
          '-webkit-text-stroke': '1px currentColor',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke': '2px currentColor',
        },
        
        // Utilidades de glassmorphism
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        
        '.glass-dark': {
          'background': 'rgba(0, 0, 0, 0.3)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        
        // Utilidades de clip path
        '.clip-poker': {
          'clip-path': 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
        },
        
        // Utilidades de writing mode
        '.writing-vertical': {
          'writing-mode': 'vertical-rl',
          'text-orientation': 'mixed',
        },
        
        // Utilidades para ocultar scrollbar
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        
        // Utilidades de aspect ratio customizadas
        '.aspect-card': {
          'aspect-ratio': '3/4',
        },
        '.aspect-poker': {
          'aspect-ratio': '16/10',
        },
      }
      
      const newComponents = {
        // Componente de botón primary
        '.btn-primary': {
          'background': 'linear-gradient(to right, #FFD700, #FFA500)',
          'color': '#000000',
          'font-weight': '700',
          'padding': '0.75rem 2rem',
          'border-radius': '9999px',
          'transition': 'all 0.3s ease',
          'box-shadow': '0 4px 15px rgba(255, 215, 0, 0.3)',
          '&:hover': {
            'transform': 'translateY(-2px)',
            'box-shadow': '0 8px 25px rgba(255, 215, 0, 0.4)',
          },
        },
        
        // Componente de card
        '.card-poker': {
          'background': 'linear-gradient(145deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8))',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 215, 0, 0.2)',
          'border-radius': '1rem',
          'padding': '1.5rem',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'border-color': 'rgba(255, 215, 0, 0.5)',
            'transform': 'translateY(-4px)',
            'box-shadow': '0 20px 40px rgba(0, 0, 0, 0.3)',
          },
        },
        
        // Componente de texto neon
        '.text-neon': {
          'color': '#FFD700',
          'text-shadow': `
            0 0 5px #FFD700,
            0 0 10px #FFD700,
            0 0 15px #FFD700,
            0 0 20px #FFA500
          `,
        },
      }
      
      addUtilities(newUtilities)
      addComponents(newComponents)
    },
    
    // Plugin de line-clamp si no está incluido
    function({ addUtilities }) {
      addUtilities({
        '.line-clamp-1': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
      })
    },
  ],
}