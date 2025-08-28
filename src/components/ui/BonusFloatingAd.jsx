import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaGift, FaPercentage, FaCrown } from 'react-icons/fa'

const BonusFloatingAd = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  // Mostrar después de 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Reaparece en 90s
    setTimeout(() => {
      setIsVisible(true)
    }, 90000)
  }

  const whatsappMessage = encodeURIComponent(
    `¡Hola! Me interesa activar el BONUS del 200%. 
¿Me explican cómo funciona el sistema de liberación (cada S/5 de rake libero S/3 de bono)?`
  )
  const whatsappUrl = `https://wa.me/51955311839?text=${whatsappMessage}`

  return (
    <>
      {/* --- Desktop Version --- */}
      <AnimatePresence>
        {isVisible && !isMinimized && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-40 w-72"
          >
            <div className="relative rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-red-600 via-purple-700 to-blue-800">
              
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

              {/* Fondo decorativo */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute top-10 left-6 text-4xl text-white/40"
                >
                  🂡
                </motion.div>
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-12 right-6 text-3xl text-yellow-200/30"
                >
                  🃁
                </motion.div>
              </div>

              {/* Contenido */}
              <div className="relative p-5">
                {/* Cerrar */}
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 text-white/70 hover:text-white transition text-sm"
                >
                  <FaTimes />
                </button>

                {/* Badge */}
                <div className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-black mb-3">
                  <FaCrown className="mr-1 text-sm" />
                  VIP EXCLUSIVO
                </div>

                {/* Título */}
                <div className="text-center mb-4">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center justify-center mb-2"
                  >
                    <span className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 bg-clip-text">
                      200
                    </span>
                    <FaPercentage className="text-2xl text-yellow-400 ml-1" />
                  </motion.div>
                  
                  <p className="text-lg font-bold text-white">
                    Duplica tu primer depósito
                  </p>
                  <p className="text-sm text-yellow-300 font-medium">
                    Libera tu bono jugando
                  </p>
                </div>

                {/* Sistema de liberación */}
                <div className="bg-black/40 backdrop-blur rounded-lg p-3 border border-yellow-400/40 text-center mb-4">
                  <p className="text-sm text-white font-semibold">
                    Por cada <span className="text-yellow-300">S/5</span> de rake
                  </p>
                  <p className="text-sm text-yellow-300 font-bold">
                    liberas S/3 de bono
                  </p>
                </div>

                {/* CTA */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ boxShadow: ["0 0 10px rgba(255,215,0,0.4)", "0 0 25px rgba(255,215,0,0.7)", "0 0 10px rgba(255,215,0,0.4)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="block w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-extrabold py-3 rounded-lg text-center border border-yellow-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaGift className="animate-bounce" />
                    Activar Bonus en WhatsApp
                  </span>
                </motion.a>

                {/* Urgencia */}
                <motion.p 
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-yellow-300 text-xs text-center mt-2 font-semibold"
                >
                  ⚡ Oferta exclusiva – disponible esta semana ⚡
                </motion.p>
              </div>
            </div>

            {/* Minimizar */}
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute -right-8 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-r-lg shadow-lg text-sm"
            >
              ←
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Mobile Version --- */}
      <AnimatePresence>
        {isVisible && !isMinimized && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="md:hidden fixed bottom-2 left-2 right-2 z-40"
          >
            <div className="relative rounded-xl shadow-2xl p-3 bg-gradient-to-br from-red-600 via-purple-700 to-blue-800">
              <button
                onClick={handleClose}
                className="absolute -top-1 -right-1 bg-black/70 text-white rounded-full p-1"
              >
                <FaTimes size={12} />
              </button>

              <div className="flex items-center gap-3">
                {/* Info */}
                <div className="flex-1">
                  <div className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-black mb-2">
                    <FaCrown className="mr-1 text-xs" />
                    VIP
                  </div>
                  
                  <div className="flex items-center gap-1 mb-1">
                    <motion.span 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl font-black text-transparent bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text"
                    >
                      200
                    </motion.span>
                    <FaPercentage className="text-lg text-yellow-400" />
                  </div>
                  
                  <p className="text-white font-bold text-sm">Duplica tu depósito</p>
                  <p className="text-yellow-300 text-xs font-medium">Cada S/5 → S/3 bono</p>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={{ boxShadow: ["0 0 8px rgba(255,215,0,0.5)", "0 0 15px rgba(255,215,0,0.8)", "0 0 8px rgba(255,215,0,0.5)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold py-2 px-3 rounded-lg border border-yellow-300 text-sm"
                  >
                    <FaGift className="animate-bounce mb-1" />
                    Activar ahora
                  </motion.a>
                  
                  <motion.p 
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-yellow-300 text-xs mt-1 font-bold"
                  >
                    ⏳ Cupos limitados
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Botón Minimizado --- */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsMinimized(false)}
            className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white p-4 rounded-r-xl shadow-2xl items-center gap-2 border-l-4 border-yellow-400"
          >
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaCrown className="text-xl text-yellow-300" />
            </motion.div>
            <motion.span 
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: [
                  "0 0 5px rgba(255,215,0,0.5)", 
                  "0 0 15px rgba(255,215,0,0.8)", 
                  "0 0 5px rgba(255,215,0,0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="writing-mode-vertical text-2xl font-black text-transparent bg-gradient-to-b from-yellow-300 via-yellow-500 to-orange-400 bg-clip-text"
            >
              200%
            </motion.span>
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

// --- Mini versión ---
export const MiniBonusAd = () => {
  const [isVisible, setIsVisible] = useState(true)
  if (!isVisible) return null

  const whatsappMessage = encodeURIComponent(`Quiero activar el BONUS VIP del 200%`)
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-24 left-4 z-40 w-48"
    >
      <div className="rounded-lg p-3 shadow-2xl bg-gradient-to-br from-red-600 via-purple-700 to-blue-800 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
          ✕
        </button>
        
        <div className="text-center text-white">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-black mb-2 inline-block">
            VIP
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="text-3xl font-black text-transparent bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text">200</span>
            <FaPercentage className="text-sm text-yellow-400" />
          </div>
          <p className="text-xs text-yellow-300 mb-2">Cada S/5 → S/3 bono</p>
          <a
            href={`https://wa.me/51955311839?text=${whatsappMessage}`}
            className="block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-2 px-3 rounded text-sm"
          >
            Activar Bonus
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default BonusFloatingAd