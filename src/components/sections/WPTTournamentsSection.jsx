// src/components/sections/WPTTournamentsSection.jsx
import { motion } from 'framer-motion'
import { FaTrophy, FaTicketAlt, FaCalendarAlt, FaClock, FaGift, FaUsers, FaFire, FaCoins } from 'react-icons/fa'

const WPTTournamentsSection = ({ tournaments, crazyFreerollsInfo, crazySchedule }) => {
  return (
    <motion.div
      key="torneos"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Header Crazy Freerolls */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          CRAZY FREEROLLS SERIES
        </h2>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8">
          <h3 className="text-6xl font-black text-white mb-4">
            {crazyFreerollsInfo?.totalPrize || '$2,000,000'}
          </h3>
          <p className="text-2xl font-bold text-yellow-400 mb-2">
            GARANTIZADOS EN EL CRAZY FREEROLL SERIES
          </p>
          <div className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full inline-block text-xl">
            {crazyFreerollsInfo?.duration || '18 AGO - 5 OCT'}
          </div>
        </div>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          {crazyFreerollsInfo?.description}
        </p>
      </div>

      {/* Torneos principales */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {tournaments.slice(0, 2).map((tournament, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 border-2 ${
              tournament.type === 'crazy-daily' ? 'border-yellow-500' : 'border-purple-500'
            } hover:border-white transition`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
              <div className="text-3xl">
                {tournament.type === 'crazy-daily' ? '🎟️' : '🏆'}
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Garantizado:</span>
                <span className="text-yellow-500 font-bold text-2xl">{tournament.guarantee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Buy-in:</span>
                <span className="font-bold text-green-400 text-xl">{tournament.buyIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Horario:</span>
                <span className="text-white font-semibold">{tournament.time}</span>
              </div>
              {tournament.winner && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Ganador:</span>
                  <span className="text-orange-400 font-bold">{tournament.winner}</span>
                </div>
              )}
            </div>
            
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 text-center">
              <p className="text-green-400 font-bold">🎁 COMPLETAMENTE GRATIS</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Formas de conseguir tickets */}
      {crazyFreerollsInfo?.ticketWays && (
        <div className="bg-gray-900 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
            <FaTicketAlt className="mr-3 text-yellow-500" />
            Cómo Conseguir Tickets GRATIS
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {crazyFreerollsInfo.ticketWays.map((way, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/30 rounded-xl p-6 text-center hover:bg-black/50 transition"
              >
                <div className="text-4xl mb-3">{way.icon}</div>
                <h4 className="text-white font-bold mb-2">{way.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{way.description}</p>
                {way.multiplier && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                    {way.multiplier}
                  </span>
                )}
                {way.prize && (
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full font-bold">
                    {way.prize}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Requisitos semanales */}
          {crazyFreerollsInfo.weeklyRequirements && (
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500 rounded-xl p-6">
              <h4 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                <FaCoins className="mr-3" />
                Requisitos Semanales para Tickets Extra
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {crazyFreerollsInfo.weeklyRequirements.map((req, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                    <span className="text-white font-semibold">{req.amount}</span>
                    <span className="text-yellow-400 font-bold">{req.reward}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calendario de torneos (muestra algunos destacados) */}
      {crazySchedule && (
        <div className="bg-gray-900 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FaCalendarAlt className="mr-3 text-green-500" />
            Calendario de Torneos Destacados
          </h3>
          
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {crazySchedule.filter(tournament => tournament.featured || tournament.date.includes('Aug-1') || tournament.date.includes('Sep-1') || tournament.date.includes('Oct-')).map((tournament, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between bg-black/30 rounded-lg p-4 hover:bg-black/50 transition ${
                  tournament.featured ? 'border border-purple-500' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">{tournament.date}</div>
                    <div className="text-gray-400 text-sm">{tournament.day}</div>
                  </div>
                  <div className="text-gray-400">{tournament.time} UTC</div>
                  <div className="text-white font-semibold truncate max-w-md">
                    {tournament.name}
                  </div>
                </div>
                <div className={`font-bold text-xl ${tournament.featured ? 'text-purple-400' : 'text-yellow-400'}`}>
                  {tournament.prize}
                  {tournament.featured && <span className="ml-2">👑</span>}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 mb-4">... y muchos más torneos diarios hasta octubre</p>
            <a
              href="https://wa.me/51955311839?text=Quiero%20ver%20el%20calendario%20completo%20de%20Crazy%20Freerolls"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition"
            >
              <FaCalendarAlt className="mr-2" />
              Ver Calendario Completo
            </a>
          </div>
        </div>
      )}

      {/* Otros torneos regulares */}
      <div className="bg-gray-900 rounded-2xl p-8 mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">
          🏆 Otros Torneos Destacados
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {tournaments.slice(2).map((tournament, idx) => (
            <div key={idx} className="bg-black/30 rounded-xl p-6 hover:bg-black/50 transition">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-white">{tournament.name}</h4>
                <FaTrophy className="text-yellow-500 text-2xl" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Garantizado:</span>
                  <span className="text-yellow-500 font-bold">{tournament.guarantee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Buy-in:</span>
                  <span className="text-white font-bold">{tournament.buyIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Horario:</span>
                  <span className="text-white">{tournament.time}</span>
                </div>
                {tournament.satellites && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Satélites:</span>
                    <span className="text-green-400">{tournament.satellites}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <a
          href="https://wa.me/51955311839?text=Quiero%20información%20sobre%20los%20Crazy%20Freerolls"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-full text-xl hover:scale-105 transition shadow-xl"
        >
          <FaFire className="mr-3" />
          UNIRME A LOS CRAZY FREEROLLS
        </a>
      </div>
    </motion.div>
  )
}

export default WPTTournamentsSection