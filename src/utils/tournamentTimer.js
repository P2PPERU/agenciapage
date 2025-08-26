// src/utils/tournamentTimer.js

import { useState, useEffect } from 'react'
import { crazySchedule } from '../data/wptData'

// Función para convertir fecha y hora del calendario a objeto Date de Perú (UTC-5)
const parseScheduleDateTime = (scheduleItem) => {
  const [day, month] = scheduleItem.date.split('-')
  const [hours, minutes] = scheduleItem.time.split(':')
  
  // Mapear nombres de meses a números
  const monthMap = {
    'Ago': 7, // Agosto = mes 7 (0-based)
    'Sep': 8, // Septiembre = mes 8
    'Oct': 9  // Octubre = mes 9
  }
  
  const year = 2025
  const monthNum = monthMap[month]
  
  if (!monthNum) return null
  
  // Crear fecha en UTC y ajustar para zona Perú (UTC-5)
  const utcDate = new Date(Date.UTC(year, monthNum, parseInt(day), parseInt(hours) + 5, parseInt(minutes), 0))
  
  return utcDate
}

// Función para obtener la fecha actual en zona Perú
const getCurrentPeruTime = () => {
  return new Date()
}

// Función para encontrar el próximo torneo
export const getNextTournament = () => {
  const now = getCurrentPeruTime()
  let closestTournament = null
  let closestTime = null
  
  for (const tournament of crazySchedule) {
    const tournamentDateTime = parseScheduleDateTime(tournament)
    
    if (!tournamentDateTime) continue
    
    // Si el torneo es en el futuro
    if (tournamentDateTime > now) {
      if (!closestTime || tournamentDateTime < closestTime) {
        closestTime = tournamentDateTime
        closestTournament = tournament
      }
    }
  }
  
  // Si no encontramos ningún torneo futuro, buscar el primero del calendario (para el siguiente ciclo)
  if (!closestTournament && crazySchedule.length > 0) {
    closestTournament = crazySchedule[0]
    closestTime = parseScheduleDateTime(closestTournament)
    // Agregar un año si es necesario
    if (closestTime && closestTime <= now) {
      closestTime.setFullYear(closestTime.getFullYear() + 1)
    }
  }
  
  return {
    tournament: closestTournament,
    dateTime: closestTime
  }
}

// Función para calcular tiempo restante
export const calculateTimeRemaining = (targetDateTime) => {
  if (!targetDateTime) {
    return { hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }
  
  const now = getCurrentPeruTime()
  const difference = targetDateTime.getTime() - now.getTime()
  
  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }
  
  const hours = Math.floor(difference / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)
  
  return {
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    isExpired: false,
    totalMilliseconds: difference
  }
}

// Hook personalizado para usar el timer
export const useNextTournamentTimer = () => {
  const [nextTournament, setNextTournament] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Función para actualizar el próximo torneo y tiempo restante
    const updateTimer = () => {
      const { tournament, dateTime } = getNextTournament()
      const remaining = calculateTimeRemaining(dateTime)
      
      setNextTournament(tournament)
      setTimeRemaining(remaining)
      setIsLoading(false)
      
      // Si el torneo expiró, buscar el siguiente
      if (remaining.isExpired) {
        setTimeout(updateTimer, 1000)
      }
    }
    
    // Actualizar inmediatamente
    updateTimer()
    
    // Actualizar cada segundo
    const interval = setInterval(updateTimer, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return {
    nextTournament,
    timeRemaining,
    isLoading
  }
}

// Función helper para formatear el nombre del torneo para mostrar
export const formatTournamentName = (tournament) => {
  if (!tournament) return 'Próximo Freeroll'
  
  if (tournament.type === 'super') {
    return `$100K Super Crazy Freeroll`
  } else {
    return `$10K Daily Crazy Freeroll`
  }
}

// Función para obtener el próximo torneo específico (solo para mostrar)
export const getUpcomingTournaments = (count = 3) => {
  const now = getCurrentPeruTime()
  const upcomingTournaments = []
  
  for (const tournament of crazySchedule) {
    const tournamentDateTime = parseScheduleDateTime(tournament)
    
    if (tournamentDateTime && tournamentDateTime > now) {
      upcomingTournaments.push({
        ...tournament,
        dateTime: tournamentDateTime,
        timeRemaining: calculateTimeRemaining(tournamentDateTime)
      })
      
      if (upcomingTournaments.length >= count) break
    }
  }
  
  return upcomingTournaments
}

// Función para verificar si hay un torneo en las próximas 2 horas
export const hasTournamentSoon = () => {
  const { tournament, dateTime } = getNextTournament()
  const remaining = calculateTimeRemaining(dateTime)
  
  if (!remaining.totalMilliseconds) return false
  
  // 2 horas = 2 * 60 * 60 * 1000 = 7,200,000 millisegundos
  return remaining.totalMilliseconds <= 7200000
}

export default {
  getNextTournament,
  calculateTimeRemaining,
  useNextTournamentTimer,
  formatTournamentName,
  getUpcomingTournaments,
  hasTournamentSoon
}