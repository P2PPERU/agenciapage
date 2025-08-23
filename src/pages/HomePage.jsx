import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Contexto y hooks
import { useUser } from '../context/UserContext'
import useUserLevel from '../hooks/useUserLevel'

// Componentes
import HeroSection from '../components/sections/HeroSection'
import ComparisonTable from '../components/sections/ComparisonTable'
import RakeCalculator from '../components/sections/RakeCalculator'
import SalaCard from '../components/ui/SalaCard'
import { WhatsAppCTA } from '../components/ui/WhatsAppButton'

// Data
import { salas } from '../data/salas'

// Íconos
import { 
  FaChartLine, FaShieldAlt, FaTh, FaList, FaArrowRight, 
  FaQuoteLeft, FaStar, FaCheckCircle, FaBalanceScale, 
  FaBolt, FaGift, FaUsers
} from 'react-icons/fa'

const HomePage = () => {
  const { userLevel } = useUser()
  const { 
    filterRoomsByLevel, 
    getLevelMessage, 
    getRecommendedRooms 
  } = useUserLevel()

  const [visibleSalas, setVisibleSalas] = useState(10)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [viewMode, setViewMode] = useState('compact')

  // Filtrado principal considerando nivel + filtros
  const filteredSalas = salas.filter(sala => {
    const levelFiltered = userLevel ? filterRoomsByLevel([sala])[0] : sala
    if (!levelFiltered) return false

    if (selectedFilter === 'all') return true
    if (selectedFilter === 'featured') return sala.featured
    if (selectedFilter === 'high-rb') return parseInt(sala.rakeback) >= 40
    if (selectedFilter === 'beginners') {
      return sala.level && sala.level.includes('basico')
    }
    return true
  })

  // Salas recomendadas según nivel
  const recommendedSalas = getRecommendedRooms(filteredSalas)

  // Mensaje personalizado por nivel
  const levelMessage = getLevelMessage()

  // Testimonios
  const testimonials = [
    {
      name: "Carlos M.",
      role: "Jugador Profesional",
      content: "Poker Pro Track me ayudó a encontrar la sala perfecta. Pasé de 30% a 60% de rakeback.",
      rating: 5,
      profit: "+60% RB",
      avatar: "CM"
    },
    {
      name: "Ana P.",
      role: "Semi-Pro",
      content: "Excelente comparador. Ahora sé exactamente dónde jugar según mi volumen.",
      rating: 5,
      profit: "+$800/mes",
      avatar: "AP"
    },
    {
      name: "Miguel R.",
      role: "Recreacional",
      content: "Me encanta poder comparar todas las salas en un solo lugar. Super útil.",
      rating: 5,
      profit: "Mejor ROI",
      avatar: "MR"
    }
  ]

  const loadMoreSalas = () => {
    setVisibleSalas(prev => Math.min(prev + 5, filteredSalas.length))
  }

  return (
    <>
      <HeroSection userLevel={userLevel} />

      {/* Mensaje personalizado si hay nivel */}
      {userLevel && (
        <div className="bg-gradient-to-r from-poker-gold/10 to-yellow-500/10 py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="text-poker-gold font-bold">{levelMessage.title}</p>
            <p className="text-gray-400 text-sm">{levelMessage.description}</p>
          </div>
        </div>
      )}

      {/* Salas de Poker Section */}
      <section id="salas" className="py-20 bg-gradient-to-b from-poker-black to-gray-900">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              COMPARA TODAS LAS <span className="text-poker-gold">SALAS</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Encuentra la más rentable para tu nivel y estilo de juego
            </p>

            {/* Controles de Vista */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              {/* Filtros */}
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'all', label: 'Todas', icon: FaStar },
                  { id: 'featured', label: 'Destacadas', icon: FaStar },
                  { id: 'high-rb', label: 'Mayor RB', icon: FaChartLine },
                  { id: 'beginners', label: 'Principiantes', icon: FaShieldAlt }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 text-sm
                      ${selectedFilter === filter.id 
                        ? 'bg-poker-gold text-black scale-105' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    <filter.icon className="text-xs" />
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Toggle Vista */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('compact')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'compact'
                      ? 'bg-poker-gold text-black'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  title="Vista Compacta"
                >
                  <FaTh size={18} />
                </button>
                <button
                  onClick={() => setViewMode('full')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'full'
                      ? 'bg-poker-gold text-black'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  title="Vista Completa"
                >
                  <FaList size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Grid de Salas */}
          <div className={`grid gap-6 ${
            viewMode === 'compact'
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {recommendedSalas.slice(0, visibleSalas).map((sala, index) => (
              <motion.div
                key={sala.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SalaCard sala={sala} index={index} viewMode={viewMode} />
              </motion.div>
            ))}
          </div>

          {/* Botón cargar más */}
          {visibleSalas < recommendedSalas.length && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mt-10"
            >
              <button
                onClick={loadMoreSalas}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105 inline-flex items-center"
              >
                Ver más salas ({recommendedSalas.length - visibleSalas} restantes)
                <FaArrowRight className="ml-2" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Calculadora de Rakeback */}
      <div id="comparador">
        <RakeCalculator />
      </div>

      {/* Testimonios */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-poker-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              JUGADORES <span className="text-poker-gold">SATISFECHOS</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900 rounded-2xl p-6 relative hover:scale-105 transition-transform"
              >
                <FaQuoteLeft className="text-4xl text-poker-gold/20 absolute top-4 right-4" />

                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-poker-gold to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-poker-green font-bold">
                    {testimonial.profit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabla comparativa */}
      <ComparisonTable />

      {/* CTA final */}
      <section id="contacto" className="py-20 bg-poker-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-poker-gold via-yellow-500 to-orange-500 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              ENCUENTRA TU SALA IDEAL AHORA
            </h2>
            <WhatsAppCTA
              message="Hola, necesito ayuda para elegir la sala más rentable para mi nivel"
              text="RECIBIR ASESORÍA GRATIS →"
              variant="primary"
              size="xl"
              showIcon={true}
            />
            <p className="mt-6 text-black/60 flex items-center justify-center">
              <FaCheckCircle className="mr-2" />
              100% Gratis • Sin compromiso • Respuesta inmediata
            </p>
          </motion.div>
        </div>
      </section>

      {/* Noticias */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800 rounded-2xl p-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                📰 Últimas Noticias y Análisis
              </h3>
              <p className="text-gray-400">
                Mantente actualizado con las últimas novedades y estrategias
              </p>
            </div>
            <Link
              to="/noticias"
              className="mt-4 md:mt-0 bg-poker-gold text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-500 transition-all inline-flex items-center"
            >
              Ver Noticias
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
