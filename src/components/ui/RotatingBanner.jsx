import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFire, FaTrophy, FaGift, FaCoins, FaTimes } from 'react-icons/fa'

const RotatingBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  
  // Mensajes promocionales con sus estilos
  const promotions = [
    {
      id: 'wpt',
      room: 'WPT POKER',
      message: '100% DE BONO DE DEPÓSITO + TICKETS DE TORNEOS + FREEROLL',
      gradient: 'from-yellow-500 via-yellow-600 to-orange-600',
      icon: <FaTrophy className="text-2xl" />,
      symbols: '♠ ♥',
      whatsappMsg: 'Quiero el bono 100% de WPT POKER + tickets de torneos'
    },
    {
      id: 'xpoker',
      room: 'X-POKER',
      message: 'RAKEBACK AL 60% + JACKPOT GIGANTE',
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      icon: <FaCoins className="text-2xl" />,
      symbols: '♦ ♣',
      whatsappMsg: 'Quiero el 60% rakeback de X-POKER y el jackpot gigante'
    },
    {
      id: 'pppoker',
      room: 'PPPOKER',
      message: 'MEJORES MESAS DE OMAHA Y TORNEOS',
      gradient: 'from-red-500 via-red-600 to-red-700',
      icon: <FaGift className="text-2xl" />,
      symbols: '♠ ♦',
      whatsappMsg: 'Quiero jugar Omaha en PPPOKER'
    }
  ]
  
  // Rotar entre promociones cada 8 segundos (más tiempo)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length)
    }, 8000) // Aumentado de 5 a 8 segundos
    
    return () => clearInterval(interval)
  }, [])
  
  const currentPromo = promotions[currentIndex]
  const whatsappUrl = `https://wa.me/51955311839?text=${encodeURIComponent(currentPromo.whatsappMsg)}`
  
  if (!isVisible) return null
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPromo.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1, // Transición más lenta y suave
            ease: "easeInOut"
          }}
          className={`bg-gradient-to-r ${currentPromo.gradient} shadow-lg`}
        >
          <div className="relative overflow-hidden">
            {/* Fondo con símbolos estáticos (sin movimiento mareador) */}
            <div className="absolute inset-0 opacity-10">
              <div className="flex items-center justify-around h-full">
                {[...Array(10)].map((_, i) => (
                  <motion.span 
                    key={i} 
                    className="text-4xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {currentPromo.symbols}
                  </motion.span>
                ))}
              </div>
            </div>
            
            {/* Contenido principal */}
            <div className="relative container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                {/* Sección izquierda - Icono con animación suave */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="hidden sm:block text-white"
                >
                  {currentPromo.icon}
                </motion.div>
                
                {/* Sección central - Mensaje estático o con animación muy suave */}
                <div className="flex-1 mx-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-2"
                  >
                    <span className="text-white font-black text-sm md:text-lg flex items-center gap-2">
                      <FaFire className="text-yellow-300" />
                      <span className="bg-black/20 px-3 py-1 rounded">
                        {currentPromo.room}
                      </span>
                      <span className="hidden md:inline">
                        {currentPromo.message}
                      </span>
                      <span className="md:hidden">
                        {currentPromo.message.substring(0, 30)}...
                      </span>
                    </span>
                  </motion.div>
                </div>
                
                {/* Sección derecha - CTA y cerrar */}
                <div className="flex items-center gap-2">
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/20 backdrop-blur text-white font-bold px-3 md:px-6 py-2 rounded-full hover:bg-white/30 transition-all text-xs md:text-sm whitespace-nowrap"
                  >
                    ACTIVAR OFERTA
                  </motion.a>
                  
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-white/70 hover:text-white transition p-1"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Indicadores de promoción con transición suave */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1 pb-1">
              {promotions.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: index === currentIndex ? 1 : 0.3,
                    scale: index === currentIndex ? 1.2 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className={`h-1 w-8 rounded-full bg-white`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Versión alternativa ultra simple sin animaciones mareadores
export const SimpleFadeBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  
  const messages = [
    { 
      text: 'WPT POKER: 100% BONO + TICKETS + FREEROLL', 
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      room: 'WPT'
    },
    { 
      text: 'X-POKER: 60% RAKEBACK + JACKPOT', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      room: 'X-POKER'
    },
    { 
      text: 'PPPOKER: MEJORES MESAS OMAHA', 
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      room: 'PPP'
    }
  ]
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 10000) // 10 segundos por mensaje
    return () => clearInterval(timer)
  }, [])
  
  if (!isVisible) return null
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className={`${messages[currentIndex].color} text-white py-3 text-center font-bold fixed top-0 left-0 right-0 z-50`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="flex-1">
            🔥 {messages[currentIndex].text}
          </span>
          <div className="flex items-center gap-2">
            <a 
              href={`https://wa.me/51955311839?text=Quiero info de ${messages[currentIndex].room}`}
              className="bg-white/20 px-4 py-1 rounded-full text-sm hover:bg-white/30 transition"
            >
              ACTIVAR
            </a>
            <button onClick={() => setIsVisible(false)} className="text-white/70 hover:text-white">
              <FaTimes size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default RotatingBanner