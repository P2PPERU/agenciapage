// src/components/admin/NewsEditor.jsx - VERSIÓN CORREGIDA
import { useState, useEffect } from 'react';
import CustomRichEditor from './CustomRichEditor';
import { 
  FaSave, FaTimes, FaUpload, FaImages, FaNewspaper 
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
      
      if (editingNews.image) {
        setFeaturedImagePreview(`${API_URL.replace('/api', '')}${editingNews.image}`);
      }
    }
  }, [editingNews, API_URL]);
  
  // Función para subir imagen al servidor SIN COMPRESIÓN
  const handleImageUploadToServer = async (file) => {
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
      if (data.success) {
        return data.fullUrl || `${API_URL.replace('/api', '')}${data.url}`;
      }
      return null;
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      return null;
    }
  };
  
  // Manejar imagen principal SIN COMPRESIÓN
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
  
  // Manejar galería SIN COMPRESIÓN
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
    
    // Agregar contenido
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    formData.append('content', textContent);
    formData.append('content_html', content);
    
    // Agregar imagen principal SIN MODIFICAR
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    
    // Agregar galería SIN MODIFICAR
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
          
          {/* Editor Personalizado */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Contenido</label>
            <CustomRichEditor
              value={content}
              onChange={setContent}
              onImageUpload={handleImageUploadToServer}
              placeholder="Escribe el contenido de tu noticia..."
              minHeight="400px"
            />
          </div>
        </div>
        
        {/* Panel Lateral */}
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
          
          {/* Galería */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Galería de Imágenes</label>
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={preview} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
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
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-3 text-center hover:border-yellow-500 transition">
                <FaImages className="text-xl text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Agregar a galería</p>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                multiple
                onChange={handleGalleryImages}
                className="hidden"
              />
            </label>
          </div>
          
          {/* Opciones */}
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