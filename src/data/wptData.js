// src/data/wptData.js

export const bonuses = [
  {
    id: 1,
    title: 'Reembolso 100% en CASH',
    amount: 'Hasta $3,000',
    description: 'Deposita de $10 a $3,000 y te devolvemos el monto total EN EFECTIVO',
    icon: '💰',
    requirements: 'Tienes 90 días para recuperarlo jugando',
    color: 'from-yellow-500 to-orange-500',
    featured: true
  },
  {
    id: 2,
    title: 'Paquete de Regalo Instantáneo',
    amount: '$16.20 USD',
    description: 'Con cualquier depósito de $10 o más recibes este paquete al instante',
    icon: '🎁',
    requirements: 'Bono poker $5 + Casino $5 + Tickets $4.20',
    color: 'from-purple-500 to-purple-700',
    featured: true
  },
  {
    id: 3,
    title: 'Tickets para Torneos MTT',
    amount: 'Hasta $480',
    description: 'Tickets gratis para MTT y Global Spins según tu depósito',
    icon: '🎫',
    requirements: 'Desde $10 - Escalas según el monto',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 4,
    title: 'Monedas de Casino Gratis',
    amount: 'Hasta $100',
    description: 'Monedas gratis para usar en el casino de WPT Global',
    icon: '🪙',
    requirements: 'Incluidas en el paquete de bienvenida',
    color: 'from-green-500 to-green-700'
  }
]

export const registrationSteps = [
  {
    step: 1,
    title: 'Descarga la App',
    description: 'Selecciona tu plataforma y descarga WPT Global',
    iconName: 'FaDownload',
    action: 'Descargar',
    downloads: [
      { platform: 'iOS', icon: '📱', url: 'https://testflight.apple.com/join/E8MUn83b' },
      { platform: 'Mac', icon: '🍏', url: 'https://downloads.wptglobal.com/latest/WPTG.dmg' },
      { platform: 'Android', icon: '🤖', url: 'https://downloads.wptglobal.com/latest/WPTG.apk' },
      { platform: 'Windows', icon: '💻', url: 'https://downloads.wptglobal.com/latest/WPTG.exe' }
    ]
  },
  {
    step: 2,
    title: 'Selecciona Andorra como País',
    description: 'En el registro, selecciona Andorra como país principal',
    iconName: 'FaGlobeAmericas',
    action: 'Seleccionar país',
    highlight: 'Importante: Usa Andorra, no Perú'
  },
  {
    step: 3,
    title: 'Crea tu Cuenta',
    description: 'Registra tu cuenta usando tu correo electrónico real',
    iconName: 'FaUserPlus',
    action: 'Crear cuenta',
    highlight: 'Usa tus datos reales (solo cambia el país)'
  },
  {
    step: 4,
    title: 'Ingresa los Códigos',
    description: 'Usa nuestros códigos exclusivos para bonos especiales',
    iconName: 'FaKey',
    action: 'Ingresar códigos',
    codes: {
      invitado: '8288C1',
      bonificacion: 'PeruEV'
    }
  },
  {
    step: 5,
    title: 'Verifica y Juega',
    description: 'Completa la verificación y accede a promociones exclusivas',
    iconName: 'FaCheckCircle',
    action: 'Verificar',
    whatsapp: 'wa.link/bigy9b'
  }
]

export const tournaments = [
  {
    name: '$10K Daily Crazy Freeroll',
    guarantee: '$10,000 GTD',
    buyIn: 'GRATIS',
    time: 'Lunes a Sábado',
    winner: '$2,000 al ganador',
    type: 'crazy-daily',
    featured: true
  },
  {
    name: '$100K Super Crazy Freeroll',
    guarantee: '$100,000 GTD',
    buyIn: 'GRATIS',
    time: 'Domingos',
    winner: '$20,000 al ganador',
    type: 'crazy-super',
    featured: true
  },
  {
    name: 'Sunday Million',
    guarantee: '$1,000,000 GTD',
    buyIn: '$109',
    time: 'Domingos 18:00',
    satellites: 'Desde $5',
    type: 'main'
  },
  {
    name: 'Daily Special',
    guarantee: '$50,000 GTD',
    buyIn: '$33',
    time: 'Todos los días 20:00',
    satellites: 'Desde $3',
    type: 'daily'
  }
]

export const crazyFreerollsInfo = {
  totalPrize: '$2,000,000',
  duration: '18 AGO - 5 OCT',
  description: 'En WPT Global nos volvimos completamente locos por los torneos gratuitos y regalaremos $2,000,000',
  ticketWays: [
    {
      title: '4 tickets semanales GRATIS',
      description: 'Todos los jugadores registrados reciben 4 tickets por semana',
      icon: '🎟️',
      multiplier: 'x4'
    },
    {
      title: '24 satélites gratuitos diarios',
      description: 'Hay 24 satélites gratis por día, cada uno con 20 asientos garantizados',
      icon: '🎯',
      multiplier: 'x24'
    },
    {
      title: 'Top 20 gana ticket $100K',
      description: 'El top 20 del Daily Crazy Freeroll gana un boleto al $100K Sunday',
      icon: '🏆',
      prize: '$100,000'
    },
    {
      title: 'Juega para ganar tickets',
      description: 'Juega MTTs/Global Spins/Casino/Deportes para ganar Daily y Sunday tickets',
      icon: '🎮',
      activity: 'Multi-juegos'
    }
  ],
  weeklyRequirements: [
    { amount: '$10+', reward: '5 tickets para Daily Freeroll' },
    { amount: '$1,500-$4,999', reward: '1 ticket para $100K Super' },
    { amount: '$5,000-$9,999', reward: '2 tickets para $100K Super' },
    { amount: '$10,000+', reward: '3 tickets para $100K Super' }
  ]
}

export const crazySchedule = [
  { date: 'Aug-18', day: 'Mon', time: '12:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Opener', prize: '$10K' },
  { date: 'Aug-19', day: 'Tue', time: '18:00', name: '$10K Daily Crazy Freeroll Super Sonic Kick-off', prize: '$10K' },
  { date: 'Aug-20', day: 'Wed', time: '23:30', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K' },
  { date: 'Aug-21', day: 'Thu', time: '18:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K' },
  { date: 'Aug-22', day: 'Fri', time: '23:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Aug-23', day: 'Sat', time: '12:00', name: '$10K Daily Crazy Freeroll Asia Hyper Sonic', prize: '$10K' },
  { date: 'Aug-24', day: 'Sun', time: '18:00', name: '$100K Super Crazy Freeroll Hyper EuroStar', prize: '$100K', featured: true },
  { date: 'Aug-25', day: 'Mon', time: '18:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Aug-26', day: 'Tue', time: '12:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K' },
  { date: 'Aug-27', day: 'Wed', time: '23:30', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K' },
  { date: 'Aug-28', day: 'Thu', time: '18:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K' },
  { date: 'Aug-29', day: 'Fri', time: '23:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Aug-30', day: 'Sat', time: '12:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Aug-31', day: 'Sun', time: '12:00', name: '$100K Super Crazy Freeroll Asia Grand Dash', prize: '$100K', featured: true },
  { date: 'Sep-1', day: 'Mon', time: '18:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K' },
  { date: 'Sep-2', day: 'Tue', time: '12:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-3', day: 'Wed', time: '23:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-4', day: 'Thu', time: '18:00', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K' },
  { date: 'Sep-5', day: 'Fri', time: '23:30', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K' },
  { date: 'Sep-6', day: 'Sat', time: '12:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K' },
  { date: 'Sep-7', day: 'Sun', time: '23:30', name: '$100K Super Crazy Freeroll Carnival Frenzy', prize: '$100K', featured: true },
  { date: 'Sep-8', day: 'Mon', time: '18:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-9', day: 'Tue', time: '12:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K' },
  { date: 'Sep-10', day: 'Wed', time: '23:30', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K' },
  { date: 'Sep-11', day: 'Thu', time: '18:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K' },
  { date: 'Sep-12', day: 'Fri', time: '23:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-13', day: 'Sat', time: '12:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-14', day: 'Sun', time: '18:00', name: '$100K Super Crazy Freeroll Euro Grand Prix', prize: '$100K', featured: true },
  { date: 'Sep-15', day: 'Mon', time: '18:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K' },
  { date: 'Sep-16', day: 'Tue', time: '12:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-17', day: 'Wed', time: '23:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-18', day: 'Thu', time: '18:00', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K' },
  { date: 'Sep-19', day: 'Fri', time: '23:30', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K' },
  { date: 'Sep-20', day: 'Sat', time: '12:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K' },
  { date: 'Sep-21', day: 'Sun', time: '23:30', name: '$100K Super Crazy Freeroll Fiesta [Mystery]', prize: '$100K', featured: true },
  { date: 'Sep-22', day: 'Mon', time: '18:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-23', day: 'Tue', time: '12:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K' },
  { date: 'Sep-24', day: 'Wed', time: '23:30', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K' },
  { date: 'Sep-25', day: 'Thu', time: '18:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K' },
  { date: 'Sep-26', day: 'Fri', time: '23:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-27', day: 'Sat', time: '12:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Sep-28', day: 'Sun', time: '18:00', name: '$100K Super Crazy Freeroll Sunday Mystery', prize: '$100K', featured: true },
  { date: 'Sep-29', day: 'Mon', time: '18:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K' },
  { date: 'Sep-30', day: 'Tue', time: '12:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Oct-1', day: 'Wed', time: '23:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K' },
  { date: 'Oct-2', day: 'Thu', time: '18:00', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K' },
  { date: 'Oct-3', day: 'Fri', time: '23:30', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max [Saver]', prize: '$10K' },
  { date: 'Oct-4', day: 'Sat', time: '12:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper [Closer]', prize: '$10K' },
  { date: 'Oct-5', day: 'Sun', time: '12:00', name: '$100K Super Crazy Freeroll Mystery Finale', prize: '$100K', featured: true }
]

export const features = [
  { iconName: 'FaUsers', title: '50K+ Jugadores', desc: 'Mesas activas 24/7' },
  { iconName: 'FaClock', title: 'Pagos en 24h', desc: 'Con YAPE y PLIN' },
  { iconName: 'FaShieldAlt', title: '100% Seguro', desc: 'Licencia oficial' },
  { iconName: 'FaGamepad', title: 'Multi-plataforma', desc: 'PC, Mac, iOS, Android' }
]

export const softwareFeatures = [
  { title: 'Multi-Mesa', desc: 'Juega hasta 6 mesas simultáneas', iconName: 'FaGamepad' },
  { title: 'Estadísticas en Vivo', desc: 'HUD integrado con stats en tiempo real', iconName: 'FaChartLine' },
  { title: 'Notas de Jugadores', desc: 'Guarda notas sobre tus oponentes', iconName: 'FaUsers' },
  { title: 'Hand Replayer', desc: 'Analiza tus manos jugadas', iconName: 'FaTrophy' },
  { title: 'Personalización Total', desc: 'Diseña tu mesa como prefieras', iconName: 'FaShieldAlt' },
  { title: 'Chat con Emojis', desc: 'Interactúa con otros jugadores', iconName: 'FaUsers' }
]

export const platforms = [
  { platform: 'Windows', icon: '💻', version: 'Windows 10+' },
  { platform: 'Mac OS', icon: '🖥️', version: 'macOS 10.14+' },
  { platform: 'iOS', icon: '📱', version: 'iOS 13+' },
  { platform: 'Android', icon: '📲', version: 'Android 8+' }
]

export const ticketsTable = [
  {
    depositRange: '$10 - $29',
    tickets: ['(1) $2.20 MTT Ticket', '(1) $1 Global Spins'],
    totalValue: '$3.20'
  },
  {
    depositRange: '$30 - $99',
    tickets: ['(2) $5 MTT Tickets', '(5) $1 Global Spins'],
    totalValue: '$15'
  },
  {
    depositRange: '$100 - $499',
    tickets: ['(2) $5 MTT Tickets', '(1) $10 Global Spins', '(2) $5 Global Spins'],
    totalValue: '$30'
  },
  {
    depositRange: '$500 - $1,499',
    tickets: ['(2) $11 MTT Tickets', '(1) $110 Sunday Slam Ticket', '(1) $25 Global Spins', '(2) $5 Global Spins'],
    totalValue: '$167'
  },
  {
    depositRange: '$1,500 - $2,999',
    tickets: ['(2) $22 MTT Tickets', '(2) $110 Sunday Slam Tickets', '(3) $25 Global Spins'],
    totalValue: '$339'
  },
  {
    depositRange: '$3,000+',
    tickets: ['(2) $55 MTT Tickets', '(2) $110 Sunday Slam Tickets', '(3) $50 Global Spins'],
    totalValue: '$480'
  }
]

export const bonusDetails = {
  totalRewards: '$3,580',
  instantPackage: {
    amount: '$16.20',
    includes: [
      'Bono poker: $5',
      'Bono casino: $5',
      'Ticket MTT: $2.20',
      'Global Spins: $1',
      'Monedas casino: $3'
    ]
  },
  cashbackInfo: {
    timeLimit: '90 días',
    pokerPercent: '50%',
    pokerRate: '$1 por cada $4 en rake',
    casinoPercent: '50%',
    casinoRate: '$1 por cada $500 apostados'
  }
}

export const promosPeru = {
  title: '🔥 Exclusivo con PERU EV+ y Escuela Poker 🔥',
  freerolls: [
    {
      name: '$10,000 Freeroll Diario',
      prize: '$2,000 para el ganador',
      frequency: 'Todos los días',
      icon: '💰'
    },
    {
      name: '$100,000 Super Freeroll',
      prize: '$20,000 para el campeón', 
      frequency: 'Cada domingo',
      icon: '🏆'
    }
  ],
  whatsappHelp: 'wa.link/bigy9b'
}

export const wptConstants = {
  whatsappNumber: '51955311839',
  promoCode: 'POKERAGENCY2024',
  whatsappMessages: {
    register: 'Quiero%20registrarme%20en%20WPT%20Global%20con%20todos%20los%20bonos',
    bonuses: 'Quiero%20información%20sobre%20los%20bonos%20de%20WPT',
    tournaments: 'Quiero%20información%20sobre%20torneos%20WPT',
    download: 'Quiero%20descargar%20WPT%20Global',
    stepByStep: 'Quiero%20registrarme%20en%20WPT%20paso%20a%20paso',
    startNow: 'Quiero%20empezar%20en%20WPT%20Global%20ahora'
  }
}