import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBars, FaTimes, FaHome, FaNewspaper, FaCalculator, FaTrophy, 
  FaPhone, FaDice, FaCoins, FaWhatsapp, FaStar, FaFire, FaGift, 
  FaUserFriends, FaClock, FaArrowRight, FaCheckCircle, FaQuoteLeft, 
  FaHeadphones, FaMoneyBillWave, FaChartLine, FaUsers, FaShieldAlt, 
  FaBolt, FaEye, FaCalendar, FaUser, FaSearch, FaShare, FaTelegram,
  FaTwitter, FaFacebook, FaFilter, FaTags, FaBitcoin, FaUniversity,
  FaTicketAlt, FaGamepad, FaCrown, FaDollarSign
} from 'react-icons/fa'

// Selector de Nivel de Experiencia
const ExperienceSelector = ({ onSelect, onSkip }) => {
  const [isClosing, setIsClosing] = useState(false)
  
  const levels = [
    { 
      id: 'beginner', 
      title: 'Principiante', 
      icon: '🎯',
      description: 'Nuevo en el poker online',
      recommended: ['PPPOKER', 'CLUBGG']
    },
    { 
      id: 'intermediate', 
      title: 'Intermedio', 
      icon: '⚡',
      description: 'Ya tengo experiencia',
      recommended: ['X-POKER', 'SUPREMA']
    },
    { 
      id: 'advanced', 
      title: 'Avanzado', 
      icon: '🏆',
      description: 'Jugador profesional',
      recommended: ['WPT', 'GGPOKER']
    }
  ]
  
  const handleSkip = () => {
    setIsClosing(true)
    setTimeout(() => onSkip(), 300)
  }
  
  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-4xl w-full shadow-2xl"
          >
            {/* Header con botón cerrar */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  ¿Cuál es tu nivel de experiencia?
                </h2>
                <p className="text-gray-400">
                  Te recomendaremos las mejores salas para ti
                </p>
              </div>
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            {/* Opciones de nivel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {levels.map((level) => (
                <motion.button
                  key={level.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(level.id)}
                  className="bg-gray-800 hover:bg-gray-700 border-2 border-transparent hover:border-poker-gold rounded-xl p-6 text-center transition-all"
                >
                  <div className="text-5xl mb-3">{level.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{level.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{level.description}</p>
                  <div className="text-xs text-poker-gold">
                    Recomendado: {level.recommended.join(', ')}
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Botón de saltar */}
            <div className="text-center">
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-poker-gold transition-colors underline"
              >
                Ver todas las salas sin recomendación →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente de Sala Card
const SalaCard = ({ sala, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const whatsappNumber = "51955311839"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(sala.whatsappMessage)}`
  
  const isFeatured = sala.featured || index === 0
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl overflow-hidden shadow-2xl ${
        isFeatured ? 'ring-2 ring-poker-gold' : ''
      }`}
    >
      {sala.special && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center"
          >
            <FaFire className="mr-1" />
            {sala.special}
          </motion.div>
        </div>
      )}
      
      <div className={`relative h-40 bg-gradient-to-br ${sala.color} p-6 flex flex-col justify-center items-center`}>
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="text-2xl text-white/20">
                {sala.gameType === 'omaha' ? '♥' : '♠'}
              </div>
            ))}
          </div>
        </div>
        
        <motion.h3 
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          className="text-3xl font-black text-white z-10 text-center"
        >
          {sala.name}
        </motion.h3>
        
        <div className="flex mt-2 z-10">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-sm" />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {/* Rakeback o Bonus principal */}
        <div className="bg-gradient-to-r from-poker-gold/20 to-yellow-500/20 border border-poker-gold/50 rounded-xl p-4 mb-4 text-center">
          {sala.rakeback ? (
            <>
              <p className="text-poker-gold font-bold text-2xl mb-1">{sala.rakeback}</p>
              <p className="text-gray-400 text-sm">RAKEBACK</p>
            </>
          ) : (
            <>
              <p className="text-poker-gold font-bold text-xl mb-1">{sala.mainBonus}</p>
              <p className="text-gray-400 text-sm">{sala.bonusType}</p>
            </>
          )}
        </div>
        
        {sala.bonus && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 flex items-center">
            <FaGift className="text-green-500 mr-2" />
            <span className="text-green-400 text-sm font-semibold">{sala.bonus}</span>
          </div>
        )}
        
        <ul className="space-y-3 mb-6">
          {sala.features.slice(0, 4).map((feature, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
              className="flex items-start"
            >
              <svg className="w-5 h-5 text-poker-green mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <FaGamepad className="text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Tipo</p>
            <p className="text-sm font-bold text-white">{sala.gameType}</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <FaDollarSign className="text-purple-500 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Depósito</p>
            <p className="text-sm font-bold text-white">{sala.minDeposit}</p>
          </div>
        </div>
        
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full bg-gradient-to-r from-whatsapp to-green-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <FaWhatsapp className="mr-2 text-xl relative z-10" />
          <span className="relative z-10">JUGAR AHORA</span>
        </motion.a>
        
        {sala.highlight && (
          <p className="text-center text-xs text-yellow-400 mt-3 font-bold">
            🔥 {sala.highlight}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// Sección de Métodos de Pago
const PaymentMethods = () => {
  const methods = [
    { name: 'YAPE', icon: '💜', color: 'from-purple-500 to-purple-700' },
    { name: 'PLIN', icon: '💚', color: 'from-green-500 to-green-700' },
    { name: 'Transferencias', icon: '🏦', color: 'from-blue-500 to-blue-700' },
    { name: 'Bitcoin', icon: '₿', color: 'from-orange-500 to-orange-700' },
    { name: 'USDT', icon: '💵', color: 'from-green-600 to-green-800' },
    { name: 'Ethereum', icon: 'Ξ', color: 'from-indigo-500 to-indigo-700' }
  ]
  
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            DEPÓSITOS Y RETIROS <span className="text-poker-gold">INSTANTÁNEOS</span>
          </h2>
          <p className="text-gray-400">
            Múltiples métodos de pago para tu comodidad
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {methods.map((method, idx) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className={`bg-gradient-to-br ${method.color} rounded-xl p-4 text-center shadow-xl`}
            >
              <div className="text-3xl mb-2">{method.icon}</div>
              <p className="text-white font-bold text-sm">{method.name}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400">
            ✅ Sin comisiones • ⚡ Procesamiento instantáneo • 🔒 100% Seguro
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Componente Principal
function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showExperienceSelector, setShowExperienceSelector] = useState(true)
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Datos actualizados de las salas
  const salas = [
    {
      id: 'pppoker',
      name: 'PPPOKER',
      rakeback: '40% - 65%',
      bonus: 'Bono depósito S/10',
      features: [
        'Mesas de Omaha siempre activas',
        'Torneos para todos los stakes',
        'La app más estable del mercado',
        'Múltiples clubes disponibles'
      ],
      whatsappMessage: 'Hola, quiero jugar en PPPOKER con hasta 65% de rakeback',
      color: 'from-green-500 to-green-700',
      minDeposit: 'S/10',
      featured: true,
      gameType: 'Omaha/Texas',
      level: ['beginner', 'intermediate'],
      special: 'HASTA 65% RB'
    },
    {
      id: 'xpoker',
      name: 'X-POKER',
      rakeback: '40% - 60%',
      bonus: 'Bad Beat Jackpot Gigante',
      features: [
        'Bad Beat Jackpot progresivo',
        'Mesas de Texas siempre activas',
        'Cobros en 24 horas garantizados',
        'Soporte VIP en español 24/7'
      ],
      whatsappMessage: 'Hola, quiero jugar en X-POKER con el Bad Beat Jackpot',
      color: 'from-cyan-500 to-cyan-700',
      minDeposit: 'S/20',
      featured: true,
      gameType: 'Texas',
      level: ['intermediate', 'advanced'],
      highlight: 'JACKPOT ACTUAL: $125,000'
    },
    {
      id: 'suprema',
      name: 'SUPREMA',
      rakeback: '40% - 60%',
      bonus: 'Mesas soft garantizadas',
      features: [
        'Mesas de Omaha 24/7',
        'Torneos en todos los horarios',
        'Las mesas más soft del mercado',
        'Cashout instantáneo'
      ],
      whatsappMessage: 'Hola, quiero jugar Omaha en SUPREMA POKER',
      color: 'from-orange-700 to-orange-900',
      minDeposit: 'S/50',
      featured: true,
      gameType: 'Omaha',
      level: ['intermediate', 'advanced']
    },
    {
      id: 'wpt',
      name: 'WPT POKER',
      mainBonus: '100% BONO',
      bonusType: 'EN TU DEPÓSITO',
      bonus: 'Tickets de torneos GRATIS',
      features: [
        'Plataforma mundialmente reconocida',
        'Las mejores mesas de Texas',
        'Tickets de torneos incluidos',
        'FREEROLL de $10,000 DIARIOS'
      ],
      whatsappMessage: 'Hola, quiero el bono 100% de WPT y el freeroll de $10K',
      color: 'from-blue-600 via-white to-red-600',
      minDeposit: 'S/100',
      featured: true,
      gameType: 'Texas',
      level: ['advanced'],
      special: 'FREEROLL $10K',
      highlight: 'FREEROLL $10,000 DIARIO PARA NUEVOS'
    },
    {
      id: 'clubgg',
      name: 'CLUBGG',
      rakeback: '35%',
      bonus: 'Torneos y cash 24/7',
      features: [
        'Mesas y torneos Texas 24/7',
        'Clubes privados exclusivos',
        'Sistema anti-bots avanzado',
        'Estadísticas en tiempo real'
      ],
      whatsappMessage: 'Hola, quiero unirme a CLUBGG',
      color: 'from-gray-600 to-gray-800',
      minDeposit: 'S/30',
      gameType: 'Texas',
      level: ['beginner', 'intermediate']
    },
    {
      id: 'ggpoker',
      name: 'GGPOKER',
      rakeback: 'Fish Buffet',
      bonus: 'La red más grande del mundo',
      features: [
        'Mayor tráfico mundial',
        'Smart HUD integrado',
        'All-in Insurance disponible',
        'Spin & Gold jackpots'
      ],
      whatsappMessage: 'Hola, quiero jugar en GGPOKER',
      color: 'from-black to-gray-800',
      minDeposit: 'S/30',
      gameType: 'Texas/Omaha',
      level: ['advanced']
    },
    {
      id: 'coinpoker',
      name: 'COINPOKER',
      rakeback: '33%',
      bonus: 'Crypto-friendly',
      features: [
        'Depósitos solo en crypto',
        'Rakeback pagado en CHP tokens',
        'Mesas anónimas disponibles',
        'Torneos con overlays'
      ],
      whatsappMessage: 'Hola, quiero información sobre COINPOKER',
      color: 'from-purple-600 to-purple-800',
      minDeposit: '$10 USDT',
      gameType: 'Texas',
      level: ['intermediate', 'advanced']
    }
  ]
  
  // Filtrar salas según experiencia y filtro
  const getFilteredSalas = () => {
    let filtered = salas
    
    // Filtrar por experiencia si está seleccionada
    if (selectedExperience) {
      filtered = filtered.filter(sala => 
        sala.level && sala.level.includes(selectedExperience)
      )
    }
    
    // Filtrar por categoría
    if (selectedFilter !== 'all') {
      switch(selectedFilter) {
        case 'featured':
          filtered = filtered.filter(s => s.featured)
          break
        case 'high-rb':
          filtered = filtered.filter(s => s.rakeback && parseInt(s.rakeback) >= 40)
          break
        case 'beginners':
          filtered = filtered.filter(s => s.level && s.level.includes('beginner'))
          break
        case 'omaha':
          filtered = filtered.filter(s => s.gameType && s.gameType.includes('Omaha'))
          break
        case 'texas':
          filtered = filtered.filter(s => s.gameType && s.gameType.includes('Texas'))
          break
      }
    }
    
    return filtered
  }
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navigateTo = (section) => {
    setIsMobileMenuOpen(false)
    
    if (section === 'home') {
      setCurrentPage('home')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (section === 'news') {
      setCurrentPage('news')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setCurrentPage('home')
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          const offset = 100
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }
  
  return (
    <div className="min-h-screen bg-poker-black text-white">
      {/* Selector de Experiencia */}
      {showExperienceSelector && (
        <ExperienceSelector
          onSelect={(level) => {
            setSelectedExperience(level)
            setShowExperienceSelector(false)
          }}
          onSkip={() => {
            setShowExperienceSelector(false)
          }}
        />
      )}
      
      {/* Header de Navegación */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl py-3' 
          : 'bg-gradient-to-b from-black/80 to-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center space-x-2 group"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-poker-gold to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-black text-2xl font-bold">♠</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  POKER <span className="text-poker-gold">AGENCY</span>
                </span>
              </div>
            </button>
            
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => navigateTo('home')} className="text-gray-300 hover:text-poker-gold transition-colors">
                Inicio
              </button>
              <button onClick={() => navigateTo('salas')} className="text-gray-300 hover:text-poker-gold transition-colors">
                Salas
              </button>
              <button onClick={() => navigateTo('calculator')} className="text-gray-300 hover:text-poker-gold transition-colors">
                Calculadora
              </button>
              <button onClick={() => navigateTo('payments')} className="text-gray-300 hover:text-poker-gold transition-colors">
                Pagos
              </button>
              <button onClick={() => navigateTo('contacto')} className="text-gray-300 hover:text-poker-gold transition-colors">
                Contacto
              </button>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/51955311839"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-poker-gold to-yellow-500 text-black font-bold px-6 py-2 rounded-full"
              >
                JUGAR AHORA
              </motion.a>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white text-2xl"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Contenido Principal */}
      <main className="pt-20">
        {currentPage === 'home' ? (
          <>
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-poker-black via-gray-900 to-poker-black"></div>
              <div className="relative z-10 container mx-auto px-4 py-20 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Badge FREEROLL */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/50 rounded-full px-6 py-2 mb-8"
                  >
                    <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <span className="text-red-400 font-semibold">
                      🎯 FREEROLL $10,000 DIARIOS EN WPT
                    </span>
                  </motion.div>
                  
                  <h1 className="text-5xl md:text-7xl font-black mb-6">
                    <span className="block text-white mb-2">TU AGENTE DE</span>
                    <span className="block bg-gradient-to-r from-poker-gold via-yellow-400 to-poker-gold bg-clip-text text-transparent">
                      POKER ONLINE #1
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
                    Rakeback hasta <span className="text-poker-gold font-bold">65%</span> • 
                    Pagos con <span className="text-purple-400 font-bold">YAPE</span> y <span className="text-green-400 font-bold">PLIN</span> • 
                    Depósitos desde <span className="text-poker-gold font-bold">S/10</span>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <motion.button
                      onClick={() => navigateTo('salas')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 font-bold text-black bg-gradient-to-r from-poker-gold to-yellow-500 rounded-full"
                    >
                      VER TODAS LAS SALAS
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setShowExperienceSelector(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 font-bold text-white bg-gray-900 border-2 border-gray-700 rounded-full hover:border-poker-gold"
                    >
                      OBTENER RECOMENDACIÓN
                    </motion.button>
                  </div>
                  
                  {/* Métodos de pago rápidos */}
                  <div className="flex justify-center gap-4 mt-8">
                    <span className="text-purple-400 font-bold">YAPE</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-green-400 font-bold">PLIN</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-blue-400 font-bold">TRANSFERENCIAS</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-orange-400 font-bold">BITCOIN</span>
                  </div>
                  
                  {selectedExperience && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-8 inline-flex items-center bg-green-500/20 border border-green-500 rounded-full px-6 py-2"
                    >
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-green-400">
                        Mostrando salas para {
                          selectedExperience === 'beginner' ? 'Principiantes' :
                          selectedExperience === 'intermediate' ? 'Intermedios' : 'Avanzados'
                        }
                      </span>
                      <button
                        onClick={() => setSelectedExperience(null)}
                        className="ml-3 text-gray-400 hover:text-white"
                      >
                        <FaTimes />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </section>
            
            {/* Sección de Salas */}
            <section id="salas" className="py-20 bg-gradient-to-b from-poker-black to-gray-900">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    ELIGE TU <span className="text-poker-gold">SALA PERFECTA</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-8">
                    Todas con pagos garantizados • Depósitos con YAPE y PLIN
                  </p>
                  
                  {/* Filtros mejorados */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { id: 'all', label: 'Todas', icon: FaStar },
                      { id: 'featured', label: 'Destacadas', icon: FaFire },
                      { id: 'high-rb', label: 'Mayor RB', icon: FaChartLine },
                      { id: 'omaha', label: 'Omaha', icon: FaDice },
                      { id: 'texas', label: 'Texas', icon: FaCoins },
                      { id: 'beginners', label: 'Principiantes', icon: FaShieldAlt }
                    ].map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`
                          px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2
                          ${selectedFilter === filter.id 
                            ? 'bg-poker-gold text-black scale-105' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                        `}
                      >
                        <filter.icon className="text-sm" />
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
                
                {/* Grid de Salas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getFilteredSalas().map((sala, index) => (
                    <SalaCard key={sala.id} sala={sala} index={index} />
                  ))}
                </div>
                
                {getFilteredSalas().length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg mb-4">
                      No hay salas que coincidan con tu búsqueda
                    </p>
                    <button
                      onClick={() => {
                        setSelectedFilter('all')
                        setSelectedExperience(null)
                      }}
                      className="text-poker-gold hover:underline"
                    >
                      Ver todas las salas →
                    </button>
                  </div>
                )}
              </div>
            </section>
            
            {/* Sección de Métodos de Pago */}
            <div id="payments">
              <PaymentMethods />
            </div>
            
            {/* Calculadora */}
            <section id="calculator" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-poker-gold">
                  CALCULA TU RAKEBACK
                </h2>
                
                <div className="max-w-2xl mx-auto bg-poker-black rounded-xl p-8 shadow-2xl">
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">
                      Ejemplo: Si generas S/1000 de rake con 60% rakeback
                    </p>
                    <div className="text-5xl font-bold text-poker-gold mb-4">
                      = S/600 GRATIS
                    </div>
                    <p className="text-gray-400 mb-8">
                      ¡Cada semana directo a tu YAPE o PLIN!
                    </p>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href="https://wa.me/51955311839?text=Quiero%20calcular%20mi%20rakeback"
                      className="inline-block bg-gradient-to-r from-poker-gold to-yellow-500 text-black font-bold px-8 py-4 rounded-full"
                    >
                      <FaCalculator className="inline mr-2" />
                      CALCULAR MIS GANANCIAS
                    </motion.a>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Contacto */}
            <section id="contacto" className="py-20 bg-poker-black">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-white mb-8">
                  ¿LISTO PARA <span className="text-poker-gold">EMPEZAR?</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Contáctanos ahora y empieza a ganar desde hoy
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://wa.me/51955311839"
                    className="inline-flex items-center bg-whatsapp text-white font-bold px-8 py-4 rounded-full text-xl"
                  >
                    <FaWhatsapp className="mr-3 text-2xl" />
                    WHATSAPP
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://t.me/pokeragency"
                    className="inline-flex items-center bg-blue-500 text-white font-bold px-8 py-4 rounded-full text-xl"
                  >
                    <FaTelegram className="mr-3 text-2xl" />
                    TELEGRAM
                  </motion.a>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Página de Noticias */
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold text-center mb-12 text-white">
                NOTICIAS & <span className="text-poker-gold">ESTRATEGIAS</span>
              </h1>
              <div className="text-center">
                <p className="text-gray-400 mb-8">
                  Sección de noticias en construcción
                </p>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-poker-gold hover:underline"
                >
                  ← Volver al inicio
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-80 bg-gray-900 z-50 shadow-2xl p-8 pt-20"
          >
            <div className="flex flex-col space-y-6">
              <button onClick={() => navigateTo('home')} className="text-2xl text-white hover:text-poker-gold">
                Inicio
              </button>
              <button onClick={() => navigateTo('salas')} className="text-2xl text-white hover:text-poker-gold">
                Salas
              </button>
              <button onClick={() => navigateTo('calculator')} className="text-2xl text-white hover:text-poker-gold">
                Calculadora
              </button>
              <button onClick={() => navigateTo('payments')} className="text-2xl text-white hover:text-poker-gold">
                Métodos de Pago
              </button>
              <button onClick={() => navigateTo('contacto')} className="text-2xl text-white hover:text-poker-gold">
                Contacto
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/51955311839"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-whatsapp hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp size={30} />
      </motion.a>
    </div>
  )
}

export default App