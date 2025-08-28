// src/components/editor/EditorErrorBoundary.jsx
import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

class EditorErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Editor Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-gray-800 rounded-xl p-6 border border-red-500/30">
          <div className="text-center">
            <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Error en el Editor</h2>
            <p className="text-gray-400 mb-4">
              Hubo un problema al cargar el editor. Esto puede deberse a extensiones duplicadas o problemas de montaje.
            </p>
            
            <div className="bg-gray-900 p-4 rounded-lg mb-4 text-left">
              <p className="text-red-400 text-sm font-mono">
                {this.state.error?.message || 'Error desconocido'}
              </p>
            </div>
            
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="bg-poker-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition flex items-center gap-2"
              >
                <FaRedo />
                Reintentar
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Recargar Página
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <p>Si el problema persiste:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Verifica que no hay extensiones duplicadas</li>
                <li>Comprueba la consola del navegador</li>
                <li>Reinicia el servidor de desarrollo</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default EditorErrorBoundary;