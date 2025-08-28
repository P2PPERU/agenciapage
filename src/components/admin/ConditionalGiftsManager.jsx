// src/components/admin/ConditionalGiftsManager.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGift, 
  FaBullseye, 
  FaPlus, 
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaTicketAlt,
  FaDollarSign,
  FaTrophy,
  FaUsers,
  FaUser,
  FaChartLine,
  FaClock,
  FaCheck,
  FaExclamationTriangle,
  FaCoins
} from 'react-icons/fa';

const ConditionalGiftsManager = ({ users, apiCall }) => {
  const [conditionalGifts, setConditionalGifts] = useState([]);
  const [giftForm, setGiftForm] = useState({
    title: '',
    description: '',
    condition_type: 'rake',
    condition_value: '',
    gift_type: 'ticket',
    gift_value: '',
    gift_title: '',
    gift_description: '',
    is_global: true,
    specific_user_id: '',
    max_claims: 1
  });
  const [loading, setLoading] = useState(false);
  const [editingGift, setEditingGift] = useState(null);

  // Cargar regalos condicionales
  const loadConditionalGifts = async () => {
    try {
      const response = await apiCall('/admin/conditional-gifts');
      setConditionalGifts(response);
    } catch (error) {
      console.error('Error cargando regalos condicionales:', error);
    }
  };

  useEffect(() => {
    loadConditionalGifts();
  }, []);

  // Crear regalo condicional
  const handleCreateGift = async () => {
    if (!giftForm.title || !giftForm.condition_value || !giftForm.gift_value || !giftForm.gift_title) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      await apiCall('/admin/conditional-gifts', {
        method: 'POST',
        body: JSON.stringify({
          ...giftForm,
          condition_value: parseFloat(giftForm.condition_value),
          gift_value: parseFloat(giftForm.gift_value),
          max_claims: parseInt(giftForm.max_claims)
        })
      });
      
      alert('Regalo condicional creado exitosamente');
      setGiftForm({
        title: '',
        description: '',
        condition_type: 'rake',
        condition_value: '',
        gift_type: 'ticket',
        gift_value: '',
        gift_title: '',
        gift_description: '',
        is_global: true,
        specific_user_id: '',
        max_claims: 1
      });
      loadConditionalGifts();
    } catch (error) {
      alert('Error al crear regalo condicional');
    }
    setLoading(false);
  };

  // Toggle activo/inactivo
  const handleToggleActive = async (giftId, currentActive) => {
    try {
      await apiCall(`/admin/conditional-gifts/${giftId}/toggle`, {
        method: 'PUT',
        body: JSON.stringify({ is_active: !currentActive })
      });
      loadConditionalGifts();
    } catch (error) {
      alert('Error al cambiar estado');
    }
  };

  // Eliminar regalo condicional
  const handleDeleteGift = async (giftId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este regalo condicional?')) return;
    
    try {
      await apiCall(`/admin/conditional-gifts/${giftId}`, {
        method: 'DELETE'
      });
      alert('Regalo eliminado exitosamente');
      loadConditionalGifts();
    } catch (error) {
      alert('Error al eliminar regalo');
    }
  };

  const getConditionIcon = (type) => {
    switch (type) {
      case 'rake': return <FaChartLine className="text-blue-400" />;
      case 'deposit': return <FaDollarSign className="text-green-400" />;
      case 'games': return <FaTrophy className="text-yellow-400" />;
      default: return <FaBullseye className="text-purple-400" />;
    }
  };

  const getGiftTypeIcon = (type) => {
    switch (type) {
      case 'ticket': return <FaTicketAlt className="text-blue-400" />;
      case 'bonus': return <FaDollarSign className="text-green-400" />;
      case 'tournament': return <FaTrophy className="text-yellow-400" />;
      case 'freeroll': return <FaCoins className="text-purple-400" />;
      default: return <FaGift className="text-pink-400" />;
    }
  };

  const getConditionLabel = (type) => {
    switch (type) {
      case 'rake': return 'Rake Generado';
      case 'deposit': return 'Depósito';
      case 'games': return 'Juegos Jugados';
      case 'milestones': return 'Hitos Completados';
      default: return 'Condición';
    }
  };

  const getGiftTypeLabel = (type) => {
    switch (type) {
      case 'ticket': return 'Ticket de Torneo';
      case 'bonus': return 'Bono Extra';
      case 'tournament': return 'Entrada a Torneo';
      case 'freeroll': return 'Freeroll Entry';
      case 'cashback': return 'Cashback';
      default: return 'Otro';
    }
  };

  // Plantillas predefinidas
  const templates = [
    {
      name: 'Ticket por Rake',
      data: {
        title: 'Ticket de Torneo por Rake',
        description: 'Genera rake y recibe un ticket de torneo',
        condition_type: 'rake',
        condition_value: 50,
        gift_type: 'ticket',
        gift_value: 20,
        gift_title: 'Ticket Torneo S/20',
        gift_description: 'Ticket válido para torneos de hasta S/20 de buy-in'
      }
    },
    {
      name: 'Bono por Hitos',
      data: {
        title: 'Bono por Hitos Completados',
        description: 'Completa hitos y recibe bono extra',
        condition_type: 'milestones',
        condition_value: 5,
        gift_type: 'bonus',
        gift_value: 50,
        gift_title: 'Bono de Hitos S/50',
        gift_description: 'Bono extra por completar 5 hitos'
      }
    },
    {
      name: 'Freeroll por Depósito',
      data: {
        title: 'Entrada Freeroll por Depósito',
        description: 'Deposita y accede a freeroll exclusivo',
        condition_type: 'deposit',
        condition_value: 100,
        gift_type: 'freeroll',
        gift_value: 0,
        gift_title: 'Freeroll VIP',
        gift_description: 'Entrada al freeroll exclusivo para depositantes'
      }
    }
  ];

  const applyTemplate = (template) => {
    setGiftForm({ ...giftForm, ...template.data });
  };

  return (
    <motion.div
      key="conditional-gifts"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Panel de creación */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FaBullseye className="text-purple-400" />
            Crear Regalo Condicional
          </h3>

          {/* Plantillas rápidas */}
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Plantillas Rápidas</label>
            <div className="flex flex-wrap gap-2">
              {templates.map((template) => (
                <button
                  key={template.name}
                  onClick={() => applyTemplate(template)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Información básica */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Título *</label>
              <input
                type="text"
                placeholder="Ej: Genera 50 de rake y gana ticket S/20"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={giftForm.title}
                onChange={(e) => setGiftForm({ ...giftForm, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Descripción</label>
              <textarea
                placeholder="Descripción detallada de la promoción..."
                className="w-full p-3 bg-gray-700 text-white rounded-lg h-20 resize-none focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={giftForm.description}
                onChange={(e) => setGiftForm({ ...giftForm, description: e.target.value })}
              />
            </div>

            {/* Condición */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Tipo de Condición *</label>
                <select
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                  value={giftForm.condition_type}
                  onChange={(e) => setGiftForm({ ...giftForm, condition_type: e.target.value })}
                >
                  <option value="rake">Rake Generado</option>
                  <option value="deposit">Depósito</option>
                  <option value="games">Juegos Jugados</option>
                  <option value="milestones">Hitos Completados</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Valor Requerido *</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="50.00"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                  value={giftForm.condition_value}
                  onChange={(e) => setGiftForm({ ...giftForm, condition_value: e.target.value })}
                />
              </div>
            </div>

            {/* Regalo */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Tipo de Regalo *</label>
                <select
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                  value={giftForm.gift_type}
                  onChange={(e) => setGiftForm({ ...giftForm, gift_type: e.target.value })}
                >
                  <option value="ticket">🎫 Ticket de Torneo</option>
                  <option value="bonus">💰 Bono Extra</option>
                  <option value="tournament">🏆 Entrada a Torneo</option>
                  <option value="freeroll">🪙 Freeroll Entry</option>
                  <option value="cashback">💸 Cashback</option>
                  <option value="other">🎁 Otro</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Valor del Regalo * {giftForm.gift_type === 'bonus' || giftForm.gift_type === 'ticket' ? '(S/)' : ''}
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="20.00"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                  value={giftForm.gift_value}
                  onChange={(e) => setGiftForm({ ...giftForm, gift_value: e.target.value })}
                />
              </div>
            </div>

            {/* Detalles del regalo */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Nombre del Regalo *</label>
              <input
                type="text"
                placeholder="Ej: Ticket Torneo S/20, Bono Extra S/50"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={giftForm.gift_title}
                onChange={(e) => setGiftForm({ ...giftForm, gift_title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Descripción del Regalo</label>
              <input
                type="text"
                placeholder="Detalles específicos del regalo..."
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={giftForm.gift_description}
                onChange={(e) => setGiftForm({ ...giftForm, gift_description: e.target.value })}
              />
            </div>

            {/* Opciones avanzadas */}
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-white font-semibold mb-3">Opciones Avanzadas</h4>
              
              <div className="space-y-3">
                {/* Global o específico */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={giftForm.is_global}
                      onChange={(e) => setGiftForm({ ...giftForm, is_global: e.target.checked, specific_user_id: '' })}
                      className="w-4 h-4 text-poker-gold focus:ring-poker-gold"
                    />
                    <span className="text-gray-400">Global (todos los usuarios)</span>
                  </label>
                </div>

                {/* Usuario específico */}
                {!giftForm.is_global && (
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Usuario Específico</label>
                    <select
                      className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                      value={giftForm.specific_user_id}
                      onChange={(e) => setGiftForm({ ...giftForm, specific_user_id: e.target.value })}
                    >
                      <option value="">-- Seleccionar Usuario --</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          @{user.username} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Máximo de reclamaciones */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Máximo de Reclamaciones por Usuario</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                    value={giftForm.max_claims}
                    onChange={(e) => setGiftForm({ ...giftForm, max_claims: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            {giftForm.title && giftForm.condition_value && giftForm.gift_title && (
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-600 rounded-lg p-4">
                <h4 className="text-purple-400 font-semibold mb-3">Vista Previa</h4>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    {getConditionIcon(giftForm.condition_type)}
                    <div className="flex-1">
                      <h5 className="text-white font-semibold">{giftForm.title}</h5>
                      <p className="text-sm text-gray-400">
                        {getConditionLabel(giftForm.condition_type)}: {giftForm.condition_value} 
                        {giftForm.condition_type === 'rake' || giftForm.condition_type === 'deposit' ? ' soles' : ''}
                      </p>
                    </div>
                    <div className="text-center">
                      {getGiftTypeIcon(giftForm.gift_type)}
                      <p className="text-sm text-green-400 font-bold">S/{giftForm.gift_value}</p>
                    </div>
                  </div>
                  <div className="bg-green-900/30 border border-green-600 rounded p-2 mt-2">
                    <p className="text-green-400 font-semibold">{giftForm.gift_title}</p>
                    {giftForm.gift_description && (
                      <p className="text-sm text-gray-300">{giftForm.gift_description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Botón crear */}
            <button
              onClick={handleCreateGift}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FaPlus />
              {loading ? 'Creando...' : 'Crear Regalo Condicional'}
            </button>
          </div>
        </div>

        {/* Lista de regalos condicionales */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6">Regalos Condicionales Activos</h3>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {conditionalGifts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No hay regalos condicionales creados aún
              </div>
            ) : (
              conditionalGifts.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-white">{gift.title}</h4>
                        <button
                          onClick={() => handleToggleActive(gift.id, gift.is_active)}
                          className={`p-1 rounded ${gift.is_active ? 'text-green-400' : 'text-gray-400'}`}
                          title={gift.is_active ? 'Activo - Click para desactivar' : 'Inactivo - Click para activar'}
                        >
                          {gift.is_active ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
                        </button>
                      </div>
                      
                      {gift.description && (
                        <p className="text-sm text-gray-400 mb-2">{gift.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          {getConditionIcon(gift.condition_type)}
                          <span className="text-sm text-gray-300">
                            {getConditionLabel(gift.condition_type)}: {gift.condition_value}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getGiftTypeIcon(gift.gift_type)}
                          <span className="text-sm text-green-400 font-bold">
                            S/{gift.gift_value}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>
                          {gift.is_global ? (
                            <span className="flex items-center gap-1">
                              <FaUsers /> Global
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <FaUser /> Usuario específico
                            </span>
                          )}
                        </div>
                        <div>Máx. reclamaciones: {gift.max_claims}</div>
                        <div>Reclamaciones actuales: {gift.current_claims}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingGift(gift)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteGift(gift.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  {/* Regalo que se otorga */}
                  <div className="bg-gray-600 rounded p-3 mt-3">
                    <p className="text-green-400 font-semibold text-sm">{gift.gift_title}</p>
                    {gift.gift_description && (
                      <p className="text-gray-300 text-sm">{gift.gift_description}</p>
                    )}
                  </div>
                  
                  {/* Estado */}
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      gift.is_active ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {gift.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                    
                    {gift.current_claims >= gift.max_claims && (
                      <span className="text-red-400 text-xs flex items-center gap-1">
                        <FaExclamationTriangle />
                        Límite alcanzado
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <FaBullseye className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Promociones</p>
              <p className="text-xl font-bold text-white">{conditionalGifts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <FaCheck className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Activas</p>
              <p className="text-xl font-bold text-white">
                {conditionalGifts.filter(g => g.is_active).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FaUsers className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Globales</p>
              <p className="text-xl font-bold text-white">
                {conditionalGifts.filter(g => g.is_global).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600 p-2 rounded-lg">
              <FaDollarSign className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Valor Total</p>
              <p className="text-xl font-bold text-white">
                S/{conditionalGifts.reduce((sum, g) => sum + parseFloat(g.gift_value), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConditionalGiftsManager;