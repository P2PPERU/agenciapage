import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBars, FaTimes, FaHome, FaNewspaper, FaCalculator, FaTrophy, 
  FaPhone, FaDice, FaCoins, FaWhatsapp, FaStar, FaFire, FaGift, 
  FaUserFriends, FaClock, FaArrowRight, FaCheckCircle, FaQuoteLeft, 
  FaHeadphones, FaMoneyBillWave, FaChartLine, FaUsers, FaShieldAlt, 
  FaBolt, FaEye, FaCalendar, FaUser, FaSearch, FaShare, FaTelegram,
  FaTwitter, FaFacebook, FaFilter, FaTags, FaBitcoin, FaUniversity,
  FaTicketAlt, FaGamepad, FaCrown, FaDollarSign, FaExclamationCircle,
  FaBell, FaTimes as FaClose
} from 'react-icons/fa'

// Importar datos actualizados
import { salas, paymentMethods, testimonials, liveStats, specialOffers } from '../../data/salas'

// Selector de Nivel de Experiencia
const ExperienceSelector = ({ onSelect, onSkip }) => {
  const [isClosing, setIsClosing] = useState(false)
  
  const levels = [
    { 
      id: 'beginner', 
      title: 'Principiante', 
      icon: '🎯',
      description: 'Nuevo en el poker online',
      recommended: ['PPPOKER', 'CLUBGG'],
      benefits: 'Depósitos desde S/10'
    },
    { 
      id: 'intermediate', 
      title: 'Intermedio', 
      icon: '⚡',
      description: 'Ya tengo experiencia',
      recommended: ['X-POKER', 'SUPREMA'],
      benefits: 'Hasta 60% rakeback'
    },
    { 
      id: 'advanced', 
      title: 'Avanzado', 
      icon: '🏆',
      description: 'Jugador profesional',
      recommended: ['WPT', 'GGPOKER'],
      benefits: 'Condiciones VIP'
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
                    {level.recommended.join(', ')}
                  </div>
                  <div className="text-xs text-green-400 mt-2">
                    {level.benefits}
                  </div>
                </motion.button>
              ))}
            </div>
            
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

// Banner de Urgencia Superior
const UrgencyBanner = () => {
  const [currentOffer, setCurrentOffer] = useState(0)
  const [playersToday, setPlayersToday] = useState(17)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % specialOffers.length)
    }, 5000)
    
    const playerInterval = setInterval(() => {
      setPlayersToday(prev => prev + Math.floor(Math.random() * 3))
    }, 30000)
    
    return () => {
      clearInterval(interval)
      clearInterval(playerInterval)
    }
  }, [])
  
  const offer = specialOffers[currentOffer]
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={offer.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-gradient-to-r from-red-600 to-orange-500 py-2 px-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FaFire className="text-yellow-300 animate-pulse" />
            <span className="text-white font-bold text-sm md:text-base">
              {offer.title} - {offer.subtitle}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white text-xs md:text-sm">
              🔥 {playersToday} jugadores registrados hoy
            </span>
            <a
              href={`https://wa.me/51955311839?text=${encodeURIComponent(`Quiero la oferta: ${offer.title}`)}`}
              className="bg-white text-red-600 px-3 py-1 rounded-full font-bold text-xs hover:scale-105 transition"
            >
              OBTENER
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Componente de Sala Card Mejorado
const SalaCard = ({ sala, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const whatsappNumber = "51955311839"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(sala.whatsappMessage)}`
  
  const isFeatured = sala.featured || index === 0
  
  // Obtener estadísticas en vivo
  const activeTables = liveStats.activeTables[sala.id] || Math.floor(Math.random() * 100) + 50
  
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
      {/* Badge de oferta especial */}
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
      
      {/* Indicador de mesas activas */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-green-500/20 backdrop-blur text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
          {activeTables} mesas activas
        </div>
      </div>
      
      <div className={`relative h-40 bg-gradient-to-br ${sala.color} p-6 flex flex-col justify-center items-center`}>
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
          <p className="text-poker-gold font-bold text-2xl mb-1">{sala.rakeback}</p>
          <p className="text-gray-400 text-sm">
            {sala.id === 'wpt' ? 'FREEROLL $10K DIARIO' : 'RAKEBACK SEMANAL'}
          </p>
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
        
        {/* Métodos de pago */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sala.paymentMethods?.slice(0, 3).map(method => (
            <span key={method} className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs">
              {method}
            </span>
          ))}
        </div>
        
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
          <FaWhatsapp className="mr-2 text-xl relative z-10" />
          <span className="relative z-10">JUGAR AHORA</span>
        </motion.a>
        
        {sala.highlight && (
          <p className="text-center text-xs text-yellow-400 mt-3 font-bold animate-pulse">
            {sala.highlight}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// Nueva Sección de Métodos de Pago Mejorada
const PaymentMethodsSection = () => {
  const popularMethods = [
    { 
      name: 'YAPE', 
      icon: '💜', 
      color: 'from-purple-500 to-purple-700',
      time: 'En 1 minuto',
      highlight: 'MÁS POPULAR'
    },
    { 
      name: 'PLIN', 
      icon: '💚', 
      color: 'from-green-500 to-green-700',
      time: 'Instantáneo',
      highlight: 'INSTANTÁNEO'
    },
    { 
      name: 'BCP/BBVA', 
      icon: '🏦', 
      color: 'from-blue-500 to-blue-700',
      time: 'Mismo día',
      highlight: 'TODOS LOS BANCOS'
    },
    { 
      name: 'Bitcoin', 
      icon: '₿', 
      color: 'from-orange-500 to-orange-700',
      time: '30 minutos',
      highlight: 'ANÓNIMO'
    },
    { 
      name: 'USDT', 
      icon: '💵', 
      color: 'from-green-600 to-green-800',
      time: 'Instantáneo',
      highlight: 'SIN LÍMITES'
    }
  ]
  
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-green-500/20 border border-green-500 rounded-full px-6 py-2 mb-6">
            <FaCheckCircle className="text-green-500 mr-2" />
            <span className="text-green-400 font-bold">PAGOS 100% GARANTIZADOS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            DEPOSITA Y RETIRA <span className="text-poker-gold">AL INSTANTE</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Sin comisiones • Sin letra pequeña • 100% seguro
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          {popularMethods.map((method, idx) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className={`bg-gradient-to-br ${method.color} rounded-2xl p-6 text-center shadow-xl relative overflow-hidden`}>
                {/* Badge de highlight */}
                <div className="absolute -top-2 -right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {method.highlight}
                  </span>
                </div>
                
                <div className="text-5xl mb-3">{method.icon}</div>
                <p className="text-white font-black text-lg mb-1">{method.name}</p>
                <p className="text-white/80 text-sm">{method.time}</p>
                
                {/* Checkmark */}
                <div className="mt-3">
                  <FaCheckCircle className="text-white/50 mx-auto" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Beneficios adicionales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-r from-poker-gold/10 to-yellow-500/10 border border-poker-gold/30 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <FaBolt className="text-poker-gold text-3xl mx-auto mb-2" />
              <p className="text-white font-bold">Depósitos</p>
              <p className="text-poker-gold text-2xl font-black">1 MIN</p>
            </div>
            <div>
              <FaClock className="text-poker-gold text-3xl mx-auto mb-2" />
              <p className="text-white font-bold">Retiros</p>
              <p className="text-poker-gold text-2xl font-black">24 HRS</p>
            </div>
            <div>
              <FaShieldAlt className="text-poker-gold text-3xl mx-auto mb-2" />
              <p className="text-white font-bold">Seguridad</p>
              <p className="text-poker-gold text-2xl font-black">100%</p>
            </div>
            <div>
              <FaDollarSign className="text-poker-gold text-3xl mx-auto mb-2" />
              <p className="text-white font-bold">Comisiones</p>
              <p className="text-poker-gold text-2xl font-black">S/0</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Nueva Sección de Testimonios
const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-poker-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            JUGADORES <span className="text-poker-gold">GANADORES REALES</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Testimonios verificados de nuestra comunidad
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-6 relative hover:scale-105 transition-transform"
            >
              {/* Badge verificado */}
              {testimonial.verified && (
                <div className="absolute -top-3 -right-3">
                  <div className="bg-green-500 text-white rounded-full p-2">
                    <FaCheckCircle />
                  </div>
                </div>
              )}
              
              <FaQuoteLeft className="text-4xl text-poker-gold/20 absolute top-4 right-4" />
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-poker-gold to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  <p className="text-poker-gold text-xs font-bold">{testimonial.room}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                <div>
                  <p className="text-green-400 font-black text-xl">
                    {testimonial.profit}
                  </p>
                  <p className="text-gray-500 text-xs">{testimonial.date}</p>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA después de testimonios */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Únete a más de <span className="text-poker-gold font-bold">200 jugadores</span> que ya están ganando
          </p>
          <a
            href="https://wa.me/51955311839?text=Quiero%20empezar%20a%20ganar%20como%20los%20testimonios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-poker-gold to-yellow-500 text-black font-black px-8 py-4 rounded-full hover:scale-105 transition text-lg"
          >
            <FaWhatsapp className="mr-2 text-2xl" />
            QUIERO GANAR TAMBIÉN
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Componente Principal
function App() {
  const [showExperienceSelector, setShowExperienceSelector] = useState(true)
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Filtrar salas según experiencia y filtro
  const getFilteredSalas = () => {
    let filtered = salas
    
    if (selectedExperience) {
      filtered = filtered.filter(sala => 
        sala.level && sala.level.includes(selectedExperience)
      )
    }
    
    if (selectedFilter !== 'all') {
      switch(selectedFilter) {
        case 'featured':
          filtered = filtered.filter(s => s.featured)
          break
        case 'high-rb':
          filtered = filtered.filter(s => s.rakeback && parseInt(s.rakeback) >= 40)
          break
        case 'beginners':
          filtered = filtered.filter(s => s.level && s.level.includes('basico'))
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
  
  // Navegación mejorada con scroll suave
  const navigateTo = (elementId) => {
    setIsMobileMenuOpen(false)
    
    if (elementId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(elementId)
      if (element) {
        const offset = 80 // Offset para el header fijo
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-poker-black text-white">
      {/* Banner de Urgencia */}
      <UrgencyBanner />
      
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
      
      {/* Header de Navegación Corregido */}
      <nav className={`fixed top-12 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl py-3' 
          : 'bg-gradient-to-b from-black/80 to-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
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
                <span className="text-xl font-bold text-white flex items-center">
                  <span className="hidden sm:inline text-poker-gold/50 mr-1">♠</span>
                  POKER 
                  <span className="text-poker-gold group-hover:text-yellow-400 transition-colors ml-1">AGENCY</span>
                  <span className="hidden sm:inline text-poker-gold/50 ml-1">♣</span>
                </span>
                <span className="text-xs text-gray-400 hidden sm:block">
                  ♥ Tu Agente #1 de Poker Online ♦
                </span>
              </div>
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigateTo('home')} 
                className="text-gray-300 hover:text-poker-gold transition-colors flex items-center gap-2 font-medium"
              >
                <FaHome className="text-sm" />
                Inicio
              </button>
              <button 
                onClick={() => navigateTo('salas')} 
                className="text-gray-300 hover:text-poker-gold transition-colors flex items-center gap-2 font-medium"
              >
                <FaTrophy className="text-sm" />
                Salas
              </button>
              <button 
                onClick={() => navigateTo('calculator')} 
                className="text-gray-300 hover:text-poker-gold transition-colors flex items-center gap-2 font-medium"
              >
                <FaCalculator className="text-sm" />
                Calculadora
              </button>
              <button 
                onClick={() => navigateTo('pagos')} 
                className="text-gray-300 hover:text-poker-gold transition-colors flex items-center gap-2 font-medium"
              >
                <FaMoneyBillWave className="text-sm" />
                Pagos
              </button>
              <button 
                onClick={() => navigateTo('testimonios')} 
                className="text-gray-300 hover:text-poker-gold transition-colors flex items-center gap-2 font-medium"
              >
                <FaStar className="text-sm" />
                Testimonios
              </button>
              
              {/* CTA Button Desktop */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/51955311839?text=Quiero%20empezar%20a%20jugar%20poker%20online"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-poker-gold to-yellow-500 text-black font-bold px-6 py-2 rounded-full hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
              >
                JUGAR AHORA
              </motion.a>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white text-2xl z-50 relative"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                  >
                    <FaTimes />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                  >
                    <FaBars />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-80 bg-gray-900 z-40 md:hidden shadow-2xl"
            >
              <div className="flex flex-col items-center space-y-6 p-8 pt-20">
                <motion.button
                  onClick={() => navigateTo('home')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl text-white hover:text-poker-gold transition-colors flex items-center gap-3"
                >
                  <FaHome />
                  Inicio
                </motion.button>
                <motion.button
                  onClick={() => navigateTo('salas')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl text-white hover:text-poker-gold transition-colors flex items-center gap-3"
                >
                  <FaTrophy />
                  Salas
                </motion.button>
                <motion.button
                  onClick={() => navigateTo('calculator')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl text-white hover:text-poker-gold transition-colors flex items-center gap-3"
                >
                  <FaCalculator />
                  Calculadora
                </motion.button>
                <motion.button
                  onClick={() => navigateTo('pagos')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl text-white hover:text-poker-gold transition-colors flex items-center gap-3"
                >
                  <FaMoneyBillWave />
                  Pagos
                </motion.button>
                <motion.button
                  onClick={() => navigateTo('testimonios')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl text-white hover:text-poker-gold transition-colors flex items-center gap-3"
                >
                  <FaStar />
                  Testimonios
                </motion.button>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/51955311839"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-poker-gold to-yellow-500 text-black font-bold px-8 py-3 rounded-full mt-4 shadow-lg"
                >
                  EMPEZAR AHORA
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Contenido Principal */}
      <main className="pt-28">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-poker-black via-gray-900 to-poker-black"></div>
          <div className="relative z-10 container mx-auto px-4 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Live Stats Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/50 rounded-full px-6 py-2 mb-8"
              >
                <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span className="text-green-400 font-semibold">
                  {liveStats.totalPlayersOnline.toLocaleString()} jugadores online ahora
                </span>
              </motion.div>
              
              {/* Badge FREEROLL */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/50 rounded-full px-6 py-2 mb-8 ml-4"
              >
                <FaFire className="text-red-500 mr-2 animate-pulse" />
                <span className="text-red-400 font-semibold">
                  FREEROLL $10,000 en {liveStats.freerollCountdown}
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
                  className="px-8 py-4 font-bold text-black bg-gradient-to-r from-poker-gold to-yellow-500 rounded-full shadow-lg hover:shadow-yellow-500/30"
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
              
              {/* Últimas ganancias */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 inline-flex items-center bg-green-500/20 border border-green-500 rounded-full px-6 py-2"
              >
                <FaTrophy className="text-green-500 mr-2" />
                <span className="text-green-400">
                  Última ganancia: {liveStats.lastBigWin.player} ganó {liveStats.lastBigWin.amount} • {liveStats.lastBigWin.time}
                </span>
              </motion.div>
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
        <div id="pagos">
          <PaymentMethodsSection />
        </div>
        
        {/* Sección de Testimonios */}
        <div id="testimonios">
          <TestimonialsSection />
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
                href="https://t.me/pokeragencyperu"
                className="inline-flex items-center bg-blue-500 text-white font-bold px-8 py-4 rounded-full text-xl"
              >
                <FaTelegram className="mr-3 text-2xl" />
                TELEGRAM
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      
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