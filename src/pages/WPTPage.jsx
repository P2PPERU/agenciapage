// src/pages/WPTPage.jsx (Versión con Iconos Premium Mejorados)
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { 
  FaTrophy, 
  FaGift, 
  FaDownload, 
  FaUserPlus, 
  FaDollarSign, 
  FaWhatsapp, 
  FaCheckCircle, 
  FaClock, 
  FaFire, 
  FaArrowRight,
  FaTicketAlt, 
  FaGamepad, 
  FaStar, 
  FaShieldAlt, 
  FaUsers,
  FaCalendar,
  FaChartLine,
  FaMoneyBillWave,
  FaGlobe
} from 'react-icons/fa'

// Importar componentes separados
import WPTBonusesSection from '../components/sections/WPTBonusesSection'
import WPTRegistrationSection from '../components/sections/WPTRegistrationSection'
import WPTTournamentsSection from '../components/sections/WPTTournamentsSection'

// Importar timer real
import { useNextTournamentTimer, formatTournamentName } from '../utils/tournamentTimer'

// Importar datos
import { 
  bonuses, 
  registrationSteps, 
  tournaments, 
  features, 
  ticketsTable,
  bonusDetails,
  promosPeru,
  crazyFreerollsInfo,
  crazySchedule,
  wptConstants 
} from '../data/wptData'

// ICONOS PREMIUM MEJORADOS PARA POKER
const PremiumPokerTableIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <defs>
      <linearGradient id="tableGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <radialGradient id="glowEffect" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
      </radialGradient>
    </defs>
    
    {/* Mesa de poker elíptica con sombra */}
    <ellipse cx="32" cy="34" rx="26" ry="16" fill="#000000" opacity="0.3"/>
    <ellipse cx="32" cy="32" rx="28" ry="18" fill="url(#tableGradient)" stroke="#065f46" strokeWidth="2"/>
    <ellipse cx="32" cy="32" rx="24" ry="14" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.7"/>
    
    {/* Fichas de poker premium distribuidas */}
    <g>
      {/* Ficha dorada premium */}
      <circle cx="20" cy="25" r="5" fill="url(#chipGradient)" stroke="#d97706" strokeWidth="1.5"/>
      <circle cx="20" cy="25" r="3.5" fill="none" stroke="#92400e" strokeWidth="0.8"/>
      <circle cx="20" cy="25" r="2" fill="none" stroke="#fbbf24" strokeWidth="0.5"/>
      <circle cx="20" cy="25" r="1" fill="#92400e"/>
      
      {/* Ficha roja premium */}
      <circle cx="44" cy="28" r="5" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5"/>
      <circle cx="44" cy="28" r="3.5" fill="none" stroke="#7f1d1d" strokeWidth="0.8"/>
      <circle cx="44" cy="28" r="2" fill="none" stroke="#fca5a5" strokeWidth="0.5"/>
      <circle cx="44" cy="28" r="1" fill="#7f1d1d"/>
      
      {/* Ficha azul premium */}
      <circle cx="32" cy="22" r="5" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5"/>
      <circle cx="32" cy="22" r="3.5" fill="none" stroke="#1e3a8a" strokeWidth="0.8"/>
      <circle cx="32" cy="22" r="2" fill="none" stroke="#93c5fd" strokeWidth="0.5"/>
      <circle cx="32" cy="22" r="1" fill="#1e3a8a"/>
      
      {/* Ficha morada premium */}
      <circle cx="38" cy="42" r="5" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1.5"/>
      <circle cx="38" cy="42" r="3.5" fill="none" stroke="#4c1d95" strokeWidth="0.8"/>
      <circle cx="38" cy="42" r="2" fill="none" stroke="#c4b5fd" strokeWidth="0.5"/>
      <circle cx="38" cy="42" r="1" fill="#4c1d95"/>
    </g>
    
    {/* Brillo superior */}
    <ellipse cx="32" cy="28" rx="20" ry="8" fill="url(#glowEffect)"/>
    
    {/* Cartas sobre la mesa */}
    <g opacity="0.8">
      <rect x="28" y="30" width="3" height="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.3" rx="0.3"/>
      <rect x="32" y="30" width="3" height="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.3" rx="0.3"/>
    </g>
  </svg>
)

const PremiumTrophyIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <defs>
      <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="30%" stopColor="#f59e0b" />
        <stop offset="70%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="trophyBase" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4b5563" />
        <stop offset="50%" stopColor="#374151" />
        <stop offset="100%" stopColor="#1f2937" />
      </linearGradient>
      <radialGradient id="trophyGlow" cx="30%" cy="20%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#fef3c7" stopOpacity="0"/>
      </radialGradient>
    </defs>
    
    {/* Sombra del trofeo */}
    <ellipse cx="32" cy="58" rx="18" ry="3" fill="#000000" opacity="0.3"/>
    
    {/* Base escalonada del trofeo */}
    <rect x="18" y="52" width="28" height="6" fill="url(#trophyBase)" rx="2"/>
    <rect x="20" y="48" width="24" height="6" fill="url(#trophyBase)" rx="2"/>
    <rect x="22" y="44" width="20" height="6" fill="url(#trophyBase)" rx="1"/>
    
    {/* Mango del trofeo */}
    <rect x="29" y="38" width="6" height="8" fill="url(#trophyGold)" rx="1"/>
    
    {/* Copa principal con forma más elegante */}
    <path d="M20 12 Q20 6 25 6 L39 6 Q44 6 44 12 L42 32 Q42 38 32 38 Q22 38 22 32 Z" 
          fill="url(#trophyGold)" stroke="#d97706" strokeWidth="1"/>
    
    {/* Asas decorativas del trofeo */}
    <path d="M18 16 Q14 16 14 20 Q14 24 18 24 Q20 24 20 22 Q20 20 18 18" 
          fill="url(#trophyGold)" stroke="#d97706" strokeWidth="1"/>
    <path d="M46 16 Q50 16 50 20 Q50 24 46 24 Q44 24 44 22 Q44 20 46 18" 
          fill="url(#trophyGold)" stroke="#d97706" strokeWidth="1"/>
    
    {/* Decoraciones en bandas */}
    <ellipse cx="32" cy="14" rx="9" ry="2" fill="#fcd34d"/>
    <ellipse cx="32" cy="22" rx="7" ry="1.5" fill="#fcd34d" opacity="0.8"/>
    <ellipse cx="32" cy="30" rx="5" ry="1" fill="#fcd34d" opacity="0.6"/>
    
    {/* Corona de laurel simplificada */}
    <path d="M25 10 Q28 8 32 10 Q36 8 39 10 Q36 12 32 12 Q28 12 25 10" 
          fill="#22c55e" stroke="#16a34a" strokeWidth="0.5"/>
    
    {/* Gema central */}
    <circle cx="32" cy="20" r="3" fill="#ef4444" stroke="#dc2626" strokeWidth="1"/>
    <circle cx="32" cy="20" r="1.5" fill="#f87171"/>
    <circle cx="30.5" cy="18.5" r="0.5" fill="#fecaca"/>
    
    {/* Brillo general */}
    <ellipse cx="28" cy="16" rx="4" ry="12" fill="url(#trophyGlow)"/>
    
    {/* Inscripción "1st" */}
    <text x="32" y="32" textAnchor="middle" fill="#92400e" fontSize="6" fontWeight="bold">1st</text>
  </svg>
)

const PremiumMoneyIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <defs>
      <linearGradient id="moneyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="coinGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <radialGradient id="coinShine" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9"/>
        <stop offset="70%" stopColor="#fef3c7" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#fef3c7" stopOpacity="0"/>
      </radialGradient>
    </defs>
    
    {/* Billetes apilados de fondo con sombra */}
    <g opacity="0.9">
      {/* Sombras de billetes */}
      <rect x="9" y="22" width="32" height="18" fill="#000000" opacity="0.2" rx="2" transform="rotate(-8)"/>
      <rect x="7" y="24" width="32" height="18" fill="#000000" opacity="0.2" rx="2" transform="rotate(-3)"/>
      
      {/* Billetes */}
      <rect x="8" y="20" width="32" height="18" fill="url(#moneyGreen)" rx="2" stroke="#047857" strokeWidth="1" transform="rotate(-5)"/>
      <rect x="6" y="22" width="32" height="18" fill="url(#moneyGreen)" rx="2" stroke="#047857" strokeWidth="1" opacity="0.8"/>
      <rect x="10" y="18" width="32" height="18" fill="url(#moneyGreen)" rx="2" stroke="#047857" strokeWidth="1" transform="rotate(8)"/>
      
      {/* Detalles de billetes */}
      <circle cx="24" cy="28" r="3" fill="#047857" opacity="0.6" transform="rotate(8)"/>
      <text x="24" y="32" textAnchor="middle" fill="#047857" fontSize="4" fontWeight="bold" transform="rotate(8)">$</text>
    </g>
    
    {/* Monedas doradas premium */}
    <g>
      {/* Sombras de monedas */}
      <circle cx="44" cy="37" r="10" fill="#000000" opacity="0.2"/>
      <circle cx="40" cy="27" r="10" fill="#000000" opacity="0.2"/>
      <circle cx="47" cy="22" r="10" fill="#000000" opacity="0.2"/>
      
      {/* Moneda trasera */}
      <circle cx="42" cy="35" r="10" fill="url(#coinGold)" stroke="#d97706" strokeWidth="1.5"/>
      <circle cx="42" cy="35" r="7" fill="none" stroke="#f59e0b" strokeWidth="1"/>
      <circle cx="42" cy="35" r="4" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
      <text x="42" y="40" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">$</text>
      
      {/* Moneda media */}
      <circle cx="38" cy="25" r="10" fill="url(#coinGold)" stroke="#d97706" strokeWidth="1.5"/>
      <circle cx="38" cy="25" r="7" fill="none" stroke="#f59e0b" strokeWidth="1"/>
      <circle cx="38" cy="25" r="4" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
      <ellipse cx="38" cy="25" rx="5" ry="7" fill="url(#coinShine)"/>
      <text x="38" y="30" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">$</text>
      
      {/* Moneda frontal */}
      <circle cx="45" cy="20" r="10" fill="url(#coinGold)" stroke="#d97706" strokeWidth="1.5"/>
      <circle cx="45" cy="20" r="7" fill="none" stroke="#f59e0b" strokeWidth="1"/>
      <circle cx="45" cy="20" r="4" fill="none" stroke="#fbbf24" strokeWidth="0.8"/>
      <ellipse cx="45" cy="20" rx="6" ry="8" fill="url(#coinShine)"/>
      <text x="45" y="25" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">$</text>
    </g>
    
    {/* Brillos adicionales */}
    <ellipse cx="40" cy="16" rx="4" ry="2" fill="#fef3c7" opacity="0.8"/>
    <ellipse cx="35" cy="21" rx="3" ry="1.5" fill="#fef3c7" opacity="0.6"/>
    <ellipse cx="39" cy="31" rx="2" ry="1" fill="#fef3c7" opacity="0.4"/>
  </svg>
)

// NUEVOS ICONOS PARA BADGES
const PremiumReembolsoIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <radialGradient id="shieldGlow" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#fef3c7" stopOpacity="0"/>
      </radialGradient>
    </defs>
    
    {/* Escudo protector */}
    <path d="M32 8 Q20 12 20 24 Q20 40 32 56 Q44 40 44 24 Q44 12 32 8 Z" 
          fill="url(#shieldGradient)" stroke="#92400e" strokeWidth="1.5"/>
    
    {/* Brillo del escudo */}
    <ellipse cx="32" cy="20" rx="8" ry="16" fill="url(#shieldGlow)"/>
    
    {/* Símbolo de reembolso - flecha circular */}
    <circle cx="32" cy="28" r="12" fill="none" stroke="#fef3c7" strokeWidth="2"/>
    <path d="M28 20 L32 16 L36 20 M32 16 L32 28" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M36 36 L32 40 L28 36 M32 40 L32 28" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round"/>
    
    {/* Símbolo de dinero */}
    <text x="32" y="46" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">$</text>
  </svg>
)

const PremiumPackageIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <defs>
      <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#5b21b6" />
      </linearGradient>
      <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    
    {/* Sombra de la caja */}
    <rect x="12" y="32" width="40" height="24" fill="#000000" opacity="0.3" rx="2"/>
    
    {/* Caja principal */}
    <rect x="12" y="30" width="40" height="24" fill="url(#boxGradient)" rx="2" stroke="#5b21b6" strokeWidth="1"/>
    
    {/* Tapa de la caja */}
    <rect x="12" y="20" width="40" height="12" fill="url(#boxGradient)" rx="2" stroke="#5b21b6" strokeWidth="1"/>
    
    {/* Cinta dorada */}
    <rect x="30" y="16" width="4" height="28" fill="url(#ribbonGradient)"/>
    <rect x="10" y="24" width="44" height="4" fill="url(#ribbonGradient)"/>
    
    {/* Lazo superior */}
    <ellipse cx="28" cy="18" rx="4" ry="2" fill="url(#ribbonGradient)"/>
    <ellipse cx="36" cy="18" rx="4" ry="2" fill="url(#ribbonGradient)"/>
    <circle cx="32" cy="18" r="2" fill="url(#ribbonGradient)"/>
    
    {/* Brillos */}
    <rect x="16" y="24" width="8" height="2" fill="#c4b5fd" opacity="0.6" rx="1"/>
    <rect x="30" y="36" width="12" height="1" fill="#c4b5fd" opacity="0.4" rx="0.5"/>
    
    {/* Fichas saliendo de la caja */}
    <circle cx="46" cy="14" r="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1"/>
    <circle cx="50" cy="18" r="3" fill="#ef4444" stroke="#dc2626" strokeWidth="1"/>
    <circle cx="42" cy="10" r="3" fill="#22c55e" stroke="#16a34a" strokeWidth="1"/>
  </svg>
)

const PremiumTicketIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <defs>
      <linearGradient id="ticketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <pattern id="ticketPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1" fill="#60a5fa" opacity="0.3"/>
      </pattern>
    </defs>
    
    {/* Sombra del ticket */}
    <rect x="8" y="26" width="48" height="20" fill="#000000" opacity="0.3" rx="3"/>
    
    {/* Tickets apilados */}
    <rect x="6" y="22" width="48" height="20" fill="url(#ticketGradient)" rx="3" stroke="#1d4ed8" strokeWidth="1" opacity="0.8"/>
    <rect x="8" y="24" width="48" height="20" fill="url(#ticketGradient)" rx="3" stroke="#1d4ed8" strokeWidth="1"/>
    
    {/* Patrón de puntos */}
    <rect x="8" y="24" width="48" height="20" fill="url(#ticketPattern)" rx="3"/>
    
    {/* Perforaciones del ticket */}
    <circle cx="36" cy="24" r="2" fill="#1e40af"/>
    <circle cx="36" cy="44" r="2" fill="#1e40af"/>
    
    {/* Línea punteada */}
    <line x1="36" y1="26" x2="36" y2="42" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2,2"/>
    
    {/* Texto del ticket */}
    <rect x="12" y="28" width="20" height="12" fill="#1e40af" opacity="0.3" rx="1"/>
    <text x="22" y="36" textAnchor="middle" fill="#bfdbfe" fontSize="6" fontWeight="bold">VIP</text>
    
    {/* Valor del ticket */}
    <text x="46" y="36" textAnchor="middle" fill="#bfdbfe" fontSize="8" fontWeight="bold">$$$</text>
    
    {/* Estrella premium */}
    <path d="M50 18 L52 22 L56 22 L53 25 L54 29 L50 27 L46 29 L47 25 L44 22 L48 22 Z" 
          fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5"/>
  </svg>
)

const iconMap = {
  FaUsers: FaUsers,
  FaClock: FaClock,
  FaShieldAlt: FaShieldAlt,
  FaGamepad: FaGamepad
}

const WPTPage = () => {
  const { section } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  
  // Hook del timer real
  const { nextTournament, timeRemaining, isLoading: timerLoading } = useNextTournamentTimer()
  
  const activeTab = section || 'bonos'
  
  // Validar que la sección existe
  const validSections = ['bonos', 'registro', 'torneos']
  useEffect(() => {
    if (section && !validSections.includes(section)) {
      navigate('/wpt/bonos', { replace: true })
    }
  }, [section, navigate])

  // Función para hacer scroll al contenido
  const scrollToContent = () => {
    setTimeout(() => {
      const sectionElement = document.getElementById('wpt-content')
      if (sectionElement) {
        const navHeight = window.innerWidth < 768 ? 160 : 200
        const elementPosition = sectionElement.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navHeight
        
        window.scrollTo({ 
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  // Scroll automático a la sección cuando se carga directamente
  useEffect(() => {
    if (section && !isLoading) {
      scrollToContent()
    }
  }, [section, isLoading])

  // Loading inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Obtener información del próximo torneo
  const getTournamentDisplayInfo = () => {
    if (timerLoading || !nextTournament) {
      return {
        prize: '$10,000',
        type: 'FREEROLL',
        frequency: 'DIARIO',
        emoji: '🏆'
      }
    }

    if (nextTournament.type === 'super') {
      return {
        prize: '$100,000',
        type: 'SUPER FREEROLL',
        frequency: 'DOMINICAL',
        emoji: '👑'
      }
    } else {
      return {
        prize: '$10,000',
        type: 'FREEROLL',
        frequency: 'DIARIO',
        emoji: '🏆'
      }
    }
  }

  const tournamentDisplay = getTournamentDisplayInfo()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-poker-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-poker-gold border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-poker-black">
      {/* Hero Section - RESPONSIVE MEJORADO */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background con mesas de poker */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-green-900/20 to-red-900/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
          
          {/* Patrón de cartas - Oculto en móviles muy pequeños */}
          <div className="absolute inset-0 opacity-5 hidden xs:block">
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-4 rotate-12 scale-150">
              {[...Array(48)].map((_, i) => (
                <div key={i} className="text-3xl sm:text-6xl">
                  {i % 4 === 0 && '♠'}
                  {i % 4 === 1 && '♥'}
                  {i % 4 === 2 && '♦'}
                  {i % 4 === 3 && '♣'}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contenido del Hero */}
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Logo WPT ULTRA RESPONSIVE */}
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", damping: 10 }}
              className="mb-3 sm:mb-4 md:mb-6"
            >
              <div className="inline-block relative">
                {/* Sombra del logo */}
                <div className="absolute inset-0 bg-black/40 rounded-xl sm:rounded-2xl blur-sm sm:blur-lg transform translate-y-1 sm:translate-y-2 scale-105"></div>
                
                {/* Logo WPT escalable */}
                <div className="relative bg-gradient-to-r from-blue-600 via-white to-red-600 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl">
                  <div className="bg-gradient-to-br from-gray-900 to-black px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl">
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-500 via-white to-red-500 bg-clip-text text-transparent mb-1 tracking-wide">
                      WPT
                    </h1>
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent flex-1"></div>
                      <p className="text-white text-xs sm:text-sm md:text-lg font-bold tracking-[0.2em] sm:tracking-[0.3em]">GLOBAL</p>
                      <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent flex-1"></div>
                    </div>
                    <p className="text-yellow-500 text-xs sm:text-sm font-semibold mt-1 tracking-wide">
                      WORLD POKER TOUR
                    </p>
                  </div>
                </div>

                {/* Badge exclusivo Peru - Responsive */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-1 -right-2 sm:-top-0 sm:-right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs font-black shadow-lg"
                >
                  🇵🇪 <span className="hidden xs:inline">PERÚ</span> <span className="hidden sm:inline">EXCLUSIVE</span>
                </motion.div>
              </div>
            </motion.div>
            
            {/* TÍTULOS RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-green-400 mb-3 sm:mb-4 px-2">
                LA SALA CON MÁS RECREACIONALES DEL MERCADO
              </h2>
              
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent flex-1 max-w-12 sm:max-w-20"></div>
                <FaGlobe className="text-green-500 text-lg sm:text-xl" />
                <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent flex-1 max-w-12 sm:max-w-20"></div>
              </div>
              
              <p className="text-base sm:text-lg md:text-2xl text-yellow-400 font-bold mb-4 sm:mb-6 px-2">
                Las mesas más suaves del mundo abrieron sus puertas a Perú en exclusiva con nosotros
              </p>
              
              {/* Slogan potente - Responsive */}
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-6 max-w-xs xs:max-w-sm sm:max-w-4xl mx-auto mb-4 sm:mb-6">
                <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-1 sm:mb-2">
                  GÁNALE A LAS BALLENAS ASIÁTICAS
                </h3>
                <p className="text-sm sm:text-lg text-white/90 italic leading-tight sm:leading-normal">
                  "Gana así de fácil como en los poker rooms" - Acceso directo a los juegos más soft
                </p>
              </div>
            </motion.div>

            {/* Features de poker room con ICONOS PREMIUM - GRID RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-xs xs:max-w-sm sm:max-w-4xl mx-auto"
            >
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-black/30 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-500/30 hover:border-green-500/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-2 sm:mb-3">
                  <PremiumPokerTableIcon className="w-8 h-8 sm:w-12 sm:h-12" />
                </div>
                <h4 className="text-white font-bold mb-1 text-sm sm:text-base">MESAS ULTRA-SOFT</h4>
                <p className="text-green-400 text-xs sm:text-sm">Jugadores recreacionales 24/7</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-black/30 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-2 sm:mb-3">
                  <PremiumTrophyIcon className="w-8 h-8 sm:w-12 sm:h-12" />
                </div>
                <h4 className="text-white font-bold mb-1 text-sm sm:text-base">FREEROLLS DIARIOS</h4>
                <p className="text-blue-400 text-xs sm:text-sm">$10K garantizados gratis</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-black/30 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 xs:col-span-1 sm:col-span-1"
              >
                <div className="flex justify-center mb-2 sm:mb-3">
                  <PremiumMoneyIcon className="w-8 h-8 sm:w-12 sm:h-12" />
                </div>
                <h4 className="text-white font-bold mb-1 text-sm sm:text-base">BONOS MASIVOS</h4>
                <p className="text-yellow-400 text-xs sm:text-sm">Hasta $3,580 en recompensas</p>
              </motion.div>
            </motion.div>
            
            {/* Badges de ofertas con ICONOS PREMIUM - RESPONSIVE */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full font-bold shadow-lg text-xs sm:text-sm flex items-center gap-2"
              >
                <PremiumReembolsoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Reembolso</span>
                <span className="hidden xs:inline">Hasta $3,000</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full font-bold shadow-lg text-xs sm:text-sm flex items-center gap-2"
              >
                <PremiumPackageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Paquete</span>
                <span className="hidden xs:inline">$16.20 USD</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full font-bold shadow-lg text-xs sm:text-sm flex items-center gap-2"
              >
                <PremiumTicketIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Tickets</span>
                <span className="hidden xs:inline">Hasta $480</span>
              </motion.div>
            </div>
            
            {/* CTAs principales con ICONOS MEJORADOS - PROPORCIONES BALANCEADAS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0 max-w-lg sm:max-w-none mx-auto">
              <motion.a
                href={`https://wa.me/${wptConstants.whatsappNumber}?text=${wptConstants.whatsappMessages.register}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 sm:px-6 py-3 sm:py-3 rounded-full text-base sm:text-lg shadow-xl"
              >
                <FaWhatsapp className="mr-2 text-lg sm:text-xl" />
                REGISTRARME AHORA
              </motion.a>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/wpt/bonos"
                  className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 sm:px-6 py-3 sm:py-3 rounded-full text-base sm:text-lg border-2 border-gray-700 transition-all duration-300"
                >
                  <div className="w-5 h-5 mr-2">
                    <PremiumMoneyIcon className="w-5 h-5" />
                  </div>
                  VER BONOS
                </Link>
              </motion.div>
            </div>
            
            {/* Contador de Freeroll - RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`mt-6 sm:mt-8 inline-block rounded-xl sm:rounded-2xl p-3 sm:p-4 mx-2 sm:mx-0 ${
                nextTournament?.type === 'super' 
                  ? 'bg-purple-600/20 border border-purple-500' 
                  : 'bg-red-600/20 border border-red-500'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  <PremiumTrophyIcon className="w-full h-full" />
                </div>
                <p className={`font-bold text-sm sm:text-base text-center ${
                  nextTournament?.type === 'super' ? 'text-purple-400' : 'text-red-400'
                }`}>
                  PRÓXIMO {tournamentDisplay.type} {tournamentDisplay.prize}
                </p>
              </div>
              
              {/* Información adicional del torneo */}
              {nextTournament && !timerLoading && (
                <p className="text-gray-300 text-xs sm:text-sm mb-3 text-center">
                  {nextTournament.day} {nextTournament.date} a las {nextTournament.time}h (Hora Perú)
                </p>
              )}
              
              {/* Timer real - RESPONSIVE */}
              {!timeRemaining.isExpired ? (
                <div className="flex gap-2 sm:gap-3 justify-center">
                  <div className="bg-black/50 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2">
                    <span className="text-xl sm:text-3xl font-bold text-white block">
                      {String(timeRemaining.hours).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-400 block text-center">HORAS</span>
                  </div>
                  <span className="text-xl sm:text-3xl text-white self-center">:</span>
                  <div className="bg-black/50 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2">
                    <span className="text-xl sm:text-3xl font-bold text-white block">
                      {String(timeRemaining.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-400 block text-center">MIN</span>
                  </div>
                  <span className="text-xl sm:text-3xl text-white self-center">:</span>
                  <div className="bg-black/50 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-2">
                    <span className="text-xl sm:text-3xl font-bold text-white block">
                      {String(timeRemaining.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-400 block text-center">SEG</span>
                  </div>
                </div>
              ) : (
                <div className="bg-black/50 rounded-md sm:rounded-lg px-3 sm:px-4 py-2">
                  <div className="text-white font-bold flex items-center justify-center gap-2 text-sm sm:text-base">
                    <FaClock className="animate-spin" />
                    <span className="hidden sm:inline">Actualizando próximo torneo...</span>
                    <span className="sm:hidden">Actualizando...</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features rápidas - RESPONSIVE GRID */}
      <section className="py-8 sm:py-12 bg-gray-900/50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl sm:text-4xl text-yellow-500 mb-1 sm:mb-2">
                  {React.createElement(iconMap[feature.iconName])}
                </div>
                <h3 className="text-white font-bold text-sm sm:text-base">{feature.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tabs de navegación - STICKY RESPONSIVE */}
      <div className="sticky top-16 sm:top-20 z-30 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex overflow-x-auto gap-2 py-3 sm:py-4 scrollbar-hide">
            {[
              { key: 'bonos', icon: PremiumMoneyIcon, label: 'BONOS' },
              { key: 'registro', icon: null, label: 'REGISTRO' },
              { key: 'torneos', icon: PremiumTrophyIcon, label: 'TORNEOS' }
            ].map(tab => (
              <Link
                key={tab.key}
                to={`/wpt/${tab.key}`}
                onClick={scrollToContent}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition whitespace-nowrap text-sm sm:text-base flex-shrink-0 flex items-center gap-2 ${
                  activeTab === tab.key 
                    ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon && <tab.icon className="w-4 h-4" />}
                {!tab.icon && tab.key === 'registro' && '📝'}
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contenido según tab activo */}
      <div id="wpt-content" className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'bonos' && (
            <WPTBonusesSection 
              bonuses={bonuses} 
              ticketsTable={ticketsTable}
              bonusDetails={bonusDetails}
            />
          )}
          
          {activeTab === 'registro' && (
            <WPTRegistrationSection 
              registrationSteps={registrationSteps} 
              promosPeru={promosPeru}
            />
          )}
          
          {activeTab === 'torneos' && (
            <WPTTournamentsSection 
              tournaments={tournaments}
              crazyFreerollsInfo={crazyFreerollsInfo}
              crazySchedule={crazySchedule}
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* CTA Final - RESPONSIVE */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-900/50 to-red-900/50">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
              ¿LISTO PARA JUGAR EN WPT?
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Únete a la élite del poker mundial. Registro en menos de 5 minutos 
              con nuestra asistencia personalizada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-2 sm:px-0 max-w-lg sm:max-w-none mx-auto">
              <a
                href={`https://wa.me/${wptConstants.whatsappNumber}?text=${wptConstants.whatsappMessages.startNow}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 sm:px-6 py-3 sm:py-3 rounded-full text-base sm:text-lg hover:scale-105 transition shadow-xl"
              >
                <FaWhatsapp className="mr-2 text-lg sm:text-xl" />
                EMPEZAR AHORA
              </a>
              
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 sm:px-6 py-3 sm:py-3 rounded-full text-base sm:text-lg transition"
              >
                <FaArrowRight className="mr-2" />
                VER OTRAS SALAS
              </Link>
            </div>
            
            <div className="flex flex-col xs:flex-row justify-center gap-4 xs:gap-8 text-gray-400 text-sm sm:text-base">
              <div className="flex items-center justify-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Registro Gratis</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>100% Seguro</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default WPTPage