// src/components/admin/TicketsManager.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTicketAlt, 
  FaReply, 
  FaCheck, 
  FaClock, 
  FaExclamationTriangle, 
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaFilter,
  FaTimes
} from 'react-icons/fa';

const TicketsManager = ({ users, apiCall }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [responseText, setResponseText] = useState('');

  // Cargar tickets
  const loadTickets = async () => {
    try {
      const params = filter !== 'all' ? `?status=${filter}` : '';
      const response = await apiCall(`/tickets${params}`);
      setTickets(response);
    } catch (error) {
      console.error('Error cargando tickets:', error);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [filter]);

  // Responder ticket
  const handleRespond = async (ticketId) => {
    if (!responseText.trim()) {
      alert('Por favor escribe una respuesta');
      return;
    }

    setLoading(true);
    try {
      await apiCall(`/admin/tickets/${ticketId}/respond`, {
        method: 'PUT',
        body: JSON.stringify({
          admin_response: responseText,
          status: 'resolved'
        })
      });
      
      alert('Respuesta enviada exitosamente');
      setResponseText('');
      setSelectedTicket(null);
      loadTickets();
    } catch (error) {
      alert('Error al enviar respuesta');
    }
    setLoading(false);
  };

  // Cambiar status
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await apiCall(`/admin/tickets/${ticketId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      loadTickets();
    } catch (error) {
      alert('Error al cambiar status');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900';
      case 'medium': return 'text-yellow-400 bg-yellow-900';
      case 'low': return 'text-blue-400 bg-blue-900';
      default: return 'text-gray-400 bg-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-green-400 bg-green-900';
      case 'in_progress': return 'text-yellow-400 bg-yellow-900';
      case 'resolved': return 'text-blue-400 bg-blue-900';
      case 'closed': return 'text-gray-400 bg-gray-700';
      default: return 'text-gray-400 bg-gray-700';
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
      key="tickets"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de tickets */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaTicketAlt className="text-poker-gold" />
              Tickets de Soporte
            </h3>
            
            {/* Filtros */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-poker-gold"
              >
                <option value="all">Todos</option>
                <option value="open">Abiertos</option>
                <option value="in_progress">En Progreso</option>
                <option value="resolved">Resueltos</option>
                <option value="closed">Cerrados</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {tickets.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No hay tickets para mostrar
              </div>
            ) : (
              tickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-gray-700 rounded-lg p-4 cursor-pointer border-2 transition-colors ${
                    selectedTicket?.id === ticket.id
                      ? 'border-poker-gold'
                      : 'border-transparent hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{ticket.subject}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FaUser className="text-xs" />
                        <span>@{ticket.username}</span>
                        <span>•</span>
                        <FaCalendarAlt className="text-xs" />
                        <span>{formatDate(ticket.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {ticket.message}
                  </p>
                  
                  {ticket.admin_response && (
                    <div className="mt-2 pt-2 border-t border-gray-600">
                      <p className="text-xs text-green-400">✓ Respondido</p>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Detalle del ticket */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4">
            {selectedTicket ? 'Detalle del Ticket' : 'Selecciona un Ticket'}
          </h3>

          {selectedTicket ? (
            <div className="space-y-4">
              {/* Header del ticket */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{selectedTicket.subject}</h4>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Usuario:</span>
                    <p className="text-white font-medium">@{selectedTicket.username}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Email:</span>
                    <p className="text-white font-medium">{selectedTicket.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Prioridad:</span>
                    <span className={`px-2 py-1 rounded text-xs ml-2 ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Estado:</span>
                    <span className={`px-2 py-1 rounded text-xs ml-2 ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Creado:</span>
                    <p className="text-white">{formatDate(selectedTicket.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Mensaje original */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-blue-400" />
                  Mensaje del Usuario
                </h5>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedTicket.message}</p>
              </div>

              {/* Respuesta del admin si existe */}
              {selectedTicket.admin_response && (
                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                  <h5 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                    <FaCheck />
                    Respuesta del Admin
                  </h5>
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedTicket.admin_response}</p>
                </div>
              )}

              {/* Cambio rápido de estado */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedTicket.id, 'in_progress')}
                  disabled={selectedTicket.status === 'in_progress'}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white text-xs py-2 px-3 rounded-lg"
                >
                  <FaClock className="inline mr-1" />
                  En Progreso
                </button>
                <button
                  onClick={() => handleStatusChange(selectedTicket.id, 'closed')}
                  disabled={selectedTicket.status === 'closed'}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white text-xs py-2 px-3 rounded-lg"
                >
                  <FaTimes className="inline mr-1" />
                  Cerrar
                </button>
              </div>

              {/* Formulario de respuesta */}
              {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                    <FaReply className="text-poker-gold" />
                    Responder Ticket
                  </h5>
                  
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    className="w-full bg-gray-800 text-white rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-poker-gold"
                  />
                  
                  <button
                    onClick={() => handleRespond(selectedTicket.id)}
                    disabled={loading || !responseText.trim()}
                    className="w-full mt-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    {loading ? 'Enviando...' : 'Enviar Respuesta'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <FaTicketAlt className="text-4xl mx-auto mb-4 opacity-50" />
              <p>Selecciona un ticket de la lista para ver los detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <FaTicketAlt className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Abiertos</p>
              <p className="text-xl font-bold text-white">
                {tickets.filter(t => t.status === 'open').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600 p-2 rounded-lg">
              <FaClock className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">En Progreso</p>
              <p className="text-xl font-bold text-white">
                {tickets.filter(t => t.status === 'in_progress').length}
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
              <p className="text-sm text-gray-400">Resueltos</p>
              <p className="text-xl font-bold text-white">
                {tickets.filter(t => t.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <FaExclamationTriangle className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Alta Prioridad</p>
              <p className="text-xl font-bold text-white">
                {tickets.filter(t => t.priority === 'high').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketsManager;