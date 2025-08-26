// src/components/WPTBonusesSection.jsx - VERSIÓN CON ICONOS PREMIUM
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// ICONOS PREMIUM PERSONALIZADOS
const PremiumCheckIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <radialGradient id="checkGlow" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#dcfce7" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#dcfce7" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#checkGradient)" stroke="#047857" strokeWidth="2"/>
    <ellipse cx="16" cy="12" rx="8" ry="10" fill="url(#checkGlow)"/>
    <path d="M10 16 L14 20 L22 12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="16" r="10" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.6"/>
  </svg>
)

const PremiumWhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="whatsappGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#25d366" />
        <stop offset="50%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <radialGradient id="whatsappGlow" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#dcfce7" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#dcfce7" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#whatsappGradient)" stroke="#15803d" strokeWidth="2"/>
    <ellipse cx="13" cy="12" rx="6" ry="8" fill="url(#whatsappGlow)"/>
    <path d="M12 8.5c-2.5 0-4.5 2-4.5 4.5 0 1 .3 1.9.8 2.7l-.8 3.3 3.4-.9c.7.4 1.6.6 2.5.6 2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5z" 
          fill="#ffffff" stroke="none"/>
    <path d="M10.5 11.5l.7-.1c.2 0 .4.1.5.3l.6 1.4c.1.2 0 .4-.1.5l-.4.4c-.1.1-.1.3 0 .5.5 1.2 1.5 2.2 2.7 2.7.2.1.4.1.5 0l.4-.4c.1-.1.3-.2.5-.1l1.4.6c.2.1.3.3.3.5l-.1.7c-.1.5-.5.8-1 .8-2.8 0-5.1-2.3-5.1-5.1 0-.5.3-.9.8-1z" 
          fill="#25d366"/>
  </svg>
)

const PremiumClockIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <radialGradient id="clockFace" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="80%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#clockGradient)" stroke="#1e40af" strokeWidth="2"/>
    <circle cx="16" cy="16" r="10" fill="url(#clockFace)" stroke="#64748b" strokeWidth="1"/>
    {/* Marcadores de horas */}
    <circle cx="16" cy="8" r="1" fill="#475569"/>
    <circle cx="24" cy="16" r="1" fill="#475569"/>
    <circle cx="16" cy="24" r="1" fill="#475569"/>
    <circle cx="8" cy="16" r="1" fill="#475569"/>
    {/* Manecillas del reloj */}
    <line x1="16" y1="16" x2="16" y2="12" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/>
    <line x1="16" y1="16" x2="20" y2="16" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="2" fill="#1e40af"/>
  </svg>
)

const PremiumGiftIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="50%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    {/* Caja de regalo */}
    <rect x="6" y="12" width="20" height="16" fill="url(#giftGradient)" rx="2" stroke="#7f1d1d" strokeWidth="1"/>
    {/* Tapa */}
    <rect x="6" y="10" width="20" height="4" fill="url(#giftGradient)" rx="1" stroke="#7f1d1d" strokeWidth="1"/>
    {/* Cinta vertical */}
    <rect x="14.5" y="6" width="3" height="22" fill="url(#ribbonGradient)"/>
    {/* Cinta horizontal */}
    <rect x="4" y="11" width="24" height="3" fill="url(#ribbonGradient)"/>
    {/* Lazo */}
    <ellipse cx="12" cy="8" rx="3" ry="2" fill="url(#ribbonGradient)"/>
    <ellipse cx="20" cy="8" rx="3" ry="2" fill="url(#ribbonGradient)"/>
    <circle cx="16" cy="8" r="1.5" fill="url(#ribbonGradient)"/>
    {/* Brillos */}
    <rect x="8" y="14" width="4" height="1" fill="#fca5a5" opacity="0.6" rx="0.5"/>
    <rect x="14" y="20" width="6" height="1" fill="#fca5a5" opacity="0.4" rx="0.5"/>
  </svg>
)

const PremiumTicketIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="ticketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <pattern id="ticketDots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.5" fill="#93c5fd" opacity="0.4"/>
      </pattern>
    </defs>
    {/* Tickets apilados */}
    <rect x="3" y="9" width="24" height="12" fill="url(#ticketGradient)" rx="2" stroke="#1e40af" strokeWidth="1" opacity="0.8"/>
    <rect x="4" y="10" width="24" height="12" fill="url(#ticketGradient)" rx="2" stroke="#1e40af" strokeWidth="1"/>
    {/* Patrón de puntos */}
    <rect x="4" y="10" width="24" height="12" fill="url(#ticketDots)" rx="2"/>
    {/* Perforaciones */}
    <circle cx="16" cy="10" r="1" fill="#1e40af"/>
    <circle cx="16" cy="22" r="1" fill="#1e40af"/>
    {/* Línea punteada */}
    <line x1="16" y1="12" x2="16" y2="20" stroke="#93c5fd" strokeWidth="1" strokeDasharray="1,1"/>
    {/* Detalles del ticket */}
    <rect x="7" y="13" width="8" height="6" fill="#1e40af" opacity="0.3" rx="1"/>
    <text x="11" y="17" textAnchor="middle" fill="#dbeafe" fontSize="4" fontWeight="bold">VIP</text>
    <text x="22" y="17" textAnchor="middle" fill="#dbeafe" fontSize="3" fontWeight="bold">$$$</text>
  </svg>
)

const PremiumDollarIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="dollarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <radialGradient id="dollarGlow" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#d1fae5" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#dollarGradient)" stroke="#065f46" strokeWidth="2"/>
    <ellipse cx="16" cy="12" rx="8" ry="10" fill="url(#dollarGlow)"/>
    <circle cx="16" cy="16" r="10" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.6"/>
    {/* Símbolo de dólar */}
    <line x1="16" y1="8" x2="16" y2="24" stroke="#ffffff" strokeWidth="2"/>
    <path d="M12 12c0-2 2-3 4-3s4 1 4 3c0 1-1 2-2 2h-4c-1 0-2 1-2 2s1 2 2 2h4c1 0 2 1 2 2s-2 3-4 3-4-1-4-3" 
          fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const PremiumStarIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <radialGradient id="starGlow" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#fef3c7" stopOpacity="0"/>
      </radialGradient>
    </defs>
    {/* Estrella principal */}
    <path d="M16 4 L19.5 11.5 L28 12.5 L22 18 L23.5 26.5 L16 22.5 L8.5 26.5 L10 18 L4 12.5 L12.5 11.5 Z" 
          fill="url(#starGradient)" stroke="#92400e" strokeWidth="1"/>
    {/* Brillo interno */}
    <ellipse cx="16" cy="16" rx="6" ry="8" fill="url(#starGlow)"/>
    {/* Estrella pequeña interior */}
    <path d="M16 8 L17.5 12.5 L22 13 L19 16 L20 20.5 L16 18 L12 20.5 L13 16 L10 13 L14.5 12.5 Z" 
          fill="#fcd34d" opacity="0.8"/>
    {/* Destellos */}
    <line x1="16" y1="2" x2="16" y2="6" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
    <line x1="16" y1="26" x2="16" y2="30" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
    <line x1="2" y1="16" x2="6" y2="16" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
    <line x1="26" y1="16" x2="30" y2="16" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const WPTBonusesSection = ({ bonuses, ticketsTable, bonusDetails }) => {
  const [currentBonus, setCurrentBonus] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

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
          <PremiumStarIcon className="w-4 h-4 mr-2" />
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
                  <div className="text-4xl md:text-5xl">{bonus.icon}</div>
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
                    <PremiumCheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
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
                    <div className="text-4xl">{pokerBonuses[currentBonus]?.icon}</div>
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
                      <PremiumCheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
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
            <PremiumTicketIcon className="w-6 h-6 mr-3" />
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
              <PremiumDollarIcon className="w-6 h-6 mr-3" />
              ¿Cómo Obtengo el Reembolso?
            </h3>
            <div className="text-gray-300 space-y-3 text-sm md:text-base">
              <p className="font-semibold text-white">
                ¡Solo tienes que jugar poker para recuperar el importe total de tu depósito!
              </p>
              <div className="flex items-center gap-2">
                <PremiumClockIcon className="w-5 h-5 flex-shrink-0" />
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
              <PremiumTicketIcon className="w-6 h-6 mr-3" />
              Beneficios Adicionales
            </h3>
            <div className="space-y-3 text-gray-300 text-sm md:text-base">
              <div className="flex items-center gap-3">
                <PremiumCheckIcon className="w-5 h-5 flex-shrink-0" />
                <span>100% de reembolso EN EFECTIVO</span>
              </div>
              <div className="flex items-center gap-3">
                <PremiumCheckIcon className="w-5 h-5 flex-shrink-0" />
                <span>Tickets para torneos MTT incluidos</span>
              </div>
              <div className="flex items-center gap-3">
                <PremiumCheckIcon className="w-5 h-5 flex-shrink-0" />
                <span>Acceso a Global Spins premium</span>
              </div>
              <div className="flex items-center gap-3">
                <PremiumCheckIcon className="w-5 h-5 flex-shrink-0" />
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
          <PremiumWhatsAppIcon className="w-6 h-6 mr-3" />
          <span className="hidden md:inline">RECLAMAR TODOS LOS BONOS</span>
          <span className="md:hidden">RECLAMAR BONOS</span>
        </a>
      </motion.div>
    </motion.div>
  )
}

export default WPTBonusesSection