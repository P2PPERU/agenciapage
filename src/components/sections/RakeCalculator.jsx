import { useState } from 'react'
import { FaCalculator } from 'react-icons/fa'

const RakeCalculator = () => {
  const [rakeAmount, setRakeAmount] = useState(1000)
  const [selectedSala, setSelectedSala] = useState('xpoker')
  
  const rakebackRates = {
    xpoker: 0.40,
    pppoker: 0.425,
    suprema: 0.60,
    wpt: 0.35,
    qqpk: 0.30
  }
  
  const calculateRakeback = () => {
    return (rakeAmount * rakebackRates[selectedSala]).toFixed(2)
  }
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-poker-gold">
          CALCULA TU RAKEBACK
        </h2>
        
        <div className="max-w-2xl mx-auto bg-poker-black rounded-xl p-8 shadow-2xl">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Rake Mensual Generado ($)</label>
            <input 
              type="range"
              min="100"
              max="10000"
              value={rakeAmount}
              onChange={(e) => setRakeAmount(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-2xl font-bold text-poker-gold mt-2">
              ${rakeAmount}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Selecciona tu Sala</label>
            <select 
              value={selectedSala}
              onChange={(e) => setSelectedSala(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-lg"
            >
              <option value="xpoker">X-POKER (40%)</option>
              <option value="pppoker">PPPOKER (42.5% promedio)</option>
              <option value="suprema">SUPREMA (60%)</option>
              <option value="wpt">WPT (35%)</option>
              <option value="qqpk">QQPK (30%)</option>
            </select>
          </div>
          
          <div className="bg-gradient-to-r from-poker-gold to-yellow-600 p-6 rounded-lg text-center">
            <p className="text-black text-lg mb-2">Tu Rakeback Mensual:</p>
            <p className="text-black text-5xl font-bold">
              ${calculateRakeback()}
            </p>
            <p className="text-black mt-2">¡Dinero gratis cada mes!</p>
          </div>
          
          <div className="text-center mt-6">
            <a 
              href={`https://wa.me/59170000000?text=${encodeURIComponent(`Quiero jugar en ${selectedSala.toUpperCase()} y ganar $${calculateRakeback()} de rakeback mensual`)}`}
              className="inline-block bg-whatsapp hover:bg-green-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              <FaCalculator className="inline mr-2" />
              QUIERO MI RAKEBACK
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RakeCalculator