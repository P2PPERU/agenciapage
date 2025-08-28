// src/components/editor/CustomImage.js - Extensión personalizada de imagen
import Image from '@tiptap/extension-image';

const CustomImage = Image.extend({
  name: 'customImage',
  
  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
        parseHTML: element => element.getAttribute('src'),
        renderHTML: attributes => {
          if (!attributes.src) return {};
          return { src: attributes.src };
        },
      },
      alt: {
        default: null,
        parseHTML: element => element.getAttribute('alt'),
        renderHTML: attributes => {
          if (!attributes.alt) return {};
          return { alt: attributes.alt };
        },
      },
      size: {
        default: 'medium',
        parseHTML: element => element.getAttribute('data-size') || 'medium',
        renderHTML: attributes => {
          return { 'data-size': attributes.size };
        },
      },
      align: {
        default: 'center',
        parseHTML: element => element.getAttribute('data-align') || 'center',
        renderHTML: attributes => {
          return { 'data-align': attributes.align };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      
      setImageSize: (size) => ({ commands }) => {
        return commands.updateAttributes(this.name, { size });
      },
      
      setImageAlignment: (align) => ({ commands }) => {
        return commands.updateAttributes(this.name, { align });
      },
      
      insertImageWithAttributes: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {
            src: options.src,
            alt: options.alt || '',
            size: options.size || 'medium',
            align: options.align || 'center'
          }
        });
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    // Construir clases CSS basadas en los atributos
    const size = HTMLAttributes['data-size'] || 'medium';
    const align = HTMLAttributes['data-align'] || 'center';
    
    const classes = [`image-size-${size}`, `image-align-${align}`];
    
    return ['img', {
      ...HTMLAttributes,
      class: classes.join(' '),
    }];
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: element => {
          return {
            src: element.getAttribute('src'),
            alt: element.getAttribute('alt'),
            size: element.getAttribute('data-size') || 'medium',
            align: element.getAttribute('data-align') || 'center',
          };
        },
      },
    ];
  },
});

export default CustomImage;