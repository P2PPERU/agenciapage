// src/components/editor/TipTapEditor.jsx - VERSIÓN FUNCIONAL SIMPLIFICADA
import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
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
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link,
      Youtube,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      handleDrop: (view, event) => {
        const file = event.dataTransfer?.files?.[0];
        if (file?.type.startsWith('image/')) {
          handleImageUpload(file);
          return true;
        }
        return false;
      },
    },
  });

  const handleImageUpload = async (file) => {
    if (onImageUpload) {
      const url = await onImageUpload(file);
      if (url && editor) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
  };

  const insertImage = useCallback((url) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const insertYouTube = useCallback((url) => {
    if (editor) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  }, [editor]);

  const insertLink = useCallback((url) => {
    if (editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return <div>Cargando editor...</div>;
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
    </div>
  );
};

export default TipTapEditor;