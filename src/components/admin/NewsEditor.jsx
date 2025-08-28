// src/components/admin/NewsEditor.jsx - VERSIÓN CON URLS CORREGIDAS
import { useState, useEffect } from 'react';
import TipTapEditor from '../editor/TipTapEditor';
import EditorErrorBoundary from '../editor/EditorErrorBoundary';
import ImageUploadTest from '../editor/ImageUploadTest';
import { 
  FaSave, FaTimes, FaUpload, FaImages, FaNewspaper, FaBug 
} from 'react-icons/fa';

const NewsEditor = ({ 
  editingNews, 
  onSave, 
  onCancel, 
  token,
  API_URL 
}) => {
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
  const [loading, setLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  
  // ⭐ Función para construir URL completa de forma consistente
  const buildFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // Si ya es una URL completa, devolverla tal como está
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Si es una ruta relativa, construir URL completa
    if (imagePath.startsWith('/')) {
      const baseUrl = API_URL.replace('/api', ''); // http://localhost:5000
      return `${baseUrl}${imagePath}`;
    }
    
    // Fallback
    return `${API_URL.replace('/api', '')}/${imagePath}`;
  };
  
  // Cargar datos si es edición
  useEffect(() => {
    if (editingNews) {
      setNewsForm({
        title: editingNews.title,
        excerpt: editingNews.excerpt,
        category: editingNews.category,
        tags: editingNews.tags || '',
        featured: editingNews.featured || false,
        status: editingNews.status || 'published',
        read_time: editingNews.read_time || 5
      });
      setContent(editingNews.content_html || editingNews.content || '');
      
      // ⭐ Construir URL de imagen de forma consistente
      if (editingNews.image) {
        const fullImageUrl = buildFullImageUrl(editingNews.image);
        setFeaturedImagePreview(fullImageUrl);
        console.log('🖼️ Imagen existente:', fullImageUrl);
      }
    }
  }, [editingNews, API_URL]);
  
  // ⭐ Función CORREGIDA para subir imagen al servidor
  const handleImageUploadToServer = async (file) => {
    console.log('📤 NewsEditor: Subiendo imagen:', file.name);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      console.log('📤 NewsEditor: URL endpoint:', `${API_URL}/admin/upload-image`);
      console.log('📤 NewsEditor: Token presente:', !!token);
      
      const response = await fetch(`${API_URL}/admin/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      console.log('📤 NewsEditor: Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('📤 NewsEditor: Error response:', errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('📤 NewsEditor: Response data:', data);
      
      if (data.success) {
        // ⭐ CAMBIO CLAVE: Asegurar que siempre retornamos URL completa
        let fullUrl = data.fullUrl;
        
        if (!fullUrl && data.url) {
          // Construir URL completa si solo tenemos la relativa
          fullUrl = buildFullImageUrl(data.url);
        }
        
        console.log('📤 NewsEditor: URL completa construida:', fullUrl);
        
        if (!fullUrl) {
          throw new Error('No se pudo construir la URL de la imagen');
        }
        
        return fullUrl;
      } else {
        throw new Error('Respuesta del servidor sin éxito');
      }
    } catch (error) {
      console.error('📤 NewsEditor: Error completo:', error);
      throw error;
    }
  };
  
  // Manejar imagen principal
  const handleFeaturedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño
      if (file.size > 10 * 1024 * 1024) {
        alert('La imagen no debe superar los 10MB');
        return;
      }
      
      // Guardar archivo original
      setFeaturedImage(file);
      
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Manejar galería
  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} supera los 10MB y será omitida`);
        return false;
      }
      return true;
    });
    
    setGallery([...gallery, ...validFiles]);
    
    // Crear previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const handleSave = async () => {
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
    
    // ⭐ IMPORTANTE: Procesar contenido para asegurar URLs absolutas
    let processedContent = content;
    
    // Reemplazar URLs relativas por absolutas en el contenido HTML
    if (processedContent && API_URL) {
      const baseUrl = API_URL.replace('/api', '');
      processedContent = processedContent.replace(
        /src="\/uploads\//g, 
        `src="${baseUrl}/uploads/`
      );
      console.log('📝 Contenido procesado con URLs absolutas');
    }
    
    // Agregar contenido
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = processedContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    formData.append('content', textContent);
    formData.append('content_html', processedContent);
    
    // Agregar imagen principal
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    
    // Agregar galería
    gallery.forEach(file => {
      formData.append('gallery', file);
    });
    
    try {
      await onSave(formData, editingNews);
      // Reset form
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
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la noticia');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaNewspaper className="text-poker-gold" />
          {editingNews ? 'Editar Noticia' : 'Nueva Noticia'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-2 ${
              showDebug 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-blue-600'
            }`}
            title="Herramientas de debug"
          >
            <FaBug />
            Debug
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-2 rounded-lg flex items-center gap-2 font-bold disabled:opacity-50"
          >
            <FaSave />
            {loading ? 'Guardando...' : editingNews ? 'Actualizar' : 'Publicar'}
          </button>
        </div>
      </div>

      {/* Debug Panel */}
      {showDebug && (
        <div className="mb-6 space-y-4">
          <ImageUploadTest token={token} API_URL={API_URL} />
          <div className="bg-gray-900 p-3 rounded text-xs text-gray-400">
            <div><strong>API_URL:</strong> {API_URL}</div>
            <div><strong>Base URL:</strong> {API_URL.replace('/api', '')}</div>
            <div><strong>Token presente:</strong> {token ? '✅ Sí' : '❌ No'}</div>
            <div><strong>Contenido actual:</strong> {content.length} caracteres</div>
            <div><strong>Imágenes en contenido:</strong> {(content.match(/<img/g) || []).length}</div>
            <div><strong>Preview imagen:</strong> {featuredImagePreview ? '✅ Sí' : '❌ No'}</div>
          </div>
        </div>
      )}
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Panel Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Título *</label>
              <input
                type="text"
                placeholder="Título impactante para tu noticia..."
                className="w-full p-3 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={newsForm.title}
                onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Extracto *</label>
              <textarea
                placeholder="Resumen breve que aparecerá en la lista..."
                className="w-full p-3 bg-gray-900 text-white rounded-lg h-24 resize-none focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={newsForm.excerpt}
                onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Categoría</label>
                <select
                  className="w-full p-3 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
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
                <label className="text-gray-400 text-sm mb-2 block">Tiempo lectura (min)</label>
                <input
                  type="number"
                  className="w-full p-3 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                  value={newsForm.read_time}
                  onChange={(e) => setNewsForm({...newsForm, read_time: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          {/* Editor Personalizado con Error Boundary */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Contenido del Artículo
            </label>
            <EditorErrorBoundary>
              <TipTapEditor
                value={content}
                onChange={setContent}
                onImageUpload={handleImageUploadToServer}
                placeholder="Escribe el contenido de tu noticia. Puedes arrastrar imágenes directamente aquí..."
                token={token}
                API_URL={API_URL}
              />
            </EditorErrorBoundary>
          </div>
        </div>
        
        {/* Panel Lateral - mismo código que antes */}
        <div className="space-y-6">
          {/* Imagen Principal */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Imagen Principal</label>
            {featuredImagePreview ? (
              <div className="relative">
                <img 
                  src={featuredImagePreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    console.error('❌ Error cargando preview:', featuredImagePreview);
                    e.target.style.display = 'none';
                  }}
                />
                <button
                  onClick={() => {
                    setFeaturedImage(null);
                    setFeaturedImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-500 transition">
                  <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Click para subir</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF (Max 10MB)</p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFeaturedImage}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          {/* Opciones - mismo código que antes */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={newsForm.featured}
                onChange={(e) => setNewsForm({...newsForm, featured: e.target.checked})}
                className="w-4 h-4 text-poker-gold focus:ring-poker-gold"
              />
              Destacar noticia
            </label>
            
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Estado</label>
              <select
                className="w-full p-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={newsForm.status}
                onChange={(e) => setNewsForm({...newsForm, status: e.target.value})}
              >
                <option value="published">✅ Publicado</option>
                <option value="draft">📝 Borrador</option>
              </select>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Tags (separados por coma)</label>
              <input
                type="text"
                placeholder="WPT, Torneos, Freeroll..."
                className="w-full p-2 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={newsForm.tags}
                onChange={(e) => setNewsForm({...newsForm, tags: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEditor;