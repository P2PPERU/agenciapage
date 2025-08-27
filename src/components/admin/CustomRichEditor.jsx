// src/components/admin/CustomRichEditor.jsx
import { useRef, useState, useEffect } from 'react';
import { 
  FaBold, FaItalic, FaUnderline, FaQuoteLeft,
  FaListUl, FaListOl, FaLink, FaImage, FaCode,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaHeading, FaParagraph, FaYoutube, FaUndo, FaRedo,
  FaTable, FaHighlighter, FaStrikethrough
} from 'react-icons/fa';
import imageCompression from 'browser-image-compression';
import DOMPurify from 'dompurify';

const CustomRichEditor = ({ 
  value, 
  onChange, 
  onImageUpload,
  placeholder = "Escribe el contenido aquí...",
  minHeight = "400px"
}) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedText, setSelectedText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Inicializar contenido
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = DOMPurify.sanitize(value);
      }
    }
  }, [value]);
  
  // Guardar en el historial
  const saveToHistory = () => {
    const content = editorRef.current.innerHTML;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(content);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  // Ejecutar comando de formato
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleContentChange();
  };
  
  // Manejar cambio de contenido
  const handleContentChange = () => {
    const content = editorRef.current.innerHTML;
    onChange(content);
    saveToHistory();
  };
  
  // Insertar HTML personalizado
  const insertHTML = (html) => {
    editorRef.current.focus();
    document.execCommand('insertHTML', false, html);
    handleContentChange();
  };
  
  // Manejar pegado
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    handleContentChange();
  };
  
  // Comprimir y subir imagen
const handleImageUpload = async (file) => {
    try {
        // NO comprimir, enviar archivo original
        if (onImageUpload) {
            const url = await onImageUpload(file);
            if (url) {
                insertImage(url);
            }
        } else {
            // Convertir a base64 local sin compresión
            const reader = new FileReader();
            reader.onload = (e) => {
                insertImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    } catch (error) {
        console.error('Error procesando imagen:', error);
        alert('Error al procesar la imagen');
    }
};
  
  // Insertar imagen
  const insertImage = (url) => {
    const img = `
      <div class="image-container" style="margin: 1rem 0;">
        <img src="${url}" 
             alt="Imagen" 
             style="max-width: 100%; height: auto; border-radius: 0.5rem; display: block; margin: 0 auto;"
             loading="lazy" />
      </div>
    `;
    insertHTML(img);
  };
  
  // Insertar video de YouTube
  const insertYouTube = () => {
    if (!youtubeUrl) return;
    
    // Extraer ID del video
    const videoId = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    
    if (videoId && videoId[1]) {
      const embed = `
        <div class="video-container" style="position: relative; width: 100%; padding-bottom: 56.25%; margin: 1rem 0;">
          <iframe 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 0.5rem;"
            src="https://www.youtube.com/embed/${videoId[1]}"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      `;
      insertHTML(embed);
      setShowYoutubeDialog(false);
      setYoutubeUrl('');
    } else {
      alert('URL de YouTube inválida');
    }
  };
  
  // Insertar enlace
  const insertLink = () => {
    if (linkUrl && selectedText) {
      formatText('createLink', linkUrl);
      setShowLinkDialog(false);
      setLinkUrl('');
    }
  };
  
  // Insertar tabla
  const insertTable = () => {
    const table = `
      <table style="border-collapse: collapse; width: 100%; margin: 1rem 0;">
        <thead>
          <tr style="background-color: #1f2937;">
            <th style="border: 1px solid #374151; padding: 0.5rem;">Encabezado 1</th>
            <th style="border: 1px solid #374151; padding: 0.5rem;">Encabezado 2</th>
            <th style="border: 1px solid #374151; padding: 0.5rem;">Encabezado 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #374151; padding: 0.5rem;">Celda 1</td>
            <td style="border: 1px solid #374151; padding: 0.5rem;">Celda 2</td>
            <td style="border: 1px solid #374151; padding: 0.5rem;">Celda 3</td>
          </tr>
        </tbody>
      </table>
    `;
    insertHTML(table);
  };
  
  // Insertar bloque de código
  const insertCodeBlock = () => {
    const code = `
      <pre style="background: #1f2937; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1rem 0;">
        <code>// Tu código aquí</code>
      </pre>
    `;
    insertHTML(code);
  };
  
  // Insertar cita
  const insertQuote = () => {
    const quote = `
      <blockquote style="border-left: 4px solid #fbbf24; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #9ca3af;">
        Escribe tu cita aquí...
      </blockquote>
    `;
    insertHTML(quote);
  };
  
  // Deshacer/Rehacer
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      editorRef.current.innerHTML = history[newIndex];
      onChange(history[newIndex]);
    }
  };
  
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      editorRef.current.innerHTML = history[newIndex];
      onChange(history[newIndex]);
    }
  };
  
  return (
    <div className="rich-editor bg-gray-900 rounded-lg overflow-hidden">
      {/* Barra de herramientas */}
      <div className="toolbar bg-gray-800 p-2 border-b border-gray-700 flex flex-wrap gap-2">
        {/* Grupo: Historial */}
        <div className="flex gap-1 bg-gray-700 rounded p-1">
          <button
            type="button"
            onClick={undo}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Deshacer"
          >
            <FaUndo />
          </button>
          <button
            type="button"
            onClick={redo}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Rehacer"
          >
            <FaRedo />
          </button>
        </div>
        
        {/* Grupo: Formato de texto */}
        <div className="flex gap-1 bg-gray-700 rounded p-1">
          <button
            type="button"
            onClick={() => formatText('bold')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Negrita"
          >
            <FaBold />
          </button>
          <button
            type="button"
            onClick={() => formatText('italic')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Cursiva"
          >
            <FaItalic />
          </button>
          <button
            type="button"
            onClick={() => formatText('underline')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Subrayado"
          >
            <FaUnderline />
          </button>
          <button
            type="button"
            onClick={() => formatText('strikeThrough')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Tachado"
          >
            <FaStrikethrough />
          </button>
        </div>
        
        {/* Grupo: Encabezados */}
        <div className="flex gap-1 bg-gray-700 rounded p-1">
          <button
            type="button"
            onClick={() => formatText('formatBlock', '<h1>')}
            className="px-3 py-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition text-sm font-bold"
            title="Título 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => formatText('formatBlock', '<h2>')}
            className="px-3 py-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition text-sm font-bold"
            title="Título 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => formatText('formatBlock', '<h3>')}
            className="px-3 py-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition text-sm font-bold"
            title="Título 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => formatText('formatBlock', '<p>')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Párrafo"
          >
            <FaParagraph />
          </button>
        </div>
        
        {/* Grupo: Alineación */}
        <div className="flex gap-1 bg-gray-700 rounded p-1">
          <button
            type="button"
            onClick={() => formatText('justifyLeft')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Alinear izquierda"
          >
            <FaAlignLeft />
          </button>
          <button
            type="button"
            onClick={() => formatText('justifyCenter')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Centrar"
          >
            <FaAlignCenter />
          </button>
          <button
            type="button"
            onClick={() => formatText('justifyRight')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Alinear derecha"
          >
            <FaAlignRight />
          </button>
          <button
            type="button"
            onClick={() => formatText('justifyFull')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Justificar"
          >
            <FaAlignJustify />
          </button>
        </div>
        
        {/* Grupo: Listas */}
        <div className="flex gap-1 bg-gray-700 rounded p-1">
          <button
            type="button"
            onClick={() => formatText('insertUnorderedList')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Lista con viñetas"
          >
            <FaListUl />
          </button>
          <button
            type="button"
            onClick={() => formatText('insertOrderedList')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Lista numerada"
          >
            <FaListOl />
          </button>
        </div>
        
        {/* Grupo: Insertar */}
        <div className="flex gap-1 bg-gray-700 rounded p-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Insertar imagen"
          >
            <FaImage />
          </button>
          <button
            type="button"
            onClick={() => {
              const selection = window.getSelection().toString();
              setSelectedText(selection);
              setShowLinkDialog(true);
            }}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Insertar enlace"
          >
            <FaLink />
          </button>
          <button
            type="button"
            onClick={() => setShowYoutubeDialog(true)}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Insertar video YouTube"
          >
            <FaYoutube />
          </button>
          <button
            type="button"
            onClick={insertQuote}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Insertar cita"
          >
            <FaQuoteLeft />
          </button>
          <button
            type="button"
            onClick={insertCodeBlock}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Insertar código"
          >
            <FaCode />
          </button>
          <button
            type="button"
            onClick={insertTable}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Insertar tabla"
          >
            <FaTable />
          </button>
        </div>
        
        {/* Grupo: Color */}
        <div className="flex gap-1 bg-gray-700 rounded p-1">
          <button
            type="button"
            onClick={() => formatText('hiliteColor', '#fbbf24')}
            className="p-2 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition"
            title="Resaltar"
          >
            <FaHighlighter />
          </button>
          <input
            type="color"
            onChange={(e) => formatText('foreColor', e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
            title="Color de texto"
          />
        </div>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="editor-content p-4 text-white focus:outline-none"
        style={{ 
          minHeight,
          maxHeight: '600px',
          overflowY: 'auto'
        }}
        onInput={handleContentChange}
        onPaste={handlePaste}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
      
      {/* Input oculto para imágenes */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageUpload(file);
          }
        }}
      />
      
      {/* Diálogo para enlaces */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white mb-4">Insertar enlace</h3>
            <input
              type="url"
              placeholder="https://ejemplo.com"
              className="w-full p-2 bg-gray-900 text-white rounded mb-4"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={insertLink}
                className="bg-poker-gold text-black px-4 py-2 rounded"
              >
                Insertar
              </button>
              <button
                onClick={() => setShowLinkDialog(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Diálogo para YouTube */}
      {showYoutubeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white mb-4">Insertar video de YouTube</h3>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              className="w-full p-2 bg-gray-900 text-white rounded mb-4"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={insertYouTube}
                className="bg-poker-gold text-black px-4 py-2 rounded"
              >
                Insertar
              </button>
              <button
                onClick={() => setShowYoutubeDialog(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .editor-content:empty:before {
          content: attr(data-placeholder);
          color: #6b7280;
          pointer-events: none;
        }
        
        .editor-content {
          font-size: 16px;
          line-height: 1.8;
        }
        
        .editor-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1rem 0;
          color: #fbbf24;
        }
        
        .editor-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 1rem 0;
          color: #f59e0b;
        }
        
        .editor-content h3 {
          font-size: 1.2em;
          font-weight: bold;
          margin: 0.8rem 0;
          color: #d97706;
        }
        
        .editor-content p {
          margin: 0.8rem 0;
        }
        
        .editor-content ul,
        .editor-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        .editor-content li {
          margin: 0.3rem 0;
        }
        
        .editor-content a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        .editor-content a:hover {
          color: #60a5fa;
        }
        
        .editor-content blockquote {
          border-left: 4px solid #fbbf24;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #9ca3af;
        }
        
        .editor-content pre {
          background: #1f2937;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .editor-content code {
          font-family: monospace;
          background: #374151;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
        }
        
        .editor-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem auto;
          display: block;
        }
        
        .editor-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .editor-content th,
        .editor-content td {
          border: 1px solid #374151;
          padding: 0.5rem;
          text-align: left;
        }
        
        .editor-content th {
          background-color: #1f2937;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default CustomRichEditor;