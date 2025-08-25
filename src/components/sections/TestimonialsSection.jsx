import { motion } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaCheckCircle, FaWhatsapp, FaTrophy, FaFire, FaClock, FaCoins } from 'react-icons/fa'

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      nick: "OmahaAce87",
      realName: "Carlos M.",
      location: "Lima",
      avatar: "/avatars/poker1.jpg",
      content: "PPPOKER tiene las mejores mesas de Omaha en soles. Llevo 4 meses jugando PLO100 y PLO200, mi bank crecio de S/800 a S/6,500. El rakeback del 55% me ayudo bastante. Los torneos diarios también pagan genial.",
      profit: "+S/5,700",
      period: "4 meses",
      room: "PPPOKER",
      roomColor: "bg-purple-600",
      games: "PLO100/PLO200 + Torneos",
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
      content: "X-POKER es perfecto para Texas Hold'em. Tienen todos los niveles en soles, desde NL40 hasta NL1000. Hay mesas llenas las 24 horas, El rakeback del 60% hace que sea muy rentable. En 3 meses subí a NL200 so.",
      profit: "+S/6,300",
      period: "3 meses",
      room: "X-POKER",
      roomColor: "bg-red-600",
      games: "NL40/NL100/NL200 Mesas",
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
      content: "Los torneos gratuitos de WPT son perfectos para hacer caja, pude cobrar $100 en uno de ellos y ahora estoy jugando stakes bajos remando el bank a casi $300, seguire jugando los Free y haciendo mas banca",
      profit: "$300",
      period: "1 meses",
      room: "WPT POKER",
      roomColor: "bg-blue-600",
      games: "Torneos Gratis",
      rating: 5,
      verified: true,
      date: "22 Ene 2025",
      badges: ["REY TORNEOS GRATIS", "CONSTRUCTOR"]
    },
    {
      id: 4,
      nick: "456Deep",
      realName: "Sando V.",
      location: "Cusco",
      avatar: "/avatars/poker4.jpg",
      content: "¡SUPREMA es una locura! Estaba jugando en las mesas de Omaha y de repente salió un Bad Beat Jackpot gigante. ¡Me dieron casi S/2,000 solo por estar sentado en la mesa! Sin duda, la mejor sala para jugar PLO en Perú. Además, me dan 50% de rakeback… ¡es brutal!",
      profit: "S/2,000 BBJP",
      period: "Una mano",
      room: "SUPREMA",
      roomColor: "bg-green-600", 
      games: "PLO100/PLO200 + Torneos",
      rating: 5,
      verified: true,
      date: "5 Ene 2025",
      badges: ["GANADOR POZO", "REINA OMAHA"]
    },
    {
      id: 5,
      nick: "Noptambulo",
      realName: "Miguel A.",
      location: "Piura",
      avatar: "/avatars/poker5.jpg",
      content: "WPT no da rakeback pero si unos bonasos, intente con 200$ y me dieron varios tickets y el 100% de mi deposito ya libere todito tengo como $600, no pense que seria tan rentable pero puros pescados",
      profit: "+$380",
      period: "1 mes", 
      room: "WPT POKER",
      roomColor: "bg-blue-600",
      games: "Mesas $25/$40 + Bonos",
      rating: 5,
      verified: true,
      date: "18 Mayo 2025",
      badges: ["LIBERADOR BONOS", "JUGADOR MESAS"]
    },
    {
      id: 6,
      nick: "GTOBluff",
      realName: "Fernando P.",
      location: "Iquitos",
      avatar: "/avatars/poker6.jpg",
      content: "Llevo 6 meses en PPPOKER jugando Omaha PLO40 y PLO100 en soles. Subí de S/500 a S/3,800 constantemente. Los torneos nocturnos de S/10 y S/35 de entrada también los juego y me va bien, seguire porque me subieron el rakeback al 60%.",
      profit: "+S/3,300",
      period: "6 meses",
      room: "PPPOKER", 
      roomColor: "bg-purple-600",
      games: "PLO40/PLO100 + Torneos",
      rating: 5,
      verified: true,
      date: "25 Julio 2025",
      badges: ["ESPECIALISTA OMAHA", "TRITURADORA TORNEOS"]
    }
  ]
  
  return (
    <section id="testimonios" className="py-20 bg-gradient-to-b from-gray-900 via-poker-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <FaTrophy className="text-poker-gold text-4xl mr-3" />
            <h2 className="text-4xl md:text-6xl font-black text-white">
              PLAYERS <span className="text-transparent bg-clip-text bg-gradient-to-r from-poker-gold to-yellow-400">GANADORES</span>
            </h2>
          </div>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Testimonios reales de nuestra comunidad de <span className="text-poker-gold font-bold">jugadores profesionales</span>
          </p>
          <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-400">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-3xl p-6 relative overflow-hidden border border-gray-700/50 hover:border-poker-gold/30 transition-all duration-300"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-poker-gold/5 to-transparent"></div>
              
              {/* Verification badge */}
              {testimonial.verified && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full p-2 shadow-lg">
                    <FaCheckCircle className="w-4 h-4" />
                  </div>
                </div>
              )}
              
              {/* Quote icon */}
              <FaQuoteLeft className="text-4xl text-poker-gold/20 absolute top-4 right-6 z-0" />
              
              {/* Header */}
              <div className="relative z-10 mb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-poker-gold via-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-black font-black text-lg shadow-lg">
                      {testimonial.nick.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-black text-white text-lg leading-tight">{testimonial.nick}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.realName} • {testimonial.location}</p>
                      <div className={`inline-flex items-center ${testimonial.roomColor} text-white px-2 py-1 rounded-full text-xs font-bold mt-1`}>
                        {testimonial.room}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {testimonial.badges.map((badge, idx) => (
                    <span 
                      key={idx}
                      className="bg-poker-gold/20 text-poker-gold border border-poker-gold/30 px-2 py-1 rounded-full text-xs font-bold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 mb-4">
                <p className="text-gray-200 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>
              
              {/* Game info */}
              <div className="bg-gray-800/50 rounded-xl p-3 mb-4">
                <p className="text-poker-gold text-sm font-bold">Especialidad: {testimonial.games}</p>
              </div>
              
              {/* Stats footer */}
              <div className="flex items-center justify-between border-t border-gray-700/50 pt-4">
                <div>
                  <p className="text-green-400 font-black text-xl flex items-center">
                    <FaCoins className="mr-2" />
                    {testimonial.profit}
                  </p>
                  <p className="text-gray-500 text-xs">en {testimonial.period}</p>
                  <p className="text-gray-600 text-xs mt-1">{testimonial.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex mb-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Rating</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 border border-poker-gold/20 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FaTrophy className="text-poker-gold text-3xl mr-3" />
              <p className="text-2xl text-white font-bold">
                Únete a nuestra comunidad de
              </p>
            </div>
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-poker-gold to-yellow-400 mb-2">
              6,247+ JUGADORES GANADORES
            </p>
            <p className="text-gray-400 mb-8 text-lg">
              Promedio de ganancias: <span className="text-green-400 font-bold">+$850/mes</span>
            </p>
            
            <a
              href="https://wa.me/51955311839?text=Quiero%20empezar%20a%20ganar%20como%20los%20testimonios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-poker-gold via-yellow-500 to-orange-500 text-black font-black px-10 py-5 rounded-full hover:scale-105 transition-all duration-300 text-xl shadow-2xl hover:shadow-poker-gold/25"
            >
              <FaWhatsapp className="mr-3 text-3xl" />
              EMPEZAR A GANAR AHORA
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection