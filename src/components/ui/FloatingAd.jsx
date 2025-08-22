import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaTrophy, FaDollarSign, FaFire } from 'react-icons/fa'

const FloatingAd = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })
  
  // Mostrar después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
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
  
  const handleClose = () => {
    setIsVisible(false)
    // Volver a mostrar después de 60 segundos
    setTimeout(() => {
      setIsVisible(true)
    }, 60000)
  }
  
  const whatsappMessage = encodeURIComponent('¡Quiero participar en el FREEROLL de $10,000 USD diario en WPT!')
  const whatsappUrl = `https://wa.me/51955311839?text=${whatsappMessage}`
  
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
            <div className="relative bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 rounded-2xl shadow-2xl overflow-hidden">
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
                
                {/* Badge EXCLUSIVO */}
                <div className="inline-flex items-center bg-black/30 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                  <FaFire className="mr-1 text-yellow-300 animate-pulse" />
                  EXCLUSIVO HOY
                </div>
                
                {/* Título principal */}
                <div className="text-white mb-4">
                  <h3 className="text-4xl font-black mb-2">
                    $10,000 USD
                  </h3>
                  <p className="text-2xl font-bold">
                    FREEROLL
                  </p>
                  <p className="text-lg">
                    TODOS LOS DÍAS
                  </p>
                </div>
                
                {/* Logo WPT */}
                <div className="bg-white/20 backdrop-blur rounded-lg p-3 mb-4">
                  <p className="text-white font-bold text-xl">
                    🏆 WPT POKER
                  </p>
                  <p className="text-white/90 text-sm">
                    Solo con nosotros
                  </p>
                </div>
                
                {/* Timer */}
                <div className="bg-black/30 backdrop-blur rounded-lg p-3 mb-4">
                  <p className="text-white/80 text-xs mb-1">Próximo torneo en:</p>
                  <div className="flex gap-2 justify-center">
                    <div className="bg-white/20 rounded px-2 py-1">
                      <span className="text-white font-bold text-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="text-white/60 text-xs block">HRS</span>
                    </div>
                    <span className="text-white text-lg">:</span>
                    <div className="bg-white/20 rounded px-2 py-1">
                      <span className="text-white font-bold text-lg">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="text-white/60 text-xs block">MIN</span>
                    </div>
                    <span className="text-white text-lg">:</span>
                    <div className="bg-white/20 rounded px-2 py-1">
                      <span className="text-white font-bold text-lg">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="text-white/60 text-xs block">SEG</span>
                    </div>
                  </div>
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
                    GANAR AHORA
                  </span>
                </motion.a>
                
                {/* Texto adicional */}
                <p className="text-white/80 text-xs text-center mt-3">
                  ⚡ Sin depósito • 100% Gratis
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
            <div className="relative bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 rounded-2xl shadow-2xl p-4">
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
                    <h3 className="text-white font-black text-2xl">$10,000 USD</h3>
                    <p className="text-white font-bold">FREEROLL DIARIO</p>
                    <p className="text-white/90 text-sm">WPT - Solo con nosotros</p>
                  </div>
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl whitespace-nowrap animate-pulse"
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
            <span className="writing-mode-vertical text-sm font-bold">FREEROLL $10K</span>
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

// Versión alternativa más simple
export const SimpleFloatingAd = () => {
  const [isVisible, setIsVisible] = useState(true)
  
  if (!isVisible) return null
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-24 right-4 z-40 max-w-xs"
    >
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl p-4 shadow-2xl">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
        >
          ✕
        </button>
        
        <div className="text-white text-center">
          <p className="text-3xl font-black mb-1">$10,000 USD</p>
          <p className="font-bold mb-2">FREEROLL DIARIO</p>
          <p className="text-sm mb-3">WPT • SOLO CON NOSOTROS</p>
          <a
            href="https://wa.me/51955311839?text=Quiero%20el%20freeroll%20de%2010000%20USD"
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