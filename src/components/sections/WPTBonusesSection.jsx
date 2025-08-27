// src/components/sections/WPTBonusesSection.jsx - VERSIÓN COMPLETA Y CORREGIDA
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// ✅ IMPORTAR EL SISTEMA DE ICONOS PREMIUM COMPLETO
import { usePremiumIcon, PremiumIcon } from '../../utils/iconMapping'

const WPTBonusesSection = ({ bonuses, ticketsTable, bonusDetails }) => {
  const [currentBonus, setCurrentBonus] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  // ✅ USAR EL HOOK DE ICONOS PREMIUM
  const { renderIcon } = usePremiumIcon()

  // Filtrar bonos para eliminar referencias a casino
  const pokerBonuses = bonuses.filter(bonus => 
    !bonus.title.toLowerCase().includes('casino') && 
    !bonus.description.toLowerCase().includes('casino')
  )

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-scroll para carrusel
  useEffect(() => {
    if (!isMobile) return
    
    const interval = setInterval(() => {
      setCurrentBonus((prev) => (prev + 1) % pokerBonuses.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [isMobile, pokerBonuses.length])

  const nextBonus = () => {
    setCurrentBonus((prev) => (prev + 1) % pokerBonuses.length)
  }

  const prevBonus = () => {
    setCurrentBonus((prev) => (prev - 1 + pokerBonuses.length) % pokerBonuses.length)
  }

  // Filtrar información de casino del cashback
  const pokerCashbackInfo = bonusDetails?.cashbackInfo ? {
    ...bonusDetails.cashbackInfo,
    // aquí podrías limpiar campos si alguno mencionara "casino"
  } : null

  return (
    <motion.div
      key="bonos"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      {/* Header responsivo */}
      <div className="text-center mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-red-500/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-4 py-2 mb-4"
        >
          {/* ✅ USAR ICONO PREMIUM */}
          <PremiumIcon name="PremiumStarIcon" className="w-4 h-4 mr-2" />
          <span className="text-yellow-400 font-semibold text-sm">OFERTA EXCLUSIVA</span>
        </motion.div>
        
        <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-400 mb-4">
          OFERTA DE BIENVENIDA
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
            INCREÍBLE
          </span>
        </h2>
      </div>

      {/* Banner principal más compacto */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-4 md:p-6 mb-8 md:mb-12 text-center"
      >
        <h3 className="text-xl md:text-3xl font-black text-white mb-2">
          RECIBE HASTA {bonusDetails?.totalRewards || '$3,580'} EN RECOMPENSAS TOTALES
        </h3>
        <p className="text-sm md:text-xl text-white/90">
          ¡Haz un depósito de $10 a $3,000 y te devolveremos el monto total en CASH!
        </p>
      </motion.div>

      {/* Bonos principales - Grid en desktop, Carrusel en móvil */}
      <div className="mb-8 md:mb-12">
        {/* Desktop: Grid normal */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {pokerBonuses.map((bonus, idx) => (
            <motion.div
              key={bonus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-gradient-to-br ${bonus.color} p-[2px] rounded-2xl shadow-lg`}
            >
              <div className="bg-gray-900 rounded-2xl p-6 h-full">
                <div className="flex justify-between items-start mb-4">
                  {/* ✅ RENDERIZAR ICONO PREMIUM CORRECTAMENTE */}
                  <div className="text-4xl md:text-5xl">
                    {renderIcon(bonus.icon, { className: "w-12 h-12 md:w-16 md:h-16" })}
                  </div>
                  {bonus.featured && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                      DESTACADO
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{bonus.title}</h3>
                <p className="text-2xl md:text-4xl font-black text-yellow-500 mb-3">{bonus.amount}</p>
                <p className="text-gray-300 mb-4 text-sm md:text-base">{bonus.description}</p>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-xs md:text-sm text-yellow-500 font-semibold flex items-center">
                    <PremiumIcon name="PremiumCheckIcon" className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{bonus.requirements}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Móvil: Carrusel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBonus}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={`bg-gradient-to-br ${pokerBonuses[currentBonus]?.color} p-[2px] rounded-2xl`}
              >
                <div className="bg-gray-900 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    {/* ✅ ICONO PREMIUM TAMBIÉN EN MÓVIL */}
                    <div className="text-4xl">
                      {renderIcon(pokerBonuses[currentBonus]?.icon, { className: "w-10 h-10" })}
                    </div>
                    {pokerBonuses[currentBonus]?.featured && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        DESTACADO
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{pokerBonuses[currentBonus]?.title}</h3>
                  <p className="text-3xl font-black text-yellow-500 mb-3">{pokerBonuses[currentBonus]?.amount}</p>
                  <p className="text-gray-300 mb-4 text-sm">{pokerBonuses[currentBonus]?.description}</p>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs text-yellow-500 font-semibold flex items-center">
                      <PremiumIcon name="PremiumCheckIcon" className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{pokerBonuses[currentBonus]?.requirements}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles del carrusel */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={prevBonus}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-colors"
            >
              <FaChevronLeft />
            </button>
            
            {/* Indicadores */}
            <div className="flex space-x-2">
              {pokerBonuses.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBonus(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === currentBonus ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextBonus}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de tickets - Responsiva */}
      {ticketsTable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-2xl p-4 md:p-8 mb-8 md:mb-12"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
            <PremiumIcon name="PremiumTicketIcon" className="w-6 h-6 mr-3" />
            Tickets Gratis Según tu Depósito
          </h3>
          
          {/* Tabla responsiva */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Desktop: Tabla normal */}
              <div className="hidden md:block">
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
                      <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
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

              {/* Móvil: Cards apiladas */}
              <div className="md:hidden space-y-4">
                {ticketsTable.map((row, idx) => (
                  <div key={idx} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-white text-lg">{row.depositRange}</h4>
                      <span className="font-bold text-green-400 text-xl">{row.totalValue}</span>
                    </div>
                    <div className="text-gray-300 text-sm">
                      {row.tickets.map((ticket, i) => (
                        <div key={i} className="mb-1 flex items-center">
                          <span className="text-blue-400 mr-2">•</span>
                          {ticket}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">{row.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Información del reembolso - Solo poker */}
      {pokerCashbackInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12"
        >
          <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 border border-green-500 rounded-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-green-400 mb-4 flex items-center">
              <PremiumIcon name="PremiumDollarIcon" className="w-6 h-6 mr-3" />
              ¿Cómo Obtengo el Reembolso?
            </h3>
            <div className="text-gray-300 space-y-3 text-sm md:text-base">
              <p className="font-semibold text-white">
                ¡Solo tienes que jugar poker para recuperar el importe total de tu depósito!
              </p>
              <div className="flex items-center gap-2">
                <PremiumIcon name="PremiumClockIcon" className="w-5 h-5 flex-shrink-0" />
                <span>Tienes {pokerCashbackInfo.timeLimit} para recuperarlo</span>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <p className="text-xs md:text-sm">
                  <strong>{pokerCashbackInfo.pokerPercent}%</strong> en mesas de poker: {pokerCashbackInfo.pokerRate}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border border-yellow-500 rounded-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-4 flex items-center">
              <PremiumIcon name="PremiumTicketIcon" className="w-6 h-6 mr-3" />
              Beneficios Adicionales
            </h3>
            <div className="space-y-3 text-gray-300 text-sm md:text-base">
              <div className="flex items-center gap-3">
                <PremiumIcon name="PremiumCheckIcon" className="w-5 h-5 flex-shrink-0" />
                <span>100% de reembolso EN EFECTIVO</span>
              </div>
              <div className="flex items-center gap-3">
                <PremiumIcon name="PremiumCheckIcon" className="w-5 h-5 flex-shrink-0" />
                <span>Tickets para torneos MTT incluidos</span>
              </div>
              <div className="flex items-center gap-3">
                <PremiumIcon name="PremiumCheckIcon" className="w-5 h-5 flex-shrink-0" />
                <span>Acceso a Global Spins premium</span>
              </div>
              <div className="flex items-center gap-3">
                <PremiumIcon name="PremiumCheckIcon" className="w-5 h-5 flex-shrink-0" />
                <span>Soporte VIP personalizado</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* CTA responsivo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <a
          href="https://wa.me/51955311839?text=Quiero%20información%20sobre%20los%20bonos%20de%20WPT"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/30"
        >
          <PremiumIcon name="PremiumWhatsAppIcon" className="w-6 h-6 mr-3" />
          <span className="hidden md:inline">RECLAMAR TODOS LOS BONOS</span>
          <span className="md:hidden">RECLAMAR BONOS</span>
        </a>
      </motion.div>
    </motion.div>
  )
}

export default WPTBonusesSection