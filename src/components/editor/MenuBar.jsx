// src/components/editor/MenuBar.jsx
import React, { useRef, useState } from 'react';
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaHeading, FaParagraph, FaListUl, FaListOl,
  FaQuoteLeft, FaCode, FaLink, FaImage, FaYoutube,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaUndo, FaRedo, FaTable, FaUnlink, FaImages
} from 'react-icons/fa';

const MenuBar = ({ 
  editor, 
  onImageUpload, 
  insertImage,
  insertYouTube,
  insertLink,
  token,
  API_URL 
}) => {
  const fileInputRef = useRef(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showYouTubeDialog, setShowYouTubeDialog] = useState(false);
  const [showGalleryDialog, setShowGalleryDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);

  if (!editor) {
    return null;
  }

  // Manejar upload de imagen
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (onImageUpload) {
        const url = await onImageUpload(file);
        if (url) {
          insertImage(url);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen');
    }
    
    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Cargar galería de imágenes
  const loadGallery = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/gallery-images`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const images = await response.json();
      setGalleryImages(images);
      setShowGalleryDialog(true);
    } catch (error) {
      console.error('Error loading gallery:', error);
      alert('Error al cargar la galería');
    }
  };

  // Insertar enlace
  const handleInsertLink = () => {
    if (linkUrl) {
      insertLink(linkUrl);
      setShowLinkDialog(false);
      setLinkUrl('');
    }
  };

  // Insertar YouTube
  const handleInsertYouTube = () => {
    if (youtubeUrl) {
      insertYouTube(youtubeUrl);
      setShowYouTubeDialog(false);
      setYoutubeUrl('');
    }
  };

  // Insertar tabla
  const insertTable = () => {
    editor.chain().focus().insertTable({ 
      rows: 3, 
      cols: 3, 
      withHeaderRow: true 
    }).run();
  };

  return (
    <>
      <div className="menu-bar">
        {/* Grupo: Historial */}
        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="menu-button"
            title="Deshacer"
          >
            <FaUndo />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="menu-button"
            title="Rehacer"
          >
            <FaRedo />
          </button>
        </div>

        {/* Grupo: Formato de texto */}
        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`menu-button ${editor.isActive('bold') ? 'is-active' : ''}`}
            title="Negrita"
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`menu-button ${editor.isActive('italic') ? 'is-active' : ''}`}
            title="Cursiva"
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`menu-button ${editor.isActive('strike') ? 'is-active' : ''}`}
            title="Tachado"
          >
            <FaStrikethrough />
          </button>
        </div>

        {/* Grupo: Encabezados */}
        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`menu-button ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
            title="Título 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`menu-button ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
            title="Título 2"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`menu-button ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
            title="Título 3"
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`menu-button ${editor.isActive('paragraph') ? 'is-active' : ''}`}
            title="Párrafo"
          >
            <FaParagraph />
          </button>
        </div>

        {/* Grupo: Alineación */}
        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`menu-button ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
            title="Alinear izquierda"
          >
            <FaAlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`menu-button ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
            title="Centrar"
          >
            <FaAlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`menu-button ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
            title="Alinear derecha"
          >
            <FaAlignRight />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`menu-button ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
            title="Justificar"
          >
            <FaAlignJustify />
          </button>
        </div>

        {/* Grupo: Listas */}
        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`menu-button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
            title="Lista con viñetas"
          >
            <FaListUl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`menu-button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
            title="Lista numerada"
          >
            <FaListOl />
          </button>
        </div>

        {/* Grupo: Insertar */}
        <div className="menu-group">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="menu-button"
            title="Insertar imagen"
          >
            <FaImage />
          </button>
          <button
            onClick={loadGallery}
            className="menu-button"
            title="Galería"
          >
            <FaImages />
          </button>
          <button
            onClick={() => setShowLinkDialog(true)}
            className={`menu-button ${editor.isActive('link') ? 'is-active' : ''}`}
            title="Insertar enlace"
          >
            <FaLink />
          </button>
          {editor.isActive('link') && (
            <button
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="menu-button"
              title="Quitar enlace"
            >
              <FaUnlink />
            </button>
          )}
          <button
            onClick={() => setShowYouTubeDialog(true)}
            className="menu-button"
            title="Insertar video YouTube"
          >
            <FaYoutube />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`menu-button ${editor.isActive('blockquote') ? 'is-active' : ''}`}
            title="Cita"
          >
            <FaQuoteLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`menu-button ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
            title="Bloque de código"
          >
            <FaCode />
          </button>
          <button
            onClick={insertTable}
            className="menu-button"
            title="Insertar tabla"
          >
            <FaTable />
          </button>
        </div>
      </div>

      {/* Input oculto para subir imágenes */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {/* Diálogo para enlaces */}
      {showLinkDialog && (
        <div className="editor-dialog-overlay" onClick={() => setShowLinkDialog(false)}>
          <div className="editor-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Insertar enlace</h3>
            <input
              type="url"
              placeholder="https://ejemplo.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleInsertLink()}
              autoFocus
            />
            <div className="dialog-buttons">
              <button onClick={handleInsertLink} className="btn-primary">
                Insertar
              </button>
              <button onClick={() => setShowLinkDialog(false)} className="btn-secondary">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo para YouTube */}
      {showYouTubeDialog && (
        <div className="editor-dialog-overlay" onClick={() => setShowYouTubeDialog(false)}>
          <div className="editor-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Insertar video de YouTube</h3>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleInsertYouTube()}
              autoFocus
            />
            <div className="dialog-buttons">
              <button onClick={handleInsertYouTube} className="btn-primary">
                Insertar
              </button>
              <button onClick={() => setShowYouTubeDialog(false)} className="btn-secondary">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo para Galería */}
      {showGalleryDialog && (
        <div className="editor-dialog-overlay" onClick={() => setShowGalleryDialog(false)}>
          <div className="editor-dialog gallery-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Seleccionar imagen de la galería</h3>
            <div className="gallery-grid">
              {galleryImages.length === 0 ? (
                <p>No hay imágenes en la galería</p>
              ) : (
                galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="gallery-item"
                    onClick={() => {
                      insertImage(image.fullUrl);
                      setShowGalleryDialog(false);
                    }}
                  >
                    <img src={image.fullUrl} alt={image.filename} />
                  </div>
                ))
              )}
            </div>
            <div className="dialog-buttons">
              <button onClick={() => setShowGalleryDialog(false)} className="btn-secondary">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuBar;