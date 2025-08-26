// src/pages/WPTPage.jsx (Versión Responsive Mejorada)
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
  FaMoneyBillWave,
  FaGlobe
} from 'react-icons/fa'

// Importar componentes separados
import WPTBonusesSection from '../components/sections/WPTBonusesSection'
import WPTRegistrationSection from '../components/sections/WPTRegistrationSection'
import WPTTournamentsSection from '../components/sections/WPTTournamentsSection'

// Importar timer real
import { useNextTournamentTimer, formatTournamentName } from '../utils/tournamentTimer'

// Importar datos
import { 
  bonuses, 
  registrationSteps, 
  tournaments, 
  features, 
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
  const { section } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  
  // Hook del timer real
  const { nextTournament, timeRemaining, isLoading: timerLoading } = useNextTournamentTimer()
  
  const activeTab = section || 'bonos'
  
  // Validar que la sección existe
  const validSections = ['bonos', 'registro', 'torneos']
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
        const navHeight = window.innerWidth < 768 ? 160 : 200
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

  // Loading inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Obtener información del próximo torneo
  const getTournamentDisplayInfo = () => {
    if (timerLoading || !nextTournament) {
      return {
        prize: '$10,000',
        type: 'FREEROLL',
        frequency: 'DIARIO',
        emoji: '🏆'
      }
    }

    if (nextTournament.type === 'super') {
      return {
        prize: '$100,000',
        type: 'SUPER FREEROLL',
        frequency: 'DOMINICAL',
        emoji: '👑'
      }
    } else {
      return {
        prize: '$10,000',
        type: 'FREEROLL',
        frequency: 'DIARIO',
        emoji: '🏆'
      }
    }
  }

  const tournamentDisplay = getTournamentDisplayInfo()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-poker-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-poker-gold border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-poker-black">
      {/* Hero Section - RESPONSIVE MEJORADO */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background con mesas de poker */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-green-900/20 to-red-900/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
          
          {/* Patrón de cartas - Oculto en móviles muy pequeños */}
          <div className="absolute inset-0 opacity-5 hidden xs:block">
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-4 rotate-12 scale-150">
              {[...Array(48)].map((_, i) => (
                <div key={i} className="text-3xl sm:text-6xl">
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
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Logo WPT ULTRA RESPONSIVE */}
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", damping: 10 }}
              className="mb-3 sm:mb-4 md:mb-6"
            >
              <div className="inline-block relative">
                {/* Sombra del logo */}
                <div className="absolute inset-0 bg-black/40 rounded-xl sm:rounded-2xl blur-sm sm:blur-lg transform translate-y-1 sm:translate-y-2 scale-105"></div>
                
                {/* Logo WPT escalable */}
                <div className="relative bg-gradient-to-r from-blue-600 via-white to-red-600 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl">
                  <div className="bg-gradient-to-br from-gray-900 to-black px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl">
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-500 via-white to-red-500 bg-clip-text text-transparent mb-1 tracking-wide">
                      WPT
                    </h1>
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent flex-1"></div>
                      <p className="text-white text-xs sm:text-sm md:text-lg font-bold tracking-[0.2em] sm:tracking-[0.3em]">GLOBAL</p>
                      <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent flex-1"></div>
                    </div>
                    <p className="text-yellow-500 text-xs sm:text-sm font-semibold mt-1 tracking-wide">
                      WORLD POKER TOUR
                    </p>
                  </div>
                </div>

                {/* Badge exclusivo Peru - Responsive */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-1 -right-2 sm:-top-0 sm:-right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs font-black shadow-lg"
                >
                  🇵🇪 <span className="hidden xs:inline">PERÚ</span> <span className="hidden sm:inline">EXCLUSIVE</span>
                </motion.div>
              </div>
            </motion.div>
            
            {/* TÍTULOS RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-green-400 mb-3 sm:mb-4 px-2">
                LA SALA CON MÁS RECREACIONALES DEL MERCADO
              </h2>
              
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent flex-1 max-w-12 sm:max-w-20"></div>
                <FaGlobe className="text-green-500 text-lg sm:text-xl" />
                <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent flex-1 max-w-12 sm:max-w-20"></div>
              </div>
              
              <p className="text-base sm:text-lg md:text-2xl text-yellow-400 font-bold mb-4 sm:mb-6 px-2">
                Las mesas más suaves del mundo abrieron sus puertas a Perú en exclusiva con nosotros
              </p>
              
              {/* Slogan potente - Responsive */}
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-6 max-w-xs xs:max-w-sm sm:max-w-4xl mx-auto mb-4 sm:mb-6">
                <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-1 sm:mb-2">
                  GÁNALE A LAS BALLENAS ASIÁTICAS
                </h3>
                <p className="text-sm sm:text-lg text-white/90 italic leading-tight sm:leading-normal">
                  "Gana así de fácil como en los poker rooms" - Acceso directo a los juegos más soft
                </p>
              </div>
            </motion.div>

            {/* Features de poker room - GRID RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-xs xs:max-w-sm sm:max-w-4xl mx-auto"
            >
              <div className="bg-black/30 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-500/30">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🎯</div>
                <h4 className="text-white font-bold mb-1 text-sm sm:text-base">MESAS ULTRA-SOFT</h4>
                <p className="text-green-400 text-xs sm:text-sm">Jugadores recreacionales 24/7</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-500/30">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🏆</div>
                <h4 className="text-white font-bold mb-1 text-sm sm:text-base">FREEROLLS DIARIOS</h4>
                <p className="text-blue-400 text-xs sm:text-sm">$10K garantizados gratis</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-yellow-500/30 xs:col-span-1 sm:col-span-1">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">💰</div>
                <h4 className="text-white font-bold mb-1 text-sm sm:text-base">BONOS MASIVOS</h4>
                <p className="text-yellow-400 text-xs sm:text-sm">Hasta $3,580 en recompensas</p>
              </div>
            </motion.div>
            
            {/* Badges de ofertas - RESPONSIVE */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
              {bonuses.slice(0, 3).map((bonus, idx) => (
                <motion.div
                  key={bonus.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-r ${bonus.color} text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-lg text-xs sm:text-base`}
                >
                  <span className="text-sm sm:text-base">{bonus.icon}</span> 
                  <span className="ml-1">{bonus.title.split(' ')[0]}</span>
                  <span className="hidden xs:inline ml-1">{bonus.amount}</span>
                </motion.div>
              ))}
            </div>
            
            {/* CTAs principales - PROPORCIONES BALANCEADAS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0 max-w-lg sm:max-w-none mx-auto">
              <motion.a
                href={`https://wa.me/${wptConstants.whatsappNumber}?text=${wptConstants.whatsappMessages.register}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 sm:px-6 py-3 sm:py-3 rounded-full text-base sm:text-lg shadow-xl"
              >
                <FaWhatsapp className="mr-2 text-lg sm:text-xl" />
                REGISTRARME AHORA
              </motion.a>
              
              <Link
                to="/wpt/bonos"
                className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 sm:px-6 py-3 sm:py-3 rounded-full text-base sm:text-lg border-2 border-gray-700"
              >
                <FaGift className="mr-2 text-lg sm:text-xl" />
                VER BONOS
              </Link>
            </div>
            
            {/* Contador de Freeroll - RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`mt-6 sm:mt-8 inline-block rounded-xl sm:rounded-2xl p-3 sm:p-4 mx-2 sm:mx-0 ${
                nextTournament?.type === 'super' 
                  ? 'bg-purple-600/20 border border-purple-500' 
                  : 'bg-red-600/20 border border-red-500'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xl sm:text-2xl">{tournamentDisplay.emoji}</span>
                <p className={`font-bold text-sm sm:text-base text-center ${
                  nextTournament?.type === 'super' ? 'text-purple-400' : 'text-red-400'
                }`}>
                  PRÓXIMO {tournamentDisplay.type} {tournamentDisplay.prize}
                </p>
              </div>
              
              {/* Información adicional del torneo */}
              {nextTournament && !timerLoading && (
                <p className="text-gray-300 text-xs sm:text-sm mb-3 text-center">
                  {nextTournament.day} {nextTournament.date} a las {nextTournament.time}h (Hora Perú)
                </p>
              )}
              
              {/* Timer real - RESPONSIVE */}
              {!timeRemaining.isExpired ? (
                <div className="flex gap-2 sm:gap-3 justify-center">
                  <div className="bg-black/50 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2">
                    <span className="text-xl sm:text-3xl font-bold text-white block">
                      {String(timeRemaining.hours).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-400 block text-center">HORAS</span>
                  </div>
                  <span className="text-xl sm:text-3xl text-white self-center">:</span>
                  <div className="bg-black/50 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2">
                    <span className="text-xl sm:text-3xl font-bold text-white block">
                      {String(timeRemaining.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-400 block text-center">MIN</span>
                  </div>
                  <span className="text-xl sm:text-3xl text-white self-center">:</span>
                  <div className="bg-black/50 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2">
                    <span className="text-xl sm:text-3xl font-bold text-white block">
                      {String(timeRemaining.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-400 block text-center">SEG</span>
                  </div>
                </div>
              ) : (
                <div className="bg-black/50 rounded-md sm:rounded-lg px-3 sm:px-4 py-2">
                  <div className="text-white font-bold flex items-center justify-center gap-2 text-sm sm:text-base">
                    <FaClock className="animate-spin" />
                    <span className="hidden sm:inline">Actualizando próximo torneo...</span>
                    <span className="sm:hidden">Actualizando...</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features rápidas - RESPONSIVE GRID */}
      <section className="py-8 sm:py-12 bg-gray-900/50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl sm:text-4xl text-yellow-500 mb-1 sm:mb-2">
                  {React.createElement(iconMap[feature.iconName])}
                </div>
                <h3 className="text-white font-bold text-sm sm:text-base">{feature.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tabs de navegación - STICKY RESPONSIVE */}
      <div className="sticky top-16 sm:top-20 z-30 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex overflow-x-auto gap-2 py-3 sm:py-4 scrollbar-hide">
            {['bonos', 'registro', 'torneos'].map(tab => (
              <Link
                key={tab}
                to={`/wpt/${tab}`}
                onClick={scrollToContent}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'bonos' && '🎁 '}
                {tab === 'registro' && '📝 '}
                {tab === 'torneos' && '🏆 '}
                {tab.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contenido según tab activo */}
      <div id="wpt-content" className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
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
        </AnimatePresence>
      </div>
      
      {/* CTA Final - RESPONSIVE */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-900/50 to-red-900/50">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
              ¿LISTO PARA JUGAR EN WPT?
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Únete a la élite del poker mundial. Registro en menos de 5 minutos 
              con nuestra asistencia personalizada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-2 sm:px-0 max-w-lg sm:max-w-none mx-auto">
              <a
                href={`https://wa.me/${wptConstants.whatsappNumber}?text=${wptConstants.whatsappMessages.startNow}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 sm:px-6 py-3 sm:py-3 rounded-full text-base sm:text-lg hover:scale-105 transition shadow-xl"
              >
                <FaWhatsapp className="mr-2 text-lg sm:text-xl" />
                EMPEZAR AHORA
              </a>
              
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 sm:px-6 py-3 sm:py-3 rounded-full text-base sm:text-lg transition"
              >
                <FaArrowRight className="mr-2" />
                VER OTRAS SALAS
              </Link>
            </div>
            
            <div className="flex flex-col xs:flex-row justify-center gap-4 xs:gap-8 text-gray-400 text-sm sm:text-base">
              <div className="flex items-center justify-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Registro Gratis</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center justify-center gap-2">
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