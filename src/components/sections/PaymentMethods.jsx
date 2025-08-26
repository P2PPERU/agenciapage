import React from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaBolt, FaClock, FaShieldAlt, FaUniversity, FaArrowRight, FaStar, FaWhatsapp } from 'react-icons/fa'

const PaymentMethodsEnhanced = () => {
  // Métodos rápidos (sin Bitcoin, con Yape, Plin y USDT más discretos)
  const quickMethods = [
    { 
      id: 'yape',
      name: 'YAPE', 
      icon: '💜',
      time: '1 min',
      highlight: 'POPULAR',
      color: 'from-purple-600 to-purple-700',
      features: 'SIN COMISIONES'
    },
    { 
      id: 'plin',
      name: 'PLIN', 
      icon: '💚',
      time: 'Instantáneo',
      highlight: 'RÁPIDO',
      color: 'from-teal-500 to-teal-600',
      features: 'SIN COMISIONES'
    },
    { 
      id: 'usdt',
      name: 'USDT', 
      icon: '💵',
      time: 'Instantáneo',
      highlight: 'BINANCE',
      color: 'from-green-600 to-emerald-700',
      features: '1:1'
    }
  ]

  const banks = [
    { id: 'bcp', name: 'BCP', logo: '/logos/bcp.png', fullName: 'Banco de Crédito del Perú', color: 'from-blue-600 to-blue-800', marketShare: '#1 en Perú' },
    { id: 'bbva', name: 'BBVA', logo: '/logos/bbva.png', fullName: 'BBVA Continental', color: 'from-blue-500 to-blue-700', marketShare: 'Líder digital' },
    { id: 'interbank', name: 'Interbank', logo: '/logos/interbank.png', fullName: 'Interbank', color: 'from-green-600 to-green-800', marketShare: 'Innovación' },
    { id: 'scotiabank', name: 'Scotiabank', logo: '/logos/scotiabank.png', fullName: 'Scotiabank Perú', color: 'from-red-500 to-red-700', marketShare: 'Internacional' }
  ]

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-4 py-2 mb-4">
            <FaBolt className="text-yellow-400 mr-2 text-sm" />
            <span className="text-yellow-400 font-semibold text-sm">DEPÓSITOS INSTANTÁNEOS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-400 mb-4">
            DEPOSITA Y RETIRA
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              AL INSTANTE
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Los métodos más rápidos y seguros del mercado peruano
          </p>
        </motion.div>

        {/* Métodos rápidos */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-white/20 shadow-2xl">
            <div className="relative z-10">
              <div className="mb-12">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 flex items-center justify-center">
                    <span className="text-2xl mr-2">⚡</span>
                    MÉTODOS INSTANTÁNEOS
                  </h3>
                  <p className="text-gray-400 text-sm">Deposita desde S/10 y retira en minutos</p>
                </div>

                {/* Desktop */}
                <div className="hidden md:grid md:grid-cols-3 gap-4 mb-6">
                  {quickMethods.map((method, index) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="group cursor-pointer"
                    >
                      <div className={`bg-gradient-to-br ${method.color} rounded-xl p-4 relative overflow-hidden h-full shadow-lg`}>
                        <div className="absolute -top-1 -right-1 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                          {method.highlight}
                        </div>
                        <div className="text-white">
                          <div className="flex items-center mb-3">
                            <span className="text-base mr-2">{method.icon}</span>
                            <div>
                              <h4 className="font-black text-sm">{method.name}</h4>
                              <p className="text-xs opacity-80 flex items-center">
                                <FaClock className="mr-1" />
                                {method.time}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white/20 rounded-lg px-2 py-1 text-xs font-bold text-center mb-2">
                            {method.features}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile carrusel */}
                <div className="md:hidden">
                  <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {quickMethods.map((method, index) => (
                      <motion.div
                        key={method.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer flex-shrink-0 w-48"
                      >
                        <div className={`bg-gradient-to-br ${method.color} rounded-xl p-4 relative overflow-hidden shadow-lg h-28`}>
                          <div className="absolute -top-1 -right-1 bg-yellow-400 text-black px-1.5 py-0.5 rounded-full text-xs font-bold">
                            {method.highlight}
                          </div>
                          <div className="text-white h-full flex flex-col justify-between">
                            <div className="flex items-center">
                              <span className="text-base mr-2">{method.icon}</span>
                              <div>
                                <h4 className="font-black text-sm">{method.name}</h4>
                                <p className="text-xs opacity-80">{method.time}</p>
                              </div>
                            </div>
                            <div className="bg-white/20 rounded px-2 py-1 text-xs font-bold text-center">
                              {method.features}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-2">
                    ← Desliza para ver más →
                  </div>
                </div>

                {/* CTA */}
                <motion.div className="text-center" whileHover={{ scale: 1.02 }}>
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black py-3 px-6 md:px-8 rounded-xl text-sm md:text-lg hover:shadow-xl hover:shadow-yellow-400/30 transition-all duration-300 flex items-center mx-auto">
                    <FaWhatsapp className="mr-2" />
                    EMPEZAR AHORA - S/10
                  </button>
                </motion.div>
              </div>

              <div className="border-t border-gray-600/30 mb-8"></div>

              {/* Bancos */}
              <div>
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl md:rounded-2xl mb-4 shadow-2xl"
                  >
                    <FaUniversity className="text-white text-lg md:text-2xl" />
                  </motion.div>
                  <h3 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
                    Transferencias Bancarias
                  </h3>
                  <p className="text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
                    BANCOS PRINCIPALES DEL PERÚ
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  {banks.map((bank, index) => (
                    <motion.div
                      key={bank.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      className="group relative"
                    >
                      <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                        <img src={bank.logo} alt={bank.name} className="h-6 md:h-8 w-auto object-contain mb-3" />
                        <h4 className="font-black text-gray-800 text-sm md:text-base mb-1 group-hover:text-blue-700 transition-colors">
                          {bank.name}
                        </h4>
                        <p className="text-xs text-gray-600 font-semibold bg-gray-100 px-2 py-0.5 rounded-full">
                          {bank.marketShare}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Garantías finales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center text-sm">
                <FaShieldAlt className="text-green-400 mr-2" />
                <span className="text-white font-bold">100% SEGURO</span>
              </div>
              <div className="flex items-center text-sm">
                <FaBolt className="text-yellow-400 mr-2" />
                <span className="text-white font-bold">DEPÓSITOS EN 1 MIN</span>
              </div>
              <div className="flex items-center text-sm">
                <FaStar className="text-blue-400 mr-2" />
                <span className="text-white font-bold">SIN COMISIONES</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default PaymentMethodsEnhanced
