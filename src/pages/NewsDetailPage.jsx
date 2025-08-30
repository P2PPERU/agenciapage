// src/pages/NewsDetailPage.jsx - LAYOUT REALMENTE MÁS ANCHO SIN AUMENTAR FUENTES
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendar, FaUser, FaEye, FaClock, FaArrowLeft, 
  FaShareAlt, FaTags, FaFacebook, FaTwitter, FaWhatsapp,
  FaHeart, FaBookmark
} from 'react-icons/fa';
import NewsContentRenderer from '../components/news/NewsContentRenderer';

const API_URL = 'http://localhost:5000/api';

const NewsDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/news/${slug}`);
        
        if (!response.ok) {
          throw new Error('Noticia no encontrada');
        }
        
        const data = await response.json();
        setNews(data);
        
        // Cargar noticias relacionadas
        loadRelatedNews(data.category, data.id);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNews();
    }
  }, [slug]);

  const loadRelatedNews = async (category, currentId) => {
    try {
      const response = await fetch(`${API_URL}/news?category=${category}&limit=4`);
      const data = await response.json();
      // Filtrar la noticia actual
      const filtered = data.filter(item => item.id !== currentId).slice(0, 3);
      setRelatedNews(filtered);
    } catch (error) {
      console.error('Error loading related news:', error);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = news?.title || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'torneos': '🏆',
      'estrategia': '🎯',
      'promociones': '🎁',
      'resultados': '📊',
      'entrevistas': '🎤',
      'analisis': '📈'
    };
    return icons[category] || '📰';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-poker-black text-white">
        <div className="w-full px-4 py-12">
          <div className="max-w-screen-2xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
              <div className="h-64 bg-gray-700 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-poker-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-xl text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => navigate('/noticias')}
            className="bg-poker-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
          >
            Volver a Noticias
          </button>
        </div>
      </div>
    );
  }

  if (!news) return null;

  return (
    <div className="min-h-screen bg-poker-black text-white">
      {/* USAR ANCHO COMPLETO DE PANTALLA */}
      <div className="w-full px-4 py-8">
        {/* CONTENEDOR MÁXIMO DISPONIBLE */}
        <div className="max-w-screen-2xl mx-auto"> {/* Usar el ancho máximo disponible */}
          
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-poker-gold hover:text-yellow-500 transition"
            >
              <FaArrowLeft />
              Volver
            </button>
            <span className="text-gray-500">/</span>
            <Link to="/noticias" className="text-gray-400 hover:text-poker-gold transition">
              Noticias
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">{news.category}</span>
          </motion.div>

          {/* LAYOUT HORIZONTAL PARA PANTALLAS GRANDES */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* CONTENIDO PRINCIPAL OCUPA 4/5 DEL ESPACIO */}
            <div className="lg:col-span-4">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden"
              >
                
                {/* Header compacto */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center gap-2 bg-poker-gold text-black px-3 py-1 rounded-full text-sm font-bold">
                      {getCategoryIcon(news.category)}
                      {news.category.toUpperCase()}
                    </span>
                    {news.featured && (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        🔥 DESTACADO
                      </span>
                    )}
                  </div>
                  
                  {/* Título SIN AUMENTAR tamaño de fuente */}
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {news.title}
                  </h1>

                  {/* Metadatos en línea horizontal */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-poker-gold" />
                      <span>{news.author || 'Admin'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-poker-gold" />
                      <span>{formatDate(news.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEye className="text-poker-gold" />
                      <span>{news.views || 0} vistas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-poker-gold" />
                      <span>{news.read_time || 5} min lectura</span>
                    </div>
                  </div>

                  {/* Excerpt normal */}
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    {news.excerpt}
                  </p>

                  {/* Botones de acción compactos */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                        isLiked 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      <FaHeart />
                      Me gusta
                    </button>
                    
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                        isBookmarked 
                          ? 'bg-poker-gold text-black' 
                          : 'bg-gray-700 text-gray-300 hover:bg-poker-gold hover:text-black'
                      }`}
                    >
                      <FaBookmark />
                      Guardar
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">Compartir:</span>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        <FaFacebook size={14} />
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
                      >
                        <FaTwitter size={14} />
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        <FaWhatsapp size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* CONTENIDO PRINCIPAL - USO COMPLETO DEL ANCHO */}
                <div className="p-6">
                  {/* Imagen principal si existe */}
                  {news.image && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <img
                        src={`http://localhost:5000${news.image}`}
                        alt={news.title}
                        className="w-full h-auto max-h-96 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* El contenido usa TODO el ancho disponible */}
                  <div className="w-full max-w-none prose-wide">
                    <NewsContentRenderer 
                      content={news.content_html || news.content} 
                      title={news.title}
                    />
                  </div>

                  {/* Tags al final */}
                  {news.tags && (
                    <div className="mt-8 pt-6 border-t border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        <FaTags className="text-poker-gold" />
                        <span className="text-gray-400 text-sm">Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {news.tags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-poker-gold hover:text-black transition cursor-pointer"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            </div>

            {/* SIDEBAR COMPACTO - 1/5 DEL ESPACIO */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                
                {/* Imagen del Bono 200% */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-lg overflow-hidden"
                >
                  <a 
                    href="https://wa.me/51955311839?text=Quiero%20el%20bono%20especial%20del%20200%"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <img
                      src="/logos/bono200.png"
                      alt="Bono 200% extra hasta S/1000"
                      className="w-full h-auto rounded-lg"
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
                </motion.div>

                {/* Imagen Free 10K */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-lg overflow-hidden"
                >
                  <a 
                    href="https://wa.me/51955311839?text=Quiero%20información%20sobre%20el%20free%2010K"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <img
                      src="/logos/free10k.png"
                      alt="Free 10K - Promoción especial"
                      className="w-full h-auto rounded-lg"
                      onError={(e) => {
                        // Si la imagen .png no existe, prueba con .jpg
                        e.target.src = "/logos/free10k.jpg";
                        e.target.onerror = () => {
                          // Si tampoco existe .jpg, prueba con .jpeg
                          e.target.src = "/logos/free10k.jpeg";
                          e.target.onerror = () => {
                            // Si no existe ninguna, oculta la imagen
                            e.target.style.display = 'none';
                          };
                        };
                      }}
                    />
                  </a>
                </motion.div>

                {/* Redes sociales minimalistas */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gray-900 rounded-lg p-4"
                >
                  <h3 className="text-base font-bold text-white mb-3">
                    Síguenos
                  </h3>
                  <div className="flex gap-2">
                    <a 
                      href="https://wa.me/51955311839?text=Hola,%20quiero%20más%20información" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white p-2 rounded text-center hover:bg-green-700 transition"
                    >
                      <FaWhatsapp />
                    </a>
                    <a href="#" className="flex-1 bg-blue-400 text-white p-2 rounded text-center hover:bg-blue-500 transition">
                      <FaTwitter />
                    </a>
                    <a href="#" className="flex-1 bg-blue-600 text-white p-2 rounded text-center hover:bg-blue-700 transition">
                      <FaFacebook />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* NOTICIAS RELACIONADAS - ANCHO COMPLETO */}
          {relatedNews.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Noticias Relacionadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      to={`/noticias/${item.slug}`}
                      className="block bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition group h-full"
                    >
                      {item.image && (
                        <div className="h-40 overflow-hidden">
                          <img
                            src={`http://localhost:5000${item.image}`}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-poker-gold text-black px-2 py-1 rounded">
                            {getCategoryIcon(item.category)}
                          </span>
                        </div>
                        <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-poker-gold transition text-sm">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-xs line-clamp-2 mb-3">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{formatDate(item.created_at)}</span>
                          <span>{item.views || 0} vistas</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;