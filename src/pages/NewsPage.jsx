// src/pages/NewsPage.jsx - ACTUALIZADA CON CORRECCIONES PARA TEXTO DESBORDADO
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendar, FaUser, FaEye, FaShare, FaWhatsapp, FaTelegram, FaTwitter, FaFacebook, FaSearch, FaFire, FaTrophy, FaNewspaper, FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:5000/api'

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [searchTerm, setSearchTerm] = useState('')
  const [newsArticles, setNewsArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const navigate = useNavigate()
  
  const categories = [
    { id: 'todas', name: 'Todas', icon: FaNewspaper },
    { id: 'torneos', name: 'Torneos', icon: FaTrophy },
    { id: 'estrategia', name: 'Estrategia', icon: FaFire },
    { id: 'promociones', name: 'Promociones', icon: FaFire },
    { id: 'resultados', name: 'Resultados', icon: FaTrophy }
  ]
  
  // Cargar noticias del backend
  const fetchNews = async () => {
    setLoading(true)
    try {
      let url = `${API_URL}/news?limit=50`
      
      if (selectedCategory !== 'todas') {
        url += `&category=${selectedCategory}`
      }
      
      const response = await fetch(url)
      const data = await response.json()
      
      // Filtrar por término de búsqueda si existe
      let filteredData = data
      if (searchTerm) {
        filteredData = data.filter(article => 
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      setNewsArticles(filteredData)
    } catch (error) {
      console.error('Error fetching news:', error)
      setNewsArticles([])
    } finally {
      setLoading(false)
    }
  }
  
  // Cargar noticias cuando cambie la categoría o búsqueda
  useEffect(() => {
    fetchNews()
  }, [selectedCategory])
  
  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNews()
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchTerm])
  
  // Cargar artículo individual
  const loadArticle = async (slug) => {
    try {
      const response = await fetch(`${API_URL}/news/${slug}`)
      const data = await response.json()
      setSelectedArticle(data)
      setShowArticleModal(true)
    } catch (error) {
      console.error('Error loading article:', error)
    }
  }
  
  // Compartir en redes sociales
  const shareArticle = (article, platform) => {
    const url = `${window.location.origin}/noticias/${article.slug}`
    const text = article.title
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
    
    window.open(shareUrls[platform], '_blank')
  }

  // Función para truncar texto largo
  const truncateText = (text, maxLength = 100) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
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
      
      {/* Loading State */}
      {loading && (
        <div className="container mx-auto px-4 py-20 text-center">
          <FaSpinner className="text-4xl text-poker-gold animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando noticias...</p>
        </div>
      )}
      
      {/* Grid de Noticias */}
      {!loading && (
        <div className="container mx-auto px-4 pb-20">
          {newsArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No se encontraron noticias</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna Principal - Artículos Destacados */}
              <div className="lg:col-span-2 space-y-8">
                {newsArticles.filter(a => a.featured === 1).map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
                    onClick={() => navigate(`/noticias/${article.slug}`)}
                  >
                    {/* Imagen */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-700">
                      {article.image ? (
                        <img 
                          src={`http://localhost:5000${article.image}`}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x400/1f2937/ffd700?text=POKER+NEWS'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl text-gray-600">
                            {article.category === 'torneos' ? '🏆' : '🃏'}
                          </span>
                        </div>
                      )}
                      {article.featured === 1 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          <FaFire className="inline mr-1" />
                          DESTACADO
                        </div>
                      )}
                      {article.tags && (
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {article.tags.split(',').slice(0, 3).map(tag => (
                            <span key={tag} className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-xs break-words max-w-20">
                              {truncateText(tag.trim(), 15)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Contenido */}
                    <div className="p-6">
                      {/* TÍTULO CON CONTROL DE OVERFLOW */}
                      <h2 className="text-2xl font-bold text-white mb-3 hover:text-poker-gold transition-colors break-words hyphens-auto overflow-hidden" style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {article.title}
                      </h2>
                      
                      {/* EXTRACTO CON CONTROL DE OVERFLOW */}
                      <p className="text-gray-400 mb-4 break-words overflow-hidden" style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {truncateText(article.excerpt, 150)}
                      </p>
                      
                      {/* Meta información */}
                      <div className="flex items-center justify-between text-sm text-gray-500 flex-wrap gap-2">
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="flex items-center gap-1 break-all">
                            <FaCalendar />
                            <span className="truncate max-w-24">
                              {new Date(article.created_at).toLocaleDateString()}
                            </span>
                          </span>
                          <span className="flex items-center gap-1">
                            <FaUser />
                            <span className="truncate max-w-16">
                              {truncateText(article.author, 10)}
                            </span>
                          </span>
                          <span className="flex items-center gap-1">
                            <FaEye />
                            {article.views.toLocaleString()}
                          </span>
                        </div>
                        
                        {/* Compartir */}
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              shareArticle(article, 'whatsapp')
                            }}
                            className="hover:text-poker-gold transition"
                          >
                            <FaWhatsapp />
                          </button>
                        </div>
                      </div>
                      
                      <button 
                        className="mt-4 text-poker-gold font-semibold hover:underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          loadArticle(article.slug)
                        }}
                      >
                        Leer más →
                      </button>
                    </div>
                  </motion.article>
                ))}
                
                {/* Artículos no destacados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newsArticles.filter(a => a.featured !== 1).map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-900 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
                      onClick={() => navigate(`/noticias/${article.slug}`)}
                    >
                      <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-700">
                        {article.image ? (
                          <img 
                            src={`http://localhost:5000${article.image}`}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x200/1f2937/ffd700?text=NEWS'
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl text-gray-600">🃏</span>
                          </div>
                        )}
                        <span className="absolute top-2 right-2 bg-gray-900/80 text-white px-2 py-1 rounded text-xs truncate max-w-20">
                          {truncateText(article.category, 10)}
                        </span>
                      </div>
                      <div className="p-4">
                        {/* TÍTULO CON CONTROL ESTRICTO */}
                        <h3 className="text-lg font-bold text-white mb-2 break-words hyphens-auto" style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {article.title}
                        </h3>
                        
                        {/* EXTRACTO CON CONTROL */}
                        <p className="text-sm text-gray-400 mb-3 break-words" style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {truncateText(article.excerpt, 80)}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="truncate">
                            {new Date(article.created_at).toLocaleDateString()}
                          </span>
                          <span>{article.views} vistas</span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                {/* Imagen del Bono 200% */}
                <div className="rounded-2xl overflow-hidden">
                  <a 
                    href="https://wa.me/51955311839?text=Quiero%20el%20bono%20especial%20del%20200%"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <img
                      src="/logos/bono200.png"
                      alt="Bono 200% extra hasta S/1000"
                      className="w-full h-auto rounded-2xl"
                      onError={(e) => {
                        // Si la imagen .png no existe, prueba con .jpg
                        e.target.src = "/logos/bono200.jpg";
                        e.target.onerror = () => {
                          // Si tampoco existe .jpg, prueba con .jpeg
                          e.target.src = "/logos/bono200.jpeg";
                          e.target.onerror = () => {
                            // Si no existe ninguna, oculta la imagen
                            e.target.style.display = 'none';
                          };
                        };
                      }}
                    />
                  </a>
                </div>
                
                {/* Artículos Más Vistos */}
                <div className="bg-gray-900 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaFire className="text-poker-gold" />
                    Más Populares
                  </h3>
                  <div className="space-y-4">
                    {newsArticles
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((article, index) => (
                        <div 
                          key={article.id} 
                          className="border-b border-gray-800 pb-4 last:border-0 cursor-pointer"
                          onClick={() => navigate(`/noticias/${article.slug}`)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl font-bold text-poker-gold flex-shrink-0">
                              {index + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold mb-1 hover:text-poker-gold transition break-words" style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}>
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span>{article.views} vistas</span>
                                <span className="truncate">{truncateText(article.category, 10)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Redes Sociales */}
                <div className="bg-gray-900 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Síguenos
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="https://wa.me/51955311839?text=Hola,%20quiero%20más%20información" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-whatsapp text-white p-3 rounded-lg text-center transition"
                    >
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
          )}
        </div>
      )}
      
      {/* Modal de Artículo */}
      <AnimatePresence>
        {showArticleModal && selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur z-50 overflow-y-auto"
            onClick={() => setShowArticleModal(false)}
          >
            <div className="min-h-screen py-10 px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedArticle.image && (
                  <img 
                    src={`http://localhost:5000${selectedArticle.image}`}
                    alt={selectedArticle.title}
                    className="w-full h-96 object-cover"
                  />
                )}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <span className="bg-poker-gold text-black px-3 py-1 rounded-full text-sm font-bold">
                      {selectedArticle.category}
                    </span>
                    {selectedArticle.featured === 1 && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        DESTACADO
                      </span>
                    )}
                  </div>
                  
                  {/* TÍTULO DEL MODAL CON CONTROL */}
                  <h1 className="text-4xl font-bold text-white mb-4 break-words hyphens-auto" style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    lineHeight: '1.2'
                  }}>
                    {selectedArticle.title}
                  </h1>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6 flex-wrap">
                    <span className="flex items-center gap-1">
                      <FaCalendar />
                      {new Date(selectedArticle.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUser />
                      <span className="break-words">{selectedArticle.author}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye />
                      {selectedArticle.views} vistas
                    </span>
                  </div>
                  
                  {/* CONTENIDO DEL MODAL CON CONTROL DE OVERFLOW */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-gray-300 mb-6 break-words" style={{
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      {selectedArticle.excerpt}
                    </p>
                    {selectedArticle.content_html ? (
                      <div 
                        className="text-gray-300 break-words overflow-hidden prose-img:max-w-full prose-img:h-auto"
                        style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                        dangerouslySetInnerHTML={{ __html: selectedArticle.content_html }}
                      />
                    ) : (
                      <div className="text-gray-300 whitespace-pre-wrap break-words" style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                      }}>
                        {selectedArticle.content}
                      </div>
                    )}
                  </div>
                  
                  {selectedArticle.tags && (
                    <div className="mt-8 pt-8 border-t border-gray-800">
                      <p className="text-sm text-gray-400 mb-3">Etiquetas:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.tags.split(',').map(tag => (
                          <span key={tag} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm break-words">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-3">Compartir:</p>
                    <div className="flex gap-3 flex-wrap">
                      <button 
                        onClick={() => shareArticle(selectedArticle, 'whatsapp')}
                        className="bg-whatsapp text-white px-4 py-2 rounded-lg hover:opacity-80 transition flex items-center gap-2"
                      >
                        <FaWhatsapp />
                        WhatsApp
                      </button>
                      <button 
                        onClick={() => shareArticle(selectedArticle, 'telegram')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition flex items-center gap-2"
                      >
                        <FaTelegram />
                        Telegram
                      </button>
                      <button 
                        onClick={() => shareArticle(selectedArticle, 'twitter')}
                        className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:opacity-80 transition flex items-center gap-2"
                      >
                        <FaTwitter />
                        Twitter
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NewsPage