import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSave, FaImage, FaBold, FaItalic, FaUnderline, FaQuoteLeft,
  FaListUl, FaListOl, FaLink, FaHeading, FaParagraph, FaCode,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaYoutube, 
  FaEye, FaTimes, FaUpload, FaTrash, FaEdit,
  FaNewspaper, FaUsers, FaChartLine, FaDollarSign, FaImages
} from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api';

const AdminPanel = () => {
  // Estados principales
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  
  // Estados de datos
  const [stats, setStats] = useState({
    totalNews: 0,
    totalUsers: 0,
    totalRake: 0,
    totalBonusReleased: 0
  });
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);

  // Login Form State
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  // Estados del Editor de Noticias Moderno
  const contentRef = useRef(null);
  const [editorMode, setEditorMode] = useState('list'); // 'list' o 'editor'
  const [preview, setPreview] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    category: 'torneos',
    tags: '',
    featured: false,
    status: 'published',
    read_time: 5
  });
  
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  
  // User Form State
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    phone: '',
    initial_deposit: '',
    bonus_amount: '',
    rakeback_percentage: 60
  });

  // Rake Form State
  const [rakeForm, setRakeForm] = useState({
    user_id: '',
    rake_amount: '',
    description: ''
  });

  // Check authentication con token almacenado
  useEffect(() => {
    const storedToken = sessionStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchStats(storedToken);
    }
  }, []);

  // API Calls
  const apiCall = async (endpoint, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: options.body instanceof FormData ? { 'Authorization': `Bearer ${token}` } : headers
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const fetchStats = async (authToken) => {
    try {
      const data = await apiCall('/admin/stats', {
        headers: { 'Authorization': `Bearer ${authToken || token}` }
      });
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const data = await apiCall('/news');
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await apiCall('/admin/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Funciones del Editor Rich Text
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
      contentRef.current.focus();
    }
  };

  const insertHTML = (html) => {
    if (contentRef.current) {
      contentRef.current.focus();
      document.execCommand('insertHTML', false, html);
      setContent(contentRef.current.innerHTML);
    }
  };

  const insertQuote = () => {
    const quote = `<blockquote style="border-left: 4px solid #F59E0B; padding-left: 16px; margin: 16px 0; font-style: italic; color: #9CA3AF;">Escribe tu cita aquí...</blockquote>`;
    insertHTML(quote);
  };

  const insertYouTube = () => {
    const videoId = prompt('Ingresa el ID del video de YouTube:');
    if (videoId) {
      const embed = `
        <div style="position: relative; width: 100%; padding-bottom: 56.25%; margin: 16px 0;">
          <iframe 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      `;
      insertHTML(embed);
    }
  };

  const insertCodeBlock = () => {
    const code = `<pre style="background: #111827; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0;"><code>// Tu código aquí</code></pre>`;
    insertHTML(code);
  };

  // Insertar imagen con upload real al servidor
  const insertImageInContent = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      // Subir imagen al servidor
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await fetch(`${API_URL}/admin/upload-image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        
        const data = await response.json();
        console.log('Imagen subida:', data); // Para debug
        
        if (data.success) {
          // Usar la URL completa proporcionada por el backend o construirla correctamente
          const imageUrl = data.fullUrl || `http://localhost:5000${data.url}`;
          const imageHtml = `<img src="${imageUrl}" alt="Imagen" style="width: 100%; border-radius: 8px; margin: 16px 0;" />`;
          insertHTML(imageHtml);
          
          // Forzar actualización del contenido
          if (contentRef.current) {
            setContent(contentRef.current.innerHTML);
          }
        }
      } catch (error) {
        console.error('Error subiendo imagen:', error);
        alert('Error al subir la imagen');
      }
    };
    
    input.click();
  };

  // Manejadores de imagen principal
  const handleFeaturedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar galería de imágenes
  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    setGallery([...gallery, ...files]);
    
    // Crear previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Guardar noticia con contenido enriquecido
  const handleSaveNews = async () => {
    if (!newsForm.title || !newsForm.excerpt) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    setLoading(true);
    
    const formData = new FormData();
    
    // Agregar campos básicos
    Object.keys(newsForm).forEach(key => {
      formData.append(key, newsForm[key]);
    });
    
    // Agregar contenido HTML
    const htmlContent = contentRef.current ? contentRef.current.innerHTML : '';
    const textContent = contentRef.current ? contentRef.current.innerText : '';
    
    formData.append('content', textContent);
    formData.append('content_html', htmlContent);
    
    // Agregar imagen principal
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    
    // Agregar galería
    gallery.forEach((file, index) => {
      formData.append(`gallery`, file);
    });
    
    try {
      const endpoint = editingNews 
        ? `/admin/news-rich/${editingNews.id}` 
        : '/admin/news-rich';
      
      const method = editingNews ? 'PUT' : 'POST';
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (response.ok) {
        alert(editingNews ? 'Noticia actualizada exitosamente' : 'Noticia creada exitosamente');
        
        // Resetear formulario
        setNewsForm({
          title: '',
          excerpt: '',
          category: 'torneos',
          tags: '',
          featured: false,
          status: 'published',
          read_time: 5
        });
        setContent('');
        setFeaturedImage(null);
        setFeaturedImagePreview(null);
        setGallery([]);
        setGalleryPreviews([]);
        setEditingNews(null);
        setEditorMode('list');
        
        // Recargar noticias
        fetchNews();
      } else {
        throw new Error('Error al guardar');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la noticia');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (confirm('¿Eliminar esta noticia?')) {
      try {
        await apiCall(`/admin/news/${id}`, { method: 'DELETE' });
        fetchNews();
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  const handleEditNews = (item) => {
    setEditingNews(item);
    setNewsForm({
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      tags: item.tags || '',
      featured: item.featured || false,
      status: item.status || 'published',
      read_time: item.read_time || 5
    });
    setContent(item.content_html || item.content || '');
    if (item.image) {
      setFeaturedImagePreview(`http://localhost:5000${item.image}`);
    }
    if (item.gallery) {
      try {
        const galleryData = JSON.parse(item.gallery);
        setGalleryPreviews(galleryData.map(img => `http://localhost:5000${img}`));
      } catch (e) {
        console.error('Error parsing gallery:', e);
      }
    }
    setEditorMode('editor');
  

  setTimeout(() => {
    if (contentRef.current) {
         contentRef.current.innerHTML = item.content_html || item.content || '';
    }
    }, 100);
    };



  const handleCreateUser = async () => {
    if (!userForm.username || !userForm.email || !userForm.initial_deposit || !userForm.bonus_amount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    setLoading(true);
    try {
      await apiCall('/admin/users', {
        method: 'POST',
        body: JSON.stringify(userForm)
      });
      alert('Usuario creado');
      setUserForm({
        username: '',
        email: '',
        phone: '',
        initial_deposit: '',
        bonus_amount: '',
        rakeback_percentage: 60
      });
      fetchUsers();
    } catch (error) {
      alert('Error al crear usuario');
    }
    setLoading(false);
  };

  const handleAddRake = async () => {
    if (!rakeForm.user_id || !rakeForm.rake_amount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    setLoading(true);
    try {
      const result = await apiCall('/admin/rake', {
        method: 'POST',
        body: JSON.stringify(rakeForm)
      });
      alert(`Rake agregado. Bono liberado: S/${result.bonus_released}`);
      setRakeForm({ user_id: '', rake_amount: '', description: '' });
      fetchUsers();
    } catch (error) {
      alert('Error al agregar rake');
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert('Por favor ingresa email y contraseña');
      return;
    }
    
    setLoading(true);
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData)
      });
      
      sessionStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      fetchStats(data.token);
    } catch (error) {
      alert('Error al iniciar sesión');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setToken('');
    setIsAuthenticated(false);
  };

  // Load data when tab changes
  useEffect(() => {
    if (!isAuthenticated) return;
    
    if (activeTab === 'news') {
      fetchNews();
    } else if (activeTab === 'users' || activeTab === 'rake') {
      fetchUsers();
    } else if (activeTab === 'dashboard') {
      fetchStats();
    }
  }, [activeTab, isAuthenticated]);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Panel</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition"
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <div className="bg-gray-800 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {['dashboard', 'news', 'users', 'rake'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab === 'dashboard' && <FaChartLine />}
              {tab === 'news' && <FaNewspaper />}
              {tab === 'users' && <FaUsers />}
              {tab === 'rake' && <FaDollarSign />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-gray-400 mb-2">Noticias</h3>
                <p className="text-3xl font-bold text-white">{stats.totalNews || 0}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-gray-400 mb-2">Usuarios</h3>
                <p className="text-3xl font-bold text-white">{stats.totalUsers || 0}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-gray-400 mb-2">Rake Total</h3>
                <p className="text-3xl font-bold text-green-400">S/{stats.totalRake?.toFixed(2) || 0}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-gray-400 mb-2">Bonos Liberados</h3>
                <p className="text-3xl font-bold text-yellow-400">S/{stats.totalBonusReleased?.toFixed(2) || 0}</p>
              </div>
            </motion.div>
          )}

          {/* News Tab - Editor Moderno */}
          {activeTab === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {editorMode === 'list' ? (
                // Lista de Noticias
                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Gestión de Noticias</h2>
                    <button
                      onClick={() => {
                        setEditorMode('editor');
                        setEditingNews(null);
                        setNewsForm({
                          title: '',
                          excerpt: '',
                          category: 'torneos',
                          tags: '',
                          featured: false,
                          status: 'published',
                          read_time: 5
                        });
                        setContent('');
                        setFeaturedImagePreview(null);
                        setGallery([]);
                        setGalleryPreviews([]);
                      }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-6 py-3 rounded-lg flex items-center gap-2"
                    >
                      <FaNewspaper />
                      Nueva Noticia
                    </button>
                  </div>
                  
                  <div className="grid gap-4">
                    {news.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No hay noticias publicadas</p>
                    ) : (
                      news.map(item => (
                        <div key={item.id} className="bg-gray-700 p-4 rounded-lg flex gap-4">
                          {item.image && (
                            <img 
                              src={`http://localhost:5000${item.image}`} 
                              alt={item.title} 
                              className="w-24 h-24 object-cover rounded-lg" 
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                            <p className="text-gray-400 text-sm mt-1">{item.excerpt}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-500">{item.category}</span>
                              {item.featured === 1 && (
                                <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded">Destacada</span>
                              )}
                              <span className="text-xs text-gray-500">{item.views || 0} vistas</span>
                              {item.read_time && (
                                <span className="text-xs text-gray-500">{item.read_time} min lectura</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleEditNews(item)}
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              <FaEdit /> Editar
                            </button>
                            <button
                              onClick={() => handleDeleteNews(item.id)}
                              className="text-red-400 hover:text-red-300 flex items-center gap-1"
                            >
                              <FaTrash /> Eliminar
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                // Editor de Noticias
                <div>
                  {/* Header del Editor */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      ✍️ {editingNews ? 'Editar Noticia' : 'Nueva Noticia'}
                    </h2>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setEditorMode('list')}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => setPreview(!preview)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        <FaEye />
                        {preview ? 'Editar' : 'Vista Previa'}
                      </button>
                      <button
                        onClick={handleSaveNews}
                        disabled={loading}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-2 rounded-lg flex items-center gap-2 font-bold"
                      >
                        <FaSave />
                        {loading ? 'Guardando...' : editingNews ? 'Actualizar' : 'Publicar'}
                      </button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Panel Principal */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Información Básica */}
                      <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Información Básica</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-gray-400 text-sm mb-2 block">Título *</label>
                            <input
                              type="text"
                              placeholder="Título impactante para tu noticia..."
                              className="w-full p-3 bg-gray-900 text-white rounded-lg"
                              value={newsForm.title}
                              onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <label className="text-gray-400 text-sm mb-2 block">Extracto *</label>
                            <textarea
                              placeholder="Resumen breve que aparecerá en la lista..."
                              className="w-full p-3 bg-gray-900 text-white rounded-lg h-24 resize-none"
                              value={newsForm.excerpt}
                              onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-gray-400 text-sm mb-2 block">Categoría</label>
                              <select
                                className="w-full p-3 bg-gray-900 text-white rounded-lg"
                                value={newsForm.category}
                                onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                              >
                                <option value="torneos">🏆 Torneos</option>
                                <option value="estrategia">🎯 Estrategia</option>
                                <option value="promociones">🎁 Promociones</option>
                                <option value="resultados">📊 Resultados</option>
                                <option value="entrevistas">🎤 Entrevistas</option>
                                <option value="analisis">📈 Análisis</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="text-gray-400 text-sm mb-2 block">Tiempo de lectura (min)</label>
                              <input
                                type="number"
                                className="w-full p-3 bg-gray-900 text-white rounded-lg"
                                value={newsForm.read_time}
                                onChange={(e) => setNewsForm({...newsForm, read_time: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-gray-400 text-sm mb-2 block">Tags (separados por coma)</label>
                            <input
                              type="text"
                              placeholder="WPT, Torneos, Freeroll, Estrategia..."
                              className="w-full p-3 bg-gray-900 text-white rounded-lg"
                              value={newsForm.tags}
                              onChange={(e) => setNewsForm({...newsForm, tags: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Editor de Contenido */}
                      <div className="bg-gray-800 rounded-xl">
                        <div className="border-b border-gray-700 p-4">
                          <h3 className="text-xl font-bold text-white mb-4">Contenido de la Noticia</h3>
                          
                          {/* Barra de herramientas */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
                              <button
                                onClick={() => formatText('bold')}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                                title="Negrita"
                              >
                                <FaBold />
                              </button>
                              <button
                                onClick={() => formatText('italic')}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                                title="Cursiva"
                              >
                                <FaItalic />
                              </button>
                              <button
                                onClick={() => formatText('underline')}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                                title="Subrayado"
                              >
                                <FaUnderline />
                              </button>
                            </div>
                            
                            <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
                              <button
                                onClick={() => formatText('formatBlock', '<h2>')}
                                className="px-3 py-2 hover:bg-gray-600 rounded text-white text-sm"
                              >
                                H2
                              </button>
                              <button
                                onClick={() => formatText('formatBlock', '<h3>')}
                                className="px-3 py-2 hover:bg-gray-600 rounded text-white text-sm"
                              >
                                H3
                              </button>
                              <button
                                onClick={() => formatText('formatBlock', '<p>')}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                              >
                                <FaParagraph />
                              </button>
                            </div>
                            
                            <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
                              <button
                                onClick={() => formatText('justifyLeft')}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                              >
                                <FaAlignLeft />
                              </button>
                              <button
                                onClick={() => formatText('justifyCenter')}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                              >
                                <FaAlignCenter />
                              </button>
                              <button
                                onClick={() => formatText('justifyRight')}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                              >
                                <FaAlignRight />
                              </button>
                            </div>
                            
                            <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
                              <button
                                onClick={() => formatText('insertUnorderedList')}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                              >
                                <FaListUl />
                              </button>
                              <button
                                onClick={() => formatText('insertOrderedList')}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                              >
                                <FaListOl />
                              </button>
                            </div>
                            
                            <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
                              <button
                                onClick={insertImageInContent}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                                title="Insertar imagen"
                              >
                                <FaImage />
                              </button>
                              <button
                                onClick={insertQuote}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                                title="Insertar cita"
                              >
                                <FaQuoteLeft />
                              </button>
                              <button
                                onClick={insertYouTube}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                                title="Video YouTube"
                              >
                                <FaYoutube />
                              </button>
                              <button
                                onClick={insertCodeBlock}
                                className="p-2 hover:bg-gray-600 rounded text-white"
                                title="Bloque de código"
                              >
                                <FaCode />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Área de contenido */}
                        <div className="p-6">
                          {preview ? (
                            <div 
                              className="min-h-[400px] p-4 bg-gray-900 rounded-lg text-gray-300"
                              dangerouslySetInnerHTML={{ __html: content }}
                            />
                          ) : (
                            <div
                              ref={contentRef}
                              contentEditable
                              className="min-h-[400px] p-4 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              onInput={(e) => setContent(e.currentTarget.innerHTML)}
                              onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                              style={{ fontSize: '16px', lineHeight: '1.8' }}
                              suppressContentEditableWarning={true}
                            >
                              {/* No usar dangerouslySetInnerHTML con contentEditable */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Panel Lateral */}
                    <div className="space-y-6">
                      {/* Imagen Principal */}
                      <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Imagen Principal</h3>
                        
                        {featuredImagePreview ? (
                          <div className="relative">
                            <img 
                              src={featuredImagePreview} 
                              alt="Preview" 
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => {
                                setFeaturedImage(null);
                                setFeaturedImagePreview(null);
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : (
                          <label className="block cursor-pointer">
                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-500 transition">
                              <FaUpload className="text-4xl text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-400">Click para subir imagen</p>
                              <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF (Max 10MB)</p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFeaturedImage}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>

                      {/* Galería */}
                      <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Galería de Imágenes</h3>
                        
                        <div className="space-y-4">
                          {galleryPreviews.length > 0 && (
                            <div className="grid grid-cols-2 gap-2">
                              {galleryPreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                  <img 
                                    src={preview} 
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                  />
                                  <button
                                    onClick={() => {
                                      const newGallery = [...gallery];
                                      const newPreviews = [...galleryPreviews];
                                      newGallery.splice(index, 1);
                                      newPreviews.splice(index, 1);
                                      setGallery(newGallery);
                                      setGalleryPreviews(newPreviews);
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                                  >
                                    <FaTimes />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <label className="block cursor-pointer">
                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-yellow-500 transition">
                              <FaImages className="text-2xl text-gray-400 mx-auto mb-1" />
                              <p className="text-sm text-gray-400">Agregar a galería</p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleGalleryImages}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Opciones de Publicación */}
                      <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Opciones</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-white">Destacar noticia</label>
                            <input
                              type="checkbox"
                              checked={newsForm.featured}
                              onChange={(e) => setNewsForm({...newsForm, featured: e.target.checked})}
                              className="w-5 h-5"
                            />
                          </div>
                          
                          <div>
                            <label className="text-gray-400 text-sm mb-2 block">Estado</label>
                            <select
                              className="w-full p-2 bg-gray-900 text-white rounded-lg"
                              value={newsForm.status}
                              onChange={(e) => setNewsForm({...newsForm, status: e.target.value})}
                            >
                              <option value="published">✅ Publicado</option>
                              <option value="draft">📝 Borrador</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Nuevo Usuario</h3>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
                    value={userForm.username}
                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Depósito Inicial (S/)"
                    className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
                    value={userForm.initial_deposit}
                    onChange={(e) => setUserForm({ ...userForm, initial_deposit: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Monto del Bono (S/)"
                    className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
                    value={userForm.bonus_amount}
                    onChange={(e) => setUserForm({ ...userForm, bonus_amount: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Rakeback %"
                    className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
                    value={userForm.rakeback_percentage}
                    onChange={(e) => setUserForm({ ...userForm, rakeback_percentage: e.target.value })}
                  />
                  <button
                    onClick={handleCreateUser}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-lg"
                  >
                    {loading ? 'Creando...' : 'Crear Usuario'}
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl overflow-y-auto max-h-[600px]">
                <h3 className="text-xl font-bold text-white mb-4">Usuarios Activos</h3>
                <div className="space-y-3">
                  {users.map(user => (
                    <div key={user.id} className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-1">@{user.username}</h4>
                      <p className="text-sm text-gray-400">{user.email}</p>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <span className="text-gray-500">Depósito:</span>
                          <span className="text-white ml-2">S/{user.initial_deposit}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Bono:</span>
                          <span className="text-yellow-400 ml-2">S/{user.bonus_amount}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Liberado:</span>
                          <span className="text-green-400 ml-2">S/{user.bonus_released?.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Rake Total:</span>
                          <span className="text-blue-400 ml-2">S/{user.total_rake?.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                            style={{ width: `${(user.bonus_released / user.bonus_amount) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {((user.bonus_released / user.bonus_amount) * 100).toFixed(1)}% completado
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Rake Tab */}
          {activeTab === 'rake' && (
            <motion.div
              key="rake"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Agregar Rake</h3>
                <div>
                  <select
                    className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
                    value={rakeForm.user_id}
                    onChange={(e) => setRakeForm({ ...rakeForm, user_id: e.target.value })}
                  >
                    <option value="">Seleccionar Usuario</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        @{user.username} - {user.email}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Monto de Rake (S/)"
                    className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
                    value={rakeForm.rake_amount}
                    onChange={(e) => setRakeForm({ ...rakeForm, rake_amount: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Descripción (opcional)"
                    className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
                    value={rakeForm.description}
                    onChange={(e) => setRakeForm({ ...rakeForm, description: e.target.value })}
                  />
                  
                  {rakeForm.user_id && rakeForm.rake_amount && (
                    <div className="bg-gray-700 p-4 rounded-lg mb-3">
                      <p className="text-sm text-gray-400 mb-2">Preview del cálculo:</p>
                      <p className="text-white">
                        Rake: <span className="text-blue-400 font-bold">S/{rakeForm.rake_amount}</span>
                      </p>
                      <p className="text-white">
                        Bono a liberar (60%): <span className="text-green-400 font-bold">
                          S/{(rakeForm.rake_amount * 0.6).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={handleAddRake}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-lg"
                  >
                    {loading ? 'Procesando...' : 'Agregar Rake'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPanel;