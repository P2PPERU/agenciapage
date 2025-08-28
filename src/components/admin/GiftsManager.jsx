// src/components/admin/GiftsManager.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGift, 
  FaUser, 
  FaTicketAlt,
  FaDollarSign,
  FaTrophy,
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaCheck,
  FaClock,
  FaEye,
  FaCoins
} from 'react-icons/fa';

const GiftsManager = ({ users, apiCall }) => {
  const [gifts, setGifts] = useState([]);
  const [giftForm, setGiftForm] = useState({
    user_id: '',
    gift_type: 'ticket',
    gift_value: '',
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  // Cargar regalos
  const loadGifts = async (userId = '') => {
    try {
      const params = userId ? `?user_id=${userId}` : '';
      const response = await apiCall(`/admin/gifts${params}`);
      setGifts(response);
    } catch (error) {
      console.error('Error cargando regalos:', error);
    }
  };

  useEffect(() => {
    loadGifts();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      loadGifts(selectedUserId);
    } else {
      loadGifts();
    }
  }, [selectedUserId]);

  // Crear regalo
  const handleCreateGift = async () => {
    if (!giftForm.user_id || !giftForm.gift_value || !giftForm.title) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      await apiCall('/admin/gifts', {
        method: 'POST',
        body: JSON.stringify(giftForm)
      });
      
      alert('Regalo creado exitosamente');
      setGiftForm({
        user_id: '',
        gift_type: 'ticket',
        gift_value: '',
        title: '',
        description: ''
      });
      loadGifts(selectedUserId);
    } catch (error) {
      alert('Error al crear regalo');
    }
    setLoading(false);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'claimed': return 'bg-blue-600 text-white';
      case 'expired': return 'bg-gray-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
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

  return (
    <motion.div
      key="gifts"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de nuevo regalo */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FaGift className="text-pink-400" />
            Nuevo Regalo para Usuario
          </h3>

          <div className="space-y-4">
            {/* Selección de usuario */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Usuario</label>
              <select
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={giftForm.user_id}
                onChange={(e) => setGiftForm({ ...giftForm, user_id: e.target.value })}
              >
                <option value="">-- Seleccionar Usuario --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    @{user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de regalo */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Tipo de Regalo</label>
              <select
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={giftForm.gift_type}
                onChange={(e) => setGiftForm({ ...giftForm, gift_type: e.target.value })}
              >
                <option value="ticket">🎫 Ticket de Torneo</option>
                <option value="bonus">💰 Bono Extra</option>
                <option value="tournament">🏆 Entrada a Torneo</option>
                <option value="freeroll">🪙 Freeroll</option>
                <option value="cashback">💸 Cashback</option>
                <option value="other">🎁 Otro</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Valor del regalo */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Valor {giftForm.gift_type === 'bonus' || giftForm.gift_type === 'cashback' ? '(S/)' : ''}
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                    value={giftForm.gift_value}
                    onChange={(e) => setGiftForm({ ...giftForm, gift_value: e.target.value })}
                  />
                </div>
              </div>

              {/* Vista previa */}
              <div className="bg-gray-700 rounded-lg p-3 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">
                    {getGiftTypeIcon(giftForm.gift_type)}
                  </div>
                  <p className="text-xs text-gray-400">
                    {getGiftTypeLabel(giftForm.gift_type)}
                  </p>
                  <p className="text-sm font-bold text-white">
                    {giftForm.gift_value ? `S/${giftForm.gift_value}` : 'S/0.00'}
                  </p>
                </div>
              </div>
            </div>

            {/* Título del regalo */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Título del Regalo</label>
              <input
                type="text"
                placeholder="Ej: Ticket Torneo Especial, Bono por Buen Rendimiento..."
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={giftForm.title}
                onChange={(e) => setGiftForm({ ...giftForm, title: e.target.value })}
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Descripción (opcional)</label>
              <textarea
                placeholder="Detalles adicionales sobre el regalo..."
                className="w-full p-3 bg-gray-700 text-white rounded-lg h-20 resize-none focus:ring-2 focus:ring-poker-gold focus:outline-none"
                value={giftForm.description}
                onChange={(e) => setGiftForm({ ...giftForm, description: e.target.value })}
              />
            </div>

            {/* Preview del regalo */}
            {giftForm.user_id && giftForm.title && giftForm.gift_value && (
              <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-600 rounded-lg p-4">
                <h4 className="text-pink-400 font-semibold mb-3 flex items-center gap-2">
                  <FaEye />
                  Vista Previa del Regalo
                </h4>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    {getGiftTypeIcon(giftForm.gift_type)}
                    <div>
                      <h5 className="text-white font-semibold">{giftForm.title}</h5>
                      <p className="text-sm text-gray-400">{getGiftTypeLabel(giftForm.gift_type)}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-bold text-green-400">S/{giftForm.gift_value}</p>
                    </div>
                  </div>
                  {giftForm.description && (
                    <p className="text-sm text-gray-300 mt-2">{giftForm.description}</p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={handleCreateGift}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FaPlus />
              {loading ? 'Creando...' : 'Crear Regalo'}
            </button>
          </div>
        </div>

        {/* Lista de regalos */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Regalos Otorgados</h3>
            
            {/* Filtro por usuario */}
            <div className="flex items-center gap-2">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-poker-gold"
              >
                <option value="">Todos los usuarios</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    @{user.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {gifts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {selectedUserId ? 'No hay regalos para este usuario' : 'No hay regalos otorgados aún'}
              </div>
            ) : (
              gifts.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getGiftTypeIcon(gift.gift_type)}
                      <div>
                        <h4 className="font-semibold text-white">{gift.title}</h4>
                        <p className="text-sm text-gray-400">
                          Para: @{gift.username} • {getGiftTypeLabel(gift.gift_type)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(gift.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-400">S/{gift.gift_value}</p>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(gift.status)}`}>
                        {gift.status === 'active' ? 'Activo' : 
                         gift.status === 'claimed' ? 'Reclamado' : gift.status}
                      </span>
                    </div>
                  </div>
                  
                  {gift.description && (
                    <p className="text-sm text-gray-300 mb-2">{gift.description}</p>
                  )}
                  
                  {gift.status === 'claimed' && gift.claimed_at && (
                    <div className="bg-blue-900/30 border border-blue-600 rounded p-2 mt-2">
                      <p className="text-blue-400 text-xs flex items-center gap-1">
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
      </div>

      {/* Estadísticas de regalos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-pink-600 p-2 rounded-lg">
              <FaGift className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Regalos</p>
              <p className="text-xl font-bold text-white">{gifts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <FaClock className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Activos</p>
              <p className="text-xl font-bold text-white">
                {gifts.filter(g => g.status === 'active').length}
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
              <p className="text-sm text-gray-400">Reclamados</p>
              <p className="text-xl font-bold text-white">
                {gifts.filter(g => g.status === 'claimed').length}
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
                S/{gifts.reduce((sum, g) => sum + parseFloat(g.gift_value), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GiftsManager;