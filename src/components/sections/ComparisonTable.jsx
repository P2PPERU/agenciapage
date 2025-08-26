import { motion } from 'framer-motion'
import { FaTrophy, FaWhatsapp, FaStar, FaFire, FaGift, FaCoins, FaChartLine } from 'react-icons/fa'

const ComparisonTable = () => {
  const data = [
    { 
      sala: 'WPT POKER', 
      principiante: 4, 
      rakeback: 'Freeroll $10K Diario', 
      deposito: 'S/100',
      bonus: 'Bono 100% + Tickets',
      destacado: 'FREEROLL $10,000 DIARIO',
      whatsapp: 'Quiero el bono 100% de WPT y el freeroll de $10K diario',
      color: 'from-blue-700 to-red-700',
      featured: true,
      pros: ['Freeroll $10K diario GRATIS', 'Bono 100% primer depósito', 'Marca mundial WPT'],
      tipoJugador: 'Full Recreativos'
    },
    { 
      sala: 'PPPOKER', 
      principiante: 5, 
      rakeback: '40-65%', 
      deposito: 'S/10',
      bonus: 'Rakeback hasta 65%',
      destacado: 'MEJOR RAKEBACK DEL MERCADO',
      whatsapp: 'Quiero jugar en PPPOKER con hasta 65% de rakeback',
      color: 'from-green-500 to-green-700',
      pros: ['Rakeback más alto', 'Depósito más bajo', 'Perfecto principiantes'],
      tipoJugador: 'Grinders/Regulares'
    },
    { 
      sala: 'X-POKER', 
      principiante: 4, 
      rakeback: '40-60%', 
      deposito: 'S/20',
      bonus: 'Jackpot S/523K',
      destacado: 'BAD BEAT JACKPOT GIGANTE',
      whatsapp: 'Quiero jugar en X-POKER con el Bad Beat Jackpot',
      color: 'from-cyan-500 to-cyan-700',
      pros: ['Jackpot millonario', 'Mesas muy activas', 'Pagos 24h'],
      tipoJugador: 'Cazadores de Jackpot'
    },
    { 
      sala: 'SUPREMA', 
      principiante: 3, 
      rakeback: '40-60%', 
      deposito: 'S/50',
      bonus: 'Especialista Omaha',
      destacado: 'PARAÍSO DEL OMAHA',
      whatsapp: 'Quiero jugar Omaha en SUPREMA POKER',
      color: 'from-orange-700 to-orange-900',
      pros: ['Mejor Omaha', 'Retiros instantáneos', 'Torneos cada hora'],
      tipoJugador: 'Especialistas Omaha'
    },
    { 
      sala: 'CLUBGG', 
      principiante: 4, 
      rakeback: '35%', 
      deposito: 'S/30',
      bonus: 'Rakeback fijo',
      destacado: 'IDEAL PRINCIPIANTES',
      whatsapp: 'Quiero unirme a CLUBGG con 35% rakeback',
      color: 'from-gray-600 to-gray-800',
      pros: ['Sistema anti-bots', 'Muy estable', 'Fácil de usar'],
      tipoJugador: 'Principiantes'
    },
    { 
      sala: 'GG POKER', 
      principiante: 2, 
      rakeback: '20-60%', 
      deposito: '$10',
      bonus: 'Fish Buffet + HUD',
      destacado: 'RED MÁS GRANDE DEL MUNDO',
      whatsapp: 'Quiero registrarme en GG POKER con Fish Buffet',
      color: 'from-red-600 to-gray-900',
      pros: ['Mayor tráfico mundial', 'Software innovador', 'HUD gratis'],
      tipoJugador: 'Profesionales'
    }
  ]

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        className={`text-sm ${i < count ? 'text-yellow-400' : 'text-gray-600'}`} 
      />
    ))
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16" id="comparacion">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-yellow-500">
            ¿CUÁL SALA ES PARA TI?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comparamos las mejores salas de poker para que elijas la perfecta según tu nivel
          </p>
        </motion.div>

        {/* Tabla Desktop */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl shadow-2xl"
          >
            <table className="w-full bg-black">
              <thead className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">SALA DE POKER</th>
                  <th className="px-6 py-4 text-center font-bold">TIPO DE JUGADOR</th>
                  <th className="px-6 py-4 text-center font-bold">PRINCIPIANTES</th>
                  <th className="px-6 py-4 text-center font-bold">RAKEBACK/BONOS</th>
                  <th className="px-6 py-4 text-center font-bold">DEPÓSITO MÍN</th>
                  <th className="px-6 py-4 text-center font-bold">ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <motion.tr 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`border-t border-gray-800 hover:bg-gray-900 transition ${
                      row.featured ? 'bg-gradient-to-r from-blue-900/20 to-red-900/20 border-yellow-500/30' : ''
                    }`}
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${row.color} mr-3`}></div>
                        <div>
                          <div className="font-bold text-white text-lg flex items-center">
                            {row.sala}
                            {row.featured && <FaFire className="ml-2 text-yellow-500" />}
                          </div>
                          <div className="text-gray-400 text-sm">{row.destacado}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        row.featured 
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {row.tipoJugador}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex justify-center">
                        {renderStars(row.principiante)}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="font-bold text-green-400 text-lg">{row.rakeback}</div>
                      <div className="text-gray-400 text-sm">{row.bonus}</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-yellow-500 font-bold text-lg">{row.deposito}</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <a
                        href={`https://wa.me/51955311839?text=${encodeURIComponent(row.whatsapp)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                          row.featured 
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-600 hover:to-orange-600' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        <FaWhatsapp className="mr-2" />
                        {row.featured ? 'JUGAR' : 'Info'}
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        {/* Cards Mobile */}
        <div className="md:hidden space-y-4">
          {data.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-black rounded-2xl p-4 shadow-xl ${
                row.featured ? 'ring-2 ring-yellow-500 bg-gradient-to-br from-blue-900/20 to-red-900/20' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${row.color} mr-3`}></div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                    {row.sala}
                    {row.featured && <FaFire className="ml-2 text-yellow-500" />}
                  </h3>
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  row.featured 
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {row.tipoJugador}
                </span>
              </div>

              {/* Destacado */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-3 rounded-lg mb-4">
                <p className="text-yellow-400 font-semibold text-sm text-center">
                  {row.destacado}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Principiantes</p>
                  <div className="flex justify-center">
                    {renderStars(row.principiante)}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Depósito Min</p>
                  <p className="text-yellow-500 font-bold">{row.deposito}</p>
                </div>
              </div>

              {/* Rakeback/Bonus */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 text-center">
                <p className="text-green-400 font-bold">{row.rakeback}</p>
                <p className="text-gray-400 text-sm">{row.bonus}</p>
              </div>

              {/* Pros */}
              <div className="mb-4">
                <ul className="space-y-1">
                  {row.pros.slice(0, 2).map((pro, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center">
                      <FaStar className="text-yellow-500 text-xs mr-2" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/51955311839?text=${encodeURIComponent(row.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  row.featured 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-600 hover:to-orange-600' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <FaWhatsapp className="mr-2 text-lg" />
                {row.featured ? 'JUGAR EN WPT AHORA' : 'MÁS INFORMACIÓN'}
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gray-800/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿No sabes cuál elegir?
            </h3>
            <p className="text-gray-400 mb-6">
              Nuestros expertos te ayudan a encontrar la sala perfecta según tu nivel y objetivos
            </p>
            <a 
              href={`https://wa.me/51955311839?text=${encodeURIComponent('No estoy seguro qué sala elegir, necesito asesoría personalizada')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <FaWhatsapp className="mr-2 text-xl" />
              ASESORÍA GRATUITA
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ComparisonTable