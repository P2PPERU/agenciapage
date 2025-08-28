// src/components/admin/UserEditor.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEdit, 
  FaUser, 
  FaEnvelope,
  FaPhone,
  FaDollarSign,
  FaPercent,
  FaGift,
  FaSave,
  FaUndo,
  FaExclamationTriangle,
  FaCheck,
  FaTimes,
  FaCalculator,
  FaHistory
} from 'react-icons/fa';

const UserEditor = ({ users, apiCall, onReload }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [adjustmentForm, setAdjustmentForm] = useState({
    adjustment_amount: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState(false);

  // Cargar datos del usuario seleccionado
  useEffect(() => {
    if (selectedUser) {
      setEditForm({
        username: selectedUser.username,
        email: selectedUser.email,
        phone: selectedUser.phone || '',
        initial_deposit: selectedUser.initial_deposit,
        bonus_amount: selectedUser.bonus_amount,
        bonus_released: selectedUser.bonus_released,
        total_rake: selectedUser.total_rake,
        current_rake_cycle: selectedUser.current_rake_cycle || 0,
        total_milestones: selectedUser.total_milestones || 0,
        rakeback_percentage: selectedUser.rakeback_percentage,
        status: selectedUser.status || 'active'
      });
    }
  }, [selectedUser]);

  // Guardar cambios completos
  const handleSaveChanges = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      await apiCall(`/admin/users/${selectedUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(editForm)
      });
      
      alert('Usuario actualizado exitosamente');
      onReload();
      setSelectedUser(null);
    } catch (error) {
      alert('Error al actualizar usuario');
    }
    setLoading(false);
  };

  // Ajuste rápido de bono
  const handleBonusAdjustment = async () => {
    if (!selectedUser || !adjustmentForm.adjustment_amount || !adjustmentForm.reason.trim()) {
      alert('Por favor completa el monto y la razón del ajuste');
      return;
    }

    setLoading(true);
    try {
      const result = await apiCall(`/admin/users/${selectedUser.id}/adjust-bonus`, {
        method: 'POST',
        body: JSON.stringify(adjustmentForm)
      });
      
      alert(`Bono ajustado exitosamente!\nAnterior: S/${result.previous_bonus}\nNuevo: S/${result.new_bonus}\nCambio: S/${result.adjustment}`);
      setAdjustmentForm({ adjustment_amount: '', reason: '' });
      setShowAdjustment(false);
      onReload();
      
      // Actualizar datos del usuario mostrado
      const updatedUser = { ...selectedUser, bonus_released: result.new_bonus };
      setSelectedUser(updatedUser);
    } catch (error) {
      alert('Error al ajustar bono');
    }
    setLoading(false);
  };

  const calculateProgress = (released, total) => {
    return Math.min((released / total) * 100, 100);
  };

  const resetForm = () => {
    if (selectedUser) {
      setEditForm({
        username: selectedUser.username,
        email: selectedUser.email,
        phone: selectedUser.phone || '',
        initial_deposit: selectedUser.initial_deposit,
        bonus_amount: selectedUser.bonus_amount,
        bonus_released: selectedUser.bonus_released,
        total_rake: selectedUser.total_rake,
        current_rake_cycle: selectedUser.current_rake_cycle || 0,
        total_milestones: selectedUser.total_milestones || 0,
        rakeback_percentage: selectedUser.rakeback_percentage,
        status: selectedUser.status || 'active'
      });
    }
  };

  const hasChanges = () => {
    if (!selectedUser) return false;
    
    return Object.keys(editForm).some(key => {
      const current = editForm[key];
      const original = selectedUser[key] || '';
      return current.toString() !== original.toString();
    });
  };

  return (
    <motion.div
      key="user-editor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de usuarios */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FaUser className="text-blue-400" />
            Seleccionar Usuario
          </h3>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {users.map((user) => (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-lg cursor-pointer border-2 transition-colors ${
                  selectedUser?.id === user.id
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-transparent bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">@{user.username}</h4>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Bono</p>
                    <p className="text-sm font-bold text-yellow-400">
                      S/{user.bonus_released.toFixed(2)} / S/{user.bonus_amount}
                    </p>
                  </div>
                </div>
                
                {/* Mini barra de progreso */}
                <div className="mt-2 bg-gray-600 rounded-full h-1">
                  <div 
                    className="bg-green-400 h-1 rounded-full transition-all"
                    style={{ width: `${calculateProgress(user.bonus_released, user.bonus_amount)}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Editor de usuario */}
        <div className="lg:col-span-2">
          {!selectedUser ? (
            <div className="bg-gray-800 p-6 rounded-xl h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <FaEdit className="text-4xl mx-auto mb-4 opacity-50" />
                <p>Selecciona un usuario de la lista para editar</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Información básica */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FaEdit className="text-green-400" />
                    Editando: @{selectedUser.username}
                  </h3>
                  
                  <div className="flex gap-2">
                    {hasChanges() && (
                      <button
                        onClick={resetForm}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                      >
                        <FaUndo className="text-sm" />
                        Deshacer
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <FaTimes className="text-sm" />
                      Cerrar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Datos básicos */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Username</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                        value={editForm.username || ''}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Teléfono</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Estado</label>
                    <select
                      className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                      value={editForm.status || 'active'}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    >
                      <option value="active">Activo</option>
                      <option value="suspended">Suspendido</option>
                      <option value="banned">Baneado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Datos financieros */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaDollarSign className="text-yellow-400" />
                  Datos Financieros
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Depósito Inicial (S/)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                      value={editForm.initial_deposit || ''}
                      onChange={(e) => setEditForm({ ...editForm, initial_deposit: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Rakeback (%)</label>
                    <div className="relative">
                      <FaPercent className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full pr-10 pl-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                        value={editForm.rakeback_percentage || ''}
                        onChange={(e) => setEditForm({ ...editForm, rakeback_percentage: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Bono Total (S/)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                      value={editForm.bonus_amount || ''}
                      onChange={(e) => setEditForm({ ...editForm, bonus_amount: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Bono Liberado (S/)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                      value={editForm.bonus_released || ''}
                      onChange={(e) => setEditForm({ ...editForm, bonus_released: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Rake Total (S/)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                      value={editForm.total_rake || ''}
                      onChange={(e) => setEditForm({ ...editForm, total_rake: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Ciclo Actual (S/)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                      value={editForm.current_rake_cycle || ''}
                      onChange={(e) => setEditForm({ ...editForm, current_rake_cycle: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Vista previa de cambios */}
                {hasChanges() && (
                  <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4 mb-4">
                    <h5 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                      <FaExclamationTriangle />
                      Cambios Detectados
                    </h5>
                    <div className="text-sm space-y-1">
                      {Object.keys(editForm).map(key => {
                        const current = editForm[key];
                        const original = selectedUser[key] || '';
                        if (current.toString() !== original.toString()) {
                          return (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-400 capitalize">{key.replace('_', ' ')}:</span>
                              <span className="text-white">
                                <span className="text-red-400">{original}</span> → <span className="text-green-400">{current}</span>
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveChanges}
                    disabled={loading || !hasChanges()}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <FaSave />
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>

                  <button
                    onClick={() => setShowAdjustment(!showAdjustment)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center gap-2"
                  >
                    <FaCalculator />
                    Ajuste Rápido
                  </button>
                </div>
              </div>

              {/* Ajuste rápido de bono */}
              <AnimatePresence>
                {showAdjustment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-600 rounded-xl p-6"
                  >
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FaCalculator className="text-blue-400" />
                      Ajuste Rápido de Bono
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Monto del Ajuste (S/)</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Ej: +50.00 o -25.50"
                          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={adjustmentForm.adjustment_amount}
                          onChange={(e) => setAdjustmentForm({ ...adjustmentForm, adjustment_amount: e.target.value })}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Usa valores positivos para aumentar, negativos para reducir
                        </p>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Razón del Ajuste</label>
                        <input
                          type="text"
                          placeholder="Ej: Corrección por error, Bono extra..."
                          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={adjustmentForm.reason}
                          onChange={(e) => setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })}
                        />
                      </div>
                    </div>

                    {adjustmentForm.adjustment_amount && (
                      <div className="bg-gray-800 rounded-lg p-4 mb-4">
                        <h5 className="text-white font-semibold mb-2">Preview del Ajuste:</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Bono actual:</span>
                            <span className="text-white">S/{selectedUser.bonus_released.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Ajuste:</span>
                            <span className={parseFloat(adjustmentForm.adjustment_amount) >= 0 ? 'text-green-400' : 'text-red-400'}>
                              {parseFloat(adjustmentForm.adjustment_amount) >= 0 ? '+' : ''}S/{adjustmentForm.adjustment_amount}
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-gray-600 pt-1">
                            <span className="text-gray-400">Nuevo total:</span>
                            <span className="text-yellow-400 font-bold">
                              S/{Math.max(0, selectedUser.bonus_released + parseFloat(adjustmentForm.adjustment_amount)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={handleBonusAdjustment}
                        disabled={loading || !adjustmentForm.adjustment_amount || !adjustmentForm.reason.trim()}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <FaCheck />
                        {loading ? 'Aplicando...' : 'Aplicar Ajuste'}
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowAdjustment(false);
                          setAdjustmentForm({ adjustment_amount: '', reason: '' });
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg"
                      >
                        Cancelar
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserEditor;