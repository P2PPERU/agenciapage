import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaTrophy, FaDollarSign, FaFire, FaClock } from 'react-icons/fa'
import { useNextTournamentTimer, formatTournamentName } from "../../utils/tournamentTimer"
const FloatingAd = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  
  // Usar el hook personalizado para el timer real
  const { nextTournament, timeRemaining, isLoading } = useNextTournamentTimer()
  
  // Mostrar después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleClose = () => {
    setIsVisible(false)
    // Volver a mostrar después de 60 segundos
    setTimeout(() => {
      setIsVisible(true)
    }, 60000)
  }
  
  // Obtener información del torneo para el mensaje de WhatsApp
  const getTournamentInfo = () => {
    if (!nextTournament) return { name: 'Freeroll', prize: '$10,000' }
    
    return {
      name: formatTournamentName(nextTournament),
      prize: nextTournament.type === 'super' ? '$100,000' : '$10,000',
      day: nextTournament.day,
      time: nextTournament.time
    }
  }
  
  const tournamentInfo = getTournamentInfo()
  
  const whatsappMessage = encodeURIComponent(
    `¡Quiero participar en el próximo ${tournamentInfo.name} de ${tournamentInfo.prize} USD en WPT Global! ` +
    `${nextTournament ? `El torneo es el ${nextTournament.day} a las ${nextTournament.time} hora Perú.` : ''}`
  )
  const whatsappUrl = `https://wa.me/51955311839?text=${whatsappMessage}`
  
  // No mostrar si está cargando
  if (isLoading) return null
  
  return (
    <>
      {/* Versión Desktop - Lateral */}
      <AnimatePresence>
        {isVisible && !isMinimized && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-40 max-w-sm"
          >
            <div className={`relative rounded-2xl shadow-2xl overflow-hidden ${
              nextTournament?.type === 'super' 
                ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-red-500' 
                : 'bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500'
            }`}>
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              
              {/* Símbolos de poker de fondo */}
              <div className="absolute inset-0 opacity-10">
                <div className="flex flex-wrap gap-4 p-4 text-4xl">
                  <span>♠</span><span>♥</span><span>♦</span><span>♣</span>
                  <span>♠</span><span>♥</span><span>♦</span><span>♣</span>
                  <span>♠</span><span>♥</span><span>♦</span><span>♣</span>
                </div>
              </div>
              
              {/* Contenido */}
              <div className="relative p-6">
                {/* Botón cerrar */}
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 text-white/70 hover:text-white transition"
                >
                  <FaTimes />
                </button>
                
                {/* Badge EXCLUSIVO con información del torneo */}
                <div className="inline-flex items-center bg-black/30 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                  <FaFire className="mr-1 text-yellow-300 animate-pulse" />
                  {nextTournament?.type === 'super' ? 'SUPER DOMINGO' : 'DIARIO'}
                </div>
                
                {/* Título principal con información real */}
                <div className="text-white mb-4">
                  <h3 className="text-4xl font-black mb-2">
                    {tournamentInfo.prize} USD
                  </h3>
                  <p className="text-2xl font-bold">
                    FREEROLL
                  </p>
                  <p className="text-lg">
                    {nextTournament?.type === 'super' ? 'DOMINGOS' : 'TODOS LOS DÍAS'}
                  </p>
                  {nextTournament && (
                    <p className="text-sm text-white/80 mt-1">
                      Próximo: {nextTournament.day} {nextTournament.date} - {nextTournament.time}h
                    </p>
                  )}
                </div>
                
                {/* Logo WPT */}
                <div className="bg-white/20 backdrop-blur rounded-lg p-3 mb-4">
                  <p className="text-white font-bold text-xl">
                    {nextTournament?.type === 'super' ? '👑' : '🏆'} WPT POKER
                  </p>
                  <p className="text-white/90 text-sm">
                    Solo con nosotros
                  </p>
                </div>
                
                {/* Timer con tiempo real */}
                <div className="bg-black/30 backdrop-blur rounded-lg p-3 mb-4">
                  <p className="text-white/80 text-xs mb-1 flex items-center gap-1">
                    <FaClock className="text-yellow-300" />
                    {timeRemaining.isExpired ? 'Buscando próximo torneo...' : 'Comienza en:'}
                  </p>
                  
                  {!timeRemaining.isExpired && (
                    <div className="flex gap-2 justify-center">
                      <div className="bg-white/20 rounded px-2 py-1">
                        <span className="text-white font-bold text-lg">
                          {String(timeRemaining.hours).padStart(2, '0')}
                        </span>
                        <span className="text-white/60 text-xs block">HRS</span>
                      </div>
                      <span className="text-white text-lg">:</span>
                      <div className="bg-white/20 rounded px-2 py-1">
                        <span className="text-white font-bold text-lg">
                          {String(timeRemaining.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-white/60 text-xs block">MIN</span>
                      </div>
                      <span className="text-white text-lg">:</span>
                      <div className="bg-white/20 rounded px-2 py-1">
                        <span className="text-white font-bold text-lg">
                          {String(timeRemaining.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-white/60 text-xs block">SEG</span>
                      </div>
                    </div>
                  )}
                  
                  {timeRemaining.isExpired && (
                    <div className="text-white/60 text-center">
                      ⏳ Actualizando horarios...
                    </div>
                  )}
                </div>
                
                {/* CTA Button */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-black py-4 rounded-xl text-center hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaTrophy />
                    REGISTRARME AHORA
                  </span>
                </motion.a>
                
                {/* Texto adicional */}
                <p className="text-white/80 text-xs text-center mt-3">
                  ⚡ Sin depósito • 100% Gratis • Hora Perú
                </p>
              </div>
            </div>
            
            {/* Botón minimizar */}
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute -left-10 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-l-lg hover:bg-red-700 transition"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Versión Mobile - Bottom */}
      <AnimatePresence>
        {isVisible && !isMinimized && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="md:hidden fixed bottom-20 left-2 right-2 z-40"
          >
            <div className={`relative rounded-2xl shadow-2xl p-4 ${
              nextTournament?.type === 'super' 
                ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-red-500' 
                : 'bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500'
            }`}>
              {/* Símbolos de fondo */}
              <div className="absolute inset-0 opacity-10 flex justify-around items-center text-4xl">
                <span>♠</span><span>♥</span><span>♦</span><span>♣</span>
              </div>
              
              {/* Contenido móvil */}
              <div className="relative">
                <button
                  onClick={handleClose}
                  className="absolute -top-2 -right-2 bg-black/50 text-white rounded-full p-1"
                >
                  <FaTimes size={16} />
                </button>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-black text-2xl">
                      {tournamentInfo.prize} USD
                    </h3>
                    <p className="text-white font-bold">FREEROLL</p>
                    <p className="text-white/90 text-sm">
                      {nextTournament ? `${nextTournament.day} ${nextTournament.time}h` : 'WPT - Solo con nosotros'}
                    </p>
                    
                    {/* Mini timer para móvil */}
                    {!timeRemaining.isExpired && (
                      <div className="text-white/90 text-xs mt-1">
                        ⏰ {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
                      </div>
                    )}
                  </div>
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white font-bold px-4 py-3 rounded-xl whitespace-nowrap animate-pulse text-sm"
                  >
                    JUGAR AHORA
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Botón minimizado */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsMinimized(false)}
            className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 rounded-l-2xl shadow-lg hover:scale-110 transition-all items-center gap-2"
          >
            <span className="writing-mode-vertical text-sm font-bold">
              FREEROLL {tournamentInfo.prize === '$100,000' ? '$100K' : '$10K'}
            </span>
            <FaTrophy className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </>
  )
}

// Versión alternativa más simple con timer real
export const SimpleFloatingAd = () => {
  const [isVisible, setIsVisible] = useState(true)
  const { nextTournament, timeRemaining } = useNextTournamentTimer()
  
  if (!isVisible) return null
  
  const tournamentInfo = {
    prize: nextTournament?.type === 'super' ? '$100,000' : '$10,000',
    name: nextTournament?.type === 'super' ? 'SUPER FREEROLL' : 'FREEROLL DIARIO'
  }
  
  const whatsappMessage = encodeURIComponent(`Quiero el ${tournamentInfo.name} de ${tournamentInfo.prize} USD en WPT`)
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-24 right-4 z-40 max-w-xs"
    >
      <div className={`rounded-xl p-4 shadow-2xl ${
        nextTournament?.type === 'super' 
          ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
          : 'bg-gradient-to-r from-red-600 to-orange-500'
      }`}>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
        >
          ✕
        </button>
        
        <div className="text-white text-center">
          <p className="text-3xl font-black mb-1">{tournamentInfo.prize} USD</p>
          <p className="font-bold mb-2">{tournamentInfo.name}</p>
          
          {/* Timer simple */}
          {!timeRemaining.isExpired && (
            <p className="text-sm mb-2">
              ⏰ {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
            </p>
          )}
          
          <p className="text-sm mb-3">
            {nextTournament ? `${nextTournament.day} ${nextTournament.time}h Perú` : 'WPT • SOLO CON NOSOTROS'}
          </p>
          
          <a
            href={`https://wa.me/51955311839?text=${whatsappMessage}`}
            className="block bg-white text-red-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition"
          >
            GANAR AHORA →
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default FloatingAd