// src/pages/AdminPanel.jsx - VERSIÓN ACTUALIZADA CON NUEVAS FUNCIONALIDADES
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaNewspaper, 
  FaUsers, 
  FaChartLine, 
  FaDollarSign,
  FaBullseye,
  FaGift,
  FaEdit,
  FaAward,
  FaRocket
} from 'react-icons/fa';

// Importar componentes existentes
import AdminHeader from '../components/admin/AdminHeader';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import NewsEditor from '../components/admin/NewsEditor';
import NewsList from '../components/admin/NewsList';
import UsersManager from '../components/admin/UsersManager';
import RakeManager from '../components/admin/RakeManager';
import GoalsManager from '../components/admin/GoalsManager';
import GiftsManager from '../components/admin/GiftsManager';
import UserEditor from '../components/admin/UserEditor';

// Importar NUEVOS componentes
import MultipleBonusesManager from '../components/admin/MultipleBonusesManager';
import ConditionalGiftsManager from '../components/admin/ConditionalGiftsManager';
import EnhancedUserSearch from '../components/admin/EnhancedUserSearch';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [editorMode, setEditorMode] = useState('list');
  const [editingNews, setEditingNews] = useState(null);
  
  // Estados de datos expandidos
  const [stats, setStats] = useState({
    totalNews: 0,
    totalUsers: 0,
    totalRake: 0,
    totalBonusReleased: 0,
    activeGoals: 0,
    activeGifts: 0,
    totalMilestones: 0,
    // NUEVAS estadísticas
    activeConditionalGifts: 0,
    activeBonuses: 0,
    completedBonuses: 0
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

  // API Helper mejorado para nuevos endpoints
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

  // Fetch functions mejoradas
  const fetchStats = async () => {
    try {
      // Usar el nuevo endpoint de estadísticas mejoradas
      const data = await apiCall('/admin/stats-improved');
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback al endpoint anterior si el nuevo no existe
      try {
        const fallbackData = await apiCall('/admin/stats');
        setStats({ ...fallbackData, activeConditionalGifts: 0, activeBonuses: 0, completedBonuses: 0 });
      } catch (fallbackError) {
        console.error('Error fetching fallback stats:', fallbackError);
      }
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
      case 'edit-users':
      case 'gifts':
      case 'goals':
      case 'multi-bonuses': // NUEVO
      case 'conditional-gifts': // NUEVO
        fetchUsers();
        break;
      case 'dashboard':
      default:
        fetchStats();
    }
  }, [activeTab, isAuthenticated]);

  // Handlers existentes
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

  const handleReloadUsers = () => {
    fetchUsers();
    fetchStats();
  };

  // NUEVAS pestañas con iconos y descripciones
  const tabs = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: FaChartLine, 
      description: 'Resumen general del sistema'
    },
    { 
      id: 'news', 
      name: 'Noticias', 
      icon: FaNewspaper, 
      description: 'Gestión de contenido'
    },
    { 
      id: 'users', 
      name: 'Usuarios', 
      icon: FaUsers, 
      description: 'Crear nuevos usuarios'
    },
    { 
      id: 'edit-users', 
      name: 'Editar Usuarios', 
      icon: FaEdit, 
      description: 'Modificar datos existentes'
    },
    { 
      id: 'multi-bonuses', 
      name: 'Bonos Múltiples', 
      icon: FaAward, 
      description: 'Segundos y terceros bonos',
      isNew: true
    },
    { 
      id: 'rake', 
      name: 'Rake', 
      icon: FaDollarSign, 
      description: 'Agregar rake manual'
    },
    { 
      id: 'conditional-gifts', 
      name: 'Regalos Dinámicos', 
      icon: FaRocket, 
      description: 'Regalos automáticos por objetivos',
      isNew: true
    },
    { 
      id: 'gifts', 
      name: 'Regalos', 
      icon: FaGift, 
      description: 'Regalos manuales del admin'
    },
    { 
      id: 'goals', 
      name: 'Metas', 
      icon: FaBullseye, 
      description: 'Objetivos personalizados'
    }
  ];

  // Login Screen
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} loading={loading} />;
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <AdminHeader onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-6">
        {/* NUEVO sistema de pestañas mejorado */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                title={tab.description}
              >
                <tab.icon />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                {tab.isNew && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded-full animate-pulse">
                    NEW
                  </span>
                )}
              </button>
            ))}
          </div>
          
          {/* Descripción de la pestaña activa */}
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-sm text-gray-400">
              <strong className="text-white">{tabs.find(t => t.id === activeTab)?.name}:</strong>{' '}
              {tabs.find(t => t.id === activeTab)?.description}
            </p>
          </div>
        </div>
        
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
              onReload={handleReloadUsers}
              apiCall={apiCall}
            />
          )}

          {/* Edit Users Tab con búsqueda mejorada */}
          {activeTab === 'edit-users' && (
            <motion.div
              key="edit-users"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UserEditor 
                users={users}
                apiCall={apiCall}
                onReload={handleReloadUsers}
                // Pasar el componente de búsqueda mejorada
                SearchComponent={EnhancedUserSearch}
              />
            </motion.div>
          )}

          {/* NUEVA Tab: Bonos Múltiples */}
          {activeTab === 'multi-bonuses' && (
            <motion.div
              key="multi-bonuses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MultipleBonusesManager 
                users={users}
                apiCall={apiCall}
              />
            </motion.div>
          )}

          {/* Rake Tab */}
          {activeTab === 'rake' && (
            <RakeManager
              users={users}
              onReload={handleReloadUsers}
              apiCall={apiCall}
            />
          )}

          {/* NUEVA Tab: Regalos Condicionales/Dinámicos */}
          {activeTab === 'conditional-gifts' && (
            <motion.div
              key="conditional-gifts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ConditionalGiftsManager 
                users={users}
                apiCall={apiCall}
              />
            </motion.div>
          )}

          {/* Gifts Tab */}
          {activeTab === 'gifts' && (
            <motion.div
              key="gifts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GiftsManager 
                users={users}
                apiCall={apiCall}
              />
            </motion.div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GoalsManager 
                users={users}
                apiCall={apiCall}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Estadísticas rápidas en el footer del admin */}
        <div className="mt-8 bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">Estadísticas Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.totalUsers}</div>
              <div className="text-gray-400">Usuarios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">S/{stats.totalRake?.toFixed(0)}</div>
              <div className="text-gray-400">Rake Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.activeBonuses || 0}</div>
              <div className="text-gray-400">Bonos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.activeConditionalGifts || 0}</div>
              <div className="text-gray-400">Regalos Dinámicos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{stats.activeGifts || 0}</div>
              <div className="text-gray-400">Regalos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.activeGoals || 0}</div>
              <div className="text-gray-400">Metas Activas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;