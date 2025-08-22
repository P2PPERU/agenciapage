import { FaWhatsapp, FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'

const SalaCard = ({ sala, index }) => {
  const whatsappNumber = "59170000000" // TU NÚMERO
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(sala.whatsappMessage)}`
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl"
    >
      {/* Resto del código igual... */}
      <div className={`h-32 bg-gradient-to-r ${sala.color} flex items-center justify-center`}>
        <h3 className="text-3xl font-bold text-white">{sala.name}</h3>
      </div>
      
      <div className="p-6">
        <div className="bg-poker-gold text-black font-bold text-center py-3 px-4 rounded-lg mb-4">
          <FaStar className="inline mr-2" />
          {sala.rakeback}
        </div>
        
        <p className="text-poker-green font-semibold mb-4">{sala.bonus}</p>
        
        <ul className="space-y-2 mb-6">
          {sala.features.map((feature, idx) => (
            <li key={idx} className="text-gray-300 flex items-start">
              <span className="text-poker-gold mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-whatsapp hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <FaWhatsapp className="mr-2" size={20} />
          JUGAR AHORA
        </a>
      </div>
    </motion.div>
  )
}

export default SalaCard