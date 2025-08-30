import { useState, useEffect } from 'react'
import { FaCalculator, FaChartBar, FaPercent, FaCoins, FaTrophy, FaEdit, FaSlidersH, FaArrowUp, FaArrowDown, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '../../context/UserContext'
import { getRakeValuesByLevel } from '../../utils/storage'

const RakeCalculator = () => {
  const { userLevel } = useUser()
  const rakeValues = getRakeValuesByLevel(userLevel)
  const [rakeAmount, setRakeAmount] = useState(rakeValues.default)
  const [customRake, setCustomRake] = useState('')
  const [customRakebackRate, setCustomRakebackRate] = useState('')
  const [selectedSala, setSelectedSala] = useState('pppoker')
  const [inputMode, setInputMode] = useState('slider')
  const [rakebackMode, setRakebackMode] = useState('auto')
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const values = getRakeValuesByLevel(userLevel)
    setRakeAmount(values.default)
  }, [userLevel])

  const rakebackData = {
    pppoker: {
      name: 'PPPOKER',
      rateMin: 40,
      rateMax: 65,
      displayRate: '40-65%',
      description: 'Base 40%, hasta 65% VIP',
      color: 'from-green-500 to-green-700',
      rakeMin: 50,
      rakeMax: 3000
    },
    xpoker: {
      name: 'X-POKER',
      rateMin: 40,
      rateMax: 60,
      displayRate: '40-60%',
      description: 'Garantizado según volumen',
      color: 'from-cyan-500 to-cyan-700',
      rakeMin: 100,
      rakeMax: 2500
    },
    suprema: {
      name: 'SUPREMA POKER',
      rateMin: 40,
      rateMax: 60,
      displayRate: '40-60%',
      description: 'Semanal, especialista Omaha',
      color: 'from-orange-700 to-orange-900',
      rakeMin: 200,
      rakeMax: 4000
    },
    wpt: {
      name: 'WPT POKER',
      rateMin: 0,
      rateMax: 0,
      displayRate: 'Bonos',
      description: 'Bono 100% + Freeroll $10K',
      color: 'from-blue-700 to-red-700',
      isBonus: true,
      rakeMin: 100,
      rakeMax: 5000
    },
    clubgg: {
      name: 'CLUBGG',
      rateMin: 35,
      rateMax: 35,
      displayRate: '35%',
      description: 'Fijo para todos',
      color: 'from-gray-600 to-gray-800',
      rakeMin: 50,
      rakeMax: 1500
    },
    ggpoker: {
      name: 'GG POKER',
      rateMin: 20,
      rateMax: 60,
      displayRate: '20-60%',
      description: 'Fish Buffet según nivel',
      color: 'from-red-600 to-gray-900',
      rakeMin: 200,
      rakeMax: 8000
    },
    coinpoker: {
      name: 'COIN POKER',
      rateMin: 25,
      rateMax: 25,
      displayRate: '25%',
      description: '+ CHP Mining rewards',
      color: 'from-purple-500 to-purple-700',
      rakeMin: 100,
      rakeMax: 2000
    }
  }

  const getSalasByLevel = () => {
    if (!userLevel) return Object.keys(rakebackData)
    const salasByLevel = {
      basico: ['pppoker', 'xpoker', 'clubgg'],
      medio: ['xpoker', 'pppoker', 'suprema', 'wpt', 'ggpoker'],
      avanzado: ['suprema', 'ggpoker', 'coinpoker', 'wpt', 'pppoker']
    }
    return salasByLevel[userLevel] || Object.keys(rakebackData)
  }

  const availableSalas = getSalasByLevel()

  useEffect(() => {
    if (!availableSalas.includes(selectedSala)) {
      setSelectedSala(availableSalas[0])
    }
  }, [userLevel, availableSalas, selectedSala])

  const getCurrentRake = () => {
    return inputMode === 'custom' && customRake ? parseFloat(customRake) || 0 : parseFloat(rakeAmount)
  }

  const getCurrentRakebackRate = () => {
    const sala = rakebackData[selectedSala]
    if (rakebackMode === 'custom' && customRakebackRate) {
      return parseFloat(customRakebackRate) / 100
    }
    return (sala.rateMin + sala.rateMax) / 200
  }

  const calculateRakeback = (rake = null, rateOverride = null) => {
    const sala = rakebackData[selectedSala]
    if (sala.isBonus && !rateOverride) return '0'
    
    const currentRake = rake !== null ? rake : getCurrentRake()
    const rate = rateOverride !== null ? rateOverride : getCurrentRakebackRate()
    
    return (currentRake * rate).toFixed(2)
  }

  const calculateYearlyRakeback = (rake = null, rate = null) => {
    const monthly = parseFloat(calculateRakeback(rake, rate))
    return (monthly * 12).toFixed(2)
  }

  const handleCustomRakeChange = (e) => {
    const value = e.target.value
    if (value === '' || (!isNaN(value) && value >= 0 && value <= 50000)) {
      setCustomRake(value)
    }
  }

  const handleCustomRakebackChange = (e) => {
    const value = e.target.value
    if (value === '' || (!isNaN(value) && value >= 0 && value <= 100)) {
      setCustomRakebackRate(value)
    }
  }

  const currentSala = rakebackData[selectedSala]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const slides = [
    // Slide 1: Configuración de Sala y Rake
    {
      id: 'config',
      title: 'Configuración',
      content: (
        <div className="space-y-8">
          {/* Selector de Sala */}
          <div>
            <label className="block text-gray-300 mb-4 font-semibold text-lg">
              Selecciona tu Sala de Poker
            </label>
            <select 
              value={selectedSala}
              onChange={(e) => setSelectedSala(e.target.value)}
              className="w-full bg-gray-800 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-lg"
            >
              {availableSalas.map(salaId => {
                const sala = rakebackData[salaId]
                return (
                  <option key={salaId} value={salaId}>
                    {sala.name} ({sala.displayRate})
                  </option>
                )
              })}
            </select>
          </div>

          {/* Info de la Sala */}
          <div className={`bg-gradient-to-r ${currentSala.color} p-6 rounded-2xl text-white`}>
            <h3 className="text-2xl font-bold mb-2">{currentSala.name}</h3>
            <p className="text-white/80 mb-3">{currentSala.description}</p>
            <div className="text-right">
              <p className="text-3xl font-black">
                {rakebackMode === 'custom' && customRakebackRate 
                  ? `${customRakebackRate}%` 
                  : currentSala.displayRate
                }
              </p>
              <p className="text-white/80">Rakeback</p>
            </div>
          </div>

          {/* Configuración de Rake */}
          <div>
            <label className="block text-gray-300 mb-4 font-semibold text-lg">
              Tu Rake Mensual (S/)
            </label>
            
            {/* Botones de modo */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setInputMode('slider')}
                className={`px-4 py-3 rounded-lg font-medium transition flex items-center justify-center ${
                  inputMode === 'slider'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FaSlidersH className="mr-2" />
                Slider
              </button>
              <button
                onClick={() => setInputMode('custom')}
                className={`px-4 py-3 rounded-lg font-medium transition flex items-center justify-center ${
                  inputMode === 'custom'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FaEdit className="mr-2" />
                Manual
              </button>
            </div>

            {/* Input de Rake */}
            {inputMode === 'slider' ? (
              <div className="bg-gray-900 p-6 rounded-lg">
                <input 
                  type="range"
                  min={rakeValues.min}
                  max={rakeValues.max}
                  step={rakeValues.step}
                  value={rakeAmount}
                  onChange={(e) => setRakeAmount(e.target.value)}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider mb-4"
                  style={{
                    background: `linear-gradient(to right, #EAB308 0%, #EAB308 ${
                      ((rakeAmount - rakeValues.min) / (rakeValues.max - rakeValues.min)) * 100
                    }%, #374151 ${
                      ((rakeAmount - rakeValues.min) / (rakeValues.max - rakeValues.min)) * 100
                    }%, #374151 100%)`
                  }}
                />
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    S/{rakeAmount}
                  </div>
                  <div className="text-sm text-gray-400">por mes</div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500 font-bold text-xl">S/</span>
                  <input
                    type="number"
                    value={customRake}
                    onChange={handleCustomRakeChange}
                    placeholder="Ejemplo: 1000"
                    className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-xl"
                    min="0"
                    max="50000"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">Ingresa tu rake mensual en soles</p>
              </div>
            )}
          </div>
        </div>
      )
    },
    
    // Slide 2: Configuración de Rakeback y Resultados
    {
      id: 'results',
      title: 'Resultados',
      content: (
        <div className="space-y-8">
          {/* Configuración de Rakeback */}
          <div>
            <label className="block text-gray-300 mb-4 font-semibold text-lg">
              Porcentaje de Rakeback
            </label>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setRakebackMode('auto')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  rakebackMode === 'auto'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Automático
              </button>
              <button
                onClick={() => setRakebackMode('custom')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  rakebackMode === 'custom'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Personalizado
              </button>
            </div>
            
            {rakebackMode === 'custom' && (
              <div className="bg-gray-900 p-6 rounded-lg mb-6">
                <div className="relative">
                  <input
                    type="number"
                    value={customRakebackRate}
                    onChange={handleCustomRakebackChange}
                    placeholder="Ej: 45"
                    className="w-full pl-4 pr-10 py-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-xl"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 font-bold text-xl">%</span>
                </div>
              </div>
            )}
          </div>

          {/* Resultados Principales */}
          <div className="space-y-6">
            {/* Rakeback Mensual */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-xl border border-yellow-500/30">
              <p className="text-gray-400 text-sm mb-2">Rakeback Mensual</p>
              <p className="text-4xl font-bold text-yellow-500 mb-2">
                S/{currentSala.isBonus && rakebackMode === 'auto' ? '0' : calculateRakeback()}
              </p>
              <p className="text-gray-300 text-sm">
                {currentSala.isBonus && rakebackMode === 'auto' ? 'Recibes bonos en su lugar' : 'Dinero extra cada mes'}
              </p>
            </div>
            
            {/* Rakeback Anual */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-xl border border-green-500/30">
              <p className="text-gray-400 text-sm mb-2">Proyección Anual</p>
              <p className="text-3xl font-bold text-green-400 mb-2">
                S/{currentSala.isBonus && rakebackMode === 'auto' ? '0' : calculateYearlyRakeback()}
              </p>
              <p className="text-gray-300 text-sm">
                {currentSala.isBonus && rakebackMode === 'auto' ? 'Bonos + Freeroll $10K diario' : 'En 12 meses de juego'}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <a 
              href={`https://wa.me/51955311839?text=${encodeURIComponent(
                currentSala.isBonus && rakebackMode === 'auto'
                  ? `Quiero el bono 100% de WPT y acceso al freeroll de $10K diario`
                  : `Quiero jugar en ${currentSala.name} y ganar S/${calculateRakeback()} de rakeback mensual`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg text-center block"
            >
              <FaWhatsapp className="inline mr-2 text-xl" />
              {currentSala.isBonus && rakebackMode === 'auto'
                ? 'QUIERO LOS BONOS WPT'
                : `GANAR S/${calculateRakeback()}/MES`
              }
            </a>
          </div>
        </div>
      )
    },
    
    // Slide 3: Comparación de Porcentajes
    {
      id: 'comparison',
      title: 'Comparación',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Con tu rake de S/{getCurrentRake()}
          </h3>
          
          {/* Rakeback Mínimo */}
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/30">
            <div className="flex items-center mb-3">
              <FaArrowDown className="text-red-400 mr-2" />
              <p className="text-red-400 text-lg font-semibold">Con {currentSala.rateMin}% Rakeback</p>
            </div>
            <p className="text-gray-400 text-sm mb-2">Tu rake S/{getCurrentRake()} × {currentSala.rateMin}%</p>
            <p className="text-3xl font-bold text-white mb-2">
              S/{(getCurrentRake() * (currentSala.rateMin / 100)).toFixed(2)}/mes
            </p>
            <p className="text-gray-400 text-sm">
              S/{(getCurrentRake() * (currentSala.rateMin / 100) * 12).toFixed(2)}/año
            </p>
          </div>
          
          {/* Rakeback Máximo */}
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/30">
            <div className="flex items-center mb-3">
              <FaArrowUp className="text-green-400 mr-2" />
              <p className="text-green-400 text-lg font-semibold">Con {currentSala.rateMax}% Rakeback</p>
            </div>
            <p className="text-gray-400 text-sm mb-2">Tu rake S/{getCurrentRake()} × {currentSala.rateMax}%</p>
            <p className="text-3xl font-bold text-white mb-2">
              S/{(getCurrentRake() * (currentSala.rateMax / 100)).toFixed(2)}/mes
            </p>
            <p className="text-gray-400 text-sm">
              S/{(getCurrentRake() * (currentSala.rateMax / 100) * 12).toFixed(2)}/año
            </p>
          </div>

          {/* Diferencia */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl border border-yellow-500/30 text-center">
            <p className="text-gray-400 text-sm mb-2">Diferencia Mensual</p>
            <p className="text-2xl font-bold text-yellow-500">
              S/{((getCurrentRake() * (currentSala.rateMax / 100)) - (getCurrentRake() * (currentSala.rateMin / 100))).toFixed(2)}
            </p>
            <p className="text-gray-300 text-sm mt-1">más al mes con el mejor rakeback</p>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="relative py-12 md:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden" id="comparador">
      {/* Background abstracto */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
        
        {/* Patrón de grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">
            CALCULADORA DE RAKEBACK
          </h2>
          <p className="text-gray-400 text-lg">
            Descubre cuánto puedes ganar cada mes
          </p>
        </motion.div>

        {/* Carrusel */}
        <div className="relative">
          {/* Slide Container */}
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl min-h-[600px] overflow-hidden border border-gray-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    {currentSlide === 0 && <FaCalculator className="mr-3 text-yellow-500" />}
                    {currentSlide === 1 && <FaTrophy className="mr-3 text-yellow-500" />}
                    {currentSlide === 2 && <FaChartBar className="mr-3 text-yellow-500" />}
                    {slides[currentSlide].title}
                  </h3>
                  <span className="text-gray-500 text-sm">
                    {currentSlide + 1} / {slides.length}
                  </span>
                </div>
                
                {slides[currentSlide].content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles de navegación - Flechas */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 backdrop-blur hover:bg-gray-700 text-white p-3 rounded-full transition-colors shadow-lg border border-gray-700"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 backdrop-blur hover:bg-gray-700 text-white p-3 rounded-full transition-colors shadow-lg border border-gray-700"
          >
            <FaChevronRight />
          </button>

          {/* Indicadores de slide */}
          <div className="flex justify-center space-x-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-yellow-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="bg-gray-800/50 backdrop-blur p-4 rounded-xl text-center border border-gray-700">
            <p className="text-yellow-500 font-bold text-lg mb-2">Pagos Semanales</p>
            <p className="text-gray-400 text-sm">Todos los lunes</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur p-4 rounded-xl text-center border border-gray-700">
            <p className="text-yellow-500 font-bold text-lg mb-2">100% Garantizado</p>
            <p className="text-gray-400 text-sm">Sin letra pequeña</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur p-4 rounded-xl text-center border border-gray-700">
            <p className="text-yellow-500 font-bold text-lg mb-2">Soporte 24/7</p>
            <p className="text-gray-400 text-sm">En español</p>
          </div>
        </motion.div>
      </div>
      
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #EAB308;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.6);
          border: none;
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #EAB308;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.6);
          border: none;
        }
      `}</style>
    </div>
  )
}

export default RakeCalculator