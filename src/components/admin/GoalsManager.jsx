// src/components/admin/GoalsManager.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBullseye, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaTrophy,
  FaCalendarAlt,
  FaUser,
  FaDollarSign,
  FaGift,
  FaChartLine,
  FaCheck,
  FaClock
} from 'react-icons/fa';

const GoalsManager = ({ users, apiCall }) => {
  const [goals, setGoals] = useState([]);
  const [goalForm, setGoalForm] = useState({
    user_id: '',
    title: '',
    description: '',
    target_amount: '',
    reward_amount: '',
    reward_type: 'bonus',
    deadline: ''
  });
  const [editingGoal, setEditingGoal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  // Cargar metas
  const loadGoals = async (userId = '') => {
    try {
      const endpoint = userId ? `/goals/${userId}` : '/goals/all';
      const response = await apiCall(endpoint);
      setGoals(response);
    } catch (error) {
      console.error('Error cargando metas:', error);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      loadGoals(selectedUserId);
    }
  }, [selectedUserId]);

  // Crear meta
  const handleCreateGoal = async () => {
    if (!goalForm.user_id || !goalForm.title || !goalForm.target_amount) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      await apiCall('/admin/goals', {
        method: 'POST',
        body: JSON.stringify(goalForm)
      });
      
      alert('Meta creada exitosamente');
      setGoalForm({
        user_id: '',
        title: '',
        description: '',
        target_amount: '',
        reward_amount: '',
        reward_type: 'bonus',
        deadline: ''
      });
      loadGoals(selectedUserId);
    } catch (error) {
      alert('Error al crear meta');
    }
    setLoading(false);
  };

  // Actualizar progreso de meta
  const handleUpdateProgress = async (goalId, newProgress) => {
    try {
      const result = await apiCall(`/admin/goals/${goalId}/progress`, {
        method: 'PUT',
        body: JSON.stringify({ current_progress: newProgress })
      });
      
      if (result.reward_granted) {
        alert(`Meta completada! Recompensa otorgada: S/${result.reward_granted}`);
      } else {
        alert('Progreso actualizado exitosamente');
      }
      
      loadGoals(selectedUserId);
    } catch (error) {
      alert('Error al actualizar progreso');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-600 text-white';
      case 'completed': return 'bg-green-600 text-white';
      case 'expired': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha límite';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <motion.div
      key="goals"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de nueva meta */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FaBullseye className="text-poker-gold" />
            Nueva Meta
          </h3>

          <div className="space-y-4">
            {/* Selección de usuario */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Usuario</label>
              <select
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={goalForm.user_id}
                onChange={(e) => setGoalForm({ ...goalForm, user_id: e.target.value })}
              >
                <option value="">-- Seleccionar Usuario --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    @{user.username} - Rake actual: S/{user.total_rake.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Título */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Título de la Meta</label>
              <input
                type="text"
                placeholder="Ej: Alcanzar S/500 en rake este mes"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={goalForm.title}
                onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })}
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Descripción (opcional)</label>
              <textarea
                placeholder="Describe los detalles de la meta..."
                className="w-full p-3 bg-gray-700 text-white rounded-lg h-20 resize-none focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={goalForm.description}
                onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Monto objetivo */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Monto Objetivo (S/)</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                    value={goalForm.target_amount}
                    onChange={(e) => setGoalForm({ ...goalForm, target_amount: e.target.value })}
                  />
                </div>
              </div>

              {/* Recompensa */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Recompensa (S/)</label>
                <div className="relative">
                  <FaGift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                    value={goalForm.reward_amount}
                    onChange={(e) => setGoalForm({ ...goalForm, reward_amount: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Tipo de recompensa */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Tipo de Recompensa</label>
                <select
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                  value={goalForm.reward_type}
                  onChange={(e) => setGoalForm({ ...goalForm, reward_type: e.target.value })}
                >
                  <option value="bonus">Bono Extra</option>
                  <option value="cash">Efectivo</option>
                  <option value="freeroll">Freeroll Entry</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              {/* Fecha límite */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Fecha Límite</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                    value={goalForm.deadline}
                    onChange={(e) => setGoalForm({ ...goalForm, deadline: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleCreateGoal}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FaPlus />
              {loading ? 'Creando...' : 'Crear Meta'}
            </button>
          </div>
        </div>

        {/* Vista previa y selector de usuario */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">Metas por Usuario</h3>
          
          {/* Selector de usuario para ver metas */}
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Ver metas de:</label>
            <select
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">-- Seleccionar Usuario --</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  @{user.username}
                </option>
              ))}
            </select>
          </div>

          {/* Lista de metas del usuario seleccionado */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {goals.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {selectedUserId ? 'No hay metas para este usuario' : 'Selecciona un usuario para ver sus metas'}
              </div>
            ) : (
              goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{goal.title}</h4>
                      {goal.description && (
                        <p className="text-sm text-gray-400 mb-2">{goal.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt />
                          {formatDate(goal.deadline)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaGift />
                          S/{goal.reward_amount} ({goal.reward_type})
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                  </div>

                  {/* Barra de progreso */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progreso</span>
                      <span>S/{goal.current_progress.toFixed(2)} / S/{goal.target_amount.toFixed(2)}</span>
                    </div>
                    <div className="bg-gray-600 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all flex items-center justify-center"
                        style={{ width: `${calculateProgress(goal.current_progress, goal.target_amount)}%` }}
                      >
                        <span className="text-xs text-white font-bold px-2">
                          {calculateProgress(goal.current_progress, goal.target_amount).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actualizar progreso */}
                  {goal.status === 'active' && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Nuevo progreso"
                        className="flex-1 bg-gray-600 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-poker-gold"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateProgress(goal.id, parseFloat(e.target.value));
                            e.target.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          if (input.value) {
                            handleUpdateProgress(goal.id, parseFloat(input.value));
                            input.value = '';
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <FaChartLine />
                        Actualizar
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Estadísticas de metas */}
      {selectedUserId && goals.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FaClock className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Activas</p>
                <p className="text-xl font-bold text-white">
                  {goals.filter(g => g.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <FaCheck className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completadas</p>
                <p className="text-xl font-bold text-white">
                  {goals.filter(g => g.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-600 p-2 rounded-lg">
                <FaTrophy className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Recompensas</p>
                <p className="text-xl font-bold text-white">
                  S/{goals.filter(g => g.status === 'completed')
                    .reduce((sum, g) => sum + parseFloat(g.reward_amount), 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <FaChartLine className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Progreso Promedio</p>
                <p className="text-xl font-bold text-white">
                  {goals.length > 0 
                    ? (goals.reduce((sum, g) => sum + calculateProgress(g.current_progress, g.target_amount), 0) / goals.length).toFixed(1)
                    : '0'
                  }%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GoalsManager;