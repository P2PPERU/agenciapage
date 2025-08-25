// src/components/sections/WPTBonusesSection.jsx
import { motion } from 'framer-motion'
import { FaCheckCircle, FaWhatsapp, FaClock, FaGift, FaCoins, FaTicketAlt, FaDollarSign } from 'react-icons/fa'

const WPTBonusesSection = ({ bonuses, ticketsTable, bonusDetails }) => {
  return (
    <motion.div
      key="bonos"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-3xl font-bold text-white text-center mb-10">
        OFERTA DE BIENVENIDA INCREÍBLE
      </h2>

      {/* Banner principal de recompensas totales */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 mb-12 text-center">
        <h3 className="text-3xl font-black text-white mb-2">
          RECIBE HASTA {bonusDetails?.totalRewards || '$3,580'} EN RECOMPENSAS TOTALES
        </h3>
        <p className="text-xl text-white/90">
          ¡Haz un depósito de $10 a $3,000 y te devolveremos el monto total en CASH!
        </p>
      </div>

      {/* Descripción principal */}
      <div className="bg-gray-900 rounded-2xl p-8 mb-12">
        <h3 className="text-2xl font-bold text-yellow-500 mb-4 text-center">
          La Oferta con la que Sueña Todo Jugador de Poker
        </h3>
        <div className="text-gray-300 text-lg space-y-4">
          <p>
            Ofrecemos a los nuevos clientes la increíble oferta de bienvenida con la que sueña 
            todo jugador de poker en línea.
          </p>
          <p className="text-yellow-400 font-bold">
            ¡Deposita de $10 a $3,000 y te devolveremos el monto total EN EFECTIVO!
          </p>
          <p>
            ¿Quieres más? Además, te regalamos tickets para torneos y monedas de casino, 
            con más de $500 en bonificaciones adicionales disponibles según el importe de tu primer depósito.
          </p>
        </div>
      </div>
      
      {/* Grid de bonos principales */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {bonuses.map((bonus, idx) => (
          <motion.div
            key={bonus.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`bg-gradient-to-br ${bonus.color} p-[2px] rounded-2xl`}
          >
            <div className="bg-gray-900 rounded-2xl p-6 h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="text-5xl">{bonus.icon}</div>
                {bonus.featured && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    DESTACADO
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{bonus.title}</h3>
              <p className="text-4xl font-black text-yellow-500 mb-3">{bonus.amount}</p>
              <p className="text-gray-300 mb-4">{bonus.description}</p>
              <div className="bg-black/30 rounded-lg p-3">
                <p className="text-sm text-yellow-500 font-semibold flex items-center">
                  <FaCheckCircle className="mr-2" />
                  {bonus.requirements}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Paquete instantáneo detallado */}
      {bonusDetails?.instantPackage && (
        <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 border border-purple-500 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center">
            <FaGift className="mr-3" />
            Paquete de Regalo Instantáneo: ${bonusDetails.instantPackage.amount}
          </h3>
          <p className="text-white mb-6">
            Con cualquier depósito de $10 o más, obtienes este paquete al instante:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {bonusDetails.instantPackage.includes.map((item, idx) => (
              <div key={idx} className="bg-black/30 rounded-lg p-3 text-center">
                <div className="text-2xl mb-2">
                  {item.includes('poker') ? '🎰' :
                   item.includes('casino') && item.includes('Bono') ? '🎲' :
                   item.includes('Ticket') ? '🎫' :
                   item.includes('Spins') ? '🌟' : '🪙'}
                </div>
                <p className="text-white font-semibold text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabla de tickets */}
      {ticketsTable && (
        <div className="bg-gray-900 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FaTicketAlt className="mr-3 text-blue-500" />
            Tickets Gratis Según tu Depósito
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-yellow-500 font-bold">Monto del Depósito</th>
                  <th className="py-3 px-4 text-yellow-500 font-bold">Tickets Gratis</th>
                  <th className="py-3 px-4 text-yellow-500 font-bold">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {ticketsTable.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4 px-4 font-bold text-white">{row.depositRange}</td>
                    <td className="py-4 px-4 text-gray-300">
                      {row.tickets.map((ticket, i) => (
                        <div key={i} className="mb-1">{ticket}</div>
                      ))}
                    </td>
                    <td className="py-4 px-4 font-bold text-green-400 text-xl">{row.totalValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Información del reembolso */}
      {bonusDetails?.cashbackInfo && (
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 border border-green-500 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
              <FaDollarSign className="mr-3" />
              ¿Cómo Obtengo el Reembolso?
            </h3>
            <div className="text-gray-300 space-y-3">
              <p className="font-semibold text-white">
                ¡Solo tienes que jugar para recuperar el importe total de tu depósito!
              </p>
              <div className="flex items-center gap-2">
                <FaClock className="text-green-400" />
                <span>Tienes {bonusDetails.cashbackInfo.timeLimit} para recuperarlo</span>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <p className="text-sm">
                  <strong>{bonusDetails.cashbackInfo.pokerPercent}%</strong> en mesas de poker: {bonusDetails.cashbackInfo.pokerRate}
                </p>
                <p className="text-sm">
                  <strong>{bonusDetails.cashbackInfo.casinoPercent}%</strong> en casino: {bonusDetails.cashbackInfo.casinoRate}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border border-yellow-500 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
              <FaCoins className="mr-3" />
              Beneficios Adicionales
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400" />
                <span>100% de reembolso EN EFECTIVO</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400" />
                <span>Tickets para torneos MTT incluidos</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400" />
                <span>Monedas de casino gratis (hasta $100)</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400" />
                <span>Acceso a Global Spins premium</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center">
        <a
          href="https://wa.me/51955311839?text=Quiero%20información%20sobre%20los%20bonos%20de%20WPT"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-8 py-4 rounded-full text-xl hover:scale-105 transition"
        >
          <FaWhatsapp className="mr-3" />
          RECLAMAR TODOS LOS BONOS
        </a>
      </div>
    </motion.div>
  )
}

export default WPTBonusesSection