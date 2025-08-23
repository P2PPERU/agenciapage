import { motion } from 'framer-motion'
import { FaCheckCircle, FaBolt, FaClock, FaShieldAlt, FaDollarSign } from 'react-icons/fa'

const PaymentMethods = () => {
  const methods = [
    { 
      name: 'YAPE', 
      icon: '💜', 
      color: 'from-purple-500 to-purple-700',
      time: 'En 1 minuto',
      highlight: 'MÁS POPULAR'
    },
    { 
      name: 'PLIN', 
      icon: '💚', 
      color: 'from-green-500 to-green-700',
      time: 'Instantáneo',
      highlight: 'INSTANTÁNEO'
    },
    { 
      name: 'BCP/BBVA', 
      icon: '🏦', 
      color: 'from-blue-500 to-blue-700',
      time: 'Mismo día',
      highlight: 'TODOS LOS BANCOS'
    },
    { 
      name: 'Bitcoin', 
      icon: '₿', 
      color: 'from-orange-500 to-orange-700',
      time: '30 minutos',
      highlight: 'ANÓNIMO'
    },
    { 
      name: 'USDT', 
      icon: '💵', 
      color: 'from-green-600 to-green-800',
      time: 'Instantáneo',
      highlight: 'SIN LÍMITES'
    }
  ]
  
  return (
    <section id="pagos" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-green-500/20 border border-green-500 rounded-full px-6 py-2 mb-6">
            <FaCheckCircle className="text-green-500 mr-2" />
            <span className="text-green-400 font-bold">PAGOS 100% GARANTIZADOS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            DEPOSITA Y RETIRA <span className="text-poker-gold">AL INSTANTE</span>
          </h2>
          <p className="text-gray-400 text-lg">
            ✅ YAPE - En 1 minuto • ✅ PLIN - Instantáneo • ✅ BCP/BBVA - Mismo día • ✅ BITCOIN/USDT - Sin límites
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          {methods.map((method, idx) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className={`bg-gradient-to-br ${method.color} rounded-2xl p-6 text-center shadow-xl relative overflow-hidden`}>
                <div className="absolute -top-2 -right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {method.highlight}
                  </span>
                </div>
                
                <div className="text-5xl mb-3">{method.icon}</div>
                <p className="text-white font-black text-lg mb-1">{method.name}</p>
                <p className="text-white/80 text-sm">{method.time}</p>
                
                <div className="mt-3">
                  <FaCheckCircle className="text-white/50 mx-auto" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-r from-poker-gold/10 to-yellow-500/10 border border-poker-gold/30 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <FaBolt className="text-poker-gold text-3xl mx-auto mb-2" />
              <p className="text-white font-bold">Depósitos</p>
              <p className="text-poker-gold text-2xl font-black">1 MIN</p>
            </div>
            <div>
              <FaClock className="text-poker-gold text-3xl mx-auto mb-2" />
              <p className="text-white font-bold">Retiros</p>
              <p className="text-poker-gold text-2xl font-black">24 HRS</p>
            </div>
            <div>
              <FaShieldAlt className="text-poker-gold text-3xl mx-auto mb-2" />
              <p className="text-white font-bold">Seguridad</p>
              <p className="text-poker-gold text-2xl font-black">100%</p>
            </div>
            <div>
              <FaDollarSign className="text-poker-gold text-3xl mx-auto mb-2" />
              <p className="text-white font-bold">Comisiones</p>
              <p className="text-poker-gold text-2xl font-black">S/0</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PaymentMethods