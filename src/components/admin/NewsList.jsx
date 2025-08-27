// src/components/admin/NewsList.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEdit, FaTrash, FaEye, FaFire, 
  FaSearch, FaFilter, FaTags 
} from 'react-icons/fa';

const NewsList = ({ news, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  // Filtrar y ordenar noticias
  const filteredNews = news
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'views':
          return b.views - a.views;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });
  
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      {/* Header con búsqueda y filtros */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Gestión de Noticias</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar noticias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          {/* Filtro por categoría */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            <option value="all">Todas las categorías</option>
            <option value="torneos">Torneos</option>
            <option value="estrategia">Estrategia</option>
            <option value="promociones">Promociones</option>
            <option value="resultados">Resultados</option>
          </select>
          
          {/* Ordenar por */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            <option value="recent">Más recientes</option>
            <option value="views">Más vistas</option>
            <option value="title">Alfabético</option>
          </select>
          
          {/* Contador */}
          <div className="flex items-center justify-center px-4 py-2 bg-gray-900 rounded-lg">
            <span className="text-gray-400">
              {filteredNews.length} noticias
            </span>
          </div>
        </div>
      </div>
      
      {/* Lista de noticias */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition"
            >
              <div className="flex gap-4">
                {/* Imagen */}
                {item.image && (
                  <img 
                    src={`http://localhost:5000${item.image}`} 
                    alt={item.title} 
                    className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                
                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                        {item.featured === 1 && (
                          <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                            <FaFire className="inline mr-1" />
                            Destacada
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                    
                    {/* Acciones */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(item)}
                        className="text-blue-400 hover:text-blue-300 p-2"
                        title="Ver"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => onEdit(item)}
                        className="text-yellow-400 hover:text-yellow-300 p-2"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          if(confirm('¿Eliminar esta noticia?')) {
                            onDelete(item.id);
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-2"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  {/* Metadatos */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="bg-gray-800 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <span>{item.views || 0} vistas</span>
                    <span>{item.read_time || 5} min lectura</span>
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 rounded ${
                      item.status === 'published' 
                        ? 'bg-green-900 text-green-400' 
                        : 'bg-yellow-900 text-yellow-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  
                  {/* Tags */}
                  {item.tags && (
                    <div className="flex items-center gap-2 mt-2">
                      <FaTags className="text-gray-600 text-xs" />
                      <div className="flex flex-wrap gap-1">
                        {item.tags.split(',').slice(0, 5).map((tag, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No se encontraron noticias</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;