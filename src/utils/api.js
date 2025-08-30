// src/utils/api.js - Helper actualizado para producción
const isDevelopment = import.meta.env.DEV;
const baseUrl = isDevelopment ? 'http://localhost:5000' : 'https://pokerprotrack.com';

export const API_URL = import.meta.env.VITE_API_URL || `${baseUrl}/api`;
export const BASE_URL = baseUrl;

// Helper para construir URLs de imágenes
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Si ya es una URL completa, devolverla tal como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Si es una ruta relativa, construir URL completa
  if (imagePath.startsWith('/')) {
    return `${BASE_URL}${imagePath}`;
  }
  
  // Fallback
  return `${BASE_URL}/${imagePath}`;
};

// Helper para hacer llamadas a la API
export const apiCall = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem('adminToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: options.body instanceof FormData 
        ? { 'Authorization': `Bearer ${token}` } 
        : headers
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Debug helper
export const debugApiConfig = () => {
  console.log('API Configuration:', {
    isDevelopment,
    API_URL,
    BASE_URL,
    ENV_API_URL: import.meta.env.VITE_API_URL
  });
};