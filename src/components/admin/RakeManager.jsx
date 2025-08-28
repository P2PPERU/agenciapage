// src/components/admin/RakeManager.jsx - VERSIÓN MEJORADA
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaPercent, FaCalculator, FaGift, FaTrophy, FaChartLine } from 'react-icons/fa';

const RAKE_MILESTONE = 50;
const MILESTONE_BONUS = 30;

const RakeManager = ({ users, onReload, apiCall }) => {
  const [rakeForm, setRakeForm] = useState({
    user_id: '',
    rake_amount: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  
  // Función para redondear correctamente los números decimales
  const roundToTwo = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  // Función para parsear y limpiar números de entrada
  const parseCleanNumber = (value) => {
    if (!value) return 0;
    const cleaned = parseFloat(value);
    return isNaN(cleaned) ? 0 : roundToTwo(cleaned);
  };

  const handleAddRake = async () => {
    if (!rakeForm.user_id || !rakeForm.rake_amount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    setLoading(true);
    try {
      // Limpiar y redondear el monto de rake antes de enviarlo
      const cleanRakeAmount = parseCleanNumber(rakeForm.rake_amount);
      
      const result = await apiCall('/admin/rake', {
        method: 'POST',
        body: JSON.stringify({
          ...rakeForm,
          rake_amount: cleanRakeAmount
        })
      });
      
      let message = `Rake agregado: S/${cleanRakeAmount.toFixed(2)}`;
      if (result.bonus_released > 0) {
        message += `\nBono liberado: S/${roundToTwo(result.bonus_released).toFixed(2)}`;
      }
      if (result.milestones_reached > 0) {
        message += `\n🎉 ¡${result.milestones_reached} hito(s) alcanzado(s)!`;
      }
      
      alert(message);
      setRakeForm({ user_id: '', rake_amount: '', description: '' });
      onReload();
    } catch (error) {
      alert('Error al agregar rake');
    }
    setLoading(false);
  };
  
  const selectedUser = users.find(u => u.id === parseInt(rakeForm.user_id));
  
  // Calcular preview del nuevo sistema
  const calculatePreview = () => {
    if (!selectedUser || !rakeForm.rake_amount) return null;
    
    const currentCycle = roundToTwo(selectedUser.current_rake_cycle || 0);
    const newRakeAmount = parseCleanNumber(rakeForm.rake_amount);
    const totalRake = roundToTwo(currentCycle + newRakeAmount);
    const milestonesReached = Math.floor(totalRake / RAKE_MILESTONE);
    const currentMilestones = Math.floor(currentCycle / RAKE_MILESTONE);
    const newMilestones = Math.max(0, milestonesReached - currentMilestones);
    const bonusToRelease = roundToTwo(newMilestones * MILESTONE_BONUS);
    const newCycle = roundToTwo(totalRake % RAKE_MILESTONE);
    const rakeToNextMilestone = roundToTwo(RAKE_MILESTONE - newCycle);
    
    return {
      newMilestones,
      bonusToRelease,
      newCycle,
      rakeToNextMilestone,
      totalMilestones: milestonesReached
    };
  };
  
  const preview = calculatePreview();
  
  return (
    <motion.div
      key="rake"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FaCalculator className="text-poker-gold" />
          Sistema de Rake y Hitos
        </h3>
        
        {/* Explicación del sistema */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 mb-6 border border-blue-800/50">
          <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
            <FaTrophy />
            Nuevo Sistema de Hitos
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Cada</span>
              <span className="bg-blue-600 px-2 py-1 rounded font-bold text-white">S/{RAKE_MILESTONE}</span>
              <span className="text-gray-400">de rake</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Liberas</span>
              <span className="bg-green-600 px-2 py-1 rounded font-bold text-white">S/{MILESTONE_BONUS}</span>
              <span className="text-gray-400">de bono</span>
            </div>
          </div>
        </div>
        
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
                  @{user.username} - Ciclo actual: S/{(user.current_rake_cycle || 0).toFixed(2)} | Hitos: {user.total_milestones || 0}
                </option>
              ))}
            </select>
          </div>
          
          {/* Información del usuario seleccionado */}
          {selectedUser && (
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FaChartLine />
                Información del Usuario
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-400">Usuario:</span>
                  <span className="text-white ml-2 font-semibold">@{selectedUser.username}</span>
                </div>
                <div>
                  <span className="text-gray-400">Hitos Completados:</span>
                  <span className="text-yellow-400 ml-2 font-bold">{selectedUser.total_milestones || 0}</span>
                </div>
                <div>
                  <span className="text-gray-400">Rake Total:</span>
                  <span className="text-blue-400 ml-2 font-bold">S/{selectedUser.total_rake.toFixed(2)}</span>
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
              </div>
              
              {/* Progreso del ciclo actual */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progreso del Ciclo Actual</span>
                  <span>
                    S/{(selectedUser.current_rake_cycle || 0).toFixed(2)} / S/{RAKE_MILESTONE}
                  </span>
                </div>
                <div className="bg-gray-600 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-4 rounded-full transition-all flex items-center justify-center"
                    style={{ width: `${Math.min(((selectedUser.current_rake_cycle || 0) / RAKE_MILESTONE) * 100, 100)}%` }}
                  >
                    <span className="text-xs text-white font-bold px-2">
                      {(((selectedUser.current_rake_cycle || 0) / RAKE_MILESTONE) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Faltan S/{(RAKE_MILESTONE - (selectedUser.current_rake_cycle || 0)).toFixed(2)} para el próximo hito
                </p>
              </div>
              
              {/* Barra de progreso del bono total */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progreso del Bono Total</span>
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
              onChange={(e) => {
                const cleanValue = e.target.value;
                setRakeForm({ ...rakeForm, rake_amount: cleanValue });
              }}
              onBlur={(e) => {
                // Limpiar el número cuando pierde el foco
                const cleanedNumber = parseCleanNumber(e.target.value);
                setRakeForm({ ...rakeForm, rake_amount: cleanedNumber.toString() });
              }}
            />
          </div>
          
          {/* Descripción */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Descripción (opcional)</label>
            <textarea
              placeholder="Ej: Sesión de cash game, Torneo MTT, etc..."
              className="w-full p-3 bg-gray-700 text-white rounded-lg h-24 resize-none focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={rakeForm.description}
              onChange={(e) => setRakeForm({ ...rakeForm, description: e.target.value })}
            />
          </div>
          
          {/* Preview del cálculo */}
          {preview && (
            <div className="bg-gradient-to-r from-poker-gold/10 to-yellow-500/10 border border-poker-gold/30 rounded-lg p-4">
              <h4 className="font-semibold text-poker-gold mb-3 flex items-center gap-2">
                <FaGift />
                Preview del Cálculo
              </h4>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-gray-400">Rake ingresado</p>
                    <p className="text-xl font-bold text-white">S/{parseFloat(rakeForm.rake_amount).toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-gray-400">Progreso en ciclo</p>
                    <p className="text-xl font-bold text-blue-400">S/{preview.newCycle.toFixed(2)}</p>
                  </div>
                </div>
                
                {preview.newMilestones > 0 && (
                  <div className="bg-green-900/30 border border-green-600 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <FaTrophy className="text-yellow-400" />
                      <span className="font-bold text-green-400">
                        ¡{preview.newMilestones} Hito{preview.newMilestones > 1 ? 's' : ''} Alcanzado{preview.newMilestones > 1 ? 's' : ''}!
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Bono a liberar:</span>
                        <span className="text-green-400 font-bold ml-2">S/{preview.bonusToRelease.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Total hitos:</span>
                        <span className="text-yellow-400 font-bold ml-2">{preview.totalMilestones}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-3">
                  <p className="text-blue-400 text-sm">
                    Para el próximo hito necesitas: <span className="font-bold">S/{preview.rakeToNextMilestone.toFixed(2)}</span> más
                  </p>
                </div>
                
                {preview.bonusToRelease > (selectedUser.bonus_amount - selectedUser.bonus_released) && (
                  <div className="bg-orange-900/50 border border-orange-500 rounded-lg p-3">
                    <p className="text-orange-400 text-sm">
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
            {loading ? 'Procesando...' : 'Agregar Rake'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RakeManager;