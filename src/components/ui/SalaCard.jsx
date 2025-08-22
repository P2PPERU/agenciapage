import { FaWhatsapp, FaStar, FaFire, FaGift, FaUserFriends, FaClock } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState } from 'react'

const SalaCard = ({ sala, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const whatsappNumber = "51955311839"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(sala.whatsappMessage)}`
  
  // Determinar si es una sala destacada
  const isFeatured = sala.featured || index === 0
  
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
      {/* Badge de Destacado */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center"
          >
            <FaFire className="mr-1" />
            DESTACADO
          </motion.div>
        </div>
      )}
      
      {/* Header con gradiente dinámico */}
      <div className={`relative h-40 bg-gradient-to-br ${sala.color} p-6 flex flex-col justify-center items-center`}>
        {/* Overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="text-2xl text-white/20">♠</div>
            ))}
          </div>
        </div>
        
        {/* Logo/Nombre */}
        <motion.h3 
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          className="text-3xl font-black text-white z-10 text-center"
        >
          {sala.name}
        </motion.h3>
        
        {/* Rating */}
        <div className="flex mt-2 z-10">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-sm" />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {/* Rakeback destacado */}
        <div className="bg-gradient-to-r from-poker-gold/20 to-yellow-500/20 border border-poker-gold/50 rounded-xl p-4 mb-4 text-center">
          <p className="text-poker-gold font-bold text-2xl mb-1">{sala.rakeback}</p>
          <p className="text-gray-400 text-sm">+ Bonos Semanales</p>
        </div>
        
        {/* Bonus especial */}
        {sala.bonus && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 flex items-center">
            <FaGift className="text-green-500 mr-2" />
            <span className="text-green-400 text-sm font-semibold">{sala.bonus}</span>
          </div>
        )}
        
        {/* Features mejoradas */}
        <ul className="space-y-3 mb-6">
          {sala.features.map((feature, idx) => (
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
        
        {/* Stats adicionales */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <FaUserFriends className="text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Jugadores</p>
            <p className="text-sm font-bold text-white">{sala.activePlayers || '2.5K+'}</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <FaClock className="text-purple-500 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Pago</p>
            <p className="text-sm font-bold text-white">{sala.paymentTime || '24hrs'}</p>
          </div>
        </div>
        
        {/* CTA Button mejorado */}
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full bg-gradient-to-r from-whatsapp to-green-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <FaWhatsapp className="mr-2 text-xl relative z-10" />
          <span className="relative z-10">JUGAR AHORA</span>
        </motion.a>
        
        {/* Texto de urgencia */}
        {isFeatured && sala.id === 'wpt' && (
          <p className="text-center text-xs text-yellow-400 mt-3 font-bold">
            🏆 FREEROLL DIARIO $10K - $2K PARA EL GANADOR
          </p>
        )}
      </div>
    </motion.div>
  )
}

// Componente de Publicidad para insertar entre las salas
export const AdBanner = ({ type = 'horizontal' }) => {
  const ads = [
    {
      title: "🎯 TORNEO ESPECIAL",
      subtitle: "$10,000 GTD - Este Domingo",
      cta: "REGISTRARME",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "💎 CLUB VIP",
      subtitle: "Rakeback Extra + Beneficios Exclusivos",
      cta: "UNIRME AL VIP",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "🎁 BONO DE BIENVENIDA",
      subtitle: "100% hasta $1000 en tu primer depósito",
      cta: "OBTENER BONO",
      gradient: "from-green-600 to-emerald-600"
    }
  ]
  
  const selectedAd = ads[Math.floor(Math.random() * ads.length)]
  
  if (type === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-full my-8"
      >
        <a 
          href={`https://wa.me/51955311839?text=${encodeURIComponent(`Información sobre: ${selectedAd.title}`)}`}
          className={`block bg-gradient-to-r ${selectedAd.gradient} rounded-2xl p-8 text-center hover:scale-[1.02] transition-transform cursor-pointer`}
        >
          <h3 className="text-3xl font-bold text-white mb-2">{selectedAd.title}</h3>
          <p className="text-xl text-white/90 mb-4">{selectedAd.subtitle}</p>
          <span className="inline-block bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition">
            {selectedAd.cta} →
          </span>
        </a>
      </motion.div>
    )
  }
  
  return null
}

export default SalaCard