// src/utils/imageOptimizer.js
export const optimizeContentImages = (htmlContent) => {
  if (!htmlContent) return '';
  
  // Crear un contenedor DOM temporal
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Procesar todas las imágenes
  const images = tempDiv.querySelectorAll('img');
  images.forEach(img => {
    // Añadir clases responsivas
    img.classList.add('content-image');
    
    // Establecer atributos de carga lazy
    img.setAttribute('loading', 'lazy');
    
    // Si no tiene dimensiones, establecer máximos
    if (!img.style.maxWidth) {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    }
    
    // Envolver en un contenedor con aspect ratio
    const wrapper = document.createElement('div');
    wrapper.className = 'image-wrapper';
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
  });
  
  return tempDiv.innerHTML;
};

// CSS para las imágenes (añadir a index.css)
export const imageStyles = `
  .content-image {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem auto;
    display: block;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .image-wrapper {
    position: relative;
    width: 100%;
    margin: 1.5rem 0;
    overflow: hidden;
    border-radius: 0.5rem;
  }
  
  .image-wrapper img {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 600px;
  }
`;