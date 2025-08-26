// src/utils/iconMapping.js - SISTEMA DE MAPEO DE ICONOS PREMIUM
import React from 'react'

// TODOS LOS ICONOS PREMIUM CENTRALIZADOS
const PremiumDollarIcon = ({ className = "w-6 h-6" }) => (
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
    <line x1="16" y1="8" x2="16" y2="24" stroke="#ffffff" strokeWidth="2"/>
    <path d="M12 12c0-2 2-3 4-3s4 1 4 3c0 1-1 2-2 2h-4c-1 0-2 1-2 2s1 2 2 2h4c1 0 2 1 2 2s-2 3-4 3-4-1-4-3" 
          fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const PremiumGiftIcon = ({ className = "w-6 h-6" }) => (
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
    <rect x="6" y="12" width="20" height="16" fill="url(#giftGradient)" rx="2" stroke="#7f1d1d" strokeWidth="1"/>
    <rect x="6" y="10" width="20" height="4" fill="url(#giftGradient)" rx="1" stroke="#7f1d1d" strokeWidth="1"/>
    <rect x="14.5" y="6" width="3" height="22" fill="url(#ribbonGradient)"/>
    <rect x="4" y="11" width="24" height="3" fill="url(#ribbonGradient)"/>
    <ellipse cx="12" cy="8" rx="3" ry="2" fill="url(#ribbonGradient)"/>
    <ellipse cx="20" cy="8" rx="3" ry="2" fill="url(#ribbonGradient)"/>
    <circle cx="16" cy="8" r="1.5" fill="url(#ribbonGradient)"/>
  </svg>
)

const PremiumTicketIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="ticketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
    <rect x="3" y="9" width="24" height="12" fill="url(#ticketGradient)" rx="2" stroke="#1e40af" strokeWidth="1" opacity="0.8"/>
    <rect x="4" y="10" width="24" height="12" fill="url(#ticketGradient)" rx="2" stroke="#1e40af" strokeWidth="1"/>
    <circle cx="16" cy="10" r="1" fill="#1e40af"/>
    <circle cx="16" cy="22" r="1" fill="#1e40af"/>
    <line x1="16" y1="12" x2="16" y2="20" stroke="#93c5fd" strokeWidth="1" strokeDasharray="1,1"/>
  </svg>
)

const PremiumCoinsIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="coinsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="18" r="7" fill="url(#coinsGradient)" stroke="#92400e" strokeWidth="1"/>
    <circle cx="12" cy="14" r="8" fill="url(#coinsGradient)" stroke="#92400e" strokeWidth="1.5"/>
    <text x="12" y="19" textAnchor="middle" fill="#92400e" fontSize="7" fontWeight="bold">$</text>
  </svg>
)

const PremiumStarIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <path d="M16 4 L19.5 11.5 L28 12.5 L22 18 L23.5 26.5 L16 22.5 L8.5 26.5 L10 18 L4 12.5 L12.5 11.5 Z" 
          fill="url(#starGradient)" stroke="#92400e" strokeWidth="1"/>
    <path d="M16 8 L17.5 12.5 L22 13 L19 16 L20 20.5 L16 18 L12 20.5 L13 16 L10 13 L14.5 12.5 Z" 
          fill="#fcd34d" opacity="0.8"/>
  </svg>
)

const PremiumTrophyIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <rect x="10" y="26" width="12" height="4" fill="#4b5563" rx="1"/>
    <rect x="15" y="20" width="2" height="5" fill="url(#trophyGradient)"/>
    <path d="M12 8 Q12 4 16 4 Q20 4 20 8 L19 18 Q19 20 16 20 Q13 20 13 18 Z" 
          fill="url(#trophyGradient)" stroke="#d97706" strokeWidth="1"/>
    <circle cx="16" cy="12" r="2" fill="#ef4444"/>
  </svg>
)

const PremiumAppleIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="appleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#007aff" />
        <stop offset="100%" stopColor="#0051d5" />
      </linearGradient>
    </defs>
    <path d="M22 12c0-3-2.5-5.5-5.5-5.5S11 9 11 12c0 3 2.5 5.5 5.5 5.5S22 15 22 12z" fill="url(#appleGradient)"/>
    <path d="M16.5 6.5c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z" fill="url(#appleGradient)"/>
    <rect x="12" y="18" width="8" height="10" fill="url(#appleGradient)" rx="4"/>
  </svg>
)

const PremiumAndroidIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="androidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3ddc84" />
        <stop offset="100%" stopColor="#07c160" />
      </linearGradient>
    </defs>
    <path d="M16 4c-6 0-11 5-11 11v8c0 2 2 4 4 4h14c2 0 4-2 4-4v-8c0-6-5-11-11-11z" fill="url(#androidGradient)"/>
    <circle cx="12" cy="12" r="1.5" fill="#ffffff"/>
    <circle cx="20" cy="12" r="1.5" fill="#ffffff"/>
    <path d="M10 6 L8 4 M22 6 L24 4" stroke="url(#androidGradient)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const PremiumWindowsIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="windowsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0078d4" />
        <stop offset="100%" stopColor="#106ebe" />
      </linearGradient>
    </defs>
    <path d="M4 8 L13 7 L13 15 L4 15 Z" fill="url(#windowsGradient)"/>
    <path d="M15 7 L28 5 L28 15 L15 15 Z" fill="url(#windowsGradient)"/>
    <path d="M4 17 L13 17 L13 25 L4 24 Z" fill="url(#windowsGradient)"/>
    <path d="M15 17 L28 17 L28 27 L15 25 Z" fill="url(#windowsGradient)"/>
  </svg>
)

const PremiumMacIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="macGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a8a8a8" />
        <stop offset="100%" stopColor="#7a7a7a" />
      </linearGradient>
    </defs>
    <rect x="4" y="8" width="24" height="16" fill="url(#macGradient)" rx="2"/>
    <rect x="6" y="10" width="20" height="12" fill="#000000" rx="1"/>
    <rect x="12" y="24" width="8" height="2" fill="url(#macGradient)" rx="1"/>
    <rect x="8" y="26" width="16" height="2" fill="url(#macGradient)" rx="1"/>
  </svg>
)

const PremiumTargetIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="none" stroke="url(#targetGradient)" strokeWidth="2"/>
    <circle cx="16" cy="16" r="10" fill="none" stroke="url(#targetGradient)" strokeWidth="2"/>
    <circle cx="16" cy="16" r="6" fill="none" stroke="url(#targetGradient)" strokeWidth="2"/>
    <circle cx="16" cy="16" r="3" fill="url(#targetGradient)"/>
  </svg>
)

const PremiumGamepadIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="gamepadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <path d="M8 12 L24 12 C26 12 28 14 28 16 L28 20 C28 22 26 24 24 24 L8 24 C6 24 4 22 4 20 L4 16 C4 14 6 12 8 12 Z" 
          fill="url(#gamepadGradient)"/>
    <circle cx="10" cy="16" r="2" fill="#ffffff"/>
    <circle cx="22" cy="16" r="2" fill="#ffffff"/>
    <circle cx="14" cy="18" r="1" fill="#ffffff"/>
    <circle cx="18" cy="18" r="1" fill="#ffffff"/>
  </svg>
)

// MAPEO DE ICONOS PREMIUM
export const PREMIUM_ICON_MAP = {
  PremiumDollarIcon,
  PremiumGiftIcon, 
  PremiumTicketIcon,
  PremiumCoinsIcon,
  PremiumStarIcon,
  PremiumTrophyIcon,
  PremiumAppleIcon,
  PremiumAndroidIcon,
  PremiumWindowsIcon,
  PremiumMacIcon,
  PremiumTargetIcon,
  PremiumGamepadIcon
}

// HOOK PARA RENDERIZAR ICONOS DINÁMICAMENTE
export const usePremiumIcon = () => {
  const renderIcon = (iconName, props = {}) => {
    const IconComponent = PREMIUM_ICON_MAP[iconName]
    
    if (!IconComponent) {
      console.warn(`Icono premium no encontrado: ${iconName}`)
      return null
    }
    
    return <IconComponent {...props} />
  }
  
  return { renderIcon }
}

// COMPONENTE HELPER PARA RENDERIZADO DIRECTO
export const PremiumIcon = ({ name, className = "w-6 h-6", ...props }) => {
  const { renderIcon } = usePremiumIcon()
  return renderIcon(name, { className, ...props })
}

// ====================================================
// EJEMPLOS DE USO EN TUS COMPONENTES:
// ====================================================

// Ejemplo 1: En WPTBonusesSection.jsx
/*
import { PremiumIcon, usePremiumIcon } from '../utils/iconMapping'
import { bonuses } from '../data/wptData'

const WPTBonusesSection = () => {
  const { renderIcon } = usePremiumIcon()
  
  return (
    <div>
      {bonuses.map(bonus => (
        <div key={bonus.id}>
          {renderIcon(bonus.icon, { className: "w-8 h-8" })}
          <h3>{bonus.title}</h3>
        </div>
      ))}
    </div>
  )
}
*/

// Ejemplo 2: Usando el componente PremiumIcon directamente
/*
import { PremiumIcon } from '../utils/iconMapping'

const MiComponente = () => (
  <div>
    <PremiumIcon name="PremiumDollarIcon" className="w-10 h-10" />
    <PremiumIcon name="PremiumGiftIcon" className="w-6 h-6 text-red-500" />
  </div>
)
*/

// Ejemplo 3: Para plataformas de descarga
/*
{step.downloads?.map((download, i) => (
  <div key={i}>
    <PremiumIcon name={download.icon} className="w-12 h-12" />
    <span>{download.platform}</span>
  </div>
))}
*/

export default {
  PREMIUM_ICON_MAP,
  usePremiumIcon,
  PremiumIcon
}