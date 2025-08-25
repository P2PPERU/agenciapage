// src/pages/WPTPage.jsx (Versión Corregida)
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { 
  FaTrophy, 
  FaGift, 
  FaDownload, 
  FaUserPlus, 
  FaDollarSign, 
  FaWhatsapp, 
  FaCheckCircle, 
  FaClock, 
  FaFire, 
  FaArrowRight,
  FaTicketAlt, 
  FaGamepad, 
  FaStar, 
  FaShieldAlt, 
  FaUsers,
  FaCalendar,
  FaChartLine,
  FaMoneyBillWave
} from 'react-icons/fa'

// Importar componentes separados
import WPTBonusesSection from '../components/sections/WPTBonusesSection'
import WPTRegistrationSection from '../components/sections/WPTRegistrationSection'
import WPTTournamentsSection from '../components/sections/WPTTournamentsSection'
import WPTSoftwareSection from '../components/sections/WPTSoftwareSection'

// Importar datos - CORREGIDO: Agregué crazyFreerollsInfo y crazySchedule
import { 
  bonuses, 
  registrationSteps, 
  tournaments, 
  features, 
  softwareFeatures, 
  platforms,
  ticketsTable,
  bonusDetails,
  promosPeru,
  crazyFreerollsInfo,
  crazySchedule,
  wptConstants 
} from '../data/wptData'

const iconMap = {
  FaUsers: FaUsers,
  FaClock: FaClock,
  FaShieldAlt: FaShieldAlt,
  FaGamepad: FaGamepad
}

const WPTPage = () => {
  const { section } = useParams() // Obtener la sección de la URL
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 59 })
  const [isLoading, setIsLoading] = useState(true)
  
  // Si no hay sección, mostrar bonos por defecto
  const activeTab = section || 'bonos'
  
  // Validar que la sección existe
  const validSections = ['bonos', 'registro', 'torneos', 'software']
  useEffect(() => {
    if (section && !validSections.includes(section)) {
      navigate('/wpt/bonos', { replace: true })
    }
  }, [section, navigate])

  // Función para hacer scroll al contenido
  const scrollToContent = () => {
    setTimeout(() => {
      const sectionElement = document.getElementById('wpt-content')
      if (sectionElement) {
        const navHeight = 200 // Altura aproximada de navegación + banners
        const elementPosition = sectionElement.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navHeight
        
        window.scrollTo({ 
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  // Scroll automático a la sección cuando se carga directamente
  useEffect(() => {
    if (section && !isLoading) {
      scrollToContent()
    }
  }, [section, isLoading])

  // Countdown timer effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-poker-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-poker-gold border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-poker-black">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background animado */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-red-900/30 to-blue-900/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
          
          {/* Patrón de cartas */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 gap-4 rotate-12 scale-150">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="text-6xl">
                  {i % 4 === 0 && '♠'}
                  {i % 4 === 1 && '♥'}
                  {i % 4 === 2 && '♦'}
                  {i % 4 === 3 && '♣'}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contenido del Hero */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Logo WPT */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="mb-6"
            >
              <div className="inline-block bg-gradient-to-r from-blue-600 via-white to-red-600 p-1 rounded-2xl">
                <div className="bg-black px-8 py-4 rounded-xl">
                  <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-500 via-white to-red-500 bg-clip-text text-transparent">
                    WPT
                  </h1>
                  <p className="text-white text-xl">GLOBAL</p>
                </div>
              </div>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              LA SALA PREMIUM DEL WORLD POKER TOUR
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Juega donde juegan los profesionales. Torneos millonarios, 
              freerolls diarios y el mejor software del mercado.
            </p>
            
            {/* Badges de ofertas */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {bonuses.slice(0, 3).map((bonus, idx) => (
                <motion.div
                  key={bonus.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-r ${bonus.color} text-white px-6 py-3 rounded-full font-bold shadow-lg`}
                >
                  {bonus.icon} {bonus.title.split(' ')[0]} {bonus.amount}
                </motion.div>
              ))}
            </div>
            
            {/* CTAs principales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={`https://wa.me/${wptConstants.whatsappNumber}?text=${wptConstants.whatsappMessages.register}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-full text-xl shadow-xl"
              >
                <FaWhatsapp className="mr-3 text-2xl" />
                REGISTRARME AHORA
              </motion.a>
              
              <Link
                to="/wpt/bonos"
                className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-4 rounded-full text-xl border-2 border-gray-700"
              >
                <FaGift className="mr-3 text-2xl" />
                VER BONOS
              </Link>
            </div>
            
            {/* Contador de Freeroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 inline-block bg-red-600/20 border border-red-500 rounded-2xl p-4"
            >
              <p className="text-red-400 font-bold mb-2">🔥 PRÓXIMO FREEROLL $10,000 EN:</p>
              <div className="flex gap-3 justify-center">
                <div className="bg-black/50 rounded-lg px-4 py-2">
                  <span className="text-3xl font-bold text-white">{String(countdown.hours).padStart(2, '0')}</span>
                  <span className="text-xs text-gray-400 block">HORAS</span>
                </div>
                <span className="text-3xl text-white">:</span>
                <div className="bg-black/50 rounded-lg px-4 py-2">
                  <span className="text-3xl font-bold text-white">{String(countdown.minutes).padStart(2, '0')}</span>
                  <span className="text-xs text-gray-400 block">MIN</span>
                </div>
                <span className="text-3xl text-white">:</span>
                <div className="bg-black/50 rounded-lg px-4 py-2">
                  <span className="text-3xl font-bold text-white">{String(countdown.seconds).padStart(2, '0')}</span>
                  <span className="text-xs text-gray-400 block">SEG</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features rápidas */}
      <section className="py-12 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl text-yellow-500 mb-2">
                  {React.createElement(iconMap[feature.iconName])}
                </div>
                <h3 className="text-white font-bold">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tabs de navegación */}
      <div className="sticky top-20 z-30 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4">
            {['bonos', 'registro', 'torneos', 'software'].map(tab => (
              <Link
                key={tab}
                to={`/wpt/${tab}`}
                onClick={scrollToContent}
                className={`px-6 py-3 rounded-full font-bold transition whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'bonos' && '🎁 '}
                {tab === 'registro' && '📝 '}
                {tab === 'torneos' && '🏆 '}
                {tab === 'software' && '💻 '}
                {tab.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contenido según tab activo */}
      <div id="wpt-content" className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'bonos' && (
            <WPTBonusesSection 
              bonuses={bonuses} 
              ticketsTable={ticketsTable}
              bonusDetails={bonusDetails}
            />
          )}
          
          {activeTab === 'registro' && (
            <WPTRegistrationSection 
              registrationSteps={registrationSteps} 
              promosPeru={promosPeru}
            />
          )}
          
          {activeTab === 'torneos' && (
            <WPTTournamentsSection 
              tournaments={tournaments}
              crazyFreerollsInfo={crazyFreerollsInfo}
              crazySchedule={crazySchedule}
            />
          )}
          
          {activeTab === 'software' && (
            <WPTSoftwareSection 
              softwareFeatures={softwareFeatures} 
              platforms={platforms} 
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-red-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              ¿LISTO PARA JUGAR EN WPT?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a la élite del poker mundial. Registro en menos de 5 minutos 
              con nuestra asistencia personalizada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={`https://wa.me/${wptConstants.whatsappNumber}?text=${wptConstants.whatsappMessages.startNow}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-full text-xl hover:scale-105 transition shadow-xl"
              >
                <FaWhatsapp className="mr-3 text-2xl" />
                EMPEZAR AHORA
              </a>
              
              <Link
                to="/"
                className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-4 rounded-full text-xl transition"
              >
                <FaArrowRight className="mr-3" />
                VER OTRAS SALAS
              </Link>
            </div>
            
            <div className="flex justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Registro Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>100% Seguro</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default WPTPage