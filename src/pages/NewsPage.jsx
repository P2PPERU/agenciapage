import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCalendar, FaUser, FaEye, FaShare, FaWhatsapp, FaTelegram, FaTwitter, FaFacebook, FaSearch, FaFire, FaTrophy, FaNewspaper } from 'react-icons/fa'

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Datos de ejemplo para las noticias
  const newsArticles = [
    {
      id: 1,
      title: "Nuevo Torneo Millonario en SUPREMA POKER",
      excerpt: "SUPREMA anuncia su torneo más grande del año con $100,000 garantizados. Los clasificatorios empiezan esta semana.",
      content: "Lorem ipsum dolor sit amet...",
      category: "torneos",
      image: "https://via.placeholder.com/800x400/4F46E5/ffffff?text=TORNEO+SUPREMA",
      author: "Admin",
      date: "2024-01-15",
      views: 1543,
      featured: true,
      tags: ["SUPREMA", "Torneos", "GTD"]
    },
    {
      id: 2,
      title: "Estrategia: Cómo Maximizar tu Rakeback",
      excerpt: "Descubre los mejores tips para aumentar tus ganancias mensuales con el rakeback. Guía completa para principiantes y avanzados.",
      content: "Lorem ipsum dolor sit amet...",
      category: "estrategia",
      image: "https://via.placeholder.com/800x400/10B981/ffffff?text=ESTRATEGIA+RAKEBACK",
      author: "Carlos Pro",
      date: "2024-01-14",
      views: 892,
      featured: false,
      tags: ["Rakeback", "Tips", "Estrategia"]
    },
    {
      id: 3,
      title: "X-POKER Lanza Nueva Promoción VIP",
      excerpt: "Beneficios exclusivos para jugadores VIP: 50% rakeback, bonos semanales y acceso a mesas privadas.",
      content: "Lorem ipsum dolor sit amet...",
      category: "promociones",
      image: "https://via.placeholder.com/800x400/F59E0B/ffffff?text=PROMO+VIP",
      author: "Admin",
      date: "2024-01-13",
      views: 2104,
      featured: true,
      tags: ["X-POKER", "VIP", "Promociones"]
    },
    {
      id: 4,
      title: "Resultados: Campeón del Sunday Million",
      excerpt: "Juan 'ElTitan' González se lleva el primer lugar y $25,000 en premios. Revive las mejores manos.",
      content: "Lorem ipsum dolor sit amet...",
      category: "resultados",
      image: "https://via.placeholder.com/800x400/EF4444/ffffff?text=CAMPEON",
      author: "Redacción",
      date: "2024-01-12",
      views: 3421,
      featured: false,
      tags: ["Resultados", "Torneos", "Ganadores"]
    }
  ]
  
  const categories = [
    { id: 'todas', name: 'Todas', icon: FaNewspaper },
    { id: 'torneos', name: 'Torneos', icon: FaTrophy },
    { id: 'estrategia', name: 'Estrategia', icon: FaFire },
    { id: 'promociones', name: 'Promociones', icon: FaFire },
    { id: 'resultados', name: 'Resultados', icon: FaTrophy }
  ]
  
  // Filtrar artículos
  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'todas' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  return (
    <div className="min-h-screen bg-poker-black">
      {/* Header de Noticias */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              NOTICIAS & <span className="text-poker-gold">ESTRATEGIAS</span>
            </h1>
            <p className="text-gray-400 text-xl">
              Las últimas novedades del mundo del poker online
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Barra de búsqueda y filtros */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Búsqueda */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-poker-gold"
              />
            </div>
          </div>
          
          {/* Categorías */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-poker-gold text-black'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                <cat.icon />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Grid de Noticias */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal - Artículos Destacados */}
          <div className="lg:col-span-2 space-y-8">
            {filteredArticles.filter(a => a.featured).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
              >
                {/* Imagen */}
                <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-700">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  {article.featured && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <FaFire className="inline mr-1" />
                      DESTACADO
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Contenido */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-3 hover:text-poker-gold transition-colors cursor-pointer">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  {/* Meta información */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaCalendar />
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUser />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    
                    {/* Compartir */}
                    <div className="flex items-center gap-2">
                      <button className="hover:text-poker-gold transition">
                        <FaShare />
                      </button>
                    </div>
                  </div>
                  
                  <button className="mt-4 text-poker-gold font-semibold hover:underline">
                    Leer más →
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Widget de Publicidad */}
            <div className="bg-gradient-to-r from-poker-gold to-yellow-500 rounded-2xl p-6 text-center">
              <h3 className="text-2xl font-bold text-black mb-2">
                🎁 BONO ESPECIAL
              </h3>
              <p className="text-black/80 mb-4">
                Deposita hoy y recibe 100% extra hasta $500
              </p>
              <a 
                href="https://wa.me/51955311839?text=Quiero%20el%20bono%20especial"
                className="inline-block bg-black text-white font-bold px-6 py-3 rounded-full hover:bg-gray-900 transition"
              >
                OBTENER BONO
              </a>
            </div>
            
            {/* Artículos Recientes */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaNewspaper className="text-poker-gold" />
                Más Recientes
              </h3>
              <div className="space-y-4">
                {filteredArticles.filter(a => !a.featured).slice(0, 3).map(article => (
                  <div key={article.id} className="border-b border-gray-800 pb-4 last:border-0">
                    <h4 className="text-white font-semibold mb-1 hover:text-poker-gold transition cursor-pointer">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                      <span>{article.views} vistas</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                📧 Newsletter
              </h3>
              <p className="text-gray-400 mb-4">
                Recibe las mejores estrategias y promociones directo en tu email
              </p>
              <input
                type="email"
                placeholder="Tu email..."
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-poker-gold"
              />
              <button className="w-full bg-poker-gold text-black font-bold py-2 rounded-lg hover:bg-yellow-500 transition">
                SUSCRIBIRME
              </button>
            </div>
            
            {/* Redes Sociales */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Síguenos
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="bg-gray-800 hover:bg-whatsapp text-white p-3 rounded-lg text-center transition">
                  <FaWhatsapp className="mx-auto mb-1" />
                  <span className="text-xs">WhatsApp</span>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-500 text-white p-3 rounded-lg text-center transition">
                  <FaTelegram className="mx-auto mb-1" />
                  <span className="text-xs">Telegram</span>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-400 text-white p-3 rounded-lg text-center transition">
                  <FaTwitter className="mx-auto mb-1" />
                  <span className="text-xs">Twitter</span>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 text-white p-3 rounded-lg text-center transition">
                  <FaFacebook className="mx-auto mb-1" />
                  <span className="text-xs">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsPage