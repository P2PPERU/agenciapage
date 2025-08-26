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
    requirements: 'Bono poker $5 + Casino $5 + Tickets $4.20 + Global Spins $1 + Monedas $3',
    color: 'from-purple-500 to-purple-700',
    featured: true
  },
  {
    id: 3,
    title: 'Tickets para Torneos MTT',
    amount: 'Hasta $480',
    description: 'Tickets gratis para MTT y Global Spins según tu depósito',
    icon: '🎫',
    requirements: 'Desde $10 - Escalas según el monto depositado',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 4,
    title: 'Monedas de Casino Gratis',
    amount: 'Hasta $100',
    description: 'Monedas gratis para usar en el casino de WPT Global',
    icon: '🪙',
    requirements: 'Incluidas automáticamente en el paquete de bienvenida',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 5,
    title: 'Global Spins Premium',
    amount: 'Hasta $50',
    description: 'Acceso a Global Spins con premios especiales',
    icon: '🌟',
    requirements: 'Disponibles con depósitos de $100+',
    color: 'from-pink-500 to-rose-700'
  }
]

export const registrationSteps = [
  {
    step: 1,
    title: 'Descarga WPT Global',
    description: 'Selecciona tu plataforma favorita y descarga la aplicación oficial de WPT Global',
    iconName: 'FaDownload',
    action: 'Descargar aplicación',
    downloads: [
      { 
        platform: 'iOS (iPhone/iPad)', 
        icon: '📱', 
        url: 'https://testflight.apple.com/join/E8MUn83b' 
      },
      { 
        platform: 'Mac (macOS)', 
        icon: '🍏', 
        url: 'https://downloads.wptglobal.com/latest/WPTG.dmg' 
      },
      { 
        platform: 'Android', 
        icon: '🤖', 
        url: 'https://downloads.wptglobal.com/latest/WPTG.apk' 
      },
      { 
        platform: 'Windows (PC)', 
        icon: '💻', 
        url: 'https://downloads.wptglobal.com/latest/WPTG.exe' 
      }
    ]
  },
  {
    step: 2,
    title: 'Selecciona Andorra como País',
    description: 'Durante el registro inicial, es crucial seleccionar Andorra como tu país de residencia',
    iconName: 'FaGlobeAmericas',
    action: 'Seleccionar país',
    highlight: '⚠️ CRÍTICO: Debes elegir ANDORRA, no Perú. Esto es obligatorio para acceder desde Perú.'
  },
  {
    step: 3,
    title: 'Crea tu Cuenta WPT',
    description: 'Registra tu nueva cuenta usando tu correo electrónico personal activo',
    iconName: 'FaUserPlus',
    action: 'Crear cuenta nueva',
    highlight: 'Usa tu email real y una contraseña segura. Confirmarás el email después del registro.'
  },
  {
    step: 4,
    title: 'Ingresa los Códigos Exclusivos',
    description: 'Utiliza nuestros códigos especiales para desbloquear bonos y promociones exclusivas',
    iconName: 'FaKey',
    action: 'Ingresar códigos promocionales',
    codes: {
      bonificacion: 'PeruEV',
      invitado: '8288C1'
    },
    highlight: 'ORDEN IMPORTANTE: Primero el código de bonificación, después el de invitado'
  },
  {
    step: 5,
    title: 'Completa tus Datos Personales',
    description: 'Llena correctamente todos los campos requeridos para activar completamente tu cuenta',
    iconName: 'FaCheckCircle',
    action: 'Completar información personal',
    personalData: {
      nombre: 'Tu nombre y apellido REAL y COMPLETO',
      direccion: 'Tu dirección física REAL (calle y número)',
      telefono: 'DEJAR VACÍO - No completar este campo',
      ciudad: 'LIMA',
      codigoPostal: '00051'
    },
    highlight: 'Datos reales son obligatorios para verificación de cuenta y procesamiento de retiros',
    whatsapp: 'wa.link/bigy9b'
  }
]

export const tournaments = [
  {
    name: '$10K Daily Crazy Freeroll',
    guarantee: '$10,000 GARANTIZADOS',
    buyIn: '100% GRATIS',
    time: 'Lunes a Sábado - Horarios variados',
    winner: '$2,000+ para el campeón',
    type: 'crazy-daily',
    featured: true,
    description: 'El freeroll diario más grande del mundo del poker online'
  },
  {
    name: '$100K Super Crazy Freeroll',
    guarantee: '$100,000 GARANTIZADOS',
    buyIn: '100% GRATIS',
    time: 'Todos los domingos',
    winner: '$20,000+ para el campeón',
    type: 'crazy-super',
    featured: true,
    description: 'Freeroll dominical con el premio más alto disponible'
  },
  {
    name: 'Sunday Million WPT',
    guarantee: '$1,000,000 GARANTIZADOS',
    buyIn: '$109',
    time: 'Domingos a las 18:00 UTC',
    winner: '$150,000+ típico para el campeón',
    satellites: 'Satélites desde $5',
    type: 'main',
    description: 'El torneo emblema de WPT Global con premios millonarios'
  },
  {
    name: 'Daily Special WPT',
    guarantee: '$50,000 GARANTIZADOS',
    buyIn: '$33',
    time: 'Todos los días a las 20:00 UTC',
    winner: '$8,000+ típico para el campeón',
    satellites: 'Satélites desde $3',
    type: 'daily',
    description: 'Torneo diario accesible con excelente relación valor/premio'
  },
  {
    name: 'High Roller Weekly',
    guarantee: '$250,000 GARANTIZADOS',
    buyIn: '$530',
    time: 'Sábados a las 19:00 UTC',
    winner: '$40,000+ típico para el campeón',
    satellites: 'Satélites desde $22',
    type: 'high-roller',
    description: 'Torneo semanal para jugadores serios con premios elevados'
  }
]

export const crazyFreerollsInfo = {
  totalPrize: '$2,000,000',
  duration: '25 AGOSTO - 5 OCTUBRE 2025',
  description: 'WPT Global ha enloquecido completamente y está regalando $2,000,000 en premios totalmente GRATIS durante la serie más grande de freerolls en la historia del poker online',
  ticketWays: [
    {
      title: '4 Tickets Semanales AUTOMÁTICOS',
      description: 'Todos los jugadores registrados reciben automáticamente 4 tickets cada semana sin hacer nada',
      icon: '🎟️',
      multiplier: '4x por semana',
      automatic: true
    },
    {
      title: '24 Satélites Gratuitos Diarios',
      description: 'Cada día hay 24 torneos satélite completamente gratis, cada uno otorga 20 asientos garantizados',
      icon: '🎯',
      multiplier: '24 diarios = 480/mes',
      seats: '20 por satélite'
    },
    {
      title: 'TOP 20 gana Ticket para $100K',
      description: 'Los mejores 20 jugadores del Daily Crazy Freeroll obtienen entrada directa al $100K Sunday',
      icon: '🏆',
      prize: 'Ticket $100,000',
      requirement: 'Top 20 en Daily'
    },
    {
      title: 'Juega y Gana Tickets Adicionales',
      description: 'Participa en MTTs, Global Spins, Casino o Apuestas Deportivas para ganar tickets extra según tu actividad',
      icon: '🎮',
      activity: 'Multi-actividades',
      bonus: 'Tickets adicionales por volumen de juego'
    }
  ]
}

export const crazySchedule = [
  // Agosto 2025 - Desde el 25
  { date: '26-Ago', day: 'Mar', time: '07:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K', type: 'daily' },
  { date: '27-Ago', day: 'Mié', time: '18:30', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K', type: 'daily' },
  { date: '28-Ago', day: 'Jue', time: '13:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K', type: 'daily' },
  { date: '29-Ago', day: 'Vie', time: '18:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '30-Ago', day: 'Sáb', time: '07:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '31-Ago', day: 'Dom', time: '07:00', name: '$100K Super Crazy Freeroll Asia Grand Dash', prize: '$100K', type: 'super', featured: true },
  
  // Septiembre 2025 - Semana 1
  { date: '01-Sep', day: 'Lun', time: '13:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K', type: 'daily' },
  { date: '02-Sep', day: 'Mar', time: '07:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '03-Sep', day: 'Mié', time: '18:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '04-Sep', day: 'Jue', time: '13:00', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K', type: 'daily' },
  { date: '05-Sep', day: 'Vie', time: '18:30', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K', type: 'daily' },
  { date: '06-Sep', day: 'Sáb', time: '07:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K', type: 'daily' },
  { date: '07-Sep', day: 'Dom', time: '18:30', name: '$100K Super Crazy Freeroll Carnival Frenzy', prize: '$100K', type: 'super', featured: true },
  
  // Septiembre 2025 - Semana 2
  { date: '08-Sep', day: 'Lun', time: '13:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '09-Sep', day: 'Mar', time: '07:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K', type: 'daily' },
  { date: '10-Sep', day: 'Mié', time: '18:30', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K', type: 'daily' },
  { date: '11-Sep', day: 'Jue', time: '13:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K', type: 'daily' },
  { date: '12-Sep', day: 'Vie', time: '18:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '13-Sep', day: 'Sáb', time: '07:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '14-Sep', day: 'Dom', time: '13:00', name: '$100K Super Crazy Freeroll Euro Grand Prix', prize: '$100K', type: 'super', featured: true },
  
  // Septiembre 2025 - Semana 3
  { date: '15-Sep', day: 'Lun', time: '13:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K', type: 'daily' },
  { date: '16-Sep', day: 'Mar', time: '07:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '17-Sep', day: 'Mié', time: '18:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '18-Sep', day: 'Jue', time: '13:00', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K', type: 'daily' },
  { date: '19-Sep', day: 'Vie', time: '18:30', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K', type: 'daily' },
  { date: '20-Sep', day: 'Sáb', time: '07:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K', type: 'daily' },
  { date: '21-Sep', day: 'Dom', time: '18:30', name: '$100K Super Crazy Freeroll Fiesta Especial', prize: '$100K', type: 'super', featured: true },
  
  // Septiembre 2025 - Semana 4
  { date: '22-Sep', day: 'Lun', time: '13:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '23-Sep', day: 'Mar', time: '07:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K', type: 'daily' },
  { date: '24-Sep', day: 'Mié', time: '18:30', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K', type: 'daily' },
  { date: '25-Sep', day: 'Jue', time: '13:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K', type: 'daily' },
  { date: '26-Sep', day: 'Vie', time: '18:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '27-Sep', day: 'Sáb', time: '07:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '28-Sep', day: 'Dom', time: '13:00', name: '$100K Super Crazy Freeroll Septiembre Final', prize: '$100K', type: 'super', featured: true },
  
  // Septiembre 2025 - Final del mes
  { date: '29-Sep', day: 'Lun', time: '13:00', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K', type: 'daily' },
  { date: '30-Sep', day: 'Mar', time: '07:00', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  
  // Octubre 2025 - Semana final
  { date: '01-Oct', day: 'Mié', time: '18:30', name: '$10K Daily Crazy Freeroll Hyper Mystery Box', prize: '$10K', type: 'daily' },
  { date: '02-Oct', day: 'Jue', time: '13:00', name: '$10K Daily Crazy Freeroll Super Sonic', prize: '$10K', type: 'daily' },
  { date: '03-Oct', day: 'Vie', time: '18:30', name: '$10K Daily Crazy Freeroll Adrenaline 4-Max', prize: '$10K', type: 'daily' },
  { date: '04-Oct', day: 'Sáb', time: '07:00', name: '$10K Daily Crazy Freeroll Non-Stop Hyper', prize: '$10K', type: 'daily' },
  { date: '05-Oct', day: 'Dom', time: '13:00', name: '$100K Super Crazy Freeroll GRAN FINALE', prize: '$100K', type: 'super', featured: true }
]

export const features = [
  { iconName: 'FaUsers', title: '5,000+ Jugadores Activos', desc: 'Mesas llenas 24/7 en todos los stakes' },
  { iconName: 'FaClock', title: 'Retiros en 24-48hrs', desc: 'Procesamiento rápido y confiable' },
  { iconName: 'FaShieldAlt', title: '100% Seguro y Licenciado', desc: 'Regulado por autoridades internacionales' },
  { iconName: 'FaGamepad', title: 'Disponible en Todas las Plataformas', desc: 'PC, Mac, iOS, Android - Juega donde quieras' }
]

export const softwareFeatures = [
  { title: 'Multi-Mesa Avanzado', desc: 'Juega hasta 6 mesas simultáneamente con diseño optimizado', iconName: 'FaGamepad' },
  { title: 'Estadísticas HUD Integradas', desc: 'Información de oponentes y estadísticas en tiempo real incorporadas', iconName: 'FaChartLine' },
  { title: 'Sistema de Notas Avanzado', desc: 'Guarda notas detalladas sobre el estilo de juego de tus oponentes', iconName: 'FaUsers' },
  { title: 'Replay de Manos Completo', desc: 'Analiza cada mano jugada con herramientas profesionales', iconName: 'FaTrophy' },
  { title: 'Personalización Total de Mesa', desc: 'Customiza colores, diseño y disposición según tus preferencias', iconName: 'FaShieldAlt' },
  { title: 'Chat Interactivo con Emojis', desc: 'Comunícate con otros jugadores usando el sistema de chat avanzado', iconName: 'FaUsers' }
]

export const platforms = [
  { platform: 'Windows', icon: '💻', version: 'Windows 10 o superior requerido', downloadSize: '~150MB' },
  { platform: 'Mac OS', icon: '🖥️', version: 'macOS 10.14 Mojave o superior', downloadSize: '~200MB' },
  { platform: 'iOS', icon: '📱', version: 'iOS 13.0 o superior requerido', downloadSize: '~120MB' },
  { platform: 'Android', icon: '📲', version: 'Android 8.0 (API 26) o superior', downloadSize: '~100MB' }
]

export const ticketsTable = [
  {
    depositRange: '$10 - $29',
    tickets: ['(1) $2.20 MTT Ticket', '(1) $1 Global Spins'],
    totalValue: '$3.20',
    description: 'Paquete básico para comenzar'
  },
  {
    depositRange: '$30 - $99',
    tickets: ['(2) $5 MTT Tickets', '(5) $1 Global Spins'],
    totalValue: '$15',
    description: 'Valor excelente para jugadores regulares'
  },
  {
    depositRange: '$100 - $499',
    tickets: ['(2) $5 MTT Tickets', '(1) $10 Global Spins', '(2) $5 Global Spins'],
    totalValue: '$30',
    description: 'Paquete intermedio con mayor variedad'
  },
  {
    depositRange: '$500 - $1,499',
    tickets: ['(2) $11 MTT Tickets', '(1) $110 Sunday Slam Ticket', '(1) $25 Global Spins', '(2) $5 Global Spins'],
    totalValue: '$167',
    description: 'Incluye acceso a torneos premium'
  },
  {
    depositRange: '$1,500 - $2,999',
    tickets: ['(2) $22 MTT Tickets', '(2) $110 Sunday Slam Tickets', '(3) $25 Global Spins'],
    totalValue: '$339',
    description: 'Paquete VIP con múltiples entradas premium'
  },
  {
    depositRange: '$3,000+',
    tickets: ['(2) $55 MTT Tickets', '(2) $110 Sunday Slam Tickets', '(3) $50 Global Spins'],
    totalValue: '$480',
    description: 'Paquete máximo con los mejores beneficios'
  }
]

export const bonusDetails = {
  totalRewards: '$3,580',
  maxDeposit: '$3,000',
  minDeposit: '$10',
  instantPackage: {
    amount: '$16.20',
    includes: [
      'Bono de poker: $5 (jugable inmediatamente)',
      'Bono de casino: $5 (para slots y juegos de mesa)',
      'Ticket MTT: $2.20 (para torneos multi-mesa)',
      'Global Spins: $1 (spins premium)',
      'Monedas de casino adicionales: $3 (bonus extra)'
    ],
    conditions: 'Se acredita automáticamente con cualquier depósito de $10+'
  },
  cashbackInfo: {
    timeLimit: '90 días naturales',
    pokerPercent: '25',
    pokerRate: '$1 en efectivo por cada $4 de rake generado',
    casinoPercent: '50%',
    casinoRate: '$1 en efectivo por cada $500 apostados en casino',
    withdrawalConditions: 'El cashback se puede retirar inmediatamente sin restricciones adicionales'
  },
  additionalBenefits: [
    'Acceso prioritario a nuevos torneos',
    'Invitaciones exclusivas a eventos especiales',
    'Soporte VIP personalizado',
    'Límites de retiro elevados desde el primer día',
    'Bonos de recarga mensuales exclusivos'
  ]
}

export const promosPeru = {
  title: '🔥 PROMOCIONES EXCLUSIVAS PERU EV+ 🔥',
  subtitle: 'Beneficios especiales disponibles solo para jugadores peruanos registrados a través de nuestros códigos',
  freerolls: [
    {
      name: '$10,000 Freeroll Diario',
      prize: '$2,000+ para el campeón',
      frequency: 'Lunes a Sábado',
      icon: '💰',
      time: 'Horarios rotativos para máxima accesibilidad',
      guaranteed: 'Premio garantizado sin importar participación'
    },
    {
      name: '$100,000 Super Freeroll',
      prize: '$20,000+ para el campeón',
      frequency: 'Todos los domingos',
      icon: '🏆',
      time: 'Domingo en la tarde/noche',
      guaranteed: 'El freeroll dominical más grande disponible'
    }
  ],
  exclusivePerks: [
    'Soporte en español 24/7 vía WhatsApp',
    'Guías de estrategia exclusivas en español',
    'Comunidad privada de jugadores peruanos',
    'Análisis de manos gratuito mensual',
    'Coaching básico incluido para principiantes'
  ],
  whatsappHelp: 'wa.link/bigy9b',
  communitySize: '2,500+ jugadores peruanos activos'
}

export const systemRequirements = {
  minimum: {
    windows: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i3 o AMD equivalente',
      memory: '4 GB RAM',
      graphics: 'DirectX 11 compatible',
      network: 'Conexión a Internet estable',
      storage: '500 MB de espacio disponible'
    },
    mac: {
      os: 'macOS 10.14 Mojave',
      processor: 'Intel Core i3 o Apple M1',
      memory: '4 GB RAM',
      graphics: 'Metal compatible',
      network: 'Conexión a Internet estable',
      storage: '500 MB de espacio disponible'
    }
  },
  recommended: {
    processor: 'Intel Core i5 o superior / AMD Ryzen 5 o superior',
    memory: '8 GB RAM o más',
    network: 'Conexión de banda ancha 10 Mbps+',
    storage: '1 GB de espacio libre para actualizaciones'
  }
}

export const wptConstants = {
  whatsappNumber: '51955311839',
  promoCode: 'POKERAGENCYPERU2024',
  inviteCode: '8288C1',
  bonusCode: 'PeruEV',
  whatsappMessages: {
    register: 'Quiero%20registrarme%20en%20WPT%20Global%20con%20todos%20los%20bonos%20y%20códigos%20exclusivos',
    bonuses: 'Quiero%20información%20completa%20sobre%20los%20bonos%20de%20WPT%20Global',
    tournaments: 'Quiero%20información%20sobre%20los%20torneos%20y%20freerolls%20de%20WPT',
    download: 'Quiero%20descargar%20WPT%20Global%20y%20ayuda%20con%20la%20instalación',
    stepByStep: 'Necesito%20ayuda%20paso%20a%20paso%20para%20registrarme%20en%20WPT%20Global',
    startNow: 'Quiero%20empezar%20a%20jugar%20en%20WPT%20Global%20inmediatamente',
    depositHelp: 'Necesito%20ayuda%20con%20depósitos%20y%20métodos%20de%20pago%20en%20WPT',
    withdrawalHelp: 'Quiero%20información%20sobre%20retiros%20y%20cashouts%20en%20WPT'
  },
  supportLinks: {
    telegram: '@WPTGlobalPeru',
    discord: 'WPT Global Peru Community',
    email: 'soporte.peru@wptglobal.com'
  }
}

// Función helper para obtener torneos por categoría
export const getTournamentsByCategory = (category) => {
  return tournaments.filter(tournament => tournament.type === category)
}

// Función helper para obtener el próximo torneo
export const getNextTournament = () => {
  // Esta función podría implementar lógica para calcular el próximo torneo basado en horarios
  const now = new Date()
  const featured = tournaments.filter(t => t.featured)
  return featured[0] || tournaments[0]
}

// Función helper para formatear moneda
export const formatCurrency = (amount, currency = 'USD') => {
  const symbol = currency === 'USD' ? '$' : currency === 'PEN' ? 'S/' : currency
  return `${symbol}${amount.toLocaleString()}`
}

export default {
  bonuses,
  registrationSteps,
  tournaments,
  crazyFreerollsInfo,
  crazySchedule,
  features,
  softwareFeatures,
  platforms,
  ticketsTable,
  bonusDetails,
  promosPeru,
  systemRequirements,
  wptConstants,
  getTournamentsByCategory,
  getNextTournament,
  formatCurrency
}