// src/App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaHome, FaNewspaper, FaCalculator, FaTrophy, FaPhone, FaMoneyBillWave, FaStar } from 'react-icons/fa'

// Páginas
import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'
import WPTPage from './pages/WPTPage'

// Componentes
import WhatsAppButton from './components/ui/WhatsAppButton'
import FloatingAd from './components/ui/FloatingAd'
import RotatingBanner from './components/ui/RotatingBanner'
import UrgencyBanner from './components/ui/UrgencyBanner'
import Footer from './components/layout/Footer'

// ------------------ NAVIGATION ------------------
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // ------------------ NAV ITEMS ------------------
  const navItems = [
    { path: '/', label: 'Inicio', icon: FaHome },
    { path: '/#salas', label: 'Salas', icon: FaTrophy, isHash: true },
    { path: '/wpt', label: 'WPT GLOBAL', icon: FaTrophy, highlight: true }, // 🔥 NUEVO
    { path: '/#pagos', label: 'Pagos', icon: FaMoneyBillWave, isHash: true },
    { path: '/#testimonios', label: 'Testimonios', icon: FaStar, isHash: true },
    { path: '/#calculator', label: 'Calculadora', icon: FaCalculator, isHash: true },
    { path: '/noticias', label: 'Noticias', icon: FaNewspaper },
    { path: '/#contacto', label: 'Contacto', icon: FaPhone, isHash: true }
  ]
  
  // ------------------ HANDLE NAV ------------------
  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false)

    if (item.isHash) {
      const [path, hash] = item.path.split('#')
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            const offset = 120
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
          }
        }, 300)
      } else {
        const element = document.getElementById(hash)
        if (element) {
          const offset = 120
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      }
    } else if (item.path === '/') {
      navigate('/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate(item.path)
    }
  }
  
  return (
    <>
      <nav className={`fixed top-12 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl py-3' 
          : 'bg-gradient-to-b from-black/80 to-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-poker-gold to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-black text-2xl font-bold">♠</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white flex items-center">
                  <span className="hidden sm:inline text-poker-gold/50 mr-1">♠</span>
                  POKER 
                  <span className="text-poker-gold group-hover:text-yellow-400 transition-colors ml-1">PRO TRACK</span>
                  <span className="hidden sm:inline text-poker-gold/50 ml-1">♣</span>
                </span>
                <span className="text-xs text-gray-400 hidden sm:block">
                  ♥ Tu Agente #1 de Poker Online ♦
                </span>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item)}
                  className={`text-gray-300 hover:text-poker-gold transition-colors flex items-center gap-1 font-medium text-sm xl:text-base
                    ${location.pathname === item.path.split('#')[0] || (item.path === '/wpt' && location.pathname.startsWith('/wpt')) ? 'text-poker-gold' : ''}
                    ${item.highlight ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white px-3 py-1 rounded-full' : ''}`}
                >
                  <item.icon className="text-xs xl:text-sm" />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.label.substring(0, 3)}</span>
                  {item.highlight && <span className="ml-1 text-xs">🔥</span>}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white text-2xl z-50 relative"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <FaTimes />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <FaBars />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-80 bg-gray-900 z-40 lg:hidden shadow-2xl overflow-y-auto"
          >
            <div className="flex flex-col items-center space-y-5 p-8 pt-20">
              {navItems.map(item => (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-xl text-white hover:text-poker-gold transition-colors flex items-center gap-3 w-full justify-center
                    ${item.highlight ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white px-4 py-2 rounded-full' : ''}`}
                >
                  <item.icon className="text-lg" />
                  {item.label}
                  {item.highlight && <span className="ml-1">🔥</span>}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ------------------ APP ------------------
function App() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])
  
  if (isLoading) return <Loading />
  
  return (
    <Router>
      <div className="min-h-screen bg-poker-black text-white">
        <UrgencyBanner />
        <RotatingBanner />
        <Navigation />
        <WhatsAppButton />
        <FloatingAd />
        
        <main className="pt-28">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Rutas de WPT con secciones */}
            <Route path="/wpt" element={<WPTPage />} />
            <Route path="/wpt/:section" element={<WPTPage />} />
            
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  )
}

// ------------------ LOADING ------------------
const Loading = () => (
  <div className="min-h-screen bg-poker-black flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-poker-gold border-t-transparent rounded-full"
    />
  </div>
)

// ------------------ NOT FOUND ------------------
const NotFound = () => (
  <div className="min-h-screen bg-poker-black flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-poker-gold mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">Página no encontrada</p>
      <Link to="/" className="bg-poker-gold text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-500 transition">
        Volver al Inicio
      </Link>
    </div>
  </div>
)

// ------------------ COOKIE BANNER ------------------
const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => setShowBanner(true), 3000)
    }
  }, [])
  
  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setShowBanner(false)
  }
  
  if (!showBanner) return null
  return (
    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-30">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-300 mb-3 md:mb-0">🍪 Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra política.</p>
        <button onClick={acceptCookies} className="bg-poker-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
          Aceptar
        </button>
      </div>
    </motion.div>
  )
}

export default App