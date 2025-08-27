// src/components/admin/RakeManager.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaPercent, FaCalculator, FaGift } from 'react-icons/fa';

const RakeManager = ({ users, onReload, apiCall }) => {
  const [rakeForm, setRakeForm] = useState({
    user_id: '',
    rake_amount: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleAddRake = async () => {
    if (!rakeForm.user_id || !rakeForm.rake_amount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    setLoading(true);
    try {
      const result = await apiCall('/admin/rake', {
        method: 'POST',
        body: JSON.stringify(rakeForm)
      });
      alert(`Rake agregado. Bono liberado: S/${result.bonus_released}`);
      setRakeForm({ user_id: '', rake_amount: '', description: '' });
      onReload();
    } catch (error) {
      alert('Error al agregar rake');
    }
    setLoading(false);
  };
  
  const selectedUser = users.find(u => u.id === parseInt(rakeForm.user_id));
  
  return (
    <motion.div
      key="rake"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FaCalculator className="text-poker-gold" />
          Agregar Rake y Liberar Bono
        </h3>
        
        <div className="space-y-4">
          {/* Selección de usuario */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Seleccionar Usuario</label>
            <select
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={rakeForm.user_id}
              onChange={(e) => setRakeForm({ ...rakeForm, user_id: e.target.value })}
            >
              <option value="">-- Seleccionar Usuario --</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  @{user.username} - {user.email} (Bono restante: S/{(user.bonus_amount - user.bonus_released).toFixed(2)})
                </option>
              ))}
            </select>
          </div>
          
          {/* Información del usuario seleccionado */}
          {selectedUser && (
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Información del Usuario</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Usuario:</span>
                  <span className="text-white ml-2">@{selectedUser.username}</span>
                </div>
                <div>
                  <span className="text-gray-400">Rakeback:</span>
                  <span className="text-poker-gold ml-2">{selectedUser.rakeback_percentage}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Bono Total:</span>
                  <span className="text-yellow-400 ml-2">S/{selectedUser.bonus_amount}</span>
                </div>
                <div>
                  <span className="text-gray-400">Bono Liberado:</span>
                  <span className="text-green-400 ml-2">S/{selectedUser.bonus_released.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-400">Bono Restante:</span>
                  <span className="text-orange-400 ml-2">
                    S/{(selectedUser.bonus_amount - selectedUser.bonus_released).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Rake Total:</span>
                  <span className="text-blue-400 ml-2">S/{selectedUser.total_rake.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Barra de progreso */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progreso del Bono</span>
                  <span>{((selectedUser.bonus_released / selectedUser.bonus_amount) * 100).toFixed(1)}%</span>
                </div>
                <div className="bg-gray-600 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min((selectedUser.bonus_released / selectedUser.bonus_amount) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Monto de rake */}
          <div className="relative">
            <label className="text-gray-400 text-sm mb-2 block">Monto de Rake (S/)</label>
            <FaDollarSign className="absolute left-3 top-10 text-gray-500" />
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={rakeForm.rake_amount}
              onChange={(e) => setRakeForm({ ...rakeForm, rake_amount: e.target.value })}
            />
          </div>
          
          {/* Descripción */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Descripción (opcional)</label>
            <textarea
              placeholder="Ej: Rake semanal, Torneo especial, etc..."
              className="w-full p-3 bg-gray-700 text-white rounded-lg h-24 resize-none focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={rakeForm.description}
              onChange={(e) => setRakeForm({ ...rakeForm, description: e.target.value })}
            />
          </div>
          
          {/* Cálculo preview */}
          {rakeForm.user_id && rakeForm.rake_amount && (
            <div className="bg-gradient-to-r from-poker-gold/10 to-yellow-500/10 border border-poker-gold/30 rounded-lg p-4">
              <h4 className="font-semibold text-poker-gold mb-3 flex items-center gap-2">
                <FaGift />
                Preview del Cálculo
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Rake ingresado:</span>
                  <span className="text-white font-bold">S/{parseFloat(rakeForm.rake_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bono a liberar (60%):</span>
                  <span className="text-green-400 font-bold">
                    S/{(parseFloat(rakeForm.rake_amount) * 0.6).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rakeback ({selectedUser.rakeback_percentage}%):</span>
                  <span className="text-blue-400 font-bold">
                    S/{(parseFloat(rakeForm.rake_amount) * (selectedUser.rakeback_percentage / 100)).toFixed(2)}
                  </span>
                </div>
                {(parseFloat(rakeForm.rake_amount) * 0.6) > (selectedUser.bonus_amount - selectedUser.bonus_released) && (
                  <div className="mt-2 p-2 bg-orange-900/50 border border-orange-500 rounded">
                    <p className="text-orange-400 text-xs">
                      ⚠️ El bono a liberar excede el bono restante. 
                      Solo se liberará: S/{(selectedUser.bonus_amount - selectedUser.bonus_released).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <button
            onClick={handleAddRake}
            disabled={loading || !rakeForm.user_id || !rakeForm.rake_amount}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FaCalculator />
            {loading ? 'Procesando...' : 'Agregar Rake y Liberar Bono'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RakeManager;