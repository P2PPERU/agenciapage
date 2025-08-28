// src/components/editor/TextBubbleMenu.jsx - IMPORTACIÓN CORREGIDA
import React from 'react';
import { BubbleMenu } from '@tiptap/extension-bubble-menu'; // ✅ Importación correcta
import {
  FaBold, FaItalic, FaStrikethrough,
  FaLink, FaHighlighter, FaQuoteLeft
} from 'react-icons/fa';

const TextBubbleMenu = ({ editor }) => {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ 
        duration: 100,
        placement: 'top'
      }}
      shouldShow={({ editor, from, to }) => {
        // Solo mostrar para texto seleccionado, no para imágenes
        return from !== to && !editor.isActive('image');
      }}
      className="text-bubble-menu"
    >
      <div className="bubble-menu-content">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`bubble-button ${editor.isActive('bold') ? 'is-active' : ''}`}
          title="Negrita"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`bubble-button ${editor.isActive('italic') ? 'is-active' : ''}`}
          title="Cursiva"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`bubble-button ${editor.isActive('strike') ? 'is-active' : ''}`}
          title="Tachado"
        >
          <FaStrikethrough />
        </button>
        <div className="menu-divider" />
        <button
          onClick={() => {
            const url = window.prompt('URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`bubble-button ${editor.isActive('link') ? 'is-active' : ''}`}
          title="Enlace"
        >
          <FaLink />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`bubble-button ${editor.isActive('highlight') ? 'is-active' : ''}`}
          title="Resaltar"
        >
          <FaHighlighter />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`bubble-button ${editor.isActive('blockquote') ? 'is-active' : ''}`}
          title="Cita"
        >
          <FaQuoteLeft />
        </button>
      </div>
    </BubbleMenu>
  );
};

export default TextBubbleMenu;