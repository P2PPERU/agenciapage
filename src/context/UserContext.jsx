import { createContext, useContext, useState, useEffect } from 'react'

// Crear el contexto
const UserContext = createContext()

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser debe ser usado dentro de UserProvider')
  }
  return context
}

// Provider del contexto
export const UserProvider = ({ children }) => {
  const [userLevel, setUserLevel] = useState(null)
  const [preferences, setPreferences] = useState({
    gameType: null, // 'cash', 'torneos', 'ambos'
    priority: null, // 'rakeback', 'soft', 'bonos'
    paymentMethod: null // 'crypto', 'banco', 'ewallet'
  })
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const [favoriteRooms, setFavoriteRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar datos del localStorage al montar
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedLevel = localStorage.getItem('userLevel')
        const savedPreferences = localStorage.getItem('userPreferences')
        const savedOnboarding = localStorage.getItem('hasSeenOnboarding')
        const savedFavorites = localStorage.getItem('favoriteRooms')

        if (savedLevel) {
          setUserLevel(savedLevel)
        }
        if (savedPreferences) {
          setPreferences(JSON.parse(savedPreferences))
        }
        if (savedOnboarding) {
          setHasSeenOnboarding(JSON.parse(savedOnboarding))
        }
        if (savedFavorites) {
          setFavoriteRooms(JSON.parse(savedFavorites))
        }
      } catch (error) {
        console.error('Error cargando datos del usuario:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  // Guardar nivel
  const saveUserLevel = (level) => {
    setUserLevel(level)
    localStorage.setItem('userLevel', level)
    setHasSeenOnboarding(true)
    localStorage.setItem('hasSeenOnboarding', 'true')
  }

  // Guardar preferencias
  const savePreferences = (newPreferences) => {
    const updated = { ...preferences, ...newPreferences }
    setPreferences(updated)
    localStorage.setItem('userPreferences', JSON.stringify(updated))
  }

  // Toggle favorito
  const toggleFavoriteRoom = (roomId) => {
    const updated = favoriteRooms.includes(roomId)
      ? favoriteRooms.filter(id => id !== roomId)
      : [...favoriteRooms, roomId]
    
    setFavoriteRooms(updated)
    localStorage.setItem('favoriteRooms', JSON.stringify(updated))
  }

  // Reset todo
  const resetUserData = () => {
    setUserLevel(null)
    setPreferences({
      gameType: null,
      priority: null,
      paymentMethod: null
    })
    setHasSeenOnboarding(false)
    setFavoriteRooms([])
    localStorage.removeItem('userLevel')
    localStorage.removeItem('userPreferences')
    localStorage.removeItem('hasSeenOnboarding')
    localStorage.removeItem('favoriteRooms')
  }

  // Obtener recomendaciones según nivel
  const getRecommendedRooms = (allRooms) => {
    if (!userLevel || !allRooms) return allRooms

    return allRooms.filter(room => {
      if (!room.level) return true
      return room.level.includes(userLevel)
    }).sort((a, b) => {
      // Priorizar favoritos
      const aFav = favoriteRooms.includes(a.id) ? 1 : 0
      const bFav = favoriteRooms.includes(b.id) ? 1 : 0
      if (aFav !== bFav) return bFav - aFav

      // Luego por featured
      const aFeat = a.featured ? 1 : 0
      const bFeat = b.featured ? 1 : 0
      if (aFeat !== bFeat) return bFeat - aFeat

      // Luego por rating
      return (b.rating || 0) - (a.rating || 0)
    })
  }

  const value = {
    userLevel,
    preferences,
    hasSeenOnboarding,
    favoriteRooms,
    isLoading,
    saveUserLevel,
    savePreferences,
    toggleFavoriteRoom,
    resetUserData,
    getRecommendedRooms
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext