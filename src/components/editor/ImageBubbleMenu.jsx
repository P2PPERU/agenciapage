// src/components/editor/ImageBubbleMenu.jsx - VERSIÓN CORREGIDA
import React, { useState } from 'react';
import { BubbleMenu } from '@tiptap/react';
import {
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaExpand, FaCompress, FaTrash
} from 'react-icons/fa';

const ImageBubbleMenu = ({ editor }) => {
  const [imageSize, setImageSize] = useState('medium');
  
  if (!editor) return null;

  const setImageAlignment = (align) => {
    editor.chain().focus().updateAttributes('image', { 
      align,
      style: getImageStyle(align, imageSize)
    }).run();
  };

  const setImageWidth = (size) => {
    setImageSize(size);
    const align = editor.getAttributes('image').align || 'center';
    editor.chain().focus().updateAttributes('image', {
      style: getImageStyle(align, size)
    }).run();
  };

  const getImageStyle = (align, size) => {
    let width = '100%';
    let float = 'none';
    let margin = '1rem auto';
    
    switch(size) {
      case 'small':
        width = '33%';
        break;
      case 'medium':
        width = '66%';
        break;
      case 'large':
        width = '100%';
        break;
    }
    
    switch(align) {
      case 'left':
        float = 'left';
        margin = '0.5rem 1rem 0.5rem 0';
        if (size === 'large') width = '50%';
        break;
      case 'right':
        float = 'right';
        margin = '0.5rem 0 0.5rem 1rem';
        if (size === 'large') width = '50%';
        break;
      case 'center':
        float = 'none';
        margin = '1rem auto';
        break;
    }
    
    return `width: ${width}; float: ${float}; margin: ${margin}; display: block;`;
  };

  const deleteImage = () => {
    editor.chain().focus().deleteSelection().run();
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ 
        duration: 100,
        placement: 'top'
      }}
      shouldShow={({ editor }) => {
        return editor.isActive('image');
      }}
      className="image-bubble-menu"
    >
      <div className="bubble-menu-content">
        {/* Alineación */}
        <div className="menu-group">
          <button
            onClick={() => setImageAlignment('left')}
            className="bubble-button"
            title="Alinear izquierda con texto alrededor"
          >
            <FaAlignLeft />
          </button>
          <button
            onClick={() => setImageAlignment('center')}
            className="bubble-button"
            title="Centrar imagen"
          >
            <FaAlignCenter />
          </button>
          <button
            onClick={() => setImageAlignment('right')}
            className="bubble-button"
            title="Alinear derecha con texto alrededor"
          >
            <FaAlignRight />
          </button>
        </div>

        {/* Tamaño */}
        <div className="menu-group">
          <button
            onClick={() => setImageWidth('small')}
            className={`bubble-button ${imageSize === 'small' ? 'is-active' : ''}`}
            title="Pequeña (33%)"
          >
            S
          </button>
          <button
            onClick={() => setImageWidth('medium')}
            className={`bubble-button ${imageSize === 'medium' ? 'is-active' : ''}`}
            title="Mediana (66%)"
          >
            M
          </button>
          <button
            onClick={() => setImageWidth('large')}
            className={`bubble-button ${imageSize === 'large' ? 'is-active' : ''}`}
            title="Grande (100%)"
          >
            L
          </button>
        </div>

        {/* Acciones */}
        <div className="menu-group">
          <button
            onClick={deleteImage}
            className="bubble-button bubble-button-danger"
            title="Eliminar imagen"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </BubbleMenu>
  );
};

export default ImageBubbleMenu;