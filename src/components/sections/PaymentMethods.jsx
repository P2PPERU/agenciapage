// src/components/sections/PaymentMethodsEnhanced.jsx
import { motion } from 'framer-motion'
import { FaCheckCircle, FaBolt, FaClock, FaShieldAlt, FaUniversity, FaArrowRight, FaStar } from 'react-icons/fa'

const PaymentMethodsEnhanced = () => {
  const paymentMethods = [
    { 
      id: 'yape',
      name: 'YAPE', 
      logo: '/logos/yape.svg',
      color: 'from-purple-600 via-purple-700 to-purple-800',
      glowColor: 'shadow-purple-500/50',
      time: 'En 1 minuto',
      highlight: 'MÁS POPULAR',
      highlightColor: 'bg-yellow-400 text-black',
      features: ['Instantáneo', 'Sin comisiones', 'QR Simple']
    },
    { 
      id: 'plin',
      name: 'PLIN', 
      logo: '/logos/plin.png',
      color: 'from-teal-500 via-teal-600 to-teal-700',
      glowColor: 'shadow-teal-500/50',
      time: 'Instantáneo',
      highlight: 'ULTRA RÁPIDO',
      highlightColor: 'bg-green-400 text-black',
      features: ['0 segundos', 'Multi-banco', 'Seguro']
    },
    { 
      id: 'bitcoin',
      name: 'Bitcoin', 
      logo: '/logos/bitcoin.svg',
      color: 'from-orange-500 via-orange-600 to-amber-600',
      glowColor: 'shadow-orange-500/50',
      time: '30 minutos',
      highlight: 'ANÓNIMO',
      highlightColor: 'bg-orange-400 text-black',
      features: ['Privacidad', 'Global', 'Descentralizado']
    },
    { 
      id: 'usdt',
      name: 'USDT', 
      logo: '/logos/usdt.png',
      color: 'from-green-600 via-green-700 to-emerald-700',
      glowColor: 'shadow-green-500/50',
      time: 'Instantáneo',
      highlight: 'SIN LÍMITES',
      highlightColor: 'bg-emerald-400 text-black',
      features: ['Stablecoin', 'USD 1:1', 'Blockchain']
    }
  ]

  const banks = [
    { 
      id: 'bcp', 
      name: 'BCP', 
      logo: '/logos/bcp.png', 
      fullName: 'Banco de Crédito del Perú',
      color: 'from-blue-600 to-blue-800',
      marketShare: '#1 en Perú'
    },
    { 
      id: 'bbva', 
      name: 'BBVA', 
      logo: '/logos/bbva.png', 
      fullName: 'BBVA Continental',
      color: 'from-blue-500 to-blue-700',
      marketShare: 'Líder digital'
    },
    { 
      id: 'interbank', 
      name: 'Interbank', 
      logo: '/logos/interbank.png', 
      fullName: 'Interbank',
      color: 'from-red-600 to-red-800',
      marketShare: 'Innovación'
    },
    { 
      id: 'scotiabank', 
      name: 'Scotiabank', 
      logo: '/logos/scotiabank.png', 
      fullName: 'Scotiabank Perú',
      color: 'from-red-500 to-red-700',
      marketShare: 'Internacional'
    }
  ]

  return (
    <section className="relative py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-400 opacity-5 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-poker-gold/20 to-yellow-500/20 backdrop-blur-xl border border-poker-gold/30 rounded-full px-6 py-3 mb-6">
            <FaStar className="text-poker-gold mr-2" />
            <span className="text-poker-gold font-semibold">MÉTODOS DE PAGO PREMIUM</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-poker-gold mb-4">
            DEPÓSITOS
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-poker-gold to-yellow-400">
              LIGHTNING FAST
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Tecnología de última generación para transacciones instantáneas y seguras
          </p>
        </motion.div>

        {/* Premium Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {paymentMethods.map((method, index) => (
            <div key={method.id} className="relative">
              {/* Highlight Badge fuera del contenedor con overflow-hidden */}
              <div className={`absolute -top-3 -right-3 ${method.highlightColor} px-3 py-1 rounded-full text-xs font-black shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300 z-20`}>
                {method.highlight}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
                }}
                className={`bg-gradient-to-br ${method.color} rounded-3xl p-8 text-white overflow-hidden group cursor-pointer transition-all duration-500 shadow-2xl hover:shadow-purple-500/20`}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-white bg-opacity-30 rounded-full animate-bounce"></div>
                  <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-8 w-2 h-2 bg-white bg-opacity-25 rounded-full animate-ping"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/30 transition-colors duration-300">
                    <img 
                      src={method.logo} 
                      alt={method.name}
                      className="h-12 w-auto filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="font-black text-2xl mb-2 drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                    {method.name}
                  </h3>
                  
                  <p className="text-sm opacity-90 mb-4 flex items-center">
                    <FaClock className="mr-2" />
                    {method.time}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 mb-4">
                    {method.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm opacity-80">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Action indicator */}
                  <motion.div 
                    className="flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Seleccionar método
                    <FaArrowRight className="ml-2" />
                  </motion.div>
                </div>

                {/* Premium border effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Premium Banks Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-[2rem] p-12 border border-white/20 shadow-2xl">
            {/* Premium glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-poker-gold/5 to-transparent rounded-[2rem]"></div>
            
            <div className="relative z-10">
              {/* Enhanced Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-6 shadow-2xl"
                >
                  <FaUniversity className="text-white text-3xl" />
                </motion.div>
                
                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4">
                  Transferencias Bancarias
                  <span className="block text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-poker-gold to-yellow-400">
                    PREMIUM BANKING
                  </span>
                </h3>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Conectamos con los <span className="text-poker-gold font-bold">bancos líderes</span> del Perú para máxima confiabilidad
                </p>
              </div>
              
              {/* Enhanced Banks Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {banks.map((bank, index) => (
                  <motion.div
                    key={bank.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.15,
                      duration: 0.6,
                      type: "spring"
                    }}
                    whileHover={{ 
                      scale: 1.08,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                    className="group relative"
                  >
                    <div className="bg-white rounded-2xl p-8 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                      {/* Premium gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${bank.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      {/* Bank logo and content */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="relative mb-4">
                          <img 
                            src={bank.logo} 
                            alt={bank.name}
                            className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                          />
                          
                          {/* Verification badge */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full p-2 shadow-lg"
                          >
                            <FaCheckCircle className="w-3 h-3" />
                          </motion.div>
                        </div>
                        
                        <h4 className="font-black text-gray-800 text-lg mb-2 group-hover:text-blue-700 transition-colors">
                          {bank.name}
                        </h4>
                        
                        <p className="text-xs text-gray-600 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                          {bank.marketShare}
                        </p>
                      </div>

                      {/* Premium tooltip */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-2xl whitespace-nowrap z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        {bank.fullName}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Premium Features Bar */}
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl p-6 border border-gray-600 border-opacity-30">
                <div className="flex flex-wrap items-center justify-center gap-8 text-gray-200">
                  <div className="flex items-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl mr-3 shadow-lg group-hover:shadow-yellow-400 group-hover:shadow-lg transition-shadow">
                      <FaBolt className="text-black text-lg" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Transferencias Ultra Rápidas</p>
                      <p className="text-sm text-gray-400">Procesamiento en tiempo real</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl mr-3 shadow-lg group-hover:shadow-green-400 group-hover:shadow-lg transition-shadow">
                      <FaShieldAlt className="text-black text-lg" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Seguridad Bancaria</p>
                      <p className="text-sm text-gray-400">Protección de grado militar</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl mr-3 shadow-lg group-hover:shadow-blue-400 group-hover:shadow-lg transition-shadow">
                      <FaClock className="text-black text-lg" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Disponible 24/7</p>
                      <p className="text-sm text-gray-400">Soporte continuo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PaymentMethodsEnhanced