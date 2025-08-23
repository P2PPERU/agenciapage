import { motion } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaCheckCircle, FaWhatsapp } from 'react-icons/fa'

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Juan Carlos M.",
      location: "Lima",
      avatar: "JC",
      content: "Gané S/3,500 este mes solo con el rakeback de PPPOKER. Nunca pensé que jugar poker me daría ingresos extra tan buenos.",
      profit: "+S/3,500/mes",
      room: "PPPOKER",
      rating: 5,
      verified: true,
      date: "Enero 2024"
    },
    {
      id: 2,
      name: "María Fernanda P.",
      location: "Arequipa",
      avatar: "MF",
      content: "El Bad Beat Jackpot de X-POKER me cambió la vida: gané S/45,000 en una sola mano. Los pagos llegaron en 24 horas a mi YAPE.",
      profit: "S/45,000 JACKPOT",
      room: "X-POKER",
      rating: 5,
      verified: true,
      date: "Diciembre 2023"
    },
    {
      id: 3,
      name: "Roberto S.",
      location: "Trujillo",
      avatar: "RS",
      content: "Los freerolls de $10K en WPT son reales. Ya gané 3 veces este mes sin invertir nada. Totalmente recomendado.",
      profit: "$800 en freerolls",
      room: "WPT POKER",
      rating: 5,
      verified: true,
      date: "Enero 2024"
    },
    {
      id: 4,
      name: "Ana Lucía V.",
      location: "Cusco",
      avatar: "AL",
      content: "SUPREMA tiene las mejores mesas de Omaha. El rakeback del 60% me genera S/2,000 extra cada mes. Pagos puntuales con PLIN.",
      profit: "+S/2,000/mes",
      room: "SUPREMA",
      rating: 5,
      verified: true,
      date: "Enero 2024"
    }
  ]
  
  return (
    <section id="testimonios" className="py-20 bg-poker-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            JUGADORES <span className="text-poker-gold">GANADORES REALES</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Testimonios verificados de nuestra comunidad
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-6 relative hover:scale-105 transition-transform"
            >
              {testimonial.verified && (
                <div className="absolute -top-3 -right-3">
                  <div className="bg-green-500 text-white rounded-full p-2">
                    <FaCheckCircle />
                  </div>
                </div>
              )}
              
              <FaQuoteLeft className="text-4xl text-poker-gold/20 absolute top-4 right-4" />
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-poker-gold to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  <p className="text-poker-gold text-xs font-bold">{testimonial.room}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                <div>
                  <p className="text-green-400 font-black text-xl">
                    {testimonial.profit}
                  </p>
                  <p className="text-gray-500 text-xs">{testimonial.date}</p>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Únete a más de <span className="text-poker-gold font-bold">5,847 jugadores</span> que ya están ganando
          </p>
          <a
            href="https://wa.me/51955311839?text=Quiero%20empezar%20a%20ganar%20como%20los%20testimonios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-poker-gold to-yellow-500 text-black font-black px-8 py-4 rounded-full hover:scale-105 transition text-lg"
          >
            <FaWhatsapp className="mr-2 text-2xl" />
            QUIERO GANAR TAMBIÉN
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection