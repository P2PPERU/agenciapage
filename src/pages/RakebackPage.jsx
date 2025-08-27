import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:5000/api';

const RakebackPage = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!username.trim()) {
      setError('Por favor ingresa tu username');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/rakeback/${username}`);
      
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }
      
      const data = await response.json();
      setUserData(data.user);
      setTransactions(data.transactions || []);
    } catch (err) {
      setError(err.message);
      setUserData(null);
      setTransactions([]);
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

  const calculateNextRelease = () => {
    if (!userData) return 0;
    // Por cada S/5 de rake se liberan S/3 de bono
    const rakeNeeded = 5;
    const bonusPerRake = 3;
    const currentRakeProgress = userData.total_rake % rakeNeeded;
    return rakeNeeded - currentRakeProgress;
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
              Consulta tu progreso y bonificaciones liberadas
            </p>
            
            {/* Search Box */}
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
                  {loading ? 'Buscando...' : 'Consultar Rakeback'}
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
          </motion.div>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="container mx-auto px-4 py-12"
          >
            {/* User Info Card */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white">@{userData.username}</h2>
                    <p className="text-gray-400">{userData.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Rakeback</p>
                    <p className="text-2xl font-bold text-yellow-400">{userData.rakeback_percentage}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progreso del Bono</span>
                    <span>{calculateProgress().toFixed(1)}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-6 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateProgress()}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
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
                    <p className="text-gray-400 text-sm mb-1">Depósito Inicial</p>
                    <p className="text-2xl font-bold text-white">S/{userData.initial_deposit}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-700/50 rounded-xl p-4"
                  >
                    <p className="text-gray-400 text-sm mb-1">Bono Total</p>
                    <p className="text-2xl font-bold text-yellow-400">S/{userData.bonus_amount}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-700/50 rounded-xl p-4"
                  >
                    <p className="text-gray-400 text-sm mb-1">Liberado</p>
                    <p className="text-2xl font-bold text-green-400">S/{userData.bonus_released.toFixed(2)}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-700/50 rounded-xl p-4"
                  >
                    <p className="text-gray-400 text-sm mb-1">Pendiente</p>
                    <p className="text-2xl font-bold text-orange-400">S/{calculateRemainingBonus().toFixed(2)}</p>
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
                      <p className="text-sm text-gray-400">Para el próximo desbloqueo necesitas</p>
                      <p className="text-xl font-semibold text-white">S/{calculateNextRelease().toFixed(2)} de rake</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Transaction History */}
              {transactions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">Historial de Transacciones</h3>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {transactions.map((transaction, index) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="bg-gray-900/50 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <p className="text-white font-semibold">
                            Rake: S/{transaction.amount.toFixed(2)}
                          </p>
                          {transaction.description && (
                            <p className="text-sm text-gray-400">{transaction.description}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Bono liberado</p>
                          <p className="text-lg font-bold text-green-400">
                            +S/{transaction.bonus_released.toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Section */}
      {!userData && (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Depósito Inicial</h3>
              <p className="text-gray-400">Tu inversión inicial se duplica con nuestro sistema de bonificación</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-white mb-2">200% de Bono</h3>
              <p className="text-gray-400">Por cada S/100 depositados, recibes S/200 en bonificación</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white mb-2">Liberación Progresiva</h3>
              <p className="text-gray-400">Por cada S/5 de rake generado, liberas S/3 de tu bono</p>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RakebackPage;