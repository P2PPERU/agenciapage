// src/components/ui/RotatingBanner.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFire, FaTrophy, FaGift, FaCoins, FaTimes, FaChevronDown, FaWhatsapp } from 'react-icons/fa'

const RotatingBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const promotions = [
    {
      id: 'wpt',
      room: 'WPT POKER',
      message: '100% DE BONO DE DEPÓSITO + TICKETS DE TORNEOS + FREEROLL',
      mobileMessage: '100% BONO + TICKETS + FREEROLL',
      shortMessage: '100% BONO',
      gradient: 'from-yellow-500 via-yellow-600 to-orange-600',
      icon: <FaTrophy className="text-xl md:text-2xl" />,
      symbols: '♠ ♥',
      whatsappMsg: 'Quiero el bono 100% de WPT POKER + tickets de torneos'
    },
    {
      id: 'xpoker',
      room: 'X-POKER',
      message: 'RAKEBACK AL 60% + JACKPOT GIGANTE',
      mobileMessage: '60% RAKEBACK + JACKPOT',
      shortMessage: '60% RAKEBACK',
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      icon: <FaCoins className="text-xl md:text-2xl" />,
      symbols: '♦ ♣',
      whatsappMsg: 'Quiero el 60% rakeback de X-POKER y el jackpot gigante'
    },
    {
      id: 'pppoker',
      room: 'PPPOKER',
      message: 'MEJORES MESAS DE OMAHA Y TORNEOS',
      mobileMessage: 'MEJORES MESAS OMAHA',
      shortMessage: 'MESAS OMAHA',
      gradient: 'from-red-500 via-red-600 to-red-700',
      icon: <FaGift className="text-xl md:text-2xl" />,
      symbols: '♠ ♦',
      whatsappMsg: 'Quiero jugar Omaha en PPPOKER'
    }
  ]

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Rotación automática para desktop
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % promotions.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isMobile])

  const currentPromo = promotions[currentIndex]
  const whatsappUrl = `https://wa.me/51955311839?text=${encodeURIComponent(currentPromo.whatsappMsg)}`

  if (!isVisible) return null

  // VERSION MÓVIL
  if (isMobile) {
    return (
      <div className="fixed top-16 left-0 right-0 z-45">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPromo.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-r ${currentPromo.gradient} shadow-lg relative overflow-hidden`}
          >
            {/* Fondo símbolos para móvil */}
            <div className="absolute inset-0 opacity-5">
              <div className="flex items-center justify-around h-full">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-2xl">
                    {currentPromo.symbols}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Banner compacto */}
              <motion.div
                onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                className="cursor-pointer px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-white">
                      {currentPromo.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs">
                        {currentPromo.room}
                      </span>
                      <span className="text-white/90 font-medium text-xs">
                        {currentPromo.shortMessage}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: isMobileExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="text-white text-sm" />
                    </motion.div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsVisible(false)
                      }}
                      className="text-white/70 hover:text-white"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Panel expandido */}
              <AnimatePresence>
                {isMobileExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-white/20 bg-black/10"
                  >
                    <div className="p-4">
                      <div className="text-center mb-4">
                        <p className="text-white font-medium text-sm mb-2">
                          {currentPromo.mobileMessage}
                        </p>
                      </div>
                      
                      {/* Selector de ofertas para móvil */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {promotions.map((promo, index) => (
                          <motion.button
                            key={promo.id}
                            onClick={() => setCurrentIndex(index)}
                            whileTap={{ scale: 0.95 }}
                            className={`p-2 rounded-lg text-xs font-medium transition-all ${
                              index === currentIndex
                                ? 'bg-white text-gray-800'
                                : 'bg-white/20 text-white'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <div className="text-sm">
                                {promo.icon}
                              </div>
                              <span>{promo.room}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Botón de WhatsApp */}
                      <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-green-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                      >
                        <FaWhatsapp />
                        ACTIVAR OFERTA
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  // VERSION DESKTOP (original mejorada)
  return (
    <div className="fixed top-10 left-0 right-0 z-45">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPromo.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className={`bg-gradient-to-r ${currentPromo.gradient} shadow-lg min-h-[90px] flex items-center`}
        >
          <div className="relative w-full overflow-hidden">
            
            {/* Fondo símbolos */}
            <div className="absolute inset-0 opacity-10">
              <div className="flex items-center justify-around h-full">
                {[...Array(12)].map((_, i) => (
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
            <div className="relative container mx-auto px-6 py-5">
              <div className="flex items-center justify-between gap-4">

                {/* Icono */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white"
                >
                  {currentPromo.icon}
                </motion.div>

                {/* Texto */}
                <div className="flex-1 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <FaFire className="text-yellow-300 text-xl" />
                    <span className="bg-black/20 px-4 py-2 rounded font-black text-white text-lg">
                      {currentPromo.room}
                    </span>
                    <span className="text-white font-black text-lg">
                      {currentPromo.message}
                    </span>
                  </motion.div>
                </div>

                {/* Botones */}
                <div className="flex items-center gap-3">
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/20 backdrop-blur text-white font-bold px-8 py-3 rounded-full hover:bg-white/30 transition-all text-sm flex items-center gap-2"
                  >
                    <FaWhatsapp />
                    ACTIVAR OFERTA
                  </motion.a>
                  
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-white/70 hover:text-white transition p-2"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              {promotions.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: index === currentIndex ? 1 : 0.3,
                    scale: index === currentIndex ? 1.2 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-2 w-10 rounded-full bg-white hover:bg-white/80 cursor-pointer"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default RotatingBanner