import { FaWhatsapp, FaStar, FaFire, FaGift, FaUserFriends, FaClock, FaChartLine, FaPercent } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState } from 'react'

const SalaCard = ({ sala, index, viewMode = 'compact' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const whatsappNumber = "51955311839"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(sala.whatsappMessage)}`
  
  const isFeatured = sala.featured || index === 0
  
  // Vista Compacta
  if (viewMode === 'compact') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all ${
          isFeatured ? 'ring-2 ring-poker-gold' : ''
        }`}
      >
        {/* Badge Destacado */}
        {isFeatured && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
              <FaFire className="mr-1" size={10} />
              HOT
            </div>
          </div>
        )}
        
        {/* Header Compacto */}
        <div className={`relative h-20 bg-gradient-to-br ${sala.color} p-3 flex items-center justify-center`}>
          <h3 className="text-xl font-black text-white text-center">
            {sala.name}
          </h3>
        </div>
        
        <div className="p-3">
          {/* Rakeback en línea */}
          <div className="flex items-center justify-between mb-2 bg-gradient-to-r from-poker-gold/10 to-yellow-500/10 rounded-lg px-2 py-1">
            <FaPercent className="text-poker-gold text-sm" />
            <span className="text-poker-gold font-bold text-sm">{sala.rakeback}</span>
          </div>
          
          {/* Rating */}
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-xs ${i < Math.floor(sala.rating || 4) ? 'text-yellow-400' : 'text-gray-600'}`} />
            ))}
          </div>
          
          {/* Features Mini (solo 2) */}
          <ul className="space-y-1 mb-3 text-xs">
            {sala.features.slice(0, 2).map((feature, idx) => (
              <li key={idx} className="text-gray-400 truncate">
                • {feature}
              </li>
            ))}
          </ul>
          
          {/* Stats Mini */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="text-center">
              <FaUserFriends className="text-blue-500 mx-auto mb-1" size={14} />
              <p className="text-gray-400">{sala.activePlayers || '2K+'}</p>
            </div>
            <div className="text-center">
              <FaClock className="text-purple-500 mx-auto mb-1" size={14} />
              <p className="text-gray-400">{sala.paymentTime || '24h'}</p>
            </div>
          </div>
          
          {/* CTA Compacto */}
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-whatsapp to-green-600 text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center text-sm transition-all"
          >
            <FaWhatsapp className="mr-1" size={16} />
            VER MÁS
          </motion.a>
        </div>
      </motion.div>
    )
  }
  
  // Vista Completa (Original pero optimizada)
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className={`relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl overflow-hidden shadow-2xl ${
        isFeatured ? 'ring-2 ring-poker-gold' : ''
      }`}
    >
      {/* Contenido completo como antes */}
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
      
      <div className={`relative h-32 bg-gradient-to-br ${sala.color} p-6 flex flex-col justify-center items-center`}>
        <h3 className="text-2xl font-black text-white z-10 text-center">
          {sala.name}
        </h3>
        <div className="flex mt-2 z-10">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-sm" />
          ))}
        </div>
      </div>
      
      <div className="p-5">
        <div className="bg-gradient-to-r from-poker-gold/20 to-yellow-500/20 border border-poker-gold/50 rounded-xl p-3 mb-4 text-center">
          <p className="text-poker-gold font-bold text-xl mb-1">{sala.rakeback}</p>
          <p className="text-gray-400 text-xs">+ Bonos Semanales</p>
        </div>
        
        {sala.bonus && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 mb-3 flex items-center">
            <FaGift className="text-green-500 mr-2" size={14} />
            <span className="text-green-400 text-xs font-semibold">{sala.bonus}</span>
          </div>
        )}
        
        <ul className="space-y-2 mb-4">
          {sala.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <svg className="w-4 h-4 text-poker-green mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-whatsapp to-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center transition-all"
        >
          <FaWhatsapp className="mr-2 text-lg" />
          JUGAR AHORA
        </motion.a>
      </div>
    </motion.div>
  )
}

export default SalaCard