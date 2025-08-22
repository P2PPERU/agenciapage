import { FaTrophy, FaMoneyBillWave, FaHeadset } from 'react-icons/fa'

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Gradiente de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-poker-black via-gray-900 to-poker-black"></div>
      
      {/* Contenido */}
      <div className="relative container mx-auto px-4 py-20">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4">
          <span className="text-poker-gold">POKER</span>
          <span className="text-white"> AGENCY</span>
        </h1>
        
        <p className="text-center text-xl md:text-2xl mb-8 text-gray-300">
          Tu Agente Oficial de Poker Online
        </p>
        
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center bg-gray-800 rounded-full px-6 py-3">
            <FaTrophy className="text-poker-gold mr-2" />
            <span>5+ Años de Experiencia</span>
          </div>
          <div className="flex items-center bg-gray-800 rounded-full px-6 py-3">
            <FaMoneyBillWave className="text-poker-green mr-2" />
            <span>Pagos Garantizados</span>
          </div>
          <div className="flex items-center bg-gray-800 rounded-full px-6 py-3">
            <FaHeadset className="text-blue-500 mr-2" />
            <span>Soporte 24/7</span>
          </div>
        </div>
        
        {/* CTA Principal */}
        <div className="text-center">
          <a 
            href={`https://wa.me/59170000000?text=${encodeURIComponent('Hola, quiero empezar a jugar poker online')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-poker-gold to-yellow-600 text-black font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-all shadow-lg"
          >
            COMENZAR AHORA →
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeroSection