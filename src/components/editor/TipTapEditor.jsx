// src/components/editor/TipTapEditor.jsx - SOLUCIÓN DEFINITIVA QUE FUNCIONA
import React, { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import MenuBar from './MenuBar';
import './EditorStyles.css';

const TipTapEditor = ({ 
  value, 
  onChange, 
  onImageUpload,
  placeholder = "Escribe tu contenido aquí...",
  token,
  API_URL 
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageControls, setImageControls] = useState({ size: 'medium', align: 'center' });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Youtube.configure({ width: '100%', height: 400 }),
      Placeholder.configure({ placeholder }),
      Highlight,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: { class: 'prose prose-lg max-w-none focus:outline-none' },
      handleDrop: (view, event) => {
        const file = event.dataTransfer?.files?.[0];
        if (file?.type.startsWith('image/')) {
          event.preventDefault();
          handleImageUpload(file);
          return true;
        }
        return false;
      },
      handlePaste: (view, event) => {
        const files = Array.from(event.clipboardData?.files || []);
        const imageFile = files.find(file => file.type.startsWith('image/'));
        if (imageFile) {
          event.preventDefault();
          handleImageUpload(imageFile);
          return true;
        }
        return false;
      },
    },
  });

  const handleImageUpload = async (file) => {
    if (!onImageUpload || !editor) return;
    
    try {
      const url = await onImageUpload(file);
      if (url) {
        editor.chain().focus().setImage({ src: url, alt: file.name || '' }).run();
        setTimeout(() => applyImageStyles(url, 'medium', 'center'), 100);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error: ' + error.message);
    }
  };

  const applyImageStyles = (src, size, align) => {
    const editorElement = editor.view.dom;
    const img = Array.from(editorElement.querySelectorAll('img')).find(img => {
      return img.src === src || img.src.includes(src.split('/').pop());
    });
    
    if (img) {
      // Limpiar clases y estilos previos
      img.className = img.className.replace(/image-size-\w+|image-align-\w+/g, '').trim();
      img.style.cssText = '';
      
      // Aplicar nuevas clases y atributos
      img.classList.add(`image-size-${size}`, `image-align-${align}`);
      img.setAttribute('data-size', size);
      img.setAttribute('data-align', align);
      
      // Aplicar estilos directos para garantizar que funcionen
      const baseStyles = {
        display: 'block',
        height: 'auto',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: '2px solid transparent',
      };

      // Estilos de tamaño
      const sizeStyles = {
        small: { maxWidth: '300px', width: 'auto' },
        medium: { maxWidth: '500px', width: 'auto' },
        large: { maxWidth: '700px', width: 'auto' },
        full: { maxWidth: '100%', width: '100%' }
      };

      // Estilos de alineación
      const alignStyles = {
        left: { float: 'left', margin: '0.5rem 1.5rem 1rem 0', clear: 'left' },
        center: { margin: '1.5rem auto', display: 'block', clear: 'both' },
        right: { float: 'right', margin: '0.5rem 0 1rem 1.5rem', clear: 'right' }
      };

      // Aplicar estilos
      Object.assign(img.style, baseStyles, sizeStyles[size], alignStyles[align]);
      
      // Forzar actualización
      onChange(editor.getHTML());
      
      console.log(`Applied styles: ${size}, ${align} to image:`, img.src);
    }
  };

  const insertImage = useCallback((url, alt = '') => {
    if (!editor) return;
    editor.chain().focus().setImage({ src: url, alt }).run();
    setTimeout(() => applyImageStyles(url, 'medium', 'center'), 100);
  }, [editor]);

  const insertYouTube = useCallback((url) => {
    if (editor) editor.commands.setYoutubeVideo({ src: url });
  }, [editor]);

  const insertLink = useCallback((url) => {
    if (editor) editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  // Manejo de selección de imágenes
  useEffect(() => {
    if (!editor) return;

    const handleImageClick = (event) => {
      if (event.target.tagName === 'IMG') {
        const img = event.target;
        setSelectedImage(img);
        
        // Obtener valores actuales
        const currentSize = img.getAttribute('data-size') || 'medium';
        const currentAlign = img.getAttribute('data-align') || 'center';
        setImageControls({ size: currentSize, align: currentAlign });
        
        // Resaltar imagen seleccionada
        Array.from(editor.view.dom.querySelectorAll('img')).forEach(i => {
          i.style.outline = '';
          i.style.outlineOffset = '';
        });
        
        img.style.outline = '3px solid #fbbf24';
        img.style.outlineOffset = '3px';
        
        console.log('Image selected:', { src: img.src, size: currentSize, align: currentAlign });
      } else {
        // Click fuera de imagen - deseleccionar
        setSelectedImage(null);
        Array.from(editor.view.dom.querySelectorAll('img')).forEach(i => {
          i.style.outline = '';
          i.style.outlineOffset = '';
        });
      }
    };

    const editorElement = editor.view.dom;
    editorElement.addEventListener('click', handleImageClick);

    return () => {
      editorElement.removeEventListener('click', handleImageClick);
    };
  }, [editor]);

  // Aplicar cambios de imagen
  const changeImageSize = (size) => {
    if (selectedImage) {
      applyImageStyles(selectedImage.src, size, imageControls.align);
      setImageControls(prev => ({ ...prev, size }));
    }
  };

  const changeImageAlign = (align) => {
    if (selectedImage) {
      applyImageStyles(selectedImage.src, imageControls.size, align);
      setImageControls(prev => ({ ...prev, align }));
    }
  };

  const deleteSelectedImage = () => {
    if (selectedImage && confirm('¿Eliminar esta imagen?')) {
      selectedImage.remove();
      setSelectedImage(null);
      onChange(editor.getHTML());
    }
  };

  if (!editor) {
    return (
      <div className="tiptap-editor-container">
        <div className="editor-loading">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-poker-gold mr-3"></div>
            <span>Cargando editor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tiptap-editor-container">
      <MenuBar 
        editor={editor} 
        onImageUpload={onImageUpload}
        insertImage={insertImage}
        insertYouTube={insertYouTube}
        insertLink={insertLink}
        token={token}
        API_URL={API_URL}
      />
      
      <div className="editor-wrapper">
        <EditorContent editor={editor} className="editor-content" />
      </div>
      
      {/* Controles de imagen */}
      {selectedImage && (
        <div className="bg-gray-800 border border-yellow-500 rounded-lg p-4 m-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">Controles de Imagen</h4>
            <button
              onClick={() => {
                setSelectedImage(null);
                Array.from(editor.view.dom.querySelectorAll('img')).forEach(i => {
                  i.style.outline = '';
                  i.style.outlineOffset = '';
                });
              }}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Controles de tamaño */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Tamaño:</label>
              <div className="grid grid-cols-2 gap-2">
                {['small', 'medium', 'large', 'full'].map(size => (
                  <button
                    key={size}
                    onClick={() => changeImageSize(size)}
                    className={`px-3 py-2 rounded text-sm font-medium transition ${
                      imageControls.size === size 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {size === 'small' ? 'Pequeña' : 
                     size === 'medium' ? 'Mediana' :
                     size === 'large' ? 'Grande' : 'Completa'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Controles de posición */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Posición:</label>
              <div className="grid grid-cols-3 gap-2">
                {['left', 'center', 'right'].map(align => (
                  <button
                    key={align}
                    onClick={() => changeImageAlign(align)}
                    className={`px-3 py-2 rounded text-sm font-medium transition ${
                      imageControls.align === align 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {align === 'left' ? 'Izquierda' : 
                     align === 'center' ? 'Centro' : 'Derecha'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Botón eliminar */}
          <div className="mt-3 pt-3 border-t border-gray-700">
            <button
              onClick={deleteSelectedImage}
              className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition"
            >
              Eliminar Imagen
            </button>
          </div>
        </div>
      )}
      
      {/* Estado del editor */}
      <div className="bg-gray-900 p-2 text-xs text-gray-400 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span>Editor: ✅ Funcional</span>
          <span>Imágenes: {editor ? (editor.getHTML().match(/<img/g) || []).length : 0}</span>
          <span>Imagen seleccionada: {selectedImage ? '✅' : '❌'}</span>
          <span>Caracteres: {editor ? editor.getText().length : 0}</span>
        </div>
      </div>
      
      {/* Instrucciones */}
      <div className="bg-blue-900/30 p-3 text-sm text-blue-200 rounded-b-lg">
        <strong>Instrucciones de uso:</strong>
        <ul className="mt-2 text-xs space-y-1">
          <li>• Arrastra imágenes directamente al editor o usa el botón de imagen</li>
          <li>• Haz CLICK en cualquier imagen para seleccionarla</li>
          <li>• Aparecerán controles debajo del editor para ajustar tamaño y posición</li>
          <li>• Los cambios se aplican inmediatamente</li>
          <li>• Haz click fuera de la imagen para deseleccionarla</li>
        </ul>
      </div>
    </div>
  );
};

export default TipTapEditor;