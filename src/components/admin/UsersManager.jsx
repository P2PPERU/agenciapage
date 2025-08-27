// src/components/admin/UsersManager.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaDollarSign, FaPercent, FaGift } from 'react-icons/fa';

const UsersManager = ({ users, onReload, apiCall }) => {
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    phone: '',
    initial_deposit: '',
    bonus_amount: '',
    rakeback_percentage: 60
  });
  const [loading, setLoading] = useState(false);
  
  const handleCreateUser = async () => {
    if (!userForm.username || !userForm.email || !userForm.initial_deposit || !userForm.bonus_amount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    setLoading(true);
    try {
      await apiCall('/admin/users', {
        method: 'POST',
        body: JSON.stringify(userForm)
      });
      alert('Usuario creado exitosamente');
      setUserForm({
        username: '',
        email: '',
        phone: '',
        initial_deposit: '',
        bonus_amount: '',
        rakeback_percentage: 60
      });
      onReload();
    } catch (error) {
      alert('Error al crear usuario');
    }
    setLoading(false);
  };
  
  return (
    <motion.div
      key="users"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Formulario de nuevo usuario */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaUser className="text-poker-gold" />
          Nuevo Usuario
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={userForm.username}
              onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
            />
          </div>
          
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            />
          </div>
          
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={userForm.phone}
              onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
            />
          </div>
          
          <div className="relative">
            <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              placeholder="Depósito Inicial (S/)"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={userForm.initial_deposit}
              onChange={(e) => setUserForm({ ...userForm, initial_deposit: e.target.value })}
            />
          </div>
          
          <div className="relative">
            <FaGift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              placeholder="Monto del Bono (S/)"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={userForm.bonus_amount}
              onChange={(e) => setUserForm({ ...userForm, bonus_amount: e.target.value })}
            />
          </div>
          
          <div className="relative">
            <FaPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              placeholder="Rakeback %"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-poker-gold focus:outline-none"
              value={userForm.rakeback_percentage}
              onChange={(e) => setUserForm({ ...userForm, rakeback_percentage: e.target.value })}
            />
          </div>
          
          <button
            onClick={handleCreateUser}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Usuario'}
          </button>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="bg-gray-800 p-6 rounded-xl overflow-y-auto max-h-[600px]">
        <h3 className="text-xl font-bold text-white mb-4">Usuarios Activos</h3>
        <div className="space-y-3">
          {users.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No hay usuarios registrados</p>
          ) : (
            users.map(user => (
              <motion.div 
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">@{user.username}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.status === 'active' 
                      ? 'bg-green-900 text-green-400' 
                      : 'bg-red-900 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{user.email}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Depósito:</span>
                    <span className="text-white ml-2">S/{user.initial_deposit}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Bono:</span>
                    <span className="text-yellow-400 ml-2">S/{user.bonus_amount}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Liberado:</span>
                    <span className="text-green-400 ml-2">S/{user.bonus_released?.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Rake:</span>
                    <span className="text-blue-400 ml-2">S/{user.total_rake?.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Barra de progreso del bono */}
                <div className="mt-3">
                  <div className="bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((user.bonus_released / user.bonus_amount) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {((user.bonus_released / user.bonus_amount) * 100).toFixed(1)}% del bono liberado
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UsersManager;