import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaCheckCircle, FaWhatsapp, FaTrophy, FaFire, FaClock, FaCoins, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 1,
      nick: "OmahaAce87",
      realName: "Carlos M.",
      location: "Lima",
      avatar: "/avatars/poker1.jpg",
      content: "PPPOKER tiene las mejores mesas de Omaha en soles. Llevo 4 meses jugando PLO100 y PLO200, mi bank crecio de S/800 a S/6,500. El rakeback del 55% me ayudo bastante.",
      profit: "+S/5,700",
      period: "4 meses",
      room: "PPPOKER",
      roomColor: "bg-purple-600",
      games: "PLO100/PLO200",
      rating: 5,
      verified: true,
      date: "15 Ene 2025",
      badges: ["ESPECIALISTA OMAHA", "VERIFICADO"]
    },
    {
      id: 2,
      nick: "TIMEX29",
      realName: "Alexander G.",
      location: "Lima", 
      avatar: "/avatars/poker2.jpg",
      content: "X-POKER es perfecto para Texas Hold'em. Tienen todos los niveles en soles, desde NL40 hasta NL1000. El rakeback del 60% hace que sea muy rentable. En 3 meses subí a NL200.",
      profit: "+S/6,300",
      period: "3 meses",
      room: "X-POKER",
      roomColor: "bg-red-600",
      games: "NL40/NL100/NL200",
      rating: 5,
      verified: true,
      date: "8 Dic 2024",
      badges: ["ESPECIALISTA TEXAS", "NIVEL ALTO"]
    },
    {
      id: 3,
      nick: "kkmikkase",
      realName: "Diego S.",
      location: "Trujillo",
      avatar: "/avatars/poker3.jpg",
      content: "Los torneos gratuitos de WPT son perfectos para hacer caja, pude cobrar $100 en uno de ellos y ahora estoy jugando stakes bajos remando el bank a casi $300.",
      profit: "$300",
      period: "1 mes",
      room: "WPT POKER",
      roomColor: "bg-blue-600",
      games: "Torneos Gratis",
      rating: 5,
      verified: true,
      date: "22 Ene 2025",
      badges: ["REY TORNEOS", "CONSTRUCTOR"]
    },
    {
      id: 4,
      nick: "456Deep",
      realName: "Sando V.",
      location: "Cusco",
      avatar: "/avatars/poker4.jpg",
      content: "¡SUPREMA es una locura! Salió un Bad Beat Jackpot gigante. ¡Me dieron casi S/2,000 solo por estar sentado en la mesa! Además, me dan 50% de rakeback… ¡es brutal!",
      profit: "S/2,000 BBJP",
      period: "Una mano",
      room: "SUPREMA",
      roomColor: "bg-green-600", 
      games: "PLO100/PLO200",
      rating: 5,
      verified: true,
      date: "5 Ene 2025",
      badges: ["GANADOR POZO", "OMAHA"]
    },
    {
      id: 5,
      nick: "Noptambulo",
      realName: "Miguel A.",
      location: "Piura",
      avatar: "/avatars/poker5.jpg",
      content: "WPT no da rakeback pero si unos bonazos, intente con 200$ y me dieron varios tickets y el 100% de mi deposito. Ya libere todo y tengo como $600, puros pescados.",
      profit: "+$380",
      period: "1 mes", 
      room: "WPT POKER",
      roomColor: "bg-blue-600",
      games: "Mesas $25/$40",
      rating: 5,
      verified: true,
      date: "18 Mayo 2025",
      badges: ["LIBERADOR BONOS", "MESAS"]
    },
    {
      id: 6,
      nick: "GTOBluff",
      realName: "Fernando P.",
      location: "Iquitos",
      avatar: "/avatars/poker6.jpg",
      content: "Llevo 6 meses en PPPOKER jugando Omaha PLO40 y PLO100 en soles. Subí de S/500 a S/3,800 constantemente. Me subieron el rakeback al 60%.",
      profit: "+S/3,300",
      period: "6 meses",
      room: "PPPOKER", 
      roomColor: "bg-purple-600",
      games: "PLO40/PLO100",
      rating: 5,
      verified: true,
      date: "25 Julio 2025",
      badges: ["ESPECIALISTA OMAHA", "TORNEOS"]
    }
  ]

  // Calcular cuántos testimonios mostrar según el breakpoint
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount())
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Máximo índice basado en testimonios visibles
  const maxIndex = Math.max(0, testimonials.length - visibleCount)

  // Navegación
  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  // Pausar autoplay al hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)
  
  return (
    <section 
      id="testimonios" 
      className="py-12 md:py-20 bg-gradient-to-b from-gray-900 via-poker-black to-gray-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <FaTrophy className="text-poker-gold text-2xl md:text-4xl mr-2 md:mr-3" />
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white">
              PLAYERS <span className="text-transparent bg-clip-text bg-gradient-to-r from-poker-gold to-yellow-400">GANADORES</span>
            </h2>
          </div>
          <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto px-4">
            Testimonios reales de nuestra comunidad de <span className="text-poker-gold font-bold">jugadores profesionales</span>
          </p>
          <div className="flex flex-wrap items-center justify-center mt-4 gap-4 md:gap-6 text-sm text-gray-400">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-400 mr-2" />
              <span>Verificados</span>
            </div>
            <div className="flex items-center">
              <FaFire className="text-orange-400 mr-2" />
              <span>Ganancias Reales</span>
            </div>
            <div className="flex items-center">
              <FaClock className="text-blue-400 mr-2" />
              <span>Actualizados</span>
            </div>
          </div>
        </motion.div>

        {/* Carrusel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Controles de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-poker-gold hover:bg-yellow-500 text-black rounded-full p-3 md:p-4 shadow-2xl hover:scale-110 transition-all duration-300"
            aria-label="Testimonio anterior"
          >
            <FaChevronLeft className="text-lg md:text-xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-poker-gold hover:bg-yellow-500 text-black rounded-full p-3 md:p-4 shadow-2xl hover:scale-110 transition-all duration-300"
            aria-label="Siguiente testimonio"
          >
            <FaChevronRight className="text-lg md:text-xl" />
          </button>

          {/* Testimonios */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              animate={{ x: `${-currentIndex * (100 / visibleCount)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={testimonial.id}
                  className={`flex-shrink-0 px-2 md:px-4 ${
                    visibleCount === 1 ? 'w-full' : 
                    visibleCount === 2 ? 'w-1/2' : 'w-1/3'
                  }`}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                    }}
                    className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-2xl p-4 md:p-6 relative overflow-hidden border border-gray-700/50 hover:border-poker-gold/30 transition-all duration-300 h-full"
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-poker-gold/5 to-transparent"></div>
                    
                    {/* Verification badge */}
                    {testimonial.verified && (
                      <div className="absolute -top-1 -right-1 z-10">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full p-1.5 shadow-lg">
                          <FaCheckCircle className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                    
                    {/* Quote icon */}
                    <FaQuoteLeft className="text-2xl text-poker-gold/20 absolute top-3 right-4 z-0" />
                    
                    {/* Header */}
                    <div className="relative z-10 mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-poker-gold via-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-black font-black text-sm md:text-base shadow-lg">
                          {testimonial.nick.charAt(0)}
                        </div>
                        <div className="ml-3 flex-1">
                          <h4 className="font-black text-white text-sm md:text-base leading-tight">{testimonial.nick}</h4>
                          <p className="text-gray-400 text-xs">{testimonial.realName} • {testimonial.location}</p>
                          <div className={`inline-flex items-center ${testimonial.roomColor} text-white px-2 py-0.5 rounded-full text-xs font-bold mt-1`}>
                            {testimonial.room}
                          </div>
                        </div>
                      </div>
                      
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {testimonial.badges.map((badge, badgeIdx) => (
                          <span 
                            key={badgeIdx}
                            className="bg-poker-gold/20 text-poker-gold border border-poker-gold/30 px-2 py-0.5 rounded-full text-xs font-bold"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 mb-4">
                      <p className="text-gray-200 leading-relaxed italic text-sm">
                        "{testimonial.content}"
                      </p>
                    </div>
                    
                    {/* Game info */}
                    <div className="bg-gray-800/50 rounded-lg p-2 mb-4">
                      <p className="text-poker-gold text-xs font-bold">Especialidad: {testimonial.games}</p>
                    </div>
                    
                    {/* Stats footer */}
                    <div className="flex items-center justify-between border-t border-gray-700/50 pt-3">
                      <div className="flex-1">
                        <p className="text-green-400 font-black text-base md:text-lg flex items-center">
                          <FaCoins className="mr-2 text-sm" />
                          <span className="truncate">{testimonial.profit}</span>
                        </p>
                        <p className="text-gray-500 text-xs">en {testimonial.period}</p>
                        <p className="text-gray-600 text-xs">{testimonial.date}</p>
                      </div>
                      <div className="text-right ml-2">
                        <div className="flex mb-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400 w-3 h-3" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">Rating</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicadores de posición */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === i 
                    ? 'bg-poker-gold scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Ir al grupo ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-poker-gold/20 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4">
              <FaTrophy className="text-poker-gold text-2xl md:text-3xl mr-0 md:mr-3 mb-2 md:mb-0" />
              <p className="text-lg md:text-2xl text-white font-bold text-center md:text-left">
                Únete a nuestra comunidad de
              </p>
            </div>
            <p className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-poker-gold to-yellow-400 mb-2">
              200+ JUGADORES GANADORES
            </p>
            <p className="text-gray-400 mb-6 md:mb-8 text-base md:text-lg">
              Promedio de ganancias: <span className="text-green-400 font-bold">+$850/mes</span>
            </p>
            
            <a
              href="https://wa.me/51955311839?text=Quiero%20empezar%20a%20ganar%20como%20los%20testimonios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-poker-gold via-yellow-500 to-orange-500 text-black font-black px-6 md:px-10 py-4 md:py-5 rounded-full hover:scale-105 transition-all duration-300 text-lg md:text-xl shadow-2xl hover:shadow-poker-gold/25"
            >
              <FaWhatsapp className="mr-2 md:mr-3 text-2xl md:text-3xl" />
              <span className="hidden md:inline">EMPEZAR A GANAR AHORA</span>
              <span className="md:hidden">EMPEZAR AHORA</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection