import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFire } from 'react-icons/fa'

const UrgencyBanner = () => {
  const [currentOffer, setCurrentOffer] = useState(0)
  const [playersToday, setPlayersToday] = useState(17)
  const [playersOnline, setPlayersOnline] = useState(5847)
  
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
      title: '🎰 JACKPOT S/523,421',
      subtitle: 'Bad Beat Jackpot en X-POKER - Puede caer HOY'
    }
  ]
  
  useEffect(() => {
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
  }, [])
  
  const offer = specialOffers[currentOffer]
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={offer.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-gradient-to-r from-red-600 to-orange-500 py-2 px-4 fixed top-0 w-full z-50"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FaFire className="text-yellow-300 animate-pulse" />
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
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default UrgencyBanner