// src/components/news/NewsContentRenderer.jsx - VERSIÓN ACTUALIZADA
import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import './NewsContentRenderer.css';

const NewsContentRenderer = ({ content, title }) => {
  const contentRef = useRef(null);

  // Procesar el contenido HTML para optimizar las imágenes
  const processContent = (htmlContent) => {
    if (!htmlContent) return '';

    // Limpiar el HTML
    const cleanHTML = DOMPurify.sanitize(htmlContent);
    
    // Crear un elemento temporal para procesar
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cleanHTML;

    // Procesar todas las imágenes
    const images = tempDiv.querySelectorAll('img');
    images.forEach((img, index) => {
      // Añadir loading lazy
      img.setAttribute('loading', 'lazy');
      
      // Obtener o establecer atributos de tamaño y alineación
      const size = img.getAttribute('data-size') || 
                   img.className.match(/image-size-(\w+)/)?.[1] || 
                   'medium';
      
      const align = img.getAttribute('data-align') || 
                    img.className.match(/image-align-(\w+)/)?.[1] || 
                    'center';
      
      // Asegurar que los atributos estén presentes
      img.setAttribute('data-size', size);
      img.setAttribute('data-align', align);
      
      // Limpiar clases existentes y agregar las correctas
      img.className = img.className.replace(/image-size-\w+|image-align-\w+/g, '').trim();
      img.classList.add('news-image', `image-size-${size}`, `image-align-${align}`);
      
      // Aplicar estilos inline como respaldo (crítico para la visualización)
      const baseStyles = {
        display: 'block',
        height: 'auto',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        cursor: 'zoom-in'
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
        left: { 
          float: 'left', 
          margin: '0.5rem 1.5rem 1rem 0', 
          clear: 'left',
          maxWidth: size === 'large' ? '60%' : size === 'medium' ? '45%' : '35%'
        },
        center: { 
          margin: '1.5rem auto', 
          display: 'block', 
          clear: 'both' 
        },
        right: { 
          float: 'right', 
          margin: '0.5rem 0 1rem 1.5rem', 
          clear: 'right',
          maxWidth: size === 'large' ? '60%' : size === 'medium' ? '45%' : '35%'
        }
      };

      // Aplicar estilos combinados
      const finalStyles = {
        ...baseStyles,
        ...sizeStyles[size],
        ...alignStyles[align]
      };

      // Aplicar estilos inline
      Object.assign(img.style, finalStyles);
      
      // Añadir atributo de identificación
      img.setAttribute('data-image-index', index);
      
      console.log(`Processed image ${index}: size=${size}, align=${align}`, img);
    });

    // Procesar enlaces
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
      if (link.href && !link.href.startsWith(window.location.origin)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
      link.classList.add('news-link');
    });

    // Procesar videos de YouTube
    const youtubeElements = tempDiv.querySelectorAll('[data-youtube-video]');
    youtubeElements.forEach(element => {
      element.classList.add('news-youtube');
    });

    // Procesar tablas
    const tables = tempDiv.querySelectorAll('table');
    tables.forEach(table => {
      const wrapper = document.createElement('div');
      wrapper.className = 'news-table-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      table.classList.add('news-table');
    });

    // Procesar blockquotes
    const quotes = tempDiv.querySelectorAll('blockquote');
    quotes.forEach(quote => {
      quote.classList.add('news-quote');
    });

    return tempDiv.innerHTML;
  };

  // Manejar clics en imágenes para modal/zoom
  useEffect(() => {
    const handleImageClick = (e) => {
      if (e.target.classList.contains('news-image')) {
        openImageModal(e.target);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('click', handleImageClick);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('click', handleImageClick);
      }
    };
  }, [content]);

  // Aplicar estilos adicionales después de que el componente se monte
  useEffect(() => {
    if (contentRef.current) {
      const images = contentRef.current.querySelectorAll('img');
      images.forEach(img => {
        // Verificar y reapliar estilos si es necesario
        const size = img.getAttribute('data-size') || 'medium';
        const align = img.getAttribute('data-align') || 'center';
        
        if (!img.style.maxWidth) {
          // Reapliar estilos si no están presentes
          const sizeStyles = {
            small: { maxWidth: '300px' },
            medium: { maxWidth: '500px' },
            large: { maxWidth: '700px' },
            full: { maxWidth: '100%', width: '100%' }
          };

          const alignStyles = {
            left: { float: 'left', margin: '0.5rem 1.5rem 1rem 0' },
            center: { margin: '1.5rem auto', display: 'block' },
            right: { float: 'right', margin: '0.5rem 0 1rem 1.5rem' }
          };

          Object.assign(img.style, sizeStyles[size], alignStyles[align]);
        }
      });
    }
  }, [content]);

  // Abrir modal de imagen
  const openImageModal = (img) => {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="image-modal-backdrop">
        <div class="image-modal-content">
          <img src="${img.src}" alt="${img.alt || ''}" class="image-modal-img">
          <button class="image-modal-close">&times;</button>
          ${img.alt ? `<p class="image-modal-caption">${img.alt}</p>` : ''}
        </div>
      </div>
    `;

    const closeModal = () => {
      document.body.removeChild(modal);
      document.body.style.overflow = 'auto';
    };

    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('image-modal-backdrop') || 
          e.target.classList.contains('image-modal-close')) {
        closeModal();
      }
    });

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  };

  const processedContent = processContent(content);

  if (!processedContent) {
    return (
      <div className="news-content-empty">
        <p>No hay contenido disponible para mostrar.</p>
      </div>
    );
  }

  return (
    <article 
      ref={contentRef}
      className="news-content-renderer"
      role="main"
      aria-label={`Contenido del artículo: ${title}`}
    >
      <div 
        className="news-content"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      
      {/* Clearfix para elementos flotantes */}
      <div style={{ clear: 'both', height: 0 }} />
    </article>
  );
};

export default NewsContentRenderer;