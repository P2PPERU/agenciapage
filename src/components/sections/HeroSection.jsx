import { useState, useEffect } from 'react'
import { FaTrophy, FaMoneyBillWave, FaHeadphones, FaUsers, FaChartLine, FaClock } from 'react-icons/fa'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const [activePlayerCount, setActivePlayerCount] = useState(10453)
  
  // Simular jugadores activos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayerCount(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background (opcional) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-poker-black via-gray-900 to-poker-black"></div>
        {/* Patrón de cartas de poker */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-4 rotate-12 scale-150">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="text-6xl">
                {i % 4 === 0 && '♠'}
                {i % 4 === 1 && '♥'}
                {i % 4 === 2 && '♦'}
                {i % 4 === 3 && '♣'}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contenido Principal */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge Animado */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-8"
          >
            <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <span className="text-yellow-500 font-semibold">
              {activePlayerCount.toLocaleString()} jugadores activos ahora
            </span>
          </motion.div>
          
          {/* Título Principal con Efecto Degradado */}
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="block text-white mb-2"
            >
              <span className="text-3xl md:text-5xl text-poker-gold/50">♠ ♥ ♦ ♣</span>
              <br />
              TU AGENTE DE
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="block bg-gradient-to-r from-poker-gold via-yellow-400 to-poker-gold bg-clip-text text-transparent"
            >
              POKER ONLINE #1
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto"
          >
            Rakeback garantizado hasta <span className="text-poker-gold font-bold">60%</span> + 
            Bonos exclusivos + Pagos puntuales
          </motion.p>
          
          {/* Estadísticas Mejoradas */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-poker-gold transition-all">
              <FaTrophy className="text-poker-gold text-2xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-sm text-gray-400">Años de Experiencia</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-poker-green transition-all">
              <FaMoneyBillWave className="text-poker-green text-2xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">$547K+</div>
              <div className="text-sm text-gray-400">Pagado en Rakeback</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-blue-500 transition-all">
              <FaUsers className="text-blue-500 text-2xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{(activePlayerCount / 1000).toFixed(1)}K+</div>
              <div className="text-sm text-gray-400">Jugadores Activos</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition-all">
              <FaClock className="text-purple-500 text-2xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400">Soporte Premium</div>
            </div>
          </motion.div>
          
          {/* CTAs Mejorados */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href={`https://wa.me/51955311839?text=${encodeURIComponent('Hola, quiero empezar a jugar poker online con rakeback')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-200 bg-gradient-to-r from-poker-gold to-yellow-500 rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
            >
              <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-poker-gold to-yellow-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
              <span className="relative flex items-center">
                <FaMoneyBillWave className="mr-2" />
                COMENZAR A GANAR
              </span>
            </a>
            
            <a 
              href="#calculator"
              className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-gray-700 rounded-full hover:bg-gray-800 hover:border-poker-gold hover:scale-105"
            >
              <FaChartLine className="mr-2" />
              CALCULAR GANANCIAS
            </a>
          </motion.div>
          
          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Licencia Verificada
            </div>
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Seguro SSL
            </div>
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Pagos Garantizados
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Indicador de Scroll Animado */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-poker-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

export default HeroSection