// src/pages/AdminPanel.jsx - VERSIÓN SIMPLIFICADA
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaNewspaper, FaUsers, FaChartLine, FaDollarSign 
} from 'react-icons/fa';

// Importar componentes subdivididos
import AdminHeader from '../components/admin/AdminHeader';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import NewsEditor from '../components/admin/NewsEditor';
import NewsList from '../components/admin/NewsList';
import UsersManager from '../components/admin/UsersManager';
import RakeManager from '../components/admin/RakeManager';
import AdminTabs from '../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [editorMode, setEditorMode] = useState('list');
  const [editingNews, setEditingNews] = useState(null);
  
  // Estados de datos
  const [stats, setStats] = useState({
    totalNews: 0,
    totalUsers: 0,
    totalRake: 0,
    totalBonusReleased: 0
  });
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);

  // Check authentication
  useEffect(() => {
    const storedToken = sessionStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // API Helper
  const apiCall = async (endpoint, options = {}) => {
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
        throw new Error(`Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Fetch functions
  const fetchStats = async () => {
    try {
      const data = await apiCall('/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const data = await apiCall('/news');
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await apiCall('/admin/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    if (!isAuthenticated) return;
    
    switch(activeTab) {
      case 'news':
        fetchNews();
        break;
      case 'users':
      case 'rake':
        fetchUsers();
        break;
      case 'dashboard':
      default:
        fetchStats();
    }
  }, [activeTab, isAuthenticated]);

  // Handlers
  const handleLogin = async (loginData) => {
    setLoading(true);
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData)
      });
      
      sessionStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      fetchStats();
    } catch (error) {
      alert('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setToken('');
    setIsAuthenticated(false);
  };

  const handleSaveNews = async (formData, editingItem) => {
    const endpoint = editingItem 
      ? `/admin/news-rich/${editingItem.id}` 
      : '/admin/news-rich';
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: editingItem ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (response.ok) {
      alert(editingItem ? 'Noticia actualizada' : 'Noticia creada');
      setEditorMode('list');
      setEditingNews(null);
      fetchNews();
    } else {
      throw new Error('Error al guardar');
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      await apiCall(`/admin/news/${id}`, { method: 'DELETE' });
      fetchNews();
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  const handleEditNews = (item) => {
    setEditingNews(item);
    setEditorMode('editor');
  };

  const handleViewNews = (item) => {
    window.open(`/noticias/${item.slug}`, '_blank');
  };

  // Login Screen
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} loading={loading} />;
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <AdminHeader onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-6">
        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <AnimatePresence mode="wait">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <AdminDashboard stats={stats} />
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {editorMode === 'list' ? (
                <>
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => {
                        setEditorMode('editor');
                        setEditingNews(null);
                      }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-6 py-3 rounded-lg flex items-center gap-2"
                    >
                      <FaNewspaper />
                      Nueva Noticia
                    </button>
                  </div>
                  <NewsList 
                    news={news}
                    onEdit={handleEditNews}
                    onDelete={handleDeleteNews}
                    onView={handleViewNews}
                  />
                </>
              ) : (
                <NewsEditor
                  editingNews={editingNews}
                  onSave={handleSaveNews}
                  onCancel={() => {
                    setEditorMode('list');
                    setEditingNews(null);
                  }}
                  token={token}
                  API_URL={API_URL}
                />
              )}
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <UsersManager 
              users={users}
              onReload={fetchUsers}
              apiCall={apiCall}
            />
          )}

          {/* Rake Tab */}
          {activeTab === 'rake' && (
            <RakeManager
              users={users}
              onReload={fetchUsers}
              apiCall={apiCall}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPanel;