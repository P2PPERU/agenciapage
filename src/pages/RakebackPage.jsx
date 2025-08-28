import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaDollarSign, 
  FaTrophy, 
  FaBullseye,
  FaChartLine,
  FaGift,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaHistory,
  FaTicketAlt,
  FaCoins
} from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api';
const RAKE_MILESTONE = 50; // Nuevo sistema: cada 50 soles
const MILESTONE_BONUS = 30; // Libera 30 soles

const RakebackPage = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const handleSearch = async () => {
    if (!username.trim()) {
      setError('Por favor ingresa tu username');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Obtener datos del usuario y transacciones
      const response = await fetch(`${API_URL}/rakeback/${username}`);
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }
      
      const data = await response.json();
      setUserData(data.user);
      setTransactions(data.transactions || []);

      // Obtener metas del usuario
      const goalsResponse = await fetch(`${API_URL}/goals/${data.user.id}`);
      if (goalsResponse.ok) {
        const goalsData = await goalsResponse.json();
        setGoals(goalsData);
      }

      // Obtener hitos del usuario
      const milestonesResponse = await fetch(`${API_URL}/milestones/${data.user.id}`);
      if (milestonesResponse.ok) {
        const milestonesData = await milestonesResponse.json();
        setMilestones(milestonesData);
      }

      // Obtener regalos del usuario
      const giftsResponse = await fetch(`${API_URL}/gifts/${data.user.id}`);
      if (giftsResponse.ok) {
        const giftsData = await giftsResponse.json();
        setGifts(giftsData);
      }

    } catch (err) {
      setError(err.message);
      setUserData(null);
      setTransactions([]);
      setGoals([]);
      setMilestones([]);
      setGifts([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (!userData) return 0;
    return Math.min((userData.bonus_released / userData.bonus_amount) * 100, 100);
  };

  const calculateRemainingBonus = () => {
    if (!userData) return 0;
    return Math.max(userData.bonus_amount - userData.bonus_released, 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-green-400';
      case 'in_progress': return 'text-yellow-400';
      case 'resolved': return 'text-blue-400';
      case 'closed': return 'text-gray-400';
      case 'active': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const calculateGoalProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  // Funciones para regalos
  const getGiftTypeIcon = (type) => {
    switch (type) {
      case 'ticket': return <FaTicketAlt className="text-blue-400" />;
      case 'bonus': return <FaDollarSign className="text-green-400" />;
      case 'tournament': return <FaTrophy className="text-yellow-400" />;
      case 'freeroll': return <FaGift className="text-purple-400" />;
      default: return <FaGift className="text-pink-400" />;
    }
  };

  const getGiftTypeLabel = (type) => {
    switch (type) {
      case 'ticket': return 'Ticket de Torneo';
      case 'bonus': return 'Bono Extra';
      case 'tournament': return 'Entrada Torneo';
      case 'freeroll': return 'Freeroll';
      case 'cashback': return 'Cashback';
      default: return 'Otro';
    }
  };

  const getGiftStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'claimed': return 'bg-blue-600 text-white';
      case 'expired': return 'bg-gray-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  // Reclamar regalo
  const handleClaimGift = async (giftId) => {
    try {
      const response = await fetch(`${API_URL}/gifts/${giftId}/claim`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert('Regalo reclamado exitosamente');
        
        // Recargar regalos
        const giftsResponse = await fetch(`${API_URL}/gifts/${userData.id}`);
        if (giftsResponse.ok) {
          const giftsData = await giftsResponse.json();
          setGifts(giftsData);
        }
      } else {
        throw new Error('Error al reclamar regalo');
      }
    } catch (error) {
      alert('Error al reclamar el regalo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-6xl opacity-10">♠</div>
          <div className="absolute top-40 right-20 text-6xl opacity-10">♥</div>
          <div className="absolute bottom-20 left-1/2 text-6xl opacity-10">♦</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-10">♣</div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              SISTEMA <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">RAKEBACK</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Consulta tu progreso, metas y bonificaciones liberadas
            </p>
            
            {/* Search Box */}
            {!userData && (
              <div className="max-w-md mx-auto">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
                  <div className="mb-4">
                    <label className="text-gray-400 text-sm mb-2 block">Ingresa tu username</label>
                    <input
                      type="text"
                      placeholder="@tunombre"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition disabled:opacity-50"
                  >
                    {loading ? 'Buscando...' : 'Acceder a mi Dashboard'}
                  </motion.button>
                  
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-sm mt-3"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Dashboard Content */}
      <AnimatePresence>
        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="container mx-auto px-4 py-8"
          >
            {/* User Header */}
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-poker-gold p-3 rounded-full">
                    <FaUser className="text-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">@{userData.username}</h2>
                    <p className="text-gray-400">{userData.email}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-400">Rakeback</p>
                  <p className="text-2xl font-bold text-yellow-400">{userData.rakeback_percentage}%</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-gray-800 rounded-xl p-2 mb-8 flex flex-wrap gap-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
                { id: 'milestones', label: 'Hitos', icon: FaTrophy },
                { id: 'goals', label: 'Metas', icon: FaBullseye },
                { id: 'gifts', label: 'Regalos', icon: FaGift },
                { id: 'history', label: 'Historial', icon: FaHistory }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-poker-gold text-black'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Main Stats Card */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 mb-8">
                    {/* Progreso del Ciclo Actual */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-4">Ciclo Actual de Rake</h3>
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progreso hacia el próximo hito</span>
                        <span>S/{(userData.current_rake_cycle || 0).toFixed(2)} / S/{RAKE_MILESTONE}</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-6 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(((userData.current_rake_cycle || 0) / RAKE_MILESTONE) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center"
                        >
                          <span className="text-xs text-white font-semibold px-2">
                            {(((userData.current_rake_cycle || 0) / RAKE_MILESTONE) * 100).toFixed(1)}%
                          </span>
                        </motion.div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        Faltan <span className="font-bold text-blue-400">S/{(RAKE_MILESTONE - (userData.current_rake_cycle || 0)).toFixed(2)}</span> para liberar <span className="font-bold text-green-400">S/{MILESTONE_BONUS}</span>
                      </p>
                    </div>

                    {/* Progress Bar del Bono Total */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progreso del Bono Total</span>
                        <span>{calculateProgress().toFixed(1)}%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-6 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${calculateProgress()}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center"
                        >
                          <span className="text-xs text-white font-semibold px-2">
                            S/{userData.bonus_released.toFixed(2)} / S/{userData.bonus_amount.toFixed(2)}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-700/50 rounded-xl p-4"
                      >
                        <FaDollarSign className="text-blue-400 mb-2" />
                        <p className="text-gray-400 text-sm mb-1">Depósito Inicial</p>
                        <p className="text-2xl font-bold text-white">S/{userData.initial_deposit}</p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-700/50 rounded-xl p-4"
                      >
                        <FaGift className="text-yellow-400 mb-2" />
                        <p className="text-gray-400 text-sm mb-1">Bono Total</p>
                        <p className="text-2xl font-bold text-yellow-400">S/{userData.bonus_amount}</p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-700/50 rounded-xl p-4"
                      >
                        <FaCheck className="text-green-400 mb-2" />
                        <p className="text-gray-400 text-sm mb-1">Liberado</p>
                        <p className="text-2xl font-bold text-green-400">S/{userData.bonus_released.toFixed(2)}</p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gray-700/50 rounded-xl p-4"
                      >
                        <FaTrophy className="text-purple-400 mb-2" />
                        <p className="text-gray-400 text-sm mb-1">Hitos Logrados</p>
                        <p className="text-2xl font-bold text-purple-400">{userData.total_milestones || 0}</p>
                      </motion.div>
                    </div>

                    {/* Rake Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-800/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Rake Total Generado</p>
                          <p className="text-3xl font-bold text-blue-400">S/{userData.total_rake.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Bono Restante</p>
                          <p className="text-xl font-semibold text-orange-400">S/{calculateRemainingBonus().toFixed(2)}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Quick Stats sin tickets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FaBullseye className="text-purple-400" />
                        Metas
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Activas:</span>
                          <span className="text-blue-400 font-bold">
                            {goals.filter(g => g.status === 'active').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Completadas:</span>
                          <span className="text-green-400 font-bold">
                            {goals.filter(g => g.status === 'completed').length}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FaTrophy className="text-yellow-400" />
                        Sistema de Hitos
                      </h3>
                      <div className="space-y-2">
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Cada S/{RAKE_MILESTONE} liberas</p>
                          <p className="text-lg font-bold text-green-400">S/{MILESTONE_BONUS}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'milestones' && (
                <motion.div
                  key="milestones"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <FaTrophy className="text-yellow-400" />
                      Historial de Hitos
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-900/30 to-blue-700/30 border border-blue-600 rounded-lg p-4">
                        <h4 className="text-blue-400 font-semibold mb-2">Sistema de Hitos</h4>
                        <p className="text-sm text-gray-300">
                          Cada S/{RAKE_MILESTONE} de rake generado liberas S/{MILESTONE_BONUS} de bono
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-700/30 border border-yellow-600 rounded-lg p-4">
                        <h4 className="text-yellow-400 font-semibold mb-2">Hitos Completados</h4>
                        <p className="text-2xl font-bold text-white">{userData.total_milestones || 0}</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-900/30 to-green-700/30 border border-green-600 rounded-lg p-4">
                        <h4 className="text-green-400 font-semibold mb-2">Total Liberado</h4>
                        <p className="text-2xl font-bold text-white">
                          S/{((userData.total_milestones || 0) * MILESTONE_BONUS).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {milestones.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          Aún no has completado ningún hito
                        </div>
                      ) : (
                        milestones.map((milestone, index) => (
                          <motion.div
                            key={milestone.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="bg-yellow-600 p-2 rounded-full">
                                <FaTrophy className="text-white" />
                              </div>
                              <div>
                                <p className="text-white font-semibold">
                                  Hito #{Math.floor(milestone.milestone_amount / RAKE_MILESTONE)}
                                </p>
                                <p className="text-sm text-gray-400">
                                  Rake acumulado: S/{milestone.milestone_amount.toFixed(2)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(milestone.reached_at)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-green-400 font-bold">
                                +S/{milestone.bonus_released.toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-400">Liberado</p>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'goals' && (
                <motion.div
                  key="goals"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <FaBullseye className="text-purple-400" />
                      Mis Metas
                    </h3>
                    
                    <div className="space-y-4">
                      {goals.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          No tienes metas asignadas aún
                        </div>
                      ) : (
                        goals.map((goal, index) => (
                          <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-700 rounded-lg p-6"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-xl font-semibold text-white mb-2">{goal.title}</h4>
                                {goal.description && (
                                  <p className="text-gray-400 mb-3">{goal.description}</p>
                                )}
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <FaCalendarAlt />
                                    {goal.deadline ? new Date(goal.deadline).toLocaleDateString('es-ES') : 'Sin límite'}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <FaGift />
                                    Recompensa: S/{goal.reward_amount} ({goal.reward_type})
                                  </span>
                                </div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(goal.status)}`}>
                                {goal.status === 'active' ? 'Activa' : goal.status === 'completed' ? 'Completada' : goal.status}
                              </span>
                            </div>

                            {/* Barra de progreso */}
                            <div className="mb-4">
                              <div className="flex justify-between text-sm text-gray-400 mb-2">
                                <span>Progreso</span>
                                <span>S/{goal.current_progress.toFixed(2)} / S/{goal.target_amount.toFixed(2)}</span>
                              </div>
                              <div className="bg-gray-600 rounded-full h-4 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${calculateGoalProgress(goal.current_progress, goal.target_amount)}%` }}
                                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center"
                                >
                                  <span className="text-xs text-white font-bold px-2">
                                    {calculateGoalProgress(goal.current_progress, goal.target_amount).toFixed(1)}%
                                  </span>
                                </motion.div>
                              </div>
                            </div>

                            {goal.status === 'completed' && (
                              <div className="bg-green-900/30 border border-green-600 rounded-lg p-3">
                                <p className="text-green-400 font-semibold flex items-center gap-2">
                                  <FaCheck />
                                  ¡Meta completada! Recompensa otorgada: S/{goal.reward_amount}
                                </p>
                              </div>
                            )}
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'gifts' && (
                <motion.div
                  key="gifts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <FaGift className="text-pink-400" />
                      Mis Regalos
                    </h3>

                    {/* Estadísticas de regalos */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gradient-to-r from-green-900/30 to-green-700/30 border border-green-600 rounded-lg p-4">
                        <h4 className="text-green-400 font-semibold mb-2">Total Regalos</h4>
                        <p className="text-2xl font-bold text-white">{gifts.length}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-900/30 to-blue-700/30 border border-blue-600 rounded-lg p-4">
                        <h4 className="text-blue-400 font-semibold mb-2">Disponibles</h4>
                        <p className="text-2xl font-bold text-white">
                          {gifts.filter(g => g.status === 'active').length}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-900/30 to-purple-700/30 border border-purple-600 rounded-lg p-4">
                        <h4 className="text-purple-400 font-semibold mb-2">Reclamados</h4>
                        <p className="text-2xl font-bold text-white">
                          {gifts.filter(g => g.status === 'claimed').length}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-700/30 border border-yellow-600 rounded-lg p-4">
                        <h4 className="text-yellow-400 font-semibold mb-2">Valor Total</h4>
                        <p className="text-2xl font-bold text-white">
                          S/{gifts.reduce((sum, g) => sum + parseFloat(g.gift_value), 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {gifts.length === 0 ? (
                        <div className="text-center py-12">
                          <FaGift className="text-6xl text-gray-400 mx-auto mb-4" />
                          <h4 className="text-xl font-semibold text-gray-300 mb-2">
                            No tienes regalos aún
                          </h4>
                          <p className="text-gray-400">
                            Los regalos del administrador aparecerán aquí
                          </p>
                        </div>
                      ) : (
                        gifts.map((gift, index) => (
                          <motion.div
                            key={gift.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-6 border border-gray-600"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="text-3xl">
                                  {getGiftTypeIcon(gift.gift_type)}
                                </div>
                                <div>
                                  <h4 className="text-xl font-semibold text-white mb-1">
                                    {gift.title}
                                  </h4>
                                  <p className="text-sm text-gray-400">
                                    {getGiftTypeLabel(gift.gift_type)}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Recibido: {formatDate(gift.created_at)}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-400 mb-2">
                                  S/{gift.gift_value}
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGiftStatusColor(gift.status)}`}>
                                  {gift.status === 'active' ? 'Disponible' : 
                                   gift.status === 'claimed' ? 'Reclamado' : gift.status}
                                </span>
                              </div>
                            </div>
                            
                            {gift.description && (
                              <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                                <p className="text-gray-300 text-sm">{gift.description}</p>
                              </div>
                            )}

                            {gift.status === 'active' && (
                              <div className="flex justify-end">
                                <button
                                  onClick={() => handleClaimGift(gift.id)}
                                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition"
                                >
                                  <FaCheck />
                                  Reclamar Regalo
                                </button>
                              </div>
                            )}

                            {gift.status === 'claimed' && gift.claimed_at && (
                              <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-3">
                                <p className="text-blue-400 text-sm flex items-center gap-2">
                                  <FaCheck />
                                  Reclamado el {formatDate(gift.claimed_at)}
                                </p>
                              </div>
                            )}
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="bg-gray-800 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <FaHistory className="text-blue-400" />
                      Historial de Transacciones
                    </h3>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {transactions.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          No hay transacciones registradas
                        </div>
                      ) : (
                        transactions.map((transaction, index) => (
                          <motion.div
                            key={transaction.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.05 }}
                            className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                          >
                            <div className="flex-1">
                              <p className="text-white font-semibold">
                                Rake: S/{transaction.amount.toFixed(2)}
                              </p>
                              {transaction.description && (
                                <p className="text-sm text-gray-400">{transaction.description}</p>
                              )}
                              <p className="text-xs text-gray-500">
                                {formatDate(transaction.created_at)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-400">Bono liberado</p>
                              <p className="text-lg font-bold text-green-400">
                                +S/{transaction.bonus_released.toFixed(2)}
                              </p>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Section - Solo se muestra cuando no hay usuario */}
      {!userData && (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">Sistema de Hitos</h3>
              <p className="text-gray-400">Cada S/{RAKE_MILESTONE} de rake libera S/{MILESTONE_BONUS} de bono automáticamente</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Metas Personalizadas</h3>
              <p className="text-gray-400">Completa objetivos específicos y gana recompensas extra</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-4">🎫</div>
              <h3 className="text-xl font-bold text-white mb-2">Soporte Directo</h3>
              <p className="text-gray-400">Envía tickets y recibe respuestas directas del equipo</p>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RakebackPage;