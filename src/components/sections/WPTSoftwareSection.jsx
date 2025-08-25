// src/components/sections/WPTSoftwareSection.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaDownload, 
  FaGamepad, 
  FaChartLine, 
  FaUsers, 
  FaTrophy, 
  FaShieldAlt 
} from 'react-icons/fa'

const iconMap = {
  FaGamepad: FaGamepad,
  FaChartLine: FaChartLine,
  FaUsers: FaUsers,
  FaTrophy: FaTrophy,
  FaShieldAlt: FaShieldAlt
}

const WPTSoftwareSection = ({ softwareFeatures, platforms }) => {
  return (
    <motion.div
      key="software"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-3xl font-bold text-white text-center mb-10">
        SOFTWARE DE ÚLTIMA GENERACIÓN
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-yellow-500">Características Premium</h3>
          
          {softwareFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="text-green-500 mt-1">
                {React.createElement(iconMap[feature.iconName])}
              </div>
              <div>
                <h4 className="text-white font-bold">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-yellow-500">Disponible en:</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {platforms.map((platform, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-700 transition"
              >
                <div className="text-4xl mb-2">{platform.icon}</div>
                <h4 className="text-white font-bold">{platform.platform}</h4>
                <p className="text-gray-500 text-xs">{platform.version}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-blue-600/20 to-red-600/20 border border-blue-500 rounded-xl p-6">
            <h4 className="text-white font-bold mb-3">🎮 Requisitos Mínimos:</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Procesador: Intel Core i3 o equivalente</li>
              <li>• RAM: 4GB mínimo (8GB recomendado)</li>
              <li>• Espacio: 2GB disponible</li>
              <li>• Internet: Conexión estable de 10 Mbps+</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <a
          href="https://wa.me/51955311839?text=Quiero%20descargar%20WPT%20Global"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold px-8 py-4 rounded-full text-xl hover:scale-105 transition"
        >
          <FaDownload className="mr-3" />
          DESCARGAR WPT GLOBAL
        </a>
      </div>
    </motion.div>
  )
}

export default WPTSoftwareSection