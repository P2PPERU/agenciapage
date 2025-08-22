import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSection from '../components/sections/HeroSection'
import ComparisonTable from '../components/sections/ComparisonTable'
import RakeCalculator from '../components/sections/RakeCalculator'
import SalaCard from '../components/ui/SalaCard'
import { WhatsAppCTA } from '../components/ui/WhatsAppButton'
import { salas } from '../data/salas'
import { 
  FaTrophy, FaUsers, FaChartLine, FaClock, FaGift, 
  FaFire, FaStar, FaShieldAlt, FaBolt, FaMoneyBillWave,
  FaArrowRight, FaCheckCircle, FaQuoteLeft, FaHeadphones
} from 'react-icons/fa'

const HomePage = () => {
  const [visibleSalas, setVisibleSalas] = useState(6)
  const [selectedFilter, setSelectedFilter] = useState('all')
  
  // Filtrar salas según el filtro seleccionado
  const filteredSalas = salas.filter(sala => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'featured') return sala.featured
    if (selectedFilter === 'high-rb') return parseInt(sala.rakeback) >= 40
    if (selectedFilter === 'beginners') return parseInt(sala.minDeposit.replace('$', '')) <= 20
    return true
  })
  
  const loadMoreSalas = () => {
    setVisibleSalas(prev => Math.min(prev + 3, filteredSalas.length))
  }
  
  // Testimonios
  const testimonials = [
    {
      name: "Carlos M.",
      role: "Jugador Profesional",
      content: "Llevo 2 años con la agencia y he cobrado más de $45,000 en rakeback. El servicio es impecable.",
      rating: 5,
      profit: "+$45,000",
      avatar: "CM"
    },
    {
      name: "Ana P.",
      role: "Semi-Pro",
      content: "Cambié de agencia y ahora gano 25% más de rakeback. Los pagos son puntuales cada lunes.",
      rating: 5,
      profit: "+$12,500",
      avatar: "AP"
    },
    {
      name: "Miguel R.",
      role: "Recreacional",
      content: "Excelente atención 24/7. Me ayudaron a elegir la sala perfecta para mi nivel.",
      rating: 5,
      profit: "+$3,200",
      avatar: "MR"
    }
  ]
  
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Salas de Poker Section - DIRECTAMENTE DESPUÉS DEL HERO */}
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
              Todas verificadas, con rakeback garantizado y pagos puntuales
            </p>
            
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: 'all', label: 'Todas', icon: FaStar },
                { id: 'featured', label: 'Destacadas', icon: FaFire },
                { id: 'high-rb', label: 'Mayor RB', icon: FaChartLine },
                { id: 'beginners', label: 'Principiantes', icon: FaShieldAlt }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`
                    px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2
                    ${selectedFilter === filter.id 
                      ? 'bg-poker-gold text-black scale-105' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                  `}
                >
                  <filter.icon className="text-sm" />
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Grid de Salas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSalas.slice(0, visibleSalas).map((sala, index) => (
              <motion.div
                key={sala.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SalaCard sala={sala} index={index} />
              </motion.div>
            ))}
            
            {/* Banner Publicitario cada 3 salas */}
            {visibleSalas >= 3 && visibleSalas < filteredSalas.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="md:col-span-2 lg:col-span-3"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
                  <FaGift className="text-5xl text-white mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">
                    CLUB VIP EXCLUSIVO
                  </h3>
                  <p className="text-xl text-white/90 mb-6">
                    Únete al club VIP y obtén beneficios exclusivos + 10% rakeback extra
                  </p>
                  <WhatsAppCTA 
                    message="Quiero unirme al Club VIP"
                    text="UNIRME AL VIP"
                    variant="gold"
                    size="lg"
                  />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Botón cargar más */}
          {visibleSalas < filteredSalas.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mt-10"
            >
              <button
                onClick={loadMoreSalas}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105 inline-flex items-center"
              >
                Ver más salas 
                <FaArrowRight className="ml-2" />
              </button>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Calculadora de Rakeback */}
      <RakeCalculator />
      
      {/* Testimonios */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-poker-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              JUGADORES <span className="text-poker-gold">GANADORES</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Miles de jugadores ya están ganando con nosotros
            </p>
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
      
      {/* Comparison Table */}
      <ComparisonTable />
      
      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¿POR QUÉ <span className="text-poker-gold">ELEGIRNOS?</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaMoneyBillWave,
                title: "Pagos Garantizados",
                desc: "Cobros todos los lunes sin excepción. Más de $500K pagados."
              },
              {
                icon: FaBolt,
                title: "Rakeback Máximo",
                desc: "Hasta 60% de rakeback, el más alto del mercado."
              },
              {
                icon: FaHeadphones,
                title: "Soporte 24/7",
                desc: "Atención personalizada en español las 24 horas."
              },
              {
                icon: FaShieldAlt,
                title: "100% Seguro",
                desc: "Solo trabajamos con las mejores salas verificadas."
              },
              {
                icon: FaGift,
                title: "Bonos Exclusivos",
                desc: "Acceso a promociones y bonos que no encontrarás en otro lado."
              },
              {
                icon: FaChartLine,
                title: "Tracking Transparente",
                desc: "Reportes detallados de tu rake y ganancias."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-poker-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-3xl text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-poker-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-poker-gold via-yellow-500 to-orange-500 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              EMPIEZA A GANAR HOY
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Únete a más de 10,000 jugadores que ya están ganando dinero extra cada semana
            </p>
            
            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
              {[
                { step: "1", title: "REGÍSTRATE", desc: "Proceso simple en 2 minutos" },
                { step: "2", title: "JUEGA", desc: "En tu sala favorita" },
                { step: "3", title: "COBRA", desc: "Rakeback cada lunes" }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-black/10 backdrop-blur rounded-xl p-4"
                >
                  <div className="text-4xl font-black text-black mb-2">{step.step}</div>
                  <h4 className="font-bold text-black">{step.title}</h4>
                  <p className="text-black/70 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <WhatsAppCTA 
              message="Quiero empezar a ganar con poker online"
              text="EMPEZAR AHORA →"
              variant="primary"
              size="xl"
              showIcon={true}
            />
            
            <p className="mt-6 text-black/60 flex items-center justify-center">
              <FaCheckCircle className="mr-2" />
              Sin costos ocultos • 100% Gratis • Retiros instantáneos
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Latest News Link */}
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