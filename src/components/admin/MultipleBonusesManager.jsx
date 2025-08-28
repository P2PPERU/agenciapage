// src/components/admin/MultipleBonusesManager.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGift, 
  FaPlus, 
  FaEdit,
  FaCheck,
  FaClock,
  FaPlay,
  FaStop,
  FaSearch,
  FaUser,
  FaDollarSign,
  FaTrophy,
  FaChartLine,
  FaTimesCircle
} from 'react-icons/fa';

const MultipleBonusesManager = ({ users, apiCall }) => {
  const [userBonuses, setUserBonuses] = useState([]);
  const [bonusForm, setBonusForm] = useState({
    user_id: '',
    bonus_name: '',
    bonus_amount: '',
    bonus_type: 'deposit',
    activation_condition: ''
  });
  const [selectedUserId, setSelectedUserId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [loading, setLoading] = useState(false);

  // Filtrar usuarios por búsqueda
  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  // Cargar bonos del usuario seleccionado
  const loadUserBonuses = async (userId) => {
    if (!userId) return;
    
    try {
      const response = await apiCall(`/user-bonuses/${userId}`);
      setUserBonuses(response);
    } catch (error) {
      console.error('Error cargando bonos:', error);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      loadUserBonuses(selectedUserId);
    }
  }, [selectedUserId]);

  // Crear nuevo bono
  const handleCreateBonus = async () => {
    if (!bonusForm.user_id || !bonusForm.bonus_name || !bonusForm.bonus_amount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      await apiCall('/admin/user-bonuses', {
        method: 'POST',
        body: JSON.stringify(bonusForm)
      });
      
      alert('Bono creado exitosamente');
      setBonusForm({
        user_id: '',
        bonus_name: '',
        bonus_amount: '',
        bonus_type: 'deposit',
        activation_condition: ''
      });
      
      if (selectedUserId === bonusForm.user_id) {
        loadUserBonuses(selectedUserId);
      }
    } catch (error) {
      alert('Error al crear bono');
    }
    setLoading(false);
  };

  // Activar bono manualmente
  const handleActivateBonus = async (bonusId) => {
    try {
      await apiCall(`/admin/user-bonuses/${bonusId}/activate`, {
        method: 'PUT'
      });
      
      alert('Bono activado exitosamente');
      loadUserBonuses(selectedUserId);
    } catch (error) {
      alert('Error al activar bono');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'completed': return 'bg-blue-600 text-white';
      case 'inactive': return 'bg-gray-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaPlay />;
      case 'completed': return <FaCheck />;
      case 'inactive': return <FaClock />;
      default: return <FaStop />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const selectedUser = users.find(u => u.id === parseInt(selectedUserId));

  return (
    <motion.div
      key="multiple-bonuses"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Panel de creación de bonos */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FaGift className="text-yellow-400" />
            Crear Bono Adicional
          </h3>

          <div className="space-y-4">
            {/* Búsqueda de usuario */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Buscar Usuario</label>
              <div className="relative mb-2">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar por username o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none text-sm"
                />
              </div>
              
              <select
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={bonusForm.user_id}
                onChange={(e) => setBonusForm({ ...bonusForm, user_id: e.target.value })}
              >
                <option value="">-- Seleccionar Usuario --</option>
                {filteredUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    @{user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Nombre del bono */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Nombre del Bono</label>
              <input
                type="text"
                placeholder="Ej: Segundo Depósito 150%, Tercer Depósito 100%"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={bonusForm.bonus_name}
                onChange={(e) => setBonusForm({ ...bonusForm, bonus_name: e.target.value })}
              />
            </div>

            {/* Monto del bono */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Monto del Bono (S/)</label>
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                  value={bonusForm.bonus_amount}
                  onChange={(e) => setBonusForm({ ...bonusForm, bonus_amount: e.target.value })}
                />
              </div>
            </div>

            {/* Tipo de bono */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Tipo de Bono</label>
              <select
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={bonusForm.bonus_type}
                onChange={(e) => setBonusForm({ ...bonusForm, bonus_type: e.target.value })}
              >
                <option value="deposit">Depósito</option>
                <option value="reload">Recarga</option>
                <option value="special">Especial</option>
                <option value="loyalty">Lealtad</option>
              </select>
            </div>

            {/* Condición de activación */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Condición de Activación</label>
              <input
                type="text"
                placeholder="Ej: Al completar el bono anterior, Depósito mínimo S/500"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={bonusForm.activation_condition}
                onChange={(e) => setBonusForm({ ...bonusForm, activation_condition: e.target.value })}
              />
            </div>

            {/* Botón crear */}
            <button
              onClick={handleCreateBonus}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-black font-bold py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FaPlus />
              {loading ? 'Creando...' : 'Crear Bono Adicional'}
            </button>
          </div>
        </div>

        {/* Panel de visualización de bonos */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Bonos del Usuario</h3>
            
            {/* Selector de usuario para ver bonos */}
            <div className="flex items-center gap-2">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-poker-gold text-sm"
              >
                <option value="">Seleccionar usuario</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    @{user.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedUser && (
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <FaUser />
                @{selectedUser.username}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Bono Principal:</span>
                  <span className="text-yellow-400 ml-2 font-bold">
                    S/{selectedUser.bonus_amount}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Liberado:</span>
                  <span className="text-green-400 ml-2 font-bold">
                    S/{selectedUser.bonus_released.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Rake Total:</span>
                  <span className="text-blue-400 ml-2 font-bold">
                    S/{selectedUser.total_rake.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Rakeback:</span>
                  <span className="text-purple-400 ml-2 font-bold">
                    {selectedUser.rakeback_percentage}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Lista de bonos */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {!selectedUserId ? (
              <div className="text-center py-8 text-gray-400">
                Selecciona un usuario para ver sus bonos
              </div>
            ) : userBonuses.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                Este usuario solo tiene el bono principal
              </div>
            ) : (
              userBonuses.map((bonus, index) => (
                <motion.div
                  key={bonus.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                        {getStatusIcon(bonus.status)}
                        {bonus.bonus_name}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        Orden: #{bonus.bonus_order} • Tipo: {bonus.bonus_type}
                      </p>
                      {bonus.activation_condition && (
                        <p className="text-xs text-gray-500 mb-2">
                          Condición: {bonus.activation_condition}
                        </p>
                      )}
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>Creado: {formatDate(bonus.created_at)}</div>
                        {bonus.activated_at && (
                          <div>Activado: {formatDate(bonus.activated_at)}</div>
                        )}
                        {bonus.completed_at && (
                          <div>Completado: {formatDate(bonus.completed_at)}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-yellow-400">
                        S/{bonus.bonus_amount}
                      </p>
                      {bonus.status === 'active' && (
                        <p className="text-sm text-green-400">
                          Liberado: S/{bonus.bonus_released.toFixed(2)}
                        </p>
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(bonus.status)}`}>
                        {bonus.status === 'active' ? 'Activo' : 
                         bonus.status === 'completed' ? 'Completado' : 
                         bonus.status === 'inactive' ? 'Pendiente' : bonus.status}
                      </span>
                    </div>
                  </div>

                  {/* Barra de progreso para bonos activos */}
                  {bonus.status === 'active' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progreso del Bono</span>
                        <span>{((bonus.bonus_released / bonus.bonus_amount) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((bonus.bonus_released / bonus.bonus_amount) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex gap-2 mt-3">
                    {bonus.status === 'inactive' && (
                      <button
                        onClick={() => handleActivateBonus(bonus.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <FaPlay />
                        Activar
                      </button>
                    )}
                    
                    <button
                      className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <FaEdit />
                      Editar
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Estadísticas resumidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600 p-2 rounded-lg">
              <FaGift className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Bonos Adicionales</p>
              <p className="text-xl font-bold text-white">
                {users.reduce((sum, user) => {
                  // Esto sería ideal tenerlo desde el backend
                  return sum;
                }, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <FaPlay className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Bonos Activos</p>
              <p className="text-xl font-bold text-white">
                {userBonuses.filter(b => b.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FaCheck className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completados</p>
              <p className="text-xl font-bold text-white">
                {userBonuses.filter(b => b.status === 'completed').length}
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
              <p className="text-sm text-gray-400">Valor Total</p>
              <p className="text-xl font-bold text-white">
                S/{userBonuses.reduce((sum, b) => sum + parseFloat(b.bonus_amount), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MultipleBonusesManager;