// Utilidades para manejar localStorage de forma segura
export const storage = {
  // User Level
  getUserLevel: () => {
    try {
      return localStorage.getItem('userLevel') || null
    } catch (error) {
      console.error('Error reading user level:', error)
      return null
    }
  },

  setUserLevel: (level) => {
    try {
      localStorage.setItem('userLevel', level)
      return true
    } catch (error) {
      console.error('Error saving user level:', error)
      return false
    }
  },

  // Preferences
  getPreferences: () => {
    try {
      const prefs = localStorage.getItem('userPreferences')
      return prefs ? JSON.parse(prefs) : {}
    } catch (error) {
      console.error('Error reading preferences:', error)
      return {}
    }
  },

  setPreferences: (preferences) => {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(preferences))
      return true
    } catch (error) {
      console.error('Error saving preferences:', error)
      return false
    }
  },

  // Onboarding
  hasSeenOnboarding: () => {
    try {
      return localStorage.getItem('hasSeenOnboarding') === 'true'
    } catch (error) {
      console.error('Error reading onboarding status:', error)
      return false
    }
  },

  setOnboardingSeen: (seen = true) => {
    try {
      localStorage.setItem('hasSeenOnboarding', seen.toString())
      return true
    } catch (error) {
      console.error('Error saving onboarding status:', error)
      return false
    }
  },

  // Favorites
  getFavoriteRooms: () => {
    try {
      const favs = localStorage.getItem('favoriteRooms')
      return favs ? JSON.parse(favs) : []
    } catch (error) {
      console.error('Error reading favorite rooms:', error)
      return []
    }
  },

  setFavoriteRooms: (rooms) => {
    try {
      localStorage.setItem('favoriteRooms', JSON.stringify(rooms))
      return true
    } catch (error) {
      console.error('Error saving favorite rooms:', error)
      return false
    }
  },

  // Clear all user data
  clearUserData: () => {
    try {
      localStorage.removeItem('userLevel')
      localStorage.removeItem('userPreferences')
      localStorage.removeItem('hasSeenOnboarding')
      localStorage.removeItem('favoriteRooms')
      return true
    } catch (error) {
      console.error('Error clearing user data:', error)
      return false
    }
  }
}

// Helper para obtener valores de rake según nivel
export const getRakeValuesByLevel = (level) => {
  const values = {
    basico: {
      min: 100,
      max: 500,
      default: 250,
      step: 50
    },
    medio: {
      min: 500,
      max: 2000,
      default: 1000,
      step: 100
    },
    avanzado: {
      min: 2000,
      max: 10000,
      default: 5000,
      step: 500
    }
  }
  
  return values[level] || values.medio
}

// Helper para mensajes personalizados
export const getMessagesByLevel = (level) => {
  const messages = {
    basico: {
      hero: 'EMPIEZA TU AVENTURA EN EL POKER',
      subtitle: 'Encuentra las mejores salas para principiantes',
      cta: 'EMPEZAR A JUGAR',
      whatsapp: 'Hola, soy principiante y quiero empezar a jugar poker online'
    },
    medio: {
      hero: 'MAXIMIZA TUS GANANCIAS',
      subtitle: 'Optimiza tu rakeback y encuentra las mejores promociones',
      cta: 'MEJORAR MI JUEGO',
      whatsapp: 'Hola, soy jugador regular y busco maximizar mi rakeback'
    },
    avanzado: {
      hero: 'CONDICIONES PRO EXCLUSIVAS',
      subtitle: 'Accede a los mejores deals y mesas high stakes',
      cta: 'ACCESO VIP',
      whatsapp: 'Hola, soy jugador avanzado y busco las mejores condiciones VIP'
    }
  }
  
  return messages[level] || messages.medio
}