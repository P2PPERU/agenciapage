// src/components/sections/WPTTournamentsSection.jsx - VERSIÓN COMPLETA Y CORREGIDA
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaTrophy, FaTicketAlt, FaCalendarAlt, FaClock, FaGift, FaUsers, FaFire, FaCoins, FaFilter, FaStar, FaBolt } from 'react-icons/fa'

// ✅ IMPORTAR EL SISTEMA DE ICONOS PREMIUM
import { usePremiumIcon, PremiumIcon } from '../../utils/iconMapping.jsx'

const WPTTournamentsSection = ({ tournaments, crazyFreerollsInfo, crazySchedule }) => {
  const [filterType, setFilterType] = useState('all')
  const [currentWeek, setCurrentWeek] = useState('all')

  // ✅ USAR EL HOOK DE ICONOS PREMIUM
  const { renderIcon } = usePremiumIcon()

  // Calcular estadísticas del calendario
  const calendarStats = useMemo(() => {
    const dailyTournaments = crazySchedule?.filter(t => t.type === 'daily') || []
    const superTournaments = crazySchedule?.filter(t => t.type === 'super') || []
    
    return {
      totalDays: crazySchedule?.length || 0,
      dailyCount: dailyTournaments.length,
      superCount: superTournaments.length,
      totalPrize: (dailyTournaments.length * 10) + (superTournaments.length * 100)
    }
  }, [crazySchedule])

  // Filtrar torneos según los filtros seleccionados
  const filteredSchedule = useMemo(() => {
    if (!crazySchedule) return []
    
    return crazySchedule.filter(tournament => {
      const typeMatch = filterType === 'all' || 
        (filterType === 'daily' && tournament.type === 'daily') ||
        (filterType === 'super' && tournament.type === 'super')
      
      return typeMatch
    })
  }, [crazySchedule, filterType])

  // Agrupar por semanas para mejor visualización
  const weeklyGroups = useMemo(() => {
    const groups = {}
    filteredSchedule.forEach(tournament => {
      const [day, month] = tournament.date.split('-')
      const weekKey = `${month}-W${Math.ceil(parseInt(day) / 7)}`
      
      if (!groups[weekKey]) {
        groups[weekKey] = []
      }
      groups[weekKey].push(tournament)
    })
    return groups
  }, [filteredSchedule])

  return (
    <motion.div
      key="torneos"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Header Crazy Freerolls */}
      <div className="text-center mb-12">
        <motion.h2 
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CRAZY FREEROLLS SERIES 2025
        </motion.h2>
        
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-2xl p-8 mb-8">
          <motion.h3 
            className="text-6xl font-black text-white mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            {crazyFreerollsInfo?.totalPrize || '$2,000,000'}
          </motion.h3>
          <p className="text-2xl font-bold text-yellow-300 mb-2">
            GARANTIZADOS EN EL CRAZY FREEROLL SERIES
          </p>
          <div className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full inline-block text-xl shadow-lg">
            {crazyFreerollsInfo?.duration || '25 AGO - 5 OCT 2025'}
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-black/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-400">{calendarStats.totalDays}</div>
              <div className="text-sm text-gray-300">Días de torneo</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">{calendarStats.dailyCount}</div>
              <div className="text-sm text-gray-300">Torneos $10K</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-400">{calendarStats.superCount}</div>
              <div className="text-sm text-gray-300">Torneos $100K</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-400">${calendarStats.totalPrize}K</div>
              <div className="text-sm text-gray-300">Premio total</div>
            </div>
          </div>
        </div>
        
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          {crazyFreerollsInfo?.description}
        </p>
      </div>

      {/* Torneos principales destacados */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {tournaments.filter(t => t.featured).map((tournament, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-br ${
              tournament.type === 'crazy-daily' 
                ? 'from-yellow-600 to-orange-600' 
                : 'from-purple-600 to-pink-600'
            } rounded-xl p-6 border-2 border-white/20 hover:border-white/50 transition-all duration-300 shadow-xl`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white flex-1">{tournament.name}</h3>
              <div className="text-3xl ml-4">
                {tournament.type === 'crazy-daily' ? 
                  <PremiumIcon name="PremiumCoinsIcon" className="w-8 h-8" /> : 
                  <PremiumIcon name="PremiumTrophyIcon" className="w-8 h-8" />
                }
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Garantizado:</span>
                <span className="text-yellow-200 font-bold text-2xl">{tournament.guarantee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Buy-in:</span>
                <span className="font-bold text-green-200 text-xl">{tournament.buyIn}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Frecuencia:</span>
                <span className="text-white font-semibold">{tournament.time}</span>
              </div>
              {tournament.winner && (
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Ganador típico:</span>
                  <span className="text-orange-200 font-bold">{tournament.winner}</span>
                </div>
              )}
            </div>
            
            <div className="bg-white/20 border border-white/30 rounded-lg p-3 text-center">
              <p className="text-white font-bold flex items-center justify-center">
                <FaGift className="mr-2" />
                100% GRATUITO - SIN COSTO
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Formas de conseguir tickets */}
      {crazyFreerollsInfo?.ticketWays && (
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 mb-12 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
            <FaTicketAlt className="mr-3 text-yellow-500" />
            Cómo Conseguir Tickets GRATIS para los Freerolls
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {crazyFreerollsInfo.ticketWays.map((way, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center hover:from-gray-700 hover:to-gray-800 transition-all duration-300 border border-gray-600 hover:border-gray-500"
              >
                {/* ✅ RENDERIZAR ICONOS PREMIUM PARA TICKET WAYS */}
                <div className="text-4xl mb-3 flex justify-center">
                  {renderIcon(way.icon, { className: "w-12 h-12" })}
                </div>
                <h4 className="text-white font-bold mb-2">{way.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{way.description}</p>
                
                <div className="space-y-2">
                  {way.multiplier && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-xs block">
                      {way.multiplier}
                    </span>
                  )}
                  {way.prize && (
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full font-bold text-xs block">
                      {way.prize}
                    </span>
                  )}
                  {way.automatic && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full font-bold text-xs block">
                      <PremiumIcon name="PremiumCheckIcon" className="w-3 h-3 inline mr-1" />
                      AUTOMÁTICO
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl p-6">
            <h4 className="text-xl font-bold text-blue-400 mb-3 flex items-center justify-center">
              <FaBolt className="mr-2" />
              ¡Múltiples oportunidades cada día!
            </h4>
            <p className="text-gray-300">
              Además de los tickets automáticos, puedes ganar entradas adicionales jugando cualquier modalidad en WPT Global. 
              ¡Más juegas, más tickets consigues!
            </p>
          </div>
        </div>
      )}

      {/* Calendario de torneos con filtros mejorado */}
      {crazySchedule && (
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 mb-12 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FaCalendarAlt className="mr-3 text-green-500" />
            Calendario Completo de Crazy Freerolls (25 Ago - 5 Oct 2025)
          </h3>
          
          {/* Filtros mejorados */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-black/40 rounded-xl border border-gray-600">
            <div className="flex items-center gap-2">
              <FaFilter className="text-yellow-500" />
              <span className="text-white font-semibold">Filtrar torneos:</span>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                  filterType === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Todos ({crazySchedule.length})
              </button>
              <button
                onClick={() => setFilterType('daily')}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                  filterType === 'daily' 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Daily $10K ({calendarStats.dailyCount})
              </button>
              <button
                onClick={() => setFilterType('super')}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                  filterType === 'super' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Super $100K ({calendarStats.superCount})
              </button>
            </div>
          </div>
          
          {/* Información importante */}
          <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <PremiumIcon name="PremiumClockIcon" className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-orange-400 font-bold mb-1">Horarios en Perú </h4>
                <p className="text-gray-300 text-sm">
                  <strong>Torneos $10K:</strong> Lunes a Sábado en horarios rotativos (07:00, 13:00, 18:30) <br/>
                  <strong>Torneos $100K:</strong> Todos los domingos en horarios rotativos (07:00, 13:00, 18:30)
                </p>
              </div>
            </div>
          </div>
          
          {/* Lista de torneos filtrada */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2" style={{scrollbarWidth: 'thin'}}>
            {filteredSchedule.map((tournament, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                className={`flex items-center justify-between rounded-lg p-4 transition-all duration-200 ${
                  tournament.type === 'super' 
                    ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/50 shadow-lg' 
                    : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-center min-w-[80px]">
                    <div className="text-yellow-400 font-bold text-sm">{tournament.date}</div>
                    <div className="text-gray-400 text-xs">{tournament.day}</div>
                  </div>
                  
                  <div className="text-center min-w-[80px]">
                    <div className="text-white font-semibold flex items-center justify-center gap-1">
                      <FaClock className="text-xs" />
                      {tournament.time}
                    </div>
                    <div className="text-gray-500 text-xs">Hora Perú</div>
                  </div>
                  
                  <div className="text-white font-semibold flex-1 min-w-0">
                    <div className="truncate">{tournament.name}</div>
                    {tournament.type === 'super' && (
                      <div className="flex items-center gap-1 text-xs text-purple-400 mt-1">
                        <FaStar className="text-xs" />
                        TORNEO $100K DESTACADO
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 ml-4">
                  <div className={`font-bold text-lg ${
                    tournament.type === 'super' ? 'text-purple-400' : 'text-yellow-400'
                  }`}>
                    {tournament.prize}
                    {tournament.type === 'super' && 
                      <PremiumIcon name="PremiumTrophyIcon" className="w-5 h-5 inline ml-2" />
                    }
                  </div>
                  
                  <div className="bg-green-500/20 text-green-400 border border-green-500/50 px-3 py-1 rounded-full text-sm font-bold">
                    GRATIS
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredSchedule.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No se encontraron torneos con los filtros seleccionados</p>
            </div>
          )}
          
          <div className="mt-6 text-center space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-300 mb-2">
                📅 <strong>Serie completa:</strong> 25 de Agosto - 5 de Octubre 2025 
              </p>
              <p className="text-gray-400 text-sm">
                Total de {calendarStats.totalDays} días • {calendarStats.dailyCount} torneos $10K • {calendarStats.superCount} torneos $100K
              </p>
            </div>
            
            <a
              href="https://wa.me/51955311839?text=Quiero%20información%20sobre%20el%20calendario%20de%20Crazy%20Freerolls%202025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:scale-105"
            >
              <FaCalendarAlt className="mr-2" />
              Obtener Ayuda con el Registro
            </a>
          </div>
        </div>
      )}

      {/* Call to Action final */}
      <div className="text-center">
        <motion.a
          href="https://wa.me/51955311839?text=Quiero%20unirme%20a%20los%20Crazy%20Freerolls%202025%20y%20obtener%20mis%20códigos%20exclusivos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold px-8 py-4 rounded-full text-xl hover:scale-105 transition-all duration-200 shadow-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PremiumIcon name="PremiumWhatsAppIcon" className="w-6 h-6 mr-3" />
          ¡UNIRME AHORA A LOS CRAZY FREEROLLS 2025!
        </motion.a>
        <p className="text-gray-400 mt-4 text-sm">
          Usa los códigos: <span className="text-yellow-400 font-bold">PeruEV</span> + <span className="text-purple-400 font-bold">8288C1</span>
        </p>
      </div>
    </motion.div>
  )
}

export default WPTTournamentsSection