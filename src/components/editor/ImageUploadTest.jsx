// src/components/editor/ImageUploadTest.jsx - COMPONENTE DE PRUEBA
import React, { useState } from 'react';

const ImageUploadTest = ({ token, API_URL }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const testImageUpload = async (file) => {
    console.log('🧪 Test: Iniciando subida de imagen:', file.name);
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      console.log('🧪 Test: Enviando a:', `${API_URL}/admin/upload-image`);
      console.log('🧪 Test: Token:', token ? 'Presente' : 'Ausente');

      const response = await fetch(`${API_URL}/admin/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log('🧪 Test: Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('🧪 Test: Response data:', data);

      if (data.success) {
        const fullUrl = data.fullUrl || `${API_URL.replace('/api', '')}${data.url}`;
        console.log('🧪 Test: Imagen subida exitosamente:', fullUrl);
        setUploadedImage(fullUrl);
      } else {
        throw new Error('Respuesta sin éxito del servidor');
      }
    } catch (error) {
      console.error('🧪 Test: Error al subir imagen:', error);
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      testImageUpload(file);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-blue-500">
      <h3 className="text-white mb-3">🧪 Test de Subida de Imágenes</h3>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-3 text-white"
        disabled={isUploading}
      />

      {isUploading && (
        <div className="text-yellow-400 mb-3">
          ⏳ Subiendo imagen...
        </div>
      )}

      {error && (
        <div className="text-red-400 mb-3 text-sm">
          ❌ Error: {error}
        </div>
      )}

      {uploadedImage && (
        <div className="space-y-3">
          <div className="text-green-400">
            ✅ Imagen subida exitosamente
          </div>
          
          <div className="text-xs text-gray-400 break-all">
            URL: {uploadedImage}
          </div>
          
          <div>
            <img 
              src={uploadedImage} 
              alt="Test upload" 
              className="max-w-sm h-auto border border-gray-600 rounded"
              onLoad={() => console.log('🧪 Test: Imagen cargada en DOM')}
              onError={(e) => {
                console.error('🧪 Test: Error cargando imagen:', e);
                console.error('🧪 Test: URL que falló:', uploadedImage);
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500">
        Este componente prueba la subida de imágenes directamente.
        Revisa la consola para logs detallados.
      </div>
    </div>
  );
};

export default ImageUploadTest;