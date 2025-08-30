import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFire, FaTimes } from 'react-icons/fa'

const UrgencyBanner = () => {
  const [currentOffer, setCurrentOffer] = useState(0)
  const [playersToday, setPlayersToday] = useState(17)
  const [playersOnline, setPlayersOnline] = useState(+1000)
  const [isVisible, setIsVisible] = useState(true)

  const specialOffers = [
    {
      id: 'freeroll-wpt',
      title: '💰 FREEROLL $10,000',
      subtitle: 'TODOS LOS DÍAS en WPT - Solo nuevos jugadores'
    },
    {
      id: 'mega-rakeback',
      title: '⭐ 65% RAKEBACK',
      subtitle: 'Máximo rakeback en PPPOKER - Cupos limitados'
    },
    {
      id: 'jackpot-xpoker',
      title: '🎰 JACKPOT S/100,421',
      subtitle: 'Bad Beat Jackpot en X-POKER - Puede caer HOY'
    }
  ]

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % specialOffers.length)
    }, 5000)

    const playerInterval = setInterval(() => {
      setPlayersToday(prev => prev + Math.floor(Math.random() * 3))
      setPlayersOnline(prev => prev + Math.floor(Math.random() * 10) - 5)
    }, 30000)

    return () => {
      clearInterval(interval)
      clearInterval(playerInterval)
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    // Opcional: Reaparece después de 5 minutos
    setTimeout(() => {
      setIsVisible(true)
    }, 300000) // 5 minutos
  }

  const offer = specialOffers[currentOffer]

  if (!isVisible) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={offer.id}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-gradient-to-r from-red-600 to-orange-500 py-2 px-4 fixed top-16 w-full z-50 shadow-lg"
      >
        <div className="container mx-auto flex items-center justify-between relative">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaFire className="text-yellow-300" />
            </motion.div>
            <span className="text-white font-bold text-sm md:text-base">
              {offer.title} - {offer.subtitle}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white text-xs md:text-sm hidden sm:inline">
              🔥 {playersToday} jugadores hoy | 🟢 {playersOnline.toLocaleString()} online
            </span>
            <a
              href={`https://wa.me/51955311839?text=${encodeURIComponent(`Quiero la oferta: ${offer.title}`)}`}
              className="bg-white text-red-600 px-3 py-1 rounded-full font-bold text-xs hover:scale-105 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              OBTENER
            </a>
            
            {/* Botón de cerrar */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/80 hover:text-white transition-colors ml-2 p-1 rounded-full hover:bg-white/10"
              title="Cerrar banner"
            >
              <FaTimes className="text-sm" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default UrgencyBanner