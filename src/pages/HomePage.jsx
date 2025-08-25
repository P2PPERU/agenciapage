import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Contexto y hooks
import { useUser } from '../context/UserContext'
import useUserLevel from '../hooks/useUserLevel'

// Componentes de secciones
import HeroSection from '../components/sections/HeroSection'
import ComparisonTable from '../components/sections/ComparisonTable'
import RakeCalculator from '../components/sections/RakeCalculator'
import PaymentMethods from '../components/sections/PaymentMethods'
import TestimonialsSection from '../components/sections/TestimonialsSection'

// Componentes UI
import SalaCard from '../components/ui/SalaCard'
import { WhatsAppCTA } from '../components/ui/WhatsAppButton'

// Data actualizada
import { salas } from '../data/salas'

// Íconos
import { 
  FaChartLine, FaShieldAlt, FaTh, FaList, FaArrowRight, 
  FaQuoteLeft, FaStar, FaCheckCircle, FaBalanceScale, 
  FaBolt, FaGift, FaUsers, FaDice, FaCoins, FaFire
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
  const [playersOnline] = useState(5847)

  // Filtrado principal considerando nivel + filtros
  const filteredSalas = salas.filter(sala => {
    const levelFiltered = userLevel ? filterRoomsByLevel([sala])[0] : sala
    if (!levelFiltered) return false

    if (selectedFilter === 'all') return true
    if (selectedFilter === 'featured') return sala.featured
    if (selectedFilter === 'high-rb') {
      // Mejorar el filtro para rakeback
      const rakebackMatch = sala.rakeback?.match(/\d+/)
      return rakebackMatch && parseInt(rakebackMatch[0]) >= 40
    }
    if (selectedFilter === 'beginners') {
      return sala.level && sala.level.includes('basico')
    }
    if (selectedFilter === 'omaha') {
      return sala.gameType && sala.gameType.toLowerCase().includes('omaha')
    }
    if (selectedFilter === 'texas') {
      return sala.gameType && sala.gameType.toLowerCase().includes('texas')
    }
    return true
  })

  // Salas recomendadas según nivel
  const recommendedSalas = getRecommendedRooms(filteredSalas)

  // Mensaje personalizado por nivel
  const levelMessage = getLevelMessage()

  const loadMoreSalas = () => {
    setVisibleSalas(prev => Math.min(prev + 5, filteredSalas.length))
  }

  return (
    <>
      {/* Hero Section con contador de jugadores */}
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

      {/* Badge de jugadores online */}
      <div className="bg-gray-900 py-3 border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-gray-400">
              <span className="text-poker-gold font-bold">{playersOnline.toLocaleString()}</span> jugadores online ahora
            </span>
          </motion.div>
        </div>
      </div>

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
              ELIGE TU <span className="text-poker-gold">SALA PERFECTA</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Todas con pagos garantizados • Depósitos con YAPE y PLIN
            </p>

            {/* Controles de Vista */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              {/* Filtros mejorados */}
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'all', label: 'Todas', icon: FaStar },
                  { id: 'featured', label: 'Destacadas', icon: FaFire },
                  { id: 'high-rb', label: 'Mayor RB', icon: FaChartLine },
                  { id: 'omaha', label: 'Omaha', icon: FaDice },
                  { id: 'texas', label: 'Texas', icon: FaCoins },
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

          {/* Mensaje si no hay resultados */}
          {recommendedSalas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">
                No hay salas que coincidan con tu búsqueda
              </p>
              <button
                onClick={() => {
                  setSelectedFilter('all')
                }}
                className="text-poker-gold hover:underline"
              >
                Ver todas las salas →
              </button>
            </div>
          )}

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

      {/* NUEVA SECCIÓN: Métodos de Pago con YAPE y PLIN destacados */}
      <section id="pagos">
        <PaymentMethods />
      </section>

      {/* Calculadora de Rakeback */}
      <div id="calculator">
        <RakeCalculator />
      </div>

      {/* NUEVA SECCIÓN: Testimonios con fotos y verificación */}
      <TestimonialsSection />

      {/* Tabla comparativa */}
      <ComparisonTable />

      {/* Stats Section - Números impresionantes */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-poker-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-poker-gold mb-2">5,847+</div>
              <p className="text-gray-400">Jugadores Activos</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-400 mb-2">S/2.4M</div>
              <p className="text-gray-400">Pagados este mes</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">65%</div>
              <p className="text-gray-400">Máximo Rakeback</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <p className="text-gray-400">Soporte en Español</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section id="contacto" className="py-20 bg-poker-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-poker-gold via-yellow-500 to-orange-500 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              ¿LISTO PARA EMPEZAR A GANAR?
            </h2>
            <p className="text-2xl text-black/80 mb-8">
              Únete a más de 5,000 jugadores que ya están ganando
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppCTA
                message="Hola, quiero empezar a jugar poker online con el mejor rakeback"
                text="EMPEZAR AHORA →"
                variant="primary"
                size="xl"
                showIcon={true}
              />
              <WhatsAppCTA
                message="Hola, necesito ayuda para elegir la sala más rentable para mi nivel"
                text="ASESORÍA GRATIS"
                variant="secondary"
                size="xl"
                showIcon={false}
              />
            </div>
            <p className="mt-6 text-black/60 flex items-center justify-center">
              <FaCheckCircle className="mr-2" />
              100% Gratis • Sin compromiso • Respuesta en menos de 2 minutos
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
                📰 Últimas Noticias y Estrategias
              </h3>
              <p className="text-gray-400">
                Mantente actualizado con las últimas novedades del poker online
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