import { useUser } from '../context/UserContext'
import { useMemo } from 'react'

export const useUserLevel = () => {
  const { userLevel, preferences, getRecommendedRooms } = useUser()
  
  // Filtrar y ordenar salas basado en nivel y preferencias
  const filterRoomsByLevel = (rooms) => {
    if (!userLevel) return rooms
    
    return rooms.filter(room => {
      if (!room.level) return true
      return room.level.includes(userLevel)
    })
  }
  
  // Ordenar salas según prioridad del usuario
  const sortRoomsByPreference = (rooms) => {
    if (!preferences.priority) return rooms
    
    return [...rooms].sort((a, b) => {
      switch (preferences.priority) {
        case 'rakeback':
          // Ordenar por mayor rakeback
          const aRake = parseInt(a.rakeback.match(/\d+/)?.[0] || 0)
          const bRake = parseInt(b.rakeback.match(/\d+/)?.[0] || 0)
          return bRake - aRake
          
        case 'soft':
          // Priorizar salas marcadas como soft/fáciles
          const aSoft = a.tags?.includes('soft') ? 1 : 0
          const bSoft = b.tags?.includes('soft') ? 1 : 0
          return bSoft - aSoft
          
        case 'bonos':
          // Priorizar por bonos
          const aBonus = a.bonus ? 1 : 0
          const bBonus = b.bonus ? 1 : 0
          return bBonus - aBonus
          
        default:
          return 0
      }
    })
  }
  
  // Obtener mensaje personalizado
  const getLevelMessage = () => {
    switch (userLevel) {
      case 'basico':
        return {
          title: 'Perfecto para Principiantes',
          description: 'Estas salas son ideales para empezar con depósitos bajos y mesas suaves'
        }
      case 'medio':
        return {
          title: 'Maximiza tu Rakeback',
          description: 'Salas seleccionadas para jugadores regulares con el mejor rakeback'
        }
      case 'avanzado':
        return {
          title: 'Acceso VIP Exclusivo',
          description: 'Las mejores condiciones y mesas high stakes para profesionales'
        }
      default:
        return {
          title: 'Todas las Salas',
          description: 'Explora todas nuestras opciones disponibles'
        }
    }
  }
  
  // Obtener configuración de calculadora
  const getCalculatorConfig = () => {
    switch (userLevel) {
      case 'basico':
        return { min: 100, max: 500, default: 250, step: 50 }
      case 'medio':
        return { min: 500, max: 2000, default: 1000, step: 100 }
      case 'avanzado':
        return { min: 2000, max: 10000, default: 5000, step: 500 }
      default:
        return { min: 100, max: 10000, default: 1000, step: 100 }
    }
  }
  
  return {
    userLevel,
    preferences,
    filterRoomsByLevel,
    sortRoomsByPreference,
    getLevelMessage,
    getCalculatorConfig,
    getRecommendedRooms
  }
}

export default useUserLevel