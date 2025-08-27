// src/pages/NewsDetailPage.jsx - PÁGINA INDIVIDUAL DE NOTICIA
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaCalendar, FaUser, FaEye, FaShare, FaWhatsapp, 
  FaTelegram, FaTwitter, FaFacebook, FaArrowLeft,
  FaClock, FaTag, FaNewspaper
} from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const NewsDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar artículo
  useEffect(() => {
    fetchArticle()
    fetchRelatedNews()
  }, [slug])

  const fetchArticle = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/news/${slug}`)
      if (!response.ok) {
        throw new Error('Artículo no encontrado')
      }
      const data = await response.json()
      setArticle(data)
      document.title = `${data.title} - Poker Pro Track`
    } catch (error) {
      console.error('Error loading article:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedNews = async () => {
    try {
      const response = await fetch(`${API_URL}/news?limit=4`)
      const data = await response.json()
      // Filtrar la noticia actual
      const filtered = data.filter(news => news.slug !== slug).slice(0, 3)
      setRelatedNews(filtered)
    } catch (error) {
      console.error('Error loading related news:', error)
    }
  }

  // Compartir en redes sociales
  const shareArticle = (platform) => {
    if (!article) return
    
    const url = window.location.href
    const text = article.title
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
    
    window.open(shareUrls[platform], '_blank')
  }

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  // Estimar tiempo de lectura
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const words = content.split(' ').length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-poker-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-poker-gold border-t-transparent rounded-full"
        />
      </div>
    )
  }

  // Error State
  if (error || !article) {
    return (
      <div className="min-h-screen bg-poker-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Artículo no encontrado</h1>
          <p className="text-gray-400 mb-8">{error || 'El artículo que buscas no existe'}</p>
          <Link 
            to="/noticias" 
            className="bg-poker-gold text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-500 transition"
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-poker-black">
      {/* Hero con imagen */}
      <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-b from-gray-900 to-poker-black overflow-hidden">
        {article.image ? (
          <img 
            src={`http://localhost:5000${article.image}`}
            alt={article.title}
            className="w-full h-full object-cover opacity-50"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1920x600/1f2937/ffd700?text=POKER+NEWS'
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <FaNewspaper className="text-8xl text-gray-700" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-poker-black via-poker-black/50 to-transparent" />
        
        {/* Contenido del hero */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-8">
            {/* Breadcrumb */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-gray-400 mb-4"
            >
              <Link to="/" className="hover:text-poker-gold transition">Inicio</Link>
              <span>/</span>
              <Link to="/noticias" className="hover:text-poker-gold transition">Noticias</Link>
              <span>/</span>
              <span className="text-poker-gold">{article.category}</span>
            </motion.div>
            
            {/* Título */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {article.title}
            </motion.h1>
            
            {/* Meta info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-sm text-gray-400"
            >
              <span className="flex items-center gap-2">
                <FaUser />
                {article.author || 'Admin'}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendar />
                {formatDate(article.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <FaClock />
                {calculateReadTime(article.content)} min de lectura
              </span>
              <span className="flex items-center gap-2">
                <FaEye />
                {article.views} vistas
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Columna principal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            {/* Botón volver */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-poker-gold transition mb-6"
            >
              <FaArrowLeft />
              Volver
            </button>
            
            {/* Featured badge */}
            {article.featured === 1 && (
              <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                🔥 ARTÍCULO DESTACADO
              </div>
            )}
            
            {/* Extracto */}
            <div className="text-xl text-gray-300 mb-8 leading-relaxed border-l-4 border-poker-gold pl-6">
              {article.excerpt}
            </div>
            
            {/* Contenido */}
            <div className="prose prose-invert max-w-none">
                {article.content_html ? (
                    <div 
                     className="text-gray-300 text-lg leading-relaxed"
                     dangerouslySetInnerHTML={{ __html: article.content_html }}
                    />
                ) : (
                   <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                     {article.content}
                    </div>
                )}
            </div>

                       
            
            {/* Tags */}
            {article.tags && (
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaTag className="text-poker-gold" />
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.split(',').map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition cursor-pointer"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Compartir */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Compartir artículo</h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => shareArticle('whatsapp')}
                  className="bg-whatsapp text-white px-4 py-2 rounded-lg hover:opacity-80 transition flex items-center gap-2"
                >
                  <FaWhatsapp />
                  WhatsApp
                </button>
                <button 
                  onClick={() => shareArticle('telegram')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition flex items-center gap-2"
                >
                  <FaTelegram />
                  Telegram
                </button>
                <button 
                  onClick={() => shareArticle('twitter')}
                  className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:opacity-80 transition flex items-center gap-2"
                >
                  <FaTwitter />
                  Twitter
                </button>
                <button 
                  onClick={() => shareArticle('facebook')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-80 transition flex items-center gap-2"
                >
                  <FaFacebook />
                  Facebook
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Widget CTA */}
            <div className="bg-gradient-to-r from-poker-gold to-yellow-500 rounded-2xl p-6 text-center">
              <h3 className="text-2xl font-bold text-black mb-2">
                🎁 BONO ESPECIAL
              </h3>
              <p className="text-black/80 mb-4">
                Duplica tu depósito con 200% de bonificación
              </p>
              <a 
                href={`https://wa.me/51955311839?text=Vengo del artículo: ${article.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white font-bold px-6 py-3 rounded-full hover:bg-gray-900 transition"
              >
                ACTIVAR BONO
              </a>
            </div>
            
            {/* Artículos relacionados */}
            {relatedNews.length > 0 && (
              <div className="bg-gray-900 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Artículos Relacionados
                </h3>
                <div className="space-y-4">
                  {relatedNews.map(news => (
                    <Link 
                      key={news.id}
                      to={`/noticias/${news.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        {news.image ? (
                          <img 
                            src={`http://localhost:5000${news.image}`}
                            alt={news.title}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaNewspaper className="text-gray-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm group-hover:text-poker-gold transition line-clamp-2">
                            {news.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(news.created_at)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Newsletter */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                📧 Newsletter
              </h3>
              <p className="text-gray-400 mb-4">
                Recibe las mejores estrategias y noticias del poker
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
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetailPage