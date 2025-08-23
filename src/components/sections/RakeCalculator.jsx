import { useState, useEffect } from 'react'
import { FaCalculator, FaChartBar, FaPercent, FaCoins, FaTrophy } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useUser } from '../../context/UserContext'
import { getRakeValuesByLevel } from '../../utils/storage'

const RakeCalculator = () => {
  const { userLevel } = useUser()
  const rakeValues = getRakeValuesByLevel(userLevel)
  const [rakeAmount, setRakeAmount] = useState(rakeValues.default)
  const [selectedSala, setSelectedSala] = useState('xpoker')

  // Actualizar cuando cambie el nivel
  useEffect(() => {
    const values = getRakeValuesByLevel(userLevel)
    setRakeAmount(values.default)
  }, [userLevel])

  const rakebackRates = {
    xpoker: 0.40,
    pppoker: 0.425,
    suprema: 0.60,
    wpt: 0.35,
    qqpk: 0.30,
    coinpoker: 0.33,
    ggpoker: 0.50,
    natural8: 0.40,
    pokerbros: 0.45
  }

  // Filtrar salas según nivel
  const getSalasByLevel = () => {
    if (!userLevel) return Object.keys(rakebackRates)

    const salasByLevel = {
      basico: ['pppoker', 'xpoker', 'qqpk'],
      medio: ['xpoker', 'pppoker', 'suprema', 'wpt', 'natural8', 'pokerbros'],
      avanzado: ['suprema', 'ggpoker', 'coinpoker', 'wpt', 'natural8']
    }

    return salasByLevel[userLevel] || Object.keys(rakebackRates)
  }

  const availableSalas = getSalasByLevel()

  // Si la sala seleccionada no está disponible para el nivel, seleccionar la primera
  useEffect(() => {
    if (!availableSalas.includes(selectedSala)) {
      setSelectedSala(availableSalas[0])
    }
  }, [userLevel, availableSalas, selectedSala])

  const calculateRakeback = () => {
    return (rakeAmount * rakebackRates[selectedSala]).toFixed(2)
  }

  const calculateYearlyRakeback = () => {
    return (rakeAmount * rakebackRates[selectedSala] * 12).toFixed(2)
  }

  const getSalaDisplayName = (salaId) => {
    const names = {
      xpoker: 'X-POKER (40%)',
      pppoker: 'PPPOKER (42.5%)',
      suprema: 'SUPREMA (60%)',
      wpt: 'WPT (35%)',
      qqpk: 'QQPK (30%)',
      coinpoker: 'COIN POKER (33%)',
      ggpoker: 'GG POKER (50%)',
      natural8: 'NATURAL8 (40%)',
      pokerbros: 'POKERBROS (45%)'
    }
    return names[salaId] || salaId.toUpperCase()
  }

  // Mensaje personalizado según nivel
  const getLevelMessage = () => {
    if (!userLevel) return null

    const messages = {
      basico: 'Configurado para jugadores principiantes - Depósitos bajos',
      medio: 'Configurado para jugadores regulares - Maximiza tu rakeback',
      avanzado: 'Configurado para profesionales - Condiciones VIP'
    }

    return messages[userLevel]
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16" id="comparador">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-poker-gold mb-2">
            CALCULA TU RAKEBACK
          </h2>
          {userLevel && (
            <div className="mt-3">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                userLevel === 'basico' ? 'bg-green-500/20 text-green-400' :
                userLevel === 'medio' ? 'bg-blue-500/20 text-blue-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                NIVEL {userLevel.toUpperCase()}
              </span>
              <p className="text-gray-400 text-sm mt-2">{getLevelMessage()}</p>
            </div>
          )}
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-poker-black rounded-xl p-8 shadow-2xl"
          >
            {/* Selector de Rake */}
            <div className="mb-8">
              <label className="block text-gray-300 mb-3 font-semibold flex items-center">
                <FaCoins className="mr-2 text-poker-gold" />
                Rake Mensual Generado ($)
              </label>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <input 
                  type="range"
                  min={rakeValues.min}
                  max={rakeValues.max}
                  step={rakeValues.step}
                  value={rakeAmount}
                  onChange={(e) => setRakeAmount(e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${
                      ((rakeAmount - rakeValues.min) / (rakeValues.max - rakeValues.min)) * 100
                    }%, #374151 ${
                      ((rakeAmount - rakeValues.min) / (rakeValues.max - rakeValues.min)) * 100
                    }%, #374151 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>${rakeValues.min}</span>
                  <span className="text-poker-gold font-bold">${(rakeValues.min + rakeValues.max) / 2}</span>
                  <span>${rakeValues.max}</span>
                </div>
                <div className="text-center mt-4">
                  <div className="text-4xl font-bold text-poker-gold">
                    ${rakeAmount}
                  </div>
                  <div className="text-sm text-gray-400">por mes</div>
                </div>
              </div>
            </div>
            
            {/* Selector de Sala */}
            <div className="mb-8">
              <label className="block text-gray-300 mb-3 font-semibold flex items-center">
                <FaPercent className="mr-2 text-poker-gold" />
                Selecciona tu Sala
              </label>
              <select 
                value={selectedSala}
                onChange={(e) => setSelectedSala(e.target.value)}
                className="w-full bg-gray-800 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-poker-gold transition"
              >
                {availableSalas.map(sala => (
                  <option key={sala} value={sala}>
                    {getSalaDisplayName(sala)}
                  </option>
                ))}
              </select>
              {userLevel && (
                <p className="text-xs text-gray-500 mt-2">
                  Mostrando solo salas recomendadas para nivel {userLevel}
                </p>
              )}
            </div>
            
            {/* Resultados */}
            <div className="space-y-4">
              {/* Rakeback Mensual */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-poker-gold/10 to-yellow-600/10 p-6 rounded-lg border border-poker-gold/30"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Tu Rakeback Mensual:</p>
                    <p className="text-4xl font-bold text-poker-gold">
                      ${calculateRakeback()}
                    </p>
                  </div>
                  <FaChartBar className="text-poker-gold text-3xl opacity-50" />
                </div>
                <p className="text-gray-300 mt-2 text-sm">
                  ¡Dinero extra garantizado cada mes!
                </p>
              </motion.div>
              
              {/* Rakeback Anual */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-6 rounded-lg border border-green-500/30"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Proyección Anual:</p>
                    <p className="text-3xl font-bold text-green-400">
                      ${calculateYearlyRakeback()}
                    </p>
                  </div>
                  <FaTrophy className="text-green-400 text-3xl opacity-50" />
                </div>
                <p className="text-gray-300 mt-2 text-sm">
                  Ganancias extra en 12 meses
                </p>
              </motion.div>
            </div>
            
            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <a 
                href={`https://wa.me/51955311839?text=${encodeURIComponent(
                  userLevel 
                    ? `Soy nivel ${userLevel}, juego en ${selectedSala.toUpperCase()} y quiero ganar $${calculateRakeback()} de rakeback mensual`
                    : `Quiero jugar en ${selectedSala.toUpperCase()} y ganar $${calculateRakeback()} de rakeback mensual`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-whatsapp to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <FaCalculator className="inline mr-2" />
                QUIERO MI RAKEBACK DE ${calculateRakeback()}
              </a>
              
              {!userLevel && (
                <p className="text-gray-500 text-xs mt-4">
                  💡 Tip: Personaliza tu experiencia seleccionando tu nivel
                </p>
              )}
            </motion.div>
          </motion.div>
          
          {/* Información adicional */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-gray-800/50 p-4 rounded-lg text-center">
              <p className="text-poker-gold font-bold text-lg">Pagos Semanales</p>
              <p className="text-gray-400 text-sm">Todos los lunes sin excepción</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg text-center">
              <p className="text-poker-gold font-bold text-lg">100% Garantizado</p>
              <p className="text-gray-400 text-sm">Sin letra pequeña</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg text-center">
              <p className="text-poker-gold font-bold text-lg">Soporte 24/7</p>
              <p className="text-gray-400 text-sm">En español</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Corrigido: quitar jsx y dejar style normal */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
      `}</style>
    </div>
  )
}

export default RakeCalculator
