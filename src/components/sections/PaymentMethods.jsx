import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCheckCircle, FaBolt, FaClock, FaShieldAlt, FaUniversity, FaArrowRight, 
  FaStar, FaWhatsapp, FaMobile, FaCreditCard, FaBitcoin, FaEye, 
  FaChevronRight, FaGift 
} from 'react-icons/fa'

const PaymentMethodsEnhanced = () => {
  const [activeTab, setActiveTab] = useState('instant')

  // Métodos de pago organizados por categorías
  const paymentCategories = {
    instant: {
      title: 'MÉTODOS INSTANTÁNEOS',
      subtitle: 'Deposita y juega en segundos',
      methods: [
        {
          id: 'yape',
          name: 'YAPE',
          icon: '/logos/yape.png',
          time: '30 segundos',
          limit: 'S/10 - S/3,500',
          fee: 'GRATIS',
          popularity: 95,
          features: ['Sin comisiones', 'Disponible 24/7', 'Confirmación automática'],
          color: 'from-purple-500 via-purple-600 to-purple-700',
          hasLogo: true
        },
        {
          id: 'plin',
          name: 'PLIN',
          icon: '/logos/plin.png',
          time: 'Instantáneo',
          limit: 'S/10 - S/3,500',
          fee: 'GRATIS',
          popularity: 90,
          features: ['Multi-banco', 'Super rápido', 'Sin límites diarios'],
          color: 'from-teal-500 via-teal-600 to-emerald-600',
          hasLogo: true
        },
        {
          id: 'usdt',
          name: 'USDT',
          icon: '/logos/usdt.png',
          time: '2-5 minutos',
          limit: '$10 - Sin límite',
          fee: 'GRATIS',
          popularity: 85,
          features: ['Tasa 1:1', 'Binance Pay', 'Crypto seguro'],
          color: 'from-green-500 via-green-600 to-emerald-700',
          hasLogo: true
        }
      ]
    },
    banks: {
      title: 'TRANSFERENCIAS BANCARIAS',
      subtitle: 'Bancos principales del Perú',
      methods: [
        {
          id: 'bcp',
          name: 'BCP',
          icon: '/logos/bcp.png',
          time: '1-4 horas',
          limit: 'S/20 - Sin límite',
          fee: 'GRATIS',
          popularity: 100,
          features: ['Banco #1', 'Más confiable', 'Red nacional'],
          color: 'from-blue-600 to-blue-800',
          isBank: true
        },
        {
          id: 'bbva',
          name: 'BBVA',
          icon: '/logos/bbva.png',
          time: '1-4 horas',
          limit: 'S/20 - Sin límite',
          fee: 'GRATIS',
          popularity: 90,
          features: ['Líder digital', 'App moderna', 'Soporte 24/7'],
          color: 'from-blue-500 to-blue-700',
          isBank: true
        },
        {
          id: 'interbank',
          name: 'Interbank',
          icon: '/logos/interbank.png',
          time: '1-4 horas',
          limit: 'S/20 - Sin límite',
          fee: 'GRATIS',
          popularity: 85,
          features: ['Innovador', 'Tecnología', 'Procesamiento rápido'],
          color: 'from-green-600 to-green-800',
          isBank: true
        },
        {
          id: 'scotiabank',
          name: 'Scotiabank',
          icon: '/logos/scotiabank.png',
          time: '1-4 horas',
          limit: 'S/20 - Sin límite',
          fee: 'GRATIS',
          popularity: 80,
          features: ['Internacional', 'Seguro', 'Confiable'],
          color: 'from-red-500 to-red-700',
          isBank: true
        }
      ]
    }
  }

  const currentMethods = paymentCategories[activeTab].methods

  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background abstracto */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-full blur-3xl"></div>
        
        {/* Patrón de grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <FaBolt className="text-3xl md:text-4xl text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            DEPOSITA EN
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              SEGUNDOS
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Métodos de pago diseñados específicamente para jugadores peruanos
          </p>

          {/* Stats rápidas */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full">
              <FaClock className="text-green-400" />
              <span className="text-white font-semibold">30 seg</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full">
              <FaShieldAlt className="text-blue-400" />
              <span className="text-white font-semibold">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full">
              <FaGift className="text-purple-400" />
              <span className="text-white font-semibold">Sin Comisiones</span>
            </div>
          </div>
        </motion.div>

        {/* Tabs de Navegación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8 md:mb-12"
        >
          <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-2 border border-gray-800">
            {Object.entries(paymentCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {key === 'instant' ? <FaMobile /> : <FaUniversity />}
                <span className="hidden sm:inline">{category.title}</span>
                <span className="sm:hidden">
                  {key === 'instant' ? 'RÁPIDOS' : 'BANCOS'}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contenido por Tabs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Título de la categoría */}
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {paymentCategories[activeTab].title}
              </h3>
              <p className="text-gray-400">
                {paymentCategories[activeTab].subtitle}
              </p>
            </div>

            {/* Carrusel para móvil, Grid para desktop */}
            <div className="mb-12">
              {/* Carrusel móvil */}
              <div className="block md:hidden">
                <div className="flex overflow-x-auto gap-4 pb-4 px-2 scroll-smooth snap-x snap-mandatory">
                  {currentMethods.map((method, index) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative flex-none w-80 snap-center"
                    >
                      <div className={`bg-gradient-to-br ${method.color} p-[1px] rounded-2xl shadow-xl`}>
                        <div className="bg-gray-900/95 backdrop-blur rounded-2xl p-6 h-full relative overflow-hidden">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                          </div>

                          {/* Header del método */}
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                {(method.isBank || method.hasLogo) ? (
                                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                    <img src={method.icon} alt={method.name} className="w-8 h-8 object-contain" />
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center text-2xl">
                                    {method.icon}
                                  </div>
                                )}
                                <div>
                                  <h4 className="text-white font-bold text-lg">{method.name}</h4>
                                  <p className="text-gray-400 text-sm">{method.time}</p>
                                </div>
                              </div>
                              
                              {/* Popularidad */}
                              <div className="text-right">
                                <div className="text-xs text-gray-400 mb-1">Popularidad</div>
                                <div className="flex items-center gap-1">
                                  <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full transition-all duration-1000"
                                      style={{ width: `${method.popularity}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-white font-bold">{method.popularity}%</span>
                                </div>
                              </div>
                            </div>

                            {/* Información clave */}
                            <div className="space-y-3 mb-4">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Límites:</span>
                                <span className="text-white font-semibold text-sm">{method.limit}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Comisión:</span>
                                <span className="text-green-400 font-bold text-sm">{method.fee}</span>
                              </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-2 mb-6">
                              {method.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <FaCheckCircle className="text-green-400 text-xs flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>

                            {/* CTA */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full bg-gradient-to-r from-white to-gray-200 text-gray-900 font-bold py-3 px-4 rounded-xl hover:from-gray-200 hover:to-white transition-all duration-200 flex items-center justify-center gap-2 group"
                            >
                              <span>Usar {method.name}</span>
                              <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Indicador de scroll para móvil */}
                <div className="flex justify-center mt-4 gap-2">
                  {currentMethods.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-gray-600"
                    />
                  ))}
                  <div className="text-gray-400 text-xs ml-2">← Desliza para ver más →</div>
                </div>
              </div>

              {/* Grid para desktop */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {currentMethods.map((method, index) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className={`bg-gradient-to-br ${method.color} p-[1px] rounded-2xl shadow-xl`}>
                      <div className="bg-gray-900/95 backdrop-blur rounded-2xl p-6 h-full relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                        </div>

                        {/* Header del método */}
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {(method.isBank || method.hasLogo) ? (
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                  <img src={method.icon} alt={method.name} className="w-8 h-8 object-contain" />
                                </div>
                              ) : (
                                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center text-2xl">
                                  {method.icon}
                                </div>
                              )}
                              <div>
                                <h4 className="text-white font-bold text-lg">{method.name}</h4>
                                <p className="text-gray-400 text-sm">{method.time}</p>
                              </div>
                            </div>
                            
                            {/* Popularidad */}
                            <div className="text-right">
                              <div className="text-xs text-gray-400 mb-1">Popularidad</div>
                              <div className="flex items-center gap-1">
                                <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full transition-all duration-1000"
                                    style={{ width: `${method.popularity}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-white font-bold">{method.popularity}%</span>
                              </div>
                            </div>
                          </div>

                          {/* Información clave */}
                          <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-sm">Límites:</span>
                              <span className="text-white font-semibold text-sm">{method.limit}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-sm">Comisión:</span>
                              <span className="text-green-400 font-bold text-sm">{method.fee}</span>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="space-y-2 mb-6">
                            {method.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-400 text-xs flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-gradient-to-r from-white to-gray-200 text-gray-900 font-bold py-3 px-4 rounded-xl hover:from-gray-200 hover:to-white transition-all duration-200 flex items-center justify-center gap-2 group"
                          >
                            <span>Usar {method.name}</span>
                            <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA Principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Listo para empezar a jugar?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Te ayudamos a configurar tu método de pago favorito y hacer tu primer depósito
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="https://wa.me/51955311839?text=Quiero%20ayuda%20con%20mi%20primer%20depósito"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 shadow-2xl"
              >
                <FaWhatsapp className="text-xl" />
                Ayuda Personalizada
              </motion.a>
              
              <div className="flex items-center gap-2 text-gray-400">
                <FaClock className="text-sm" />
                <span className="text-sm">Respuesta en menos de 2 minutos</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Garantías y Seguridad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 md:mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">100% Seguro</h4>
              <p className="text-gray-400 text-sm">Encriptación SSL y protección total de datos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <FaBolt className="text-2xl text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">Ultra Rápido</h4>
              <p className="text-gray-400 text-sm">Depósitos procesados en tiempo record</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <FaStar className="text-2xl text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">Sin Comisiones</h4>
              <p className="text-gray-400 text-sm">Todos nuestros métodos son completamente gratuitos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PaymentMethodsEnhanced